import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';

const TerminalEasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    "Welcome to Anusha's Terminal [Version 1.0.0]",
    "(c) 2026 Anusha Kirshna. All rights reserved.",
    "",
    "Type 'help' for a list of available commands."
  ]);
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  const { playTick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + ` to toggle
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = [];
      
      switch (cmd) {
        case 'help':
          response = [
            "Available commands:",
            "  about      - Display information about Anusha",
            "  skills     - List technical skills",
            "  hire_me    - Show contact information",
            "  clear      - Clear terminal screen",
            "  exit       - Close terminal"
          ];
          break;
        case 'about':
          response = ["I am a Computing Software Engineering student at the University of Stirling specializing in front-end development."];
          break;
        case 'skills':
          response = ["React, JavaScript, Node.js, Express, MongoDB, UI/UX Design, Three.js, CSS, Framer Motion."];
          break;
        case 'hire_me':
          response = ["Email: anushakirshna@gmail.com", "Status: Looking for an internship!", "Location: Ras Al-Khaimah, UAE"];
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'exit':
          setIsOpen(false);
          setInput('');
          return;
        case '':
          break;
        default:
          response = [`Command not found: ${cmd}. Type 'help' to see available commands.`];
      }

      setHistory((prev) => [...prev, `C:\\Users\\Guest> ${input}`, ...response, ""]);
      setInput('');
      playTick();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 10000,
            background: 'rgba(5, 5, 5, 0.95)', backdropFilter: 'blur(10px)',
            color: '#4ade80', fontFamily: 'var(--font-mono)', padding: '2rem',
            overflowY: 'auto', display: 'flex', flexDirection: 'column'
          }}
          onClick={() => inputRef.current && inputRef.current.focus()}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <span>Terminal</span>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >
              [X] CLOSE
            </button>
          </div>
          
          <div style={{ flex: 1 }}>
            {history.map((line, i) => (
              <div key={i} style={{ minHeight: '1.2rem', whiteSpace: 'pre-wrap' }}>{line}</div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '0.5rem' }}>C:\Users\Guest&gt;</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{
                  background: 'transparent', border: 'none', color: '#4ade80',
                  fontFamily: 'var(--font-mono)', fontSize: '1rem', outline: 'none',
                  flex: 1, caretColor: '#4ade80'
                }}
                autoFocus
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TerminalEasterEgg;
