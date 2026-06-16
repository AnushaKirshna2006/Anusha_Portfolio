import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';

const Navbar = ({ onOpenInfo }) => {
  const { navigateWithTransition } = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);

  const goHome = () => {
    setMobileOpen(false);
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
  };

  const navAction = (action) => {
    setMobileOpen(false);
    action();
  };

  return (
    <>
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
              onClick={goHome}
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

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 500 }}>
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

          {/* Hamburger Button (mobile only, shown via CSS) */}
          <button 
            className={`hamburger ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </motion.nav>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              onClick={() => navAction(() => navigateWithTransition('/contact'))}
            >
              Contact
            </motion.button>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
              onClick={() => navAction(() => navigateWithTransition('/blog'))}
            >
              Blog
            </motion.button>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
              onClick={() => navAction(() => navigateWithTransition('/certifications'))}
            >
              Certifications
            </motion.button>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 }}
              onClick={() => navAction(() => { onOpenInfo({ preventDefault: () => {} }); })}
            >
              Info
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
