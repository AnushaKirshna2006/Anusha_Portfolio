import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { Link } from 'react-router-dom';
import { certifications, CertCard } from '../components/Certifications';

const AllCertifications = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--fg)', 
      padding: '4rem var(--pad-x) 8rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <Magnetic>
          <Link to="/" className="link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg)', textDecoration: 'none' }}>
            &larr; BACK TO HOME
          </Link>
        </Magnetic>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Professional Development
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            All Certifications.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--fg-dim)', maxWidth: '600px', lineHeight: 1.6 }}>
            A complete log of my continuous learning journey, showcasing specialized courses and professional certifications.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%'
        }}>
          {certifications.map((cert, index) => (
            <CertCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllCertifications;
