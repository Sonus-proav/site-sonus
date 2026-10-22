import { useEffect, useRef } from "react"
import * as THREE from "three"

// Precision-machined 3D Beveled Titanium Blade (Wide horizontal profile with deep Z-chord)
function createTitaniumBladeGeometry(width: number, thickness: number, depth: number, radius: number) {
  const shape = new THREE.Shape()
  const eps = 0.00001
  const r = radius - eps
  const w = width - radius * 2
  const h = thickness - radius * 2

  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true)
  shape.absarc(eps, h + r * 2, eps, Math.PI, Math.PI / 2, true)
  shape.absarc(w + r * 2, h + r * 2, eps, Math.PI / 2, 0, true)
  shape.absarc(w + r * 2, eps, eps, 0, -Math.PI / 2, true)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius * 2,
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: r,
    bevelThickness: radius,
    curveSegments: 12
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

export function AcousticSpace3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (typeof navigator !== "undefined" && /HeadlessChrome|Puppeteer/i.test(navigator.userAgent)) {
      return
    }

    let width = window.innerWidth
    let height = window.innerHeight

    // 1. SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05060a, 0.038)

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100)
    camera.position.set(0, 0, 14.5)

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      })
    } catch {
      return
    }
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    container.innerHTML = ""
    container.appendChild(renderer.domElement)

    // =========================================================================
    // 2. STUDIO SOFTBOX HDR ENVIRONMENT (Silky Specular Reflections on Bevels)
    // =========================================================================
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x030407)

    // Overhead White Studio Softbox
    const topSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 7),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.5, 3.8, 4.2), side: THREE.DoubleSide })
    )
    topSoftbox.position.set(0, 8, 3)
    topSoftbox.rotation.x = Math.PI / 2.2
    envScene.add(topSoftbox)

    // Left Ice-Cyan Studio Rim Softbox
    const leftSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 2.4, 3.2), side: THREE.DoubleSide })
    )
    leftSoftbox.position.set(-9, 1, 4)
    leftSoftbox.rotation.y = Math.PI / 2.3
    envScene.add(leftSoftbox)

    // Right Deep Sapphire Studio Rim Softbox
    const rightSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.4, 1.2, 3.5), side: THREE.DoubleSide })
    )
    rightSoftbox.position.set(9, -1, 4)
    rightSoftbox.rotation.y = -Math.PI / 2.3
    envScene.add(rightSoftbox)

    // Bottom Uplight Fill
    const bottomSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 6),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.15, 0.8, 1.6), side: THREE.DoubleSide })
    )
    bottomSoftbox.position.set(0, -8, 2)
    bottomSoftbox.rotation.x = -Math.PI / 2.2
    envScene.add(bottomSoftbox)

    const envRT = pmremGenerator.fromScene(envScene, 0.05)
    scene.environment = envRT.texture
    pmremGenerator.dispose()

    // Direct Studio Grazing Lights
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
    keyLight.position.set(3, 8, 9)
    scene.add(keyLight)

    const cyanPoint = new THREE.PointLight(0x22d3ee, 24, 15, 1.8)
    cyanPoint.position.set(-4.5, 1.5, 4.5)
    scene.add(cyanPoint)

    const bluePoint = new THREE.PointLight(0x3b82f6, 24, 15, 1.8)
    bluePoint.position.set(4.5, -1.0, 4.5)
    scene.add(bluePoint)

    // =========================================================================
    // 3. 3D KINETIC HELICAL ACOUSTIC SCULPTURES (Brushed Dark Titanium Blades)
    // =========================================================================
    const brushedTitaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x11151e,
      metalness: 0.92,
      roughness: 0.2,
      clearcoat: 0.75,
      clearcoatRoughness: 0.16
    })

    const leftHelixGroup = new THREE.Group()
    const rightHelixGroup = new THREE.Group()
    scene.add(leftHelixGroup)
    scene.add(rightHelixGroup)

    const bladeCount = 26
    const bladeGeo = createTitaniumBladeGeometry(2.65, 0.13, 0.88, 0.038)
    const accentEdgeGeo = new THREE.BoxGeometry(2.45, 0.012, 0.016)

    interface HelicalBlade {
      group: THREE.Group
      accentMat: THREE.MeshBasicMaterial
      index: number
      u: number
      side: "left" | "right"
      baseY: number
    }

    const blades: HelicalBlade[] = []

    const buildHelixSculpture = (parent: THREE.Group, side: "left" | "right") => {
      const dir = side === "left" ? -1 : 1

      for (let i = 0; i < bladeCount; i++) {
        const u = i / (bladeCount - 1) // 0 at bottom, 1 at top
        const envelope = Math.sin(u * Math.PI) // Smooth taper at top and bottom ends

        const g = new THREE.Group()
        const by = (u - 0.5) * 8.2

        g.position.set(0, by, 0)

        // Taper width smoothly at top and bottom of sculpture for an organic silhouette
        const scaleW = 0.35 + envelope * 0.75
        const scaleD = 0.55 + envelope * 0.5
        g.scale.set(scaleW, 1, scaleD)

        const mesh = new THREE.Mesh(bladeGeo, brushedTitaniumMat)
        g.add(mesh)

        // Ultra-thin indirect optical light line embedded along the front bevel
        const accentMat = new THREE.MeshBasicMaterial({
          color: side === "left" ? 0x22d3ee : 0x38bdf8,
          transparent: true,
          opacity: 0.25
        })
        const accentMesh = new THREE.Mesh(accentEdgeGeo, accentMat)
        accentMesh.position.set(0, 0, 0.442 * dir * -1)
        // Place on front edge facing camera
        accentMesh.position.set(0, 0, 0.442)
        g.add(accentMesh)

        parent.add(g)
        blades.push({
          group: g,
          accentMat,
          index: i,
          u,
          side,
          baseY: by
        })
      }
    }

    buildHelixSculpture(leftHelixGroup, "left")
    buildHelixSculpture(rightHelixGroup, "right")

    // =========================================================================
    // 4. RESPONSIVE LAYOUT (DESKTOP vs MOBILE)
    // =========================================================================
    const updateLayout = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      const isDesktop = width >= 960
      if (isDesktop) {
        leftHelixGroup.position.set(-4.85, 0.1, -0.4)
        leftHelixGroup.rotation.set(0.12, 0.35, -0.08)
        leftHelixGroup.scale.setScalar(1.0)

        rightHelixGroup.position.set(4.85, -0.1, -0.4)
        rightHelixGroup.rotation.set(0.12, -0.35, 0.08)
        rightHelixGroup.scale.setScalar(1.0)
      } else {
        leftHelixGroup.position.set(-1.95, 1.8, -2.5)
        leftHelixGroup.rotation.set(0.15, 0.4, -0.1)
        leftHelixGroup.scale.setScalar(0.58)

        rightHelixGroup.position.set(1.95, -1.2, -2.5)
        rightHelixGroup.rotation.set(0.15, -0.4, 0.1)
        rightHelixGroup.scale.setScalar(0.58)
      }
    }

    updateLayout()
    window.addEventListener("resize", updateLayout)

    // =========================================================================
    // 5. SMOOTH PARALLAX & 60 FPS HELICAL ACOUSTIC WAVE ANIMATION
    // =========================================================================
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 }
    let scrollY = window.scrollY

    const onMouseMove = (e: MouseEvent) => {
      pointer.targetX = (e.clientX / width - 0.5) * 2
      pointer.targetY = (e.clientY / height - 0.5) * 2
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.targetX = (e.touches[0].clientX / width - 0.5) * 1.2
        pointer.targetY = (e.touches[0].clientY / height - 0.5) * 1.2
      }
    }

    const onScroll = () => {
      scrollY = window.scrollY
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })

    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const t = clock.getElapsedTime()

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.04
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.04

      camera.position.x = pointer.currentX * 0.55
      camera.position.y = -pointer.currentY * 0.4
      camera.lookAt(0, 0, 0)

      const scrollPhase = scrollY * 0.0025

      for (const b of blades) {
        const dir = b.side === "left" ? 1 : -1
        const phase = b.index * 0.24 - t * 1.15 + scrollPhase + (b.side === "right" ? Math.PI * 0.35 : 0)
        const wave = Math.sin(phase)
        const waveCos = Math.cos(phase)
        const env = Math.sin(b.u * Math.PI)

        // 3D Helical rotation + S-curve spatial displacement
        b.group.position.x = wave * 0.38 * dir * env
        b.group.position.z = waveCos * 0.35 * env

        // Progressive 3D twist so top, front bevel, and underside catch studio reflections
        b.group.rotation.y = dir * (wave * 0.68) + pointer.currentX * 0.18
        b.group.rotation.x = 0.22 + waveCos * 0.24 + pointer.currentY * 0.1
        b.group.rotation.z = wave * 0.14 * dir

        // Subtle optical edge pulse along the wave crest
        const crest = Math.max(0, waveCos)
        b.accentMat.opacity = (0.08 + Math.pow(crest, 2.5) * 0.65) * env
      }

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", updateLayout)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("scroll", onScroll)
      envRT.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

export default AcousticSpace3D
