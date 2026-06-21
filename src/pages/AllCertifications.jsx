import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { Link } from 'react-router-dom';
import { certifications, CertCard, CertDetailModal, FilterPills, platforms } from '../components/Certifications';

const AllCertifications = () => {
  const [filter, setFilter] = useState('All');
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filtered = filter === 'All'
    ? certifications
    : certifications.filter(c => c.platform === filter);

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
          style={{ marginBottom: '3rem' }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            Professional Development
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            All Certifications.
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', color: 'var(--fg-dim)', maxWidth: '600px', lineHeight: 1.6 }}>
            A complete log of my continuous learning journey. Click on any certification to see the details.
          </p>
        </motion.div>

        {/* Filter by Platform */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <FilterPills categories={platforms} active={filter} onSelect={setFilter} />
        </motion.div>

        {/* Results count */}
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          color: 'var(--fg-muted)',
          marginBottom: '2rem',
          letterSpacing: '0.05em'
        }}>
          Showing {filtered.length} of {certifications.length} certifications
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          width: '100%'
        }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, index) => (
              <motion.div
                key={cert.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <CertCard cert={cert} index={index} onSelect={setSelectedCert} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            fontFamily: 'var(--font-body)',
            color: 'var(--fg-dim)',
            fontSize: '1.1rem'
          }}>
            No certifications found for this platform.
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertDetailModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default AllCertifications;
