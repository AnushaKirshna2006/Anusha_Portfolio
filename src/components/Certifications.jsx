import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';

export const certifications = [
  { id: 1, title: 'Artificial Intelligence Fundamentals', issuer: 'IBM', date: 'Jun 2024' },
  { id: 2, title: 'R Studio', issuer: 'Harvard University', date: '' },
  { id: 3, title: 'Adobe Photoshop', issuer: 'Adobe', date: '' },
  { id: 4, title: 'Claude Platform 101', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 5, title: 'Introduction to subagents', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 6, title: 'AI Capabilities and Limitations', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 7, title: 'AI Fluency for Small Businesses', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 8, title: 'Introduction to agent skills', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 9, title: 'AI Fluency for nonprofits', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 10, title: 'Claude with Google Cloud\'s Vertex AI', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 11, title: 'Claude in Amazon Bedrock', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 12, title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 13, title: 'AI Fluency for students', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 14, title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 15, title: 'Building with the Claude API', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 16, title: 'Claude Code in Action', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 17, title: 'Claude 101', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 18, title: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 19, title: 'Introduction to Claude Cowork', issuer: 'Anthropic', date: 'Jun 2024' },
  { id: 20, title: 'Claude code 101', issuer: 'Anthropic', date: 'Jun 2024' }
];

export const CertCard = ({ cert, index }) => {
  const isAnthropic = cert.issuer === 'Anthropic';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass-panel"
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: '160px',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle background glow based on issuer */}
      <div style={{
        position: 'absolute', top: '-50px', right: '-50px', width: '100px', height: '100px',
        background: isAnthropic ? 'rgba(212, 163, 115, 0.1)' : 
                    cert.issuer === 'IBM' ? 'rgba(15, 98, 254, 0.1)' : 
                    cert.issuer === 'Harvard University' ? 'rgba(165, 28, 48, 0.1)' : 'rgba(255, 0, 0, 0.1)',
        filter: 'blur(40px)', borderRadius: '50%'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.7rem', 
          color: 'var(--accent)', 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          background: 'rgba(255,255,255,0.05)',
          padding: '0.2rem 0.6rem',
          borderRadius: '4px'
        }}>
          {cert.issuer}
        </span>
        {cert.date && (
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-dim)' }}>
            {cert.date}
          </span>
        )}
      </div>

      <h4 style={{ 
        fontFamily: 'var(--font-sans)', 
        fontSize: '1.1rem', 
        fontWeight: 500, 
        color: 'var(--fg)', 
        lineHeight: 1.4,
        marginTop: 'auto'
      }}>
        {cert.title}
      </h4>
    </motion.div>
  );
};

const Certifications = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const { navigateWithTransition } = useTransition();

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="certifications" ref={containerRef} style={{ padding: '8rem var(--pad-x)', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255,255,255,0.1)' }}>
          <TextReveal type="chars">Certifications.</TextReveal>
        </h2>
      </div>

      <motion.div style={{ y }} className="cert-grid">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {certifications.slice(0, 4).map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Magnetic>
            <button 
              onClick={() => navigateWithTransition('/certifications')}
              className="link-hover glass-pill"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 600,
                padding: '0.8rem 2rem',
                color: 'var(--fg)',
                background: 'transparent',
                border: '1px solid var(--glass-border)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              View All Certifications &rarr;
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;
