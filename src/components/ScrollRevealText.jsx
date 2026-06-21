import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const paragraph = "I believe great software is born at the intersection of logic and emotion. Every line of code I write is an opportunity to create something that not only works flawlessly but moves the people who use it. Design is not decoration — it is communication. I build experiences that respect the user, challenge convention, and push pixels to tell stories.";

const Word = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return (
    <span style={{ position: 'relative', display: 'inline-block', marginRight: '0.25em', marginTop: '0.25em' }}>
      <span style={{ position: 'absolute', opacity: 0.2 }}>{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};

const ScrollRevealText = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const words = paragraph.split(" ");

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10rem var(--pad-x)',
        position: 'relative'
      }}
    >
      {/* Decorative side label */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          left: 'var(--pad-x)',
          top: '10rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          color: 'var(--accent)',
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)'
        }}
      >
        Philosophy
      </motion.div>

      {/* Main text - Scroll-linked reveal */}
      <p 
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.5rem, 3.2vw, 3rem)',
          fontWeight: 500,
          lineHeight: 1.5,
          letterSpacing: '-0.02em',
          maxWidth: '1000px',
          textAlign: 'left',
          color: 'var(--fg)',
          display: 'flex',
          flexWrap: 'wrap'
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

      {/* Decorative gradient line */}
      <div style={{
        position: 'absolute',
        bottom: '5rem',
        left: '50%',
        transform: 'translateX(-50%) translateZ(0)',
        width: '120px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
        opacity: 0.4
      }} />
    </section>
  );
};

export default ScrollRevealText;
