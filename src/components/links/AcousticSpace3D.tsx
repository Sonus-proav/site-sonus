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
  wx: number
  wy: number
  wz: number
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

    // 3D Vector & Matrix Math Utilities
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

    const normalize = (v: Vec3): Vec3 => {
      const len = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z) || 1
      return { x: v.x / len, y: v.y / len, z: v.z / len }
    }

    const cross = (a: Vec3, b: Vec3): Vec3 => ({
      x: a.y * b.z - a.z * b.y,
      y: a.z * b.x - a.x * b.z,
      z: a.x * b.y - a.y * b.x
    })

    const dot = (a: Vec3, b: Vec3): number => a.x * b.x + a.y * b.y + a.z * b.z

    const fov = 540
    const cameraZ = 620

    const project = (p: Vec3, centerX: number, centerY: number): ProjectedPoint => {
      const z = p.z + cameraZ
      if (z <= 40) {
        return { x: 0, y: 0, z, wx: p.x, wy: p.y, wz: p.z, scale: 0, visible: false }
      }
      const scale = fov / z
      return {
        x: centerX + p.x * scale,
        y: centerY + p.y * scale,
        z,
        wx: p.x,
        wy: p.y,
        wz: p.z,
        scale,
        visible: true
      }
    }

    // Studio Light Directions (Normalized)
    const keyLight = normalize({ x: -0.55, y: -0.65, z: -0.52 }) // Top-left front key light
    const rimLight = normalize({ x: 0.65, y: 0.35, z: 0.65 })    // Bottom-right back rim light
    const viewDir = { x: 0, y: 0, z: -1 }

    // Pre-generate 3D Icosahedron vertices, edges, and 20 triangular faces (outward normals)
    const phi = (1 + Math.sqrt(5)) / 2
    const rawIcoVerts: Vec3[] = [
      { x: -1, y: phi, z: 0 }, { x: 1, y: phi, z: 0 }, { x: -1, y: -phi, z: 0 }, { x: 1, y: -phi, z: 0 },
      { x: 0, y: -1, z: phi }, { x: 0, y: 1, z: phi }, { x: 0, y: -1, z: -phi }, { x: 0, y: 1, z: -phi },
      { x: phi, y: 0, z: -1 }, { x: phi, y: 0, z: 1 }, { x: -phi, y: 0, z: -1 }, { x: -phi, y: 0, z: 1 }
    ].map(v => normalize(v))

    const icoFaces: [number, number, number][] = []
    for (let i = 0; i < rawIcoVerts.length; i++) {
      for (let j = i + 1; j < rawIcoVerts.length; j++) {
        for (let k = j + 1; k < rawIcoVerts.length; k++) {
          const d1 = Math.hypot(rawIcoVerts[i].x - rawIcoVerts[j].x, rawIcoVerts[i].y - rawIcoVerts[j].y, rawIcoVerts[i].z - rawIcoVerts[j].z)
          const d2 = Math.hypot(rawIcoVerts[j].x - rawIcoVerts[k].x, rawIcoVerts[j].y - rawIcoVerts[k].y, rawIcoVerts[j].z - rawIcoVerts[k].z)
          const d3 = Math.hypot(rawIcoVerts[i].x - rawIcoVerts[k].x, rawIcoVerts[i].y - rawIcoVerts[k].y, rawIcoVerts[i].z - rawIcoVerts[k].z)
          if (d1 < 1.2 && d2 < 1.2 && d3 < 1.2) {
            // Ensure outward-pointing normal
            const v0 = rawIcoVerts[i]
            const v1 = rawIcoVerts[j]
            const v2 = rawIcoVerts[k]
            const cx = (v0.x + v1.x + v2.x) / 3
            const cy = (v0.y + v1.y + v2.y) / 3
            const cz = (v0.z + v1.z + v2.z) / 3
            const e1 = { x: v1.x - v0.x, y: v1.y - v0.y, z: v1.z - v0.z }
            const e2 = { x: v2.x - v0.x, y: v2.y - v0.y, z: v2.z - v0.z }
            const n = cross(e1, e2)
            if (n.x * cx + n.y * cy + n.z * cz >= 0) {
              icoFaces.push([i, j, k])
            } else {
              icoFaces.push([i, k, j])
            }
          }
        }
      }
    }

    // Pre-generate 3D Octahedron vertices and 8 triangular faces
    const octaVerts: Vec3[] = [
      { x: 0, y: -1.15, z: 0 }, // 0: Top peak
      { x: 0, y: 1.15, z: 0 },  // 1: Bottom peak
      { x: 1, y: 0, z: 0 },     // 2: Right
      { x: 0, y: 0, z: 1 },     // 3: Back
      { x: -1, y: 0, z: 0 },    // 4: Left
      { x: 0, y: 0, z: -1 }     // 5: Front
    ]
    const octaFaces: [number, number, number][] = [
      [0, 5, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5],
      [1, 2, 5], [1, 3, 2], [1, 4, 3], [1, 5, 4]
    ]

    // Floating 3D Acoustic Particles
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, (_, i) => ({
      x: (Math.sin(i * 73.1) * 0.5) * 1400,
      y: (Math.cos(i * 29.7) * 0.5) * 1000,
      z: (Math.sin(i * 19.3) * 0.5) * 600,
      size: 1.3 + (i % 3) * 0.7,
      speedY: 0.25 + (i % 5) * 0.08,
      hue: i % 2 === 0 ? "6, 182, 212" : "59, 130, 246"
    }))

    // Helper: Draw a 3D Volumetric Ring split by depth (pass='back' draws wz > 0, pass='front' draws wz <= 0, pass='all' draws all)
    const drawVolumetricRing3D = (
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
      baseWidth: number = 1.8,
      pass: "back" | "front" | "all" = "all",
      withSatellites: boolean = false,
      timeVal: number = 0
    ) => {
      const pts: ProjectedPoint[] = []
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
        pts.push(project(pt, centerX, centerY))
      }

      for (let i = 0; i < segments; i++) {
        const p1 = pts[i]
        const p2 = pts[i + 1]
        if (!p1.visible || !p2.visible) continue

        const avgWZ = (p1.wz - offset.z + (p2.wz - offset.z)) * 0.5
        if (pass === "back" && avgWZ < -2) continue
        if (pass === "front" && avgWZ > 2) continue

        // Depth factor: -1 is closest to viewer, +1 is furthest behind
        const depthNorm = Math.max(-1, Math.min(1, avgWZ / radius))
        // Front of ring is brighter & thicker, back of ring is dimmer & thinner
        const frontFactor = (1 - depthNorm) * 0.5 // 1 at front, 0 at back

        const segAlpha = baseAlpha * (0.22 + 0.88 * Math.pow(frontFactor, 1.3))
        const segWidth = baseWidth * (0.55 + 1.15 * frontFactor)

        // Outer volumetric glow on front half
        if (frontFactor > 0.55) {
          ctx.strokeStyle = `rgba(${colorRGB}, ${segAlpha * 0.28})`
          ctx.lineWidth = segWidth * 3.2
          ctx.lineCap = "round"
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }

        // Main metallic/lit tube stroke
        ctx.strokeStyle = `rgba(${colorRGB}, ${segAlpha})`
        ctx.lineWidth = segWidth
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()

        // Specular highlight core on closest front crest
        if (frontFactor > 0.78) {
          const specAlpha = (frontFactor - 0.78) * 3.2 * baseAlpha
          ctx.strokeStyle = `rgba(224, 242, 254, ${Math.min(0.9, specAlpha)})`
          ctx.lineWidth = segWidth * 0.45
          ctx.beginPath()
          ctx.moveTo(p1.x, p1.y)
          ctx.lineTo(p2.x, p2.y)
          ctx.stroke()
        }
      }

      // Optional 3D lit orbital satellites riding the ring
      if (withSatellites) {
        for (let s = 0; s < 3; s++) {
          const angle = timeVal * 1.1 + (s * Math.PI * 2) / 3
          let sp: Vec3 = { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, z: 0 }
          sp = rotateX(sp, rotX)
          sp = rotateY(sp, rotY)
          sp = rotateZ(sp, rotZ)
          const localZ = sp.z
          if (pass === "back" && localZ < 0) continue
          if (pass === "front" && localZ >= 0) continue

          sp.x += offset.x
          sp.y += offset.y
          sp.z += offset.z
          const proj = project(sp, centerX, centerY)
          if (!proj.visible) continue

          const satRadius = Math.max(2.2, 4.2 * proj.scale)
          const grad = ctx.createRadialGradient(
            proj.x - satRadius * 0.3,
            proj.y - satRadius * 0.3,
            satRadius * 0.1,
            proj.x,
            proj.y,
            satRadius * 1.4
          )
          grad.addColorStop(0, "rgba(255, 255, 255, 0.95)")
          grad.addColorStop(0.45, `rgba(${colorRGB}, 0.85)`)
          grad.addColorStop(1, "rgba(6, 182, 212, 0)")
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(proj.x, proj.y, satRadius * 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }
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
      // 1. 3D SHADED TOPOGRAPHIC ACOUSTIC WAVEFIELD (FLOOR HORIZON)
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

      // Render 3D Shaded Quads from back row to front row (Painter's Order)
      for (let r = rows - 2; r >= 0; r--) {
        const rowFade = Math.sin((r / (rows - 1)) * Math.PI) * (1 - r / rows)
        for (let c = 0; c < cols - 1; c++) {
          const p00 = gridProj[r][c]
          const p10 = gridProj[r][c + 1]
          const p11 = gridProj[r + 1][c + 1]
          const p01 = gridProj[r + 1][c]
          if (!p00.visible || !p10.visible || !p11.visible || !p01.visible) continue

          // Edge fade horizontally
          const colNorm = c / (cols - 2)
          const edgeFade = Math.sin(colNorm * Math.PI) * rowFade

          // Compute 3D surface slope for specular wave-crest lighting
          const dyX = p10.wy - p00.wy
          const dyZ = p01.wy - p00.wy
          const normal = normalize({ x: -dyX, y: -42, z: -dyZ })
          const lightDot = Math.max(0, dot(normal, keyLight))
          const crestHeight = Math.max(0, (floorY - p00.wy) / 36)

          const fillAlpha = (0.04 + Math.pow(lightDot, 2.5) * 0.18 + crestHeight * 0.09) * edgeFade * (isDesktop ? 1 : 0.75)

          ctx.fillStyle = `rgba(14, 116, 144, ${fillAlpha})`
          ctx.beginPath()
          ctx.moveTo(p00.x, p00.y)
          ctx.lineTo(p10.x, p10.y)
          ctx.lineTo(p11.x, p11.y)
          ctx.lineTo(p01.x, p01.y)
          ctx.closePath()
          ctx.fill()
        }
      }

      // Draw crisp quad grid lines on top of shaded wave surface (No ugly diagonal triangles!)
      for (let r = 0; r < rows; r++) {
        const rowDepthAlpha = (1 - r / rows) * (isDesktop ? 0.32 : 0.22)
        ctx.strokeStyle = `rgba(6, 182, 212, ${rowDepthAlpha})`
        ctx.lineWidth = 1.15 * (1 - (r / rows) * 0.45)
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
        const colNorm = c / (cols - 1)
        const colFade = Math.sin(colNorm * Math.PI)
        ctx.strokeStyle = `rgba(59, 130, 246, ${(isDesktop ? 0.16 : 0.11) * colFade})`
        ctx.lineWidth = 0.9
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
      // 2. OBJECT A: 3D GYROSCOPIC BEAMFORMING SPHERE + SHADED FACETED CORE
      // =========================================================================
      const sphereCenterX = isDesktop ? width * 0.18 : width * 0.14
      const sphereCenterY = isDesktop ? height * 0.38 : height * 0.18
      const sphereRadius = isDesktop ? 135 : 78
      const coreRadius = sphereRadius * 0.58

      const sphereOffset: Vec3 = {
        x: pointer.currentX * -25,
        y: Math.sin(time * 0.9) * 14 + pointer.currentY * -20,
        z: 0
      }

      // Ambient studio backlight behind 3D Sphere
      const sphereGlow = ctx.createRadialGradient(
        sphereCenterX,
        sphereCenterY,
        5,
        sphereCenterX,
        sphereCenterY,
        sphereRadius * 1.75
      )
      sphereGlow.addColorStop(0, "rgba(6, 182, 212, 0.22)")
      sphereGlow.addColorStop(0.45, "rgba(59, 130, 246, 0.08)")
      sphereGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = sphereGlow
      ctx.beginPath()
      ctx.arc(sphereCenterX, sphereCenterY, sphereRadius * 1.75, 0, Math.PI * 2)
      ctx.fill()

      // PASS 1: Draw BACK halves of the 3 Gyroscopic Rings (occluded behind the 3D core)
      drawVolumetricRing3D(
        sphereRadius,
        56,
        time * 0.55 + camPitch,
        time * 0.35 + camYaw,
        0,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "6, 182, 212",
        isDesktop ? 0.55 : 0.38,
        2.1,
        "back",
        true,
        time
      )
      drawVolumetricRing3D(
        sphereRadius * 0.86,
        52,
        -time * 0.4 + Math.PI / 3,
        time * 0.65 + camYaw,
        time * 0.25,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "59, 130, 246",
        isDesktop ? 0.48 : 0.32,
        1.7,
        "back",
        false,
        time
      )
      drawVolumetricRing3D(
        sphereRadius * 1.14,
        60,
        Math.PI / 2.4 + camPitch * 0.5,
        -time * 0.3,
        time * 0.45,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "148, 163, 184",
        isDesktop ? 0.32 : 0.22,
        1.4,
        "back",
        true,
        -time * 0.7
      )

      // PASS 2: Render Solid Shaded 3D Geodesic Core (Painter's Algorithm + PBR Normal Lighting)
      const transformedIco: ProjectedPoint[] = rawIcoVerts.map(v => {
        let p: Vec3 = { x: v.x * coreRadius, y: v.y * coreRadius, z: v.z * coreRadius }
        p = rotateX(p, time * 0.65 + scrollFactor + camPitch)
        p = rotateY(p, time * 0.9 + camYaw)
        p = rotateZ(p, time * 0.38)
        p.x += sphereOffset.x
        p.y += sphereOffset.y
        p.z += sphereOffset.z
        return project(p, sphereCenterX, sphereCenterY)
      })

      // Sort 20 triangular faces back-to-front by average Z
      const sortedIcoFaces = icoFaces
        .map(face => {
          const p0 = transformedIco[face[0]]
          const p1 = transformedIco[face[1]]
          const p2 = transformedIco[face[2]]
          const avgZ = (p0.z + p1.z + p2.z) / 3
          return { face, p0, p1, p2, avgZ }
        })
        .sort((a, b) => b.avgZ - a.avgZ)

      for (const { p0, p1, p2 } of sortedIcoFaces) {
        if (!p0.visible || !p1.visible || !p2.visible) continue

        // Compute 3D face normal in camera space
        const e1 = { x: p1.wx - p0.wx, y: p1.wy - p0.wy, z: p1.wz - p0.wz }
        const e2 = { x: p2.wx - p0.wx, y: p2.wy - p0.wy, z: p2.wz - p0.wz }
        const n = normalize(cross(e1, e2))

        // Check if front-facing toward camera (wz < 0 means facing viewer)
        const isFront = n.z < 0.12

        if (!isFront) {
          // Back-facing facets: dark smoked-obsidian interior occlusion
          ctx.fillStyle = "rgba(7, 12, 24, 0.72)"
          ctx.strokeStyle = "rgba(6, 182, 212, 0.12)"
          ctx.lineWidth = 0.7
        } else {
          // Front-facing 3D facets: Diffuse + Specular + Rim lighting
          const diffKey = Math.max(0, -dot(n, keyLight))
          const diffRim = Math.max(0, -dot(n, rimLight))
          // Half-vector specular reflection
          const halfVec = normalize({ x: keyLight.x + viewDir.x, y: keyLight.y + viewDir.y, z: keyLight.z + viewDir.z })
          const spec = Math.pow(Math.max(0, -dot(n, halfVec)), 14)
          // Fresnel edge glow
          const fresnel = Math.pow(1 - Math.abs(n.z), 2.2)

          const rCol = Math.round(10 + diffKey * 22 + diffRim * 45 + spec * 165)
          const gCol = Math.round(24 + diffKey * 95 + diffRim * 75 + spec * 215 + fresnel * 40)
          const bCol = Math.round(45 + diffKey * 135 + diffRim * 140 + spec * 235 + fresnel * 65)
          const faceAlpha = isDesktop ? 0.88 : 0.78

          ctx.fillStyle = `rgba(${Math.min(255, rCol)}, ${Math.min(255, gCol)}, ${Math.min(255, bCol)}, ${faceAlpha})`
          ctx.strokeStyle = `rgba(103, 232, 249, ${0.32 + spec * 0.55 + fresnel * 0.25})`
          ctx.lineWidth = 1.25
        }

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      // 3D Lit Spherical Nodes on Front-Facing Core Vertices
      for (const pt of transformedIco) {
        if (!pt.visible) continue
        const localZ = pt.wz - sphereOffset.z
        if (localZ > coreRadius * 0.25) continue // Occlude back vertices behind solid core

        const frontRatio = (coreRadius - localZ) / (coreRadius * 2)
        const nodeRadius = Math.max(2.0, 3.8 * pt.scale * (0.65 + frontRatio * 0.6))

        const nGrad = ctx.createRadialGradient(
          pt.x - nodeRadius * 0.35,
          pt.y - nodeRadius * 0.35,
          nodeRadius * 0.1,
          pt.x,
          pt.y,
          nodeRadius
        )
        nGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)")
        nGrad.addColorStop(0.5, "rgba(34, 211, 238, 0.9)")
        nGrad.addColorStop(1, "rgba(8, 51, 68, 0.2)")

        ctx.fillStyle = nGrad
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, nodeRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      // PASS 3: Draw FRONT halves of the 3 Gyroscopic Rings (passing in front of the 3D core!)
      drawVolumetricRing3D(
        sphereRadius,
        56,
        time * 0.55 + camPitch,
        time * 0.35 + camYaw,
        0,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "6, 182, 212",
        isDesktop ? 0.55 : 0.38,
        2.1,
        "front",
        true,
        time
      )
      drawVolumetricRing3D(
        sphereRadius * 0.86,
        52,
        -time * 0.4 + Math.PI / 3,
        time * 0.65 + camYaw,
        time * 0.25,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "59, 130, 246",
        isDesktop ? 0.48 : 0.32,
        1.7,
        "front",
        false,
        time
      )
      drawVolumetricRing3D(
        sphereRadius * 1.14,
        60,
        Math.PI / 2.4 + camPitch * 0.5,
        -time * 0.3,
        time * 0.45,
        sphereOffset,
        sphereCenterX,
        sphereCenterY,
        "148, 163, 184",
        isDesktop ? 0.32 : 0.22,
        1.4,
        "front",
        true,
        -time * 0.7
      )

      // =========================================================================
      // 3. OBJECT B: 3D VOLUMETRIC ACOUSTIC DISPERSION WAVEGUIDE (RIGHT FLANK)
      // =========================================================================
      const coneCenterX = isDesktop ? width * 0.82 : width * 0.88
      const coneCenterY = isDesktop ? height * 0.46 : height * 0.48
      const ringCount = 7

      // Ambient studio glow behind Acoustic Waveguide
      const coneGlow = ctx.createRadialGradient(
        coneCenterX,
        coneCenterY,
        5,
        coneCenterX,
        coneCenterY,
        isDesktop ? 225 : 130
      )
      coneGlow.addColorStop(0, "rgba(59, 130, 246, 0.2)")
      coneGlow.addColorStop(0.55, "rgba(6, 182, 212, 0.07)")
      coneGlow.addColorStop(1, "rgba(0, 0, 0, 0)")
      ctx.fillStyle = coneGlow
      ctx.beginPath()
      ctx.arc(coneCenterX, coneCenterY, isDesktop ? 225 : 130, 0, Math.PI * 2)
      ctx.fill()

      const coneRotX = 0.45 + Math.sin(time * 0.6) * 0.16 + camPitch
      const coneRotY = -0.55 + Math.cos(time * 0.5) * 0.18 + camYaw
      const waveOffset: Vec3 = { x: pointer.currentX * 20, y: Math.cos(time * 0.8) * 12, z: 0 }

      // Draw 12 Longitudinal 3D Waveguide Structural Ribs (Creates true 3D tunnel volume)
      const ribCount = 12
      const backZ = -(isDesktop ? 120 : 70)
      const frontZ = isDesktop ? 120 : 70
      const minR = isDesktop ? 24 : 15
      const maxR = minR + (isDesktop ? 130 : 75)

      for (let b = 0; b < ribCount; b++) {
        const theta = (b / ribCount) * Math.PI * 2 + time * 0.15
        let pBack: Vec3 = { x: Math.cos(theta) * minR, y: Math.sin(theta) * minR, z: backZ }
        let pFront: Vec3 = { x: Math.cos(theta) * maxR, y: Math.sin(theta) * maxR, z: frontZ }

        pBack = rotateY(rotateX(pBack, coneRotX), coneRotY)
        pFront = rotateY(rotateX(pFront, coneRotX), coneRotY)

        pBack.x += waveOffset.x; pBack.y += waveOffset.y
        pFront.x += waveOffset.x; pFront.y += waveOffset.y

        const pr1 = project(pBack, coneCenterX, coneCenterY)
        const pr2 = project(pFront, coneCenterX, coneCenterY)
        if (!pr1.visible || !pr2.visible) continue

        const ribDepth = Math.max(0.04, Math.min(0.22, (1 - pFront.wz / 180) * 0.14))
        ctx.strokeStyle = `rgba(56, 189, 248, ${ribDepth})`
        ctx.lineWidth = 0.9
        ctx.beginPath()
        ctx.moveTo(pr1.x, pr1.y)
        ctx.lineTo(pr2.x, pr2.y)
        ctx.stroke()
      }

      // Sort propagating 3D acoustic rings from back-to-front along Z
      const ringItems = Array.from({ length: ringCount }, (_, i) => {
        const progress = ((i / ringCount) + time * 0.26) % 1
        const ringRadius = minR + progress * (isDesktop ? 130 : 75)
        const localZ = (progress - 0.5) * (isDesktop ? 240 : 140)
        const alpha = Math.sin(progress * Math.PI) * (isDesktop ? 0.68 : 0.45)
        return { i, progress, ringRadius, localZ, alpha }
      }).sort((a, b) => a.localZ - b.localZ)

      for (const item of ringItems) {
        // Translucent 3D acoustic pressure diaphragm fill inside each wavefront
        const segs = 36
        ctx.beginPath()
        for (let s = 0; s <= segs; s++) {
          const th = (s / segs) * Math.PI * 2
          let pt: Vec3 = { x: Math.cos(th) * item.ringRadius, y: Math.sin(th) * item.ringRadius, z: item.localZ }
          pt = rotateY(rotateX(pt, coneRotX), coneRotY)
          pt.x += waveOffset.x; pt.y += waveOffset.y
          const pr = project(pt, coneCenterX, coneCenterY)
          if (s === 0) ctx.moveTo(pr.x, pr.y)
          else ctx.lineTo(pr.x, pr.y)
        }
        ctx.closePath()
        ctx.fillStyle = item.i % 2 === 0
          ? `rgba(6, 182, 212, ${item.alpha * 0.055})`
          : `rgba(59, 130, 246, ${item.alpha * 0.055})`
        ctx.fill()

        // Volumetric 3D shaded ring with front specular highlight & depth thickness
        drawVolumetricRing3D(
          item.ringRadius,
          48,
          coneRotX,
          coneRotY,
          time * 0.3 + item.i * 0.2,
          { x: waveOffset.x, y: waveOffset.y, z: item.localZ },
          coneCenterX,
          coneCenterY,
          item.i % 2 === 0 ? "6, 182, 212" : "99, 102, 241",
          item.alpha,
          isDesktop ? 2.2 : 1.6,
          "all",
          false,
          time
        )
      }

      // Central 3D Acoustic Spine & Transducer Phase-Plug Core
      let axisStart: Vec3 = rotateY(rotateX({ x: 0, y: 0, z: -135 }, coneRotX), coneRotY)
      let axisEnd: Vec3 = rotateY(rotateX({ x: 0, y: 0, z: 135 }, coneRotX), coneRotY)
      const pStart = project({ x: axisStart.x + waveOffset.x, y: axisStart.y + waveOffset.y, z: axisStart.z }, coneCenterX, coneCenterY)
      const pEnd = project({ x: axisEnd.x + waveOffset.x, y: axisEnd.y + waveOffset.y, z: axisEnd.z }, coneCenterX, coneCenterY)

      if (pStart.visible && pEnd.visible) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.32)"
        ctx.lineWidth = 1.2
        ctx.setLineDash([3, 5])
        ctx.beginPath()
        ctx.moveTo(pStart.x, pStart.y)
        ctx.lineTo(pEnd.x, pEnd.y)
        ctx.stroke()
        ctx.setLineDash([])

        // 3D Lit Phase-Plug Sphere at Transducer Origin
        const originRadius = Math.max(4, 7.5 * pStart.scale)
        const oGrad = ctx.createRadialGradient(
          pStart.x - originRadius * 0.3,
          pStart.y - originRadius * 0.3,
          originRadius * 0.1,
          pStart.x,
          pStart.y,
          originRadius * 1.6
        )
        oGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)")
        oGrad.addColorStop(0.4, "rgba(34, 211, 238, 0.85)")
        oGrad.addColorStop(1, "rgba(6, 182, 212, 0)")
        ctx.fillStyle = oGrad
        ctx.beginPath()
        ctx.arc(pStart.x, pStart.y, originRadius * 1.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // =========================================================================
      // 4. OBJECT C: 3D SHADED OCTAHEDRAL AUTOMATION CRYSTAL (True 3D Facets)
      // =========================================================================
      const octCenterX = isDesktop ? width * 0.22 : width * 0.15
      const octCenterY = isDesktop ? height * 0.78 : height * 0.76
      const octSize = isDesktop ? 52 : 34

      const projOcta = octaVerts.map(v => {
        let p: Vec3 = { x: v.x * octSize, y: v.y * octSize, z: v.z * octSize }
        p = rotateX(p, -time * 0.75 + camPitch)
        p = rotateY(p, time * 1.05 + camYaw)
        p.y += Math.sin(time * 1.2 + 2) * 10
        return project(p, octCenterX, octCenterY)
      })

      // Sort 8 triangular faces of the Octahedron back-to-front
      const sortedOctaFaces = octaFaces
        .map(face => {
          const p0 = projOcta[face[0]]
          const p1 = projOcta[face[1]]
          const p2 = projOcta[face[2]]
          const avgZ = (p0.z + p1.z + p2.z) / 3
          return { p0, p1, p2, avgZ }
        })
        .sort((a, b) => b.avgZ - a.avgZ)

      for (const { p0, p1, p2 } of sortedOctaFaces) {
        if (!p0.visible || !p1.visible || !p2.visible) continue
        const e1 = { x: p1.wx - p0.wx, y: p1.wy - p0.wy, z: p1.wz - p0.wz }
        const e2 = { x: p2.wx - p0.wx, y: p2.wy - p0.wy, z: p2.wz - p0.wz }
        const n = normalize(cross(e1, e2))
        const isFront = n.z < 0.15

        if (!isFront) {
          ctx.fillStyle = "rgba(8, 15, 30, 0.55)"
          ctx.strokeStyle = "rgba(56, 189, 248, 0.14)"
          ctx.lineWidth = 0.8
        } else {
          const diffKey = Math.max(0, -dot(n, keyLight))
          const halfVec = normalize({ x: keyLight.x + viewDir.x, y: keyLight.y + viewDir.y, z: keyLight.z + viewDir.z })
          const spec = Math.pow(Math.max(0, -dot(n, halfVec)), 12)

          const rCol = Math.round(12 + diffKey * 30 + spec * 160)
          const gCol = Math.round(32 + diffKey * 110 + spec * 210)
          const bCol = Math.round(62 + diffKey * 155 + spec * 235)

          ctx.fillStyle = `rgba(${Math.min(255, rCol)}, ${Math.min(255, gCol)}, ${Math.min(255, bCol)}, ${isDesktop ? 0.78 : 0.65})`
          ctx.strokeStyle = `rgba(125, 211, 252, ${0.38 + spec * 0.5})`
          ctx.lineWidth = 1.2
        }

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()
      }

      // =========================================================================
      // 5. 3D FLOATING FREQUENCY PARTICLES IN SPACE (With 3D Radial Shading)
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

        const alpha = Math.max(0.06, Math.min(0.65, (850 - proj.z) / 500))
        const r = Math.max(1.0, pt.size * proj.scale)
        ctx.fillStyle = `rgba(${pt.hue}, ${alpha})`
        ctx.beginPath()
        ctx.arc(proj.x, proj.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      // =========================================================================
      // 6. SUBTLE TECHNICAL HUD TELEMETRY (Desktop Widescreen Flanks)
      // =========================================================================
      if (isDesktop) {
        ctx.font = "600 9px Outfit, sans-serif"
        ctx.fillStyle = "rgba(103, 232, 249, 0.42)"
        ctx.letterSpacing = "2px"
        ctx.fillText("ACOUSTIC FIELD // 360°", sphereCenterX - 58, sphereCenterY + sphereRadius + 38)
        ctx.fillText("WAVE DISPERSION // ACTIVE", coneCenterX - 68, coneCenterY + 158)
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

export default AcousticSpace3D
