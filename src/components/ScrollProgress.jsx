import React from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Magnetic from './Magnetic';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  // Smooth out the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div 
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mixBlendMode: 'difference',
        color: '#fff'
      }}
    >
      <Magnetic>
        <button
          onClick={scrollToTop}
          className="link-hover"
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            width: '60px',
            height: '60px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            outline: 'none'
          }}
          aria-label="Scroll to top"
        >
          <svg width="60" height="60" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="50"
              cy="50"
              r="40"
              pathLength="1"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="4"
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              pathLength="1"
              stroke="#fff"
              strokeWidth="4"
              fill="none"
              strokeDasharray="1"
              style={{ strokeDashoffset: useTransform(scaleX, [0, 1], [1, 0]) }}
            />
          </svg>
          {/* Inner Arrow */}
          <div style={{ position: 'absolute', pointerEvents: 'none', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5" />
              <path d="M5 12l7-7 7 7" />
            </svg>
          </div>
        </button>
      </Magnetic>
    </div>
  );
};

export default ScrollProgress;
