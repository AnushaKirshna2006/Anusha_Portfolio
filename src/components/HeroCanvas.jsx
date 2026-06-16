import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroCanvas = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050505, 0.02);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 12;
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x00f2fe, 5, 50);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // 3. Create Geometry (TorusKnot for a complex, continuous technical shape)
    const geometry = new THREE.TorusKnotGeometry(4.5, 1.5, 128, 32);

    // 4. Create Material (Glassy / Metallic)
    const material = new THREE.MeshPhysicalMaterial({
      color: 0x050505,
      metalness: 0.9,
      roughness: 0.2,
      envMapIntensity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.8,
      wireframe: false,
      polygonOffset: true,
      polygonOffsetFactor: 1, 
      polygonOffsetUnits: 1
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Wireframe overlay for the extra cool tech look (Cyan accent)
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ color: 0x00f2fe, linewidth: 2, transparent: true, opacity: 0.3 });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    mesh.add(wireframe);

    // Inner glowing core (Cyan accent)
    const innerGeo = new THREE.TorusKnotGeometry(4.4, 1.4, 64, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.15 });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mesh.add(innerMesh);

    // 5. Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.002;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.002;
    };
    document.addEventListener('mousemove', onDocumentMouseMove);

    // 6. Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Base rotation
      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;
      
      innerMesh.rotation.y -= 0.003;
      innerMesh.rotation.x -= 0.002;

      // Mouse interactive rotation
      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;
      
      mesh.rotation.x += targetRotationX;
      mesh.rotation.y += targetRotationY;

      // Mouse interactive TRANSLATION (Shape moves with cursor)
      mesh.position.x += (mouseX * 15 - mesh.position.x) * 0.05;
      mesh.position.y += (-mouseY * 15 - mesh.position.y) * 0.05;

      // Camera parallax
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Handler
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      wireframeGeo.dispose();
      wireframeMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'absolute', 
        inset: 0, 
        zIndex: 0, 
        pointerEvents: 'none',
        opacity: 0.8,
        background: 'radial-gradient(circle at center, #1a1a1a 0%, var(--bg) 100%)'
      }} 
    />
  );
};

export default HeroCanvas;
