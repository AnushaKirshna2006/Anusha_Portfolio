import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

const FloatingTag = ({ text, delay = 0, top, left, right, bottom, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, margin: "-100px" }}
      transition={{ duration: 0.6, delay: delay }}
      style={{
        position: 'absolute',
        top, left, right, bottom,
        zIndex: 20
      }}
    >
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: "easeInOut",
          delay: delay
        }}
        style={{
          background: 'rgba(20, 20, 20, 0.85)',
          border: '1px solid rgba(0, 242, 254, 0.2)',
          padding: '0.6rem 1.2rem',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          willChange: 'transform'
        }}
      >
        <div style={{
          width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(0, 242, 254, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent)'
        }}>
          {icon}
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg)', fontWeight: 600 }}>
          {text}
        </span>
      </motion.div>
    </motion.div>
  );
};

const About = ({ onOpenInfo }) => {
  const containerRef = useRef(null);

  return (
    <section id="about" ref={containerRef} style={{
      position: 'relative',
      padding: '8rem var(--pad-x) 4rem'
    }}>

      {/* Background Soft Glow */}
      <div style={{ position: 'absolute', top: '10%', right: '10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(0, 242, 254, 0.05) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        minHeight: '70vh'
      }}>

        {/* ═══ LEFT COLUMN (CONTENT) ═══ */}
        <div style={{ display: 'flex', flexDirection: 'column', zIndex: 10 }}>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              color: 'var(--accent)',
              marginBottom: '2rem'
            }}
          >
            [02] About
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 700,
              lineHeight: 1.15,
              color: 'var(--fg)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}
          >
            As a <span style={{ color: 'var(--accent)' }}>software engineering</span> student, I craft tailor‑made web experiences, blending technical precision and creative design.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.15 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'var(--fg-dim)',
              maxWidth: '90%',
              marginBottom: '3rem'
            }}
          >
            My name is <strong style={{ color: 'var(--fg)' }}>Anusha Kirshna</strong>. A passionate creator and computing software engineering student at the University of Stirling. From interactive frontends to data‑driven applications, I turn ideas into pixel‑perfect realities.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.25 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '5rem' }}
          >
            <a
              href="mailto:anushakirshna@gmail.com"
              className="link-hover"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                color: '#000',
                background: 'var(--accent)',
                padding: '1rem 2rem',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(0, 242, 254, 0.3)'
              }}
            >
              Say Hello
            </a>
            <button
              onClick={onOpenInfo}
              className="link-hover"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                color: 'var(--fg)',
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '1rem 2rem',
                borderRadius: '50px',
                cursor: 'pointer'
              }}
            >
              More Info
            </button>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.35 }}
            style={{
              display: 'flex',
              gap: 'clamp(2rem, 4vw, 4rem)',
              alignItems: 'flex-start'
            }}
          >
            {[
              { value: 10, suffix: '+', label: 'Projects\nDone' },
              { value: 20, suffix: '+', label: 'Certifications\nEarned' },
              { value: 3, suffix: '+', label: 'Years\nCoding' },
              { value: 15, suffix: '+', label: 'Technologies\nMastered' }
            ].map((stat) => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--fg)', lineHeight: 1 }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', marginTop: '0.5rem', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ═══ RIGHT COLUMN (AVATAR & TAGS) ═══ */}
        <div style={{ position: 'relative', height: '100%', minHeight: '600px', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>

          {/* Circular Graphic Elements */}
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(0, 242, 254, 0.1)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '550px', height: '550px', borderRadius: '50%', border: '1px dashed rgba(255, 255, 255, 0.05)', pointerEvents: 'none' }} />

          {/* Vibrant Glow Behind Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%) translateZ(0)',
              width: '400px', height: '400px',
              background: 'radial-gradient(circle, rgba(0, 242, 254, 0.15) 0%, transparent 60%)',
              borderRadius: '50%',
              pointerEvents: 'none', zIndex: 5, willChange: 'opacity'
            }}
          />

          {/* The Avatar Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{
              position: 'relative',
              zIndex: 10,
              width: '100%',
              maxWidth: '450px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            {/* Using the AI processed transparent image */}
            <img
              src="/assets/images/Profile_final.png"
              alt="Anusha Avatar"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
                maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)'
              }}
            />
          </motion.div>

          {/* Floating Tags (Positioned to match top alignment) */}
          <FloatingTag
            text="UI/UX Design"
            top="10%" right="0%"
            delay={0.6}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>}
          />
          <FloatingTag
            text="Creative Coding"
            top="30%" right="-10%"
            delay={0.8}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>}
          />
          <FloatingTag
            text="Full-Stack Dev"
            top="50%" right="5%"
            delay={1.0}
            icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>}
          />

        </div>
      </div>

      {/* Responsive adjustments */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 1024px) {
          #about > div { grid-template-columns: 1fr !important; }
          #about .link-hover { padding: 1rem 1.5rem !important; }
        }
      `}} />
    </section>
  );
};

export default About;
