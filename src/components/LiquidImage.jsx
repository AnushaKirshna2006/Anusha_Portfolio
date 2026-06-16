import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const LiquidImage = ({ src }) => {
  const mountRef = useRef(null);
  const hoverState = useRef(0);
  const targetHoverState = useRef(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -2, width / 2, height / 2, height / -2, 1, 1000
    );
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(src, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(width, height, 32, 32);

      const vertexShader = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `;

      const fragmentShader = `
        uniform sampler2D tDiffuse;
        uniform float uHoverState;
        uniform float uTime;
        varying vec2 vUv;
        
        void main() {
          vec2 p = vUv;
          
          // Liquid ripple distortion based on time and hover state
          float x = uHoverState * 0.05 * sin(p.y * 20.0 + uTime);
          float y = uHoverState * 0.05 * sin(p.x * 20.0 + uTime);
          
          vec4 color = texture2D(tDiffuse, p + vec2(x, y));
          gl_FragColor = color;
        }
      `;

      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          tDiffuse: { value: texture },
          uHoverState: { value: 0 },
          uTime: { value: 0 }
        },
        transparent: true
      });

      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      setIsReady(true);

      let animationId;
      let time = 0;

      const animate = () => {
        time += 0.05;
        // Lerp hover state for smooth transition
        hoverState.current += (targetHoverState.current - hoverState.current) * 0.08;
        
        material.uniforms.uHoverState.value = hoverState.current;
        material.uniforms.uTime.value = time;
        
        renderer.render(scene, camera);
        animationId = requestAnimationFrame(animate);
      };

      animate();

      const handleResize = () => {
        if (!mountRef.current) return;
        const newW = mountRef.current.clientWidth;
        const newH = mountRef.current.clientHeight;
        renderer.setSize(newW, newH);
        camera.left = newW / -2;
        camera.right = newW / 2;
        camera.top = newH / 2;
        camera.bottom = newH / -2;
        camera.updateProjectionMatrix();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', handleResize);
        geometry.dispose();
        material.dispose();
        texture.dispose();
      };
    });

    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [src]);

  return (
    <div 
      ref={mountRef} 
      style={{ width: '100%', height: '100%', opacity: isReady ? 1 : 0, transition: 'opacity 0.5s' }}
      onMouseEnter={() => { targetHoverState.current = 1; }}
      onMouseLeave={() => { targetHoverState.current = 0; }}
    />
  );
};

export default LiquidImage;
