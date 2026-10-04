import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, PresentationControls, ContactShadows, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

// The inner glowing DSP Chip
function DspChip() {
  const chipRef = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (chipRef.current) {
      // Pulsating glow effect
      const time = state.clock.getElapsedTime();
      (chipRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(time * 4) * 0.5
    }
  })

  return (
    <mesh ref={chipRef} position={[0, 0, 0]}>
      <boxGeometry args={[1.2, 1.2, 0.2]} />
      <meshStandardMaterial 
        color="#1e1e1e" 
        emissive="#3b82f6" 
        emissiveIntensity={2} 
        roughness={0.8}
        metalness={0.8}
      />
      {/* Golden pins on the chip */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.15]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.15]} />
        <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.2} />
      </mesh>
    </mesh>
  )
}

// The outer glass shield
function GlassShield() {
  const shieldRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (shieldRef.current) {
      // Slow elegant rotation
      shieldRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3
      shieldRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.3) * 0.1
    }
  })

  return (
    <group ref={shieldRef}>
      {/* Outer Hexagon Glass */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.5, 2.5, 0.6, 6]} />
        <MeshTransmissionMaterial 
          thickness={1.5}
          roughness={0.1}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.1}
          backside
          color="#a5b4fc"
        />
      </mesh>
      
      {/* The inner core */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <DspChip />
      </group>
      
      {/* Outer Protective Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.2, 0.05, 16, 6]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -0.3]}>
        <torusGeometry args={[3.5, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
}

export default function True3DShield() {
  return (
    <div className="w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <PresentationControls
          global
          
          
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <GlassShield />
          </Float>
        </PresentationControls>

        <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}
