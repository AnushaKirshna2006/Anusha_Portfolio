import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PhysicsSkills from '../components/PhysicsSkills';
import ParticleBackground from '../components/ParticleBackground';
import { useSound } from '../components/SoundContext';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  },
  exit: { opacity: 0, y: 50, transition: { duration: 0.4 } }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  show: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
};

const Info = ({ onClose }) => {
  const { playSwoosh } = useSound();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    playSwoosh(); 
    return () => {
      document.body.style.overflow = '';
      playSwoosh(); 
    };
  }, [playSwoosh]);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={containerVariants}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 1000, background: '#050505',
        color: 'var(--fg)', overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <ParticleBackground />
      </div>

      {/* Top Header */}
      <motion.div variants={itemVariants} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2rem 4vw' }}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', margin: 0 }}>
          About
        </h1>
        <button 
          onClick={onClose} 
          className="link-hover" 
          style={{ 
            background: '#111', 
            border: '1px solid #333', 
            borderRadius: '50px',
            padding: '0.6rem 1.2rem',
            color: 'var(--fg)', 
            fontFamily: 'var(--font-mono)', 
            fontSize: '0.8rem', 
            fontWeight: 600, 
            letterSpacing: '0.05em', 
            cursor: 'pointer', 
            zIndex: 10,
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#222';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#111';
          }}
        >
          CLOSE
        </button>
      </motion.div>

      {/* Bento Grid */}
      <div className="bento-container" style={{ padding: '0 4vw 6rem', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        
        {/* Profile Card */}
        <motion.div variants={itemVariants} className="bento-item bento-profile">
          <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
            <img src="/assets/images/Profile.jpeg" alt="Anusha Kirshna" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', padding: '2rem 1rem 1rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600, color: '#fff' }}>Anusha Kirshna</h2>
              <div style={{ fontSize: '0.85rem', color: '#ccc', fontFamily: 'var(--font-mono)', marginTop: '0.5rem' }}>Software Eng. Student</div>
            </div>
          </div>
        </motion.div>

        {/* Intro Card */}
        <motion.div variants={itemVariants} className="bento-item bento-intro" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 1rem 0', lineHeight: 1.1 }}>
            Hi, I'm <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Anusha</span>.
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#aaa', margin: 0, fontWeight: 300 }}>
            I build tailor-made web applications where technical precision meets beautiful aesthetics. Passionate about UI/UX design, fluid interactions, and robust architectures, I always seek the perfect symbiosis between form and function.
          </p>
        </motion.div>

        {/* Status Card */}
        <motion.div variants={itemVariants} className="bento-item bento-status" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>LOCATION</div>
            <div style={{ fontWeight: 500, fontSize: '1.1rem' }}>Ras Al-Khaimah<br/>UAE</div>
          </div>
          <div style={{ marginTop: '2rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>STATUS</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, fontSize: '0.9rem', color: '#4ade80', background: 'rgba(74, 222, 128, 0.1)', padding: '0.5rem 1rem', borderRadius: '50px', width: 'fit-content' }}>
              <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }}></span>
              Available
            </div>
          </div>
        </motion.div>

        {/* Experience 1 Card */}
        <motion.div variants={itemVariants} className="bento-item bento-exp1" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em' }}>EXPERIENCE</div>
            <div style={{ background: '#222', padding: '0.3rem 0.8rem', borderRadius: '50px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#aaa' }}>2024 — 2026</div>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>Brand Ambassador</h4>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1rem' }}>Premium FMCG Brands</div>
          <p style={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.5, margin: 0 }}>
            Spearheaded cross-functional customer engagement campaigns across high-footfall retail environments. Developed strong communication and user-centric problem-solving skills.
          </p>
        </motion.div>

        {/* Email Card */}
        <motion.a href="mailto:anushakirshna@gmail.com" variants={itemVariants} className="bento-item bento-email" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: 'var(--accent)', color: '#000', textDecoration: 'none', transition: 'transform 0.3s ease' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1rem' }}>
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
          </svg>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>Let's Talk</div>
        </motion.a>

        {/* Education Card */}
        <motion.div variants={itemVariants} className="bento-item bento-edu" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em' }}>EDUCATION</div>
            <div style={{ background: '#222', padding: '0.3rem 0.8rem', borderRadius: '50px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#aaa' }}>2024 — 2028</div>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>BSc Computer Software Eng.</h4>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1rem' }}>University of Stirling, RAK</div>
          <p style={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.5, margin: 0 }}>
            Focusing on advanced algorithms, front-end optimization, and robust back-end systems. Building a strong foundation in scalable software architectures.
          </p>
        </motion.div>

        {/* Experience 2 Card */}
        <motion.div variants={itemVariants} className="bento-item bento-exp2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em' }}>EXPERIENCE</div>
            <div style={{ background: '#222', padding: '0.3rem 0.8rem', borderRadius: '50px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: '#aaa' }}>2024 — 2025</div>
          </div>
          <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.3rem', fontWeight: 600, margin: '0 0 0.3rem 0' }}>Data Entry Intern</h4>
          <div style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1rem' }}>RAK Dental Care</div>
          <p style={{ fontSize: '0.95rem', color: '#999', lineHeight: 1.5, margin: 0 }}>
            Extracted, cleaned, and structured large clinical datasets using SQL, reducing reporting turnaround time and ensuring data integrity.
          </p>
        </motion.div>

        {/* Skills Card */}
        <motion.div variants={itemVariants} className="bento-item bento-skills" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#777', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>SKILLS & TECH (INTERACTIVE)</div>
          <div style={{ flex: 1, minHeight: '300px', borderRadius: '16px', overflow: 'hidden', background: '#0a0a0a', position: 'relative' }}>
            <PhysicsSkills />
          </div>
        </motion.div>

      </div>

      {/* Global CSS for Bento Grid */}
      <style dangerouslySetInnerHTML={{__html: `
        .bento-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: minmax(180px, auto);
          gap: 1.5rem;
        }
        .bento-item {
          background: #111;
          border: 1px solid #222;
          border-radius: 24px;
          padding: 2rem;
          overflow: hidden;
          position: relative;
        }
        .bento-profile {
          grid-column: span 1;
          grid-row: span 2;
          padding: 0.5rem;
        }
        .bento-intro {
          grid-column: span 2;
          grid-row: span 1;
        }
        .bento-status {
          grid-column: span 1;
          grid-row: span 1;
        }
        .bento-exp1 {
          grid-column: span 2;
          grid-row: span 1;
        }
        .bento-email {
          grid-column: span 1;
          grid-row: span 1;
        }
        .bento-edu {
          grid-column: span 2;
          grid-row: span 1;
        }
        .bento-exp2 {
          grid-column: span 2;
          grid-row: span 1;
        }
        .bento-skills {
          grid-column: span 4;
          grid-row: span 2;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .bento-container {
            grid-template-columns: repeat(2, 1fr);
          }
          .bento-profile { grid-column: span 1; grid-row: span 2; }
          .bento-intro { grid-column: span 1; grid-row: span 2; }
          .bento-status { grid-column: span 1; grid-row: span 1; }
          .bento-email { grid-column: span 1; grid-row: span 1; }
          .bento-exp1 { grid-column: span 2; grid-row: span 1; }
          .bento-edu { grid-column: span 2; grid-row: span 1; }
          .bento-exp2 { grid-column: span 2; grid-row: span 1; }
          .bento-skills { grid-column: span 2; grid-row: span 2; }
        }

        @media (max-width: 640px) {
          .bento-container {
            grid-template-columns: 1fr;
          }
          .bento-profile, .bento-intro, .bento-status, .bento-email, .bento-exp1, .bento-edu, .bento-exp2, .bento-skills {
            grid-column: span 1;
            grid-row: auto;
          }
          .bento-profile {
            min-height: 300px;
          }
        }
      `}} />
    </motion.div>
  );
};

export default Info;

