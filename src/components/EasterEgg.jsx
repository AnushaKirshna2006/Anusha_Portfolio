import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSound } from './SoundContext';

const EasterEgg = ({ isOpen, onClose }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const { playGlassTap, playSwoosh } = useSound();

  useEffect(() => {
    if (isOpen && playSwoosh) {
      playSwoosh();
    }
  }, [isOpen, playSwoosh]);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = [...board];
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    if (playGlassTap) playGlassTap();
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    if (playGlassTap) playGlassTap();
  };

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);
  const status = winner ? `Winner: ${winner}` : isDraw ? 'Draw!' : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(5, 5, 5, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 50, opacity: 0 }}
            transition={{ type: 'spring', bounce: 0.3 }}
            className="glass-panel"
            style={{
              padding: '3rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '2rem',
              position: 'relative'
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1.5rem',
                background: 'transparent',
                border: 'none',
                color: 'var(--fg)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)'
              }}
            >
              ×
            </button>
            
            <div style={{ textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent)', fontSize: '2rem', marginBottom: '0.5rem' }}>Easter Egg Found!</h2>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--fg-dim)' }}>{status}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {board.map((cell, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: cell ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleClick(i)}
                  className="glass-pill"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '16px',
                    fontSize: '2.5rem',
                    fontFamily: 'var(--font-display)',
                    color: cell === 'X' ? 'var(--accent)' : 'var(--accent-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: cell ? 'default' : 'pointer',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  {cell}
                </motion.button>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="glass-pill"
              style={{
                marginTop: '1rem',
                padding: '0.8rem 2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                color: 'var(--fg)',
                cursor: 'pointer'
              }}
            >
              Reset Game
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
