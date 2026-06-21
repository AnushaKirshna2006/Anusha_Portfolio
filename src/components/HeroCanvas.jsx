import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedShape = () => {
  const meshRef = useRef();
  const innerRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      
      // Gentle mouse tracking
      meshRef.current.position.x += (state.pointer.x * 2 - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (state.pointer.y * 2 - meshRef.current.position.y) * 0.05;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -state.clock.getElapsedTime() * 0.2;
      innerRef.current.rotation.y = -state.clock.getElapsedTime() * 0.25;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <group>
        {/* Outer wireframe distorted sphere */}
        <Sphere ref={meshRef} args={[2.5, 64, 64]}>
          <MeshDistortMaterial
            color="#00f2fe"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0}
            metalness={1}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={true}
            transparent={true}
            opacity={0.6}
          />
        </Sphere>
        {/* Inner solid glowing sphere */}
        <Sphere ref={innerRef} args={[1.5, 32, 32]}>
          <meshStandardMaterial
            color="#4facfe"
            roughness={0.2}
            metalness={0.8}
            emissive="#00f2fe"
            emissiveIntensity={0.5}
          />
        </Sphere>
      </group>
    </Float>
  );
};

const HeroCanvas = () => {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(10, 15, 25, 0.5) 0%, var(--bg) 100%)' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00f2fe" />
        <AnimatedShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default HeroCanvas;
