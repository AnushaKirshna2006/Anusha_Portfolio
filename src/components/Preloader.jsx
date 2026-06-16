import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [stage, setStage] = useState('loading');

  useEffect(() => {
    // Stage 1: loading
    // Stage 2: exiting after 2.5 seconds
    const timer = setTimeout(() => {
      setStage('exiting');
      setTimeout(onComplete, 800); // give it time to slide up
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: stage === 'exiting' ? '-100vh' : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Glow */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '200px', height: '200px', background: 'var(--accent)', filter: 'blur(60px)', borderRadius: '50%', zIndex: 0 }} 
        />

        {/* Logo "A.K" */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 15vw, 10rem)',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--fg)',
            letterSpacing: '-0.05em',
            margin: 0,
            position: 'relative',
            zIndex: 1,
            textShadow: '0 0 30px rgba(255,255,255,0.1)'
          }}
        >
          A.K
        </motion.h1>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            color: 'var(--fg-dim)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginTop: '1rem',
            position: 'relative',
            zIndex: 1
          }}
        >
          Anusha Kirshna
        </motion.div>

        {/* Loading Bar indicator */}
        <motion.div 
          style={{
            width: '2px',
            height: '0px',
            background: 'var(--accent)',
            marginTop: '3rem',
            position: 'relative',
            zIndex: 1
          }}
          initial={{ height: 0 }}
          animate={{ height: 60 }}
          transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
        />

      </div>
    </motion.div>
  );
};

export default Preloader;
