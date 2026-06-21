import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SkillBars from './SkillBars';

const skillsData = [
  {
    category: 'Frontend',
    skills: [
      { name: 'HTML', level: 95 },
      { name: 'CSS', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'React', level: 88 },
      { name: 'TailwindCSS', level: 82 },
      { name: 'Framer Motion', level: 78 }
    ]
  },
  {
    category: 'Backend & Data',
    skills: [
      { name: 'Node.js', level: 75 },
      { name: 'MongoDB', level: 72 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'RESTful APIs', level: 80 },
      { name: 'SQL', level: 70 }
    ]
  },
  {
    category: 'Design & Tools',
    skills: [
      { name: 'UI/UX Design', level: 85 },
      { name: 'Figma', level: 80 },
      { name: 'Adobe Photoshop', level: 75 },
      { name: 'Git', level: 82 }
    ]
  },
  {
    category: 'Domains',
    skills: [
      { name: 'Web Development', level: 92 },
      { name: 'Data Analysis', level: 70 },
      { name: 'Interactive Experiences', level: 78 }
    ]
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
      color: 'var(--fg)'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', width: '100%' }}>
        
        {/* Left Side (Sticky Bio) */}
        <div style={{ position: 'sticky', top: '10rem', height: 'fit-content' }}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
          
          {/* Decorative Horizontal Blue Arrow */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ marginTop: '8rem', color: 'var(--accent)', display: 'inline-block' }}
          >
            <motion.div
              initial={{ x: 0 }}
              whileInView={{ x: [0, "35vw", 0] }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 3, delay: 0.8, ease: "easeInOut" }}
              style={{ filter: 'drop-shadow(0 0 10px var(--accent)) drop-shadow(0 0 25px var(--accent))' }}
            >
              <svg width="200" height="100" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20H80V0L120 30L80 60V40H0V20Z" fill="currentColor"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Side (Accordion with Skill Bars) */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '3rem' }}>
          {skillsData.map((skill, index) => {
            const isOpen = openCategory === skill.category;
            
            return (
              <motion.div 
                key={skill.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 1.2, delay: 0.2 + (index * 0.1), ease: [0.16, 1, 0.3, 1] }}
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
                      <div style={{ paddingTop: '2rem' }}>
                        <SkillBars skills={skill.skills} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        
      </div>
      
    </section>
  );
};

export default Skills;
