import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Magnetic from '../components/Magnetic';

export const blogPosts = [
  {
    id: 1,
    title: 'The Magic of WebSockets in React',
    date: 'March 10, 2026',
    readTime: '5 min read',
    excerpt: 'Exploring how I integrated sub-second real-time communication in my Virtual Study Buddy app without tearing my hair out.',
    slug: 'magic-of-websockets',
    content: (
      <>
        <p>When building the Virtual Study Buddy application, one of the biggest challenges was ensuring that peer-to-peer communication felt instantaneous. In 2026, users expect a seamless experience where messages, presence indicators, and collaborative whiteboards update in real-time.</p>
        <p>Initially, I considered using standard HTTP polling. However, making a request every few seconds is incredibly inefficient and drains battery on mobile devices. The solution? <strong>WebSockets</strong>.</p>
        <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-2)', marginBottom: '2rem', overflowX: 'auto' }}>
          // Setting up the WebSocket connection<br/>
          const socket = new WebSocket('wss://api.studybuddy.com/ws');<br/>
          socket.onmessage = (event) =&gt; {'{'}<br/>
          &nbsp;&nbsp;const data = JSON.parse(event.data);<br/>
          &nbsp;&nbsp;dispatch(updateMessages(data));<br/>
          {'}'};
        </div>
        <p>Integrating this with React required careful consideration of the component lifecycle. If you don't clean up your WebSocket connections in the <code>useEffect</code> cleanup function, you'll end up with massive memory leaks and duplicate message handlers. Learning to manage this state globally using Context and custom hooks was a game-changer for my architecture.</p>
      </>
    )
  },
  {
    id: 2,
    title: 'Mastering Glassmorphism',
    date: 'February 22, 2026',
    readTime: '4 min read',
    excerpt: 'A deep dive into CSS backdrop-filters, lighting, and how to make digital glass look physical and premium.',
    slug: 'mastering-glassmorphism',
    content: (
      <>
        <p>Glassmorphism has been a dominant trend in UI design for a while, but getting it <em>right</em> is surprisingly difficult. It's not just about slapping a <code>backdrop-filter: blur(10px)</code> on a div and calling it a day. True glassmorphism requires an understanding of physical light and material.</p>
        <p>To make the glass panels on my portfolio look premium, I focused on three things:</p>
        <ol style={{ marginLeft: '2rem', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <li><strong>The Border:</strong> Glass catches light on its edges. A subtle 1px solid border with a semi-transparent white gradient gives it that physical edge.</li>
          <li><strong>The Shadow:</strong> Glass diffuses shadow. Instead of a harsh drop-shadow, I use a wide, highly blurred, low-opacity black shadow.</li>
          <li><strong>The Inner Glow:</strong> A very subtle inset shadow or radial gradient background can simulate light bouncing inside the glass.</li>
        </ol>
        <p>However, performance is a major concern. Heavy blurring on large elements can cause older devices to stutter. The trick is to only use it on small UI elements and panels, while keeping the background animations optimized using WebGL or CSS transforms.</p>
      </>
    )
  },
  {
    id: 3,
    title: 'Why OOP Still Matters in 2026',
    date: 'January 15, 2026',
    readTime: '7 min read',
    excerpt: 'Reflecting on building my Classic Game Suite using Java and VB.NET, and how Design Patterns saved my codebase.',
    slug: 'why-oop-matters',
    content: (
      <>
        <p>In a world increasingly dominated by functional programming and React hooks, Object-Oriented Programming (OOP) can sometimes feel like a relic. But while building my Classic Game Suite (featuring Sokoban, Tic-Tac-Toe, and Rock Paper Scissors), OOP proved to be exactly the right tool for the job.</p>
        <p>Game entities naturally map to objects. A <code>Player</code>, a <code>Crate</code>, and a <code>Wall</code> in Sokoban all share common traits (like X and Y coordinates), but have different behaviors. By using inheritance and interfaces, I was able to create a flexible game loop.</p>
        <p>More importantly, it forced me to understand Design Patterns. I used the <strong>State Pattern</strong> to manage the transitions between the Main Menu, Gameplay, and Game Over screens. I used the <strong>Observer Pattern</strong> to decouple the UI from the underlying game logic, ensuring that the VB.NET forms simply reacted to state changes emitted by the core engine.</p>
        <p>Functional programming is fantastic for UI and data transformations, but when it comes to complex state machines and entity management, the lessons of OOP are timeless.</p>
      </>
    )
  },
  {
    id: 4,
    title: 'From Data Entry to Full-Stack',
    date: 'December 05, 2025',
    readTime: '6 min read',
    excerpt: 'How my internship handling clinical datasets pushed me to learn SQL and eventually transition into full-stack development.',
    slug: 'data-entry-to-full-stack',
    content: (
      <>
        <p>My tech journey didn't start with building flashy WebGL portfolios. It started in a clinic at RAK Dental Care, where my primary responsibility was data entry. Day in and day out, I was tasked with moving patient records from one system to another.</p>
        <p>It was tedious, repetitive, and incredibly prone to human error. I realized there had to be a better way. I started learning SQL to automate the extraction and cleaning of these large clinical datasets. By writing scripts to structure the data, I managed to significantly reduce the reporting turnaround time.</p>
        <p>This was my "aha" moment. If I could write code to manipulate databases, what else could I do? That realization pushed me to learn backend development with Node.js, and eventually frontend development with React. Now, as a Computing Software Engineering student, I look back at that data entry job not as a chore, but as the catalyst that forced me to become a developer.</p>
      </>
    )
  },
  {
    id: 5,
    title: 'Building Interactive Physics in React',
    date: 'November 20, 2025',
    readTime: '8 min read',
    excerpt: 'Behind the scenes of the interactive Skills section on my portfolio using matter.js and Framer Motion.',
    slug: 'interactive-physics-react',
    content: (
      <>
        <p>If you've visited the Skills section of my portfolio, you might have noticed the interactive playground where skill pills drop from the sky and bounce around. You can grab them, throw them, and watch them collide. Building this was easily the most fun part of this project.</p>
        <p>To achieve this, I used <code>matter.js</code>, a fantastic 2D physics engine for the web. The challenge, however, is that React and physics engines fundamentally disagree on how the DOM should be managed.</p>
        <p>React wants to strictly control the DOM based on state. A physics engine wants to constantly mutate DOM coordinates in a tight requestAnimationFrame loop. If you let React re-render 60 times a second to update positions, your app will grind to a halt.</p>
        <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-2)', marginBottom: '2rem', overflowX: 'auto' }}>
          // The secret: using refs instead of state<br/>
          const engine = Engine.create();<br/>
          Events.on(engine, 'afterUpdate', () =&gt; {'{'}<br/>
          &nbsp;&nbsp;bodies.forEach((body, i) =&gt; {'{'}<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;const el = pillRefs.current[i];<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;el.style.transform = `translate(${"{body.position.x}"}px, ${"{body.position.y}"}px)`;<br/>
          &nbsp;&nbsp;{'}'});<br/>
          {'}'});
        </div>
        <p>The solution is to bypass React entirely for the frame-by-frame updates. I use React to render the initial DOM elements, capture their references using <code>useRef</code>, and then hand those references over to <code>matter.js</code> to manipulate their CSS transforms directly. It's blazing fast, incredibly fun, and adds that extra "wow" factor to the user experience.</p>
      </>
    )
  }
];

const Blog = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      padding: 'calc(var(--nav-h) + 4rem) var(--pad-x) 8rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', width: '100%' }}>
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 6rem)', lineHeight: 1, letterSpacing: '-0.04em', color: 'var(--fg)', marginBottom: '1rem', textShadow: '0 0 30px rgba(255,255,255,0.1)' }}
        >
          Sandbox.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem', color: 'var(--fg-dim)', marginBottom: '4rem' }}
        >
          Thoughts, experiments, and technical deep-dives.
        </motion.p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {blogPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link to={`/blog/${post.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
                <motion.div 
                  className="glass-panel"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: 'spring', bounce: 0.4 }}
                  style={{ padding: '3rem', cursor: 'pointer' }}
                >
                  <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent)', marginBottom: '1rem' }}>
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
                    {post.title}
                  </h2>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--fg-dim)', lineHeight: 1.6 }}>
                    {post.excerpt}
                  </p>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
