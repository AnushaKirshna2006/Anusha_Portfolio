import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';

const educations = [
  {
    id: 1,
    year: 'Sep 2024 - Jun 2028 (Expected)',
    title: 'BSc Computer Software Engineering',
    company: 'University of Stirling, RAK Campus',
    desc: 'Focusing on advanced algorithms, front-end optimization, and robust back-end systems. Expanding knowledge in modern frameworks and clean architecture.',
  },
  {
    id: 2,
    year: 'Completed 2024',
    title: 'Advanced Diploma — Computing Software Engineering',
    company: 'Scottish Qualifications Authority (SQA)',
    desc: 'UK-recognised computing & engineering qualification.',
  },
  {
    id: 3,
    year: 'Graduated Apr 2024',
    title: 'Grade 12',
    company: 'Degree College, Mithi',
    desc: 'High school graduation.',
  }
];

const EducationNode = ({ edu, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "center 50%"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div 
      ref={ref}
      style={{ opacity, scale, y, position: 'relative', display: 'flex', gap: '3rem', marginBottom: '4rem' }}
    >
      {/* Timeline Node / Line Connector */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ 
          width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)',
          boxShadow: '0 0 20px var(--accent)', border: '2px solid var(--bg)', zIndex: 2
        }} />
        {index !== educations.length - 1 && (
          <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, var(--accent), transparent)', marginTop: '0.5rem' }} />
        )}
      </div>

      {/* Content */}
      <div className="glass-panel" style={{ flex: 1, padding: '2rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '-1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>
          {edu.year}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
          {edu.title}
        </h3>
        <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-dim)', fontWeight: 500 }}>
          {edu.company}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--fg-dim)', lineHeight: 1.6, marginTop: '0.5rem' }}>
          {edu.desc}
        </p>
      </div>
    </motion.div>
  );
};

const Education = () => {
  return (
    <section id="education" style={{ padding: '8rem var(--pad-x)', position: 'relative', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255,255,255,0.1)' }}>
          <TextReveal type="chars">Education.</TextReveal>
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {educations.map((edu, index) => (
          <EducationNode key={edu.id} edu={edu} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Education;
