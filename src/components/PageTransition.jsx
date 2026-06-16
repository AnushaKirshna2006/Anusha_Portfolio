import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { playTransitionSound } from '../utils/sounds';

const PageTransition = ({ children }) => {
  useEffect(() => {
    playTransitionSound();
  }, []);

  return (
    <>
      <motion.div
        className="t-panel-dark"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: 'fixed', width: '100%', height: '100%',
          background: 'var(--bg)', zIndex: 2, pointerEvents: 'none'
        }}
      />
      <motion.div
        className="t-panel-red"
        initial={{ y: "100%" }}
        animate={{ y: "-100%" }}
        exit={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{
          position: 'fixed', width: '100%', height: '100%',
          background: 'var(--accent)', zIndex: 1, pointerEvents: 'none'
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
