import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CHARACTERS = '!@#$%^&*()_+-=[]{}|;:,.<>/?';

const ScrambleText = ({ text = '', className = '', as: Component = 'span' }) => {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef(null);

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current);
    const safeText = String(text || '');

    intervalRef.current = setInterval(() => {
      setDisplayText(
        safeText
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return safeText[index];
            }
            // Preserve spaces
            if (letter === ' ') return ' ';
            return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];
          })
          .join('')
      );

      // Slower scramble effect
      if (iteration >= safeText.length) {
        clearInterval(intervalRef.current);
      }
      
      iteration += 1 / 3; 
    }, 30);
  };

  useEffect(() => {
    if (isHovered) {
      scramble();
    } else {
      clearInterval(intervalRef.current);
      setTimeout(() => setDisplayText(text), 0);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovered, text]);

  return (
    <Component
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'inline-block' }}
    >
      {displayText}
    </Component>
  );
};

export default ScrambleText;
