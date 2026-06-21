import React, { useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const Shape = ({ shape, mouseX, mouseY }) => {
  const x = useTransform(mouseX, (v) => v * shape.depth);
  const y = useTransform(mouseY, (v) => v * shape.depth);

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: shape.top,
        left: shape.left,
        width: shape.size,
        height: shape.size,
        borderRadius: '50%',
        background: shape.color,
        filter: `blur(${shape.blur}px)`,
        opacity: 0.15,
        x,
        y,
        willChange: 'transform'
      }}
    />
  );
};

const PhysicsParticles = () => {
  const mouseX = useSpring(0, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const shapes = [
    { id: 1, size: 400, top: '10%', left: '5%', color: 'var(--accent)', depth: 80, blur: 120 },
    { id: 2, size: 600, top: '50%', left: '70%', color: 'var(--accent-2)', depth: -120, blur: 160 },
    { id: 3, size: 300, top: '80%', left: '20%', color: 'var(--accent-3)', depth: 50, blur: 90 },
    { id: 4, size: 250, top: '30%', left: '85%', color: 'var(--accent)', depth: 150, blur: 80 },
  ];

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
      {shapes.map((shape) => (
        <Shape key={shape.id} shape={shape} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  );
};

export default PhysicsParticles;
