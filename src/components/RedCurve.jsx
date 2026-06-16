import React from 'react';
import { motion, useTransform, useSpring } from 'framer-motion';

const RedCurve = ({ progress }) => {
  // Add physics-based smoothing so the curve glides elegantly as you scroll
  const smoothProgress = useSpring(progress, {
    stiffness: 40,
    damping: 20,
    restDelta: 0.001
  });

  // Map the smooth scroll progress directly to path length [0, 1]
  const pathLength = useTransform(smoothProgress, [0, 1], [0, 1]);
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1000 3000" 
        preserveAspectRatio="none" 
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <motion.path
          d="M -50, 150 C 500, 50, 1100, 150, 950, 650 C 800, 1150, 100, 1050, 50, 1600 C 0, 2150, 900, 2050, 950, 2550 C 1000, 3050, 500, 3000, -50, 2900"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="120"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
        
        {/* Subtle glow layer behind the curve */}
        <motion.path
          d="M -50, 150 C 500, 50, 1100, 150, 950, 650 C 800, 1150, 100, 1050, 50, 1600 C 0, 2150, 900, 2050, 950, 2550 C 1000, 3050, 500, 3000, -50, 2900"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="160"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength, opacity: 0.15, filter: 'blur(20px)' }}
        />
      </svg>
    </div>
  );
};

export default RedCurve;
