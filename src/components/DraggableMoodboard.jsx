import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const DraggableMoodboard = () => {
  const containerRef = useRef(null);

  const items = [
    { type: 'photo', src: '/assets/images/Profile.jpeg', x: 20, y: 10, rotate: -5, z: 1 },
    { type: 'sticker', text: 'React.js', color: '#00f2fe', x: 70, y: 15, rotate: 12, z: 2 },
    { type: 'sticker', text: 'Three.js', color: '#a855f7', x: 15, y: 60, rotate: -15, z: 3 },
    { type: 'note', text: 'Design is not how it looks, but how it works. - Jobs', x: 50, y: 40, rotate: 5, z: 4 },
    { type: 'sticker', text: 'Figma', color: '#ec4899', x: 80, y: 65, rotate: 20, z: 5 },
    { type: 'photo', src: '/assets/images/project1.png', x: 30, y: 70, rotate: -8, z: 6 }
  ];

  return (
    <div style={{ marginTop: '5rem', marginBottom: '3rem' }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.15em',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
        textAlign: 'center'
      }}>
        [ My Creative Workspace ]
      </div>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        color: 'var(--fg-dim)',
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        Drag elements around to organize my desk.
      </p>

      <div 
        ref={containerRef}
        className="glass-panel"
        style={{
          width: '100%',
          height: '500px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '24px',
          background: 'rgba(10, 15, 25, 0.4)',
          border: '1px solid rgba(255,255,255,0.05)',
          backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      >
        {items.map((item, i) => {
          if (item.type === 'photo') {
            return (
              <motion.div
                key={i}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                initial={{ x: `${item.x}vw`, y: `${item.y}vh`, rotate: item.rotate }}
                whileDrag={{ scale: 1.05, zIndex: 100, rotate: 0, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
                whileHover={{ scale: 1.02, cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
                style={{
                  position: 'absolute',
                  padding: '10px 10px 30px 10px',
                  background: '#f8f9fa',
                  borderRadius: '4px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                  zIndex: item.z,
                  width: '180px',
                  height: '200px'
                }}
              >
                <div style={{ width: '100%', height: '100%', backgroundColor: '#ddd', overflow: 'hidden' }}>
                  <img src={item.src} alt="Moodboard element" style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => e.target.style.display = 'none'} />
                </div>
              </motion.div>
            );
          }

          if (item.type === 'sticker') {
            return (
              <motion.div
                key={i}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                initial={{ x: `${item.x}vw`, y: `${item.y}vh`, rotate: item.rotate }}
                whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
                whileHover={{ scale: 1.05, cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
                style={{
                  position: 'absolute',
                  padding: '0.8rem 1.5rem',
                  background: item.color,
                  color: '#000',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
                  zIndex: item.z,
                  border: '2px solid rgba(255,255,255,0.5)'
                }}
              >
                {item.text}
              </motion.div>
            );
          }

          if (item.type === 'note') {
            return (
              <motion.div
                key={i}
                drag
                dragConstraints={containerRef}
                dragElastic={0.2}
                dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                initial={{ x: `${item.x}vw`, y: `${item.y}vh`, rotate: item.rotate }}
                whileDrag={{ scale: 1.1, zIndex: 100, rotate: 0 }}
                whileHover={{ scale: 1.05, cursor: 'grab' }}
                whileTap={{ cursor: 'grabbing' }}
                style={{
                  position: 'absolute',
                  padding: '1.5rem',
                  background: '#fef08a', // classic yellow sticky note
                  color: '#333',
                  width: '180px',
                  height: '180px',
                  fontFamily: '"Comic Sans MS", "Caveat", cursive',
                  fontSize: '1.1rem',
                  lineHeight: 1.4,
                  boxShadow: '2px 10px 20px rgba(0,0,0,0.2)',
                  zIndex: item.z,
                  clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
                }}
              >
                {item.text}
                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', background: 'rgba(0,0,0,0.1)', clipPath: 'polygon(100% 0, 0 100%, 0 0)' }} />
              </motion.div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default DraggableMoodboard;
