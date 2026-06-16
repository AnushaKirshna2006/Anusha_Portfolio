import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const About = ({ onOpenInfo }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Left content scrolls slightly slower than page
  const leftY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  // Right image scrolls slightly faster for a subtle parallax
  const rightY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    <section id="about" ref={containerRef} style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(12, 1fr)',
      alignItems: 'start',
      gap: '2rem',
      padding: '12rem var(--pad-x)',
      background: 'var(--bg)',
      overflow: 'hidden'
    }}>
      
      {/* LEFT CONTENT */}
      <motion.div style={{ zIndex: 2, y: leftY, gridColumn: '1 / 8' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)', marginBottom: '3rem' }}>
          [02] ABOUT
        </h3>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 3.5vw, 4rem)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: 'var(--fg)',
            marginBottom: '5rem',
            letterSpacing: '-0.02em',
          }}
        >
          As a <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>software engineering</span> student, I craft tailor-made web experiences, blending technical precision and <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>creative design</span>.
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginLeft: '10%' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.76, 0, 0.24, 1] }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: 'var(--fg-dim)',
              maxWidth: '550px'
            }}
          >
            My name is <span style={{ color: 'var(--fg)', fontWeight: 600 }}>Anusha Kirshna</span>. A passionate creator and computing software engineering student based in Ras Al-Khaimah, I build memorable digital experiences, always seeking the perfect symbiosis between robust logic and striking aesthetics.
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            style={{ marginTop: '2rem' }}
          >
            <a
              href="#info"
              onClick={onOpenInfo}
              className="link-hover glass-pill"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--bg)',
                background: 'var(--fg)',
                padding: '1rem 2rem',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.8rem',
                textDecoration: 'none'
              }}
            >
              VIEW TERMINAL INFO &rarr;
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* RIGHT IMAGE (OFFSET LAYOUT) */}
      <div style={{ gridColumn: '8 / 13', marginTop: '15rem', position: 'relative' }}>
        
        {/* Glow behind image */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'var(--accent)', filter: 'blur(100px)', opacity: 0.15, zIndex: 0 }} />

        <motion.div
          initial={{ opacity: 0, filter: 'grayscale(100%) blur(10px)' }}
          whileInView={{ opacity: 1, filter: 'grayscale(0%) blur(0px)' }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            width: '100%',
            aspectRatio: '3 / 4',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            y: rightY,
            position: 'relative',
            zIndex: 1,
            background: 'var(--bg-2)',
          }}
        >
          <img src="/assets/images/Profile.jpeg" alt="Anusha Kirshna" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,5,0.8), transparent)' }} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;
