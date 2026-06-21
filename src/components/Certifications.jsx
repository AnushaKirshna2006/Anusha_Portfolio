import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import TextReveal from './TextReveal';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';
import { useTransition } from './TransitionContext';

export const certifications = [
  { id: 1, title: 'Artificial Intelligence Fundamentals', issuer: 'IBM', platform: 'IBM', date: 'Jun 2024', description: 'Comprehensive introduction to AI concepts including machine learning, deep learning, and neural networks. Covered practical applications of AI in business and industry.' },
  { id: 2, title: 'R Studio', issuer: 'Harvard University', platform: 'edX', date: '', description: 'Data science foundations using R programming language. Covered statistical analysis, data visualization, and probability through Harvard\'s renowned curriculum.' },
  { id: 3, title: 'Adobe Photoshop', issuer: 'Adobe', platform: 'Alison', date: '', description: 'Professional-level photo editing and digital design certification. Mastered layers, masks, retouching, and compositing techniques.' },
  { id: 4, title: 'Claude Platform 101', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Introduction to the Claude AI platform, covering its architecture, capabilities, and best practices for effective AI-assisted workflows.' },
  { id: 5, title: 'Introduction to Subagents', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Deep dive into multi-agent AI systems, orchestration patterns, and building autonomous sub-agent workflows for complex tasks.' },
  { id: 6, title: 'AI Capabilities and Limitations', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Critical examination of what modern AI can and cannot do, covering safety considerations, hallucinations, and responsible deployment.' },
  { id: 7, title: 'AI Fluency for Small Businesses', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Practical guide to integrating AI tools into small business operations, covering automation, customer engagement, and cost optimization.' },
  { id: 8, title: 'Introduction to Agent Skills', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Building skill-based AI agents with specialized capabilities including tool use, context management, and task decomposition.' },
  { id: 9, title: 'AI Fluency for Nonprofits', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Leveraging AI in nonprofit operations for impact measurement, donor engagement, and operational efficiency.' },
  { id: 10, title: 'Claude with Google Cloud\'s Vertex AI', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Deploying and scaling Claude models via Google Cloud\'s Vertex AI platform, covering API integration, model management, and production workflows.' },
  { id: 11, title: 'Claude in Amazon Bedrock', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Integration of Claude with AWS Bedrock for enterprise-scale AI deployments, covering serverless inference and security best practices.' },
  { id: 12, title: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Advanced MCP patterns including server implementation, tool chaining, resource management, and building production-grade MCP servers.' },
  { id: 13, title: 'AI Fluency for Students', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Ethical AI usage in academic settings, covering research assistance, study optimization, and maintaining academic integrity.' },
  { id: 14, title: 'Introduction to Model Context Protocol', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Foundations of MCP — the open standard for connecting AI models to external data sources and tools.' },
  { id: 15, title: 'Building with the Claude API', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Hands-on API development with Claude, covering prompt engineering, streaming responses, tool use, and building production applications.' },
  { id: 16, title: 'Claude Code in Action', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Practical coding with Claude Code — debugging, refactoring, and building full applications using AI-assisted development workflows.' },
  { id: 17, title: 'Claude 101', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Beginner\'s guide to Claude covering conversational AI, prompt techniques, and understanding Claude\'s strengths across different use cases.' },
  { id: 18, title: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Comprehensive framework for AI literacy — understanding models, evaluating outputs, and developing intuition for effective AI collaboration.' },
  { id: 19, title: 'Introduction to Claude Cowork', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Collaborative AI workflows with Claude Cowork, covering team-based AI usage, shared contexts, and productivity optimization.' },
  { id: 20, title: 'Claude Code 101', issuer: 'Anthropic', platform: 'Anthropic', date: 'Jun 2024', description: 'Getting started with Claude Code for software development — setup, terminal integration, and best practices for AI pair programming.' }
];

// Get unique platforms for filters
export const platforms = ['All', ...new Set(certifications.map(c => c.platform))];

// Issuer color map
const issuerColors = {
  'Anthropic': { bg: 'rgba(212, 163, 115, 0.1)', accent: '#d4a373', border: 'rgba(212, 163, 115, 0.25)' },
  'IBM': { bg: 'rgba(15, 98, 254, 0.1)', accent: '#0f62fe', border: 'rgba(15, 98, 254, 0.25)' },
  'Harvard University': { bg: 'rgba(165, 28, 48, 0.1)', accent: '#a51c30', border: 'rgba(165, 28, 48, 0.25)' },
  'Adobe': { bg: 'rgba(255, 0, 0, 0.1)', accent: '#ff0000', border: 'rgba(255, 0, 0, 0.25)' },
};

export const CertCard = ({ cert, index, onSelect }) => {
  const colors = issuerColors[cert.issuer] || issuerColors['Anthropic'];
  
  return (
    <TiltCard
      className="glass-panel"
      intensity={12}
      style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        minHeight: '160px',
        position: 'relative',
        cursor: 'pointer',
      }}
    >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      viewport={{ once: false, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onSelect && onSelect(cert)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flex: 1,
      }}
    >
      {/* Subtle background glow based on issuer */}
      <div style={{
        position: 'absolute', top: '-50px', right: '-50px', width: '100px', height: '100px',
        background: colors.bg,
        filter: 'blur(40px)', borderRadius: '50%'
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.7rem', 
          color: colors.accent, 
          textTransform: 'uppercase', 
          letterSpacing: '0.05em',
          background: colors.bg,
          border: `1px solid ${colors.border}`,
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
        fontFamily: 'var(--font-body)', 
        fontSize: '1.1rem', 
        fontWeight: 500, 
        color: 'var(--fg)', 
        lineHeight: 1.4,
        marginTop: 'auto'
      }}>
        {cert.title}
      </h4>

      {/* "View Details" hint */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        color: 'var(--fg-muted)',
        letterSpacing: '0.05em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem'
      }}>
        View Details →
      </div>
    </motion.div>
    </TiltCard>
  );
};

/* ═══════════════════════════════════════════════════════
   CERT DETAIL MODAL
   ═══════════════════════════════════════════════════════ */
export const CertDetailModal = ({ cert, onClose }) => {
  if (!cert) return null;
  const colors = issuerColors[cert.issuer] || issuerColors['Anthropic'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0,
        background: 'rgba(3,3,5,0.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        cursor: 'pointer'
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel"
        style={{
          maxWidth: '600px',
          width: '100%',
          padding: 'clamp(2rem, 4vw, 3rem)',
          position: 'relative',
          cursor: 'default'
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '1.5rem', right: '1.5rem',
            background: 'none', border: 'none',
            color: 'var(--fg-dim)', cursor: 'pointer',
            fontSize: '1.5rem', lineHeight: 1,
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--fg)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--fg-dim)'}
        >
          ×
        </button>

        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '200px', height: '200px',
          background: colors.bg,
          filter: 'blur(80px)', borderRadius: '50%',
          opacity: 0.8
        }} />

        {/* Issuer badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: colors.accent,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            padding: '0.3rem 0.8rem',
            borderRadius: '6px'
          }}>
            {cert.issuer}
          </span>
          {cert.date && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--fg-dim)'
            }}>
              {cert.date}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 600,
          color: 'var(--fg)',
          letterSpacing: '-0.02em',
          lineHeight: 1.3,
          marginBottom: '1.5rem',
          position: 'relative',
          zIndex: 2
        }}>
          {cert.title}
        </h3>

        {/* Divider */}
        <div style={{
          width: '60px', height: '2px',
          background: `linear-gradient(90deg, ${colors.accent}, transparent)`,
          marginBottom: '1.5rem'
        }} />

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1rem',
          lineHeight: 1.7,
          color: 'var(--fg-dim)',
          position: 'relative',
          zIndex: 2
        }}>
          {cert.description}
        </p>

        {/* Platform tag */}
        <div style={{
          marginTop: '2rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--glass-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            Platform: {cert.platform}
          </span>
          <div style={{
            width: '8px', height: '8px', borderRadius: '50%',
            background: colors.accent,
            boxShadow: `0 0 10px ${colors.accent}`
          }} />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════
   FILTER PILLS
   ═══════════════════════════════════════════════════════ */
export const FilterPills = ({ categories, active, onSelect }) => (
  <div style={{
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: '3rem'
  }}>
    {categories.map(cat => (
      <button
        key={cat}
        onClick={() => onSelect(cat)}
        className={active === cat ? "glass-pill" : ""}
        style={{
          background: active === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
          color: active === cat ? 'var(--fg)' : 'var(--fg-dim)',
          border: active === cat ? '1px solid var(--glass-border)' : '1px solid transparent',
          padding: '0.5rem 1.2rem',
          borderRadius: '30px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: active === cat ? 600 : 400,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}
      >
        {cat}
        {cat !== 'All' && (
          <span style={{
            marginLeft: '0.4rem',
            fontSize: '0.65rem',
            color: active === cat ? 'var(--accent)' : 'var(--fg-muted)'
          }}>
            ({certifications.filter(c => c.platform === cat).length})
          </span>
        )}
      </button>
    ))}
  </div>
);

/* ═══════════════════════════════════════════════════════
   MAIN HOME SECTION (simple preview — no filters)
   ═══════════════════════════════════════════════════════ */
const Certifications = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const { navigateWithTransition } = useTransition();

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="certifications" ref={containerRef} style={{ padding: '8rem var(--pad-x)', position: 'relative' }}>
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
              View All {certifications.length} Certifications &rarr;
            </button>
          </Magnetic>
        </div>
      </motion.div>
    </section>
  );
};

export default Certifications;

