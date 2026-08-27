import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import AmbientAura from '../components/AmbientAura';
import ScrollDistortion from '../components/ScrollDistortion';
import ScatterIntro from '../components/ScatterIntro';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Marquee from '../components/Marquee';
import TransitionPanel from '../components/TransitionPanel';
import SEO from '../components/SEO';

import Home from './Home';
import About from '../components/About';
const Works = lazy(() => import('./Works'));
import Info from './Info';
import Experience from '../components/Experience';
import Education from '../components/Education';
import Certifications from '../components/Certifications';

// NEW sections
const Services = lazy(() => import('../components/Services'));
const Testimonials = lazy(() => import('../components/Testimonials'));

import Footer from '../components/Footer';
const Avatar3D = lazy(() => import('../components/Avatar3D'));

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
    <>
    <SEO title="Home" url="/" />
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
      <Suspense fallback={<div className="shimmer" style={{ minHeight: '50vh' }} />}>
        <Services />
      </Suspense>

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
      <Suspense fallback={<div className="shimmer" style={{ minHeight: '50vh' }} />}>
        <Testimonials />
      </Suspense>
      

      
      {/* 12. Works (detailed list) */}
      <Suspense fallback={<div className="shimmer" style={{ minHeight: '80vh' }} />}>
        <Works />
      </Suspense>
      
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
      
      <Suspense fallback={null}>
        <Avatar3D />
      </Suspense>
    </motion.main>
    </>
  );
};

export default MainLayout;
