import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import ImageParallax from '../components/ImageParallax';

const projects = [
  {
    id: 1,
    title: 'Virtual Study Buddy',
    type: 'Full-Stack Web App',
    year: '2026',
    img: '/assets/images/project1.png',
    overview: 'A full-stack web application connecting university students for peer-to-peer collaborative learning, with a focus on intuitive UX and inclusive design.',
    challenge: 'Students often struggle to find peers with similar academic goals and learning styles. The challenge was to create a real-time matching system that was both performant and easily accessible.',
    solution: 'Developed a custom matching algorithm based on user preferences and integrated WebSockets for real-time chat. Built with a robust MongoDB backend and secured with JWT authentication.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'JWT Auth'],
    lessonsLearned: 'Gained deep experience in real-time bidirectional communication using WebSockets and managing complex global state in React.',
  },
  {
    id: 2,
    title: 'Cosmic Weather App',
    type: 'Frontend Weather',
    year: '2025',
    img: '/assets/images/project2.png',
    overview: 'A fully responsive weather forecasting application that fetches and renders real-time meteorological data with sub-second load performance across device breakpoints.',
    challenge: 'Handling asynchronous API requests seamlessly without blocking the UI, while ensuring the application remained highly accessible and visually striking.',
    solution: 'Utilized the Open-Meteo API for reliable weather data, implementing intelligent caching and React suspense. Designed the UI meticulously with TailwindCSS for fluid responsiveness.',
    techStack: ['React', 'TailwindCSS', 'Open-Meteo API', 'Framer Motion'],
    lessonsLearned: 'Mastered responsive design principles with TailwindCSS and optimized frontend performance for rendering large datasets quickly.',
  },
  {
    id: 3,
    title: 'Classic Game Suite',
    type: 'OOP Desktop/Web',
    year: '2026',
    img: '/assets/images/project3.png',
    overview: 'Engineered game logic and polished user interfaces for Sokoban, Tic-Tac-Toe, and Rock Paper Scissors, focusing on clean architecture.',
    challenge: 'Structuring the codebase in a way that allowed multiple distinct games to share core engine utilities without tight coupling.',
    solution: 'Applied rigorous Object-Oriented Programming (OOP) principles, specifically leveraging the State and Strategy design patterns to encapsulate game logic effectively.',
    techStack: ['Java', 'VB.NET', 'OOP Principles', 'Design Patterns'],
    lessonsLearned: 'Strengthened understanding of clean architecture, code reusability, and applying classical design patterns to solve practical problems.',
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id)) || projects[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <section style={{ 
        minHeight: '100vh', 
        background: 'var(--bg)', 
        color: 'var(--fg)', 
        padding: '4rem var(--pad-x) 8rem',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
          <Magnetic><Link to="/#works" className="link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg)' }}>← BACK TO WORKS</Link></Magnetic>
        </nav>

        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 8vw, 8rem)', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '2rem' }}
        >
          {project.title}
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--fg-dim)', display: 'flex', gap: '2rem', marginBottom: '4rem' }}
        >
          <span>{project.type}</span>
          <span>{project.year}</span>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{ width: '100%', height: '60vh', borderRadius: '12px', overflow: 'hidden', marginBottom: '6rem', padding: '1rem' }}
        >
          <div style={{ width: '100%', height: '100%', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
            <ImageParallax style={{ width: '100%', height: '100%' }} offset={80}>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImageParallax>
          </div>
        </motion.div>

        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          
          {/* Overview & Tech Stack */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}
          >
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Overview</h3>
              <p style={{ fontSize: '1.3rem', lineHeight: 1.6, color: 'var(--fg)', fontFamily: 'var(--font-sans)' }}>{project.overview}</p>
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Tech Stack</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {project.techStack.map(tech => (
                  <span key={tech} style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', color: 'var(--fg)', border: '1px solid var(--glass-border)', borderRadius: '30px', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* The Challenge & The Solution */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>The Challenge</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--fg-dim)', fontFamily: 'var(--font-sans)' }}>{project.challenge}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>The Solution</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--fg-dim)', fontFamily: 'var(--font-sans)' }}>{project.solution}</p>
          </motion.div>

          {/* Lessons Learned */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel"
            style={{ padding: '3rem' }}
          >
            <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Lessons Learned</h3>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.7, color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontStyle: 'italic' }}>"{project.lessonsLearned}"</p>
          </motion.div>

        </div>
      </section>
    </motion.main>
  );
};

export default ProjectDetails;

