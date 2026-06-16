import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import MainLayout from './pages/MainLayout';
import ProjectDetails from './pages/ProjectDetails';
import ContactPage from './pages/ContactPage';
import { TransitionProvider } from './components/TransitionContext';
import { useSound } from './components/SoundContext';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import AllCertifications from './pages/AllCertifications';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';

const App = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { playTick } = useSound();

  // Show the logo preloader every time we navigate back to the home page
  useEffect(() => {
    if (location.pathname === '/') {
      setLoading(true);
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseClick = (e) => {
      // Play sound if a button, link, or link-hover element is clicked
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.link-hover') || e.target.closest('.glass-pill')) {
        playTick();
      }
    };
    
    document.addEventListener('mousedown', handleMouseClick);
    return () => document.removeEventListener('mousedown', handleMouseClick);
  }, [playTick]);

  return (
    <SmoothScroll>
      <ScrollProgress />
      <BackToTop />
      <CustomCursor />
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <TransitionProvider>
          <Routes>
            <Route path="/" element={<MainLayout />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/certifications" element={<AllCertifications />} />
          </Routes>
        </TransitionProvider>
      )}
    </SmoothScroll>
  );
};

export default App;
