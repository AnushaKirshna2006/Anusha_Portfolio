import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  
  // Create a water ripple effect on hover
  if (uHover > 0.0) {
    float wave = sin(uv.y * 20.0 + uTime * 5.0) * 0.02 * uHover;
    float wave2 = cos(uv.x * 20.0 + uTime * 4.0) * 0.02 * uHover;
    uv.x += wave;
    uv.y += wave2;
  }
  
  vec4 color = texture2D(uTexture, uv);
  gl_FragColor = color;
}
`;

const WebGLImage = ({ src, alt, style }) => {
  const containerRef = useRef();
  const isHoveredRef = useRef(false);
  const hoverUniform = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1; // Move camera back slightly to prevent clipping
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    const { clientWidth, clientHeight } = containerRef.current;
    renderer.setSize(clientWidth, clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 }
      }
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationId;
    const clock = new THREE.Clock();

    const render = () => {
      material.uniforms.uTime.value = clock.getElapsedTime();
      
      // Smoothly interpolate hover state
      const targetHover = isHoveredRef.current ? 1.0 : 0.0;
      hoverUniform.current += (targetHover - hoverUniform.current) * 0.1;
      material.uniforms.uHover.value = hoverUniform.current;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      if (containerRef.current) {
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [src]);

  return (
    <div 
      ref={containerRef} 
      style={{ ...style, width: '100%', height: '100%', cursor: 'none' }}
      onMouseEnter={() => isHoveredRef.current = true}
      onMouseLeave={() => isHoveredRef.current = false}
      data-cursor="view"
      title={alt}
    />
  );
};

export default WebGLImage;
