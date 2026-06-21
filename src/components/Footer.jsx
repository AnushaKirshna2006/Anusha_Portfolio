import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { useTransition } from './TransitionContext';
import ParticleBackground from './ParticleBackground';
import Marquee from './Marquee';
import ScrambleText from './ScrambleText';

const Footer = () => {
  const { navigateWithTransition } = useTransition();
  const year = new Date().getFullYear();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = { timeZone: 'Asia/Dubai', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      setTime(new Date().toLocaleTimeString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Home', action: () => { window.scrollTo({ top: 0, behavior: 'smooth' }); } },
    { label: 'About', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); } },
    { label: 'Works', action: () => { document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' }); } },
    { label: 'Skills', action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); } },
  ];

  const pageLinks = [
    { label: 'Contact', action: () => navigateWithTransition('/contact') },
    { label: 'Certifications', action: () => navigateWithTransition('/certifications') },
  ];

  const socials = [
    { label: 'GitHub', url: 'https://github.com/AnushaKirshna2006', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/anusha-kirshna', icon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  ];

  return (
    <footer id="footer" style={{
      position: 'relative',
      padding: '0 var(--pad-x)',
      overflow: 'hidden'
    }}>
      <div className="glass-panel" style={{
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        borderBottom: 'none',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Interactive Particle Backdrop */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.8 }}>
          <ParticleBackground style={{ pointerEvents: 'auto' }} />
        </div>

        {/* Content Wrapper to sit above particles */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Top row: Available badge + Email */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          {/* Available for Hire badge */}
          <motion.div
            animate={{ boxShadow: ['0 0 15px rgba(74, 222, 128, 0.2)', '0 0 30px rgba(74, 222, 128, 0.4)', '0 0 15px rgba(74, 222, 128, 0.2)'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="glass-pill"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.7rem 1.5rem',
              border: '1px solid rgba(74, 222, 128, 0.3)',
              background: 'rgba(74, 222, 128, 0.05)'
            }}
          >
            <div style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: '#4ade80',
              boxShadow: '0 0 10px #4ade80'
            }} />
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#4ade80'
            }}>
              Available for Opportunities
            </span>
          </motion.div>

          <Magnetic>
            <a href="mailto:anushakirshna@gmail.com" className="link-hover" style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              fontWeight: 500,
              color: 'var(--fg)'
            }}>
              anushakirshna@gmail.com
            </a>
          </Magnetic>
        </div>

        {/* Footer columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          marginBottom: '2.5rem'
        }}>
          {/* Navigation */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--fg-muted)', display: 'block',
              marginBottom: '1.5rem'
            }}>
              Navigation
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {navLinks.map(link => (
                <Magnetic key={link.label}>
                  <button
                    onClick={link.action}
                    className="link-hover"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: 'var(--fg-dim)', textAlign: 'left',
                      padding: 0, fontWeight: 400
                    }}
                  >
                    <ScrambleText text={link.label} />
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--fg-muted)', display: 'block',
              marginBottom: '1.5rem'
            }}>
              Pages
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {pageLinks.map(link => (
                <Magnetic key={link.label}>
                  <button
                    onClick={link.action}
                    className="link-hover"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: 'var(--font-body)', fontSize: '0.9rem',
                      color: 'var(--fg-dim)', textAlign: 'left',
                      padding: 0, fontWeight: 400
                    }}
                  >
                    <ScrambleText text={link.label} />
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Socials */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--fg-muted)', display: 'block',
              marginBottom: '1.5rem'
            }}>
              Connect
            </span>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {socials.map(s => (
                <Magnetic key={s.label}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Quick Info */}
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              textTransform: 'uppercase', letterSpacing: '0.15em',
              color: 'var(--fg-muted)', display: 'block',
              marginBottom: '1.5rem'
            }}>
              Location
            </span>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '0.9rem',
              color: 'var(--fg-dim)', lineHeight: 1.6
            }}>
              Ras Al-Khaimah, UAE<br />
              <span style={{ color: 'var(--accent)', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{time || 'GMT+4'}</span>
            </p>
          </div>
        </div>

        {/* Big Glowing Hollow Typography */}
        <div style={{
          borderTop: '1px solid var(--glass-border)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '2rem'
        }}>
          <motion.h2 
            whileHover={{ 
              color: 'var(--accent)', 
              WebkitTextStroke: '0px transparent',
              scale: 1.02,
              textShadow: '0 0 40px rgba(0, 242, 254, 0.4)'
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.8,
              color: 'transparent',
              WebkitTextStroke: '1px var(--fg-dim)',
              margin: '1rem 0',
              textAlign: 'center',
              cursor: 'default'
            }}
          >
            ANUSHA
          </motion.h2>

          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '1.5rem',
            paddingBottom: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--fg-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <span>© {year} All Rights Reserved</span>
            <span style={{ color: 'var(--fg-dim)' }}>
              Made with <span style={{ color: '#ef4444' }}>♥</span> & React
            </span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="link-hover"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 'inherit',
                color: 'var(--accent)', letterSpacing: 'inherit',
                textTransform: 'uppercase', padding: 0
              }}
            >
              Back to Top ↑
            </button>
          </div>
        </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
