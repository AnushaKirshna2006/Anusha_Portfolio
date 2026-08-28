import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'works', label: 'Projects' },
  { id: 'contact', label: 'Contact' }
];

const NavDots = ({ isLoading, location }) => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Only run when not loading and on home page
    if (isLoading || (location && location.pathname !== '/')) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    let retryCount = 0;
    const interval = setInterval(() => {
      let foundAll = true;
      sections.forEach(({ id }) => {
        const el = document.getElementById(id);
        if (el) {
          if (!el.dataset.observed) {
            observer.observe(el);
            el.dataset.observed = 'true';
          }
        } else {
          foundAll = false;
        }
      });
      
      if (foundAll || retryCount > 10) {
        clearInterval(interval);
      }
      retryCount++;
    }, 200);

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, [isLoading, location]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Only render on main page where sections exist
  const isHomePage = location ? location.pathname === '/' : window.location.pathname === '/';
  if (!isHomePage) return null;

  return (
    <div className="nav-dots-wrapper" style={{
      position: 'fixed',
      right: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <div 
            key={section.id}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'flex-end',
              gap: '1rem',
              pointerEvents: 'auto',
              cursor: 'pointer'
            }}
            onClick={() => scrollToSection(section.id)}
            className="nav-dot-container"
          >
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--accent)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              {section.label}
            </motion.span>
            <motion.div
              animate={{ 
                height: isActive ? '24px' : '8px',
                backgroundColor: isActive ? 'var(--accent)' : 'rgba(255, 255, 255, 0.2)'
              }}
              transition={{ duration: 0.3 }}
              style={{
                width: '4px',
                borderRadius: '4px',
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NavDots;
