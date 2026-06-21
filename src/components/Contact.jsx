import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';

const Contact = () => {
  const { navigateWithTransition } = useTransition();
  
  return (
    <section id="contact" style={{ 
      position: 'relative',
      padding: '4rem var(--pad-x)'
    }}>

      {/* BIG CTA SECTION */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg-dim)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>
          Ready to collaborate?
        </p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(2rem, 4vw, 4rem)', 
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
              fontSize: '1rem', 
              fontWeight: 600,
              padding: '0.8rem 2rem', 
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

    </section>
  );
};

export default Contact;
