import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';

const Navbar = ({ onOpenInfo }) => {
  const { navigateWithTransition } = useTransition();

  return (
    <div style={{ position: 'fixed', top: '2rem', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, pointerEvents: 'none' }}>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="glass-pill"
        style={{ 
          display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', 
          gap: 'clamp(1rem, 3vw, 3rem)', pointerEvents: 'auto',
          boxShadow: 'var(--glass-shadow)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingRight: 'clamp(1rem, 3vw, 3rem)' }}>
          <button 
            onClick={() => {
              if (window.location.pathname !== '/') {
                navigateWithTransition('/');
              } else {
                const el = document.getElementById('home');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }
            }}
            className="link-hover"
            style={{ 
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1 
            }}
          >
            A.K
          </button>
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--fg-dim)', letterSpacing: '0.1em' }}>
            Portfolio 2026
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 500 }}>
          <Magnetic>
            <button 
              onClick={() => navigateWithTransition('/contact')} 
              className="link-hover" 
              style={{ background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', cursor: 'pointer', padding: 0 }}
            >
              CONTACT
            </button>
          </Magnetic>
          <Magnetic>
            <button 
              onClick={() => navigateWithTransition('/blog')} 
              className="link-hover" 
              style={{ background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', cursor: 'pointer', padding: 0 }}
            >
              BLOG
            </button>
          </Magnetic>
          <Magnetic>
            <button 
              onClick={() => navigateWithTransition('/certifications')} 
              className="link-hover" 
              style={{ background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', cursor: 'pointer', padding: 0 }}
            >
              CERTS
            </button>
          </Magnetic>
          <Magnetic>
            <button onClick={onOpenInfo} className="link-hover" style={{ background: 'none', border: 'none', color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit', textTransform: 'inherit', cursor: 'pointer', padding: 0 }}>
              INFO
            </button>
          </Magnetic>
        </div>
      </motion.nav>
    </div>
  );
};

export default Navbar;
