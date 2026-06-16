import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import AmbientAura from '../components/AmbientAura';
import ScrollDistortion from '../components/ScrollDistortion';
import ScatterIntro from '../components/ScatterIntro';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Marquee from '../components/Marquee';
import TransitionPanel from '../components/TransitionPanel';

import Home from './Home';
import About from '../components/About';
import Works from './Works';
import Info from './Info';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

const MainLayout = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const triggerInfo = () => {
    setIsTransitioning(true);
    setPendingAction(() => () => setIsInfoOpen(true));
  };
  
  const closeInfo = () => {
    setIsTransitioning(true);
    setPendingAction(() => () => setIsInfoOpen(false));
  };

  useEffect(() => {
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
    >
      <AmbientAura />
      <Navbar onOpenInfo={(e) => { e.preventDefault(); triggerInfo(); }} />
      <Home />
      <About onOpenInfo={(e) => { e.preventDefault(); triggerInfo(); }} />
      <ScatterIntro />
      <Skills />
      <Certifications />
      <Education />
      <Experience />
      <Works />
      <ScrollDistortion />
      <Marquee />
      <Contact />
      
      <AnimatePresence>
        {isInfoOpen && <Info onClose={closeInfo} />}
      </AnimatePresence>
      
      <TransitionPanel 
        isActive={isTransitioning} 
        onCover={() => {
          if (pendingAction) pendingAction();
          setIsTransitioning(false); // Reset trigger
        }} 
      />
    </motion.main>
  );
};

export default MainLayout;
