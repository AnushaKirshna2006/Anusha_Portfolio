import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = (e) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Check if View Transitions API is supported
    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    // Get click coordinates for origin
    const x = e.clientX;
    const y = e.clientY;
    document.documentElement.style.setProperty('--origin-x', `${x}px`);
    document.documentElement.style.setProperty('--origin-y', `${y}px`);

    document.startViewTransition(() => {
      setTheme(newTheme);
    });
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
