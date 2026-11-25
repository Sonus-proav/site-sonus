import { memo, useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { getPerfTier } from "@/lib/devicePerf"
import { fitFov } from "@/lib/fitFov"

export type ClassroomScenario = "hyflex" | "local" | "divisivel" | "standby"

interface ClassroomStage3DProps {
  scenario: ClassroomScenario
}

// High-precision CNC-beveled rounded slab geometry (smooth specular highlights, zero faceting)
function createBeveledSlabGeo(w: number, h: number, depth: number, r: number, bevel = 0.026) {
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
    depth: Math.max(0.012, depth - bevel * 2),
    bevelEnabled: true,
    bevelSegments: 5,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 24,
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// Mipmapped + Anisotropic 1024x1024 architectural floor texture (replaces jagged GL_LINES GridHelper)
function createArchitecturalFloorTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext("2d")!

  const bg = ctx.createRadialGradient(512, 512, 60, 512, 512, 680)
  bg.addColorStop(0, "#0d1628")
  bg.addColorStop(0.65, "#070c17")
  bg.addColorStop(1, "#04070e")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1024, 1024)

  ctx.strokeStyle = "rgba(148, 163, 184, 0.085)"
  ctx.lineWidth = 2
  const step = 64
  for (let i = step; i < 1024; i += step) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, 1024)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(1024, i)
    ctx.stroke()
  }

  // Subtle perimeter architectural trim
  ctx.strokeStyle = "rgba(56, 189, 248, 0.18)"
  ctx.lineWidth = 3
  ctx.strokeRect(24, 24, 976, 976)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

// Feather-smooth Gaussian radial wave texture (eliminates polygon RingGeometry stair-stepping)
function createSoftWaveTexture(r: number, g: number, b: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")!

  const grad = ctx.createRadialGradient(128, 128, 36, 128, 128, 124)
  grad.addColorStop(0, `rgba(${r},${g},${b},0)`)
  grad.addColorStop(0.6, `rgba(${r},${g},${b},0.05)`)
  grad.addColorStop(0.83, `rgba(${r},${g},${b},0.68)`)
  grad.addColorStop(0.93, `rgba(${r},${g},${b},0.16)`)
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`)

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.needsUpdate = true
  return tex
}

// Soft ambient occlusion contact shadow
function createSoftShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")!

  const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 62)
  grad.addColorStop(0, "rgba(0,0,0,0.68)")
  grad.addColorStop(0.58, "rgba(0,0,0,0.26)")
  grad.addColorStop(1, "rgba(0,0,0,0)")

  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 128, 128)

  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// HiDPI 1024x512 4K Screen UI Texture with mipmaps + anisotropy
function createHiDpiScreenTexture(
  title: string,
  subtitle: string,
  accentHex: string,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 512
  const ctx = canvas.getContext("2d")!

  const bg = ctx.createLinearGradient(0, 0, 1024, 512)
  bg.addColorStop(0, "#09192f")
  bg.addColorStop(0.55, "#061020")
  bg.addColorStop(1, "#030711")
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1024, 512)

  const glow = ctx.createRadialGradient(320, 90, 20, 320, 180, 480)
  glow.addColorStop(0, "rgba(56,189,248,0.24)")
  glow.addColorStop(1, "rgba(56,189,248,0)")
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, 1024, 512)

  ctx.strokeStyle = "rgba(125, 211, 252, 0.32)"
  ctx.lineWidth = 4
  ctx.strokeRect(20, 20, 984, 472)

  // Left slide canvas
  ctx.fillStyle = "rgba(255,255,255,0.05)"
  ctx.fillRect(48, 52, 584, 408)
  ctx.strokeStyle = "rgba(255,255,255,0.12)"
  ctx.lineWidth = 2
  ctx.strokeRect(48, 52, 584, 408)

  ctx.fillStyle = accentHex
  ctx.font = "bold 36px system-ui, -apple-system, sans-serif"
  ctx.fillText(title, 84, 144)

  ctx.fillStyle = "rgba(226, 232, 240, 0.9)"
  ctx.font = "600 23px monospace"
  ctx.fillText(subtitle, 84, 196)

  ctx.fillStyle = accentHex
  ctx.fillRect(84, 246, 340, 14)
  ctx.fillStyle = "rgba(148, 163, 184, 0.45)"
  ctx.fillRect(84, 280, 460, 10)
  ctx.fillRect(84, 306, 390, 10)

  for (let i = 0; i < 18; i++) {
    const bh = 16 + Math.sin(i * 0.8) * 12 + (i % 3) * 8
    ctx.fillStyle = i % 2 === 0 ? "rgba(52,211,153,0.85)" : "rgba(56,189,248,0.8)"
    ctx.fillRect(84 + i * 24, 412 - bh, 12, bh)
  }

  // Right remote participant video gallery
  const cardStyles = [
    "rgba(34, 211, 238, 0.18)",
    "rgba(59, 130, 246, 0.18)",
    "rgba(16, 185, 129, 0.18)",
  ]
  for (let i = 0; i < 3; i++) {
    const cy = 52 + i * 142
    ctx.fillStyle = cardStyles[i]
    ctx.fillRect(658, cy, 318, 124)
    ctx.strokeStyle = "rgba(255,255,255,0.15)"
    ctx.lineWidth = 2
    ctx.strokeRect(658, cy, 318, 124)

    ctx.fillStyle = "rgba(241, 245, 249, 0.85)"
    ctx.beginPath()
    ctx.arc(817, cy + 48, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.beginPath()
    ctx.arc(817, cy + 98, 32, Math.PI, 0)
    ctx.fill()
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.generateMipmaps = true
  tex.minFilter = THREE.LinearMipmapLinearFilter
  tex.magFilter = THREE.LinearFilter
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

export const ClassroomStage3D = memo(function ClassroomStage3D({ scenario }: ClassroomStage3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const scenarioRef = useRef<ClassroomScenario>(scenario)
  scenarioRef.current = scenario

  const [webglReady, setWebglReady] = useState(false)

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
    if (tier === "low") return

    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item)
      return item
    }

    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    const maxDpr = isMobile ? 1.5 : 2.0

    const rect = container.getBoundingClientRect()
    let width = Math.max(1, Math.round(rect.width || container.clientWidth || 640))
    let height = Math.max(1, Math.round(rect.height || container.clientHeight || 380))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(fitFov(30, width / height, 1.45), width / height, 0.5, 45)
    camera.position.set(-3.05, 4.75, 7.65)
    camera.lookAt(-1.15, 0.38, -0.25)

    let renderer: THREE.WebGLRenderer
    try {
      // Hardware MSAA always enabled + highp shader precision for crisp, zero-jaggy edges
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
    renderer.toneMappingExposure = 1.24
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

    // Studio Softbox HDR Environment (same metallic sheen as WarrantyBanner)
    const pmrem = new THREE.PMREMGenerator(renderer)
    pmrem.compileEquirectangularShader()
    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x03050a)

    const topSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(22, 10),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.3, 3.6, 4.1), side: THREE.DoubleSide })
    )
    topSoftbox.position.set(0, 9, 2)
    topSoftbox.rotation.x = Math.PI / 2.1
    envScene.add(topSoftbox)

    const leftSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 2.7, 3.7), side: THREE.DoubleSide })
    )
    leftSoftbox.position.set(-9, 2, 4)
    leftSoftbox.rotation.y = Math.PI / 2.2
    envScene.add(leftSoftbox)

    const rightSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 2.5, 2.0), side: THREE.DoubleSide })
    )
    rightSoftbox.position.set(9, 1, 4)
    rightSoftbox.rotation.y = -Math.PI / 2.2
    envScene.add(rightSoftbox)

    const envRT = track(pmrem.fromScene(envScene, 0.04))
    scene.environment = envRT.texture
    pmrem.dispose()
    topSoftbox.geometry.dispose()
    ;(topSoftbox.material as THREE.Material).dispose()
    leftSoftbox.geometry.dispose()
    ;(leftSoftbox.material as THREE.Material).dispose()
    rightSoftbox.geometry.dispose()
    ;(rightSoftbox.material as THREE.Material).dispose()

    // Studio 3-Point Lighting + Zone Illumination
    scene.add(new THREE.AmbientLight(0xe2e8f0, 0.52))

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9)
    keyLight.position.set(4, 8, 7)
    scene.add(keyLight)

    const roomLightA = new THREE.PointLight(0x38bdf8, 14.5, 11, 1.55)
    roomLightA.position.set(-1.75, 2.55, 0.15)
    scene.add(roomLightA)

    const roomLightB = new THREE.PointLight(0x34d399, 12.5, 11, 1.55)
    roomLightB.position.set(1.75, 2.55, 0.15)
    scene.add(roomLightB)

    // PBR Materials
    const floorTex = track(createArchitecturalFloorTexture(maxAnisotropy))
    const floorTopMat = track(
      new THREE.MeshStandardMaterial({
        map: floorTex,
        metalness: 0.62,
        roughness: 0.32,
        envMapIntensity: 1.0,
      })
    )

    const darkTitaniumMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0d1523,
        metalness: 0.92,
        roughness: 0.19,
        envMapIntensity: 1.18,
      })
    )

    const brushedSlateMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x172438,
        metalness: 0.88,
        roughness: 0.22,
        envMapIntensity: 1.15,
      })
    )

    const deskTopMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x1c2b42,
        metalness: 0.8,
        roughness: 0.24,
        envMapIntensity: 1.08,
      })
    )

    const partitionMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x1e2e46,
        metalness: 0.74,
        roughness: 0.26,
        transparent: true,
        opacity: 0.94,
      })
    )

    const shadowTex = track(createSoftShadowTexture())
    const shadowMat = track(
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.72,
        depthWrite: false,
      })
    )

    const stageGroup = new THREE.Group()
    scene.add(stageGroup)

    // 1. Beveled Titanium Base Slab + Smooth Mipmapped Architectural Floor
    const baseSlab = new THREE.Mesh(
      track(createBeveledSlabGeo(7.35, 4.5, 0.18, 0.36, 0.04)),
      darkTitaniumMat
    )
    baseSlab.rotation.x = -Math.PI / 2
    baseSlab.position.y = -0.09
    stageGroup.add(baseSlab)

    const floorPlane = new THREE.Mesh(track(new THREE.PlaneGeometry(7.05, 4.2)), floorTopMat)
    floorPlane.rotation.x = -Math.PI / 2
    floorPlane.position.y = 0.003
    stageGroup.add(floorPlane)

    const backWall = new THREE.Mesh(
      track(createBeveledSlabGeo(7.1, 2.18, 0.16, 0.18, 0.03)),
      darkTitaniumMat
    )
    backWall.position.set(0, 1.04, -2.08)
    stageGroup.add(backWall)

    // 2. Dual 4K Panoramic Screens
    const screenFrameGeo = track(createBeveledSlabGeo(2.42, 1.14, 0.07, 0.09, 0.018))
    const screenPlaneGeo = track(new THREE.PlaneGeometry(2.28, 1.0))

    const screenTexA = track(
      createHiDpiScreenTexture("AULA HÍBRIDA AO VIVO", "Q-SYS • TEAMS & ZOOM", "#38bdf8", maxAnisotropy)
    )
    const screenMatA = track(
      new THREE.MeshBasicMaterial({ map: screenTexA, transparent: true, opacity: 0.98 })
    )
    const screenFrameA = new THREE.Mesh(screenFrameGeo, brushedSlateMat)
    screenFrameA.position.set(-1.75, 1.16, -1.98)
    stageGroup.add(screenFrameA)

    const screenA = new THREE.Mesh(screenPlaneGeo, screenMatA)
    screenA.position.set(-1.75, 1.16, -1.935)
    stageGroup.add(screenA)

    const screenTexB = track(
      createHiDpiScreenTexture("SALÃO UNIFICADO 4K", "ESPELHAMENTO AUTOMÁTICO", "#34d399", maxAnisotropy)
    )
    const screenMatB = track(
      new THREE.MeshBasicMaterial({ map: screenTexB, transparent: true, opacity: 0.2 })
    )
    const screenFrameB = new THREE.Mesh(screenFrameGeo, brushedSlateMat)
    screenFrameB.position.set(1.75, 1.16, -1.98)
    stageGroup.add(screenFrameB)

    const screenB = new THREE.Mesh(screenPlaneGeo, screenMatB)
    screenB.position.set(1.75, 1.16, -1.935)
    stageGroup.add(screenB)

    // 3. Lecturer Podium + Touch UCI + Smooth Presenter Totem
    const podium = new THREE.Mesh(
      track(createBeveledSlabGeo(0.68, 0.42, 0.74, 0.08, 0.02)),
      brushedSlateMat
    )
    podium.rotation.x = -Math.PI / 2
    podium.position.set(-2.48, 0.37, -1.12)
    stageGroup.add(podium)

    const podiumShadow = new THREE.Mesh(track(new THREE.PlaneGeometry(0.95, 0.65)), shadowMat)
    podiumShadow.rotation.x = -Math.PI / 2
    podiumShadow.position.set(-2.48, 0.008, -1.12)
    stageGroup.add(podiumShadow)

    const uciGlow = new THREE.Mesh(
      track(new THREE.PlaneGeometry(0.28, 0.18)),
      track(new THREE.MeshBasicMaterial({ color: 0x38bdf8 }))
    )
    uciGlow.position.set(-2.48, 0.76, -1.12)
    uciGlow.rotation.x = -Math.PI / 3
    stageGroup.add(uciGlow)

    const presenterMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x7dd3fc,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        metalness: 0.55,
        roughness: 0.18,
      })
    )
    const presenterGroup = new THREE.Group()
    presenterGroup.position.set(-1.95, 0, -1.25)
    stageGroup.add(presenterGroup)

    const presenterTorso = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.11, 0.14, 0.48, 32)),
      presenterMat
    )
    presenterTorso.position.y = 0.34
    presenterGroup.add(presenterTorso)

    const presenterHead = new THREE.Mesh(
      track(new THREE.SphereGeometry(0.105, 32, 32)),
      presenterMat
    )
    presenterHead.position.y = 0.72
    presenterGroup.add(presenterHead)

    const cyanWaveTex = track(createSoftWaveTexture(34, 211, 238))
    const emeraldWaveTex = track(createSoftWaveTexture(52, 211, 153))

    const targetHaloMat = track(
      new THREE.MeshBasicMaterial({
        map: cyanWaveTex,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    const targetHalo = new THREE.Mesh(track(new THREE.PlaneGeometry(0.95, 0.95)), targetHaloMat)
    targetHalo.rotation.x = -Math.PI / 2
    targetHalo.position.y = 0.015
    presenterGroup.add(targetHalo)

    // 4. Instanced Student Desks + Soft Contact Shadows (2 draw calls total for all 12 desks!)
    const deskTableGeo = track(createBeveledSlabGeo(0.96, 0.38, 0.075, 0.07, 0.018))
    const desksInstanced = track(new THREE.InstancedMesh(deskTableGeo, deskTopMat, 12))
    const shadowsInstanced = track(
      new THREE.InstancedMesh(track(new THREE.PlaneGeometry(1.18, 0.58)), shadowMat, 12)
    )

    const dummy = new THREE.Object3D()
    let dIdx = 0
    for (const side of [-1, 1]) {
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 2; col++) {
          const x = side * 1.75 + (col === 0 ? -0.68 : 0.68)
          const z = -0.15 + row * 0.78

          dummy.position.set(x, 0.36, z)
          dummy.rotation.set(-Math.PI / 2, 0, 0)
          dummy.scale.set(1, 1, 1)
          dummy.updateMatrix()
          desksInstanced.setMatrixAt(dIdx, dummy.matrix)

          dummy.position.set(x, 0.008, z)
          dummy.rotation.set(-Math.PI / 2, 0, 0)
          dummy.updateMatrix()
          shadowsInstanced.setMatrixAt(dIdx, dummy.matrix)
          dIdx++
        }
      }
    }
    desksInstanced.instanceMatrix.needsUpdate = true
    shadowsInstanced.instanceMatrix.needsUpdate = true
    stageGroup.add(desksInstanced)
    stageGroup.add(shadowsInstanced)

    // 5. Retractable 3D Acoustic Partition Wall
    const panelGeo = track(createBeveledSlabGeo(0.085, 1.78, 0.72, 0.025, 0.01))
    const partitionPanels: THREE.Mesh[] = []
    for (let i = 0; i < 5; i++) {
      const pMesh = new THREE.Mesh(panelGeo, partitionMat)
      pMesh.position.set(0, 0.9, -1.45 + i * 0.78)
      stageGroup.add(pMesh)
      partitionPanels.push(pMesh)
    }

    // 6. Dual Ceiling Beamforming Arrays + Feather-Smooth Volumetric Waves
    const puckGeo = track(new THREE.CylinderGeometry(0.33, 0.31, 0.075, 48))
    const ringGlowGeo = track(new THREE.TorusGeometry(0.31, 0.02, 20, 64))

    const arrayLedMatA = track(
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 1 })
    )
    const arrayLedMatB = track(
      new THREE.MeshBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.2 })
    )

    const createCeilingArray = (x: number, ledMat: THREE.MeshBasicMaterial) => {
      const grp = new THREE.Group()
      grp.position.set(x, 2.08, 0.25)
      grp.add(new THREE.Mesh(puckGeo, brushedSlateMat))
      const led = new THREE.Mesh(ringGlowGeo, ledMat)
      led.rotation.x = Math.PI / 2
      led.position.y = -0.036
      grp.add(led)
      const stem = new THREE.Mesh(
        track(new THREE.CylinderGeometry(0.016, 0.016, 0.42, 16)),
        darkTitaniumMat
      )
      stem.position.y = 0.24
      grp.add(stem)
      stageGroup.add(grp)
    }
    createCeilingArray(-1.75, arrayLedMatA)
    createCeilingArray(1.75, arrayLedMatB)

    const wavePlaneGeo = track(new THREE.PlaneGeometry(1, 1))
    const createSmoothWaves = (x: number, tex: THREE.CanvasTexture) => {
      const waves: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }[] = []
      for (let i = 0; i < 2; i++) {
        const mat = track(
          new THREE.MeshBasicMaterial({
            map: tex,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
          })
        )
        const mesh = new THREE.Mesh(wavePlaneGeo, mat)
        mesh.rotation.x = -Math.PI / 2
        mesh.position.set(x, 2.0, 0.25)
        stageGroup.add(mesh)
        waves.push({ mesh, mat })
      }
      return waves
    }
    const ripplesA = createSmoothWaves(-1.75, cyanWaveTex)
    const ripplesB = createSmoothWaves(1.75, emeraldWaveTex)

    // 7. VisionSuite PTZ Camera + High-Segment Volumetric Cone
    const ptzGroup = new THREE.Group()
    ptzGroup.position.set(-1.75, 1.86, -1.91)
    stageGroup.add(ptzGroup)

    ptzGroup.add(
      new THREE.Mesh(track(new THREE.CylinderGeometry(0.11, 0.13, 0.12, 32)), brushedSlateMat)
    )

    const gimbalHead = new THREE.Group()
    ptzGroup.add(gimbalHead)
    gimbalHead.add(new THREE.Mesh(track(new THREE.SphereGeometry(0.11, 32, 32)), darkTitaniumMat))

    const coneGeo = track(new THREE.ConeGeometry(1.12, 3.15, 48, 1, true))
    coneGeo.translate(0, -1.575, 0)
    coneGeo.rotateX(-Math.PI / 2)
    const coneMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.13,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
    )
    gimbalHead.add(new THREE.Mesh(coneGeo, coneMat))

    // Subtle pointer parallax
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
      width = Math.max(1, Math.round(r.width || container.clientWidth || 640))
      height = Math.max(1, Math.round(r.height || container.clientHeight || 380))
      viewW = window.innerWidth || 1440
      viewH = window.innerHeight || 900
      camera.aspect = width / height
      camera.fov = fitFov(30, camera.aspect, 1.45)
      camera.updateProjectionMatrix()
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
      renderer.setSize(width, height)
    }

    let resizeObs: ResizeObserver | null = null
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(updateSize)
      resizeObs.observe(container)
    } else {
      window.addEventListener("resize", updateSize, { passive: true })
    }

    let inView = true
    let tabVisible = !document.hidden
    let rafId = 0
    let running = false

    const camCur = new THREE.Vector3(-3.05, 4.75, 7.65)
    const lookCur = new THREE.Vector3(-1.15, 0.38, -0.25)
    const camTarget = new THREE.Vector3()
    const lookTarget = new THREE.Vector3()

    let partitionOpenProgress = 0
    let coneOpacityCur = 0.13
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

      const mode = scenarioRef.current
      const damp = 1 - Math.pow(0.015, dt)

      if (mode === "hyflex") {
        camTarget.set(-3.05, 4.75, 7.65)
        lookTarget.set(-1.15, 0.38, -0.25)
      } else if (mode === "local") {
        camTarget.set(-2.2, 3.85, 6.4)
        lookTarget.set(-1.65, 0.55, -0.95)
      } else if (mode === "divisivel") {
        camTarget.set(0.0, 5.7, 9.2)
        lookTarget.set(0.0, 0.35, -0.15)
      } else {
        camTarget.set(-2.6, 5.4, 8.4)
        lookTarget.set(-0.6, 0.2, 0.0)
      }

      pointer.cx += (pointer.tx - pointer.cx) * damp
      pointer.cy += (pointer.ty - pointer.cy) * damp

      camCur.lerp(camTarget, damp)
      lookCur.lerp(lookTarget, damp)

      camera.position.set(
        camCur.x + pointer.cx * 0.35,
        camCur.y - pointer.cy * 0.2,
        camCur.z
      )
      camera.lookAt(lookCur)

      const targetOpen = mode === "divisivel" ? 1 : 0
      partitionOpenProgress += (targetOpen - partitionOpenProgress) * damp

      for (let i = 0; i < partitionPanels.length; i++) {
        const panel = partitionPanels[i]
        const restZ = -1.45 + i * 0.78
        const tuckedZ = -1.92
        panel.position.z = restZ + (tuckedZ - restZ) * partitionOpenProgress
        panel.scale.z = 1 - partitionOpenProgress * 0.78
      }
      partitionMat.opacity = 0.94 - partitionOpenProgress * 0.68

      const targetLightA = mode === "standby" ? 0.9 : mode === "local" ? 8.0 : 14.5
      const targetLightB = mode === "divisivel" ? 14.0 : 1.4
      roomLightA.intensity += (targetLightA - roomLightA.intensity) * damp
      roomLightB.intensity += (targetLightB - roomLightB.intensity) * damp

      screenMatA.opacity += ((mode === "standby" ? 0.14 : 0.98) - screenMatA.opacity) * damp
      screenMatB.opacity += ((mode === "divisivel" ? 0.98 : 0.18) - screenMatB.opacity) * damp

      const presenterWalk =
        mode === "hyflex" || mode === "divisivel" ? Math.sin(elapsed * 0.85) * 0.36 : 0
      presenterGroup.position.x = -1.95 + presenterWalk
      const haloTarget = mode === "hyflex" || mode === "divisivel" ? 0.9 : 0.0
      targetHaloMat.opacity += (haloTarget - targetHaloMat.opacity) * damp

      const trackingActive = mode === "hyflex" || mode === "divisivel"
      coneOpacityCur += ((trackingActive ? 0.14 : 0.0) - coneOpacityCur) * damp
      coneMat.opacity = coneOpacityCur

      if (trackingActive) {
        const aimX =
          mode === "divisivel"
            ? Math.sin(elapsed * 0.65) * 0.44
            : (presenterGroup.position.x + 1.75) * 0.45
        gimbalHead.rotation.y += (aimX - gimbalHead.rotation.y) * damp * 1.4
        gimbalHead.rotation.x += (-0.34 - gimbalHead.rotation.x) * damp
      } else {
        gimbalHead.rotation.y += (0 - gimbalHead.rotation.y) * damp
        gimbalHead.rotation.x += (0.65 - gimbalHead.rotation.x) * damp
      }

      const micAActive = mode !== "standby"
      const micBActive = mode === "divisivel"
      arrayLedMatA.opacity += ((micAActive ? 1 : 0.22) - arrayLedMatA.opacity) * damp
      arrayLedMatB.opacity += ((micBActive ? 1 : 0.2) - arrayLedMatB.opacity) * damp

      for (let i = 0; i < 2; i++) {
        const phase = (elapsed * 0.4 + i * 0.5) % 1
        const rA = ripplesA[i]
        rA.mesh.position.y = 2.02 - phase * 1.65
        const sizeA = 0.75 + phase * (mode === "local" ? 1.5 : 2.4)
        rA.mesh.scale.setScalar(sizeA)
        rA.mat.opacity = micAActive ? Math.sin(phase * Math.PI) * 0.52 : 0

        const rB = ripplesB[i]
        rB.mesh.position.y = 2.02 - phase * 1.65
        rB.mesh.scale.setScalar(0.75 + phase * 2.4)
        rB.mat.opacity = micBActive ? Math.sin(phase * Math.PI) * 0.52 : 0
      }

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
      ([entry]) => {
        inView = entry.isIntersecting
        if (inView) start()
      },
      { threshold: 0.02 }
    )
    io.observe(container)

    const onVis = () => {
      tabVisible = !document.hidden
      if (tabVisible) start()
    }
    document.addEventListener("visibilitychange", onVis)

    renderer.render(scene, camera)
    setWebglReady(true)
    start()

    return () => {
      cancelAnimationFrame(rafId)
      io.disconnect()
      resizeObs?.disconnect()
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("visibilitychange", onVis)
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative w-full h-[235px] sm:h-[360px] md:h-[395px] select-none">
      <div
        aria-hidden={webglReady}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 pointer-events-none ${
          webglReady ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="w-full h-full rounded-3xl bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14)_0%,rgba(7,11,19,0.6)_65%,transparent_100%)] flex items-center justify-center">
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-300/70">
            Ambiente 3D Q-SYS
          </span>
        </div>
      </div>

      <div
        ref={containerRef}
        className={`w-full h-full transition-opacity duration-700 ${
          webglReady ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  )
})

export default ClassroomStage3D
