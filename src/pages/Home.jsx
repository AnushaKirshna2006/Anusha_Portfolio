import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroCanvas from '../components/HeroCanvas';
import Magnetic from '../components/Magnetic';

const Home = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);

  const [typeText, setTypeText] = useState('');
  const fullText = "Software Engineer";
  
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypeText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 150);
    return () => clearInterval(typing);
  }, []);

  return (
    <section id="home" ref={containerRef} className="scroll-wrap visible" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <HeroCanvas />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
        <motion.div style={{ padding: '0 var(--pad-x)', width: '100%', y, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* MASSIVE TYPOGRAPHY */}
          <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(5rem, 15vw, 12rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                color: 'var(--fg)',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
              }}
            >
              CRAFTING
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(5rem, 15vw, 12rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                margin: 0,
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '3px var(--accent)',
                fontStyle: 'italic',
                marginLeft: '5vw',
                filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.4))'
              }}
            >
              DIGITAL
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(5rem, 15vw, 12rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                color: 'var(--fg)',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
              }}
            >
              REALITIES
            </motion.h1>
          </div>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', 
              color: 'var(--fg-dim)', 
              maxWidth: '800px', 
              lineHeight: 1.6,
              marginTop: '3rem',
              marginBottom: '2rem',
              zIndex: 10
            }}
          >
            Hi, I'm Anusha. Translating complex logic into immersive digital experiences.
          </motion.p>

          {/* CURRENTLY STATUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem', 
              color: 'var(--fg-dim)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '4rem',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            CURRENTLY: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{typeText}</span>
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              style={{ width: '8px', height: '16px', background: 'var(--accent)' }}
            />
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', zIndex: 10, flexWrap: 'wrap' }}
          >
            <Magnetic>
              <button 
                onClick={() => {
                  const el = document.getElementById('works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="link-hover glass-pill"
                style={{
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '1rem 2rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                EXPLORE INDEX &rarr;
              </button>
            </Magnetic>
            
            <Magnetic>
              <a href="/assets/CV.pdf" download style={{ textDecoration: 'none' }}>
                <button 
                  className="link-hover glass-pill"
                  style={{
                    background: 'rgba(20, 20, 20, 0.6)',
                    backdropFilter: 'blur(10px)',
                    color: 'var(--fg)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    padding: '1rem 2rem',
                    border: '1px solid var(--glass-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem'
                  }}
                >
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
                  CURRICULUM VITAE
                </button>
              </a>
            </Magnetic>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Home;
