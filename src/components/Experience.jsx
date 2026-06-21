import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import TextReveal from './TextReveal';

const experiences = [
  {
    id: 1,
    year: '2024 - 2026',
    title: 'Brand Ambassador',
    company: 'Premium FMCG Brands — Almarai • London Dairy • Kiri',
    desc: 'Spearheaded cross-functional customer engagement campaigns across high-footfall retail environments. Applied user-centric problem-solving and consultative selling techniques.',
  },
  {
    id: 2,
    year: '2024 - 2025',
    title: 'Data Entry Intern',
    company: 'RAK Dental Care & Implant Centre — Ras Al-Khaimah, UAE',
    desc: 'Extracted, cleaned, and structured large clinical datasets using SQL. Architected interactive data visualization dashboards. Integrated external RESTful APIs for data analysis.',
  }
];

const ExperienceNode = ({ exp, index }) => {
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
        {index !== experiences.length - 1 && (
          <div style={{ width: '2px', height: '100%', background: 'linear-gradient(to bottom, var(--accent), transparent)', marginTop: '0.5rem' }} />
        )}
      </div>

      {/* Content */}
      <div className="glass-panel" style={{ flex: 1, padding: '2rem 3rem', display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '-1.5rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent)' }}>
          {exp.year}
        </div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--fg)', letterSpacing: '-0.02em' }}>
          {exp.title}
        </h3>
        <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-dim)', fontWeight: 500 }}>
          {exp.company}
        </h4>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--fg-dim)', lineHeight: 1.6, marginTop: '0.5rem' }}>
          {exp.desc}
        </p>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section id="experience" style={{ padding: '8rem var(--pad-x)', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em', textShadow: '0 0 30px rgba(255,255,255,0.1)' }}>
          <TextReveal type="chars">Experience.</TextReveal>
        </h2>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        {experiences.map((exp, index) => (
          <ExperienceNode key={exp.id} exp={exp} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Experience;
