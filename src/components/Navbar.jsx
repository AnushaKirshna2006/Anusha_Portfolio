import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';
import { useSound } from './SoundContext';

const Navbar = ({ onOpenInfo }) => {
  const { navigateWithTransition } = useTransition();
  const { soundEnabled, toggleSound } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  // Hide on scroll down, show on scroll up
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY.current;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    lastScrollY.current = latest;
  });

  // Active section detection
  useEffect(() => {
    const sectionIds = ['home', 'about', 'services', 'skills', 'experience', 'works', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

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

  const navLinkStyle = (section) => ({
    background: 'none',
    border: 'none',
    color: activeSection === section ? 'var(--accent)' : 'inherit',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    textTransform: 'inherit',
    cursor: 'pointer',
    padding: 0,
    transition: 'color 0.3s ease',
    position: 'relative'
  });

  return (
    <>
      <motion.div
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'fixed', top: '2rem', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 1000, pointerEvents: 'none' }}
      >
        <motion.nav 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          className="glass-pill"
          style={{ 
            display: 'flex', alignItems: 'center', padding: '1rem 2rem', 
            gap: 'clamp(1.5rem, 4vw, 4rem)', pointerEvents: 'auto',
            boxShadow: 'var(--glass-shadow)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingRight: 'clamp(1rem, 3vw, 3rem)' }}>
            <button 
              onClick={goHome}
              className="link-hover"
              style={{ 
                background: 'none', border: 'none', padding: 0, cursor: 'pointer',
                fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.5rem', color: 'var(--fg)', letterSpacing: '-0.02em', lineHeight: 1 
              }}
            >
              A.K
            </button>
          </div>

          {/* Desktop Nav Links */}
          <div className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--fg)', fontWeight: 500 }}>
            <Magnetic>
              <button onClick={toggleSound} className="link-hover" style={navLinkStyle('')}>
                {soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => {
                  if (window.location.pathname !== '/') navigateWithTransition('/');
                  setTimeout(() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                }}
                className="link-hover" 
                style={navLinkStyle('works')}
              >
                PROJECTS
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => navigateWithTransition('/contact')} 
                className="link-hover" 
                style={navLinkStyle('contact')}
              >
                CONTACT
              </button>
            </Magnetic>
            <Magnetic>
              <button 
                onClick={() => navigateWithTransition('/certifications')} 
                className="link-hover" 
                style={navLinkStyle('')}
              >
                CERTIFICATIONS
              </button>
            </Magnetic>
            <Magnetic>
              <button onClick={onOpenInfo} className="link-hover" style={navLinkStyle('')}>
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
      </motion.div>

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
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.05 }}
              onClick={() => navAction(() => toggleSound())}
            >
              Sound: {soundEnabled ? 'On' : 'Off'}
            </motion.button>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}
              onClick={() => navAction(() => {
                if (window.location.pathname !== '/') navigateWithTransition('/');
                setTimeout(() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }), 100);
              })}
            >
              Projects
            </motion.button>
            <motion.button 
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
              onClick={() => navAction(() => navigateWithTransition('/contact'))}
            >
              Contact
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
