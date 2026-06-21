import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';

const DownloadCV = () => {
  const [status, setStatus] = useState('idle'); // idle, downloading, done
  const { playGlassTap } = useSound();

  const handleDownload = () => {
    if (status !== 'idle') return;
    setStatus('downloading');
    
    // Simulate download progress
    setTimeout(() => {
      setStatus('done');
      playGlassTap();
      
      // Trigger actual download programmatically
      const link = document.createElement('a');
      link.href = '/assets/CV.pdf';
      link.download = 'Anusha_Kirshna_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset after a while
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <button 
      onClick={handleDownload}
      className={`glass-pill ${status === 'idle' ? 'link-hover' : ''}`}
      style={{
        background: status === 'done' ? 'rgba(74, 222, 128, 0.2)' : 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(10px)',
        color: status === 'done' ? '#4ade80' : 'var(--fg)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '1rem 2rem',
        border: `1px solid ${status === 'done' ? '#4ade80' : 'var(--glass-border)'}`,
        cursor: status === 'idle' ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.8rem',
        minWidth: '220px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease'
      }}
    >
      <AnimatePresence mode="wait">
        {status === 'idle' && (
          <motion.div 
            key="idle"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
            CURRICULUM VITAE
          </motion.div>
        )}
        
        {status === 'downloading' && (
          <motion.div 
            key="downloading"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              style={{ width: '16px', height: '16px', border: '2px solid var(--fg)', borderTopColor: 'transparent', borderRadius: '50%' }}
            />
            DOWNLOADING...
          </motion.div>
        )}
        
        {status === 'done' && (
          <motion.div 
            key="done"
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            SAVED
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar Background */}
      {status === 'downloading' && (
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          style={{ position: 'absolute', left: 0, bottom: 0, height: '3px', background: 'var(--accent)' }}
        />
      )}
    </button>
  );
};

export default DownloadCV;
