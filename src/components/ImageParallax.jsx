import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ImageParallax = ({ children, offset = 50, style = {}, className = '' }) => {
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div 
      ref={ref} 
      className={className} 
      style={{ ...style, overflow: 'hidden', position: 'relative' }}
    >
      <motion.div 
        style={{ y, width: '100%', height: '100%', scale: 1.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ImageParallax;
