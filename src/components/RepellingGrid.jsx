import React, { useEffect, useRef } from 'react';

const RepellingGrid = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Setup dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const setSize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initGrid();
    };
    
    window.addEventListener('resize', setSize);
    
    // Grid settings
    const spacing = 30; // distance between points
    let points = [];
    
    const initGrid = () => {
      points = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      
      const offsetX = (width - cols * spacing) / 2;
      const offsetY = (height - rows * spacing) / 2;
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          points.push({
            x: offsetX + i * spacing,
            y: offsetY + j * spacing,
            baseX: offsetX + i * spacing,
            baseY: offsetY + j * spacing,
          });
        }
      }
    };
    
    // Mouse tracking
    let mouse = { x: -1000, y: -1000, radius: 120 };
    
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Draw loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 242, 254, 0.4)'; // Accent color
      
      points.forEach(p => {
        // Calculate distance from mouse
        const dx = mouse.x - p.baseX;
        const dy = mouse.y - p.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        let targetX = p.baseX;
        let targetY = p.baseY;
        
        // Repel logic
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          // Push away from mouse
          const pushDist = force * 40; 
          targetX -= Math.cos(angle) * pushDist;
          targetY -= Math.sin(angle) * pushDist;
        }
        
        // Smoothly move current x,y towards target x,y (spring effect)
        p.x += (targetX - p.x) * 0.1;
        p.y += (targetY - p.y) * 0.1;
        
        // Draw the point
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationFrameId = window.requestAnimationFrame(draw);
    };
    
    setSize();
    draw();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
      }} 
    />
  );
};

export default RepellingGrid;
