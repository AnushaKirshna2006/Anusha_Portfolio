import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import Spline from '@splinetool/react-spline';
import SEO from '../components/SEO';

const projects = [
  {
    id: 1,
    title: 'Virtual Study Buddy',
    type: 'Full-Stack Web App',
    year: '2026',
    img: '/assets/images/Picture1.png',
    overview: 'A full-stack web application connecting university students for peer-to-peer collaborative learning, with a focus on intuitive UX and inclusive design. It seamlessly integrates advanced filtering systems to group users by their study preferences and time zones. The platform also offers interactive whiteboarding and resource-sharing capabilities to simulate an immersive, real-world study environment, drastically enhancing remote educational experiences.',
    challenge: 'Students often struggle to find peers with similar academic goals and learning styles. The challenge was to create a real-time matching system that was both performant and easily accessible.',
    solution: 'Developed a custom matching algorithm based on user preferences and integrated WebSockets for real-time chat. Built with a robust MongoDB backend and secured with JWT authentication.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'JWT Auth'],
    splineUrl: null
  },
  {
    id: 2,
    title: 'Cosmic Weather App',
    type: 'Frontend Weather',
    year: '2025',
    img: '/assets/images/project2.png',
    overview: 'A fully responsive weather forecasting application that fetches and renders real-time meteorological data with sub-second load performance across device breakpoints. It features dynamic weather-driven animations, an interactive global map for location selection, and a comprehensive 7-day forecast with hourly breakdowns. The design utilizes deep atmospheric colors and micro-interactions that elevate the mundane task of checking the weather into a visually engaging experience.',
    challenge: 'Handling asynchronous API requests seamlessly without blocking the UI, while ensuring the application remained highly accessible and visually striking.',
    solution: 'Utilized the Open-Meteo API for reliable weather data, implementing intelligent caching and React suspense. Designed the UI meticulously with TailwindCSS for fluid responsiveness.',
    techStack: ['React', 'TailwindCSS', 'Open-Meteo API', 'Framer Motion'],
    splineUrl: null
  },
  {
    id: 3,
    title: 'Classic Game Suite',
    type: 'OOP Desktop/Web',
    year: '2026',
    img: '/assets/images/project3.png',
    overview: 'Engineered game logic and polished user interfaces for Sokoban, Tic-Tac-Toe, and Rock Paper Scissors, focusing on clean architecture. This suite demonstrates deep expertise in system design by managing complex game states, scoring systems, and AI opponent logic within a unified framework. It offers customizable themes, difficulty levels, and persistent local high scores, providing a nostalgic yet modernized gaming experience.',
    challenge: 'Structuring the codebase in a way that allowed multiple distinct games to share core engine utilities without tight coupling.',
    solution: 'Applied rigorous Object-Oriented Programming (OOP) principles, specifically leveraging the State and Strategy design patterns to encapsulate game logic effectively.',
    techStack: ['Java', 'VB.NET', 'OOP Principles', 'Design Patterns'],
    splineUrl: null
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id)) || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion variants for Bento Tiles
  const tileVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i) => ({
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const tileStyle = {
    background: 'rgba(20, 20, 20, 0.4)',
    border: '1px solid rgba(0, 242, 254, 0.1)',
    backdropFilter: 'blur(12px)',
    borderRadius: '24px',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative'
  };

  return (
    <>
      <SEO 
        title={project.title} 
        description={project.overview} 
        url={`/project/${id}`} 
        image={project.img} 
      />
      <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        background: 'var(--bg)',
        color: 'var(--fg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '2rem var(--pad-x)',
        zIndex: 99
      }}
    >
      {/* Top Navigation */}
      <nav style={{ marginBottom: '1.5rem', flexShrink: 0 }}>
        <Magnetic>
          <Link to="/#works" className="link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg)', textDecoration: 'none' }}>
            ← BACK
          </Link>
        </Magnetic>
      </nav>

      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: '1.5rem',
        minHeight: 0
      }}>

        {/* Tile 1: Massive Image (Spans Col 1-2, Row 1-3) */}
        <motion.div 
          custom={0} initial="hidden" animate="visible" variants={tileVariants}
          style={{ ...tileStyle, gridColumn: '1 / 3', gridRow: '1 / 4', padding: '10px' }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
            {project.splineUrl ? (
              <Spline scene={project.splineUrl} style={{ width: '100%', height: '100%', cursor: 'grab' }} />
            ) : (
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'rgba(0,0,0,0.3)', borderRadius: '16px' }} />
            )}
            {project.splineUrl && (
              <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent)', pointerEvents: 'none', background: 'rgba(0,0,0,0.5)', padding: '0.3rem 0.6rem', borderRadius: '50px', backdropFilter: 'blur(4px)', border: '1px solid rgba(0, 242, 254, 0.2)' }}>
                Interactive 3D — Drag to rotate
              </div>
            )}
          </div>
        </motion.div>

        {/* Tile 2: Title & Details (Spans Col 3-4, Row 1) */}
        <motion.div 
          custom={1} initial="hidden" animate="visible" variants={tileVariants}
          style={{ ...tileStyle, gridColumn: '3 / 5', gridRow: '1 / 2', justifyContent: 'center' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 4.5rem)', lineHeight: 0.9, letterSpacing: '-0.03em', margin: 0 }}>
              {project.title}
            </h1>
            <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '1rem' }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{project.year}</span>
              <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-dim)', textTransform: 'uppercase' }}>{project.type}</span>
            </div>
          </div>
        </motion.div>

        {/* Tile 3: Overview (Spans Col 3, Row 2-3) */}
        <motion.div 
          custom={2} initial="hidden" animate="visible" variants={tileVariants}
          style={{ ...tileStyle, gridColumn: '3 / 4', gridRow: '2 / 4' }}
        >
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent)', display: 'inline-block' }}></span>
            Overview
          </h3>
          <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--fg)', fontFamily: 'var(--font-sans)', margin: 0, overflowY: 'auto' }}>
            {project.overview}
          </p>
        </motion.div>

        {/* Tile 4: Challenge & Solution (Spans Col 4, Row 2) */}
        <motion.div 
          custom={3} initial="hidden" animate="visible" variants={tileVariants}
          style={{ ...tileStyle, gridColumn: '4 / 5', gridRow: '2 / 3', background: 'rgba(0, 242, 254, 0.05)', borderColor: 'rgba(0, 242, 254, 0.2)' }}
        >
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--fg)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.8rem' }}>Challenge & Solution</h3>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--fg-dim)', fontFamily: 'var(--font-sans)', margin: 0, overflowY: 'auto' }}>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Challenge:</span> {project.challenge}
            <br/><br/>
            <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Solution:</span> {project.solution}
          </p>
        </motion.div>

        {/* Tile 5: Tech Stack (Spans Col 4, Row 3) */}
        <motion.div 
          custom={4} initial="hidden" animate="visible" variants={tileVariants}
          style={{ ...tileStyle, gridColumn: '4 / 5', gridRow: '3 / 4', justifyContent: 'center' }}
        >
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' }}>Tech Stack</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', overflowY: 'auto' }}>
            {project.techStack.map(tech => (
              <span key={tech} style={{ padding: '0.4rem 0.8rem', background: 'rgba(255,255,255,0.05)', color: 'var(--fg)', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </motion.main>
    </>
  );
};

export default ProjectDetails;
