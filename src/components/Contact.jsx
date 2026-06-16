import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';

const Contact = () => {
  const [time, setTime] = useState(new Date());
  const { navigateWithTransition } = useTransition();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <section id="contact" style={{ 
      position: 'relative',
      padding: '8rem var(--pad-x) 0 var(--pad-x)',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>

      {/* BIG CTA SECTION */}
      <div style={{ marginBottom: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
          Ready to collaborate?
        </p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(3rem, 6vw, 6rem)', 
            fontWeight: 700, 
            lineHeight: 1.1, 
            letterSpacing: '-0.03em', 
            margin: '0 0 3rem 0', 
            color: 'var(--fg)' 
          }}
        >
          Let's build something<br/>
          <span className="gradient-text">extraordinary.</span>
        </motion.h2>
        
        <Magnetic>
          <button 
            onClick={() => navigateWithTransition('/contact')}
            className="link-hover glass-pill"
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: '1.2rem', 
              fontWeight: 600,
              padding: '1rem 2.5rem', 
              color: 'var(--bg)', 
              background: 'var(--fg)', 
              border: 'none', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            Get in touch 
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </Magnetic>
      </div>

      <div className="glass-panel" style={{ padding: '4rem 2rem 2rem 2rem', borderBottom: 'none', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
        {/* INFO COLUMNS */}
        <div style={{ position: 'relative', zIndex: 10, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 500, color: 'var(--fg)', marginBottom: '4rem' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--fg-dim)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>CONTACT</span>
            <Magnetic><a href="mailto:anushakirshna@gmail.com" className="link-hover" style={{ width: 'fit-content' }}>anushakirshna@gmail.com</a></Magnetic>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--fg-dim)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>LOCAL TIME</span>
            <span style={{ color: 'var(--accent)' }}>{time.toLocaleTimeString('en-US', { hour12: false })} <span style={{ color: 'var(--fg-dim)' }}>GST</span></span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span style={{ color: 'var(--fg-dim)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>SOCIALS</span>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
              <Magnetic>
                <a href="https://github.com/AnushaKirshna2006" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="https://linkedin.com/in/anusha-kirshna" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
              </Magnetic>
            </div>
          </div>

        </div>
        
        {/* MASSIVE BOTTOM TYPOGRAPHY */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
          <h2 style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(4rem, 15vw, 15rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.04em', 
            lineHeight: 0.8,
            color: 'var(--fg)',
            margin: 0,
            textAlign: 'center',
            textShadow: '0 0 40px rgba(0, 242, 254, 0.1)',
            opacity: 0.8
          }}>
            ANUSHA
          </h2>
          
          <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
            <span style={{ color: 'var(--accent)' }}>BACK TO TOP &uarr;</span>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Contact;
