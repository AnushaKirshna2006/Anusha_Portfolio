import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TransitionPanel = ({ isActive, onCover }) => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [phase, setPhase] = useState('idle');

  useEffect(() => {
    const updateSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    if (isActive) {
      setPhase('covering');
    } else if (phase === 'covering') {
      setPhase('uncovering');
    }
  }, [isActive, phase]);

  if (windowSize.width === 0) return null;

  const w = windowSize.width;
  const h = windowSize.height;

  // Fluid SVG sweep up animation
  const variants = {
    idle: {
      d: `M0 ${h} Q${w / 2} ${h} ${w} ${h} L${w} ${h} L0 ${h} Z`
    },
    covering: {
      d: `M0 0 Q${w / 2} ${h * 0.2} ${w} 0 L${w} ${h} L0 ${h} Z`,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    },
    uncovering: {
      d: `M0 0 Q${w / 2} 0 ${w} 0 L${w} 0 L0 0 Z`,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: phase === 'idle' || phase === 'uncovering' ? 'none' : 'auto'
      }}
    >
      <svg 
        style={{ width: '100%', height: '100%' }}
        viewBox={`0 0 ${w} ${h}`}
        preserveAspectRatio="none"
      >
        <motion.path
          variants={variants}
          initial="idle"
          animate={phase}
          onAnimationComplete={(definition) => {
            if (definition === 'covering' && onCover) {
              onCover();
            } else if (definition === 'uncovering') {
              setPhase('idle');
            }
          }}
          fill="var(--accent)"
        />
      </svg>
    </div>
  );
};

export default TransitionPanel;
