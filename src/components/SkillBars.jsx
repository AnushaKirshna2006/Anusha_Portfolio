import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const AnimatedBar = ({ skill, level, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const startTime = Date.now() + delay * 1000;

    const animate = () => {
      const now = Date.now();
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * level));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, level, delay]);

  return (
    <div ref={ref} style={{ marginBottom: '1.5rem' }}>
      {/* Label row */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'baseline', marginBottom: '0.6rem'
      }}>
        <span style={{
          fontFamily: 'var(--font-body)', fontSize: '0.95rem',
          fontWeight: 500, color: 'var(--fg)'
        }}>
          {skill}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          color: 'var(--accent)', fontWeight: 600
        }}>
          {count}%
        </span>
      </div>

      {/* Bar track */}
      <div style={{
        width: '100%', height: '6px',
        background: 'rgba(255, 255, 255, 0.06)',
        borderRadius: '6px', overflow: 'hidden',
        position: 'relative'
      }}>
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay: delay,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--accent), var(--accent-2))',
            borderRadius: '6px',
            position: 'relative'
          }}
        >
          {/* Glow dot at the end */}
          <div style={{
            position: 'absolute',
            right: '-3px', top: '50%',
            transform: 'translateY(-50%)',
            width: '12px', height: '12px',
            borderRadius: '50%',
            background: 'var(--accent-2)',
            boxShadow: '0 0 12px var(--accent), 0 0 4px var(--accent-2)',
            opacity: isInView ? 1 : 0,
            transition: 'opacity 0.3s ease 1.5s'
          }} />
        </motion.div>
      </div>
    </div>
  );
};

const SkillBars = ({ skills }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {skills.map((s, i) => (
        <AnimatedBar
          key={s.name}
          skill={s.name}
          level={s.level}
          delay={i * 0.1}
        />
      ))}
    </div>
  );
};

export default SkillBars;
