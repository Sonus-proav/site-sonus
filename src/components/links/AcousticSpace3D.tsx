import { useEffect, useRef } from "react"

interface Vec3 {
  x: number
  y: number
  z: number
}

interface ProjectedPoint {
  x: number
  y: number
  z: number
  scale: number
  visible: boolean
}

export function AcousticSpace3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d", { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // Mouse / Touch / Scroll interactive state
    const pointer = { targetX: 0, targetY: 0, currentX: 0, currentY: 0, pulse: 0 }
    let scrollOffset = window.scrollY

    const handleMouseMove = (e: MouseEvent) => {
      pointer.targetX = (e.clientX / width - 0.5) * 2
      pointer.targetY = (e.clientY / height - 0.5) * 2
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        pointer.targetX = (e.touches[0].clientX / width - 0.5) * 1.5
        pointer.targetY = (e.touches[0].clientY / height - 0.5) * 1.5
      }
    }

    const handleTouchStart = () => {
      pointer.pulse = 1
    }

    const handleScroll = () => {
      scrollOffset = window.scrollY
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("scroll", handleScroll, { passive: true })

    // 3D Math Utilities
    const rotateX = (p: Vec3, angle: number): Vec3 => {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return { x: p.x, y: p.y * c - p.z * s, z: p.y * s + p.z * c }
    }

    const rotateY = (p: Vec3, angle: number): Vec3 => {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return { x: p.x * c + p.z * s, y: p.y, z: -p.x * s + p.z * c }
    }

    const rotateZ = (p: Vec3, angle: number): Vec3 => {
      const c = Math.cos(angle)
      const s = Math.sin(angle)
      return { x: p.x * c - p.y * s, y: p.x * s + p.y * c, z: p.z }
    }

    const fov = 520
    const cameraZ = 620

    const project = (p: Vec3, centerX: number, centerY: number): ProjectedPoint => {
      const z = p.z + cameraZ
      if (z <= 40) {
        return { x: 0, y: 0, z, scale: 0, visible: false }
      }
      const scale = fov / z
      return {
        x: centerX + p.x * scale,
        y: centerY + p.y * scale,
        z,
        scale,
        visible: true
      }
    }

    // Pre-generate 3D Icosahedron / Geodesic Core vertices & edges
    const phi = (1 + Math.sqrt(5)) / 2
    const rawIcoVerts: Vec3[] = [
      { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
    ].map(v => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z)
      return { x: v.x / len, y: v.y / len, z: v.z / len }
    })

    const icoEdges: [number, number][] = []
    for (let i = 0; i < rawIcoVerts.length; i++) {
      for (let j = i + 1; j < rawIcoVerts.length; j++) {
        const dx = rawIcoVerts[i].x - rawIcoVerts[j].x
        const dy = rawIcoVerts[i].y - rawIcoVerts[j].y
        const dz = rawIcoVerts[i].z - rawIcoVerts[j].z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (dist < 1.2) {
          icoEdges.push([i, j])
        }
      }
    }

    // Pre-generate 3D Octahedron vertices & edges
    const octaVerts: Vec3[] = [
      { x: 0, y: 1, z: 0 }, { x: 0, y: -1, z: 0 },
      { x: 1, y: 0, z: 0 }, { x: -1, y: 0, z: 0 },
      { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: -1 }
    ]
    const octaEdges: [number, number][] = [
      [0, 2], [0, 3], [0, 4], [0, 5],
      [1, 2], [1, 3], [1, 4], [1, 5],
      [2, 4], [4, 3], [3, 5], [5, 2]
    ]

    // Floating 3D Acoustic Particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: (Math.sin(i * 73.1) * 0.5) * 1400,
      y: (Math.cos(i * 29.7) * 0.5) * 1000,
      z: (Math.sin(i * 19.3) * 0.5) * 600,
      size: 1.2 + (i % 3) * 0.7,
      speedY: 0.25 + (i % 5) * 0.08,
      hue: i % 2 === 0 ? "6, 182, 212" : "59, 130, 246"
    }))

    // Helper: Draw a 3D Ring in space
    const drawRing3D = (
      radius: number,
      segments: number,
      rotX: number,
      rotY: number,
      rotZ: number,
      offset: Vec3,
      centerX: number,
      centerY: number,
      colorRGB: string,
      baseAlpha: number,
      lineWidth: number = 1.2,
      dashed: boolean = false
    ) => {
      ctx.beginPath()
      if (dashed) {
        ctx.setLineDash([4, 6])
      } else {
        ctx.setLineDash([])
      }

      let started = false
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2
        let pt: Vec3 = {
          x: Math.cos(theta) * radius,
          y: Math.sin(theta) * radius,
          z: 0
        }
        pt = rotateX(pt, rotX)
        pt = rotateY(pt, rotY)
        pt = rotateZ(pt, rotZ)
        pt.x += offset.x
        pt.y += offset.y
        pt.z += offset.z

        const proj = project(pt, centerX, centerY)
        if (!proj.visible) continue
        if (!started) {
          ctx.moveTo(proj.x, proj.y)
          started = true
        } else {
          ctx.lineTo(proj.x, proj.y)
        }
      }
      ctx.strokeStyle = `rgba(${colorRGB}, ${baseAlpha})`
      ctx.lineWidth = lineWidth
      ctx.stroke()
      ctx.setLineDash([])
    }

    let time = 0

    const render = () => {
      time += 0.014
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.06
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.06
      pointer.pulse *= 0.94

      ctx.clearRect(0, 0, width, height)

      const isDesktop = width >= 960
      const camYaw = pointer.currentX * 0.28
      const camPitch = pointer.currentY * 0.22
      const scrollFactor = scrollOffset * 0.0015

      // =========================================================================
      // 1. 3D TOPOGRAPHIC ACOUSTIC WAVEFIELD (FLOOR HORIZON)
      // =========================================================================
      const cols = isDesktop ? 32 : 18
      const rows = isDesktop ? 16 : 12
      const spacingX = isDesktop ? 64 : 44
      const spacingZ = isDesktop ? 46 : 42
      const floorY = isDesktop ? 260 : 290

      const gridProj: ProjectedPoint[][] = []

      for (let r = 0; r < rows; r++) {
        const rowArr: ProjectedPoint[] = []
        for (let c = 0; c < cols; c++) {
          const gx = (c - (cols - 1) / 2) * spacingX
          const gz = r * spacingZ - 220
          const distFromCenter = Math.sqrt(gx * gx + gz * gz) * 0.008

          // Dual harmonic acoustic wave interference
          const waveY =
            Math.sin(distFromCenter * 2.2 - time * 2.1 + scrollFactor) * 28 +
            Math.cos(gx * 0.009 + time * 1.3) * Math.sin(gz * 0.011 + time) * 16 +
            pointer.pulse * Math.sin(distFromCenter * 5 - time * 6) * 18

          let pt: Vec3 = { x: gx, y: floorY + waveY, z: gz }
          pt = rotateY(pt, camYaw * 0.5)
          pt = rotateX(pt, 0.18 + camPitch * 0.35)

          rowArr.push(project(pt, width * 0.5, height * 0.52))
        }
        gridProj.push(rowArr)
      }

      // Draw longitudinal & transverse wavefield lines
      ctx.lineWidth = 1
      for (let r = 0; r < rows; r++) {
        const rowDepthAlpha = (1 - r / rows) * (isDesktop ? 0.24 : 0.18)
        ctx.strokeStyle = `rgba(6, 182, 212, ${rowDepthAlpha})`
        ctx.beginPath()
        let started = false
        for (let c = 0; c < cols; c++) {
          const p = gridProj[r][c]
          if (!p.visible) continue
          if (!started) {
            ctx.moveTo(p.x, p.y)
            started = true
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      for (let c = 0; c < cols; c += 2) {
        ctx.strokeStyle = `rgba(59, 130, 246, ${isDesktop ? 0.12 : 0.09})`
        ctx.beginPath()
        let started = false
        for (let r = 0; r < rows; r++) {
          const p = gridProj[r][c]
          if (!p.visible) continue
          if (!started) {
            ctx.moveTo(p.x, p.y)
            started = true
          } else {
            ctx.lineTo(p.x, p.y)
          }
        }
        ctx.stroke()
      }

      // =========================================================================
      // 2. OBJECT A: 3D GYROSCOPIC BEAMFORMING SPHERE + GEODESIC CORE
      //    Positioned on Left Flank (Desktop) or Top-Left Orbit (Mobile)
      // =========================================================================
      const sphereCenterX = isDesktop ? width * 0.18 : width * 0.14
      const sphereCenterY = isDesktop ? height * 0.38 : height * 0.18
      const sphereRadius = isDesktop ? 135 : 78
      const coreRadius = sphereRadius * 0.56

      const sphereOffset: Vec3 = {
        x: pointer.currentX * -25,
        y: Math.sin(time * 0.9) * 14 + pointer.currentY * -20,
        z: 0
      }

      // Ambient glow behind 3D Sphere
      const sphereGlow = ctx.createRadialGradient(
        sphereCenterX,
        sphereCenterY,
        5,
        sphereCenterX,
        sphereCenterY,
        sphereRadius * 1.6
      )
      sphereGlow.addColorStop(0, "rgba(6, 182, 212, 0.16)")
      sphereGlow.addColorStop(0.5, "rgba(59, 130, 246, 0.06)")
      sphereGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = sphereGlow
      ctx.beginPath()
      ctx.arc(sphereCenterX, sphereCenterY, sphereRadius * 1.6, 0, Math.PI * 2)
      ctx.fill()

      // Outer 3 Gyroscopic Rings (X, Y, Z orthogonal orbits)
      drawRing3D(
        sphereRadius,
        48,
        time * 0.55 + camPitch,
        time * 0.35 + camYaw,
        0,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "6, 182, 212",
        isDesktop ? 0.42 : 0.3,
        1.4
      )
      drawRing3D(
        sphereRadius * 0.86,
        44,
        -time * 0.4 + Math.PI / 3,
        time * 0.65 + camYaw,
        time * 0.25,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "59, 130, 246",
        isDesktop ? 0.35 : 0.25,
        1.1,
        true
      )
      drawRing3D(
        sphereRadius * 1.12,
        52,
        Math.PI / 2.4 + camPitch * 0.5,
        -time * 0.3,
        time * 0.45,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "148, 163, 184",
        isDesktop ? 0.2 : 0.14,
        1
      )

      // Inner 3D Geodesic Icosahedron Core
      const transformedIco: ProjectedPoint[] = rawIcoVerts.map(v => {
        let p: Vec3 = { x: v.x * coreRadius, y: v.y * coreRadius, z: v.z * coreRadius }
        p = rotateX(p, time * 0.7 + scrollFactor + camPitch)
        p = rotateY(p, time * 0.95 + camYaw)
        p = rotateZ(p, time * 0.4)
        p.x += sphereOffset.x
        p.y += sphereOffset.y
        p.z += sphereOffset.z
        return project(p, sphereCenterX, sphereCenterY)
      })

      // Draw Geodesic edges
      ctx.lineWidth = 1.15
      for (const [i, j] of icoEdges) {
        const p1 = transformedIco[i]
        const p2 = transformedIco[j]
        if (!p1.visible || !p2.visible) continue
        const avgZ = (p1.z + p2.z) * 0.5
        const depthAlpha = Math.max(0.08, Math.min(0.65, (720 - avgZ) / 260))
        ctx.strokeStyle = `rgba(34, 211, 238, ${depthAlpha * (isDesktop ? 1 : 0.75)})`
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      // Draw glowing vertices on Geodesic Core
      for (const pt of transformedIco) {
        if (!pt.visible) continue
        const depthAlpha = Math.max(0.15, Math.min(0.9, (710 - pt.z) / 220))
        ctx.fillStyle = `rgba(165, 243, 252, ${depthAlpha})`
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, Math.max(1.5, 2.8 * pt.scale), 0, Math.PI * 2)
        ctx.fill()
      }

      // =========================================================================
      // 3. OBJECT B: 3D ACOUSTIC DISPERSION WAVEGUIDE (CONCENTRIC SOUND RINGS)
      //    Positioned on Right Flank (Desktop) or Mid-Right Orbit (Mobile)
      // =========================================================================
      const coneCenterX = isDesktop ? width * 0.82 : width * 0.88
      const coneCenterY = isDesktop ? height * 0.46 : height * 0.48
      const ringCount = 7

      // Soft indigo/cyan glow behind Acoustic Waveguide
      const coneGlow = ctx.createRadialGradient(
        coneCenterX,
        coneCenterY,
        5,
        coneCenterX,
        coneCenterY,
        isDesktop ? 210 : 120
      )
      coneGlow.addColorStop(0, "rgba(59, 130, 246, 0.15)")
      coneGlow.addColorStop(0.6, "rgba(6, 182, 212, 0.05)")
      coneGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = coneGlow
      ctx.beginPath()
      ctx.arc(coneCenterX, coneCenterY, isDesktop ? 210 : 120, 0, Math.PI * 2)
      ctx.fill()

      const coneRotX = 0.45 + Math.sin(time * 0.6) * 0.18 + camPitch
      const coneRotY = -0.55 + Math.cos(time * 0.5) * 0.2 + camYaw

      const spinePoints: ProjectedPoint[] = []

      for (let i = 0; i < ringCount; i++) {
        // Acoustic wave propagating along the cone axis
        const progress = ((i / ringCount) + time * 0.28) % 1
        const ringRadius = (isDesktop ? 24 : 15) + progress * (isDesktop ? 130 : 75)
        const localZ = (progress - 0.5) * (isDesktop ? 240 : 140)
        const alpha = Math.sin(progress * Math.PI) * (isDesktop ? 0.55 : 0.36)

        // Spine center point
        let centerPt: Vec3 = { x: 0, y: 0, z: localZ }
        centerPt = rotateX(centerPt, coneRotX)
        centerPt = rotateY(centerPt, coneRotY)
        spinePoints.push(project(centerPt, coneCenterX, coneCenterY))

        drawRing3D(
          ringRadius,
          40,
          coneRotX,
          coneRotY,
          time * 0.3 + i * 0.2,
          { x: pointer.currentX * 20, y: Math.cos(time * 0.8) * 12, z: localZ },
          coneCenterX,
          coneCenterY,
          i % 2 === 0 ? "6, 182, 212" : "99, 102, 241",
          alpha,
          1.5
        )
      }

      // Draw central acoustic transducer axis
      let axisStart: Vec3 = rotateY(rotateX({ x: 0, y: 0, z: -130 }, coneRotX), coneRotY)
      let axisEnd: Vec3 = rotateY(rotateX({ x: 0, y: 0, z: 130 }, coneRotX), coneRotY)
      const pStart = project(axisStart, coneCenterX + pointer.currentX * 20, coneCenterY)
      const pEnd = project(axisEnd, coneCenterX + pointer.currentX * 20, coneCenterY)

      if (pStart.visible && pEnd.visible) {
        ctx.strokeStyle = "rgba(6, 182, 212, 0.28)"
        ctx.lineWidth = 1
        ctx.setLineDash([3, 5])
        ctx.beginPath()
        ctx.moveTo(pStart.x, pStart.y)
        ctx.lineTo(pEnd.x, pEnd.y)
        ctx.stroke()
        ctx.setLineDash([])
      }

      // =========================================================================
      // 4. OBJECT C: 3D OCTAHEDRAL AUTOMATION CRYSTAL (Floating Secondary Node)
      // =========================================================================
      const octCenterX = isDesktop ? width * 0.22 : width * 0.15
      const octCenterY = isDesktop ? height * 0.78 : height * 0.76
      const octSize = isDesktop ? 52 : 34

      const projOcta = octaVerts.map(v => {
        let p: Vec3 = { x: v.x * octSize, y: v.y * octSize, z: v.z * octSize }
        p = rotateX(p, -time * 0.8 + camPitch)
        p = rotateY(p, time * 1.1 + camYaw)
        p.y += Math.sin(time * 1.2 + 2) * 10
        return project(p, octCenterX, octCenterY)
      })

      ctx.lineWidth = 1.1
      ctx.strokeStyle = `rgba(56, 189, 248, ${isDesktop ? 0.35 : 0.24})`
      for (const [i, j] of octaEdges) {
        const p1 = projOcta[i]
        const p2 = projOcta[j]
        if (!p1.visible || !p2.visible) continue
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
      }

      // =========================================================================
      // 5. 3D FLOATING FREQUENCY PARTICLES IN SPACE
      // =========================================================================
      for (const pt of particles) {
        pt.y -= pt.speedY
        if (pt.y < -600) pt.y = 600

        let p3d: Vec3 = {
          x: pt.x + pointer.currentX * -35,
          y: pt.y - (scrollOffset * 0.15) % 800,
          z: pt.z
        }
        p3d = rotateY(p3d, camYaw * 0.35)
        p3d = rotateX(p3d, camPitch * 0.25)

        const proj = project(p3d, width * 0.5, height * 0.5)
        if (!proj.visible) continue

        const alpha = Math.max(0.05, Math.min(0.55, (850 - proj.z) / 500))
        ctx.fillStyle = `rgba(${pt.hue}, ${alpha})`
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, pt.size * proj.scale, 0, Math.PI * 2)
        ctx.fill()
      }

      // =========================================================================
      // 6. SUBTLE TECHNICAL HUD TELEMETRY (Desktop Widescreen Flanks)
      // =========================================================================
      if (isDesktop) {
        ctx.font = "600 9px Outfit, sans-serif"
        ctx.fillStyle = "rgba(103, 232, 249, 0.38)"
        ctx.letterSpacing = "2px"
        ctx.fillText("ACOUSTIC FIELD // 360°", sphereCenterX - 58, sphereCenterY + sphereRadius + 34)
        ctx.fillText("WAVE DISPERSION // ACTIVE", coneCenterX - 68, coneCenterY + 155)
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
