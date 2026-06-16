import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ParallaxImage = ({ src, alt, className = '', wrapperStyle = {} }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out the scroll progress for a buttery effect
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 30,
    stiffness: 100
  });

  // Scale the image slightly and move it vertically to create parallax
  const y = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.1, 1, 1.1]);

  return (
    <div 
      ref={containerRef} 
      className={className} 
      style={{ overflow: 'hidden', position: 'relative', width: '100%', height: '100%', ...wrapperStyle }}
    >
      <motion.img 
        src={src} 
        alt={alt} 
        style={{ 
          y, 
          scale,
          width: '100%', 
          height: '110%', 
          objectFit: 'cover', 
          position: 'absolute',
          top: '-5%',
          left: 0,
          transformOrigin: 'center'
        }} 
      />
    </div>
  );
};

export default ParallaxImage;
