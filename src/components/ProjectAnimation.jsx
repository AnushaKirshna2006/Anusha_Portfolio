import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const VirtualStudyBuddyAnimation = () => {
  const bgColor = '#181628';
  const panelColor = '#24233b';
  const primaryColor = '#8b5cf6'; // purple
  const accentColor = '#f59e0b'; // orange/yellow

  return (
    <div style={{ width: '100%', height: '100%', background: bgColor, position: 'relative', overflow: 'hidden', fontFamily: 'sans-serif' }}>
      
      {/* 1. CHAT UI */}
      <motion.div
        style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}
        animate={{ opacity: [1, 1, 0, 0, 0, 0, 1], y: [0, 0, -20, -20, 20, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, times: [0, 0.25, 0.3, 0.6, 0.6, 0.95, 1], ease: 'easeInOut' }}
      >
        {/* User Bubble */}
        <motion.div 
          style={{ alignSelf: 'flex-end', background: primaryColor, padding: '10px 15px', borderRadius: '15px 15px 0 15px', color: '#fff', fontSize: '12px', maxWidth: '70%', boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 1, 1, 1, 1, 1, 1], scale: [0.8, 1, 1, 1, 1, 1, 1] }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.05, 0.25, 0.3, 0.6, 0.95, 1] }}
        >
          @AI what are data structures?
        </motion.div>
        
        {/* AI Response Box */}
        <motion.div 
          style={{ alignSelf: 'flex-start', background: panelColor, padding: '15px', borderRadius: '10px', color: '#ccc', fontSize: '11px', width: '90%', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: [0, 0, 1, 1, 1, 1, 1], y: [10, 10, 0, 0, 0, 0, 0] }}
          transition={{ duration: 12, repeat: Infinity, times: [0, 0.1, 0.15, 0.25, 0.3, 0.95, 1] }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px', color: accentColor, fontWeight: 'bold' }}>
            ✨ StudyBuddy AI
          </div>
          <motion.div
            style={{ overflow: 'hidden' }}
            initial={{ height: 0 }}
            animate={{ height: ['0%', '0%', '100%', '100%', '100%', '100%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.15, 0.25, 0.3, 0.6, 0.95, 1] }}
          >
            <div style={{ lineHeight: '1.5' }}>
              Data structures are specific ways to organize and store data in a computer's memory. They help manage information efficiently...
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* 2. FLASHCARDS UI */}
      <motion.div
        style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0, 0], y: [20, 20, 0, 0, -20, -20, 20] }}
        transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.35, 0.6, 0.65, 0.95, 1], ease: 'easeInOut' }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, height: '35px', background: primaryColor, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.2)' }}>
            Add to Deck
          </div>
          <motion.div 
            style={{ flex: 1.5, height: '35px', background: 'linear-gradient(90deg, #ec4899, #f59e0b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '11px', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)' }}
            animate={{ scale: [1, 1, 1.05, 1, 1, 1, 1], filter: ['brightness(1)', 'brightness(1)', 'brightness(1.2)', 'brightness(1)', 'brightness(1)', 'brightness(1)', 'brightness(1)'] }}
            transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.4, 0.45, 0.6, 0.95, 1] }}
          >
            ✨ Auto-Generate with AI
          </motion.div>
        </div>
        
        {/* Flashcard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
          {[1,2,3,4].map((i) => (
            <motion.div 
              key={i}
              style={{ background: panelColor, borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', boxShadow: '0 10px 20px rgba(0,0,0,0.3)' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0, 0, 1, 1, 1, 1], scale: [0.8, 0.8, 0.8, 1, 1, 1, 1] }}
              transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.4 + (i*0.02), 0.45 + (i*0.02), 0.6, 0.95, 1] }}
            >
              <div style={{ padding: '10px', fontSize: '10px', color: '#aaa', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                {i === 1 ? 'Internet Protocols' : i === 2 ? 'What is a Stack?' : 'Garbage Collection'}
              </div>
              {i === 2 && (
                <motion.div 
                  style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #3b2a59, #24233b)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px', fontSize: '10px', color: '#eee', textAlign: 'center', border: '1px solid rgba(139, 92, 246, 0.3)', backfaceVisibility: 'hidden' }}
                  initial={{ rotateY: 180, opacity: 0 }}
                  animate={{ rotateY: [180, 180, 180, 180, 0, 0, 180], opacity: [0, 0, 0, 0, 1, 1, 0] }}
                  transition={{ duration: 12, repeat: Infinity, times: [0, 0.35, 0.4, 0.5, 0.55, 0.95, 1] }}
                >
                  A stack follows LIFO (Last-In, First-Out).
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 3. CANVAS UI */}
      <motion.div
        style={{ position: 'absolute', inset: 0, padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}
        animate={{ opacity: [0, 0, 0, 0, 1, 1, 0], y: [20, 20, 20, 20, 0, 0, -20] }}
        transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.65, 0.7, 0.95, 1], ease: 'easeInOut' }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {['Pen', 'Eraser', 'Clear All'].map(t => (
            <div key={t} style={{ background: panelColor, padding: '5px 12px', borderRadius: '15px', fontSize: '10px', color: '#ccc', border: '1px solid rgba(255,255,255,0.05)' }}>{t}</div>
          ))}
        </div>
        <div style={{ flex: 1, background: '#13111c', borderRadius: '10px', position: 'relative', border: '1px solid rgba(255,255,255,0.03)', overflow: 'hidden' }}>
          <svg viewBox="0 0 100 50" style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}>
            {/* H */}
            <motion.path d="M20,15 L20,35 M20,25 L30,25 M30,15 L30,35" fill="transparent" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.7, 0.75, 0.9, 1] }} />
            {/* E */}
            <motion.path d="M45,15 L38,15 L38,35 L45,35 M38,25 L43,25" fill="transparent" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.72, 0.78, 0.9, 1] }} />
            {/* L */}
            <motion.path d="M52,15 L52,35 L58,35" fill="transparent" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.75, 0.81, 0.9, 1] }} />
            {/* L */}
            <motion.path d="M63,15 L63,35 L69,35" fill="transparent" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.78, 0.84, 0.9, 1] }} />
            {/* O */}
            <motion.path d="M78,15 C74,15 74,35 78,35 C82,35 82,15 78,15" fill="transparent" stroke="#facc15" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.81, 0.87, 0.9, 1] }} />
            {/* ! */}
            <motion.path d="M86,15 L86,28 M86,35 L86,35.1" fill="transparent" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: [0, 0, 0, 0, 0, 1, 1] }} transition={{ duration: 12, repeat: Infinity, times: [0, 0.3, 0.6, 0.85, 0.9, 0.9, 1] }} />
          </svg>
        </div>
      </motion.div>
    </div>
  );
};

const CosmicWeatherAnimation = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom, #070914, #12182c)', position: 'relative', overflow: 'hidden' }}>
      {/* Stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: Math.random()
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Sun/Moon Glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: '20%',
          right: '20%',
          width: '100px',
          height: '100px',
          background: 'rgba(79, 172, 254, 0.2)',
          borderRadius: '50%',
          boxShadow: '0 0 50px 20px rgba(79, 172, 254, 0.4)',
          filter: 'blur(10px)'
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 1, 0.6]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div style={{ width: '100%', height: '100%', background: '#4facfe', borderRadius: '50%', opacity: 0.8 }} />
      </motion.div>

      {/* Animated Clouds (SVGs) */}
      <motion.svg 
        viewBox="0 0 100 50" 
        style={{ position: 'absolute', bottom: '10%', left: '-20%', width: '150%', height: '50%', opacity: 0.3 }}
        animate={{ x: ['0%', '-20%', '0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M10,40 Q20,20 30,30 T60,20 T90,40 Z" fill="#4facfe" filter="blur(4px)" />
      </motion.svg>
      
      <motion.svg 
        viewBox="0 0 100 50" 
        style={{ position: 'absolute', bottom: '0%', left: '0%', width: '150%', height: '60%', opacity: 0.2 }}
        animate={{ x: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M0,50 Q15,30 35,40 T70,30 T100,50 Z" fill="#ffffff" filter="blur(6px)" />
      </motion.svg>

      {/* Abstract Rain/Data lines */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`rain-${i}`}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: '-10%',
            width: '2px',
            height: `${Math.random() * 40 + 20}px`,
            background: 'linear-gradient(to bottom, transparent, rgba(79, 172, 254, 0.8))',
            borderRadius: '2px'
          }}
          animate={{
            y: ['0vh', '100vh'],
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 1 + Math.random() * 1.5,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

const ClassicGameAnimation = () => {
  return (
    <div style={{ width: '100%', height: '100%', background: '#0d1117', position: 'relative', overflow: 'hidden' }}>
      {/* 8-bit style moving grid elements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'repeat(5, 1fr)', width: '100%', height: '100%', gap: '4px', padding: '10px' }}>
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={`block-${i}`}
            style={{
              background: Math.random() > 0.7 ? 'rgba(74, 222, 128, 0.4)' : 'rgba(255,255,255,0.02)',
              borderRadius: '4px'
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              background: Math.random() > 0.9 ? ['rgba(74, 222, 128, 0.8)', 'rgba(255,255,255,0.02)'] : undefined
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'steps(3)'
            }}
          />
        ))}
      </div>
      
      {/* Floating abstract game piece */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '60px',
          height: '60px',
          background: 'none',
          border: '4px solid #4ade80',
          borderRadius: '8px',
          transformOrigin: 'center'
        }}
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
          x: ['-50%', '-50%'],
          y: ['-50%', '-60%', '-50%']
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          y: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 2, repeat: Infinity, ease: 'easeInOut' }
        }}
      />
    </div>
  );
};

const ProjectAnimation = ({ projectId }) => {
  if (projectId === 1) return <VirtualStudyBuddyAnimation />;
  if (projectId === 2) return <CosmicWeatherAnimation />;
  if (projectId === 3) return <ClassicGameAnimation />;
  
  // Fallback
  return (
    <div style={{ width: '100%', height: '100%', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ width: '50px', height: '50px', border: '2px solid var(--accent)', borderTopColor: 'transparent', borderRadius: '50%' }}
      />
    </div>
  );
};

export default ProjectAnimation;
