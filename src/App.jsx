import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import NavDots from './components/NavDots';
import MainLayout from './pages/MainLayout';
import { TransitionProvider } from './components/TransitionContext';
import { useSound } from './components/SoundContext';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import TerminalEasterEgg from './components/TerminalEasterEgg';
import PageTransition from './components/PageTransition';

const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AllCertifications = lazy(() => import('./pages/AllCertifications'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { playTick } = useSound();

  // Handle scrolling when navigating
  useEffect(() => {
    const handleScroll = () => {
      const savedScroll = sessionStorage.getItem(`scroll_${location.pathname}`);
      
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
          if (window.lenis) window.lenis.scrollTo(el, { immediate: true });
          else el.scrollIntoView();
        }
      } else if (savedScroll) {
        const y = parseInt(savedScroll, 10);
        if (window.lenis) window.lenis.scrollTo(y, { immediate: true });
        else window.scrollTo(0, y);
      } else {
        if (window.lenis) window.lenis.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
      }
    };

    handleScroll();
    setTimeout(handleScroll, 800);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      // Play sound if an interactive element is clicked
      if (e.target.closest('a, button, .link-hover, .glass-pill, [data-cursor="view"], .chr-hover')) {
        playTick();
      }
    };
    
    document.addEventListener('mousedown', handleMouseClick);
    return () => document.removeEventListener('mousedown', handleMouseClick);
  }, [playTick]);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <NavDots isLoading={loading} location={location} />
      <BackToTop />
      <CustomCursor />
      <TerminalEasterEgg />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <TransitionProvider>
          <Suspense fallback={<div className="shimmer" style={{ position: 'fixed', inset: 0, zIndex: 9999 }} />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><MainLayout /></PageTransition>} />
                <Route path="/project/:id" element={<PageTransition><ProjectDetails /></PageTransition>} />
                <Route path="/contact" element={<PageTransition><ContactPage /></PageTransition>} />
                <Route path="/certifications" element={<PageTransition><AllCertifications /></PageTransition>} />
                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </TransitionProvider>
      )}
    </SmoothScroll>
  );
};

export default App;
