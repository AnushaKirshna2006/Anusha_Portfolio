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
            <Magnetic><a href="https://github.com/AnushaKirshna2006" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ width: 'fit-content' }}>GITHUB</a></Magnetic>
            <Magnetic><a href="https://linkedin.com/in/anusha-kirshna" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ width: 'fit-content' }}>LINKEDIN</a></Magnetic>
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
