import { Suspense, useMemo, useRef, type ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  PresentationControls,
  RoundedBox,
  Text,
} from "@react-three/drei"
import * as THREE from "three"
import { useInView } from "./useInView"

// ─── Medidas do gabinete (unidades 3D) ───────────────────────────────────────
const FRONT = 1.57 // z da face frontal do baffle
const WOOFER_Y = -0.55
const HORN_Y = 1.6

// ─── Batida do grave (120 BPM) ───────────────────────────────────────────────
function beatAt(t: number) {
  return Math.pow(Math.max(0, Math.sin(t * Math.PI * 4)), 6)
}

// ─── Woofer: cone em perfil real (Lathe) que "bate" com o grave ──────────────
function Woofer() {
  const cone = useRef<THREE.Group>(null)

  const coneGeo = useMemo(() => {
    const profile = [
      [1.14, 0],
      [1.02, -0.03],
      [0.8, -0.1],
      [0.52, -0.22],
      [0.32, -0.31],
      [0.3, -0.31],
    ].map(([x, y]) => new THREE.Vector2(x, y))
    return new THREE.LatheGeometry(profile, 72)
  }, [])

  useFrame(({ clock }) => {
    if (cone.current) cone.current.position.z = beatAt(clock.getElapsedTime()) * 0.1
  })

  return (
    <group position={[0, WOOFER_Y, FRONT]}>
      <group ref={cone}>
        {/* Cone de fibra */}
        <mesh geometry={coneGeo} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#1b1e25" roughness={0.65} metalness={0.25} side={THREE.DoubleSide} />
        </mesh>
        {/* Anéis concêntricos do cone */}
        {[
          [0.88, -0.09],
          [0.64, -0.21],
          [0.44, -0.29],
        ].map(([r, z]) => (
          <mesh key={r} position={[0, 0, z]}>
            <torusGeometry args={[r, 0.012, 8, 96]} />
            <meshStandardMaterial color="#0a0b0e" roughness={0.9} />
          </mesh>
        ))}
        {/* Dust cap (cúpula central) */}
        <mesh position={[0, 0, -0.31]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.65, 1]}>
          <sphereGeometry args={[0.32, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#9aa4b5" metalness={1} roughness={0.28} />
        </mesh>
        {/* Borda de borracha (surround) */}
        <mesh>
          <torusGeometry args={[1.16, 0.075, 16, 96]} />
          <meshStandardMaterial color="#0b0c0f" roughness={0.95} />
        </mesh>
      </group>
      {/* Aro metálico do cesto + parafusos */}
      <mesh>
        <torusGeometry args={[1.25, 0.035, 12, 96]} />
        <meshStandardMaterial color="#c9d1de" metalness={1} roughness={0.25} />
      </mesh>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2 + Math.PI / 8
        return (
          <mesh key={i} position={[Math.cos(a) * 1.36, Math.sin(a) * 1.36, 0.01]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 0.03, 16]} />
            <meshStandardMaterial color="#d6dce8" metalness={1} roughness={0.2} />
          </mesh>
        )
      })}
    </group>
  )
}

// ─── Corneta de agudos (horn) ────────────────────────────────────────────────
function Horn() {
  const geo = useMemo(() => {
    const g = new THREE.CylinderGeometry(0.78, 0.3, 0.35, 4, 1, true)
    g.rotateY(Math.PI / 4)
    g.rotateX(Math.PI / 2)
    g.scale(2.36, 0.91, 1)
    g.translate(0, 0, -0.175)
    return g
  }, [])

  return (
    <group position={[0, HORN_Y, FRONT]}>
      <mesh geometry={geo}>
        <meshStandardMaterial color="#0e1014" metalness={0.7} roughness={0.35} side={THREE.DoubleSide} />
      </mesh>
      {/* Moldura prateada da boca da corneta */}
      <mesh position={[0, 0.52, 0.005]}>
        <boxGeometry args={[2.72, 0.05, 0.04]} />
        <meshStandardMaterial color="#c9d1de" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.52, 0.005]}>
        <boxGeometry args={[2.72, 0.05, 0.04]} />
        <meshStandardMaterial color="#c9d1de" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[-1.33, 0, 0.005]}>
        <boxGeometry args={[0.05, 1.04, 0.04]} />
        <meshStandardMaterial color="#c9d1de" metalness={1} roughness={0.22} />
      </mesh>
      <mesh position={[1.33, 0, 0.005]}>
        <boxGeometry args={[0.05, 1.04, 0.04]} />
        <meshStandardMaterial color="#c9d1de" metalness={1} roughness={0.22} />
      </mesh>
      {/* Driver de compressão dourado no fundo */}
      <mesh position={[0, 0, -0.3]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 32]} />
        <meshStandardMaterial color="#e0a93b" metalness={1} roughness={0.25} />
      </mesh>
    </group>
  )
}

// ─── Gabinete completo ───────────────────────────────────────────────────────
function Cabinet() {
  const baffle = useMemo(() => {
    const w = 3.0
    const h = 4.8
    const r = 0.14
    const s = new THREE.Shape()
    s.moveTo(-w / 2 + r, -h / 2)
    s.lineTo(w / 2 - r, -h / 2)
    s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r)
    s.lineTo(w / 2, h / 2 - r)
    s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2)
    s.lineTo(-w / 2 + r, h / 2)
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r)
    s.lineTo(-w / 2, -h / 2 + r)
    s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2)

    const wooferHole = new THREE.Path()
    wooferHole.absarc(0, WOOFER_Y, 1.22, 0, Math.PI * 2, true)
    s.holes.push(wooferHole)

    const hornHole = new THREE.Path()
    hornHole.moveTo(-1.3, HORN_Y - 0.5)
    hornHole.lineTo(-1.3, HORN_Y + 0.5)
    hornHole.lineTo(1.3, HORN_Y + 0.5)
    hornHole.lineTo(1.3, HORN_Y - 0.5)
    hornHole.closePath()
    s.holes.push(hornHole)

    return new THREE.ExtrudeGeometry(s, {
      depth: 0.35,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 48,
    })
  }, [])

  const corners: [number, number, number][] = []
  for (const x of [-1.6, 1.6]) for (const y of [-2.5, 2.5]) for (const z of [-1.2, 1.2]) corners.push([x, y, z])

  return (
    <group>
      {/* Corpo revestido (tolex preto) */}
      <RoundedBox args={[3.2, 5, 2.4]} radius={0.16} smoothness={4}>
        <meshStandardMaterial color="#17191e" roughness={0.85} metalness={0.1} />
      </RoundedBox>

      {/* Baffle frontal em metal grafite, com furos para woofer e corneta */}
      <mesh geometry={baffle} position={[0, 0, 1.2]}>
        <meshStandardMaterial color="#343944" roughness={0.42} metalness={0.45} />
      </mesh>

      {/* Cantoneiras metálicas */}
      {corners.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.17, 24, 16]} />
          <meshStandardMaterial color="#cfd6e2" metalness={1} roughness={0.22} />
        </mesh>
      ))}

      {/* Moldura neon azul (identidade Sonus) */}
      {[
        { p: [0, 2.28, FRONT - 0.01], s: [2.8, 0.025, 0.02] },
        { p: [0, -2.28, FRONT - 0.01], s: [2.8, 0.025, 0.02] },
        { p: [-1.4, 0, FRONT - 0.01], s: [0.025, 4.56, 0.02] },
        { p: [1.4, 0, FRONT - 0.01], s: [0.025, 4.56, 0.02] },
      ].map((b, i) => (
        <mesh key={i} position={b.p as [number, number, number]}>
          <boxGeometry args={b.s as [number, number, number]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2.2} toneMapped={false} />
        </mesh>
      ))}

      <Horn />
      <Woofer />

      {/* Logo */}
      <Suspense fallback={null}>
        <Text
          position={[0, -2.03, FRONT]}
          fontSize={0.2}
          letterSpacing={0.35}
          color="#d7deea"
          anchorX="center"
          anchorY="middle"
        >
          SONUS
        </Text>
      </Suspense>

      {/* LED de limiter (verde = operando) */}
      <mesh position={[1.15, -2.03, FRONT]}>
        <circleGeometry args={[0.045, 24]} />
        <meshBasicMaterial color="#22c55e" toneMapped={false} />
      </mesh>
      <mesh position={[1.28, -2.03, FRONT]}>
        <circleGeometry args={[0.045, 24]} />
        <meshBasicMaterial color="#ef4444" transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  )
}

// ─── Ondas sonoras saindo do woofer ──────────────────────────────────────────
function SoundRing({ offset }: { offset: number }) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const m = ref.current
    if (!m) return
    const p = (clock.getElapsedTime() * 0.5 + offset) % 1
    m.position.z = 0.1 + p * 2.2
    m.scale.setScalar(0.7 + p * 0.9)
    ;(m.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.55
  })

  return (
    <mesh ref={ref}>
      <torusGeometry args={[1, 0.014, 8, 96]} />
      <meshBasicMaterial
        color="#60a5fa"
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  )
}

// ─── Luz azul que pulsa junto com o grave ────────────────────────────────────
function BassLight() {
  const ref = useRef<THREE.PointLight>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.intensity = 6 + beatAt(clock.getElapsedTime()) * 40
  })
  return <pointLight ref={ref} position={[0, WOOFER_Y, 3.4]} color="#3b82f6" distance={9} decay={2} />
}

// ─── Etiquetas explicativas (somente desktop) ────────────────────────────────
function Tag({ children, color }: { children: ReactNode; color: string }) {
  return (
    <div className="hidden md:flex -translate-y-1/2 items-center gap-2 whitespace-nowrap pointer-events-none select-none">
      <span className="w-6 h-px bg-white/40" />
      <span className="px-3 py-1.5 rounded-full bg-black/70 border border-white/15 text-[11px] font-semibold text-white tracking-wide flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        {children}
      </span>
    </div>
  )
}

function SwayGroup({ children }: { children: ReactNode }) {
  const g = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    if (g.current) g.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.45) * 0.18
  })
  return <group ref={g}>{children}</group>
}

function Scene({ interactive }: { interactive: boolean }) {
  const speaker = (
    <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.35}>
      <SwayGroup>
        <Cabinet />
        <group position={[0, WOOFER_Y, FRONT]}>
          {[0, 0.34, 0.67].map((o) => (
            <SoundRing key={o} offset={o} />
          ))}
        </group>
        <Html position={[2.3, HORN_Y, 1.7]} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <Tag color="#fbbf24">Corneta de agudos</Tag>
        </Html>
        <Html position={[2.3, WOOFER_Y, 1.7]} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <Tag color="#3b82f6">Woofer 15&quot; de graves</Tag>
        </Html>
        <Html position={[2.3, -1.85, 1.7]} style={{ pointerEvents: "none" }} zIndexRange={[20, 0]}>
          <Tag color="#22c55e">DSP limitando em 105 dB</Tag>
        </Html>
      </SwayGroup>
    </Float>
  )

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 6, 8]} intensity={2.4} />
      <directionalLight position={[-6, 2, -3]} intensity={3} color="#3b82f6" />
      <directionalLight position={[6, 0, -4]} intensity={2.4} color="#ec4899" />
      <BassLight />

      {/* Ambiente de estúdio 100% procedural (sem baixar HDR da internet) */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, -5]} scale={[12, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[-6, 1, 2]} scale={[2, 7, 1]} rotation-y={Math.PI / 2} color="#3b82f6" />
        <Lightformer form="rect" intensity={3} position={[6, 1, 2]} scale={[2, 7, 1]} rotation-y={-Math.PI / 2} color="#ec4899" />
        <Lightformer form="ring" intensity={2} position={[0, 2, 7]} scale={4} color="#ffffff" />
      </Environment>

      {interactive ? (
        <PresentationControls
          global
          snap
          speed={1.4}
          rotation={[0.04, -0.45, 0]}
          polar={[-0.25, 0.25]}
          azimuth={[-1.1, 0.7]}
        >
          {speaker}
        </PresentationControls>
      ) : (
        <group rotation={[0.04, -0.45, 0]}>{speaker}</group>
      )}

      {/* Brilho no chão + sombra de contato (fixos) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.62, 0]}>
        <circleGeometry args={[3.6, 64]} />
        <meshBasicMaterial color="#2563eb" transparent opacity={0.12} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <ContactShadows position={[0, -2.6, 0]} opacity={0.65} scale={14} blur={2.6} far={4} resolution={256} />
    </>
  )
}

export default function True3DSpeaker({ tier, onReady }: { tier?: string, onReady?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  // Em telas touch o 3D não captura o gesto: o scroll da página nunca trava.
  const coarse = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    [],
  )

  return (
    <div ref={ref} className="relative w-full h-full min-h-[420px]">
      <Canvas
        onCreated={() => { setTimeout(() => onReady && onReady(), 100); }}
        dpr={tier === "medium" ? 1 : [1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0.4, 11], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Scene interactive={!coarse} />
      </Canvas>
      {!coarse && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 pointer-events-none">
          Arraste para girar
        </div>
      )}
    </div>
  )
}
