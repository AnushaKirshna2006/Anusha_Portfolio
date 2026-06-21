import React from 'react';
import { motion } from 'framer-motion';
import { useTransition } from '../components/TransitionContext';
import ScrambleText from '../components/ScrambleText';
import Magnetic from '../components/Magnetic';

const NotFound = () => {
  const { navigateWithTransition } = useTransition();

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--pad-x)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(6rem, 15vw, 12rem)',
          fontWeight: 900,
          lineHeight: 1,
          color: 'var(--fg)',
          margin: 0,
          textShadow: '0 0 40px rgba(0, 242, 254, 0.3)'
        }}>
          <ScrambleText text="404" />
        </h1>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          color: 'var(--fg-dim)',
          marginTop: '1rem',
          marginBottom: '3rem',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Page not found in this reality.
        </p>

        <Magnetic>
          <button 
            onClick={() => navigateWithTransition('/')}
            className="link-hover glass-pill"
            style={{
              background: 'var(--fg)',
              color: 'var(--bg)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              padding: '1rem 2.5rem',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            RETURN HOME &rarr;
          </button>
        </Magnetic>
      </div>

      {/* Decorative Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'var(--accent)',
          filter: 'blur(150px)',
          borderRadius: '50%',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </motion.section>
  );
};

export default NotFound;
