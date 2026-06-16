import React from 'react';
import { motion, useScroll } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX: scrollYProgress, width: '100%' }}
    />
  );
};

export default ScrollProgress;
