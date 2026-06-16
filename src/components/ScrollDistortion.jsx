import React from 'react';
import { motion, useScroll, useVelocity, useTransform, useSpring } from 'framer-motion';

const ScrollDistortion = ({ children }) => {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the velocity to prevent jitter
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 300
  });
  
  // Map velocity to a slightly more pronounced rubber-band skew (-4deg to 4deg)
  const skewY = useTransform(smoothVelocity, [-1500, 1500], [4, -4]);

  return (
    <motion.div style={{ skewY, transformOrigin: 'center center' }}>
      {children}
    </motion.div>
  );
};

export default ScrollDistortion;
