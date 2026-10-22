import { useEffect, useRef, memo } from "react"
import * as THREE from "three"

// Precision-machined 3D Beveled Titanium Blade (same industrial DNA as /links)
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
    bevelSegments: 4,
    steps: 1,
    bevelSize: r,
    bevelThickness: radius,
    curveSegments: 12
  })
  geo.center()
  geo.computeVertexNormals()
  return geo
}

export const SolucoesHero3D = memo(function SolucoesHero3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (typeof navigator !== "undefined" && /ReactSnap|Prerender/i.test(navigator.userAgent)) {
      return
    }

    const disposables: { dispose: () => void }[] = []
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item)
      return item
    }

    let width = container.clientWidth || window.innerWidth
    let height = container.clientHeight || 600

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.5, 45)
    camera.position.set(0, 0, 14)

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

    // =========================================================================
    // STUDIO SOFTBOX HDR ENVIRONMENT (Silky Specular Reflections on Bevels)
    // =========================================================================
    const pmremGenerator = new THREE.PMREMGenerator(renderer)
    pmremGenerator.compileEquirectangularShader()

    const envScene = new THREE.Scene()
    envScene.background = new THREE.Color(0x030407)

    const topSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(28, 7),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 3.5, 4.0), side: THREE.DoubleSide })
    )
    topSoftbox.position.set(0, 8, 3)
    topSoftbox.rotation.x = Math.PI / 2.2
    envScene.add(topSoftbox)

    const leftSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.2, 2.2, 3.0), side: THREE.DoubleSide })
    )
    leftSoftbox.position.set(-10, 1, 4)
    leftSoftbox.rotation.y = Math.PI / 2.3
    envScene.add(leftSoftbox)

    const rightSoftbox = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 16),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(0.35, 1.1, 3.2), side: THREE.DoubleSide })
    )
    rightSoftbox.position.set(10, -1, 4)
    rightSoftbox.rotation.y = -Math.PI / 2.3
    envScene.add(rightSoftbox)

    const envRT = track(pmremGenerator.fromScene(envScene, 0.05))
    scene.environment = envRT.texture
    pmremGenerator.dispose()
    topSoftbox.geometry.dispose()
    ;(topSoftbox.material as THREE.Material).dispose()
    leftSoftbox.geometry.dispose()
    ;(leftSoftbox.material as THREE.Material).dispose()
    rightSoftbox.geometry.dispose()
    ;(rightSoftbox.material as THREE.Material).dispose()

    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.35)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
    keyLight.position.set(3, 8, 9)
    scene.add(keyLight)

    const cyanPoint = new THREE.PointLight(0x22d3ee, 18, 18, 1.8)
    scene.add(cyanPoint)

    const bluePoint = new THREE.PointLight(0x3b82f6, 18, 18, 1.8)
    scene.add(bluePoint)

    // =========================================================================
    // INSTANCED DARK TITANIUM ACOUSTIC LOUVER ARCS (2 Draw Calls Total)
    // =========================================================================
    const brushedTitaniumMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x10141d,
        metalness: 0.92,
        roughness: 0.2,
        envMapIntensity: 1.2
      })
    )

    const accentBaseMat = track(
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.85
      })
    )

    const bladeCountPerWing = 18
    const totalBlades = bladeCountPerWing * 2
    const bladeGeo = track(createTitaniumBladeGeometry(2.5, 0.12, 0.84, 0.036))
    const accentEdgeGeo = track(new THREE.BoxGeometry(2.3, 0.01, 0.014))

    const bladesInstanced = track(
      new THREE.InstancedMesh(bladeGeo, brushedTitaniumMat, totalBlades)
    )
    const accentsInstanced = track(
      new THREE.InstancedMesh(accentEdgeGeo, accentBaseMat, totalBlades)
    )
    bladesInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    accentsInstanced.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    scene.add(bladesInstanced)
    scene.add(accentsInstanced)

    interface LouverMeta {
      instanceIndex: number
      index: number
      u: number
      side: "left" | "right"
      bx: number
      by: number
      scaleW: number
      scaleD: number
      baseColor: THREE.Color
    }

    const louvers: LouverMeta[] = []
    let idx = 0
    for (const side of ["left", "right"] as const) {
      const dir = side === "left" ? -1 : 1
      for (let i = 0; i < bladeCountPerWing; i++) {
        const u = i / (bladeCountPerWing - 1)
        const envelope = Math.sin(u * Math.PI)
        const by = (u - 0.5) * 6.8
        const bx = Math.cos((u - 0.5) * Math.PI) * 0.42 * dir
        const scaleW = 0.36 + envelope * 0.68
        const scaleD = 0.55 + envelope * 0.45

        louvers.push({
          instanceIndex: idx++,
          index: i,
          u,
          side,
          bx,
          by,
          scaleW,
          scaleD,
          baseColor: new THREE.Color(side === "left" ? 0x22d3ee : 0x38bdf8)
        })
      }
    }

    let viewW = window.innerWidth || 1440
    let viewH = window.innerHeight || 900
    let wingX = 7.5
    let wingScale = 1.0
    const leftWingPos = new THREE.Vector3()
    const rightWingPos = new THREE.Vector3()
    const leftWingQuat = new THREE.Quaternion()
    const rightWingQuat = new THREE.Quaternion()

    const updateLayout = () => {
      if (!container) return
      width = container.clientWidth || window.innerWidth
      height = container.clientHeight || 600
      viewW = window.innerWidth || 1440
      viewH = window.innerHeight || 900

      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      const isDesktop = width >= 960
      const vFovRad = (camera.fov * Math.PI) / 180
      const wingZ = isDesktop ? -0.5 : -2.2
      const dist = camera.position.z - wingZ
      const halfFrustumW = dist * Math.tan(vFovRad * 0.5) * camera.aspect

      if (isDesktop) {
        wingX = Math.max(5.8, halfFrustumW - 0.85)
        wingScale = 0.98
        leftWingPos.set(-wingX, 0.1, wingZ)
        rightWingPos.set(wingX, -0.1, wingZ)
        leftWingQuat.setFromEuler(new THREE.Euler(0.14, 0.42, -0.11))
        rightWingQuat.setFromEuler(new THREE.Euler(0.14, -0.42, 0.11))
      } else {
        wingX = Math.max(2.2, halfFrustumW - 0.35)
        wingScale = 0.56
        leftWingPos.set(-wingX, 1.3, wingZ)
        rightWingPos.set(wingX, -1.1, wingZ)
        leftWingQuat.setFromEuler(new THREE.Euler(0.15, 0.42, -0.12))
        rightWingQuat.setFromEuler(new THREE.Euler(0.15, -0.42, 0.12))
      }

      cyanPoint.position.set(-wingX + 1.2, 1.5, 4.0)
      bluePoint.position.set(wingX - 1.2, -1.0, 4.0)
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

    const onMouseMove = (e: MouseEvent) => {
      if (!isInViewport) return
      pointer.targetX = (e.clientX / viewW - 0.5) * 2
      pointer.targetY = (e.clientY / viewH - 0.5) * 2
    }

    if (!isCoarsePointer) {
      window.addEventListener("mousemove", onMouseMove, { passive: true })
    }

    const parentMatrix = new THREE.Matrix4()
    const localMatrix = new THREE.Matrix4()
    const worldBladeMatrix = new THREE.Matrix4()
    const accentOffsetMatrix = new THREE.Matrix4().makeTranslation(0, 0, 0.422)
    const worldAccentMatrix = new THREE.Matrix4()
    const tempPos = new THREE.Vector3()
    const tempEuler = new THREE.Euler()
    const tempQuat = new THREE.Quaternion()
    const tempScale = new THREE.Vector3()
    const tempColor = new THREE.Color()
    const wingScaleVec = new THREE.Vector3()

    let elapsed = 0
    let lastTime = performance.now()
    let animationFrameId: number

    const updateInstances = (t: number) => {
      wingScaleVec.setScalar(wingScale)

      for (const b of louvers) {
        const dir = b.side === "left" ? 1 : -1
        const wavePhase = b.index * 0.3 - t * 1.35 * dir
        const pitch = Math.sin(wavePhase) * 0.45 + 0.25
        const yaw = Math.cos(wavePhase * 0.7) * 0.28 * dir
        const zBreath = Math.sin(wavePhase) * 0.22

        parentMatrix.compose(
          b.side === "left" ? leftWingPos : rightWingPos,
          b.side === "left" ? leftWingQuat : rightWingQuat,
          wingScaleVec
        )

        tempPos.set(b.bx, b.by, zBreath)
        tempEuler.set(pitch, yaw, 0)
        tempQuat.setFromEuler(tempEuler)
        tempScale.set(b.scaleW, 1, b.scaleD)
        localMatrix.compose(tempPos, tempQuat, tempScale)

        worldBladeMatrix.multiplyMatrices(parentMatrix, localMatrix)
        bladesInstanced.setMatrixAt(b.instanceIndex, worldBladeMatrix)

        worldAccentMatrix.multiplyMatrices(worldBladeMatrix, accentOffsetMatrix)
        accentsInstanced.setMatrixAt(b.instanceIndex, worldAccentMatrix)

        const specFactor = Math.max(0, Math.sin(wavePhase + 0.6))
        const intensity = 0.08 + Math.pow(specFactor, 3) * 0.55
        tempColor.copy(b.baseColor).multiplyScalar(intensity)
        accentsInstanced.setColorAt(b.instanceIndex, tempColor)
      }

      bladesInstanced.instanceMatrix.needsUpdate = true
      accentsInstanced.instanceMatrix.needsUpdate = true
      if (accentsInstanced.instanceColor) {
        accentsInstanced.instanceColor.needsUpdate = true
      }
    }

    updateInstances(0)
    renderer.render(scene, camera)

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate)

      const dt = Math.min((now - lastTime) * 0.001, 0.1)
      lastTime = now

      if (!isInViewport || !isTabVisible) return

      elapsed += dt
      const lerp = 1 - Math.pow(0.001, dt)
      pointer.currentX += (pointer.targetX - pointer.currentX) * lerp * 0.8
      pointer.currentY += (pointer.targetY - pointer.currentY) * lerp * 0.8

      camera.position.x = pointer.currentX * 0.32
      camera.position.y = -pointer.currentY * 0.22
      camera.lookAt(0, 0, 0)

      updateInstances(elapsed)
      renderer.render(scene, camera)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      visibilityObserver.disconnect()
      if (resizeObserver) {
        resizeObserver.disconnect()
      } else {
        window.removeEventListener("resize", updateLayout)
      }
      document.removeEventListener("visibilitychange", onVisibilityChange)
      if (!isCoarsePointer) {
        window.removeEventListener("mousemove", onMouseMove)
      }
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost)
      disposables.forEach((d) => d.dispose())
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="
        absolute left-1/2 -translate-x-1/2 w-screen -top-28 h-[600px]
        pointer-events-none z-0 overflow-hidden
        [mask-image:linear-gradient(to_bottom,transparent_0%,black_16%,black_84%,transparent_100%)]
      "
    />
  )
})
