import React, { useState } from 'react';
import { motion } from 'framer-motion';

const services = [
  {
    title: 'Full-Stack Engineering',
    desc: 'End-to-end architectures, robust APIs, and scalable databases tailored for performance.',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800'
  },
  {
    title: 'WebGL & Creative Coding',
    desc: 'Immersive 3D environments, custom shaders, and physics-based interactions.',
    img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800'
  },
  {
    title: 'Real-time Systems',
    desc: 'Socket-driven applications, live data streaming, and high-concurrency solutions.',
    img: 'https://images.unsplash.com/photo-1633423717208-1cc678fc5ba8?q=80&w=800'
  }
];

const Expertise = () => {
  const [hovered, setHovered] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <section 
      id="expertise" 
      className="scroll-wrap" 
      style={{ padding: '8rem var(--pad-x)', position: 'relative', overflow: 'hidden' }}
      onMouseMove={handleMouseMove}
    >
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent)' }}>
          [01] EXPERTISE
        </h2>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 4rem)', margin: '1rem 0', color: 'var(--fg)' }}>
          Specialized Services
        </h3>
      </div>

      <div style={{ borderTop: '1px solid var(--glass-border)', position: 'relative' }}>
        {services.map((item, i) => (
          <div 
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              padding: '3rem 0',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              position: 'relative',
              cursor: 'pointer',
              color: hovered === i ? 'var(--accent)' : 'var(--fg)',
              transition: 'all 0.4s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
              <h4 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(2rem, 5vw, 4rem)', 
                margin: 0, 
                fontWeight: 700,
                transform: hovered === i ? 'translateX(30px)' : 'translateX(0)',
                transition: 'transform 0.4s ease',
                WebkitTextStroke: hovered === i ? 'none' : '1px var(--glass-border)',
                color: hovered === i ? 'var(--accent)' : 'transparent'
              }}>
                {item.title}
              </h4>
              <p style={{ 
                fontFamily: 'var(--font-body)', 
                fontSize: '1.1rem', 
                color: hovered === i ? 'var(--fg)' : 'var(--fg-dim)', 
                maxWidth: '400px', 
                margin: 0, 
                textAlign: 'right',
                opacity: hovered === i ? 1 : 0.4,
                transition: 'all 0.4s ease',
                flex: '1 1 300px'
              }}>
                {item.desc}
              </p>
            </div>

            {/* Floating Image */}
            <motion.div
              initial={false}
              animate={{ 
                opacity: hovered === i ? 1 : 0, 
                scale: hovered === i ? 1 : 0.8,
                x: mousePos.x - 200, 
                y: mousePos.y - 150,
                rotate: hovered === i ? (mousePos.x % 10 - 5) : 0 // subtle tilt
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 20 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '400px',
                height: '300px',
                pointerEvents: 'none',
                zIndex: 50,
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.8)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'var(--accent)', mixBlendMode: 'color', opacity: 0.8 }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }} />
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Expertise;
