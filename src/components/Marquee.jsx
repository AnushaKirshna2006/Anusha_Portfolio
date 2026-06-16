import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, useVelocity, useAnimationFrame, wrap, useMotionValue } from 'framer-motion';

const Marquee = ({ text = "DIGITAL ALCHEMIST • FRONTEND ARCHITECT • WEBGL EXPERT • " }) => {
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

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * -0.05 * (delta / 16); // slightly faster default

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
      width: '100%', overflow: 'hidden', padding: '4rem 0', 
      background: 'var(--bg)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)'
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
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 10rem)', // MASSIVE
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '2px var(--fg-dim)',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          cursor: 'pointer',
          x
        }}
      >
        <div style={{ paddingRight: '2rem', display: 'flex', gap: '2rem' }}>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Marquee;
