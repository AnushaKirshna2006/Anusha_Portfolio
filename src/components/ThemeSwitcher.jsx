import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

const themes = [
  { id: 'cyberpunk', name: 'CYBERPUNK', color: '#00f2fe' },
  { id: 'matrix', name: 'MATRIX', color: '#00ff00' },
  { id: 'minimal', name: 'MINIMAL', color: '#ffffff' }
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        background: 'rgba(20, 20, 20, 0.4)',
        backdropFilter: 'blur(10px)',
        border: '1px solid var(--glass-border)',
        padding: '0.8rem',
        borderRadius: '16px',
        boxShadow: 'var(--glass-shadow)'
      }}
    >
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--fg-dim)', textAlign: 'center', marginBottom: '0.2rem', letterSpacing: '0.1em' }}>
        THEME
      </span>
      {themes.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            background: theme === t.id ? 'rgba(255,255,255,0.1)' : 'transparent',
            border: `1px solid ${theme === t.id ? t.color : 'transparent'}`,
            color: theme === t.id ? 'var(--fg)' : 'var(--fg-muted)',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: t.color, display: 'inline-block', opacity: theme === t.id ? 1 : 0.3 }}></span>
          {t.name}
        </button>
      ))}
    </motion.div>
  );
};

export default ThemeSwitcher;
