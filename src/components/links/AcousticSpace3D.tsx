import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AcousticSpace3D() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let width = window.innerWidth
    let height = window.innerHeight

    // 1. SCENE, CAMERA & RENDERER
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05060a, 0.045)

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.set(0, 0.6, 13)

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.25

    container.innerHTML = ""
    container.appendChild(renderer.domElement)

    // 2. STUDIO 3D LIGHTING (Real Specular & Rim Lighting)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 2.2)
    scene.add(ambientLight)

    const cyanKeyLight = new THREE.DirectionalLight(0x06b6d4, 4.5)
    cyanKeyLight.position.set(-8, 10, 8)
    scene.add(cyanKeyLight)

    const blueRimLight = new THREE.DirectionalLight(0x3b82f6, 3.8)
    blueRimLight.position.set(9, -6, 5)
    scene.add(blueRimLight)

    const topWhiteLight = new THREE.DirectionalLight(0xe0f2fe, 2.5)
    topWhiteLight.position.set(0, 12, 10)
    scene.add(topWhiteLight)

    const leftPointLight = new THREE.PointLight(0x22d3ee, 6, 14)
    leftPointLight.position.set(-5, 1.5, 4)
    scene.add(leftPointLight)

    const rightPointLight = new THREE.PointLight(0x6366f1, 6, 14)
    rightPointLight.position.set(5, 0.5, 4)
    scene.add(rightPointLight)

    // =========================================================================
    // 3. OBJECT A (LEFT): SOLID 3D GYROSCOPIC ACOUSTIC CORE
    // =========================================================================
    const leftGroup = new THREE.Group()
    scene.add(leftGroup)

    // Faceted 3D Metallic Titanium Icosahedron Core
    const coreGeo = new THREE.IcosahedronGeometry(1.05, 0)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      emissive: 0x083344,
      emissiveIntensity: 0.45,
      metalness: 0.92,
      roughness: 0.18,
      flatShading: true
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    leftGroup.add(coreMesh)

    // Glowing Wireframe Exoskeleton around the solid core
    const cageGeo = new THREE.IcosahedronGeometry(1.09, 0)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.55
    })
    const cageMesh = new THREE.Mesh(cageGeo, cageMat)
    leftGroup.add(cageMesh)

    // 3D Vertex Nodes on the Icosahedron corners
    const nodeGeo = new THREE.SphereGeometry(0.055, 16, 16)
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xa5f3fc,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.2,
      metalness: 0.5,
      roughness: 0.1
    })
    const posAttr = coreGeo.attributes.position
    const uniqueVerts = new Set<string>()
    for (let i = 0; i < posAttr.count; i++) {
      const vx = Number(posAttr.getX(i).toFixed(2))
      const vy = Number(posAttr.getY(i).toFixed(2))
      const vz = Number(posAttr.getZ(i).toFixed(2))
      const key = `${vx},${vy},${vz}`
      if (!uniqueVerts.has(key)) {
        uniqueVerts.add(key)
        const node = new THREE.Mesh(nodeGeo, nodeMat)
        node.position.set(vx * 1.07, vy * 1.07, vz * 1.07)
        coreMesh.add(node)
      }
    }

    // 3 Solid Volumetric 3D Metallic Gyroscope Rings (Torus)
    const gyroRing1Geo = new THREE.TorusGeometry(1.65, 0.042, 24, 96)
    const gyroRing1Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15
    })
    const gyroRing1 = new THREE.Mesh(gyroRing1Geo, gyroRing1Mat)
    leftGroup.add(gyroRing1)

    const gyroRing2Geo = new THREE.TorusGeometry(1.92, 0.032, 20, 96)
    const gyroRing2Mat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      emissive: 0x0f172a,
      metalness: 0.95,
      roughness: 0.2
    })
    const gyroRing2 = new THREE.Mesh(gyroRing2Geo, gyroRing2Mat)
    leftGroup.add(gyroRing2)

    // Add orbiting satellite spheres on Ring 2
    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2
      const sat = new THREE.Mesh(
        new THREE.SphereGeometry(0.075, 16, 16),
        nodeMat
      )
      sat.position.set(Math.cos(angle) * 1.92, Math.sin(angle) * 1.92, 0)
      gyroRing2.add(sat)
    }

    const gyroRing3Geo = new THREE.TorusGeometry(2.2, 0.022, 16, 96)
    const gyroRing3Mat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.75
    })
    const gyroRing3 = new THREE.Mesh(gyroRing3Geo, gyroRing3Mat)
    leftGroup.add(gyroRing3)

    // =========================================================================
    // 4. OBJECT B (RIGHT): 3D ACOUSTIC TRANSDUCER & VOLUMETRIC WAVE RINGS
    // =========================================================================
    const rightGroup = new THREE.Group()
    scene.add(rightGroup)

    // Sculpted 3D Speaker / Acoustic Transducer Body
    const driverGroup = new THREE.Group()
    rightGroup.add(driverGroup)

    // Outer Brushed Chrome Frame
    const frameMesh = new THREE.Mesh(
      new THREE.TorusGeometry(1.05, 0.09, 28, 80),
      new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        metalness: 0.95,
        roughness: 0.18
      })
    )
    driverGroup.add(frameMesh)

    // Dark Acoustic Cone (3D Lathe profile)
    const conePoints = [
      new THREE.Vector2(0.98, 0),
      new THREE.Vector2(0.75, -0.15),
      new THREE.Vector2(0.45, -0.38),
      new THREE.Vector2(0.25, -0.48),
      new THREE.Vector2(0.01, -0.5)
    ]
    const coneGeo = new THREE.LatheGeometry(conePoints, 64)
    coneGeo.rotateX(Math.PI / 2)
    const coneMesh = new THREE.Mesh(
      coneGeo,
      new THREE.MeshStandardMaterial({
        color: 0x111827,
        metalness: 0.7,
        roughness: 0.35,
        side: THREE.DoubleSide
      })
    )
    driverGroup.add(coneMesh)

    // Central Metallic Dust Cap (Cúpula Acústica)
    const capMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.32, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.12
      })
    )
    capMesh.scale.set(1, 1, 0.55)
    capMesh.position.z = -0.32
    driverGroup.add(capMesh)

    // Rear Magnet / Heatsink Cylinder
    const magnetMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.55, 0.5, 0.45, 32),
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        metalness: 0.9,
        roughness: 0.25
      })
    )
    magnetMesh.rotation.x = Math.PI / 2
    magnetMesh.position.z = -0.68
    driverGroup.add(magnetMesh)

    // 5 Volumetric 3D Sound Wave Rings propagating forward in 3D space
    const waveRings: { mesh: THREE.Mesh; mat: THREE.MeshStandardMaterial; offset: number }[] = []
    const baseWaveGeo = new THREE.TorusGeometry(1, 0.032, 20, 80)

    for (let i = 0; i < 5; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0x22d3ee : 0x60a5fa,
        emissive: i % 2 === 0 ? 0x06b6d4 : 0x3b82f6,
        emissiveIntensity: 0.75,
        metalness: 0.85,
        roughness: 0.15,
        transparent: true,
        opacity: 0.8
      })
      const mesh = new THREE.Mesh(baseWaveGeo, mat)
      rightGroup.add(mesh)
      waveRings.push({ mesh, mat, offset: i / 5 })
    }

    // Orient the Right Transducer Group dynamically toward the viewer
    rightGroup.rotation.set(0.32, -0.52, 0.1)

    // =========================================================================
    // 5. OBJECT C (BOTTOM HORIZON): 3D SHADED TOPOGRAPHIC WAVEFIELD TERRAIN
    // =========================================================================
    const terrainGroup = new THREE.Group()
    terrainGroup.position.set(0, -3.6, -2)
    terrainGroup.rotation.x = -Math.PI / 2.35
    scene.add(terrainGroup)

    const terrainGeo = new THREE.PlaneGeometry(34, 16, 48, 24)
    // Save original X, Y coordinates for wave displacement
    const terrainPos = terrainGeo.attributes.position
    const origXY: { x: number; y: number }[] = []
    for (let i = 0; i < terrainPos.count; i++) {
      origXY.push({ x: terrainPos.getX(i), y: terrainPos.getY(i) })
    }

    // Solid Shaded 3D Terrain (catches cyan & blue directional light on facets!)
    const terrainSolidMat = new THREE.MeshStandardMaterial({
      color: 0x070d19,
      emissive: 0x04101f,
      emissiveIntensity: 0.3,
      metalness: 0.85,
      roughness: 0.28,
      flatShading: true
    })
    const terrainSolidMesh = new THREE.Mesh(terrainGeo, terrainSolidMat)
    terrainGroup.add(terrainSolidMesh)

    // Glowing Wireframe Overlay on top of the 3D terrain
    const terrainWireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    })
    const terrainWireMesh = new THREE.Mesh(terrainGeo, terrainWireMat)
    terrainWireMesh.position.z = 0.02
    terrainGroup.add(terrainWireMesh)

    // =========================================================================
    // 6. OBJECT D: FLOATING 3D FACETED CRYSTALS (OCTAHEDRONS)
    // =========================================================================
    const crystalGeo = new THREE.OctahedronGeometry(0.55, 0)
    const crystalMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0369a1,
      emissiveIntensity: 0.4,
      metalness: 0.92,
      roughness: 0.12,
      flatShading: true
    })
    const crystalWireMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.5
    })

    const crystal1 = new THREE.Group()
    crystal1.add(new THREE.Mesh(crystalGeo, crystalMat))
    crystal1.add(new THREE.Mesh(crystalGeo, crystalWireMat))
    scene.add(crystal1)

    const crystal2 = new THREE.Group()
    crystal2.scale.setScalar(0.75)
    crystal2.add(new THREE.Mesh(crystalGeo, crystalMat))
    crystal2.add(new THREE.Mesh(crystalGeo, crystalWireMat))
    scene.add(crystal2)

    // =========================================================================
    // 7. RESPONSIVE LAYOUT POSITIONING (DESKTOP vs MOBILE)
    // =========================================================================
    const updateLayoutPositions = () => {
      width = window.innerWidth
      height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)

      const isDesktop = width >= 960
      if (isDesktop) {
        leftGroup.position.set(-5.2, 0.9, 0)
        leftGroup.scale.setScalar(1.05)

        rightGroup.position.set(5.2, 0.4, 0)
        rightGroup.scale.setScalar(1.05)

        crystal1.position.set(-4.2, -2.1, 1.2)
        crystal2.position.set(4.4, 2.9, -1)
      } else {
        // Mobile Portrait: position sculptures on upper corners so they frame the UI cleanly
        leftGroup.position.set(-2.1, 3.1, -1.5)
        leftGroup.scale.setScalar(0.58)

        rightGroup.position.set(2.1, -0.4, -1.5)
        rightGroup.scale.setScalar(0.58)

        crystal1.position.set(-1.9, -2.5, -1)
        crystal2.position.set(1.9, 3.4, -2)
      }
    }

    updateLayoutPositions()
    window.addEventListener("resize", updateLayoutPositions)

    // =========================================================================
    // 8. INTERACTIVE PARALLAX (MOUSE, TOUCH & SCROLL)
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

    // =========================================================================
    // 9. ANIMATION LOOP (60 FPS)
    // =========================================================================
    const clock = new THREE.Clock()
    let animationFrameId: number

    const animate = () => {
      const t = clock.getElapsedTime()

      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.05
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.05

      // Smooth 3D Camera Parallax
      camera.position.x = pointer.currentX * 0.85
      camera.position.y = 0.6 - pointer.currentY * 0.55 - (scrollY * 0.0012)
      camera.lookAt(0, -0.2, 0)

      // Animate Left 3D Gyroscope Core
      coreMesh.rotation.x = t * 0.45
      coreMesh.rotation.y = t * 0.65
      cageMesh.rotation.x = t * 0.45
      cageMesh.rotation.y = t * 0.65

      gyroRing1.rotation.x = t * 0.7 + 0.4
      gyroRing1.rotation.y = t * 0.4
      gyroRing2.rotation.x = -t * 0.5 + 1.1
      gyroRing2.rotation.z = t * 0.6
      gyroRing3.rotation.y = -t * 0.45 + 0.8
      gyroRing3.rotation.z = -t * 0.3

      leftGroup.position.y += Math.sin(t * 1.4) * 0.0025

      // Animate Right 3D Acoustic Transducer & Propagating Sound Rings
      const bassPulse = Math.pow(Math.max(0, Math.sin(t * 3.5)), 4)
      coneMesh.position.z = bassPulse * 0.08
      capMesh.position.z = -0.32 + bassPulse * 0.1

      rightGroup.rotation.y = -0.52 + Math.sin(t * 0.6) * 0.15 + pointer.currentX * 0.2
      rightGroup.rotation.x = 0.32 + Math.cos(t * 0.5) * 0.1 + pointer.currentY * 0.15

      for (const item of waveRings) {
        const progress = (t * 0.38 + item.offset) % 1
        // Move forward along Z axis and expand in 3D space
        item.mesh.position.z = 0.15 + progress * 2.6
        const scale = 0.65 + progress * 1.15
        item.mesh.scale.set(scale, scale, 1)
        item.mat.opacity = Math.sin(progress * Math.PI) * 0.85
      }

      // Animate 3D Shaded Topographic Wavefield Terrain
      for (let i = 0; i < terrainPos.count; i++) {
        const { x, y } = origXY[i]
        const dist = Math.sqrt(x * x + y * y)
        const zWave =
          Math.sin(dist * 0.65 - t * 2.0) * 0.42 +
          Math.cos(x * 0.35 + t * 1.1) * Math.sin(y * 0.45 + t * 0.9) * 0.28
        terrainPos.setZ(i, zWave)
      }
      terrainPos.needsUpdate = true
      terrainGeo.computeVertexNormals()

      // Animate Floating 3D Faceted Crystals
      crystal1.rotation.x = t * 0.6
      crystal1.rotation.y = t * 0.85
      crystal2.rotation.x = -t * 0.7
      crystal2.rotation.z = t * 0.5

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", updateLayoutPositions)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("touchmove", onTouchMove)
      window.removeEventListener("scroll", onScroll)
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
