import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useTransition } from './TransitionContext';
import TiltCard from './TiltCard';

const projects = [
  {
    id: 1,
    num: '01',
    title: 'Virtual Study Buddy',
    subtitle: 'Full-Stack Web App',
    img: '/assets/images/project1.png',
    color: 'rgba(0, 242, 254, 0.15)'
  },
  {
    id: 2,
    num: '02',
    title: 'Cosmic Weather',
    subtitle: 'Frontend Application',
    img: '/assets/images/project2.png',
    color: 'rgba(79, 172, 254, 0.15)'
  },
  {
    id: 3,
    num: '03',
    title: 'Classic Game Suite',
    subtitle: 'OOP Desktop/Web',
    img: '/assets/images/project3.png',
    color: 'rgba(74, 222, 128, 0.15)'
  }
];

const FeaturedProjects = () => {
  const { navigateWithTransition } = useTransition();
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Track active card index for the counter
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(
      projects.length - 1,
      Math.floor(v * projects.length)
    );
    setActiveIndex(idx);
  });

  return (
    <section
      ref={sectionRef}
      id="featured-projects"
      style={{
        position: 'relative',
        padding: '6rem var(--pad-x)'
      }}
    >
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '4rem'
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--accent)'
        }}>
          Featured Work
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--fg-muted)',
          letterSpacing: '0.1em'
        }}>
          {projects.length} PROJECTS
        </span>
      </motion.div>

      {/* Project Cards — Stacked Vertical Layout */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(2rem, 4vw, 4rem)'
      }}>
        {projects.map((proj, idx) => (
          <FeaturedCard
            key={proj.id}
            proj={proj}
            idx={idx}
            navigateWithTransition={navigateWithTransition}
          />
        ))}
      </div>
    </section>
  );
};

const FeaturedCard = ({ proj, idx, navigateWithTransition }) => {
  const cardRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = proj.img;
    img.onload = () => setIsLoaded(true);
  }, [proj.img]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax on the background image
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);

  // Card entrance
  const cardY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);

  const isEven = idx % 2 === 0;

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity: cardOpacity,
        y: cardY
      }}
    >
      <TiltCard intensity={8}>
        <div
          onClick={() => navigateWithTransition(`/project/${proj.id}`)}
          className="glass-panel"
          style={{
            display: 'grid',
            gridTemplateColumns: isEven ? '1.4fr 1fr' : '1fr 1.4fr',
            gap: 0,
            minHeight: 'clamp(350px, 50vh, 500px)',
            cursor: 'pointer',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          {/* Image Side */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
          order: isEven ? 1 : 2
        }}>
          <motion.div style={{
            position: 'absolute', inset: '-15%',
            backgroundImage: `url(${proj.img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: imgY,
            scale: imgScale
          }} />
          <AnimatePresence>
            {!isLoaded && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="shimmer"
                style={{
                  position: 'absolute',
                  inset: '-15%',
                  zIndex: 2,
                  pointerEvents: 'none'
                }}
              />
            )}
          </AnimatePresence>
          {/* Gradient overlay on image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: isEven
              ? 'linear-gradient(to right, transparent 60%, rgba(3,3,5,0.8) 100%)'
              : 'linear-gradient(to left, transparent 60%, rgba(3,3,5,0.8) 100%)'
          }} />
        </div>

        {/* Content Side */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 4rem)',
          position: 'relative',
          order: isEven ? 2 : 1,
          background: `linear-gradient(135deg, rgba(3,3,5,0.7), ${proj.color})`
        }}>
          {/* Large number watermark */}
          <div style={{
            position: 'absolute',
            top: '1rem',
            right: isEven ? '1.5rem' : 'auto',
            left: isEven ? 'auto' : '1.5rem',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 12vw, 10rem)',
            fontWeight: 900,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            lineHeight: 1,
            pointerEvents: 'none',
            userSelect: 'none'
          }}>
            {proj.num}
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '1rem'
          }}>
            {proj.subtitle}
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: 'var(--fg)',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            {proj.title}
          </h3>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            color: 'var(--fg-dim)',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '0.3rem',
            width: 'fit-content',
            transition: 'color 0.3s ease'
          }}>
            View Project
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
};

export default FeaturedProjects;
