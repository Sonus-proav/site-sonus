import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// The Subwoofer Cone that bumps to the bass!
function SubwooferCone({ position, size = 1 }: { position: [number, number, number], size?: number }) {
  const coneRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (coneRef.current) {
      // Thumping animation! Simulated bass bump
      const time = state.clock.getElapsedTime()
      // Fast bump on every beat (e.g. 120bpm = 2 beats per second)
      const bump = Math.max(0, Math.sin(time * Math.PI * 4)) * Math.pow(Math.sin(time * Math.PI * 4), 8)
      coneRef.current.position.z = position[2] + bump * 0.2
    }
  })

  return (
    <group ref={coneRef} position={position}>
      {/* Outer rubber edge */}
      <mesh>
        <torusGeometry args={[1.2 * size, 0.1 * size, 16, 64]} />
        <meshStandardMaterial color="#111" roughness={0.9} />
      </mesh>
      {/* The paper/kevlar cone */}
      <mesh position={[0, 0, -0.2 * size]}>
        <cylinderGeometry args={[1.1 * size, 0.4 * size, 0.4 * size, 64]} />
        <meshStandardMaterial color="#222" roughness={0.7} metalness={0.2} />
      </mesh>
      {/* The dust cap (center dome) */}
      <mesh position={[0, 0, -0.4 * size]}>
        <sphereGeometry args={[0.5 * size, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#111" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  )
}

function ProfessionalSpeaker() {
  const groupRef = useRef<THREE.Group>(null)

  return (
    <group ref={groupRef}>
      {/* Main Wooden Cabinet */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[3.5, 6, 3]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Cabinet Bevels / Protection Grille (visual simulation) */}
      <mesh position={[0, 0, 1.51]}>
        <planeGeometry args={[3.3, 5.8]} />
        <meshStandardMaterial color="#050505" roughness={0.8} metalness={0.8} wireframe />
      </mesh>

      {/* Dual Subwoofers */}
      <SubwooferCone position={[0, -1.2, 1.5]} size={1} />
      <SubwooferCone position={[0, 1.2, 1.5]} size={1} />
      
      {/* Top Horn Tweeter */}
      <mesh position={[0, 2.2, 1.4]}>
        <boxGeometry args={[2, 0.8, 0.5]} />
        <meshStandardMaterial color="#111" roughness={0.8} />
      </mesh>

      {/* DSP Glowing Status LED */}
      <mesh position={[1.4, -2.7, 1.51]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#3b82f6" />
      </mesh>
      {/* Limit/Clip LED (off) */}
      <mesh position={[1.2, -2.7, 1.51]}>
        <circleGeometry args={[0.05, 16]} />
        <meshBasicMaterial color="#ef4444" opacity={0.2} transparent />
      </mesh>
    </group>
  )
}

export default function True3DSpeaker() {
  return (
    <div className="w-full h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [5, 2, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={2} color="#4f46e5" />
        <pointLight position={[10, -5, 5]} intensity={2} color="#ec4899" />
        
        <PresentationControls
          global
          
          
          rotation={[0, -0.4, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 2, Math.PI / 2]}
        >
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <ProfessionalSpeaker />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -4, 0]} opacity={0.7} scale={20} blur={2.5} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
