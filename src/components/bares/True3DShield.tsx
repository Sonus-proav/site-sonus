import { Suspense, useMemo, useRef, type ReactNode } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Lightformer, PresentationControls, Sparkles, Text } from "@react-three/drei"
import * as THREE from "three"
import { useInView } from "./useInView"

// Contorno clássico de escudo heráldico
function makeShieldShape() {
  const s = new THREE.Shape()
  s.moveTo(0, 1.5)
  s.bezierCurveTo(0.5, 1.2, 1.0, 1.15, 1.35, 1.2)
  s.lineTo(1.35, 0.2)
  s.bezierCurveTo(1.35, -0.7, 0.7, -1.2, 0, -1.6)
  s.bezierCurveTo(-0.7, -1.2, -1.35, -0.7, -1.35, 0.2)
  s.lineTo(-1.35, 1.2)
  s.bezierCurveTo(-1.0, 1.15, -0.5, 1.2, 0, 1.5)
  return s
}

function Shield() {
  const swing = useRef<THREE.Group>(null)
  const orbit = useRef<THREE.Group>(null)

  const geo = useMemo(() => {
    const g = new THREE.ExtrudeGeometry(makeShieldShape(), {
      depth: 0.22,
      bevelEnabled: true,
      bevelThickness: 0.07,
      bevelSize: 0.07,
      bevelSegments: 6,
      curveSegments: 40,
    })
    g.center()
    return g
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (swing.current) swing.current.rotation.y = Math.sin(t * 0.6) * 0.35
    if (orbit.current) orbit.current.rotation.z = t * 0.35
  })

  return (
    <group>
      <group ref={swing}>
        {/* Moldura de ouro */}
        <mesh geometry={geo}>
          <meshStandardMaterial color="#f2b84b" metalness={1} roughness={0.22} />
        </mesh>
        {/* Face azul esmaltada */}
        <mesh geometry={geo} scale={[0.86, 0.86, 1.25]}>
          <meshPhysicalMaterial color="#1e40af" metalness={0.5} roughness={0.18} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>

        {/* Check-mark em relevo */}
        <group position={[0, 0.45, 0.3]}>
          <mesh position={[-0.325, -0.225, 0]} rotation={[0, 0, Math.PI / 4]}>
            <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#9ec5ff" emissiveIntensity={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.2, -0.05, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <capsuleGeometry args={[0.1, 0.8, 8, 16]} />
            <meshStandardMaterial color="#ffffff" emissive="#9ec5ff" emissiveIntensity={0.7} roughness={0.3} />
          </mesh>
        </group>

        <Suspense fallback={null}>
          <Text
            position={[0, -0.78, 0.3]}
            fontSize={0.36}
            letterSpacing={0.06}
            color="#ffffff"
            outlineWidth={0.014}
            outlineColor="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            3 ANOS
          </Text>
        </Suspense>
      </group>

      {/* Órbita dourada com 3 esferas (uma por ano de garantia) */}
      <group rotation={[1.15, 0, 0]}>
        <group ref={orbit}>
          <mesh>
            <torusGeometry args={[2.35, 0.02, 12, 128]} />
            <meshStandardMaterial color="#f2b84b" metalness={1} roughness={0.25} />
          </mesh>
          {[0, 1, 2].map((i) => {
            const a = (i / 3) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(a) * 2.35, Math.sin(a) * 2.35, 0]}>
                <sphereGeometry args={[0.1, 24, 16]} />
                <meshStandardMaterial color="#ffd36b" emissive="#f2b84b" emissiveIntensity={1.4} toneMapped={false} />
              </mesh>
            )
          })}
        </group>
      </group>
    </group>
  )
}

function Scene({ interactive }: { interactive: boolean }) {
  const content: ReactNode = (
    <Float speed={1.6} rotationIntensity={0.08} floatIntensity={0.4}>
      <Shield />
    </Float>
  )

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 5, 7]} intensity={2.2} />
      <directionalLight position={[-6, 1, -3]} intensity={2.5} color="#3b82f6" />
      <directionalLight position={[6, -1, -3]} intensity={1.8} color="#ef4444" />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[0, 5, -4]} scale={[12, 4, 1]} color="#ffffff" />
        <Lightformer form="rect" intensity={3} position={[-6, 0, 3]} scale={[2, 7, 1]} rotation-y={Math.PI / 2} color="#60a5fa" />
        <Lightformer form="rect" intensity={2.5} position={[6, 0, 3]} scale={[2, 7, 1]} rotation-y={-Math.PI / 2} color="#fbbf24" />
        <Lightformer form="ring" intensity={2} position={[0, 1, 7]} scale={4} color="#ffffff" />
      </Environment>

      <Sparkles count={40} scale={[5.5, 5.5, 3]} size={2.5} speed={0.4} color="#93c5fd" />

      {interactive ? (
        <PresentationControls global snap speed={1.4} polar={[-0.3, 0.3]} azimuth={[-0.9, 0.9]}>
          {content}
        </PresentationControls>
      ) : (
        content
      )}
    </>
  )
}

export default function True3DShield({ tier, onReady }: { tier?: string, onReady?: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref)
  const coarse = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    [],
  )

  return (
    <div ref={ref} className="w-full h-full min-h-[260px]">
      <Canvas
        onCreated={() => { setTimeout(() => onReady && onReady(), 100); }}
        dpr={tier === "medium" ? 1 : [1, 1.75]}
        frameloop={inView ? "always" : "never"}
        camera={{ position: [0, 0, 8.5], fov: 35 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        style={{ touchAction: "pan-y" }}
      >
        <Scene interactive={!coarse} />
      </Canvas>
    </div>
  )
}
