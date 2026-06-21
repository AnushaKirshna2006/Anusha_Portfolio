import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useCursor } from './CursorContext';

const CustomCursor = () => {
  const { cursorVariant, cursorText, cursorColor } = useCursor();
  const trailCount = 5;
  const trailRefs = useRef([]);

  // Smooth springs for the main cursor
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  // Trail springs with progressively more lag
  const trails = Array.from({ length: trailCount }, (_, i) => ({
    x: useSpring(0, { damping: 30 + i * 8, stiffness: 150 - i * 20, mass: 0.3 + i * 0.15 }),
    y: useSpring(0, { damping: 30 + i * 8, stiffness: 150 - i * 20, mass: 0.3 + i * 0.15 }),
  }));

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trails.forEach((trail) => {
        trail.x.set(e.clientX);
        trail.y.set(e.clientY);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, trails]);

  // Define variants
  const variants = {
    default: {
      scale: 1,
      opacity: 1,
      backgroundColor: '#ffffff',
      border: 'none'
    },
    hover: {
      scale: 2.5,
      opacity: 0.25,
      backgroundColor: cursorColor,
      border: 'none'
    },
    view: {
      scale: 4,
      opacity: 1,
      backgroundColor: 'var(--accent)',
      border: 'none'
    }
  };

  return (
    <>
      {/* Trail particles */}
      {trails.map((trail, i) => (
        <motion.div
          key={i}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: `${8 - i * 1.2}px`,
            height: `${8 - i * 1.2}px`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 9998,
            backgroundColor: `rgba(0, 242, 254, ${0.3 - i * 0.05})`,
            x: trail.x,
            y: trail.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      ))}

      {/* Main cursor */}
      <motion.div
        animate={variants[cursorVariant] || variants.default}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'normal',
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '6px',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}
      >
        {cursorVariant === 'view' && cursorText}
      </motion.div>

      {/* Outer ring */}
      <motion.div
        animate={{
          scale: cursorVariant === 'hover' ? 1.8 : cursorVariant === 'view' ? 2.5 : 1,
          opacity: cursorVariant === 'default' ? 0.4 : 0.2,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          border: '1px solid var(--accent)',
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
};

export default CustomCursor;
