import { useEffect, useRef, memo } from "react"
import * as THREE from "three"
import { FadeIn } from "@/components/ui/FadeIn"

interface WarrantyBannerProps {
  title?: string
  description?: string
  variant?: "qsys" | "corporate" | "church" | "auditorium" | "default"
}

// 1. Precision-machined 3D Beveled Titanium Blade (unit width = 1.0 for InstancedMesh scaling)
function createTitaniumBladeGeo(width: number, thickness: number, depth: number, radius: number) {
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
    bevelSegments: 3,
    steps: 1,
    bevelSize: r,
    bevelThickness: radius,
    curveSegments: 10
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 2. 3D Rounded-Square Slab (lies in X-Y plane, Z is thickness)
function createRoundedSquareSlabGeo(size: number, depth: number, cornerRadius: number, bevel: number) {
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
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 16
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 3. 3D Hollow Rounded-Square Frame/Chassis (lies in X-Y plane, Z is thickness)
function createRoundedSquareFrameGeo(
  size: number,
  borderWidth: number,
  depth: number,
  cornerRadius: number,
  bevel = 0.02
) {
  const outer = new THREE.Shape()
  const half = size / 2
  const r = cornerRadius

  outer.moveTo(-half + r, -half)
  outer.lineTo(half - r, -half)
  outer.quadraticCurveTo(half, -half, half, -half + r)
  outer.lineTo(half, half - r)
  outer.quadraticCurveTo(half, half, half - r, half)
  outer.lineTo(-half + r, half)
  outer.quadraticCurveTo(-half, half, -half, half - r)
  outer.lineTo(-half, -half + r)
  outer.quadraticCurveTo(-half, -half, -half + r, -half)

  const hole = new THREE.Path()
  const ih = half - borderWidth
  const ir = Math.max(0.04, r - borderWidth)

  hole.moveTo(-ih + ir, -ih)
  hole.lineTo(ih - ir, -ih)
  hole.quadraticCurveTo(ih, -ih, ih, -ih + ir)
  hole.lineTo(ih, ih - ir)
  hole.quadraticCurveTo(ih, ih, ih - ir, ih)
  hole.lineTo(-ih + ir, ih)
  hole.quadraticCurveTo(-ih, ih, -ih, ih - ir)
  hole.lineTo(-ih, -ih + ir)
  hole.quadraticCurveTo(-ih, -ih, -ih + ir, -ih)

  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 16
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 4. 3D Hollow Heraldic Shield Frame + Solid Backing (for Church / Corporate)
function traceShieldPath(path: THREE.Shape | THREE.Path, s: number) {
  path.moveTo(0, 1.38 * s)
  path.quadraticCurveTo(0.7 * s, 1.32 * s, 1.16 * s, 1.02 * s)
  path.lineTo(1.16 * s, 0.06 * s)
  path.quadraticCurveTo(1.16 * s, -0.82 * s, 0, -1.44 * s)
  path.quadraticCurveTo(-1.16 * s, -0.82 * s, -1.16 * s, 0.06 * s)
  path.lineTo(-1.16 * s, 1.02 * s)
  path.quadraticCurveTo(-0.7 * s, 1.32 * s, 0, 1.38 * s)
}

function createShieldBackplateGeo(scale: number, depth: number, bevel: number) {
  const shape = new THREE.Shape()
  traceShieldPath(shape, scale)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 18
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

function createHollowShieldFrameGeo(outerScale: number, innerScale: number, depth: number, bevel: number) {
  const outer = new THREE.Shape()
  traceShieldPath(outer, outerScale)

  const hole = new THREE.Path()
  traceShieldPath(hole, innerScale)
  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 18
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 5. 3D Extruded Checkmark Emblem (lies in X-Y plane, Z is thickness)
function createCheckmark3DGeo() {
  const s = new THREE.Shape()
  s.moveTo(-0.34, -0.02)
  s.lineTo(-0.1, -0.26)
  s.lineTo(0.38, 0.22)
  s.lineTo(0.25, 0.35)
  s.lineTo(-0.1, 0.0)
  s.lineTo(-0.21, 0.11)
  s.closePath()

  const geo = new THREE.ExtrudeGeometry(s, {
    depth: 0.11,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.018,
    bevelThickness: 0.018
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// High-DPI Silicon Die Circuit Texture for Q-SYS Processor Core
function createQsysDieTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 512
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#03080e"
  ctx.fillRect(0, 0, 512, 512)

  const grad = ctx.createRadialGradient(256, 256, 20, 256, 256, 240)
  grad.addColorStop(0, "rgba(6, 182, 212, 0.25)")
  grad.addColorStop(1, "rgba(3, 8, 14, 0)")
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, 512, 512)

  ctx.strokeStyle = "rgba(34, 211, 238, 0.18)"
  ctx.lineWidth = 2
  for (let i = 64; i <= 448; i += 48) {
    ctx.beginPath()
    ctx.moveTo(i, 48)
    ctx.lineTo(i, 464)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(48, i)
    ctx.lineTo(464, i)
    ctx.stroke()
  }

  ctx.fillStyle = "#22d3ee"
  ctx.font = "bold 22px monospace"
  ctx.fillText("Q-SYS // CORE", 64, 92)

  ctx.textAlign = "right"
  ctx.fillStyle = "rgba(255,255,255,0.85)"
  ctx.font = "bold 24px monospace"
  ctx.fillText("SLA 3Y", 448, 436)

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = maxAnisotropy
  tex.needsUpdate = true
  return tex
}

const WarrantyMonolith3D = memo(function WarrantyMonolith3D({
  variant,
  sectionRef
}: {
  variant: "qsys" | "corporate" | "church" | "auditorium" | "default"
  sectionRef: React.RefObject<HTMLElement | null>
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (typeof navigator !== "undefined" && /ReactSnap|Prerender/i.test(navigator.userAgent)) {
      return
    }

    let cleanupScene: (() => void) | null = null
    let booted = false

    const bootScene = () => {
      if (booted || !containerRef.current) return
      booted = true

      const disposables: { dispose: () => void }[] = []
      const track = <T extends { dispose: () => void }>(item: T): T => {
        disposables.push(item)
        return item
      }

      let width = container.clientWidth || 240
      let height = container.clientHeight || 240

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.5, 25)
      camera.position.set(0, 0.15, 6.2)
      camera.lookAt(0, 0, 0)

      let renderer: THREE.WebGLRenderer
      try {
        renderer = new THREE.WebGLRenderer({
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true
        })
      } catch {
        return
      }

      const isMobile =
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      const isCoarsePointer =
        typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2.0))
      renderer.setSize(width, height)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.18
      renderer.outputColorSpace = THREE.SRGBColorSpace

      const maxAnisotropy = Math.min(renderer.capabilities.getMaxAnisotropy(), 8)

      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      container.appendChild(renderer.domElement)

      // Prevent WebGL context loss crash on mobile app switching
      const onContextLost = (e: Event) => {
        e.preventDefault()
      }
      renderer.domElement.addEventListener("webglcontextlost", onContextLost, false)

      // =========================================================================
      // THEME PALETTES (Dark Anodized Titanium + Signature Accent per Variant)
      // =========================================================================
      const palettes = {
        qsys: {
          titaniumHex: 0x0d1520,
          bezelHex: 0x152536,
          accentHex: 0x22d3ee,
          rimLeft: new THREE.Color(0.25, 2.5, 3.4),
          rimRight: new THREE.Color(0.4, 1.3, 3.4)
        },
        church: {
          titaniumHex: 0x14100a,
          bezelHex: 0x291e10,
          accentHex: 0xf59e0b,
          rimLeft: new THREE.Color(3.2, 2.1, 0.4),
          rimRight: new THREE.Color(2.2, 1.2, 0.2)
        },
        auditorium: {
          titaniumHex: 0x16090b,
          bezelHex: 0x2b1014,
          accentHex: 0xef4444,
          rimLeft: new THREE.Color(3.4, 0.5, 0.6),
          rimRight: new THREE.Color(2.2, 0.3, 0.5)
        },
        corporate: {
          titaniumHex: 0x0b1713,
          bezelHex: 0x132b22,
          accentHex: 0x10b981,
          rimLeft: new THREE.Color(0.3, 2.8, 1.8),
          rimRight: new THREE.Color(0.4, 1.5, 2.2)
        },
        default: {
          titaniumHex: 0x0d1422,
          bezelHex: 0x17253d,
          accentHex: 0x38bdf8,
          rimLeft: new THREE.Color(0.3, 2.2, 3.4),
          rimRight: new THREE.Color(0.4, 1.3, 3.2)
        }
      }
      const pal = palettes[variant] || palettes.default

      // =========================================================================
      // STUDIO SOFTBOX HDR ENVIRONMENT (Silky Specular Reflections on 3D Bevels)
      // =========================================================================
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      const envScene = new THREE.Scene()
      envScene.background = new THREE.Color(0x030407)

      const topSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 6),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(3.0, 3.3, 3.8), side: THREE.DoubleSide })
      )
      topSoftbox.position.set(0, 8, 3)
      topSoftbox.rotation.x = Math.PI / 2.2
      envScene.add(topSoftbox)

      const leftSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: pal.rimLeft, side: THREE.DoubleSide })
      )
      leftSoftbox.position.set(-8, 1, 4)
      leftSoftbox.rotation.y = Math.PI / 2.25
      envScene.add(leftSoftbox)

      const rightSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: pal.rimRight, side: THREE.DoubleSide })
      )
      rightSoftbox.position.set(8, -1, 4)
      rightSoftbox.rotation.y = -Math.PI / 2.25
      envScene.add(rightSoftbox)

      const envRT = track(pmremGenerator.fromScene(envScene, 0.045))
      scene.environment = envRT.texture
      pmremGenerator.dispose()
      topSoftbox.geometry.dispose()
      ;(topSoftbox.material as THREE.Material).dispose()
      leftSoftbox.geometry.dispose()
      ;(leftSoftbox.material as THREE.Material).dispose()
      rightSoftbox.geometry.dispose()
      ;(rightSoftbox.material as THREE.Material).dispose()

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.45)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2)
      keyLight.position.set(3, 7, 8)
      scene.add(keyLight)

      const rimPoint = new THREE.PointLight(pal.accentHex, 18, 12, 1.7)
      rimPoint.position.set(-3.2, 1.5, 4.0)
      scene.add(rimPoint)

      // =========================================================================
      // SHARED TITANIUM PBR MATERIALS
      // =========================================================================
      const darkTitaniumMat = track(
        new THREE.MeshStandardMaterial({
          color: pal.titaniumHex,
          metalness: 0.92,
          roughness: 0.2,
          envMapIntensity: 1.05
        })
      )

      const brushedBezelMat = track(
        new THREE.MeshStandardMaterial({
          color: pal.bezelHex,
          emissive: pal.accentHex,
          emissiveIntensity: 0.08,
          metalness: 0.94,
          roughness: 0.16,
          envMapIntensity: 1.2
        })
      )

      const accentGlowMat = track(
        new THREE.MeshStandardMaterial({
          color: pal.bezelHex,
          emissive: pal.accentHex,
          emissiveIntensity: 0.55,
          metalness: 0.85,
          roughness: 0.18
        })
      )

      const opticLineMat = track(
        new THREE.MeshBasicMaterial({
          color: pal.accentHex,
          transparent: true,
          opacity: 0.85
        })
      )

      const sculptureGroup = new THREE.Group()
      scene.add(sculptureGroup)

      const checkGeo = track(createCheckmark3DGeo())
      const dummy = new THREE.Object3D()

      // Instanced kinetic data structures (1 draw call for all pins or louvers!)
      let instancedPins: THREE.InstancedMesh | null = null
      const pinRestTransforms: { x: number; y: number; z: number; rotZ: number }[] = []

      let instancedLouvers: THREE.InstancedMesh | null = null
      const louverRestTransforms: { y: number; z: number; scaleX: number }[] = []

      const gimbalRings: THREE.Object3D[] = []

      // =========================================================================
      // BESPOKE 3D SCULPTURE PER VARIANT
      // =========================================================================
      if (variant === "qsys") {
        // 1. Q-SYS: 3D Angled Titanium Processor Package + 20 Instanced Bus Blades + Core
        sculptureGroup.rotation.set(-0.32, 0.42, 0.08)

        const substrate = new THREE.Mesh(
          track(createRoundedSquareSlabGeo(2.25, 0.22, 0.34, 0.045)),
          darkTitaniumMat
        )
        sculptureGroup.add(substrate)

        const spreaderFrame = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(2.12, 0.22, 0.16, 0.3, 0.025)),
          brushedBezelMat
        )
        spreaderFrame.position.z = 0.15
        sculptureGroup.add(spreaderFrame)

        const dieTex = track(createQsysDieTexture(maxAnisotropy))
        const diePlane = new THREE.Mesh(
          track(new THREE.PlaneGeometry(1.68, 1.68)),
          track(new THREE.MeshBasicMaterial({ map: dieTex }))
        )
        diePlane.position.z = 0.158
        sculptureGroup.add(diePlane)

        const opticRim = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(1.7, 0.025, 0.04, 0.16, 0.004)),
          opticLineMat
        )
        opticRim.position.z = 0.22
        sculptureGroup.add(opticRim)

        // 20 Precision 3D Extruded Titanium Connector Blades via SINGLE InstancedMesh (1 draw call!)
        const pinGeo = track(createTitaniumBladeGeo(0.32, 0.08, 0.14, 0.02))
        instancedPins = track(new THREE.InstancedMesh(pinGeo, brushedBezelMat, 20))
        instancedPins.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

        let idx = 0
        for (let side = 0; side < 4; side++) {
          for (let i = 0; i < 5; i++) {
            const offset = (i - 2) * 0.34
            let x = 0
            let y = 0
            let rotZ = 0
            if (side === 0) {
              x = -1.26
              y = offset
            } else if (side === 1) {
              x = 1.26
              y = offset
            } else if (side === 2) {
              x = offset
              y = 1.26
              rotZ = Math.PI / 2
            } else {
              x = offset
              y = -1.26
              rotZ = Math.PI / 2
            }
            pinRestTransforms.push({ x, y, z: -0.02, rotZ })
            dummy.position.set(x, y, -0.02)
            dummy.rotation.set(0, 0, rotZ)
            dummy.scale.set(1, 1, 1)
            dummy.updateMatrix()
            instancedPins.setMatrixAt(idx++, dummy.matrix)
          }
        }
        instancedPins.instanceMatrix.needsUpdate = true
        sculptureGroup.add(instancedPins)

        const coreHub = new THREE.Mesh(
          track(createRoundedSquareSlabGeo(0.92, 0.16, 0.18, 0.03)),
          brushedBezelMat
        )
        coreHub.position.z = 0.24
        sculptureGroup.add(coreHub)

        const checkMesh = new THREE.Mesh(checkGeo, accentGlowMat)
        checkMesh.position.set(0, 0, 0.36)
        sculptureGroup.add(checkMesh)
      } else if (variant === "auditorium") {
        // 3. AUDITORIUM: 3D Gimbaled Stage-Ruby Acoustic Gyroscope & Precision Target
        sculptureGroup.rotation.set(-0.26, 0.38, 0.18)

        const outerArmor = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(2.38, 0.24, 0.26, 0.46, 0.045)),
          darkTitaniumMat
        )
        outerArmor.rotation.z = Math.PI / 4
        sculptureGroup.add(outerArmor)

        const outerOptic = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(2.14, 0.03, 0.28, 0.38, 0.005)),
          opticLineMat
        )
        outerOptic.rotation.z = Math.PI / 4
        sculptureGroup.add(outerOptic)

        const ring1Group = new THREE.Group()
        sculptureGroup.add(ring1Group)
        const ring1 = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(1.72, 0.16, 0.2, 0.86, 0.03)),
          brushedBezelMat
        )
        ring1Group.add(ring1)
        gimbalRings.push(ring1Group)

        const ring2Group = new THREE.Group()
        sculptureGroup.add(ring2Group)
        const ring2 = new THREE.Mesh(
          track(createRoundedSquareFrameGeo(1.26, 0.13, 0.18, 0.63, 0.025)),
          darkTitaniumMat
        )
        ring2Group.add(ring2)
        const ring2Optic = new THREE.Mesh(
          track(new THREE.TorusGeometry(0.57, 0.018, 12, 48)),
          opticLineMat
        )
        ring2Optic.position.z = 0.11
        ring2Group.add(ring2Optic)
        gimbalRings.push(ring2Group)

        const centerCore = new THREE.Mesh(
          track(new THREE.CylinderGeometry(0.42, 0.46, 0.24, 32)),
          brushedBezelMat
        )
        centerCore.rotation.x = Math.PI / 2
        sculptureGroup.add(centerCore)

        const checkMesh = new THREE.Mesh(checkGeo, accentGlowMat)
        checkMesh.scale.setScalar(0.78)
        checkMesh.position.set(0, 0, 0.16)
        sculptureGroup.add(checkMesh)
      } else {
        // 2 & 4. CHURCH / CORPORATE / DEFAULT: 3D Hollow Shield + 9 Instanced Kinetic Titanium Louvers!
        sculptureGroup.rotation.set(-0.22, 0.38, 0.04)

        const backShield = new THREE.Mesh(
          track(createShieldBackplateGeo(0.96, 0.16, 0.04)),
          darkTitaniumMat
        )
        backShield.position.z = -0.08
        sculptureGroup.add(backShield)

        // 9 Horizontal 3D Beveled Titanium Acoustic Louvers via SINGLE InstancedMesh (1 draw call!)
        const louverCount = 9
        const baseBladeGeo = track(createTitaniumBladeGeo(1.0, 0.1, 0.28, 0.028))
        instancedLouvers = track(
          new THREE.InstancedMesh(baseBladeGeo, darkTitaniumMat, louverCount)
        )
        instancedLouvers.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

        for (let i = 0; i < louverCount; i++) {
          const u = i / (louverCount - 1)
          const y = (u - 0.48) * 1.95
          const w = u < 0.45 ? 0.55 + u * 2.4 : 1.65
          louverRestTransforms.push({ y, z: 0.05, scaleX: w })
          dummy.position.set(0, y, 0.05)
          dummy.rotation.set(0, 0, 0)
          dummy.scale.set(w, 1, 1)
          dummy.updateMatrix()
          instancedLouvers.setMatrixAt(i, dummy.matrix)
        }
        instancedLouvers.instanceMatrix.needsUpdate = true
        sculptureGroup.add(instancedLouvers)

        const shieldFrame = new THREE.Mesh(
          track(createHollowShieldFrameGeo(1.04, 0.82, 0.24, 0.045)),
          brushedBezelMat
        )
        shieldFrame.position.z = 0.06
        sculptureGroup.add(shieldFrame)

        const innerOptic = new THREE.Mesh(
          track(createHollowShieldFrameGeo(0.83, 0.8, 0.06, 0.005)),
          opticLineMat
        )
        innerOptic.position.z = 0.2
        sculptureGroup.add(innerOptic)

        const crestPedestal = new THREE.Mesh(
          track(createShieldBackplateGeo(0.42, 0.14, 0.03)),
          brushedBezelMat
        )
        crestPedestal.position.z = 0.22
        sculptureGroup.add(crestPedestal)

        const checkMesh = new THREE.Mesh(checkGeo, accentGlowMat)
        checkMesh.scale.setScalar(0.88)
        checkMesh.position.set(0, 0.02, 0.34)
        sculptureGroup.add(checkMesh)
      }

      // =========================================================================
      // ZERO-REFLOW RESIZE, INTERSECTION OBSERVER & POINTER PARALLAX
      // =========================================================================
      let viewW = window.innerWidth || 1440
      let viewH = window.innerHeight || 900

      const updateSize = () => {
        if (!container) return
        width = container.clientWidth || 240
        height = container.clientHeight || 240
        viewW = window.innerWidth || 1440
        viewH = window.innerHeight || 900
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(updateSize)
        resizeObserver.observe(container)
      } else {
        window.addEventListener("resize", updateSize, { passive: true })
      }

      let isInViewport = true
      let isTabVisible = !document.hidden

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry.isIntersecting
        },
        { threshold: 0.02 }
      )
      visibilityObserver.observe(container)

      const onVisibilityChange = () => {
        isTabVisible = !document.hidden
      }
      document.addEventListener("visibilitychange", onVisibilityChange)

      const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0 }

      // Zero DOM reflow on mousemove: uses cached viewport dimensions!
      const onMouseMove = (e: MouseEvent) => {
        if (!isInViewport) return
        pointer.targetX = (e.clientX / viewW) * 2 - 1
        pointer.targetY = (e.clientY / viewH) * 2 - 1
      }

      const onMouseLeave = () => {
        pointer.targetX = 0
        pointer.targetY = 0
      }

      const secEl = sectionRef.current
      if (!isCoarsePointer) {
        window.addEventListener("mousemove", onMouseMove, { passive: true })
        if (secEl) secEl.addEventListener("mouseleave", onMouseLeave, { passive: true })
      }

      // Render 1 initial static frame immediately
      renderer.render(scene, camera)

      let elapsed = 0
      let lastTime = performance.now()
      let animationFrameId: number

      const animate = (now: number) => {
        animationFrameId = requestAnimationFrame(animate)

        const dt = Math.min((now - lastTime) * 0.001, 0.1)
        lastTime = now

        if (!isInViewport || !isTabVisible) return

        elapsed += dt
        const t = elapsed

        const lerp = 1 - Math.pow(0.001, dt)
        pointer.currentX += (pointer.targetX - pointer.currentX) * lerp * 0.8
        pointer.currentY += (pointer.targetY - pointer.currentY) * lerp * 0.8

        sculptureGroup.position.y = Math.sin(t * 1.3) * 0.07
        sculptureGroup.rotation.y = 0.38 + Math.sin(t * 0.7) * 0.22 + pointer.currentX * 0.34
        sculptureGroup.rotation.x = -0.26 + Math.cos(t * 0.5) * 0.12 + pointer.currentY * 0.24

        if (instancedPins) {
          for (let i = 0; i < 20; i++) {
            const rest = pinRestTransforms[i]
            const wave = Math.sin(t * 2.8 - i * 0.4)
            dummy.position.set(rest.x, rest.y, rest.z + wave * 0.06)
            dummy.rotation.set(0, 0, rest.rotZ)
            dummy.scale.set(1, 1, 1)
            dummy.updateMatrix()
            instancedPins.setMatrixAt(i, dummy.matrix)
          }
          instancedPins.instanceMatrix.needsUpdate = true
        } else if (variant === "auditorium") {
          if (gimbalRings[0]) {
            gimbalRings[0].rotation.x = Math.sin(t * 1.1) * 0.42
            gimbalRings[0].rotation.y = Math.cos(t * 0.85) * 0.35
          }
          if (gimbalRings[1]) {
            gimbalRings[1].rotation.x = -Math.cos(t * 1.3) * 0.48
            gimbalRings[1].rotation.y = Math.sin(t * 1.0) * 0.42
          }
        } else if (instancedLouvers) {
          for (let i = 0; i < louverRestTransforms.length; i++) {
            const rest = louverRestTransforms[i]
            const phase = i * 0.42 - t * 1.8
            dummy.position.set(0, rest.y, rest.z + Math.cos(phase) * 0.04)
            dummy.rotation.set(Math.sin(phase) * 0.52, 0, 0)
            dummy.scale.set(rest.scaleX, 1, 1)
            dummy.updateMatrix()
            instancedLouvers.setMatrixAt(i, dummy.matrix)
          }
          instancedLouvers.instanceMatrix.needsUpdate = true
        }

        renderer.render(scene, camera)
      }

      animationFrameId = requestAnimationFrame(animate)

      cleanupScene = () => {
        cancelAnimationFrame(animationFrameId)
        visibilityObserver.disconnect()
        if (resizeObserver) {
          resizeObserver.disconnect()
        } else {
          window.removeEventListener("resize", updateSize)
        }
        document.removeEventListener("visibilitychange", onVisibilityChange)
        if (!isCoarsePointer) {
          window.removeEventListener("mousemove", onMouseMove)
          if (secEl) secEl.removeEventListener("mouseleave", onMouseLeave)
        }
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
        disposables.forEach((d) => d.dispose())
        renderer.dispose()
      }
    }

    // Deferred boot: only create WebGL context when within 450px of viewport!
    const bootObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bootObserver.disconnect()
          bootScene()
        }
      },
      { rootMargin: "450px 0px" }
    )
    bootObserver.observe(container)

    return () => {
      bootObserver.disconnect()
      if (cleanupScene) cleanupScene()
    }
  }, [variant, sectionRef])

  return (
    <div
      ref={containerRef}
      className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 flex items-center justify-center select-none pointer-events-none"
    />
  )
})

export function WarrantyBanner({ title, description, variant = "default" }: WarrantyBannerProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const defaultTitle = "3 Anos de Garantia de Instalação"
  const defaultDesc =
    "Confiamos plenamente na qualidade do nosso serviço. Todos os projetos executados pela Sonus Pro AV contam com 3 anos de garantia integral sobre qualquer defeito de infraestrutura ou instalação. O seu investimento está 100% seguro."

  const renderQsys = () => (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 border-y border-cyan-500/10 relative overflow-hidden bg-[#020617]"
    >
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_40%,transparent_100%)] opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-cyan-900/5 to-transparent" />

      <div className="w-fit mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18)_0%,transparent_70%)] pointer-events-none" />
            <WarrantyMonolith3D variant="qsys" sectionRef={sectionRef} />
          </div>
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200 mb-3 uppercase">
              {title || defaultTitle}
            </h3>
            <p className="text-cyan-100/60 text-lg font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderCorporate = () => (
    <section
      ref={sectionRef}
      className="bg-[#050505] py-16 md:py-24 border-y border-white/[0.08] relative overflow-hidden group"
    >
      {/* Moving scanner line effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent -translate-y-full group-hover:translate-y-full [transition-duration:3s] ease-in-out transition-transform" />
      {/* Subtle metallic radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col items-center justify-center text-center">
          <div className="mb-4 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.16)_0%,transparent_70%)] pointer-events-none" />
            <WarrantyMonolith3D variant="corporate" sectionRef={sectionRef} />
          </div>
          <h3 className="text-2xl md:text-4xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 mb-5 uppercase">
            {title || defaultTitle}
          </h3>
          <p className="text-zinc-400/80 max-w-2xl text-lg md:text-xl font-light leading-relaxed text-balance">
            {description || defaultDesc}
          </p>
        </FadeIn>
      </div>
    </section>
  )

  const renderChurch = () => (
    <section
      ref={sectionRef}
      className="bg-[#030201] py-16 md:py-24 border-y border-amber-900/40 relative overflow-hidden"
    >
      {/* Volumetric Light Rays */}
      <div className="absolute inset-0 w-full h-full bg-[conic-gradient(from_180deg_at_50%_-20%,rgba(245,158,11,0.15)_0deg,transparent_40deg,transparent_320deg,rgba(245,158,11,0.15)_360deg)] pointer-events-none mix-blend-screen [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)] opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.08)_0%,transparent_60%)]" />

      <div className="w-fit mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="shrink-0 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.22)_0%,transparent_70%)] pointer-events-none" />
            <WarrantyMonolith3D variant="church" sectionRef={sectionRef} />
          </div>
          <div className="max-w-xl">
            <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 mb-4 font-serif">
              {title || defaultTitle}
            </h3>
            <p className="text-amber-100/70 text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderAuditorium = () => (
    <section
      ref={sectionRef}
      className="bg-[#020000] py-16 md:py-24 border-y border-red-900/30 relative overflow-hidden group"
    >
      {/* Cinematic Spotlights */}
      <div className="absolute top-0 left-0 w-[500px] h-[800px] bg-[conic-gradient(from_140deg_at_0%_0%,rgba(220,38,38,0.1)_0deg,transparent_30deg)] pointer-events-none transform origin-top-left group-hover:rotate-6 transition-transform [transition-duration:5s] ease-in-out mix-blend-screen" />
      <div className="absolute top-0 right-0 w-[500px] h-[800px] bg-[conic-gradient(from_220deg_at_100%_0%,transparent_330deg,rgba(153,27,27,0.1)_360deg)] pointer-events-none transform origin-top-right group-hover:-rotate-6 transition-transform [transition-duration:5s] ease-in-out mix-blend-screen" />

      <div className="w-fit mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left bg-gradient-to-br from-red-950/40 to-black p-8 md:p-14 rounded-3xl border border-red-900/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.22)_0%,transparent_70%)] pointer-events-none" />
            <WarrantyMonolith3D variant="auditorium" sectionRef={sectionRef} />
          </div>
          <div className="relative z-10 max-w-xl">
            <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-red-200 mb-5 uppercase drop-shadow-md">
              {title || defaultTitle}
            </h3>
            <p className="text-red-100/60 text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  const renderDefault = () => (
    <section
      ref={sectionRef}
      className="bg-black/40 py-10 md:py-16 border-y border-white/5 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" />
      <div className="w-fit mx-auto px-4 sm:px-6 relative z-10">
        <FadeIn className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 text-center md:text-left">
          <div className="relative shrink-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.18)_0%,transparent_70%)] pointer-events-none" />
            <WarrantyMonolith3D variant="default" sectionRef={sectionRef} />
          </div>
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3">
              {title || defaultTitle}
            </h3>
            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed text-balance">
              {description || defaultDesc}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )

  if (variant === "qsys") return renderQsys()
  if (variant === "corporate") return renderCorporate()
  if (variant === "church") return renderChurch()
  if (variant === "auditorium") return renderAuditorium()
  return renderDefault()
}
