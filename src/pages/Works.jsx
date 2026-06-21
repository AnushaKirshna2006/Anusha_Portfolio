import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import WebGLImage from '../components/WebGLImage';
import { useTransition } from '../components/TransitionContext';
import ScrambleText from '../components/ScrambleText';
import RedCurve from '../components/RedCurve';
import TiltCard from '../components/TiltCard';

const projects = [
  {
    id: 1,
    num: '01',
    year: 'Feb 2026 - Present',
    type: 'Full-Stack Web App',
    category: 'Full-Stack',
    title: 'Virtual Study Buddy',
    desc: 'A full-stack web application connecting university students for peer-to-peer collaborative learning, with a focus on intuitive UX and inclusive design. Features JWT-based authentication, a preference-driven matching algorithm, and a MongoDB backend.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT Auth'],
    img: '/assets/images/project1.png',
    github: 'https://github.com/AnushaKirshna2006'
  },
  {
    id: 2,
    num: '02',
    year: 'Nov 2025',
    type: 'Frontend Weather',
    category: 'Frontend',
    title: 'Cosmic Weather App',
    desc: 'A fully responsive weather forecasting application that fetches and renders real-time meteorological data, achieving sub-second load performance across device breakpoints. Designed an intuitive, accessible UI with TailwindCSS and integrated the Open-Meteo API.',
    tech: ['React', 'TailwindCSS', 'Node.js', 'API'],
    img: '/assets/images/project2.png',
    github: 'https://github.com/AnushaKirshna2006'
  },
  {
    id: 3,
    num: '03',
    year: 'Mar 2026',
    type: 'OOP Desktop/Web',
    category: 'Desktop',
    title: 'Classic Game Suite',
    desc: 'Engineered game logic and polished user interfaces for Sokoban, Tic-Tac-Toe, and Rock Paper Scissors, with a focus on clean architecture and smooth user interaction. Applied object-oriented programming principles and design patterns.',
    tech: ['Java', 'VB.NET'],
    img: '/assets/images/project3.png',
    github: 'https://github.com/AnushaKirshna2006'
  }
];

const ProjectRow = ({ proj, idx, navigateWithTransition }) => {
  const rowRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={rowRef} 
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ margin: '4vh 0' }}
    >
      <TiltCard intensity={5}>
        <div
          className="glass-panel"
          style={{ display: 'grid', gridTemplateColumns: idx % 2 === 0 ? '1fr 1.2fr' : '1.2fr 1fr', gap: '4rem', alignItems: 'center', padding: '3rem 4rem' }}
        >
          
          {/* Info Side */}
          <motion.div style={{ order: idx % 2 === 0 ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '1.5rem', y: textY }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '3rem', fontWeight: 900, color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>{proj.num}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{proj.type}</span>
            </div>
            
            <h3 
              onClick={() => navigateWithTransition(`/project/${proj.id}`)}
              className="link-hover"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 4vw, 4rem)', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--fg)', cursor: 'pointer', margin: 0 }}
            >
              <ScrambleText text={proj.title} />
            </h3>
            
            <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--fg-dim)', margin: 0, paddingRight: idx % 2 === 0 ? '2rem' : '0' }}>
              {proj.desc}
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
              {proj.tech.map(t => (
                <span key={t} style={{ padding: '0.4rem 1rem', background: 'rgba(0,242,254,0.05)', color: 'var(--accent)', border: '1px solid rgba(0,242,254,0.15)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                  {t}
                </span>
              ))}
            </div>
            
            <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem', alignItems: 'center' }}>
              <span 
                onClick={() => navigateWithTransition(`/project/${proj.id}`)}
                className="link-hover" 
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--fg)', cursor: 'pointer', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.3s' }}
              >
                View Project 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
              <a href={proj.github} target="_blank" rel="noopener noreferrer" className="link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--fg-dim)', borderBottom: '1px solid transparent', paddingBottom: '0.3rem', transition: 'color 0.3s' }}>
                Source Code
              </a>
            </div>
          </motion.div>

          {/* Image Side */}
          <motion.div style={{ order: idx % 2 === 0 ? 2 : 1, y: imgY, width: '100%' }}>
            <div 
              onClick={() => navigateWithTransition(`/project/${proj.id}`)}
              className="project-image-wrap"
              style={{ width: '100%', aspectRatio: '16/10', position: 'relative', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', cursor: 'pointer', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', background: '#000' }}
            >
              <WebGLImage src={proj.img} alt={proj.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
              <div className="project-overlay" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                <div className="project-overlay-content" style={{ position: 'absolute', bottom: '2rem', left: '2rem', transform: 'none' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>Explore Interactive</span>
                </div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Works = () => {
  const containerRef = useRef(null);
  const { navigateWithTransition } = useTransition();
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Full-Stack', 'Frontend', 'Desktop'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  return (
    <section id="works" ref={containerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden', padding: '0 0 2rem 0' }}>
      <RedCurve progress={scrollYProgress} />
      
      <div style={{ padding: '4rem var(--pad-x)', marginTop: '2rem', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={filter === cat ? "glass-pill" : ""}
              style={{
                background: filter === cat ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: filter === cat ? 'var(--fg)' : 'var(--fg-dim)',
                border: filter === cat ? '1px solid var(--glass-border)' : '1px solid transparent',
                padding: '0.6rem 1.5rem',
                borderRadius: '30px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: filter === cat ? 600 : 400
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 var(--pad-x)' }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj, idx) => (
            <ProjectRow key={proj.id} proj={proj} idx={idx} navigateWithTransition={navigateWithTransition} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Works;
