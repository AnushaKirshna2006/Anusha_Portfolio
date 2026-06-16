import React from 'react';
import { motion } from 'framer-motion';

const TransitionPanel = ({ isActive, onCover }) => {
  return (
    <>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isActive ? 1 : 0 }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={(definition) => {
          if (definition.scaleY === 1 && onCover) {
            onCover();
          }
        }}
        className="glass-panel"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          transformOrigin: isActive ? 'bottom' : 'top',
          borderRadius: 0,
          border: 'none',
          pointerEvents: isActive ? 'auto' : 'none'
        }}
      />
    </>
  );
};

export default TransitionPanel;
