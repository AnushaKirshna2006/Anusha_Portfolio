import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ParallaxImage from './ParallaxImage';

const paragraph = "I believe great software is born at the intersection of logic and emotion. Every line of code I write is an opportunity to create something that not only works flawlessly but moves the people who use it. Design is not decoration — it is communication. I build experiences that respect the user, challenge convention, and push pixels to tell stories.";

const projects = [
  { id: 1, num: '01', title: 'Virtual Study Buddy', img: '/assets/images/project1.png' },
  { id: 2, num: '02', title: 'Cosmic Weather App', img: '/assets/images/project2.png' },
  { id: 3, num: '03', title: 'Classic Game Suite', img: '/assets/images/project3.png' }
];

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  
  const cleanWord = children.replace(/[^a-zA-Z]/g, '').toLowerCase();
  const highlightWords = ['software', 'emotion', 'flawlessly', 'communication', 'experiences', 'stories'];
  const isHighlight = highlightWords.includes(cleanWord);

  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.25em', marginTop: '0.25em' }}>
      <span style={{ position: 'absolute', opacity: 0.1 }}>
        {isHighlight ? <span className="gradient-text" style={{ fontStyle: 'italic' }}>{children}</span> : children}
      </span>
      <motion.span style={{ opacity }}>
        {isHighlight ? (
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span className="gradient-text" style={{ fontStyle: 'italic' }}>{children}</span>
            <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', filter: 'blur(30px)', opacity: 0.3, zIndex: -1 }} />
          </span>
        ) : (
          children
        )}
      </motion.span>
    </span>
  );
};

const ScatterIntro = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const words = paragraph.split(" ");

  return (
    <section 
      id="projects-intro" 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        padding: '10rem var(--pad-x)', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8rem'
      }}
    >
      
      {/* Ambient background glow for depth */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60vw',
        height: '60vw',
        background: 'radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, transparent 60%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />





      {/* Main text - Scroll-linked reveal */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '1500px', width: '95%', margin: '0 auto' }}>
        <p 
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 4.5vw, 4rem)',
            fontWeight: 600,
            lineHeight: 1.2,
            letterSpacing: '-0.03em',
            textAlign: 'center',
            justifyContent: 'center',
            color: 'var(--fg)',
            display: 'flex',
            flexWrap: 'wrap',
            textShadow: '0 20px 40px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          {words.map((word, i) => {
            const start = i / words.length;
            const end = start + (1 / words.length);
            return (
              <Word key={i} progress={scrollYProgress} range={[start, end]}>
                {word}
              </Word>
            );
          })}
        </p>
      </div>

    </section>
  );
};

export default ScatterIntro;
