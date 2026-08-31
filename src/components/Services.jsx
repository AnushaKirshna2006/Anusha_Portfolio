import React, { useRef, useState, useEffect } from 'react';
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

/* ═══ Horizontal Accordion Card ═══ */
const AccordionItem = ({ service, index, isActive, onClick, isMobile }) => {
  return (
    <motion.div
      layout
      onClick={onClick}
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '24px',
        overflow: 'hidden',
        background: isActive ? `linear-gradient(145deg, var(--glass-bg), ${service.color})` : 'rgba(255, 255, 255, 0.02)',
        border: isActive ? `1px solid ${service.accentHex}44` : '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        padding: isActive ? (isMobile ? '2rem' : '3rem') : (isMobile ? '1rem 1.5rem' : '2rem 0'),
        willChange: 'width, flex, height',
      }}
      initial={false}
      animate={{
        flex: isActive ? (isMobile ? '1 1 auto' : 6) : 1,
        width: isMobile ? '100%' : (isActive ? 'auto' : '100px'),
        height: isMobile ? (isActive ? 'auto' : '80px') : '600px',
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, mass: 0.8 }}
      whileHover={{
        background: isActive ? `linear-gradient(145deg, var(--glass-bg), ${service.color})` : 'rgba(255, 255, 255, 0.05)',
      }}
    >
      <AnimatePresence mode="wait">
        {/* INACTIVE STATE */}
        {!isActive && (
          <motion.div
            key="inactive"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: 'center',
              justifyContent: isMobile ? 'space-between' : 'space-between',
              width: '100%',
              height: '100%',
              padding: isMobile ? 0 : '1rem 0'
            }}
          >
            <div style={{
              width: '50px', height: '50px', borderRadius: '12px',
              background: service.color, border: `1px solid ${service.accentHex}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.accentHex,
              flexShrink: 0
            }}>
              {service.icon}
            </div>
            
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: isMobile ? '1.2rem' : '1.5rem',
              fontWeight: 600,
              color: 'var(--fg-dim)',
              whiteSpace: 'nowrap',
              writingMode: isMobile ? 'horizontal-tb' : 'vertical-rl',
              transform: isMobile ? 'none' : 'rotate(180deg)',
              margin: isMobile ? '0 1rem' : 'auto 0',
              flex: isMobile ? 1 : 'none',
              textAlign: isMobile ? 'left' : 'center'
            }}>
              {service.title}
            </h3>
            
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg-muted)', letterSpacing: '0.1em'
            }}>
              0{index + 1}
            </div>
          </motion.div>
        )}

        {/* ACTIVE STATE */}
        {isActive && (
          <motion.div
            key="active"
            initial={{ opacity: 0, filter: 'blur(10px)', x: isMobile ? 0 : -20, y: isMobile ? -20 : 0 }}
            animate={{ opacity: 1, filter: 'blur(0px)', x: 0, y: 0 }}
            exit={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 0.1 } }}
            transition={{ duration: 0.4, delay: 0.15 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              width: '100%',
              minWidth: isMobile ? 'auto' : '350px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{
                  width: '70px', height: '70px', borderRadius: '16px',
                  background: 'rgba(0,0,0,0.3)', border: `1px solid ${service.accentHex}44`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: service.accentHex,
                  flexShrink: 0
                }}>
                  {service.icon}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg-muted)', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>0{index + 1}</span>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--fg)', margin: 0, lineHeight: 1.1 }}>{service.title}</h3>
                </div>
              </div>
            </div>

            <div className="hide-scrollbar" style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.15rem', lineHeight: 1.6, color: 'var(--fg)', marginBottom: '1.5rem', fontWeight: 500 }}>
                {service.desc}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--fg-dim)', marginBottom: '2.5rem' }}>
                {service.details}
              </p>
              
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>Tech Stack & Tools</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {service.tools.map(tool => (
                    <span key={tool} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', padding: '0.5rem 1rem', borderRadius: '50px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', color: 'var(--fg-dim)', whiteSpace: 'nowrap' }}>
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.8rem', marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 800, color: service.accentHex, lineHeight: 1 }}>{service.highlight}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--fg-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{service.highlightLabel}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ═══ MAIN COMPONENT ═══ */
const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1024);
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="services" style={{
      padding: '10rem var(--pad-x) 8rem',
      position: 'relative'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
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
            Select a service to expand its details and explore the technologies I use.
          </p>
        </motion.div>

        {/* ═══ Horizontal Accordion ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-100px" }}
          transition={{ duration: 1 }}
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '1rem',
            width: '100%',
            height: isMobile ? 'auto' : '650px',
            marginTop: '4rem'
          }}
        >
          {services.map((service, idx) => (
            <AccordionItem
              key={service.title}
              service={service}
              index={idx}
              isActive={activeIndex === idx}
              onClick={() => setActiveIndex(idx)}
              isMobile={isMobile}
            />
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Services;
