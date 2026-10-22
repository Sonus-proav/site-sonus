import { useRef, useEffect, useState, memo } from "react"
import { motion } from "framer-motion"
import { Wifi, Clock, Wrench } from "lucide-react"
import * as THREE from "three"

function createShieldShape(scale = 1): THREE.Shape {
  const s = scale
  const shape = new THREE.Shape()
  shape.moveTo(0, 1.15 * s)
  shape.quadraticCurveTo(0.55 * s, 1.15 * s, 0.95 * s, 0.92 * s)
  shape.lineTo(0.95 * s, 0.1 * s)
  shape.quadraticCurveTo(0.95 * s, -0.68 * s, 0, -1.22 * s)
  shape.quadraticCurveTo(-0.95 * s, -0.68 * s, -0.95 * s, 0.1 * s)
  shape.lineTo(-0.95 * s, 0.92 * s)
  shape.quadraticCurveTo(-0.55 * s, 1.15 * s, 0, 1.15 * s)
  return shape
}

function createShieldPath(scale = 1): THREE.Path {
  const s = scale
  const path = new THREE.Path()
  path.moveTo(0, 1.15 * s)
  path.quadraticCurveTo(0.55 * s, 1.15 * s, 0.95 * s, 0.92 * s)
  path.lineTo(0.95 * s, 0.1 * s)
  path.quadraticCurveTo(0.95 * s, -0.68 * s, 0, -1.22 * s)
  path.quadraticCurveTo(-0.95 * s, -0.68 * s, -0.95 * s, 0.1 * s)
  path.lineTo(-0.95 * s, 0.92 * s)
  path.quadraticCurveTo(-0.55 * s, 1.15 * s, 0, 1.15 * s)
  return path
}

function createHollowShieldGeo(outerScale: number, innerScale: number, depth: number, bevel: number) {
  const shape = createShieldShape(outerScale)
  shape.holes.push(createShieldPath(innerScale))
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 20
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

function createSolidShieldGeo(scale: number, depth: number, bevel: number) {
  const shape = createShieldShape(scale)
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 20
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

function createTitaniumBladeGeo(w: number, h: number, d: number, bevel: number) {
  const shape = new THREE.Shape()
  const r = Math.min(w, h) * 0.25
  const hw = w / 2
  const hh = h / 2
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
    depth: d,
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

function createCheckmarkGeo(scale = 1) {
  const s = scale
  const shape = new THREE.Shape()
  shape.moveTo(-0.38 * s, -0.02 * s)
  shape.lineTo(-0.12 * s, -0.28 * s)
  shape.lineTo(0.42 * s, 0.26 * s)
  shape.lineTo(0.28 * s, 0.4 * s)
  shape.lineTo(-0.12 * s, 0.0 * s)
  shape.lineTo(-0.24 * s, 0.12 * s)
  shape.closePath()

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.12 * s,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.024 * s,
    bevelThickness: 0.024 * s
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

export const WarrantyShield3D = memo(function WarrantyShield3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasHolderRef = useRef<HTMLDivElement>(null)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) setHasAnimated(true)
      },
      { threshold: 0.2 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    const container = canvasHolderRef.current
    if (!container) return

    if (typeof navigator !== "undefined" && /ReactSnap|Prerender/i.test(navigator.userAgent)) {
      return
    }

    let cleanupScene: (() => void) | null = null
    let booted = false

    const bootScene = () => {
      if (booted || !canvasHolderRef.current) return
      booted = true

      let width = container.clientWidth || 360
      let height = container.clientHeight || 360

      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, width / height, 0.5, 25)
      camera.position.set(0, 0.1, 6.2)
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

      renderer.setSize(width, height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.75 : 2.0))
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.15
      renderer.outputColorSpace = THREE.SRGBColorSpace

      while (container.firstChild) {
        container.removeChild(container.firstChild)
      }
      container.appendChild(renderer.domElement)

      const onContextLost = (e: Event) => {
        e.preventDefault()
      }
      renderer.domElement.addEventListener("webglcontextlost", onContextLost, false)

      const disposables: { dispose: () => void }[] = []
      const track = <T extends { dispose: () => void }>(item: T): T => {
        disposables.push(item)
        return item
      }

      // Lightweight 3-Plane Studio Softbox HDR Environment
      const pmremGenerator = new THREE.PMREMGenerator(renderer)
      pmremGenerator.compileEquirectangularShader()

      const envScene = new THREE.Scene()
      envScene.background = new THREE.Color(0x030506)

      const topSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(18, 6),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(2.8, 3.4, 3.2), side: THREE.DoubleSide })
      )
      topSoftbox.position.set(0, 8, 3)
      topSoftbox.rotation.x = Math.PI / 2.2
      envScene.add(topSoftbox)

      const leftSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 3.0, 1.9), side: THREE.DoubleSide })
      )
      leftSoftbox.position.set(-8, 1, 4)
      leftSoftbox.rotation.y = Math.PI / 2.25
      envScene.add(leftSoftbox)

      const rightSoftbox = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 16),
        new THREE.MeshBasicMaterial({ color: new THREE.Color(0.3, 1.8, 2.8), side: THREE.DoubleSide })
      )
      rightSoftbox.position.set(8, -1, 4)
      rightSoftbox.rotation.y = -Math.PI / 2.25
      envScene.add(rightSoftbox)

      const envTarget = track(pmremGenerator.fromScene(envScene, 0.04))
      scene.environment = envTarget.texture
      pmremGenerator.dispose()
      topSoftbox.geometry.dispose()
      ;(topSoftbox.material as THREE.Material).dispose()
      leftSoftbox.geometry.dispose()
      ;(leftSoftbox.material as THREE.Material).dispose()
      rightSoftbox.geometry.dispose()
      ;(rightSoftbox.material as THREE.Material).dispose()

      // Studio Lighting (Emerald + Cyan rim)
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.38)
      scene.add(ambientLight)

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4)
      keyLight.position.set(4, 6, 5)
      scene.add(keyLight)

      const emeraldRim = new THREE.DirectionalLight(0x10b981, 3.4)
      emeraldRim.position.set(-5, 3, 4)
      scene.add(emeraldRim)

      const cyanBottomLight = new THREE.PointLight(0x06b6d4, 2.8, 12)
      cyanBottomLight.position.set(3, -3.5, 3.5)
      scene.add(cyanBottomLight)

      // Materials
      const darkTitaniumMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#071510"),
          metalness: 0.9,
          roughness: 0.22,
          envMapIntensity: 1.25
        })
      )

      const brushedBezelMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#0d281f"),
          metalness: 0.92,
          roughness: 0.16,
          envMapIntensity: 1.5
        })
      )

      const emeraldGlowMat = track(
        new THREE.MeshStandardMaterial({
          color: new THREE.Color("#10b981"),
          emissive: new THREE.Color("#10b981"),
          emissiveIntensity: 0.65,
          metalness: 0.4,
          roughness: 0.2
        })
      )

      const opticLineMat = track(
        new THREE.MeshBasicMaterial({
          color: new THREE.Color("#34d399"),
          transparent: true,
          opacity: 0.85
        })
      )

      const rootGroup = new THREE.Group()
      rootGroup.rotation.set(-0.24, 0.38, 0.05)
      scene.add(rootGroup)

      // 1. Stepped Outer Shield Backplate
      const backShield = new THREE.Mesh(
        track(createSolidShieldGeo(1.06, 0.16, 0.045)),
        darkTitaniumMat
      )
      backShield.position.z = -0.1
      rootGroup.add(backShield)

      // 2. 10 Kinetic 3D Beveled Titanium Acoustic Louvers via SINGLE InstancedMesh (1 draw call!)
      const louverCount = 10
      const baseBladeGeo = track(createTitaniumBladeGeo(1.0, 0.095, 0.28, 0.026))
      const instancedLouvers = track(
        new THREE.InstancedMesh(baseBladeGeo, darkTitaniumMat, louverCount)
      )
      instancedLouvers.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

      const dummy = new THREE.Object3D()
      const louverRestTransforms: { y: number; z: number; scaleX: number }[] = []

      for (let i = 0; i < louverCount; i++) {
        const u = i / (louverCount - 1)
        const y = (u - 0.48) * 1.98
        const w = u < 0.45 ? 0.55 + u * 2.45 : 1.68
        louverRestTransforms.push({ y, z: 0.05, scaleX: w })
        dummy.position.set(0, y, 0.05)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(w, 1, 1)
        dummy.updateMatrix()
        instancedLouvers.setMatrixAt(i, dummy.matrix)
      }
      instancedLouvers.instanceMatrix.needsUpdate = true
      rootGroup.add(instancedLouvers)

      // 3. Hollow 3D Machined Titanium Heraldic Armor Frame
      const shieldFrame = new THREE.Mesh(
        track(createHollowShieldGeo(1.08, 0.84, 0.26, 0.048)),
        brushedBezelMat
      )
      shieldFrame.position.z = 0.06
      rootGroup.add(shieldFrame)

      // 4. Inner Emerald Optical Rim
      const innerOptic = new THREE.Mesh(
        track(createHollowShieldGeo(0.85, 0.82, 0.06, 0.005)),
        opticLineMat
      )
      innerOptic.position.z = 0.21
      rootGroup.add(innerOptic)

      // 5. Raised Central 3D Titanium Crest + Extruded Emerald Checkmark
      const centerCrest = new THREE.Mesh(
        track(createSolidShieldGeo(0.44, 0.15, 0.032)),
        brushedBezelMat
      )
      centerCrest.position.z = 0.24
      rootGroup.add(centerCrest)

      const checkMesh = new THREE.Mesh(track(createCheckmarkGeo(0.92)), emeraldGlowMat)
      checkMesh.position.set(0, 0.02, 0.36)
      rootGroup.add(checkMesh)

      // 6. Orbital 3D Telemetry Ring & 3 Instanced Satellites (1 draw call!)
      const orbitGroup = new THREE.Group()
      orbitGroup.rotation.x = 1.12
      orbitGroup.rotation.y = -0.22
      rootGroup.add(orbitGroup)

      const orbitRing = new THREE.Mesh(
        track(new THREE.TorusGeometry(1.52, 0.022, 14, 64)),
        brushedBezelMat
      )
      orbitGroup.add(orbitRing)

      const orbitOptic = new THREE.Mesh(
        track(new THREE.TorusGeometry(1.52, 0.006, 8, 64)),
        opticLineMat
      )
      orbitOptic.position.z = 0.02
      orbitGroup.add(orbitOptic)

      const satGeo = track(new THREE.CylinderGeometry(0.08, 0.08, 0.08, 14))
      const instancedSats = track(new THREE.InstancedMesh(satGeo, emeraldGlowMat, 3))
      for (let i = 0; i < 3; i++) {
        const angle = (i / 3) * Math.PI * 2
        dummy.position.set(Math.cos(angle) * 1.52, Math.sin(angle) * 1.52, 0)
        dummy.rotation.set(0, 0, 0)
        dummy.scale.set(1, 1, 1)
        dummy.updateMatrix()
        instancedSats.setMatrixAt(i, dummy.matrix)
      }
      instancedSats.instanceMatrix.needsUpdate = true
      orbitGroup.add(instancedSats)

      let viewW = window.innerWidth || 1440
      let viewH = window.innerHeight || 900

      const updateSize = () => {
        if (!container) return
        width = container.clientWidth || 360
        height = container.clientHeight || 360
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

      // Zero DOM reflow on mousemove
      const onMouseMove = (e: MouseEvent) => {
        if (!isInViewport) return
        pointer.targetX = (e.clientX / viewW) * 2 - 1
        pointer.targetY = (e.clientY / viewH) * 2 - 1
      }

      if (!isCoarsePointer) {
        window.addEventListener("mousemove", onMouseMove, { passive: true })
      }

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

        rootGroup.position.y = Math.sin(t * 1.2) * 0.08
        rootGroup.rotation.y = 0.36 + Math.sin(t * 0.65) * 0.22 + pointer.currentX * 0.32
        rootGroup.rotation.x = -0.24 + Math.cos(t * 0.5) * 0.12 + pointer.currentY * 0.22

        for (let i = 0; i < louverCount; i++) {
          const rest = louverRestTransforms[i]
          const phase = i * 0.42 - t * 1.85
          dummy.position.set(0, rest.y, rest.z + Math.cos(phase) * 0.042)
          dummy.rotation.set(Math.sin(phase) * 0.52, 0, 0)
          dummy.scale.set(rest.scaleX, 1, 1)
          dummy.updateMatrix()
          instancedLouvers.setMatrixAt(i, dummy.matrix)
        }
        instancedLouvers.instanceMatrix.needsUpdate = true

        orbitGroup.rotation.z = t * 0.45

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
  }, [])

  const features = [
    { icon: Wifi, label: "Monitoramento Remoto 24/7", desc: "Via Q-SYS Reflect" },
    { icon: Clock, label: "SLA Garantido", desc: "Nenhuma sessão suspensa" },
    { icon: Wrench, label: "Suporte Preventivo", desc: "Falhas resolvidas antes de acontecerem" }
  ]

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 overflow-hidden bg-[#020205]">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_35%_50%,rgba(16,185,129,0.12)_0%,transparent_60%)]" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_70%_50%,rgba(59,130,246,0.06)_0%,transparent_50%)]" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* LEFT: REAL 3D ANODIZED TITANIUM SHIELD MONOLITH */}
          <div className="relative flex flex-col items-center justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 flex items-center justify-center">
              <div className="absolute inset-4 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.2)_0%,transparent_70%)] pointer-events-none" />
              <div
                ref={canvasHolderRef}
                className="w-full h-full flex items-center justify-center select-none pointer-events-none"
              />

              {/* Subtle Technical Telemetry Badges */}
              <div className="absolute top-4 left-2 sm:left-4 px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-emerald-500/30 shadow-lg pointer-events-none">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-widest uppercase text-emerald-300 font-bold">
                    SLA // 3 ANOS ATIVO
                  </span>
                </div>
              </div>

              <div className="absolute bottom-4 right-2 sm:right-4 px-3 py-1.5 rounded-lg bg-zinc-950/90 border border-cyan-500/30 shadow-lg pointer-events-none">
                <span className="font-mono text-[10px] tracking-widest uppercase text-cyan-300 font-bold">
                  Q-SYS REFLECT // 24/7
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={hasAnimated ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-center lg:text-left mt-4 lg:mt-0"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-4 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse" />
              <span className="text-emerald-400 text-xs md:text-sm font-bold tracking-widest uppercase">
                Sistema de Proteção Ativa
              </span>
            </div>

            <h3 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1]">
              3 Anos de Garantia
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mt-2">
                e SLA Blindado.
              </span>
            </h3>

            <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0">
              Investir dinheiro público exige segurança técnica absoluta. Oferecemos 3 anos de
              garantia total sobre a instalação e suporte remoto contínuo via Q-SYS Reflect
              Enterprise Manager.
            </p>

            <div className="flex flex-col gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30, scale: 0.95 }}
                  animate={hasAnimated ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8, transition: { duration: 0.25 } }}
                  className="flex items-center gap-5 bg-white/[0.02] border border-white/5 rounded-2xl p-4 md:p-5 hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-colors duration-500 group/pill cursor-default"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center flex-shrink-0 group-hover/pill:bg-emerald-500/20 group-hover/pill:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-500">
                    <f.icon className="w-6 h-6 md:w-7 md:h-7 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-white font-bold text-base md:text-lg block mb-0.5">
                      {f.label}
                    </span>
                    <span className="text-zinc-500 text-sm md:text-base">{f.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})
