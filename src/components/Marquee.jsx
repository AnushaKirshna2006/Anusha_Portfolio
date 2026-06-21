import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, wrap, useMotionValue } from 'framer-motion';

const Marquee = ({ text = "HTML/CSS • JAVASCRIPT • REACT • TAILWINDCSS • NODE.JS • UI/UX DESIGN • FIGMA • MONGODB • " }) => {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  });

  const x = useTransform(baseX, (v) => `${wrap(0, -50, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.01 * (delta / 16); // even slower default

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div style={{
      width: '100%', overflow: 'hidden', padding: '2rem 0', 
      borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)'
    }}>
      <motion.div
        whileHover={{ 
          color: 'var(--accent)', 
          WebkitTextStroke: '0px transparent',
          scale: 1.05
        }}
        transition={{ 
          color: { duration: 0.3 },
          scale: { duration: 0.3, type: 'spring', stiffness: 300 }
        }}
        style={{
          display: 'flex',
          whiteSpace: 'nowrap',
          width: 'max-content',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 6vw, 6rem)', // Adjusted size
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px var(--fg-dim)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          cursor: 'pointer',
          x
        }}
      >
        <div style={{ display: 'flex', whiteSpace: 'nowrap', width: 'max-content' }}>
          <span style={{ paddingRight: '2rem' }}>{text} {text} {text} {text} </span>
          <span style={{ paddingRight: '2rem' }}>{text} {text} {text} {text} </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
