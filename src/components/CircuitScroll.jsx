import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const CircuitScroll = () => {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 'var(--pad-x)', // Align with the left padding
      width: '2px',
      height: '100vh',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.3
    }}>
      {/* Background Line */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.1)',
      }} />
      
      {/* Animated Glowing Foreground Line */}
      <motion.div style={{
        position: 'absolute',
        top: 0,
        left: '-1px', // Slightly wider to cover the bg line
        width: '4px',
        height: '100%',
        background: 'linear-gradient(to bottom, var(--accent), var(--accent-3))',
        transformOrigin: 'top',
        scaleY: scaleY,
        boxShadow: '0 0 10px var(--accent), 0 0 20px var(--accent-3)',
        borderRadius: '2px'
      }} />

      {/* Nodes on the circuit */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '-3px',
        width: '8px',
        height: '8px',
        background: 'var(--bg)',
        border: '2px solid var(--accent)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--accent)'
      }} />
      
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '-3px',
        width: '8px',
        height: '8px',
        background: 'var(--bg)',
        border: '2px solid var(--accent-2)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--accent-2)'
      }} />

      <div style={{
        position: 'absolute',
        top: '80%',
        left: '-3px',
        width: '8px',
        height: '8px',
        background: 'var(--bg)',
        border: '2px solid var(--accent-3)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--accent-3)'
      }} />
    </div>
  );
};

export default CircuitScroll;
