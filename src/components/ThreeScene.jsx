'use client'

import { useRef, useEffect, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Sphere,
  MeshDistortMaterial,
  OrbitControls,
  Stars,
  Sparkles as ThreeSparkles,
  Float,
  TorusKnot,
  Environment
} from '@react-three/drei'
import * as THREE from 'three'

// Sun Component
function Sun() {
  const sunRef = useRef()
  
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002
    }
  })
  
  return (
    <group position={[0, 0, 0]}>
      <Sphere ref={sunRef} args={[1.5, 128, 128]}>
        <MeshDistortMaterial
          color="#f59e0b"
          emissive="#f97316"
          emissiveIntensity={2.5}
          metalness={0.9}
          roughness={0.1}
          distort={0.2}
          speed={1}
        />
      </Sphere>

      {/* Glow layer */}
      <Sphere args={[1.8, 32, 32]}>
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Lights */}
      <pointLight intensity={2.5} distance={30} color="#f97316" />
      <pointLight intensity={1.5} distance={50} color="#f59e0b" />
    </group>
  )
}

// Planet Component
function Planet({ size, color, distance, speed, hasRing = false, ringColor = "#8b5cf6" }) {
  const planetRef = useRef()
  const orbitRef = useRef()
  const angle = useRef(0)

  useEffect(() => {
    angle.current = Math.random() * Math.PI * 2
  }, [])
  
  useFrame(() => {
    if (planetRef.current) {
      angle.current += speed * 0.005
      const x = Math.cos(angle.current) * distance
      const z = Math.sin(angle.current) * distance

      planetRef.current.position.set(x, 0, z)
      planetRef.current.rotation.y += 0.01
    }
  })
  
  return (
    <group ref={orbitRef}>
      <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
        <Sphere ref={planetRef} args={[size, 64, 64]}>
          <MeshDistortMaterial
            color={color}
            metalness={0.6}
            roughness={0.4}
            distort={0.1}
            speed={0.5}
          />
        </Sphere>

        {hasRing && (
          <TorusKnot
            args={[size * 1.3, size * 0.2, 64, 32, 2, 3]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color={ringColor}
              emissive={ringColor}
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </TorusKnot>
        )}
      </Float>
    </group>
  )
}

// Main Scene
function ThreeScene() {
  const rendererRef = useRef(null)

  useEffect(() => {
    return () => {
      const gl = rendererRef.current
      if (gl) {
        gl.forceContextLoss?.()
        gl.dispose?.()
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 -z-5 w-full h-full">
      <Canvas
        onCreated={({ gl }) => {
          rendererRef.current = gl
        }}
        camera={{ position: [0, 2, 12], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <pointLight position={[-5, 5, 8]} color="#8b5cf6" />
        <pointLight position={[5, -3, 7]} color="#06b6d4" />

        {/* Stars */}
        <Stars radius={200} depth={100} count={8000} factor={6} fade />

        {/* Environment */}
        <Environment preset="night" />

        {/* Sun */}
        <Sun />

        {/* Planets */}
        <Planet size={0.2} color="#a1a1aa" distance={2.5} speed={1.8} />
        <Planet size={0.25} color="#fcd34d" distance={3.2} speed={1.4} />
        <Planet size={0.28} color="#3b82f6" distance={4.0} speed={1.2} />
        <Planet size={0.24} color="#ef4444" distance={4.8} speed={1.0} />
        <Planet size={0.6} color="#d97706" distance={6.0} speed={0.7} />
        <Planet size={0.55} color="#fbbf24" distance={7.2} speed={0.6} hasRing ringColor="#d4d4d8" />
        <Planet size={0.45} color="#67e8f9" distance={8.5} speed={0.5} />
        <Planet size={0.44} color="#3b82f6" distance={9.8} speed={0.4} />

        {/* Sparkles */}
        <ThreeSparkles count={400} scale={[10, 10, 10]} />

        {/* Controls */}
        <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}

export default memo(ThreeScene)