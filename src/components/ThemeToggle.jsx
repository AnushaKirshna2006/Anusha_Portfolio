import React from 'react';
import { useTheme } from './ThemeContext';
import Magnetic from './Magnetic';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Magnetic>
      <button 
        onClick={toggleTheme}
        className="link-hover"
        style={{
          background: 'transparent',
          border: 'none',
          color: 'var(--fg)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          cursor: 'pointer',
          padding: '0.5rem',
          textTransform: 'uppercase'
        }}
      >
        {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
      </button>
    </Magnetic>
  );
};

export default ThemeToggle;
