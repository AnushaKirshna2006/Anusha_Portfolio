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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
