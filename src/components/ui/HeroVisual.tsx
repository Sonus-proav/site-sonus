import { useEffect, useRef, useState } from "react"
import * as THREE from "three"

// Precision-machined 3D rounded-square slab (optimized vertex count with smooth normals)
function createRoundedSquarePlate(size: number, thickness: number, cornerRadius: number, bevel: number) {
  const shape = new THREE.Shape()
  const half = size / 2
  const r = cornerRadius

  shape.moveTo(-half + r, -half)
  shape.lineTo(half - r, -half)
  shape.quadraticCurveTo(half, -half, half, -half + r)
  shape.lineTo(half, half - r)
  shape.quadraticCurveTo(half, half, half - r, half)
  shape.lineTo(-half + r, half)
  shape.quadraticCurveTo(-half, half, -half, half - r)
  shape.lineTo(-half, -half + r)
  shape.quadraticCurveTo(-half, -half, -half + r, -half)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: thickness,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 18
  })
  geo.center()
  geo.rotateX(-Math.PI / 2)
  geo.computeVertexNormals()
  return geo
}

// Precision-machined 3D hollow rounded-square frame/bezel
function createRoundedSquareRim(size: number, borderWidth: number, height: number, cornerRadius: number, bevel = 0.014) {
  const outer = new THREE.Shape()
  const half = size / 2
  const r = cornerRadius

  outer.moveTo(-half + r, -half)
  outer.lineTo(half - r, -half)
  quadraticCorners(outer, half, r)

  const hole = new THREE.Path()
  const ih = half - borderWidth
  const ir = Math.max(0.04, r - borderWidth)

  hole.moveTo(-ih + ir, -ih)
  hole.lineTo(ih - ir, -ih)
  quadraticCorners(hole, ih, ir)

  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth: height,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 18
  })
  geo.center()
  geo.rotateX(-Math.PI / 2)
  geo.computeVertexNormals()
  return geo
}

function quadraticCorners(path: THREE.Shape | THREE.Path, half: number, r: number) {
  path.quadraticCurveTo(half, -half, half, -half + r)
  path.lineTo(half, half - r)
  path.quadraticCurveTo(half, half, half - r, half)
  path.lineTo(-half + r, half)
  path.quadraticCurveTo(-half, half, -half, half - r)
  path.lineTo(-half, -half + r)
  path.quadraticCurveTo(-half, -half, -half + r, -half)
}

// Lightweight 256x256 gradient texture for smooth layer decks (4x less VRAM)
function createLayerDeckGradientTexture(r: number, g: number, b: number, maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 256
  canvas.height = 256
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#050507"
  ctx.fillRect(0, 0, 256, 256)

  const grad = ctx.createLinearGradient(0, 0, 256, 256)
  grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.22)`)
  grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, 0.08)`)
  grad.addColorStop(1, "rgba(5, 5, 7, 0)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 256, 256)

  const rad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120)
  rad.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.14)`)
  rad.addColorStop(1, "rgba(0, 0, 0, 0)")
  ctx.fillStyle = rad
  ctx.fillRect(0, 0, 256, 256)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

// High-DPI texture for the Control Layer top HUD with maximum anisotropic filtering
function createControlDeckTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#03070b"
  ctx.fillRect(0, 0, 1024, 1024)

  const grad = ctx.createRadialGradient(512, 470, 30, 512, 470, 420)
  grad.addColorStop(0, "rgba(6, 182, 212, 0.22)")
  grad.addColorStop(0.55, "rgba(6, 182, 212, 0.06)")
  grad.addColorStop(1, "rgba(0, 0, 0, 0)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 1024)

  // Top Header Divider Line
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)"
  ctx.lineWidth = 2.5
  ctx.beginPath()
  ctx.moveTo(100, 185)
  ctx.lineTo(924, 185)
  ctx.stroke()

  // Cyan status dot
  ctx.fillStyle = "#22d3ee"
  ctx.shadowColor = "#22d3ee"
  ctx.shadowBlur = 18
  ctx.beginPath()
  ctx.arc(124, 134, 11, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  // SONUS_OS text
  ctx.fillStyle = "#22d3ee"
  ctx.font = "bold 28px monospace"
  ctx.fillText("SONUS_OS", 156, 144)

  // Wifi icon on top right
  ctx.strokeStyle = "rgba(34, 211, 238, 0.65)"
  ctx.lineWidth = 4.5
  ctx.lineCap = "round"
  for (let i = 1; i <= 3; i++) {
    ctx.beginPath()
    ctx.arc(890, 148, i * 11, -Math.PI * 0.78, -Math.PI * 0.22)
    ctx.stroke()
  }

  // Precision Dial Scale Ticks around center (512, 470)
  const cx = 512
  const cy = 470
  const tickCount = 40
  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * Math.PI * 2 - Math.PI / 2
    const isActive = i <= 30
    ctx.strokeStyle = isActive ? "rgba(34, 211, 238, 0.65)" : "rgba(255, 255, 255, 0.1)"
    ctx.lineWidth = i % 4 === 0 ? 4 : 2
    const r1 = 205
    const r2 = i % 4 === 0 ? 224 : 215
    ctx.beginPath()
    ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1)
    ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2)
    ctx.stroke()
  }

  // Center Volume Readout ("85%" / "VOLUME")
  ctx.textAlign = "center"
  ctx.fillStyle = "#ffffff"
  ctx.font = "300 94px sans-serif"
  ctx.fillText("85", cx - 16, cy + 14)

  ctx.fillStyle = "#22d3ee"
  ctx.font = "bold 40px sans-serif"
  ctx.fillText("%", cx + 58, cy + 10)

  ctx.fillStyle = "rgba(161, 161, 170, 0.95)"
  ctx.font = "600 22px monospace"
  ctx.fillText("VOLUME", cx, cy + 56)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

// Crisp label texture placed directly on top of the 3D tactile buttons (SYSTEM / MATRIX)
function createButtonLabelTexture(label: string, color: string, isCyan: boolean, maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 180
  const ctx = canvas.getContext("2d")!

  ctx.clearRect(0, 0, 512, 180)

  ctx.fillStyle = isCyan ? "rgba(6, 182, 212, 0.16)" : "rgba(255, 255, 255, 0.04)"
  ctx.fillRect(8, 8, 496, 164)

  ctx.strokeStyle = isCyan ? "rgba(34, 211, 238, 0.55)" : "rgba(255, 255, 255, 0.18)"
  ctx.lineWidth = 4
  ctx.strokeRect(8, 8, 496, 164)

  ctx.fillStyle = color
  ctx.strokeStyle = color
  ctx.lineWidth = 4
  if (!isCyan) {
    ctx.beginPath()
    ctx.moveTo(148, 64)
    ctx.lineTo(170, 72)
    ctx.lineTo(170, 96)
    ctx.quadraticCurveTo(148, 118, 148, 122)
    ctx.quadraticCurveTo(148, 118, 126, 96)
    ctx.lineTo(126, 72)
    ctx.closePath()
    ctx.stroke()
  } else {
    ctx.beginPath()
    ctx.moveTo(126, 76)
    ctx.lineTo(168, 76)
    ctx.moveTo(126, 104)
    ctx.lineTo(168, 104)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(140, 76, 6, 0, Math.PI * 2)
    ctx.arc(156, 104, 6, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.textAlign = "left"
  ctx.font = "bold 36px monospace"
  ctx.fillText(label, 195, 102)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

// High-DPI circuit grid texture for Layer 1 (Network Baseplate)
function createNetworkGridTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 1024
  canvas.height = 1024
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#030610"
  ctx.fillRect(0, 0, 1024, 1024)

  const grad = ctx.createLinearGradient(0, 0, 1024, 1024)
  grad.addColorStop(0, "rgba(59, 130, 246, 0.22)")
  grad.addColorStop(1, "rgba(29, 78, 216, 0.04)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 1024, 1024)

  ctx.strokeStyle = "rgba(59, 130, 246, 0.22)"
  ctx.lineWidth = 2
  const step = 85
  for (let x = 60; x <= 964; x += step) {
    ctx.beginPath()
    ctx.moveTo(x, 60)
    ctx.lineTo(x, 964)
    ctx.stroke()
  }
  for (let y = 60; y <= 964; y += step) {
    ctx.beginPath()
    ctx.moveTo(60, y)
    ctx.lineTo(964, y)
    ctx.stroke()
  }

  ctx.strokeStyle = "rgba(96, 165, 250, 0.5)"
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.moveTo(60, 512)
  ctx.lineTo(964, 512)
  ctx.moveTo(512, 60)
  ctx.lineTo(512, 964)
  ctx.stroke()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

interface LayerCallout {
  id: string
  title: string
  subtitle: string
  dotColor: string
  lineGradient: string
  textCol: string
  widthClass: string
}

const LAYER_CALLOUTS: LayerCallout[] = [
  {
    id: "control",
    title: "Control Layer",
    subtitle: "User Interface",
    dotColor: "bg-cyan-400",
    lineGradient: "from-cyan-400",
    textCol: "text-cyan-400",
    widthClass: "w-10"
  },
  {
    id: "video",
    title: "Video Layer",
    subtitle: "Camera Tracking",
    dotColor: "bg-violet-400",
    lineGradient: "from-violet-400",
    textCol: "text-violet-400",
    widthClass: "w-16"
  },
  {
    id: "acoustic",
    title: "Acoustic Layer",
    subtitle: "DSP Processing",
    dotColor: "bg-emerald-400",
    lineGradient: "from-emerald-400",
    textCol: "text-emerald-400",
    widthClass: "w-24"
  },
  {
    id: "network",
    title: "Network Layer",
    subtitle: "AV over IP Matrix",
    dotColor: "bg-blue-400",
    lineGradient: "from-blue-400",
    textCol: "text-blue-400",
    widthClass: "w-32"
  }
]

export function HeroVisual() {
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const calloutRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isHovered, setIsHovered] = useState(false)
  const hoveredRef = useRef(false)

  useEffect(() => {
    hoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    const wrapper = wrapperRef.current
    const container = canvasContainerRef.current
    if (!wrapper || !container) return

    if (typeof navigator !== "undefined" && /ReactSnap|Prerender/i.test(navigator.userAgent)) {
      return
    }

    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item)
      return item
    }

    let width = container.clientWidth || 720
    let height = container.clientHeight || 640

    // 1. SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.5, 35)
    camera.position.set(0, 6.2, 9.5)
    camera.lookAt(0.15, -0.05, 0)

    const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    const isReducedPerf =
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("reduced-perf")
    const maxDpr = isReducedPerf ? 1.0 : 1.75

    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
        precision: "highp"
      })
    } catch {
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxDpr))
    renderer.setSize(width, height)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05

    const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)

    container.innerHTML = ""
    container.appendChild(renderer.domElement)

    // =========================================================================
    // 2. CONTROLLED RIM-ONLY STUDIO ENVIRONMENT
    // =========================================================================
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x020305)

    const leftSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 1.8, 2.5), side: THREE.DoubleSide })
    )
    leftSoftbox.position.set(-10, 0, 2)
    leftSoftbox.rotation.y = Math.PI / 2
    envScene.add(leftSoftbox)

    const rightSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.6, 1.1, 2.8), side: THREE.DoubleSide })
    )
    rightSoftbox.position.set(10, 0, 2)
    rightSoftbox.rotation.y = -Math.PI / 2
    envScene.add(rightSoftbox)

    const frontHorizonStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 2.2),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(1.4, 1.8, 2.4), side: THREE.DoubleSide })
    )
    frontHorizonStrip.position.set(0, 0.5, 11)
    envScene.add(frontHorizonStrip)

    const envRT = track(pmremGenerator.fromScene(envScene, 0.05))
    scene.environment = envRT.texture
    pmremGenerator.dispose()
    leftSoftbox.geometry.dispose()
    ;(leftSoftbox.material as THREE.Material).dispose()
    rightSoftbox.geometry.dispose()
    ;(rightSoftbox.material as THREE.Material).dispose()
    frontHorizonStrip.geometry.dispose()
    ;(frontHorizonStrip.material as THREE.Material).dispose()

    // Soft grazing side lights
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.45)
    scene.add(ambientLight)

    const sideKeyLight = new THREE.DirectionalLight(0xe0f2fe, 1.35)
    sideKeyLight.position.set(-7, 3.5, 7)
    scene.add(sideKeyLight)

    const rightRimLight = new THREE.DirectionalLight(0x818cf8, 1.1)
    rightRimLight.position.set(7, 2.5, 6)
    scene.add(rightRimLight)

    // =========================================================================
    // 3. COLOR-CODED ANODIZED TITANIUM CHASSIS (Single-pass MeshStandardMaterial)
    // =========================================================================
    const plateSize = 2.92
    const plateRadius = 0.4
    const plateGeo = track(createRoundedSquarePlate(plateSize, 0.12, plateRadius, 0.036))
    const outerWallGeo = track(createRoundedSquareRim(plateSize - 0.02, 0.1, 0.055, plateRadius - 0.01, 0.016))
    const accentRimGeo = track(createRoundedSquareRim(plateSize - 0.18, 0.024, 0.02, plateRadius - 0.08, 0.004))
    const deckPlaneGeo = track(new THREE.PlaneGeometry(plateSize - 0.22, plateSize - 0.22))

    const stackRoot = new THREE.Group()
    scene.add(stackRoot)

    const spinGroup = new THREE.Group()
    spinGroup.rotation.y = -Math.PI * 0.23
    stackRoot.add(spinGroup)

    const createColoredLayerBlock = (
      bodyColorHex: number,
      bezelColorHex: number,
      accentColorHex: number,
      deckTex: THREE.Texture,
      baseY: number,
      hoverY: number
    ) => {
      const group = new THREE.Group()
      group.position.y = baseY

      // Single-pass PBR Standard Material (2x faster shader than clearcoat PhysicalMaterial, identical studio look)
      const bodyMat = track(
        new THREE.MeshStandardMaterial({
          color: bodyColorHex,
          metalness: 0.86,
          roughness: 0.24,
          envMapIntensity: 0.85
        })
      )
      const slab = new THREE.Mesh(plateGeo, bodyMat)
      group.add(slab)

      const bezelMat = track(
        new THREE.MeshStandardMaterial({
          color: bezelColorHex,
          emissive: accentColorHex,
          emissiveIntensity: 0.12,
          metalness: 0.9,
          roughness: 0.18,
          envMapIntensity: 1.0
        })
      )
      const bezelWall = new THREE.Mesh(outerWallGeo, bezelMat)
      bezelWall.position.y = 0.082
      group.add(bezelWall)

      const deckMat = track(new THREE.MeshBasicMaterial({ map: deckTex }))
      const deckPlane = new THREE.Mesh(deckPlaneGeo, deckMat)
      deckPlane.rotation.x = -Math.PI / 2
      deckPlane.position.y = 0.097
      group.add(deckPlane)

      const accentMat = track(
        new THREE.MeshBasicMaterial({
          color: accentColorHex,
          transparent: true,
          opacity: 0.82
        })
      )
      const accentRim = new THREE.Mesh(accentRimGeo, accentMat)
      accentRim.position.y = 0.116
      group.add(accentRim)

      spinGroup.add(group)
      return { group, bodyMat, bezelMat, accentMat, baseY, hoverY }
    }

    const controlDeckTex = track(createControlDeckTexture(maxAnisotropy))
    const videoDeckTex = track(createLayerDeckGradientTexture(139, 92, 246, maxAnisotropy))
    const acousticDeckTex = track(createLayerDeckGradientTexture(16, 185, 129, maxAnisotropy))
    const networkDeckTex = track(createNetworkGridTexture(maxAnisotropy))

    const layerControl = createColoredLayerBlock(0x061821, 0x0b2938, 0x22d3ee, controlDeckTex, 1.76, 2.15)
    const layerVideo = createColoredLayerBlock(0x130926, 0x231145, 0xa78bfa, videoDeckTex, 0.58, 0.72)
    const layerAcoustic = createColoredLayerBlock(0x051c15, 0x093024, 0x10b981, acousticDeckTex, -0.58, -0.72)
    const layerNetwork = createColoredLayerBlock(0x071229, 0x0e224d, 0x3b82f6, networkDeckTex, -1.76, -2.15)

    const allLayers = [layerControl, layerVideo, layerAcoustic, layerNetwork]

    // =========================================================================
    // LAYER 4 (TOP): CONTROL LAYER (3D Rotary Dial + 3D Tactile Buttons)
    // =========================================================================
    const dialGroup = new THREE.Group()
    dialGroup.position.set(0, 0.1, -0.07)
    layerControl.group.add(dialGroup)

    const outerDialWall = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.56, 0.6, 0.16, 40, 1, true)),
      layerControl.bezelMat
    )
    outerDialWall.position.y = 0.08
    dialGroup.add(outerDialWall)

    const dialTopRing = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.56, 0.035, 16, 48)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x0e3547,
          emissive: 0x0891b2,
          emissiveIntensity: 0.25,
          metalness: 0.88,
          roughness: 0.2
        })
      )
    )
    dialTopRing.rotation.x = Math.PI / 2
    dialTopRing.position.y = 0.16
    dialGroup.add(dialTopRing)

    const dialInnerOptic = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.52, 0.012, 10, 48)),
      track(new THREE.MeshBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.75 }))
    )
    dialInnerOptic.rotation.x = Math.PI / 2
    dialInnerOptic.position.y = 0.165
    dialGroup.add(dialInnerOptic)

    const knobRotor = new THREE.Group()
    knobRotor.position.y = 0.17
    dialGroup.add(knobRotor)

    const indicatorPin = new THREE.Mesh(
      track(new THREE.BoxGeometry(0.044, 0.035, 0.13)),
      track(new THREE.MeshBasicMaterial({ color: 0x22d3ee }))
    )
    indicatorPin.position.set(0, 0.015, -0.49)
    knobRotor.add(indicatorPin)

    // Two 3D Raised Tactile Buttons (SYSTEM & MATRIX)
    const btnGeo = track(createRoundedSquarePlate(1.04, 0.055, 0.1, 0.014))
    btnGeo.scale(1, 1, 0.34)
    const btnLabelPlaneGeo = track(new THREE.PlaneGeometry(0.98, 0.32))

    const sysBtnGroup = new THREE.Group()
    sysBtnGroup.position.set(-0.58, 0.11, 0.92)
    layerControl.group.add(sysBtnGroup)
    sysBtnGroup.add(new THREE.Mesh(btnGeo, layerControl.bodyMat))

    const sysLabelTex = track(createButtonLabelTexture("SYSTEM", "rgba(255,255,255,0.75)", false, maxAnisotropy))
    const sysLabelPlane = new THREE.Mesh(
      btnLabelPlaneGeo,
      track(new THREE.MeshBasicMaterial({ map: sysLabelTex, transparent: true, depthWrite: false }))
    )
    sysLabelPlane.rotation.x = -Math.PI / 2
    sysLabelPlane.position.y = 0.046
    sysBtnGroup.add(sysLabelPlane)

    const matrixBtnGroup = new THREE.Group()
    matrixBtnGroup.position.set(0.58, 0.11, 0.92)
    layerControl.group.add(matrixBtnGroup)
    matrixBtnGroup.add(new THREE.Mesh(btnGeo, layerControl.bezelMat))

    const matrixLabelTex = track(createButtonLabelTexture("MATRIX", "#22d3ee", true, maxAnisotropy))
    const matrixLabelPlane = new THREE.Mesh(
      btnLabelPlaneGeo,
      track(new THREE.MeshBasicMaterial({ map: matrixLabelTex, transparent: true, depthWrite: false }))
    )
    matrixLabelPlane.rotation.x = -Math.PI / 2
    matrixLabelPlane.position.y = 0.046
    matrixBtnGroup.add(matrixLabelPlane)

    // =========================================================================
    // LAYER 3 (MIDDLE-TOP): VIDEO LAYER (3D Violet 16:9 Frame + Instanced AI Brackets)
    // =========================================================================
    const videoFrameRim = track(createRoundedSquareRim(1.95, 0.035, 0.04, 0.14, 0.008))
    videoFrameRim.scale(1, 1, 0.65)
    const videoFrameMesh = new THREE.Mesh(videoFrameRim, layerVideo.bezelMat)
    videoFrameMesh.position.y = 0.105
    layerVideo.group.add(videoFrameMesh)

    const aiTrackerGroup = new THREE.Group()
    aiTrackerGroup.position.y = 0.14
    layerVideo.group.add(aiTrackerGroup)

    const lensBarrel = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.3, 0.34, 0.14, 32)),
      layerVideo.bezelMat
    )
    aiTrackerGroup.add(lensBarrel)

    const lensRing = new THREE.Mesh(
      track(new THREE.TorusGeometry(0.28, 0.018, 12, 40)),
      track(new THREE.MeshBasicMaterial({ color: 0xa78bfa }))
    )
    lensRing.rotation.x = Math.PI / 2
    lensRing.position.y = 0.075
    aiTrackerGroup.add(lensRing)

    const lensGlass = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.21, 0.21, 0.15, 28)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x3b0764,
          emissive: 0x8b5cf6,
          emissiveIntensity: 0.55,
          metalness: 0.3,
          roughness: 0.15
        })
      )
    )
    aiTrackerGroup.add(lensGlass)

    // Instanced 4 Corner L-Brackets (8 boxes rendered in 1 single draw call!)
    const unitBoxGeo = track(new THREE.BoxGeometry(1, 1, 1))
    const bracketMat = track(new THREE.MeshBasicMaterial({ color: 0xc4b5fd }))
    const bracketsInstanced = new THREE.InstancedMesh(unitBoxGeo, bracketMat, 8)
    const dummy = new THREE.Object3D()
    const corners = [
      [-0.45, -0.45, 1, 1],
      [0.45, -0.45, -1, 1],
      [-0.45, 0.45, 1, -1],
      [0.45, 0.45, -1, -1]
    ]
    corners.forEach(([cx, cz, sx, sz], idx) => {
      dummy.position.set(cx + sx * 0.07, 0.04, cz)
      dummy.scale.set(0.18, 0.03, 0.035)
      dummy.updateMatrix()
      bracketsInstanced.setMatrixAt(idx * 2, dummy.matrix)

      dummy.position.set(cx, 0.04, cz + sz * 0.07)
      dummy.scale.set(0.035, 0.03, 0.18)
      dummy.updateMatrix()
      bracketsInstanced.setMatrixAt(idx * 2 + 1, dummy.matrix)
    })
    bracketsInstanced.instanceMatrix.needsUpdate = true
    aiTrackerGroup.add(bracketsInstanced)

    // =========================================================================
    // LAYER 2 (MIDDLE-BOTTOM): ACOUSTIC LAYER (Instanced 16 3D EQ Bars = 2 Draw Calls!)
    // =========================================================================
    const micHub = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.32, 0.36, 0.16, 32)),
      layerAcoustic.bezelMat
    )
    micHub.position.set(0, 0.12, -0.15)
    layerAcoustic.group.add(micHub)

    const micCore = new THREE.Mesh(
      track(new THREE.CylinderGeometry(0.2, 0.2, 0.18, 24)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x064e3b,
          emissive: 0x10b981,
          emissiveIntensity: 0.65,
          metalness: 0.8,
          roughness: 0.2
        })
      )
    )
    micCore.position.set(0, 0.12, -0.15)
    layerAcoustic.group.add(micCore)

    const waveRings: { mesh: THREE.Mesh; mat: THREE.MeshBasicMaterial }[] = []
    const baseRingGeo = track(new THREE.TorusGeometry(0.38, 0.016, 10, 40))
    baseRingGeo.rotateX(Math.PI / 2)
    for (let i = 0; i < 3; i++) {
      const mat = track(
        new THREE.MeshBasicMaterial({
          color: 0x34d399,
          transparent: true,
          opacity: 0.65
        })
      )
      const ring = new THREE.Mesh(baseRingGeo, mat)
      ring.position.set(0, 0.11, -0.15)
      layerAcoustic.group.add(ring)
      waveRings.push({ mesh: ring, mat })
    }

    // 16 Extruded 3D Emerald Spectrum Bars via InstancedMesh (32 meshes -> 2 draw calls!)
    const eqCount = 16
    const eqBodyGeo = track(new THREE.BoxGeometry(0.095, 0.3, 0.095))
    eqBodyGeo.translate(0, 0.15, 0)
    const eqCapGeo = track(new THREE.BoxGeometry(0.098, 0.03, 0.098))

    const eqBodyMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x065f46,
        emissive: 0x059669,
        emissiveIntensity: 0.35,
        metalness: 0.75,
        roughness: 0.22
      })
    )
    const eqCapMat = track(new THREE.MeshBasicMaterial({ color: 0x34d399 }))

    const eqBodyInstanced = new THREE.InstancedMesh(eqBodyGeo, eqBodyMat, eqCount)
    const eqCapInstanced = new THREE.InstancedMesh(eqCapGeo, eqCapMat, eqCount)
    eqBodyInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    eqCapInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    layerAcoustic.group.add(eqBodyInstanced)
    layerAcoustic.group.add(eqCapInstanced)

    // =========================================================================
    // LAYER 1 (BOTTOM BASE): NETWORK LAYER (AV over IP Matrix + Instanced Nodes)
    // =========================================================================
    const cpuPackage = new THREE.Mesh(
      track(createRoundedSquarePlate(0.72, 0.12, 0.09, 0.02)),
      layerNetwork.bezelMat
    )
    cpuPackage.position.y = 0.13
    layerNetwork.group.add(cpuPackage)

    const cpuDie = new THREE.Mesh(
      track(createRoundedSquarePlate(0.42, 0.06, 0.05, 0.01)),
      track(
        new THREE.MeshStandardMaterial({
          color: 0x1e3a8a,
          emissive: 0x3b82f6,
          emissiveIntensity: 0.75,
          metalness: 0.85,
          roughness: 0.18
        })
      )
    )
    cpuDie.position.y = 0.195
    layerNetwork.group.add(cpuDie)

    const pulseX = new THREE.Mesh(
      track(new THREE.BoxGeometry(0.55, 0.025, 0.04)),
      track(new THREE.MeshBasicMaterial({ color: 0x60a5fa }))
    )
    pulseX.position.y = 0.105
    layerNetwork.group.add(pulseX)

    const pulseZ = new THREE.Mesh(
      track(new THREE.BoxGeometry(0.04, 0.025, 0.55)),
      track(new THREE.MeshBasicMaterial({ color: 0x38bdf8 }))
    )
    pulseZ.position.y = 0.105
    layerNetwork.group.add(pulseZ)

    const nodeGeo = track(new THREE.CylinderGeometry(0.065, 0.065, 0.06, 16))
    const nodesInstanced = new THREE.InstancedMesh(nodeGeo, layerNetwork.bezelMat, 4)
    const nodePositions = [
      [-0.95, -0.95],
      [0.95, -0.95],
      [-0.95, 0.95],
      [0.95, 0.95]
    ]
    nodePositions.forEach(([nx, nz], idx) => {
      dummy.position.set(nx, 0.11, nz)
      dummy.scale.set(1, 1, 1)
      dummy.updateMatrix()
      nodesInstanced.setMatrixAt(idx, dummy.matrix)
    })
    nodesInstanced.instanceMatrix.needsUpdate = true
    layerNetwork.group.add(nodesInstanced)

    // =========================================================================
    // 4. RESPONSIVE LAYOUT, VISIBILITY & INTERSECTION OBSERVER
    // =========================================================================
    let isDesktopView = window.innerWidth >= 1024

    const updateSize = () => {
      if (!container) return
      width = container.clientWidth || 720
      height = container.clientHeight || 640
      isDesktopView = window.innerWidth >= 1024

      camera.aspect = width / height
      if (isDesktopView) {
        camera.position.set(0, 6.2, 9.5)
        camera.lookAt(0.15, -0.05, 0)
        stackRoot.position.set(-0.08, -0.05, 0)
      } else {
        // Perfectly centered on mobile & tablets
        camera.position.set(0, 6.4, 10.2)
        camera.lookAt(0, -0.05, 0)
        stackRoot.position.set(0, -0.05, 0)
      }
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }

    updateSize()
    window.addEventListener("resize", updateSize, { passive: true })

    let isInViewport = true
    let isTabVisible = !document.hidden
    let isAnimating = false
    let isScrolling = false
    let scrollTimer: ReturnType<typeof setTimeout> | undefined

    const handleScroll = () => {
      if (!isMobileDevice) return
      isScrolling = true
      isAnimating = false
      clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        isScrolling = false
        if (isInViewport && isTabVisible) {
          startLoop()
        }
      }, 80)
    }

    if (isMobileDevice) {
      window.addEventListener("scroll", handleScroll, { passive: true })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting
        if (isInViewport && isTabVisible && !isScrolling) {
          startLoop()
        }
      },
      { threshold: isMobileDevice ? 0.25 : 0.05 }
    )
    observer.observe(wrapper)

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden
      if (isTabVisible && isInViewport && !isScrolling) {
        startLoop()
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    // =========================================================================
    // 5. INTERACTIVE MOUSE/TOUCH TILT, HOVER EXPLOSION & REAL-TIME 3D CALLOUTS
    // =========================================================================
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 }
    let hoverProgress = 0
    let knobAngle = 0

    const onMouseMove = (e: MouseEvent) => {
      if (!isInViewport || !wrapper) return
      const rect = wrapper.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointer.targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width / 2)))
      pointer.targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)))
    }

    const onTouchMove = (e: TouchEvent) => {
      if (!isInViewport || !wrapper || e.touches.length === 0) return
      const rect = wrapper.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      pointer.targetX = Math.max(-1, Math.min(1, (e.touches[0].clientX - cx) / (rect.width / 2))) * 0.7
      pointer.targetY = Math.max(-1, Math.min(1, (e.touches[0].clientY - cy) / (rect.height / 2))) * 0.7
    }

    const onMouseLeave = () => {
      pointer.targetX = 0
      pointer.targetY = 0
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    wrapper.addEventListener("touchmove", onTouchMove, { passive: true })
    wrapper.addEventListener("mouseleave", onMouseLeave)

    const worldPos = new THREE.Vector3()
    const bestScreenPos = new THREE.Vector3()
    const cornerVec = new THREE.Vector3()
    const eqDummy = new THREE.Object3D()

    const halfEdge = plateSize / 2 - 0.08
    const localCorners = [
      new THREE.Vector3(halfEdge, 0.08, halfEdge),
      new THREE.Vector3(halfEdge, 0.08, -halfEdge),
      new THREE.Vector3(-halfEdge, 0.08, halfEdge),
      new THREE.Vector3(-halfEdge, 0.08, -halfEdge)
    ]

    let elapsed = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const animate = (now: number) => {
      if (!isInViewport || !isTabVisible || isScrolling) {
        isAnimating = false
        return
      }

      animationFrameId = requestAnimationFrame(animate)

      const dt = Math.min((now - lastTime) * 0.001, 0.1)
      lastTime = now

      elapsed += dt
      const t = elapsed

      const lerpFactor = 1 - Math.pow(0.001, dt)
      pointer.currentX += (pointer.targetX - pointer.currentX) * lerpFactor * 0.8
      pointer.currentY += (pointer.targetY - pointer.currentY) * lerpFactor * 0.8

      const targetHover = hoveredRef.current ? 1 : 0
      hoverProgress += (targetHover - hoverProgress) * lerpFactor * 0.9

      // Smooth 3D tilt tracking the mouse + subtle scale on hover
      stackRoot.rotation.x = pointer.currentY * 0.22
      stackRoot.rotation.z = -pointer.currentX * 0.16
      stackRoot.rotation.y = pointer.currentX * 0.25
      const s = 1 + hoverProgress * 0.05
      stackRoot.scale.setScalar(s)

      // Continuous slow 360 spin (120s per revolution)
      spinGroup.rotation.y = -Math.PI * 0.23 + (t / 120) * Math.PI * 2

      // Explode layers vertically on hover
      for (let i = 0; i < 4; i++) {
        const layer = allLayers[i]
        layer.group.position.y = layer.baseY + (layer.hoverY - layer.baseY) * hoverProgress
      }

      // 1. Control Layer Animation: Rotary Volume Knob rotates on hover
      const targetKnob = hoverProgress * 2.3 + Math.sin(t * 0.8) * 0.15
      knobAngle += (targetKnob - knobAngle) * lerpFactor * 0.9
      knobRotor.rotation.y = -knobAngle

      // 2. Video Layer Animation: 3D AI Camera Tracker glides smoothly
      aiTrackerGroup.position.x = Math.sin(t * 0.9) * 0.38 + Math.cos(t * 0.45) * 0.15
      aiTrackerGroup.position.z = Math.cos(t * 0.7) * 0.25

      // 3. Acoustic Layer Animation: Concentric 3D soundwaves & Instanced 16 EQ Bars
      for (let i = 0; i < 3; i++) {
        const item = waveRings[i]
        const progress = (t * 0.45 + i / 3) % 1
        item.mesh.scale.setScalar(0.8 + progress * 2.0)
        item.mat.opacity = (1 - progress) * 0.65
      }

      for (let i = 0; i < eqCount; i++) {
        const bx = -1.04 + (i / 15) * 2.08
        const wave1 = Math.sin(t * 4.2 + i * 0.45) * 0.5 + 0.5
        const wave2 = Math.cos(t * 2.8 - i * 0.3) * 0.5 + 0.5
        const scaleY = 0.3 + (wave1 * 0.6 + wave2 * 0.4) * 1.15

        eqDummy.position.set(bx, 0.09, 0.9)
        eqDummy.scale.set(1, scaleY, 1)
        eqDummy.updateMatrix()
        eqBodyInstanced.setMatrixAt(i, eqDummy.matrix)

        eqDummy.position.set(bx, 0.09 + 0.3 * scaleY + 0.015, 0.9)
        eqDummy.scale.set(1, 1, 1)
        eqDummy.updateMatrix()
        eqCapInstanced.setMatrixAt(i, eqDummy.matrix)
      }
      eqBodyInstanced.instanceMatrix.needsUpdate = true
      eqCapInstanced.instanceMatrix.needsUpdate = true

      // 4. Network Layer Animation: High-speed AV-over-IP optical pulses
      const p1 = ((t * 0.75) % 1) * 2 - 1
      const p2 = (((t * 0.75) + 0.5) % 1) * 2 - 1
      pulseX.position.x = p1 * 1.05
      pulseZ.position.z = p2 * 1.05

      renderer.render(scene, camera)

      // Project the rightmost 3D corner of each layer onto the 2D HUD overlay (Desktop only)
      if (isDesktopView) {
        for (let idx = 0; idx < 4; idx++) {
          const el = calloutRefs.current[idx]
          if (!el) continue
          const layer = allLayers[idx]

          let maxX = -Infinity
          for (let c = 0; c < 4; c++) {
            cornerVec.copy(localCorners[c])
            layer.group.localToWorld(cornerVec)
            worldPos.copy(cornerVec).project(camera)
            if (worldPos.x > maxX) {
              maxX = worldPos.x
              bestScreenPos.copy(worldPos)
            }
          }

          const sx = (bestScreenPos.x * 0.5 + 0.5) * width - 10
          const sy = (-bestScreenPos.y * 0.5 + 0.5) * height

          el.style.transform = `translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0)`
        }
      }
    }

    function startLoop() {
      if (!isAnimating && isInViewport && isTabVisible && !isScrolling) {
        isAnimating = true
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    startLoop()

    return () => {
      isAnimating = false
      if (isMobileDevice) {
        window.removeEventListener("scroll", handleScroll)
        clearTimeout(scrollTimer)
      }
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("resize", updateSize)
      window.removeEventListener("mousemove", onMouseMove)
      wrapper.removeEventListener("touchmove", onTouchMove)
      wrapper.removeEventListener("mouseleave", onMouseLeave)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      className="relative w-full h-[420px] sm:h-[480px] md:h-[600px] flex items-center justify-center group select-none"
    >
      {/* Zero-Cost Hardware-Accelerated Radial Aura (Replaces expensive CSS blur-[60px] layers) */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 opacity-70 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 46% 50%, rgba(6,182,212,0.14) 0%, rgba(139,92,246,0.08) 28%, rgba(16,185,129,0.06) 50%, transparent 72%)"
        }}
      />

      {/* Oversized WebGL Viewport Wrapper (centered on mobile/tablet, offset left on desktop for HUD callouts) */}
      <div
        ref={canvasContainerRef}
        className="absolute -inset-4 lg:-left-28 lg:-right-8 lg:-top-10 lg:-bottom-10 z-10 pointer-events-none"
      />

      {/* 2D HUD OVERLAY - Aligned to the exact same coordinate space as canvasContainerRef */}
      <div className="absolute -inset-4 lg:-left-28 lg:-right-8 lg:-top-10 lg:-bottom-10 pointer-events-none hidden lg:block z-30">
        {LAYER_CALLOUTS.map((item, idx) => (
          <div
            key={item.id}
            ref={(el) => {
              calloutRefs.current[idx] = el
            }}
            className="absolute top-0 left-0 will-change-transform"
          >
            <div className="flex items-center -translate-y-1/2">
              <div className="flex items-center relative z-0">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${item.dotColor} animate-pulse`}
                  style={{ boxShadow: "0 0 10px currentColor" }}
                />
                <div
                  className={`h-[1px] bg-gradient-to-r ${item.lineGradient} to-transparent opacity-60 ${item.widthClass}`}
                />
              </div>
              <div className="bg-[#050505]/95 border border-white/10 py-2.5 px-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.85)] -ml-3 relative z-10 whitespace-nowrap backdrop-blur-md">
                <p
                  className={`${item.textCol} text-[10px] font-bold tracking-[0.25em] uppercase mb-0.5`}
                >
                  {item.title}
                </p>
                <p className="text-white font-medium text-[11px] font-mono">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
