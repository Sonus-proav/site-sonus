import { useEffect, useRef, memo } from "react"
import * as THREE from "three"

export type SolucoesCardVariant =
  | "plenarios"
  | "corporativo"
  | "auditorios"
  | "igrejas"
  | "qsys"
  | "bares"

// 1. Extruded Rounded Rectangle Slab
function createRoundedRectSlabGeo(
  width: number,
  height: number,
  depth: number,
  radius: number,
  bevel: number
) {
  const shape = new THREE.Shape()
  const hw = width / 2
  const hh = height / 2
  const r = Math.min(radius, hw * 0.8, hh * 0.8)

  shape.moveTo(-hw + r, -hh)
  shape.lineTo(hw - r, -hh)
  shape.quadraticCurveTo(hw, -hh, hw, -hh + r)
  shape.lineTo(hw, hh - r)
  shape.quadraticCurveTo(hw, hh, hw - r, hh)
  shape.lineTo(-hw + r, hh)
  shape.quadraticCurveTo(-hw, hh, -hw, hh - r)
  shape.lineTo(-hw, -hh + r)
  shape.quadraticCurveTo(-hw, -hh, -hw + r, -hh)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 14
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 2. Extruded Hollow Rounded Rectangle Frame
function createRoundedRectFrameGeo(
  width: number,
  height: number,
  border: number,
  depth: number,
  radius: number,
  bevel: number
) {
  const outer = new THREE.Shape()
  const hw = width / 2
  const hh = height / 2
  const r = Math.min(radius, hw * 0.8, hh * 0.8)

  outer.moveTo(-hw + r, -hh)
  outer.lineTo(hw - r, -hh)
  outer.quadraticCurveTo(hw, -hh, hw, -hh + r)
  outer.lineTo(hw, hh - r)
  outer.quadraticCurveTo(hw, hh, hw - r, hh)
  outer.lineTo(-hw + r, hh)
  outer.quadraticCurveTo(-hw, hh, -hw, hh - r)
  outer.lineTo(-hw, -hh + r)
  outer.quadraticCurveTo(-hw, -hh, -hw + r, -hh)

  const hole = new THREE.Path()
  const ihw = hw - border
  const ihh = hh - border
  const ir = Math.max(0.02, r - border * 0.8)

  hole.moveTo(-ihw + ir, -ihh)
  hole.lineTo(ihw - ir, -ihh)
  hole.quadraticCurveTo(ihw, -ihh, ihw, -ihh + ir)
  hole.lineTo(ihw, ihh - ir)
  hole.quadraticCurveTo(ihw, ihh, ihw - ir, ihh)
  hole.lineTo(-ihw + ir, ihh)
  hole.quadraticCurveTo(-ihw, ihh, -ihw, ihh - ir)
  hole.lineTo(-ihw, -ihh + ir)
  hole.quadraticCurveTo(-ihw, -ihh, -ihw + ir, -ihh)

  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 14
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

// 3. Extruded Regular Hexagon (Solid or Hollow)
function traceHexagon(path: THREE.Shape | THREE.Path, radius: number, cornerRadius: number) {
  const pts: THREE.Vector2[] = []
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 + Math.PI / 6
    pts.push(new THREE.Vector2(Math.cos(a) * radius, Math.sin(a) * radius))
  }
  for (let i = 0; i < 6; i++) {
    const curr = pts[i]
    const prev = pts[(i + 5) % 6]
    const next = pts[(i + 1) % 6]
    const toPrev = prev.clone().sub(curr).normalize()
    const toNext = next.clone().sub(curr).normalize()
    const p1 = curr.clone().addScaledVector(toPrev, cornerRadius)
    const p2 = curr.clone().addScaledVector(toNext, cornerRadius)
    if (i === 0) path.moveTo(p1.x, p1.y)
    else path.lineTo(p1.x, p1.y)
    path.quadraticCurveTo(curr.x, curr.y, p2.x, p2.y)
  }
  path.closePath()
}

function createSolidHexagonGeo(radius: number, cornerRadius: number, depth: number, bevel: number) {
  const shape = new THREE.Shape()
  traceHexagon(shape, radius, cornerRadius)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 10
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

function createHollowHexagonGeo(
  outerR: number,
  innerR: number,
  cornerRadius: number,
  depth: number,
  bevel: number
) {
  const outer = new THREE.Shape()
  traceHexagon(outer, outerR, cornerRadius)
  const hole = new THREE.Path()
  traceHexagon(hole, innerR, Math.max(0.03, cornerRadius * 0.7))
  outer.holes.push(hole)

  const geo = new THREE.ExtrudeGeometry(outer, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 10
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}


export const SolucoesCard3D = memo(function SolucoesCard3D({
  variant,
  className = ""
}: {
  variant: SolucoesCardVariant
  className?: string
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

      let width = container.clientWidth || 320
      let height = container.clientHeight || 320

      const isMobile =
        window.innerWidth < 768 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
      const isCoarsePointer =
        typeof window.matchMedia === "function" && window.matchMedia("(pointer: coarse)").matches
      const isReducedPerf =
        typeof document !== "undefined" &&
        document.documentElement.classList.contains("reduced-perf")
      const maxDpr = isReducedPerf ? 1.0 : 1.75

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.5, 25)
      camera.position.set(0, 0, isMobile ? 5.5 : 6.2)
      camera.lookAt(0, 0, 0)

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
      renderer.toneMappingExposure = 1.42
      renderer.outputColorSpace = THREE.SRGBColorSpace

      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      container.appendChild(renderer.domElement)

      const onContextLost = (e: Event) => {
        e.preventDefault()
      }
      renderer.domElement.addEventListener("webglcontextlost", onContextLost, false)

      // =========================================================================
      // PALETTE PER VARIANT (Rich Anodized Titanium + Signature Studio Rim)
      // =========================================================================
      const palettes: Record<
        SolucoesCardVariant,
        {
          titanium: number
          bezel: number
          accent: number
          softboxL: THREE.Color
          softboxR: THREE.Color
        }
      > = {
        plenarios: {
          titanium: 0x1e2b3c,
          bezel: 0x344b68,
          accent: 0x22d3ee,
          softboxL: new THREE.Color(0.6, 3.4, 4.4),
          softboxR: new THREE.Color(0.8, 2.2, 4.0)
        },
        corporativo: {
          titanium: 0x1c293e,
          bezel: 0x32466a,
          accent: 0x38bdf8,
          softboxL: new THREE.Color(0.8, 2.8, 4.6),
          softboxR: new THREE.Color(0.8, 2.0, 4.2)
        },
        auditorios: {
          titanium: 0x1e362c,
          bezel: 0x345a4a,
          accent: 0x10b981,
          softboxL: new THREE.Color(0.8, 4.0, 2.6),
          softboxR: new THREE.Color(0.6, 2.6, 3.4)
        },
        igrejas: {
          titanium: 0x34291d,
          bezel: 0x56432e,
          accent: 0xf59e0b,
          softboxL: new THREE.Color(4.6, 3.0, 0.9),
          softboxR: new THREE.Color(3.2, 2.0, 0.6)
        },
        qsys: {
          titanium: 0x2b2042,
          bezel: 0x48376e,
          accent: 0xc084fc,
          softboxL: new THREE.Color(3.4, 1.6, 4.8),
          softboxR: new THREE.Color(2.4, 1.2, 4.2)
        },
        bares: {
          titanium: 0x1c293b,
          bezel: 0x304460,
          accent: 0x38bdf8,
          softboxL: new THREE.Color(0.6, 3.2, 4.6),
          softboxR: new THREE.Color(0.8, 1.8, 4.0)
        }
      }

      const pal = palettes[variant]

      // =========================================================================
      // STUDIO SOFTBOX HDR ENVIRONMENT
      // =========================================================================
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      const envScene = new THREE.Scene()
      envScene.background = new THREE.Color(0x040609)

      const topSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 6),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(3.8, 4.2, 4.8), side: THREE.DoubleSide })
      )
      topSoftbox.position.set(0, 8, 3)
      topSoftbox.rotation.x = Math.PI / 2.2
      envScene.add(topSoftbox)

      const leftSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: pal.softboxL, side: THREE.DoubleSide })
      )
      leftSoftbox.position.set(-8, 1, 4)
      leftSoftbox.rotation.y = Math.PI / 2.25
      envScene.add(leftSoftbox)

      const rightSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: pal.softboxR, side: THREE.DoubleSide })
      )
      rightSoftbox.position.set(8, -1, 4)
      rightSoftbox.rotation.y = -Math.PI / 2.25
      envScene.add(rightSoftbox)

      const envRT = track(pmremGenerator.fromScene(envScene, 0.04))
      scene.environment = envRT.texture
      pmremGenerator.dispose()
      topSoftbox.geometry.dispose()
      ;(topSoftbox.material as THREE.Material).dispose()
      leftSoftbox.geometry.dispose()
      ;(leftSoftbox.material as THREE.Material).dispose()
      rightSoftbox.geometry.dispose()
      ;(rightSoftbox.material as THREE.Material).dispose()

      // High-End Studio Lighting (Ambient + Key + Dedicated Frontal Fill + Subtle Back Halo)
      const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.92)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.6)
      keyLight.position.set(3.5, 6, 6)
      scene.add(keyLight)

      const frontFill = new THREE.DirectionalLight(0xe0f2fe, 2.2)
      frontFill.position.set(-1.5, 1.2, 6.5)
      scene.add(frontFill)

      const rimLight = new THREE.PointLight(pal.accent, 16, 12, 1.7)
      rimLight.position.set(-2.5, 2.2, 3.5)
      scene.add(rimLight)

      const backAura = new THREE.PointLight(pal.accent, 20, 10, 1.6)
      backAura.position.set(0.2, 0, -1.6)
      scene.add(backAura)

      // Shared PBR Materials
      const titaniumMat = track(
        new THREE.MeshStandardMaterial({
          color: pal.titanium,
          metalness: 0.88,
          roughness: 0.26,
          envMapIntensity: 1.45
        })
      )

      const bezelMat = track(
        new THREE.MeshStandardMaterial({
          color: pal.bezel,
          metalness: 0.92,
          roughness: 0.18,
          envMapIntensity: 1.65
        })
      )

      const darkGlassMat = track(
        new THREE.MeshStandardMaterial({
          color: 0x060c18,
          metalness: 0.92,
          roughness: 0.08,
          envMapIntensity: 2.0
        })
      )

      const accentMat = track(
        new THREE.MeshBasicMaterial({
          color: pal.accent,
          transparent: true,
          opacity: 0.85
        })
      )

      const rootGroup = new THREE.Group()
      scene.add(rootGroup)

      // Dynamic animation hook per variant
      let animateVariant: (t: number, hoverBlend: number, px: number, py: number) => void = () => {}

      // =========================================================================
      // VARIANT 1: PLENARIOS — Bespoke Machined Titanium PTZ Optical Turret
      // =========================================================================
      if (variant === "plenarios") {
        rootGroup.position.set(isMobile ? 0.05 : 0.15, isMobile ? 0.16 : -0.05, 0)
        rootGroup.scale.setScalar(isMobile ? 1.05 : 1.0)

        // Base Pedestal Slab
        const baseGeo = track(createRoundedRectSlabGeo(1.75, 0.22, 1.35, 0.25, 0.03))
        const baseMesh = new THREE.Mesh(baseGeo, titaniumMat)
        baseMesh.position.set(0, -1.08, 0)
        rootGroup.add(baseMesh)

        // Thin optical ring on pedestal
        const baseRingGeo = track(new THREE.TorusGeometry(0.62, 0.01, 12, 48))
        const baseRing = new THREE.Mesh(baseRingGeo, accentMat)
        baseRing.rotation.x = Math.PI / 2
        baseRing.position.set(0, -0.95, 0)
        rootGroup.add(baseRing)

        // Pan Yoke Group
        const yokeGroup = new THREE.Group()
        yokeGroup.position.set(0, -0.92, 0)
        rootGroup.add(yokeGroup)

        const yokeBottomGeo = track(createRoundedRectSlabGeo(1.48, 0.16, 0.56, 0.12, 0.025))
        const yokeBottom = new THREE.Mesh(yokeBottomGeo, bezelMat)
        yokeBottom.position.set(0, 0.1, 0)
        yokeGroup.add(yokeBottom)

        const armGeo = track(createRoundedRectSlabGeo(0.18, 1.25, 0.54, 0.08, 0.025))
        const leftArm = new THREE.Mesh(armGeo, titaniumMat)
        leftArm.position.set(-0.68, 0.72, 0)
        yokeGroup.add(leftArm)

        const rightArm = new THREE.Mesh(armGeo, titaniumMat)
        rightArm.position.set(0.68, 0.72, 0)
        yokeGroup.add(rightArm)

        // Optical Head Group (Tilts inside Yoke)
        const headGroup = new THREE.Group()
        headGroup.position.set(0, 0.88, 0)
        yokeGroup.add(headGroup)

        const barrelGeo = track(new THREE.CylinderGeometry(0.54, 0.54, 1.12, 40))
        barrelGeo.rotateX(Math.PI / 2)
        const barrel = new THREE.Mesh(barrelGeo, titaniumMat)
        headGroup.add(barrel)

        const frontHoodGeo = track(new THREE.CylinderGeometry(0.57, 0.54, 0.28, 40))
        frontHoodGeo.rotateX(Math.PI / 2)
        const frontHood = new THREE.Mesh(frontHoodGeo, bezelMat)
        frontHood.position.z = 0.48
        headGroup.add(frontHood)

        // Knurled Focus Ring (Instanced ticks)
        const tickCount = 28
        const tickGeo = track(new THREE.BoxGeometry(0.022, 0.032, 0.22))
        const ticksInst = track(new THREE.InstancedMesh(tickGeo, bezelMat, tickCount))
        const dummy = new THREE.Object3D()
        for (let i = 0; i < tickCount; i++) {
          const a = (i / tickCount) * Math.PI * 2
          dummy.position.set(Math.cos(a) * 0.555, Math.sin(a) * 0.555, 0.12)
          dummy.rotation.set(0, 0, a)
          dummy.updateMatrix()
          ticksInst.setMatrixAt(i, dummy.matrix)
        }
        ticksInst.instanceMatrix.needsUpdate = true
        headGroup.add(ticksInst)

        // Deep Optical Glass Lens + Ultra-thin Cyan Coating Ring
        const lensGeo = track(new THREE.SphereGeometry(0.42, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.38))
        lensGeo.rotateX(Math.PI / 2)
        const lensMesh = new THREE.Mesh(lensGeo, darkGlassMat)
        lensMesh.position.z = 0.34
        headGroup.add(lensMesh)

        const apertureRingGeo = track(new THREE.TorusGeometry(0.46, 0.011, 12, 48))
        const apertureRing = new THREE.Mesh(apertureRingGeo, accentMat)
        apertureRing.position.z = 0.62
        headGroup.add(apertureRing)

        const innerRingGeo = track(new THREE.TorusGeometry(0.24, 0.008, 10, 36))
        const innerRing = new THREE.Mesh(innerRingGeo, accentMat)
        innerRing.position.z = 0.58
        headGroup.add(innerRing)

        animateVariant = (t, hoverBlend, px, py) => {
          rootGroup.rotation.y = -0.36 + px * 0.12
          rootGroup.rotation.x = 0.16 + py * 0.08

          // Subtle autonomous pan/tilt + smooth cursor tracking on hover
          yokeGroup.rotation.y =
            Math.sin(t * 0.7) * 0.22 * (1 - hoverBlend * 0.5) + px * 0.38 * hoverBlend
          headGroup.rotation.x =
            Math.cos(t * 0.55) * 0.1 + py * 0.25 * hoverBlend - 0.05

          accentMat.opacity = 0.28 + hoverBlend * 0.35 + Math.sin(t * 2.0) * 0.06
        }
      }

      // =========================================================================
      // VARIANT 2: CORPORATIVO — Telepresence Titanium Monolith & Beamforming Bar
      // =========================================================================
      else if (variant === "corporativo") {
        rootGroup.position.set(isMobile ? 0 : -0.08, 0.12, 0)
        rootGroup.scale.setScalar(isMobile ? 0.85 : 0.68)

        // Main Beveled Display Monolith
        const displayGroup = new THREE.Group()
        displayGroup.position.set(0, 0.22, -0.1)
        rootGroup.add(displayGroup)

        const backingGeo = track(createRoundedRectSlabGeo(2.35, 1.38, 0.09, 0.14, 0.025))
        const backing = new THREE.Mesh(backingGeo, titaniumMat)
        displayGroup.add(backing)

        const frameGeo = track(createRoundedRectFrameGeo(2.4, 1.42, 0.08, 0.11, 0.15, 0.02))
        const frame = new THREE.Mesh(frameGeo, bezelMat)
        frame.position.z = 0.01
        displayGroup.add(frame)

        const screenGeo = track(createRoundedRectSlabGeo(2.2, 1.22, 0.02, 0.09, 0.005))
        const screen = new THREE.Mesh(screenGeo, darkGlassMat)
        screen.position.z = 0.05
        displayGroup.add(screen)

        // Ultra-thin inner optical horizon line on screen
        const horizonGeo = track(new THREE.BoxGeometry(1.75, 0.009, 0.01))
        const horizon = new THREE.Mesh(horizonGeo, accentMat)
        horizon.position.set(0, 0, 0.072)
        displayGroup.add(horizon)

        // Precision Linear Beamforming Soundbar / Ceiling Array below Monolith
        const barGroup = new THREE.Group()
        barGroup.position.set(0, -0.78, 0.22)
        rootGroup.add(barGroup)

        const barChassisGeo = track(createRoundedRectSlabGeo(1.95, 0.2, 0.22, 0.06, 0.022))
        const barChassis = new THREE.Mesh(barChassisGeo, bezelMat)
        barGroup.add(barChassis)

        // 12 Instanced Micro-Beamforming Cells along the bar
        const cellCount = 12
        const cellGeo = track(new THREE.BoxGeometry(0.08, 0.014, 0.014))
        const cellBaseMat = track(
          new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
        )
        const cellsInst = track(new THREE.InstancedMesh(cellGeo, cellBaseMat, cellCount))
        cellsInst.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

        const dummy = new THREE.Object3D()
        for (let i = 0; i < cellCount; i++) {
          const x = (i / (cellCount - 1) - 0.5) * 1.55
          dummy.position.set(x, 0, 0.125)
          dummy.updateMatrix()
          cellsInst.setMatrixAt(i, dummy.matrix)
        }
        cellsInst.instanceMatrix.needsUpdate = true
        barGroup.add(cellsInst)

        const baseColor = new THREE.Color(pal.accent)
        const tempColor = new THREE.Color()

        animateVariant = (t, hoverBlend, px, py) => {
          rootGroup.rotation.y = -0.38 + px * 0.16
          rootGroup.rotation.x = 0.14 + py * 0.1

          displayGroup.position.y = 0.22 + Math.sin(t * 1.1) * 0.04
          barGroup.position.y = -0.78 + Math.cos(t * 1.1) * 0.03
          barGroup.position.z = 0.22 + hoverBlend * 0.12

          accentMat.opacity = 0.24 + hoverBlend * 0.3

          for (let i = 0; i < cellCount; i++) {
            const wave = Math.max(0, Math.sin(i * 0.55 - t * (2.2 + hoverBlend * 1.5)))
            const intensity = 0.12 + Math.pow(wave, 3) * (0.55 + hoverBlend * 0.35)
            tempColor.copy(baseColor).multiplyScalar(intensity)
            cellsInst.setColorAt(i, tempColor)
          }
          if (cellsInst.instanceColor) cellsInst.instanceColor.needsUpdate = true
        }
      }

      // =========================================================================
      // VARIANT 3: AUDITORIOS — Progressive J-Curve Line Array Column
      // =========================================================================
      else if (variant === "auditorios") {
        rootGroup.position.set(isMobile ? 0.08 : 0.28, 0.16, 0)
        rootGroup.scale.setScalar(isMobile ? 1.05 : 0.88)

        const moduleCount = 4
        const modGeo = track(createRoundedRectSlabGeo(1.45, 0.42, 0.72, 0.07, 0.026))
        const baffleGeo = track(createRoundedRectSlabGeo(1.28, 0.28, 0.04, 0.04, 0.01))
        const slotGeo = track(new THREE.BoxGeometry(0.95, 0.012, 0.015))
        const riggingBarGeo = track(new THREE.BoxGeometry(0.05, 0.48, 0.06))

        interface ArrayModule {
          group: THREE.Group
          slotMat: THREE.MeshBasicMaterial
          baseY: number
          baseZ: number
          baseTilt: number
          index: number
        }

        const modules: ArrayModule[] = []
        const yPositions = [0.78, 0.28, -0.22, -0.72]
        const zPositions = [0.0, -0.04, -0.14, -0.3]
        const tilts = [0.04, 0.13, 0.26, 0.42]

        for (let i = 0; i < moduleCount; i++) {
          const g = new THREE.Group()
          g.position.set(0, yPositions[i], zPositions[i])
          g.rotation.x = tilts[i]

          const enclosure = new THREE.Mesh(modGeo, titaniumMat)
          g.add(enclosure)

          const baffle = new THREE.Mesh(baffleGeo, darkGlassMat)
          baffle.position.z = 0.365
          g.add(baffle)

          const leftRig = new THREE.Mesh(riggingBarGeo, bezelMat)
          leftRig.position.set(-0.74, 0, 0.1)
          g.add(leftRig)

          const rightRig = new THREE.Mesh(riggingBarGeo, bezelMat)
          rightRig.position.set(0.74, 0, 0.1)
          g.add(rightRig)

          const slotMat = track(
            new THREE.MeshBasicMaterial({
              color: pal.accent,
              transparent: true,
              opacity: 0.25
            })
          )
          const slot = new THREE.Mesh(slotGeo, slotMat)
          slot.position.set(0, 0, 0.39)
          g.add(slot)

          rootGroup.add(g)
          modules.push({
            group: g,
            slotMat,
            baseY: yPositions[i],
            baseZ: zPositions[i],
            baseTilt: tilts[i],
            index: i
          })
        }

        animateVariant = (t, hoverBlend, px, py) => {
          rootGroup.rotation.y = -0.44 + px * 0.16
          rootGroup.rotation.x = 0.12 + py * 0.1

          for (const m of modules) {
            const phase = m.index * 0.65 - t * 2.0
            const splayDelta = Math.sin(phase) * 0.025 + hoverBlend * m.index * 0.025
            m.group.rotation.x = m.baseTilt + splayDelta
            m.group.position.z = m.baseZ + Math.sin(phase) * 0.02

            const wave = Math.max(0, Math.sin(phase + 0.5))
            m.slotMat.opacity = 0.12 + Math.pow(wave, 3) * (0.55 + hoverBlend * 0.3)
          }
        }
      }

      // =========================================================================
      // VARIANT 4: IGREJAS — Parabolic Acoustic Diffuser Canopy & Condenser Stem
      // =========================================================================
      else if (variant === "igrejas") {
        rootGroup.position.set(isMobile ? 0.06 : 0.22, 0.14, 0)
        rootGroup.scale.setScalar(isMobile ? 1.08 : 0.9)

        // 5 Precision-Beveled Dark Titanium Acoustic Baffle Blades in an Arch Canopy
        const baffleCount = 5
        const bladeGeo = track(createRoundedRectSlabGeo(1.55, 0.11, 0.58, 0.035, 0.024))
        const edgeGeo = track(new THREE.BoxGeometry(1.38, 0.011, 0.014))

        interface CanopyBlade {
          group: THREE.Group
          edgeMat: THREE.MeshBasicMaterial
          baseY: number
          baseZ: number
          basePitch: number
          index: number
        }

        const blades: CanopyBlade[] = []
        for (let i = 0; i < baffleCount; i++) {
          const u = i / (baffleCount - 1)
          const envelope = Math.sin(u * Math.PI)
          const g = new THREE.Group()

          const by = -0.32 + i * 0.27
          const bz = -0.28 + Math.sin(u * Math.PI) * 0.18
          const basePitch = 0.18 + (u - 0.5) * 0.42

          g.position.set(0, by, bz)
          g.rotation.x = basePitch
          g.scale.set(0.68 + envelope * 0.36, 1, 0.75 + envelope * 0.25)

          const mesh = new THREE.Mesh(bladeGeo, i % 2 === 0 ? titaniumMat : bezelMat)
          g.add(mesh)

          const edgeMat = track(
            new THREE.MeshBasicMaterial({
              color: pal.accent,
              transparent: true,
              opacity: 0.28
            })
          )
          const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat)
          edgeMesh.position.set(0, 0, 0.305)
          g.add(edgeMesh)

          rootGroup.add(g)
          blades.push({
            group: g,
            edgeMat,
            baseY: by,
            baseZ: bz,
            basePitch,
            index: i
          })
        }

        // Precision Condenser Capsule Stem in Foreground Focal Point
        const capsuleGroup = new THREE.Group()
        capsuleGroup.position.set(-0.18, -0.22, 0.38)
        rootGroup.add(capsuleGroup)

        const plinthGeo = track(createRoundedRectSlabGeo(0.68, 0.14, 0.52, 0.12, 0.022))
        const plinth = new THREE.Mesh(plinthGeo, bezelMat)
        plinth.position.y = -0.56
        capsuleGroup.add(plinth)

        const stemGeo = track(new THREE.CylinderGeometry(0.038, 0.048, 0.92, 24))
        const stem = new THREE.Mesh(stemGeo, titaniumMat)
        stem.position.y = -0.05
        capsuleGroup.add(stem)

        const headGeo = track(new THREE.CylinderGeometry(0.095, 0.08, 0.26, 28))
        const head = new THREE.Mesh(headGeo, bezelMat)
        head.position.set(0, 0.48, 0.04)
        head.rotation.x = 0.28
        capsuleGroup.add(head)

        const capsuleRingGeo = track(new THREE.TorusGeometry(0.092, 0.01, 10, 32))
        const capsuleRing = new THREE.Mesh(capsuleRingGeo, accentMat)
        capsuleRing.position.set(0, 0.52, 0.05)
        capsuleRing.rotation.x = Math.PI / 2 + 0.28
        capsuleGroup.add(capsuleRing)

        animateVariant = (t, hoverBlend, px, py) => {
          rootGroup.rotation.y = -0.38 + px * 0.16
          rootGroup.rotation.x = 0.14 + py * 0.1

          for (const b of blades) {
            const phase = b.index * 0.55 - t * 1.65
            b.group.rotation.x = b.basePitch + Math.sin(phase) * 0.12 + hoverBlend * 0.08
            b.group.position.z = b.baseZ + Math.sin(phase) * 0.04

            const wave = Math.max(0, Math.sin(phase + 0.5))
            b.edgeMat.opacity = 0.12 + Math.pow(wave, 3) * (0.52 + hoverBlend * 0.3)
          }

          accentMat.opacity = 0.38 + hoverBlend * 0.35
        }
      }

      // =========================================================================
      // VARIANT 5: QSYS — 1U Rack Titanium Core Processor & Heatsink Architecture
      // =========================================================================
      else if (variant === "qsys") {
        rootGroup.position.set(isMobile ? 0.04 : 0.2, 0.08, 0)
        rootGroup.scale.setScalar(isMobile ? 1.08 : 0.95)

        const chassisGroup = new THREE.Group()
        rootGroup.add(chassisGroup)

        // Main 1U Rack Chassis Body
        const bodyGeo = track(createRoundedRectSlabGeo(2.15, 0.52, 1.35, 0.08, 0.03))
        const body = new THREE.Mesh(bodyGeo, titaniumMat)
        chassisGroup.add(body)

        // Front Beveled Faceplate
        const faceGeo = track(createRoundedRectSlabGeo(2.22, 0.56, 0.1, 0.07, 0.022))
        const face = new THREE.Mesh(faceGeo, bezelMat)
        face.position.z = 0.68
        chassisGroup.add(face)

        // Recessed Dark Glass Telemetry Strip
        const glassStripGeo = track(createRoundedRectSlabGeo(1.35, 0.26, 0.03, 0.04, 0.008))
        const glassStrip = new THREE.Mesh(glassStripGeo, darkGlassMat)
        glassStrip.position.set(-0.28, 0, 0.73)
        chassisGroup.add(glassStrip)

        // Razor-thin Optical Bus Line across Glass Strip
        const busLineGeo = track(new THREE.BoxGeometry(1.18, 0.012, 0.012))
        const busLine = new THREE.Mesh(busLineGeo, accentMat)
        busLine.position.set(-0.28, 0, 0.75)
        chassisGroup.add(busLine)

        // 3D Machined Rotary Calibration Dial on Right of Faceplate
        const dialGroup = new THREE.Group()
        dialGroup.position.set(0.68, 0, 0.76)
        chassisGroup.add(dialGroup)

        const dialGeo = track(new THREE.CylinderGeometry(0.16, 0.17, 0.12, 32))
        dialGeo.rotateX(Math.PI / 2)
        const dial = new THREE.Mesh(dialGeo, titaniumMat)
        dialGroup.add(dial)

        const dialRingGeo = track(new THREE.TorusGeometry(0.165, 0.009, 10, 32))
        const dialRing = new THREE.Mesh(dialRingGeo, accentMat)
        dialRing.position.z = 0.04
        dialGroup.add(dialRing)

        const dialMarkerGeo = track(new THREE.BoxGeometry(0.018, 0.07, 0.02))
        const dialMarker = new THREE.Mesh(dialMarkerGeo, accentMat)
        dialMarker.position.set(0, 0.08, 0.062)
        dialGroup.add(dialMarker)

        // 10 Instanced Linear Heatsink Fins on Top of 1U Chassis
        const finCount = 10
        const finGeo = track(new THREE.BoxGeometry(0.12, 0.07, 1.15))
        const finsInst = track(new THREE.InstancedMesh(finGeo, bezelMat, finCount))
        const dummy = new THREE.Object3D()
        for (let i = 0; i < finCount; i++) {
          const x = (i / (finCount - 1) - 0.5) * 1.75
          dummy.position.set(x, 0.29, -0.02)
          dummy.updateMatrix()
          finsInst.setMatrixAt(i, dummy.matrix)
        }
        finsInst.instanceMatrix.needsUpdate = true
        chassisGroup.add(finsInst)

        animateVariant = (t, hoverBlend, px, py) => {
          chassisGroup.rotation.y = -0.42 + px * 0.16
          chassisGroup.rotation.x = 0.28 + hoverBlend * 0.1 + py * 0.1
          chassisGroup.position.y = Math.sin(t * 1.2) * 0.04

          dialGroup.rotation.z = Math.sin(t * 0.9) * 0.6 + hoverBlend * 0.8
          accentMat.opacity = 0.3 + hoverBlend * 0.38 + Math.sin(t * 2.5) * 0.08
        }
      }

      // =========================================================================
      // VARIANT 6: BARES — Hexagonal Subgrave Acoustic Transducer Monolith
      // =========================================================================
      else if (variant === "bares") {
        rootGroup.position.set(isMobile ? 0.05 : 0.2, 0, 0)
        rootGroup.scale.setScalar(isMobile ? 1.08 : 0.95)

        const subGroup = new THREE.Group()
        rootGroup.add(subGroup)

        // Heavy Hexagonal Titanium Backing + Hollow Beveled Flange
        const hexBackGeo = track(createSolidHexagonGeo(1.18, 0.14, 0.36, 0.04))
        const hexBack = new THREE.Mesh(hexBackGeo, titaniumMat)
        hexBack.position.z = -0.1
        subGroup.add(hexBack)

        const hexFlangeGeo = track(createHollowHexagonGeo(1.22, 0.86, 0.14, 0.18, 0.032))
        const hexFlange = new THREE.Mesh(hexFlangeGeo, bezelMat)
        hexFlange.position.z = 0.12
        subGroup.add(hexFlange)

        // 6 Instanced Perimeter Hex Bolts
        const boltGeo = track(new THREE.CylinderGeometry(0.045, 0.045, 0.06, 6))
        boltGeo.rotateX(Math.PI / 2)
        const boltsInst = track(new THREE.InstancedMesh(boltGeo, titaniumMat, 6))
        const dummy = new THREE.Object3D()
        for (let i = 0; i < 6; i++) {
          const a = (i * Math.PI) / 3 + Math.PI / 6
          dummy.position.set(Math.cos(a) * 1.02, Math.sin(a) * 1.02, 0.22)
          dummy.rotation.set(0, 0, a)
          dummy.updateMatrix()
          boltsInst.setMatrixAt(i, dummy.matrix)
        }
        boltsInst.instanceMatrix.needsUpdate = true
        subGroup.add(boltsInst)

        // Outer Acoustic Surround Torus
        const surroundGeo = track(new THREE.TorusGeometry(0.74, 0.09, 20, 48))
        const surround = new THREE.Mesh(surroundGeo, darkGlassMat)
        surround.position.z = 0.14
        subGroup.add(surround)

        // Moving Acoustic Driver Cone + Phase Plug Group
        const driverGroup = new THREE.Group()
        driverGroup.position.z = 0.1
        subGroup.add(driverGroup)

        const coneGeo = track(new THREE.CylinderGeometry(0.68, 0.26, 0.28, 40, 1, true))
        coneGeo.rotateX(Math.PI / 2)
        const cone = new THREE.Mesh(coneGeo, titaniumMat)
        driverGroup.add(cone)

        const dustCapGeo = track(
          new THREE.SphereGeometry(0.27, 32, 20, 0, Math.PI * 2, 0, Math.PI * 0.45)
        )
        dustCapGeo.rotateX(Math.PI / 2)
        const dustCap = new THREE.Mesh(dustCapGeo, bezelMat)
        dustCap.position.z = -0.12
        driverGroup.add(dustCap)

        // Razor-thin Cobalt Optical Voice-Coil Ring
        const coilRingGeo = track(new THREE.TorusGeometry(0.28, 0.011, 12, 44))
        const coilRing = new THREE.Mesh(coilRingGeo, accentMat)
        coilRing.position.z = 0.04
        driverGroup.add(coilRing)

        const outerRimGeo = track(new THREE.TorusGeometry(0.84, 0.009, 12, 48))
        const outerRim = new THREE.Mesh(outerRimGeo, accentMat)
        outerRim.position.z = 0.22
        subGroup.add(outerRim)

        animateVariant = (t, hoverBlend, px, py) => {
          subGroup.rotation.y = -0.38 + px * 0.16
          subGroup.rotation.x = 0.16 + py * 0.1

          // Controlled low-frequency acoustic excursion
          const excursion =
            Math.sin(t * (2.4 + hoverBlend * 1.4)) * (0.045 + hoverBlend * 0.045)
          driverGroup.position.z = 0.1 + excursion

          accentMat.opacity =
            0.25 + hoverBlend * 0.35 + Math.max(0, Math.sin(t * 2.4)) * 0.18
        }
      }

      const updateLayout = () => {
        if (!container) return
        width = container.clientWidth || 320
        height = container.clientHeight || 320
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }

      updateLayout()

      let resizeObserver: ResizeObserver | null = null
      if (typeof ResizeObserver !== "undefined") {
        resizeObserver = new ResizeObserver(updateLayout)
        resizeObserver.observe(container)
      } else {
        window.addEventListener("resize", updateLayout, { passive: true })
      }

      let isInViewport = true
      let isTabVisible = !document.hidden
      let isAnimating = false
      let isScrolling = false
      let scrollTimer: ReturnType<typeof setTimeout> | undefined
      let animationFrameId: number
      let elapsed = 0
      let hoverBlend = 0
      let lastTime = performance.now()

      const handleScroll = () => {
        if (!isMobile) return
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

      if (isMobile) {
        window.addEventListener("scroll", handleScroll, { passive: true })
      }

      const visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isInViewport = entry.isIntersecting
          if (isInViewport && isTabVisible && !isScrolling) {
            startLoop()
          }
        },
        { threshold: isMobile ? 0.35 : 0.02 }
      )
      visibilityObserver.observe(container)

      const onVisibilityChange = () => {
        isTabVisible = !document.hidden
        if (isTabVisible && isInViewport && !isScrolling) {
          startLoop()
        }
      }
      document.addEventListener("visibilitychange", onVisibilityChange)

      // Bind hover & local cursor tracking to parent SpotlightCard (.group)
      const parentCard = container.closest(".group") as HTMLElement | null
      const pointer = {
        isHovered: false,
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0
      }

      const onMouseEnter = () => {
        pointer.isHovered = true
      }
      const onMouseLeave = () => {
        pointer.isHovered = false
        pointer.targetX = 0
        pointer.targetY = 0
      }
      const onMouseMove = (e: MouseEvent) => {
        if (!isInViewport) return
        pointer.targetX = (e.clientX / (window.innerWidth || 1440) - 0.5) * 2
        pointer.targetY = (e.clientY / (window.innerHeight || 900) - 0.5) * 2
      }

      if (parentCard && !isCoarsePointer) {
        parentCard.addEventListener("mouseenter", onMouseEnter, { passive: true })
        parentCard.addEventListener("mouseleave", onMouseLeave, { passive: true })
        parentCard.addEventListener("mousemove", onMouseMove, { passive: true })
      }

      animateVariant(0, 0, 0, 0)
      renderer.render(scene, camera)

      const animate = (now: number) => {
        if (!isInViewport || !isTabVisible || isScrolling) {
          isAnimating = false
          return
        }

        animationFrameId = requestAnimationFrame(animate)

        const dt = Math.min((now - lastTime) * 0.001, 0.1)
        lastTime = now

        elapsed += dt

        const targetHover = pointer.isHovered ? 1.0 : 0.0
        hoverBlend += (targetHover - hoverBlend) * Math.min(1, dt * 5.0)

        const lerp = 1 - Math.pow(0.001, dt)
        pointer.currentX += (pointer.targetX - pointer.currentX) * lerp * 0.8
        pointer.currentY += (pointer.targetY - pointer.currentY) * lerp * 0.8

        animateVariant(elapsed, hoverBlend, pointer.currentX, pointer.currentY)
        renderer.render(scene, camera)
      }

      function startLoop() {
        if (!isAnimating && isInViewport && isTabVisible && !isScrolling) {
          isAnimating = true
          lastTime = performance.now()
          animationFrameId = requestAnimationFrame(animate)
        }
      }

      startLoop()

      cleanupScene = () => {
        isAnimating = false
        if (isMobile) {
          window.removeEventListener("scroll", handleScroll)
          clearTimeout(scrollTimer)
        }
        cancelAnimationFrame(animationFrameId)
        visibilityObserver.disconnect()
        if (resizeObserver) {
          resizeObserver.disconnect()
        } else {
          window.removeEventListener("resize", updateLayout)
        }
        document.removeEventListener("visibilitychange", onVisibilityChange)
        if (parentCard && !isCoarsePointer) {
          parentCard.removeEventListener("mouseenter", onMouseEnter)
          parentCard.removeEventListener("mouseleave", onMouseLeave)
          parentCard.removeEventListener("mousemove", onMouseMove)
        }
        renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
        disposables.forEach((d) => d.dispose())
        renderer.dispose()
      }
    }

    const bootObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bootObserver.disconnect()
          bootScene()
        }
      },
      { rootMargin: "350px 0px" }
    )
    bootObserver.observe(container)

    return () => {
      bootObserver.disconnect()
      if (cleanupScene) cleanupScene()
    }
  }, [variant])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none z-0 overflow-hidden ${className}`}
    />
  )
})
