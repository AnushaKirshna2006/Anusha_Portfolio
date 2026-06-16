import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useCursor } from './CursorContext';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { cursorVariant, cursorText } = useCursor();

  // Smooth springs for the trailing cursor
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [cursorX, cursorY]);

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
      opacity: 1,
      backgroundColor: '#ffffff',
      border: 'none'
    },
    view: {
      scale: 3,
      opacity: 1,
      backgroundColor: 'var(--accent)',
      border: 'none'
    }
  };

  return (
    <>
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
          mixBlendMode: cursorVariant === 'view' ? 'normal' : 'difference',
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '4px',
          fontWeight: 700,
          letterSpacing: '0.1em'
        }}
      >
        {cursorVariant === 'view' && cursorText}
      </motion.div>
    </>
  );
};

export default CustomCursor;
