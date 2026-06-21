import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const AmbientAura = () => {
  const [isVisible, setIsVisible] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Moderate damping for a smooth but responsive cyber glow
  const springX = useSpring(x, { stiffness: 60, damping: 20 });
  const springY = useSpring(y, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      x.set(e.clientX - 300); // Offset by half width
      y.set(e.clientY - 300); // Offset by half height
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, isVisible]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Autonomous slow-moving Electric Blue Orb */}
      <motion.div
        animate={{
          x: ['0vw', '40vw', '-20vw', '50vw', '0vw'],
          y: ['0vh', '50vh', '80vh', '20vh', '0vh'],
        }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        style={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          maxWidth: '1200px',
          maxHeight: '1200px',
          background: 'radial-gradient(circle, rgba(79,172,254,0.08) 0%, rgba(79,172,254,0.02) 40%, transparent 70%)',
          filter: 'blur(100px)',
          top: '-10%',
          left: '-10%',
          willChange: 'transform'
        }}
      />

      {/* Mouse-following Cyan Orb */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        style={{
          position: 'absolute',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(0,242,254,0.12) 0%, rgba(0,242,254,0.03) 40%, transparent 70%)',
          filter: 'blur(80px)',
          x: springX,
          y: springY,
          willChange: 'transform'
        }}
      />
    </div>
  );
};

export default AmbientAura;
