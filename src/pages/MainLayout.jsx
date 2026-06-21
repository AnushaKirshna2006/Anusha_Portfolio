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

// NEW sections
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';

import Footer from '../components/Footer';
import Avatar3D from '../components/Avatar3D';

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
      
      {/* 1. Hero */}
      <Home />
      
      {/* 2. About */}
      <About onOpenInfo={(e) => { e.preventDefault(); triggerInfo(); }} />
      
      {/* 3. What I Do (NEW) */}
      <Services />

      {/* 5. ScatterIntro */}
      <ScatterIntro />
      
      {/* 6. Skills (ENHANCED with bars) */}
      <Skills />
      
      {/* 7. Certifications */}
      <Certifications />
      
      {/* 8. Education */}
      <Education />
      
      {/* 9. Experience */}
      <Experience />
      
      {/* 10. Testimonials (NEW) */}
      <Testimonials />
      

      
      {/* 12. Works (detailed list) */}
      <Works />
      
      {/* 13. ScrollDistortion */}
      <ScrollDistortion />
      
      {/* 14. Marquee */}
      <Marquee />
      
      {/* 15. Contact CTA */}
      <Contact />
      
      {/* 16. Footer (NEW) */}
      <Footer />
      
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
      
      <Avatar3D />
    </motion.main>
  );
};

export default MainLayout;
