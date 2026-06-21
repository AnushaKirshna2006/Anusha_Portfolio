import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    title: 'Frontend Development',
    desc: 'Building responsive, performant web interfaces with React, modern CSS, and motion design that feel alive.',
    details: 'I specialize in creating fluid, interactive user interfaces that load fast and feel natural. From complex state management to pixel-perfect animations, I ensure every interaction delights the user.',
    tools: ['React', 'JavaScript', 'HTML/CSS', 'Framer Motion', 'TailwindCSS', 'Vite'],
    highlight: '88%',
    highlightLabel: 'React Proficiency',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="34" height="26" rx="3" />
        <polyline points="12 15 8 20 12 25" />
        <polyline points="28 15 32 20 28 25" />
        <line x1="22" y1="13" x2="18" y2="27" />
        <line x1="3" y1="35" x2="37" y2="35" />
      </svg>
    ),
    color: 'rgba(0, 242, 254, 0.12)',
    accentHex: '#00f2fe'
  },
  {
    title: 'UI/UX Design',
    desc: 'Crafting intuitive user experiences with Figma and Adobe tools — where aesthetics meet usability.',
    details: 'I design with empathy, creating wireframes, prototypes, and high-fidelity mockups that prioritize both beauty and function. Every design decision is backed by user-centered thinking.',
    tools: ['Figma', 'Adobe Photoshop', 'Wireframing', 'Prototyping', 'Design Systems'],
    highlight: '85%',
    highlightLabel: 'Design Skills',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="20" r="16" />
        <circle cx="20" cy="20" r="8" />
        <circle cx="20" cy="20" r="2" fill="currentColor" />
        <line x1="20" y1="4" x2="20" y2="8" />
        <line x1="20" y1="32" x2="20" y2="36" />
        <line x1="4" y1="20" x2="8" y2="20" />
        <line x1="32" y1="20" x2="36" y2="20" />
      </svg>
    ),
    color: 'rgba(168, 85, 247, 0.12)',
    accentHex: '#a855f7'
  },
  {
    title: 'Full-Stack Apps',
    desc: 'End-to-end application development with Node.js, MongoDB, and RESTful APIs — from database to deploy.',
    details: 'I build complete web applications from the ground up, handling both the visual frontend and the server-side logic. Secure authentication, database design, and API architecture are all in my toolkit.',
    tools: ['Node.js', 'MongoDB', 'Express', 'REST APIs', 'SQL', 'Authentication'],
    highlight: '75%',
    highlightLabel: 'Backend Skills',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="4" width="28" height="10" rx="2" />
        <rect x="6" y="18" width="28" height="10" rx="2" />
        <circle cx="12" cy="9" r="1.5" fill="currentColor" />
        <circle cx="12" cy="23" r="1.5" fill="currentColor" />
        <line x1="20" y1="32" x2="20" y2="38" />
        <line x1="14" y1="38" x2="26" y2="38" />
      </svg>
    ),
    color: 'rgba(74, 222, 128, 0.12)',
    accentHex: '#4ade80'
  },
  {
    title: 'Data Visualization',
    desc: 'Transforming raw datasets into interactive dashboards and visual stories using modern web technologies.',
    details: 'I bring data to life through interactive charts, animated graphs, and clear visual narratives. Whether it\'s academic research or business metrics, I make numbers easy to understand.',
    tools: ['R Studio', 'Chart.js', 'D3.js', 'Data Analysis', 'Dashboards'],
    highlight: '70%',
    highlightLabel: 'Data Skills',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 32 12 18 20 24 28 10 36 16" />
        <circle cx="12" cy="18" r="2" fill="currentColor" />
        <circle cx="20" cy="24" r="2" fill="currentColor" />
        <circle cx="28" cy="10" r="2" fill="currentColor" />
        <line x1="4" y1="36" x2="36" y2="36" />
        <line x1="4" y1="4" x2="4" y2="36" />
      </svg>
    ),
    color: 'rgba(251, 191, 36, 0.12)',
    accentHex: '#fbbf24'
  },
  {
    title: 'Motion & Animation',
    desc: 'Adding life to interfaces with scroll-driven animations, micro-interactions, and cinematic transitions.',
    details: 'I believe motion is what separates good UIs from great ones. I use Framer Motion, CSS animations, and scroll-based triggers to create experiences that feel alive and responsive.',
    tools: ['Framer Motion', 'CSS Animations', 'GSAP', 'Lenis', 'Scroll Triggers'],
    highlight: '78%',
    highlightLabel: 'Animation Skills',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 8 L20 4 L32 8 L36 20 L32 32 L20 36 L8 32 L4 20 Z" />
        <circle cx="20" cy="20" r="6" />
        <line x1="20" y1="14" x2="20" y2="4" />
        <line x1="26" y1="20" x2="36" y2="20" />
      </svg>
    ),
    color: 'rgba(236, 72, 153, 0.12)',
    accentHex: '#ec4899'
  },
  {
    title: 'AI & Emerging Tech',
    desc: 'Exploring the intersection of AI and web development — from Claude integrations to intelligent UIs.',
    details: 'With 20+ AI certifications from Anthropic and IBM, I understand how to leverage AI in practical applications. I build AI-assisted tools, integrate APIs like Claude and GPT, and stay at the cutting edge.',
    tools: ['Claude API', 'AI Fundamentals', 'MCP', 'Prompt Engineering', 'IBM AI'],
    highlight: '20+',
    highlightLabel: 'AI Certifications',
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="20" cy="12" r="8" />
        <path d="M8 36 C8 28 12 24 20 24 C28 24 32 28 32 36" />
        <circle cx="17" cy="11" r="1.5" fill="currentColor" />
        <circle cx="23" cy="11" r="1.5" fill="currentColor" />
        <path d="M16 15 Q20 18 24 15" />
      </svg>
    ),
    color: 'rgba(99, 102, 241, 0.12)',
    accentHex: '#6366f1'
  }
];

/* ═══ 3D Flip Card ═══ */
const ServiceCard = ({ service, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{
        perspective: '1200px',
        cursor: 'pointer',
        height: '380px',
        width: '100%',
        willChange: 'transform, opacity'
      }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 100, damping: 20 }}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* ── FRONT FACE ── */}
        <div className="glass-panel service-card" style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderTop: `2px solid ${service.color}`
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '16px',
                background: service.color, border: `1px solid ${service.accentHex}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.accentHex
              }}>
                {service.icon}
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-muted)', letterSpacing: '0.1em' }}>
                0{index + 1}
              </span>
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '1rem' }}>
              {service.title}
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--fg-dim)' }}>
              {service.desc}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: service.accentHex, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <span>Click to flip</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><polyline points="21 3 21 8 16 8"></polyline></svg>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div className="glass-panel" style={{
          position: 'absolute',
          inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          padding: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          background: `linear-gradient(145deg, var(--glass-bg), ${service.color})`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '1rem' }}>
            {service.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', lineHeight: 1.6, color: 'var(--fg-dim)', marginBottom: '1.5rem' }}>
            {service.details}
          </p>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Tools</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {service.tools.map(tool => (
                <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', padding: '0.3rem 0.6rem', borderRadius: '4px', background: 'rgba(0,0,0,0.2)', color: 'var(--fg-dim)' }}>
                  {tool}
                </span>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: service.accentHex }}>{service.highlight}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--fg-muted)', textTransform: 'uppercase' }}>{service.highlightLabel}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ═══ MAIN COMPONENT ═══ */
const Services = () => {
  return (
    <section id="services" style={{
      padding: '10rem var(--pad-x) 8rem',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '2rem' }}
        >
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
            textTransform: 'uppercase', letterSpacing: '0.15em',
            color: 'var(--accent)', display: 'block', marginBottom: '1.5rem'
          }}>
            [03] Services
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.03em',
            lineHeight: 1.1, marginBottom: '1rem'
          }}>
            What I <span className="gradient-text">Do.</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: '1.05rem',
            color: 'var(--fg-dim)', maxWidth: '550px', lineHeight: 1.7
          }}>
            Click on any card to flip it and explore the tools I use and learn more about each area of expertise.
          </p>
        </motion.div>

        {/* Interactive hint */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            marginBottom: '3rem',
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
            color: 'var(--accent)', letterSpacing: '0.08em'
          }}
        >
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            👆
          </motion.div>
          TAP CARDS TO FLIP
        </motion.div>

        {/* ═══ Service Cards Grid ═══ */}
        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1rem, 2vw, 2rem)',
            marginBottom: '4rem'
          }}
        >
          {services.map((service, idx) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={idx}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
