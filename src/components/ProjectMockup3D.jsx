import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, ContactShadows, Image } from '@react-three/drei';
import * as THREE from 'three';

const PlaneMockup = ({ imgUrl }) => {
  const meshRef = useRef();
  
  // Slight constant rotation for life
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
      meshRef.current.rotation.z = Math.cos(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <Float rotationIntensity={0.2} floatIntensity={1} speed={2}>
      <mesh ref={meshRef}>
        <planeGeometry args={[3.2, 2]} />
        <meshStandardMaterial 
          color="#000" 
          roughness={0.1} 
          metalness={0.8}
          side={THREE.DoubleSide} 
        />
        {/* The screen image */}
        <Image 
          url={imgUrl} 
          transparent 
          opacity={0.95} 
          position={[0, 0, 0.01]} 
          scale={[3.15, 1.95]} 
        />
        {/* Glass overlay */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[3.2, 2]} />
          <meshPhysicalMaterial 
            transparent 
            opacity={0.1} 
            roughness={0.1} 
            transmission={1} 
            thickness={0.5} 
            color="#fff" 
          />
        </mesh>
      </mesh>
    </Float>
  );
};

const ProjectMockup3D = ({ imgUrl }) => {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, cursor: 'grab' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} intensity={2} angle={0.3} penumbra={1} color="#00f2fe" />
        
        <PresentationControls 
          global={false} 
          cursor={true} 
          snap={true} 
          speed={1.5} 
          zoom={1} 
          rotation={[0, 0, 0]} 
          polar={[-0.2, 0.2]} 
          azimuth={[-0.5, 0.5]}
        >
          <PlaneMockup imgUrl={imgUrl} />
        </PresentationControls>
        
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>
      
      {/* Interaction Hint Overlay */}
      <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', pointerEvents: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 9l4-4 4 4"/><path d="M5 15l4 4 4-4"/><path d="M9 5v14"/><path d="M19 9l-4-4-4 4"/><path d="M19 15l-4 4-4-4"/><path d="M15 5v14"/></svg>
        Drag to rotate 3D Mockup
      </div>
    </div>
  );
};

export default ProjectMockup3D;
