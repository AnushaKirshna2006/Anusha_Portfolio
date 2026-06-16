import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { motion, AnimatePresence } from 'framer-motion';

const Avatar3D = () => {
  const mountRef = useRef(null);
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  
  // Mouse tracking state
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse for rotation
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    const scene = new THREE.Scene();
    
    // Transparent background
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(150, 150);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const dirLight = new THREE.DirectionalLight(0x00f0ff, 2);
    dirLight.position.set(2, 2, 5);
    scene.add(dirLight);
    
    const fillLight = new THREE.DirectionalLight(0x7b2cbf, 2);
    fillLight.position.set(-2, -2, 2);
    scene.add(fillLight);

    let avatarModel = null;
    let fallbackMesh = null;

    // Try to load a custom GLB
    const loader = new GLTFLoader();
    loader.load(
      '/assets/avatar.glb',
      (gltf) => {
        avatarModel = gltf.scene;
        // Center and scale avatar
        const box = new THREE.Box3().setFromObject(avatarModel);
        const center = box.getCenter(new THREE.Vector3());
        avatarModel.position.sub(center);
        
        // Scale to fit nicely
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDim;
        avatarModel.scale.set(scale, scale, scale);

        scene.add(avatarModel);
      },
      undefined,
      (error) => {
        // Fallback: Cyber-Crystal Geometry
        const geometry = new THREE.IcosahedronGeometry(1.2, 1);
        geometry.scale(1, 1.3, 1);

        const material = new THREE.MeshStandardMaterial({
          color: 0x111111,
          wireframe: true,
          emissive: 0x00f0ff, // Cyan emissive
          emissiveIntensity: 0.8,
          transparent: true,
          opacity: 0.9
        });

        fallbackMesh = new THREE.Mesh(geometry, material);
        scene.add(fallbackMesh);
      }
    );

    let clock = new THREE.Clock();
    let animationFrameId;

    // Target rotation for smooth interpolation
    let targetRotationX = 0;
    let targetRotationY = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      const activeMesh = avatarModel || fallbackMesh;
      if (activeMesh) {
        // Calculate target rotation based on mouse
        targetRotationY = mouse.current.x * 0.8;
        targetRotationX = -mouse.current.y * 0.5;

        // Smoothly interpolate to target rotation (Lerp)
        activeMesh.rotation.y += (targetRotationY - activeMesh.rotation.y) * 0.1;
        activeMesh.rotation.x += (targetRotationX - activeMesh.rotation.x) * 0.1;

        // Add a gentle floating motion on top
        activeMesh.position.y = Math.sin(time * 2) * 0.1;
        
        if (fallbackMesh) {
           fallbackMesh.material.emissiveIntensity = 0.5 + Math.sin(time * 3) * 0.3;
           fallbackMesh.rotation.z += 0.005; // Slow spin
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    setMessage(message ? "" : "Welcome to my portfolio.");
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', pointerEvents: 'none' }}>
      
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{
              padding: '0.8rem 1.2rem',
              borderRadius: '12px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              maxWidth: '250px',
              position: 'relative'
            }}
          >
            {message}
            <div style={{ position: 'absolute', bottom: '-8px', right: '60px', width: '15px', height: '15px', background: 'var(--glass-bg)', borderBottom: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)', transform: 'rotate(45deg)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div 
        ref={mountRef} 
        style={{ 
          width: '150px', 
          height: '150px', 
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--accent-transparent) 0%, transparent 70%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'auto',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      />
    </div>
  );
};

export default Avatar3D;
