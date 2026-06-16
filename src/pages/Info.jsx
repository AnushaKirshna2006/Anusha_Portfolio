import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import PhysicsSkills from '../components/PhysicsSkills';
import ParticleBackground from '../components/ParticleBackground';
import { useSound } from '../components/SoundContext';

const Info = ({ onClose }) => {
  const { playSwoosh } = useSound();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    playSwoosh(); // Play on open
    return () => {
      document.body.style.overflow = '';
      playSwoosh(); // Play on close
    };
  }, [playSwoosh]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 1000, background: 'var(--bg)', color: 'var(--fg)', overflowY: 'auto',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div style={{ position: 'fixed', inset: 0, zIndex: -1 }}>
        <ParticleBackground />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '3rem 4rem' }}>
        <h1 style={{ fontFamily: 'var(--font-sans)', fontSize: '4rem', fontWeight: 500, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
          Info
        </h1>
        <button onClick={onClose} className="link-hover" style={{ background: 'none', border: 'none', color: 'var(--fg)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.05em', cursor: 'pointer', zIndex: 10 }}>
          BACK
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '8rem', padding: '0 4rem 4rem', flex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <div className="glass-panel" style={{ position: 'relative', width: '100%', aspectRatio: '0.85', marginBottom: '2rem', padding: '1rem' }}>
            <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', bottom: '1rem', background: 'transparent', zIndex: 1, overflow: 'hidden', borderRadius: '8px' }}>
               <img src="/assets/images/Profile.jpeg" alt="Anusha Kirshna" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scale(1.1)', transformOrigin: '50% 25%' }} />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '1.5rem', fontSize: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>BASED IN</span>
            <span style={{ fontWeight: 500 }}>Ras Al-Khaimah, UAE</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', fontSize: '0.75rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-dim)', letterSpacing: '0.05em' }}>STATUS</span>
            <span style={{ fontWeight: 500 }}>Looking for an internship</span>
          </div>

          <div style={{ marginTop: 'auto', paddingTop: '4rem' }}>
            <a href="mailto:anushakirshna@gmail.com" style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--fg)', textDecoration: 'none', fontWeight: 600 }}>
              anushakirshna@gmail.com
            </a>
          </div>
        </div>

        <div style={{ paddingTop: '2rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>ABOUT</div>
          
          <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(4rem, 8vw, 6rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 2rem 0', lineHeight: 1 }}>
            Anusha Kirshna.
          </h2>

          <div style={{ maxWidth: '700px', fontSize: '1.3rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)' }}>
            <p style={{ marginBottom: '1.5rem', fontWeight: 500 }}>
              Computing Software Engineering student at the University of Stirling, specialized in front-end development.
            </p>
            <p>
              I craft tailor-made web experiences where technical precision meets emotion. Passionate about <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>detail</span>, UI/UX design, and interaction, I always seek the symbiosis between art and information.
            </p>
          </div>

          <div style={{ marginTop: '4rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', maxWidth: '700px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>EDUCATION</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', marginTop: '0.3rem' }}>
                  2024 — 2028
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.2rem' }}>BSc Computer Software Eng</h4>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>University of Stirling, RAK</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Focusing on advanced algorithms, front-end optimization, and robust back-end systems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '4rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem', maxWidth: '700px' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '2rem' }}>EXPERIENCE</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', marginTop: '0.3rem' }}>
                  2024 — 2026
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.2rem' }}>Brand Ambassador</h4>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>Premium FMCG Brands</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Spearheaded cross-functional customer engagement campaigns across high-footfall retail environments.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', marginTop: '0.3rem' }}>
                  2024 — 2025
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.2rem' }}>Data Entry Intern</h4>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>RAK Dental Care</div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5 }}>
                    Extracted, cleaned, and structured large clinical datasets using SQL, reducing reporting turnaround time.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <PhysicsSkills />

        </div>
      </div>
    </motion.div>
  );
};

export default Info;
