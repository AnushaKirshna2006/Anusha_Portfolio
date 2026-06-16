import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const skills = [
  'React', 'TailwindCSS', 'JavaScript', 'HTML/CSS', 'VB.net',
  'Node.js', 'Express', 'MongoDB', 'MySQL', 'PostgreSQL',
  'REST APIs', 'UI/UX Design', 'Figma', 'Photoshop', 'Git'
];

const PhysicsSkills = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);

  useEffect(() => {
    const { Engine, Render, Runner, World, Bodies, Mouse, MouseConstraint, Composite } = Matter;

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;

    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });

    Render.run(render);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Add boundaries (walls, floor, ceiling)
    const wallOptions = { isStatic: true, render: { visible: false } };
    World.add(world, [
      Bodies.rectangle(width / 2, -50, width, 100, wallOptions), // Ceiling
      Bodies.rectangle(width / 2, height + 50, width, 100, wallOptions), // Floor
      Bodies.rectangle(-50, height / 2, 100, height, wallOptions), // Left wall
      Bodies.rectangle(width + 50, height / 2, 100, height, wallOptions) // Right wall
    ]);

    // Create skill bodies
    const skillBodies = skills.map((skill, index) => {
      // Create a capsule/pill shape using a rectangle with chamfer
      const x = Math.random() * (width - 200) + 100;
      const y = -(Math.random() * 500 + 100); // Start above screen
      
      const skillText = skill;
      const ctx = document.createElement('canvas').getContext('2d');
      ctx.font = '16px monospace';
      const textWidth = ctx.measureText(skillText).width;
      
      const bodyWidth = textWidth + 40;
      const bodyHeight = 40;

      return Bodies.rectangle(x, y, bodyWidth, bodyHeight, {
        chamfer: { radius: bodyHeight / 2 },
        restitution: 0.8, // Bounciness
        friction: 0.1,
        render: {
          fillStyle: '#1a1a1a',
          strokeStyle: '#e63030',
          lineWidth: 1,
          sprite: {
            texture: createTextTexture(skillText, bodyWidth, bodyHeight),
            xScale: 1,
            yScale: 1
          }
        }
      });
    });

    World.add(world, skillBodies);

    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });

    World.add(world, mouseConstraint);

    // Keep the mouse in sync with rendering
    render.mouse = mouse;

    // Handle resize
    const handleResize = () => {
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
      
      // Update floor position
      const floor = world.bodies[1];
      Matter.Body.setPosition(floor, { x: newWidth / 2, y: newHeight + 50 });
      Matter.Body.setVertices(floor, Bodies.rectangle(newWidth / 2, newHeight + 50, newWidth, 100).vertices);
      
      // Update right wall position
      const rightWall = world.bodies[3];
      Matter.Body.setPosition(rightWall, { x: newWidth + 50, y: newHeight / 2 });
      Matter.Body.setVertices(rightWall, Bodies.rectangle(newWidth + 50, newHeight / 2, 100, newHeight).vertices);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world);
      Engine.clear(engine);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px', borderTop: '1px solid rgba(255,255,255,0.1)', marginTop: '2rem' }}>
      <div style={{ position: 'absolute', top: '2rem', left: '0', zIndex: 10, pointerEvents: 'none' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>SKILLS & TECHNOLOGIES</div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>* Drag to interact</div>
      </div>
      <div ref={sceneRef} style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'grab' }} onMouseDown={(e) => e.target.style.cursor = 'grabbing'} onMouseUp={(e) => e.target.style.cursor = 'grab'} onMouseLeave={(e) => e.target.style.cursor = 'grab'} />
    </div>
  );
};

// Helper function to create canvas texture with text
function createTextTexture(text, width, height) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Background
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.roundRect(0, 0, width, height, height / 2);
  ctx.fill();

  // Border
  ctx.strokeStyle = '#e63030';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Text
  ctx.fillStyle = '#ffffff';
  ctx.font = '500 14px "Space Mono", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  return canvas.toDataURL();
}

export default PhysicsSkills;
