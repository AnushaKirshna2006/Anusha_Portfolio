import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSound } from './SoundContext';

const CursorContext = createContext();

export const useCursor = () => useContext(CursorContext);

export const CursorProvider = ({ children }) => {
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
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
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('chr-hover') ||
        target.classList.contains('link-hover')
      ) {
        setCursorVariant('hover');
        return;
      }

      setCursorVariant('default');
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
    <CursorContext.Provider value={{ cursorVariant, setCursorVariant, cursorText, setCursorText }}>
      {children}
    </CursorContext.Provider>
  );
};
