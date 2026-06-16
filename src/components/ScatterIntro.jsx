import React from 'react';
import { motion } from 'framer-motion';
import ParallaxImage from './ParallaxImage';

const projects = [
  { id: 1, num: '01', title: 'Virtual Study Buddy', img: '/assets/images/project1.png' },
  { id: 2, num: '02', title: 'Cosmic Weather App', img: '/assets/images/project2.png' },
  { id: 3, num: '03', title: 'Classic Game Suite', img: '/assets/images/project3.png' }
];

const ScatterIntro = () => {
  return (
    <section id="projects-intro" style={{ position: 'relative', padding: '8rem var(--pad-x)', overflow: 'hidden' }}>
      
      {/* Ambient background glow for depth */}
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Central Quote */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto 6rem auto', textAlign: 'center' }}>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            fontFamily: 'var(--font-display)', 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 600, 
            lineHeight: 1.1, 
            color: 'var(--fg)',
            letterSpacing: '-0.03em',
            textShadow: '0 20px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)'
        }}>
          Each project is a chance to{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '0.1em' }}>learn</span>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', filter: 'blur(30px)', opacity: 0.2, zIndex: -1 }} />
          </span>, 
          <br/>
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span className="gradient-text" style={{ fontStyle: 'italic', paddingRight: '0.1em' }}>experiment</span>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', filter: 'blur(30px)', opacity: 0.2, zIndex: -1 }} />
          </span>{' '}
          and push my limits.
        </motion.h2>
      </div>

      {/* Single Line Project Row */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '1200px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '2rem' 
      }}>
        {projects.map((proj, idx) => (
          <motion.div 
            key={proj.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div 
              whileHover={{ scale: 1.03, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel"
              style={{ 
                width: '100%', 
                aspectRatio: '4/3', 
                borderRadius: 'var(--radius-md)', 
                overflow: 'hidden',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                cursor: 'pointer'
            }}>
              <ParallaxImage src={proj.img} alt={proj.title} wrapperStyle={{ position: 'absolute', inset: 0, transform: 'scale(1.05)' }} />
              
              {/* Glass Pill Label overlay */}
              <div style={{ 
                position: 'absolute', 
                bottom: '1rem', 
                left: '50%',
                transform: 'translateX(-50%)',
                width: 'max-content',
                maxWidth: '90%',
                padding: '0.6rem 1.2rem', 
                background: 'rgba(10, 10, 10, 0.5)', 
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '50px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
              }}>
                <span style={{ 
                  fontFamily: 'var(--font-display)', 
                  fontWeight: 600, 
                  fontSize: '0.75rem', 
                  color: 'var(--fg)', 
                  letterSpacing: '0.05em', 
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden'
                }}>
                  <span style={{ color: 'var(--fg-dim)' }}>{proj.num}</span> 
                  <span style={{ color: 'var(--accent)', margin: '0 0.5rem' }}>—</span> 
                  {proj.title}
                </span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

    </section>
  );
};

export default ScatterIntro;
