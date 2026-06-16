import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.76, 0, 0.24, 1];

const containerVariants = {
  hidden: {},
  visible: ({ stagger = 0.03, delay = 0 }) => ({
    transition: {
      staggerChildren: stagger,
      delayChildren: delay
    },
  }),
};

const childVariants = {
  hidden: { y: '100%', rotate: 2 },
  visible: { 
    y: '0%', 
    rotate: 0, 
    transition: { duration: 0.9, ease } 
  },
};

const TextReveal = ({ children, delay = 0, duration = 0.8, type = 'block', stagger = 0.015 }) => {
  // If it's just a block (like an element or standard string)
  if (type === 'block' || typeof children !== 'string') {
    return (
      <div style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'top' }}>
        <motion.div
          initial={{ y: '100%', rotate: 2 }}
          whileInView={{ y: '0%', rotate: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration, ease, delay }}
          style={{ transformOrigin: 'top left' }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // If it's chars or words
  const items = type === 'chars' ? children.split('') : children.split(' ');

  return (
    <motion.span
      variants={containerVariants}
      custom={{ stagger, delay }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      style={{ display: 'inline-block' }}
    >
      {items.map((item, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            variants={childVariants}
            style={{ 
              display: 'inline-block', 
              transformOrigin: 'top left',
              marginRight: type === 'words' && i !== items.length - 1 ? '0.25em' : '0' 
            }}
          >
            {item === ' ' ? '\u00A0' : item}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export default TextReveal;
