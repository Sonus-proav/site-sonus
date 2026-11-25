import { memo, useEffect, useRef } from "react"
import * as THREE from "three"
import { getPerfTier } from "@/lib/devicePerf"
import { fitFov } from "@/lib/fitFov"

// Precision CNC-machined hollow circular/rounded-square chassis frame
function createHollowRingFrameGeo(
  outerR: number,
  innerR: number,
  depth: number,
  bevel = 0.025
) {
  const outer = new THREE.Shape()
  outer.absarc(0, 0, outerR, 0, Math.PI * 2, false)

  const hole = new THREE.Path()
  hole.absarc(0, 0, innerR, 0, Math.PI * 2, true)
  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth: Math.max(0.02, depth - bevel * 2),
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 48,
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// Precision beveled acoustic louver blade
function createTitaniumBladeGeo(w: number, h: number, depth: number, r: number) {
  const shape = new THREE.Shape()
  const hw = w / 2
  const hh = h / 2
  const cr = Math.min(r, hw * 0.45, hh * 0.45)

  shape.moveTo(-hw + cr, -hh)
  shape.lineTo(hw - cr, -hh)
  shape.quadraticCurveTo(hw, -hh, hw, -hh + cr)
  shape.lineTo(hw, hh - cr)
  shape.quadraticCurveTo(hw, hh, hw - cr, hh)
  shape.lineTo(-hw + cr, hh)
  shape.quadraticCurveTo(-hw, hh, -hw, hh - cr)
  shape.lineTo(-hw, -hh + cr)
  shape.quadraticCurveTo(-hw, -hh, -hw + cr, -hh)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: Math.max(0.01, depth - cr * 2),
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: cr,
    bevelThickness: cr,
    curveSegments: 14,
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// HiDPI 1024x1024 Anisotropic Optical & Acoustic Dial Texture
function createPrecisionDialTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#040912"
  ctx.fillRect(0, 0, 1024, 1024)

  const glow = ctx.createRadialGradient(512, 512, 40, 512, 512, 470)
  glow.addColorStop(0, "rgba(34, 211, 238, 0.28)")
  glow.addColorStop(0.55, "rgba(14, 165, 233, 0.08)")
  glow.addColorStop(1, "rgba(4, 9, 18, 0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 1024, 1024)

  // Concentric precision calibration rings
  ctx.strokeStyle = "rgba(56, 189, 248, 0.22)"
  ctx.lineWidth = 2.5
  for (const rad of [210, 290, 370, 435]) {
    ctx.beginPath()
    ctx.arc(512, 512, rad, 0, Math.PI * 2)
    ctx.stroke()
  }

  // 72 Radial degree ticks (crisp anti-aliased vector strokes)
  for (let i = 0; i < 72; i++) {
    const angle = (i / 72) * Math.PI * 2
    const major = i % 6 === 0
    const r1 = major ? 392 : 408
    const r2 = 428
    ctx.strokeStyle = major ? "rgba(103, 232, 249, 0.65)" : "rgba(148, 163, 184, 0.22)"
    ctx.lineWidth = major ? 3.5 : 2
    ctx.beginPath()
    ctx.moveTo(512 + Math.cos(angle) * r1, 512 + Math.sin(angle) * r1)
    ctx.lineTo(512 + Math.cos(angle) * r2, 512 + Math.sin(angle) * r2)
    ctx.stroke()
  }

  ctx.textAlign = "center"
  ctx.fillStyle = "#67e8f9"
  ctx.font = "bold 26px monospace"
  ctx.fillText("Q-SYS // LEVEL 2", 512, 242)

  ctx.fillStyle = "rgba(167, 243, 208, 0.85)"
  ctx.font = "bold 22px monospace"
  ctx.fillText("VISIONSUITE AI", 512, 804)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

export const AuthoritySculpture3D = memo(function AuthoritySculpture3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (
      typeof navigator !== "undefined" &&
      /ReactSnap|Prerender|HeadlessChrome/i.test(navigator.userAgent)
    ) {
      return
    }

    const tier = getPerfTier()
    const isMobile =
      window.innerWidth < 768 || /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    if (tier === "low" || isMobile) return

    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item)
      return item
    }

    const maxDpr = 2.0

    const rect = container.getBoundingClientRect()
    let width = Math.max(1, Math.round(rect.width || container.clientWidth || 320))
    let height = Math.max(1, Math.round(rect.height || container.clientHeight || 224))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(fitFov(30, width / height, 1.7), width / height, 0.5, 25)
    camera.position.set(0, 0.12, 5.8)
    camera.lookAt(0, 0, 0)

    let renderer: THREE.WebGLRenderer
    try {
      // Hardware MSAA always ON + highp precision -> matches WarrantyBanner crispness
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        precision: "highp",
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.22
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)

    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
    renderer.domElement.style.display = "block"
    renderer.domElement.style.width = "100%"
    renderer.domElement.style.height = "100%"
    renderer.domElement.style.touchAction = "pan-y"
    container.appendChild(renderer.domElement)

    const onContextLost = (e: Event) => e.preventDefault()
    renderer.domElement.addEventListener("webglcontextlost", onContextLost, false)

    // Studio Softbox HDR Environment
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x030508)

    const softTop = new THREE.Mesh(
      new THREE.PlaneGeometry(18, 7),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 3.5, 4.0), side: THREE.DoubleSide })
    )
    softTop.position.set(0, 8, 3)
    softTop.rotation.x = Math.PI / 2.2
    envScene.add(softTop)

    const softLeft = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.28, 2.6, 3.6), side: THREE.DoubleSide })
    )
    softLeft.position.set(-8, 1, 4)
    softLeft.rotation.y = Math.PI / 2.25
    envScene.add(softLeft)

    const softRight = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 2.1, 2.8), side: THREE.DoubleSide })
    )
    softRight.position.set(8, -1, 4)
    softRight.rotation.y = -Math.PI / 2.25
    envScene.add(softRight)

    const envRT = track(pmrem.fromScene(envScene, 0.042))
    scene.environment = envRT.texture
    pmrem.dispose()
    softTop.geometry.dispose()
    ;(softTop.material as THREE.Material).dispose()
    softLeft.geometry.dispose()
    ;(softLeft.material as THREE.Material).dispose()
    softRight.geometry.dispose()
    ;(softRight.material as THREE.Material).dispose()

    scene.add(new THREE.AmbientLight(0xffffff, 0.48))
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.1)
    keyLight.position.set(3, 7, 8)
    scene.add(keyLight)

    const rimLight = new THREE.PointLight(0x22d3ee, 16, 12, 1.65)
    rimLight.position.set(-3.0, 1.6, 4.0)
    scene.add(rimLight)

    // Machined Anodized Titanium & Sapphire Materials
    const darkTitaniumMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0d1522,
        metalness: 0.93,
        roughness: 0.19,
        envMapIntensity: 1.15,
      })
    )

    const brushedBezelMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x16273b,
        emissive: 0x22d3ee,
        emissiveIntensity: 0.08,
        metalness: 0.94,
        roughness: 0.15,
        envMapIntensity: 1.25,
      })
    )

    const sapphireLensMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x082f49,
        emissive: 0x0ea5e9,
        emissiveIntensity: 0.35,
        metalness: 0.96,
        roughness: 0.06,
        envMapIntensity: 1.6,
      })
    )

    const opticLineMat = track(
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.9 })
    )

    // Sculpture Assembly
    const root = new THREE.Group()
    root.rotation.set(-0.28, 0.36, 0.06)
    scene.add(root)

    // Solid backing disc
    const backDisc = new THREE.Mesh(
      track(new THREE.CylinderGeometry(1.32, 1.32, 0.14, 64)),
      darkTitaniumMat
    )
    backDisc.rotation.x = Math.PI / 2
    backDisc.position.z = -0.06
    root.add(backDisc)

    // HiDPI Dial Face
    const dialTex = track(createPrecisionDialTexture(maxAnisotropy))
    const dialFace = new THREE.Mesh(
      track(new THREE.CircleGeometry(1.22, 64)),
      track(new THREE.MeshBasicMaterial({ map: dialTex }))
    )
    dialFace.position.z = 0.02
    root.add(dialFace)

    // Outer CNC Beveled Titanium Ring Frame
    const outerBezel = new THREE.Mesh(
      track(createHollowRingFrameGeo(1.38, 1.12, 0.22, 0.032)),
      brushedBezelMat
    )
    outerBezel.position.z = 0.05
    root.add(outerBezel)

    // Glowing Cyan Optic Accent Ring
    const opticRing = new THREE.Mesh(
      track(new THREE.TorusGeometry(1.13, 0.016, 16, 72)),
      opticLineMat
    )
    opticRing.position.z = 0.16
    root.add(opticRing)

    // 16 Instanced Titanium Acoustic Radial Blades (1 draw call!)
    const bladeCount = 16
    const bladeGeo = track(createTitaniumBladeGeo(0.24, 0.065, 0.12, 0.018))
    const bladesInstanced = track(new THREE.InstancedMesh(bladeGeo, brushedBezelMat, bladeCount))
    bladesInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const dummy = new THREE.Object3D()
    for (let i = 0; i < bladeCount; i++) {
      const a = (i / bladeCount) * Math.PI * 2
      dummy.position.set(Math.cos(a) * 1.44, Math.sin(a) * 1.44, 0.0)
      dummy.rotation.set(0, 0, a)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      bladesInstanced.setMatrixAt(i, dummy.matrix)
    }
    bladesInstanced.instanceMatrix.needsUpdate = true
    root.add(bladesInstanced)

    // Inner Gimbaled VisionSuite Lens Assembly
    const gimbalGroup = new THREE.Group()
    gimbalGroup.position.z = 0.14
    root.add(gimbalGroup)

    const innerBezel = new THREE.Mesh(
      track(createHollowRingFrameGeo(0.58, 0.42, 0.16, 0.024)),
      darkTitaniumMat
    )
    gimbalGroup.add(innerBezel)

    const sapphireLens = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.41, 48, 32)),
      sapphireLensMat
    )
    sapphireLens.scale.z = 0.36
    sapphireLens.position.z = 0.04
    gimbalGroup.add(sapphireLens)

    const lensIris = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.22, 0.014, 16, 48)),
      opticLineMat
    )
    lensIris.position.z = 0.19
    gimbalGroup.add(lensIris)

    // Subtle Mouse Parallax
    const pointer = { tx: 0, ty: 0, cx: 0, cy: 0 }
    let viewW = window.innerWidth || 1440
    let viewH = window.innerHeight || 900

    const onMouseMove = (e: MouseEvent) => {
      pointer.tx = (e.clientX / viewW) * 2 - 1
      pointer.ty = (e.clientY / viewH) * 2 - 1
    }
    const isCoarse =
      typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches
    if (!isCoarse) {
      window.addEventListener("mousemove", onMouseMove, { passive: true })
    }

    const updateSize = () => {
      if (!container) return
      const r = container.getBoundingClientRect()
      width = Math.max(1, Math.round(r.width || container.clientWidth || 320))
      height = Math.max(1, Math.round(r.height || container.clientHeight || 224))
      viewW = window.innerWidth || 1440
      viewH = window.innerHeight || 900
      camera.aspect = width / height
      camera.fov = fitFov(30, camera.aspect, 1.7)
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
      renderer.setSize(width, height)
    }
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateSize) : null
    ro?.observe(container)

    let inView = true
    let tabVisible = !document.hidden
    let rafId = 0
    let running = false
    let elapsed = 0
    let lastNow = performance.now()

    const tick = (now: number) => {
      if (!inView || !tabVisible) {
        running = false
        return
      }
      rafId = requestAnimationFrame(tick)
      const dt = Math.min((now - lastNow) * 0.001, 0.08)
      lastNow = now
      elapsed += dt

      const damp = 1 - Math.pow(0.002, dt)
      pointer.cx += (pointer.tx - pointer.cx) * damp
      pointer.cy += (pointer.ty - pointer.cy) * damp

      root.position.y = Math.sin(elapsed * 1.25) * 0.06
      root.rotation.y = 0.36 + Math.sin(elapsed * 0.65) * 0.22 + pointer.cx * 0.3
      root.rotation.x = -0.28 + Math.cos(elapsed * 0.5) * 0.11 + pointer.cy * 0.2

      gimbalGroup.rotation.x = Math.sin(elapsed * 1.1) * 0.18
      gimbalGroup.rotation.y = Math.cos(elapsed * 0.9) * 0.18

      for (let i = 0; i < bladeCount; i++) {
        const a = (i / bladeCount) * Math.PI * 2
        const wave = Math.sin(elapsed * 2.6 - i * 0.45) * 0.055
        dummy.position.set(Math.cos(a) * 1.44, Math.sin(a) * 1.44, wave)
        dummy.rotation.set(0, 0, a)
        dummy.scale.set(1, 1, 1)
        dummy.updateMatrix()
        bladesInstanced.setMatrixAt(i, dummy.matrix)
      }
      bladesInstanced.instanceMatrix.needsUpdate = true

      renderer.render(scene, camera)
    }

    const start = () => {
      if (!running && inView && tabVisible) {
        running = true
        lastNow = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    const io = new IntersectionObserver(
      ([e]) => {
        inView = e.isIntersecting
        if (inView) start()
      },
      { threshold: 0.04 }
    )
    io.observe(container)

    const onVis = () => {
      tabVisible = !document.hidden
      if (tabVisible) start()
    }
    document.addEventListener("visibilitychange", onVis)

    renderer.render(scene, camera)
    start()

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      ro?.disconnect()
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("visibilitychange", onVis)
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className="w-full h-52 sm:h-60 select-none pointer-events-none" />
})

export default AuthoritySculpture3D
