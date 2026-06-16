import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PhysicsSkills from './PhysicsSkills';

const skillsData = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'TailwindCSS', 'Framer Motion']
  },
  {
    category: 'Backend & Data',
    items: ['Node.js', 'MongoDB', 'RESTful APIs', 'SQL']
  },
  {
    category: 'Design & Tools',
    items: ['UI/UX Design', 'Figma', 'Adobe Photoshop', 'Git']
  },
  {
    category: 'Domains',
    items: ['Web Development', 'Data Analysis', 'Interactive Experiences']
  },
  {
    category: 'Certificates',
    items: ['Data Science - R basics (edX)', 'Adobe Photoshop (Alison)', 'AI Conference (/function)']
  }
];

const Skills = () => {
  const [openCategory, setOpenCategory] = useState('Frontend');

  return (
    <section id="skills" style={{ 
      position: 'relative', 
      minHeight: '100vh', 
      width: '100%', 
      padding: '10rem var(--pad-x)',
      display: 'flex',
      flexDirection: 'column',
      color: 'var(--fg)',
      background: 'var(--bg)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', width: '100%' }}>
        
        {/* Left Side (Sticky Bio) */}
        <div style={{ position: 'sticky', top: '10rem', height: 'fit-content' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontSize: '0.85rem', marginBottom: '2rem', fontFamily: 'var(--font-body)', fontWeight: 600 }}
          >
            Skills
          </motion.div>
          
          <h2 style={{ 
            fontFamily: 'var(--font-body)', 
            fontSize: 'clamp(1.5rem, 2vw, 2.5rem)', 
            fontWeight: 700, 
            lineHeight: 1.3, 
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            marginBottom: '3rem',
            maxWidth: '95%'
          }}>
            COMPUTING SOFTWARE ENGINEERING STUDENT AT UNIVERSITY OF STIRLING, SPECIALIZED IN FRONT-END DEVELOPMENT, PASSIONATE ABOUT UI/UX DESIGN.
          </h2>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', width: '100%' }}
          >
            <a href="mailto:anushakirshna@gmail.com" className="link-hover" style={{ 
              fontSize: '0.8rem', 
              fontWeight: 700, 
              fontFamily: 'var(--font-body)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--fg)'
            }}>
              CONTACT ME +
            </a>
          </motion.div>
          
          {/* Decorative Horizontal Red Arrow */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '8rem', color: '#ff3300' }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 20H80V0L120 30L80 60V40H0V20Z" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>

        {/* Right Side (Accordion) */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '3rem' }}>
          {skillsData.map((skill, index) => {
            const isOpen = openCategory === skill.category;
            
            return (
              <motion.div 
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
                style={{ 
                  paddingBottom: '2.5rem',
                  marginBottom: '1rem'
                }}
              >
                <button 
                  onClick={() => setOpenCategory(isOpen ? null : skill.category)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'none',
                    border: 'none',
                    color: 'var(--fg)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '2rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 0
                  }}
                >
                  <span className="link-hover">{skill.category}</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 300, color: 'var(--fg-dim)' }}>
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>
                        {skill.items.map(item => (
                          <div key={item} style={{ 
                            color: 'var(--fg-dim)', 
                            fontFamily: 'var(--font-body)', 
                            fontSize: '1rem'
                          }}>
                            {item}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
      </div>
      
      {/* Interactive Physics Skills Playground */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', marginTop: '6rem' }}
      >
        <PhysicsSkills />
      </motion.div>

    </section>
  );
};

export default Skills;
