import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSound } from './SoundContext';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [cursorColor, setCursorColor] = useState('var(--accent)');
  const { playTick } = useSound();

  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      
      // Check if it's a project image wrapper
      const projectWrapper = target.closest('[data-cursor="view"]');
      if (projectWrapper) {
        setCursorVariant('view');
        setCursorText('VIEW');
        return;
      }

      // Check if it's a link or button
      const interactiveEl = target.closest('a, button, .chr-hover, .link-hover');
      if (interactiveEl) {
        setCursorVariant('hover');
        const color = window.getComputedStyle(interactiveEl).color;
        // Check if text is close to cyan/blue
        if (color.includes('0, 242, 254') || color.includes('0, 255, 255')) {
          setCursorColor('#ffffff'); // Show white magnifier over blue text
        } else {
          setCursorColor('var(--accent)'); // Show blue magnifier over white text
        }
        return;
      }

      setCursorVariant('default');
      setCursorColor('var(--accent)');
    };

    const handleMouseClick = (e) => {
      const target = e.target;
      if (
        target.closest('[data-cursor="view"]') ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('chr-hover') ||
        target.classList.contains('link-hover')
      ) {
        playTick();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleMouseClick);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleMouseClick);
    };
  }, [cursorVariant, playTick]);

  return (
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant, cursorText, setCursorText, cursorColor }}>
      {children}
    </CursorContext.Provider>
  );
};
