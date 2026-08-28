import React, { createContext, useContext, useState } from 'react';
import TransitionPanel from './TransitionPanel';
import { useNavigate } from 'react-router-dom';
import { useSound } from './SoundContext';

const TransitionContext = createContext();

export const useTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingPath, setPendingPath] = useState(null);
  const navigate = useNavigate();
  const { playSwoosh } = useSound();

  const navigateWithTransition = (path) => {
    // Save the current scroll position for this path
    sessionStorage.setItem(`scroll_${window.location.pathname}`, window.scrollY);
    
    setIsTransitioning(true);
    setPendingPath(path);
    playSwoosh();
  };

  return (
    <TransitionContext.Provider value={{ navigateWithTransition }}>
      {children}
      <TransitionPanel 
        isActive={isTransitioning} 
        onCover={() => {
          if (pendingPath) navigate(pendingPath);
          setIsTransitioning(false);
        }} 
      />
    </TransitionContext.Provider>
  );
};
