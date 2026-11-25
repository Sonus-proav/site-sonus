import { memo, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, Lightformer, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { motion, AnimatePresence } from "framer-motion"
import {
  Camera,
  Mic,
  Maximize2,
  Play,
  Pause,
  Rotate3D,
  Smartphone,
  MonitorPlay,
  ScanFace,
  Sparkles,
} from "lucide-react"
import { getPerfTier } from "@/lib/devicePerf"
import { useInView } from "@/components/bares/useInView"
import { trackCustomizeProduct } from "@/lib/metaPixel"

export type SpeakerTarget = "host" | "guest1" | "guest2" | "wide"
export type OutputAspect = "16:9" | "9:16"

interface SpeakerMeta {
  id: SpeakerTarget
  label: string
  shortLabel: string
  role: string
  camLabel: string
  lensLabel: string
  micChannel: string
  accentHex: string
  quoteWords: string[]
  highlightWordIndices: number[]
  subjectColor: string
}

const SPEAKER_META: Record<SpeakerTarget, SpeakerMeta> = {
  host: {
    id: "host",
    label: "Host (CEO)",
    shortLabel: "Host",
    role: "Liderança Executiva",
    camLabel: "CAM 01 • PGM",
    lensLabel: "85mm Prime Close",
    micChannel: "CH 01 • +2.4 dB",
    accentHex: "#f59e0b",
    quoteWords: [
      "Em",
      "45 minutos",
      "de conversa",
      "geramos",
      "um mês inteiro",
      "de autoridade",
      "para a marca.",
    ],
    highlightWordIndices: [1, 4, 5],
    subjectColor: "#f59e0b",
  },
  guest1: {
    id: "guest1",
    label: "Convidado 01",
    shortLabel: "Conv. 01",
    role: "Diretoria / Especialista",
    camLabel: "CAM 02 • PGM",
    lensLabel: "70mm Tracking",
    micChannel: "CH 02 • +1.8 dB",
    accentHex: "#22d3ee",
    quoteWords: [
      "Sem operadores",
      "na sala,",
      "o convidado",
      "fala com",
      "naturalidade",
      "e confiança.",
    ],
    highlightWordIndices: [0, 4, 5],
    subjectColor: "#22d3ee",
  },
  guest2: {
    id: "guest2",
    label: "Convidado 02",
    shortLabel: "Conv. 02",
    role: "Cliente / Conselho",
    camLabel: "CAM 03 • PGM",
    lensLabel: "70mm Tracking",
    micChannel: "CH 03 • +2.1 dB",
    accentHex: "#38bdf8",
    quoteWords: [
      "O episódio",
      "e os cortes",
      "legendados",
      "chegam prontos",
      "antes do fim",
      "do expediente.",
    ],
    highlightWordIndices: [2, 3, 4],
    subjectColor: "#38bdf8",
  },
  wide: {
    id: "wide",
    label: "Plano Geral",
    shortLabel: "Plano Geral",
    role: "Mesa Completa",
    camLabel: "CAM MASTER • PGM",
    lensLabel: "24mm Wide Mesa",
    micChannel: "AUTOMIX Q-SYS",
    accentHex: "#10b981",
    quoteWords: [
      "Debate dinâmico",
      "com três vozes,",
      "corte instantâneo",
      "e zero latência",
      "perceptível.",
    ],
    highlightWordIndices: [0, 2, 3],
    subjectColor: "#10b981",
  },
}

const AUTO_SEQUENCE: SpeakerTarget[] = ["host", "guest1", "guest2", "wide"]

// 3D Station coordinates shared across seats, mics, and PTZ cameras
const STATION_POS: Record<Exclude<SpeakerTarget, "wide">, [number, number, number]> = {
  host: [0, 0, -1.05],
  guest1: [-1.42, 0, 0.56],
  guest2: [1.42, 0, 0.56],
}

const TARGET_LOOK_AT: Record<SpeakerTarget, [number, number, number]> = {
  host: [0, 0.95, -1.05],
  guest1: [-1.42, 0.92, 0.56],
  guest2: [1.42, 0.92, 0.56],
  wide: [0, 0.72, -0.05],
}

// Procedural radial glow texture (2 triangles, smooth zero-alias gradient)
function createSoftGlowTexture(rgbaCenter: string) {
  const canvas = document.createElement("canvas")
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext("2d")
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 2, 64, 64, 64)
    grad.addColorStop(0, rgbaCenter)
    grad.addColorStop(0.42, rgbaCenter.replace(/[\d.]+\)$/, "0.28)"))
    grad.addColorStop(1, "rgba(0,0,0,0)")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 128, 128)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// High-DPI touchscreen texture for Q-SYS Desk UCI Panel
function createUciScreenTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 320
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.fillStyle = "#080c14"
    ctx.fillRect(0, 0, 512, 320)

    // Header
    ctx.fillStyle = "#111827"
    ctx.fillRect(0, 0, 512, 54)
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(36, 27, 8, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = "#f8fafc"
    ctx.font = "bold 20px sans-serif"
    ctx.fillText("SONUS STUDIO  •  Q-SYS CORE", 58, 34)

    // Primary button
    const grad = ctx.createLinearGradient(28, 78, 484, 152)
    grad.addColorStop(0, "#d97706")
    grad.addColorStop(1, "#ea580c")
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.roundRect(28, 78, 456, 72, 16)
    ctx.fill()
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px sans-serif"
    ctx.fillText("● GRAVAÇÃO AUTÔNOMA ATIVA", 66, 122)

    // Telemetry boxes
    ctx.fillStyle = "rgba(34, 211, 238, 0.14)"
    ctx.strokeStyle = "rgba(34, 211, 238, 0.45)"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.roundRect(28, 174, 218, 114, 14)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "#67e8f9"
    ctx.font = "bold 17px monospace"
    ctx.fillText("AUTO-CORTE PTZ", 48, 212)
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "16px sans-serif"
    ctx.fillText("Detecção de Voz", 48, 244)
    ctx.fillText("3x 4K Sincronizadas", 48, 268)

    ctx.fillStyle = "rgba(16, 185, 129, 0.14)"
    ctx.strokeStyle = "rgba(16, 185, 129, 0.45)"
    ctx.beginPath()
    ctx.roundRect(266, 174, 218, 114, 14)
    ctx.fill()
    ctx.stroke()
    ctx.fillStyle = "#34d399"
    ctx.font = "bold 17px monospace"
    ctx.fillText("ENTREGA DIRETA", 286, 212)
    ctx.fillStyle = "#e2e8f0"
    ctx.font = "16px sans-serif"
    ctx.fillText("16:9 + Cortes 9:16", 286, 244)
    ctx.fillText("Legendas da Marca", 286, 268)
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 4
  return tex
}

// Precision sculpted acoustic podcast table geometry
function createBroadcastTableGeometry() {
  const shape = new THREE.Shape()
  const r = 1.18
  // Rounded horseshoe/delta table tailored for 3-person eye contact + camera angles
  shape.moveTo(-1.35, -0.58)
  shape.quadraticCurveTo(0, -1.25, 1.35, -0.58)
  shape.quadraticCurveTo(1.78, 0.18, 1.24, 0.72)
  shape.quadraticCurveTo(0, 1.05 * (r / 1.18), -1.24, 0.72)
  shape.quadraticCurveTo(-1.78, 0.18, -1.35, -0.58)

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.08,
    bevelEnabled: true,
    bevelSegments: 4,
    steps: 1,
    bevelSize: 0.028,
    bevelThickness: 0.025,
    curveSegments: 32,
  })
  geo.rotateX(Math.PI / 2)
  geo.computeVertexNormals()
  return geo
}

// Speaker station: executive seat + silhouette + boom arm + mic + pulsing tally ring
const SpeakerStation3D = memo(function SpeakerStation3D({
  position,
  yaw,
  isSpeaking,
  accentColor,
  glowTexture,
  phaseOffset,
}: {
  position: [number, number, number]
  yaw: number
  isSpeaking: boolean
  accentColor: string
  glowTexture: THREE.CanvasTexture
  phaseOffset: number
}) {
  const tallyMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const auraMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const headRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + phaseOffset
    const speechPulse = isSpeaking ? 0.65 + 0.35 * Math.sin(t * 7.5) * Math.cos(t * 3.1) : 0.08
    if (tallyMatRef.current) {
      tallyMatRef.current.emissiveIntensity = isSpeaking ? 1.4 + speechPulse * 1.3 : 0.18
    }
    if (auraMatRef.current) {
      auraMatRef.current.opacity = isSpeaking ? 0.42 + speechPulse * 0.28 : 0.04
    }
    if (headRef.current) {
      headRef.current.rotation.y = isSpeaking ? Math.sin(t * 1.4) * 0.12 : Math.sin(t * 0.45) * 0.04
      headRef.current.rotation.x = isSpeaking ? Math.sin(t * 2.1) * 0.05 : 0.02
    }
  })

  return (
    <group position={position} rotation={[0, yaw, 0]}>
      {/* Soft radial floor aura under active speaker */}
      <mesh position={[0, 0.015, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.45, 1.45]} />
        <meshBasicMaterial
          ref={auraMatRef}
          map={glowTexture}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Chair Pedestal */}
      <mesh position={[0, 0.04, -0.05]}>
        <cylinderGeometry args={[0.32, 0.36, 0.05, 24]} />
        <meshStandardMaterial color="#181920" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.24, -0.05]}>
        <cylinderGeometry args={[0.045, 0.055, 0.38, 16]} />
        <meshStandardMaterial color="#272935" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Seat cushion & low-profile executive backrest */}
      <mesh position={[0, 0.46, -0.02]}>
        <cylinderGeometry args={[0.3, 0.3, 0.09, 24]} />
        <meshStandardMaterial color="#17171f" roughness={0.75} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.72, -0.26]} rotation={[0.08, 0, 0]}>
        <boxGeometry args={[0.44, 0.46, 0.07]} />
        <meshStandardMaterial color="#15151d" roughness={0.72} metalness={0.15} />
      </mesh>

      {/* Stylized speaker torso + head */}
      <group position={[0, 0.56, 0]}>
        <mesh position={[0, 0.2, 0]}>
          <capsuleGeometry args={[0.17, 0.24, 8, 20]} />
          <meshStandardMaterial color={isSpeaking ? "#262837" : "#1c1d27"} roughness={0.55} metalness={0.2} />
        </mesh>
        <group ref={headRef} position={[0, 0.52, 0.02]}>
          <mesh>
            <sphereGeometry args={[0.135, 24, 24]} />
            <meshStandardMaterial color={isSpeaking ? "#2f3245" : "#222430"} roughness={0.45} metalness={0.22} />
          </mesh>
          {/* Subtle visor / gaze orientation indicator */}
          <mesh position={[0, 0.01, 0.12]}>
            <boxGeometry args={[0.11, 0.025, 0.03]} />
            <meshStandardMaterial
              color={accentColor}
              emissive={accentColor}
              emissiveIntensity={isSpeaking ? 1.1 : 0.2}
            />
          </mesh>
        </group>
      </group>

      {/* Broadcast Boom Arm + Dynamic Studio Microphone */}
      <group position={[0.24, 0.72, 0.42]}>
        {/* Lower boom strut */}
        <mesh position={[0, 0.06, -0.04]} rotation={[-0.45, 0, 0]}>
          <cylinderGeometry args={[0.015, 0.018, 0.34, 12]} />
          <meshStandardMaterial color="#2c2e3a" metalness={0.9} roughness={0.25} />
        </mesh>
        {/* Upper boom arm */}
        <mesh position={[-0.12, 0.21, -0.18]} rotation={[0.92, 0, 0.48]}>
          <cylinderGeometry args={[0.014, 0.014, 0.38, 12]} />
          <meshStandardMaterial color="#383a48" metalness={0.9} roughness={0.22} />
        </mesh>
        {/* Broadcast microphone capsule */}
        <group position={[-0.22, 0.24, -0.3]} rotation={[0.55, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.036, 0.032, 0.15, 20]} />
            <meshStandardMaterial color="#111218" metalness={0.85} roughness={0.25} />
          </mesh>
          {/* Windscreen tip */}
          <mesh position={[0, 0.095, 0]}>
            <sphereGeometry args={[0.038, 16, 16]} />
            <meshStandardMaterial color="#1d1e26" roughness={0.92} />
          </mesh>
          {/* Q-SYS Active Speech LED Ring on Mic */}
          <mesh position={[0, 0.055, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.038, 0.007, 10, 28]} />
            <meshStandardMaterial
              ref={tallyMatRef}
              color={isSpeaking ? accentColor : "#3f3f46"}
              emissive={isSpeaking ? accentColor : "#18181b"}
              emissiveIntensity={isSpeaking ? 1.8 : 0.15}
            />
          </mesh>
        </group>
      </group>
    </group>
  )
})

// Motorized PTZ 4K Camera with smooth voice-tracking pan/tilt + optical focus cone
const PTZCamera3D = memo(function PTZCamera3D({
  position,
  label,
  targetPoint,
  isActivePGM,
  isWideBeam,
}: {
  position: [number, number, number]
  label: string
  targetPoint: [number, number, number]
  isActivePGM: boolean
  isWideBeam?: boolean
}) {
  const headGroupRef = useRef<THREE.Group>(null)
  const beamMatRef = useRef<THREE.MeshBasicMaterial>(null)
  const dummyTarget = useMemo(() => new THREE.Vector3(), [])
  const currentLookAt = useMemo(() => new THREE.Vector3(...targetPoint), [])

  useFrame(({ clock }) => {
    if (!headGroupRef.current) return
    dummyTarget.set(targetPoint[0], targetPoint[1], targetPoint[2])
    currentLookAt.lerp(dummyTarget, 0.09)
    headGroupRef.current.lookAt(currentLookAt)

    if (beamMatRef.current) {
      const pulse = 0.85 + 0.15 * Math.sin(clock.getElapsedTime() * 3.5)
      beamMatRef.current.opacity = isActivePGM ? (isWideBeam ? 0.075 : 0.115) * pulse : 0.0
    }
  })

  return (
    <group position={position} name={label}>
      {/* Sleek studio floor pedestal / truss column */}
      <mesh position={[0, -position[1] / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.04, position[1], 14]} />
        <meshStandardMaterial color="#1f212b" metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -position[1] + 0.02, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.04, 20]} />
        <meshStandardMaterial color="#16171f" metalness={0.85} roughness={0.35} />
      </mesh>

      {/* PTZ Yoke Base */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.08, 20]} />
        <meshStandardMaterial color="#14151c" metalness={0.8} roughness={0.32} />
      </mesh>

      {/* Rotating PTZ Head */}
      <group ref={headGroupRef} position={[0, 0.04, 0]}>
        <mesh>
          <boxGeometry args={[0.16, 0.13, 0.19]} />
          <meshStandardMaterial color="#1e202b" metalness={0.78} roughness={0.28} />
        </mesh>
        {/* Lens Barrel (+Z in local lookAt space) */}
        <mesh position={[0, 0, 0.13]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.052, 0.058, 0.11, 24]} />
          <meshStandardMaterial color="#0d0e13" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Sapphire Optical Glass Element */}
        <mesh position={[0, 0, 0.186]}>
          <circleGeometry args={[0.044, 24]} />
          <meshStandardMaterial
            color={isActivePGM ? "#38bdf8" : "#0f172a"}
            emissive={isActivePGM ? "#0284c7" : "#000000"}
            emissiveIntensity={isActivePGM ? 0.9 : 0}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        {/* Red PGM Tally Light */}
        <mesh position={[0, 0.075, 0.05]}>
          <boxGeometry args={[0.07, 0.022, 0.026]} />
          <meshStandardMaterial
            color={isActivePGM ? "#ef4444" : "#3f3f46"}
            emissive={isActivePGM ? "#ef4444" : "#10b981"}
            emissiveIntensity={isActivePGM ? 2.4 : 0.25}
          />
        </mesh>

        {/* Translucent Additive Camera Optical FOV Cone */}
        <mesh position={[0, 0, 1.55]} rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[isWideBeam ? 1.15 : 0.56, 2.7, 28, 1, true]} />
          <meshBasicMaterial
            ref={beamMatRef}
            color={isWideBeam ? "#10b981" : "#f59e0b"}
            transparent
            opacity={0}
            depthWrite={false}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  )
})

// 3D Live Q-SYS Audio Meter Column reacting to active speaker voice
const QSysVuColumn3D = memo(function QSysVuColumn3D({ activeSpeaker }: { activeSpeaker: SpeakerTarget }) {
  const bar0Ref = useRef<THREE.Mesh>(null)
  const bar1Ref = useRef<THREE.Mesh>(null)
  const bar2Ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const level0 =
      activeSpeaker === "host" || activeSpeaker === "wide"
        ? 0.45 + 0.48 * Math.abs(Math.sin(t * 7.2) * Math.cos(t * 2.8))
        : 0.08
    const level1 =
      activeSpeaker === "guest1" || activeSpeaker === "wide"
        ? 0.45 + 0.48 * Math.abs(Math.sin(t * 6.4 + 1.1) * Math.cos(t * 3.1))
        : 0.08
    const level2 =
      activeSpeaker === "guest2" || activeSpeaker === "wide"
        ? 0.45 + 0.48 * Math.abs(Math.sin(t * 6.9 + 2.3) * Math.cos(t * 2.4))
        : 0.08

    const refs = [
      { r: bar0Ref.current, l: level0 },
      { r: bar1Ref.current, l: level1 },
      { r: bar2Ref.current, l: level2 },
    ]
    for (const item of refs) {
      if (item.r) {
        item.r.scale.y = item.l
        item.r.position.y = item.l * 0.42
      }
    }
  })

  return (
    <group position={[2.22, 0.06, -1.05]} rotation={[0, -0.45, 0]}>
      {/* Rack base */}
      <mesh position={[0, 0.44, 0]}>
        <boxGeometry args={[0.48, 0.92, 0.24]} />
        <meshStandardMaterial color="#0d0e14" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Glass front bezel */}
      <mesh position={[0, 0.44, 0.125]}>
        <planeGeometry args={[0.42, 0.84]} />
        <meshStandardMaterial color="#05070d" metalness={0.4} roughness={0.2} />
      </mesh>
      {/* 3 VU Meter Bars (CH1 Host, CH2 Conv 1, CH3 Conv 2) */}
      <mesh ref={bar0Ref} position={[-0.12, 0.06, 0.135]}>
        <boxGeometry args={[0.06, 0.82, 0.025]} />
        <meshStandardMaterial color="#f59e0b" emissive="#f59e0b" emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={bar1Ref} position={[0, 0.06, 0.135]}>
        <boxGeometry args={[0.06, 0.82, 0.025]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.6} />
      </mesh>
      <mesh ref={bar2Ref} position={[0.12, 0.06, 0.135]}>
        <boxGeometry args={[0.06, 0.82, 0.025]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={1.6} />
      </mesh>
    </group>
  )
})

function StudioScene3D({
  activeSpeaker,
  isCoarse,
}: {
  activeSpeaker: SpeakerTarget
  isCoarse: boolean
}) {
  const tableGeo = useMemo(() => createBroadcastTableGeometry(), [])
  const uciTexture = useMemo(() => createUciScreenTexture(), [])
  const glowAmber = useMemo(() => createSoftGlowTexture("rgba(245, 158, 11, 0.72)"), [])
  const glowCyan = useMemo(() => createSoftGlowTexture("rgba(34, 211, 238, 0.72)"), [])
  const slatsRef = useRef<THREE.InstancedMesh>(null)

  // Clean GPU resource disposal on unmount
  useEffect(() => {
    return () => {
      tableGeo.dispose()
      uciTexture.dispose()
      glowAmber.dispose()
      glowCyan.dispose()
    }
  }, [tableGeo, uciTexture, glowAmber, glowCyan])

  // Populate curved acoustic walnut slats behind host via 1 InstancedMesh draw call
  const slatCount = 24
  useEffect(() => {
    const mesh = slatsRef.current
    if (!mesh) return
    const dummy = new THREE.Object3D()
    for (let i = 0; i < slatCount; i++) {
      const t = (i / (slatCount - 1) - 0.5) * 1.45
      const radius = 2.65
      const x = Math.sin(t) * radius
      const z = -Math.cos(t) * radius + 0.35
      dummy.position.set(x, 1.08, z)
      dummy.rotation.set(0, -t, 0)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [])

  // Decide which camera owns PGM for current speaker
  const activeCam: 1 | 2 | 3 | "wide" =
    activeSpeaker === "host"
      ? 1
      : activeSpeaker === "guest1"
      ? 2
      : activeSpeaker === "guest2"
      ? 3
      : "wide"

  return (
    <>
      <ambientLight intensity={0.42} />
      <directionalLight position={[4, 7, 6]} intensity={2.1} color="#fff7ed" />
      <directionalLight position={[-5, 4, -2]} intensity={1.8} color="#38bdf8" />
      <pointLight position={[0, 2.2, 0.2]} intensity={3.2} distance={8} color="#fbbf24" decay={2} />

      {/* 100% procedural studio HDRI softboxes (cached frame 1 = zero per-frame GPU cost) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3.2} position={[0, 6, 2]} scale={[10, 3, 1]} rotation-x={Math.PI / 2} color="#fef3c7" />
        <Lightformer form="rect" intensity={2.6} position={[-6, 2, -2]} scale={[3, 7, 1]} rotation-y={Math.PI / 2} color="#22d3ee" />
        <Lightformer form="rect" intensity={2.6} position={[6, 2, -2]} scale={[3, 7, 1]} rotation-y={-Math.PI / 2} color="#f59e0b" />
        <Lightformer form="ring" intensity={1.8} position={[0, 3, 6]} scale={4} color="#ffffff" />
      </Environment>

      <group position={[0, -0.58, 0]}>
        {/* Acoustic Obsidian Studio Riser */}
        <mesh position={[0, -0.05, 0.05]}>
          <cylinderGeometry args={[3.25, 3.4, 0.1, 48]} />
          <meshStandardMaterial color="#0b0a10" metalness={0.45} roughness={0.62} />
        </mesh>
        {/* Warm Brass Architectural Trim Ring */}
        <mesh position={[0, 0.004, 0.05]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[3.24, 0.018, 12, 64]} />
          <meshStandardMaterial color="#f59e0b" emissive="#d97706" emissiveIntensity={0.45} metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Curved Acoustic Felt Backdrop */}
        <mesh position={[0, 1.08, 0.35]} rotation={[0, Math.PI - 0.78, 0]}>
          <cylinderGeometry args={[2.72, 2.72, 2.15, 36, 1, true, 0, 1.56]} />
          <meshStandardMaterial color="#08070c" roughness={0.92} side={THREE.DoubleSide} />
        </mesh>

        {/* Instanced Walnut Acoustic Slats (1 draw call) */}
        <instancedMesh ref={slatsRef} args={[undefined, undefined, slatCount]}>
          <boxGeometry args={[0.075, 2.08, 0.06]} />
          <meshStandardMaterial color="#58331c" roughness={0.55} metalness={0.18} />
        </instancedMesh>

        {/* Studio ON AIR Glowing Strip */}
        <mesh position={[0, 1.88, -2.18]}>
          <boxGeometry args={[1.05, 0.11, 0.04]} />
          <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={1.65} />
        </mesh>

        {/* Sculpted Podcast Studio Table */}
        <mesh geometry={tableGeo} position={[0, 0.68, -0.05]}>
          <meshStandardMaterial color="#14131c" metalness={0.35} roughness={0.38} />
        </mesh>
        {/* Table Structural Pedestal Base */}
        <mesh position={[0, 0.32, -0.05]}>
          <cylinderGeometry args={[0.42, 0.56, 0.62, 24]} />
          <meshStandardMaterial color="#0f0e14" metalness={0.65} roughness={0.42} />
        </mesh>

        {/* Q-SYS One-Touch UCI Desk Controller */}
        <group position={[0, 0.72, -0.35]} rotation={[-0.48, 0, 0]}>
          <mesh>
            <boxGeometry args={[0.52, 0.035, 0.34]} />
            <meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.47, 0.29]} />
            <meshBasicMaterial map={uciTexture} />
          </mesh>
        </group>

        {/* 3 Speaker Stations */}
        <SpeakerStation3D
          position={STATION_POS.host}
          yaw={0}
          isSpeaking={activeSpeaker === "host" || activeSpeaker === "wide"}
          accentColor="#f59e0b"
          glowTexture={glowAmber}
          phaseOffset={0}
        />
        <SpeakerStation3D
          position={STATION_POS.guest1}
          yaw={2.18}
          isSpeaking={activeSpeaker === "guest1" || activeSpeaker === "wide"}
          accentColor="#22d3ee"
          glowTexture={glowCyan}
          phaseOffset={1.7}
        />
        <SpeakerStation3D
          position={STATION_POS.guest2}
          yaw={-2.18}
          isSpeaking={activeSpeaker === "guest2" || activeSpeaker === "wide"}
          accentColor="#38bdf8"
          glowTexture={glowCyan}
          phaseOffset={3.1}
        />

        {/* 3 Motorized 4K PTZ Cameras */}
        <PTZCamera3D
          label="CAM 01"
          position={[0.05, 1.55, 2.38]}
          targetPoint={activeSpeaker === "wide" ? TARGET_LOOK_AT.wide : TARGET_LOOK_AT.host}
          isActivePGM={activeCam === 1 || activeCam === "wide"}
          isWideBeam={activeCam === "wide"}
        />
        <PTZCamera3D
          label="CAM 02"
          position={[1.95, 1.48, -0.95]}
          targetPoint={TARGET_LOOK_AT.guest1}
          isActivePGM={activeCam === 2}
        />
        <PTZCamera3D
          label="CAM 03"
          position={[-1.95, 1.48, -0.95]}
          targetPoint={TARGET_LOOK_AT.guest2}
          isActivePGM={activeCam === 3}
        />

        {/* Q-SYS Telemetry Audio Meter Tower */}
        <QSysVuColumn3D activeSpeaker={activeSpeaker} />

        {/* Static Baked Contact Shadows = 60 FPS on all devices */}
        <ContactShadows frames={1} position={[0, 0.005, 0]} opacity={0.62} scale={10} blur={2.4} far={3.5} resolution={256} />
      </group>

      {!isCoarse && (
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.07}
          minPolarAngle={Math.PI / 5.5}
          maxPolarAngle={Math.PI / 2.25}
          minAzimuthAngle={-Math.PI / 2.6}
          maxAzimuthAngle={Math.PI / 2.6}
        />
      )}
    </>
  )
}

// Low-tier / Headless SVG fallback preserving full studio interactivity
function StudioBlueprintFallback({ activeSpeaker }: { activeSpeaker: SpeakerTarget }) {
  return (
    <svg viewBox="0 0 640 360" className="w-full h-full select-none" aria-label="Diagrama esquemático do estúdio autônomo">
      <defs>
        <radialGradient id="podFallbackGlow" cx="50%" cy="48%" r="50%">
          <stop offset="0%" stopColor="rgba(245,158,11,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <rect width="640" height="360" fill="#07060b" />
      <circle cx="320" cy="180" r="145" fill="url(#podFallbackGlow)" stroke="rgba(245,158,11,0.28)" strokeWidth="1" />
      {/* Table */}
      <path d="M 210 155 Q 320 95 430 155 Q 455 215 390 235 Q 320 250 250 235 Q 185 215 210 155 Z" fill="#14131d" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
      {/* Host node */}
      <circle cx="320" cy="96" r="22" fill={activeSpeaker === "host" || activeSpeaker === "wide" ? "rgba(245,158,11,0.24)" : "#151520"} stroke={activeSpeaker === "host" || activeSpeaker === "wide" ? "#f59e0b" : "rgba(255,255,255,0.2)"} strokeWidth="2" />
      <text x="320" y="100" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">HOST</text>
      {/* Guest 1 */}
      <circle cx="195" cy="216" r="22" fill={activeSpeaker === "guest1" || activeSpeaker === "wide" ? "rgba(34,211,238,0.24)" : "#151520"} stroke={activeSpeaker === "guest1" || activeSpeaker === "wide" ? "#22d3ee" : "rgba(255,255,255,0.2)"} strokeWidth="2" />
      <text x="195" y="220" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">C-01</text>
      {/* Guest 2 */}
      <circle cx="445" cy="216" r="22" fill={activeSpeaker === "guest2" || activeSpeaker === "wide" ? "rgba(56,189,248,0.24)" : "#151520"} stroke={activeSpeaker === "guest2" || activeSpeaker === "wide" ? "#38bdf8" : "rgba(255,255,255,0.2)"} strokeWidth="2" />
      <text x="445" y="220" textAnchor="middle" fill="#fff" fontSize="10" fontFamily="monospace">C-02</text>
      {/* Q-SYS Core badge */}
      <rect x="278" y="162" width="84" height="32" rx="6" fill="#0d111a" stroke="rgba(34,211,238,0.45)" />
      <text x="320" y="182" textAnchor="middle" fill="#67e8f9" fontSize="10" fontFamily="monospace">Q-SYS CORE</text>
    </svg>
  )
}

export const PodcastStudio3D = memo(function PodcastStudio3D() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, "150px")
  const perfTier = useMemo(() => getPerfTier(), [])
  const isCoarse = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  )
  const isHeadless = useMemo(
    () => typeof navigator !== "undefined" && /HeadlessChrome|Prerender|ReactSnap/i.test(navigator.userAgent),
    []
  )

  const [activeSpeaker, setActiveSpeaker] = useState<SpeakerTarget>("host")
  const [autoCycle, setAutoCycle] = useState(true)
  const [outputFormat, setOutputFormat] = useState<OutputAspect>("9:16")
  const [wordStep, setWordStep] = useState(0)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [mobile3DEnabled, setMobile3DEnabled] = useState(false)
  const showWebGL = !isHeadless && perfTier !== "low" && (!isCoarse || mobile3DEnabled)

  const activeMeta = SPEAKER_META[activeSpeaker]

  // Auto-cycle speakers when Auto-Corte is enabled
  useEffect(() => {
    if (!autoCycle) return
    const timer = window.setInterval(() => {
      setActiveSpeaker((prev) => {
        const idx = AUTO_SEQUENCE.indexOf(prev)
        return AUTO_SEQUENCE[(idx + 1) % AUTO_SEQUENCE.length]
      })
    }, 4400)
    return () => window.clearInterval(timer)
  }, [autoCycle])

  // Real-time karaoke dynamic caption word highlight
  useEffect(() => {
    setWordStep(0)
    const timer = window.setInterval(() => {
      setWordStep((prev) => (prev + 1) % activeMeta.quoteWords.length)
    }, 520)
    return () => window.clearInterval(timer)
  }, [activeSpeaker, activeMeta.quoteWords.length])

  const handleSelectSpeaker = (target: SpeakerTarget) => {
    setAutoCycle(false)
    setHasInteracted(true)
    setActiveSpeaker(target)
    trackCustomizeProduct("Podcast_Studio_3D", `speaker_${target}`)
  }

  const handleToggleFormat = (fmt: OutputAspect) => {
    setOutputFormat(fmt)
    setHasInteracted(true)
    trackCustomizeProduct("Podcast_Studio_3D", `format_${fmt}`)
  }

  return (
    <div
      ref={wrapRef}
      className="relative w-full rounded-[2rem] border border-white/[0.09] bg-[#07060b]/90 shadow-[0_32px_90px_-24px_rgba(0,0,0,0.95)] overflow-hidden"
    >
      {/* Top Broadcast Tally & Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 sm:px-6 py-3 sm:py-3.5 border-b border-white/[0.08] bg-black/50">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/35 text-[10px] sm:text-[11px] font-mono font-bold tracking-wider text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 pod-tally-dot" />
            PGM ON AIR
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
            <Camera className="w-3.5 h-3.5 text-amber-400" />
            {activeMeta.camLabel}
          </span>
          <span className="hidden md:inline-block text-[11px] font-mono text-zinc-500">
            • {activeMeta.lensLabel}
          </span>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10">
            <span className="pod-eq" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
              <i />
            </span>
            <span className="text-[10px] font-mono text-amber-300">{activeMeta.micChannel}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              const next = !autoCycle
              setAutoCycle(next)
              trackCustomizeProduct("Podcast_Studio_3D", next ? "auto_corte_on" : "auto_corte_off")
            }}
            data-active={autoCycle}
            title={autoCycle ? "Clique para pausar o corte automático" : "Clique para retomar o corte automático"}
            className={`pod-btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10.5px] sm:text-[11px] font-mono font-bold ${
              autoCycle ? "text-amber-200" : "text-zinc-200"
            }`}
          >
            {autoCycle ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            {autoCycle ? (
              <>
                <span className="sm:hidden">Auto-Corte ON</span>
                <span className="hidden sm:inline">Auto-Corte: rodando • clique p/ pausar</span>
              </>
            ) : (
              <>
                <span className="sm:hidden">Auto-Corte OFF</span>
                <span className="hidden sm:inline">Auto-Corte: pausado • clique p/ retomar</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Stage: On Mobile -> 3D (order-1) + Speaker Controls (order-2) + Output Monitor (order-3) */}
      <div className="grid grid-cols-1 xl:grid-cols-12">
        {/* 1. Real-Time Interactive 3D WebGL Studio */}
        <div className="order-1 xl:col-span-8 relative h-[235px] sm:h-[370px] xl:h-[440px] bg-gradient-to-b from-[#0d0b14] via-[#08070c] to-[#060509] border-b xl:border-b-0 xl:border-r border-white/[0.07]">
          {/* Subtle Ambient Backlight */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.09)_0%,transparent_65%)]" />

          {!showWebGL ? (
            <StudioBlueprintFallback activeSpeaker={activeSpeaker} />
          ) : (
            <Canvas
              dpr={isCoarse ? [1, 1.25] : [1, 1.5]}
              frameloop={inView ? "always" : "never"}
              camera={{ position: isCoarse ? [0, 4.1, 6.9] : [0, 3.65, 5.8], fov: isCoarse ? 50 : 38 }}
              gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
              style={{ touchAction: "pan-y" }}
            >
              <StudioScene3D activeSpeaker={activeSpeaker} isCoarse={isCoarse} />
            </Canvas>
          )}

          {isCoarse && perfTier !== "low" && !isHeadless && !mobile3DEnabled && (
            <button
              type="button"
              onClick={() => setMobile3DEnabled(true)}
              className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 hover:bg-black border border-amber-400/35 text-[10px] font-mono text-amber-200 transition-colors cursor-pointer"
            >
              <Rotate3D className="w-3 h-3 text-amber-400" />
              Ativar 3D Interativo
            </button>
          )}

          {/* Dica de primeira interação (some após o primeiro clique) */}
          {!hasInteracted && (
            <div className="pointer-events-none absolute top-3 left-3 sm:top-3.5 sm:left-4 z-10 inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-400 text-slate-950 text-[10.5px] sm:text-[11px] font-bold shadow-[0_8px_24px_-6px_rgba(245,158,11,0.7)]">
              <span className="w-2 h-2 rounded-full bg-slate-950 pod-tally-dot" />
              Toque em quem fala ↓
            </div>
          )}

          {/* Mobile Active Camera Telemetry Badge (visible on <sm where top bar hides it) */}
          <div className="sm:hidden pointer-events-none absolute bottom-2.5 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/70 border border-amber-400/30 text-[10px] font-mono text-amber-200">
            <Camera className="w-3 h-3 text-amber-400 shrink-0" />
            <span>{activeMeta.camLabel.split("•")[0]?.trim()}</span>
          </div>

          {/* Orbit Cue & Speaker Pill Overlay */}
          {!isCoarse && showWebGL && (
            <div className="pointer-events-none absolute top-3.5 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400">
              <Rotate3D className="w-3.5 h-3.5 text-amber-400" />
              Arraste para girar 3D
            </div>
          )}

          {/* Bottom-Left Active Q-SYS Status Pill */}
          <div className="pointer-events-none absolute bottom-2.5 left-3 sm:bottom-3.5 sm:left-4 flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
            <Mic className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400 shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-200">
              Q-SYS <span className="hidden sm:inline">Automix </span>
              <span className="text-emerald-400">● ATIVO</span>
            </span>
          </div>
        </div>

        {/* 2 (Mobile) / 3 (Desktop): Interactive Speaker & Camera Cut Switcher */}
        <div className="order-2 xl:order-3 xl:col-span-12 px-3.5 sm:px-6 py-3.5 sm:py-5 bg-gradient-to-b from-[#120f1c] to-[#0a0810] border-b xl:border-b-0 xl:border-t border-amber-400/25 shadow-[0_-18px_40px_-24px_rgba(245,158,11,0.35)] flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-2.5">
            <span className="pod-hint-dot shrink-0" />
            <div>
              <span className="block text-xs sm:text-sm font-bold text-white">Quem está falando agora?</span>
              <span className="block text-[11px] text-zinc-300 sm:text-zinc-400">
                <span className="xl:hidden">Toque abaixo: câmera 3D ↑ e corte legendado ↓ mudam na hora.</span>
                <span className="hidden xl:inline">
                  Clique em um botão: a câmera corta sozinha e o corte social é gerado ao lado.
                </span>
              </span>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Selecionar microfone e corte de câmera no estúdio 3D"
            className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5"
          >
            {(["host", "guest1", "guest2", "wide"] as SpeakerTarget[]).map((id) => {
              const meta = SPEAKER_META[id]
              const selected = activeSpeaker === id
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => handleSelectSpeaker(id)}
                  data-active={selected}
                  className={`pod-btn relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-bold flex items-center justify-center gap-1.5 ${
                    selected ? "text-slate-950" : "text-zinc-100"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="pod-speaker-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-200 to-amber-400 shadow-[0_0_24px_rgba(245,158,11,0.5)]"
                    />
                  )}
                  {id === "wide" ? (
                    <Maximize2 className="w-3.5 h-3.5 relative z-10 shrink-0" />
                  ) : (
                    <Mic className="w-3.5 h-3.5 relative z-10 shrink-0" />
                  )}
                  <span className="relative z-10 truncate">{meta.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3 (Mobile) / 2 (Desktop): Dual-Format Autonomous Output Monitor (16:9 / 9:16) */}
        <div className="order-3 xl:order-2 xl:col-span-4 p-3.5 sm:p-5 bg-[#09080f] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="min-w-0">
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400">
                  Prévia de Saída
                </span>
                <span className="text-xs font-semibold text-white block truncate">Corte + Legenda Automática</span>
                <span className="block text-[10px] text-amber-300/90 mt-0.5">Alterne 16:9 ou 9:16 →</span>
              </div>

              {/* Format Switcher 16:9 <-> 9:16 */}
              <div className="inline-flex gap-1.5 p-1 rounded-xl bg-black/70 border border-white/15 shadow-[inset_0_2px_6px_rgba(0,0,0,0.7)] shrink-0">
                <button
                  type="button"
                  data-active={outputFormat === "16:9"}
                  onClick={() => handleToggleFormat("16:9")}
                  title="Ver como episódio horizontal (YouTube / LinkedIn)"
                  className={`pod-btn inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold ${
                    outputFormat === "16:9" ? "text-amber-100" : "text-zinc-300"
                  }`}
                >
                  <MonitorPlay className="w-3 h-3" />
                  16:9
                </button>
                <button
                  type="button"
                  data-active={outputFormat === "9:16"}
                  onClick={() => handleToggleFormat("9:16")}
                  title="Ver como corte vertical (Reels / TikTok / Shorts)"
                  className={`pod-btn inline-flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-mono font-bold ${
                    outputFormat === "9:16" ? "text-amber-100" : "text-zinc-300"
                  }`}
                >
                  <Smartphone className="w-3 h-3" />
                  9:16
                </button>
              </div>
            </div>

            {/* Morphing Output Monitor Frame */}
            <div className="h-[215px] sm:h-[270px] flex items-center justify-center rounded-2xl bg-black/75 border border-white/[0.08] p-2.5 sm:p-3 relative overflow-hidden">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className={`relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b from-[#171422] via-[#0e0d15] to-[#060609] flex flex-col justify-between ${
                  outputFormat === "9:16" ? "h-full aspect-[9/16]" : "w-full aspect-video"
                }`}
              >
                {/* Camera Top HUD & Brand Watermark */}
                <div className="relative z-10 flex items-center justify-between px-2.5 py-2 bg-gradient-to-b from-black/70 to-transparent">
                  <span className="text-[9px] font-mono font-bold tracking-wider uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-400/30">
                    SONUS EXEC CAST
                  </span>
                  <span className="text-[9px] font-mono text-zinc-300 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 pod-tally-dot" />
                    REC
                  </span>
                </div>

                {/* Framed Subject Simulation */}
                <div className="relative flex-1 flex items-center justify-center px-3">
                  {/* Subtle studio slats behind subject */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(90deg, rgba(245,158,11,0.22) 0px, rgba(245,158,11,0.22) 3px, transparent 3px, transparent 14px)",
                    }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeSpeaker}-${outputFormat}`}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.24 }}
                      className="relative z-10 flex flex-col items-center justify-center"
                    >
                      {activeSpeaker === "wide" ? (
                        <div className="flex items-end gap-2.5">
                          <div className="w-7 h-10 rounded-t-full bg-cyan-500/25 border border-cyan-400/40" />
                          <div className="w-9 h-12 rounded-t-full bg-amber-500/30 border border-amber-400/50" />
                          <div className="w-7 h-10 rounded-t-full bg-sky-500/25 border border-sky-400/40" />
                        </div>
                      ) : (
                        <div className="relative flex flex-col items-center">
                          {/* Automatic Facial Reframe Bounding Box when 9:16 is selected */}
                          {outputFormat === "9:16" && (
                            <div
                              className="absolute -inset-3 border border-dashed rounded-lg pointer-events-none"
                              style={{ borderColor: `${activeMeta.accentHex}88` }}
                            >
                              <span
                                className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[8px] font-mono px-1 rounded bg-black/80 whitespace-nowrap flex items-center gap-0.5"
                                style={{ color: activeMeta.accentHex }}
                              >
                                <ScanFace className="w-2.5 h-2.5" />
                                AUTO-ENQUADRAMENTO
                              </span>
                            </div>
                          )}
                          <div
                            className="w-9 h-9 rounded-full border-2 mb-1"
                            style={{
                              backgroundColor: `${activeMeta.subjectColor}33`,
                              borderColor: activeMeta.subjectColor,
                            }}
                          />
                          <div
                            className="w-16 h-8 rounded-t-2xl border-t border-x"
                            style={{
                              backgroundColor: `${activeMeta.subjectColor}22`,
                              borderColor: `${activeMeta.subjectColor}66`,
                            }}
                          />
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Dynamic Karaoke Brand Captions */}
                <div className="relative z-10 px-2.5 pb-2.5 pt-2 bg-gradient-to-t from-black/95 via-black/75 to-transparent text-center">
                  <div className="inline-flex flex-wrap justify-center gap-x-1 gap-y-0.5 leading-tight">
                    {activeMeta.quoteWords.map((word, idx) => {
                      const isCurrent = idx === wordStep
                      const isAccent = activeMeta.highlightWordIndices.includes(idx)
                      return (
                        <span
                          key={`${activeSpeaker}-${idx}`}
                          className={`text-[10px] sm:text-[11px] font-extrabold tracking-tight transition-colors duration-150 ${
                            isCurrent
                              ? "text-amber-300 scale-105"
                              : isAccent
                              ? "text-white"
                              : "text-zinc-300/85"
                          }`}
                        >
                          {word}
                        </span>
                      )
                    })}
                  </div>
                  <div className="mt-1 text-[8px] font-mono text-zinc-400 flex items-center justify-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    {outputFormat === "9:16" ? "Reels / TikTok / Shorts" : "YouTube / LinkedIn / Spotify"}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-white/[0.07] flex items-center justify-between text-[11px] text-zinc-300 sm:text-zinc-400">
            <span className="truncate">{activeMeta.role}</span>
            <span className="font-mono text-emerald-400 shrink-0">Silêncios Removidos ✓</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export default PodcastStudio3D
