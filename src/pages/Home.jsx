import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import DownloadCV from '../components/DownloadCV';

const Home = () => {
  const containerRef = useRef(null);
  
  const [isMuted, setIsMuted] = useState(true);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      
      // Some browsers require explicit play() after unmuting
      if (!nextMuted) {
        videoRef.current.play().catch(err => console.error("Playback prevented:", err));
      }
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "40vh"]);

  const expertiseList = ["Software Engineer", "Frontend Developer", "UI/UX Designer", "Web Developer"];
  const [typeText, setTypeText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    let timer = setTimeout(() => {
      const current = loopNum % expertiseList.length;
      const fullText = expertiseList[current];

      if (!isDeleting) {
        setTypeText(fullText.substring(0, typeText.length + 1));
        setTypingSpeed(100);
      } else {
        setTypeText(fullText.substring(0, typeText.length - 1));
        setTypingSpeed(50);
      }

      if (!isDeleting && typeText === fullText) {
        setTypingSpeed(1500); // Wait before deleting
        setIsDeleting(true);
      } else if (isDeleting && typeText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(500); // Wait before typing next
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typeText, isDeleting, typingSpeed, loopNum]);

  // Autoplay sound on scroll observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // When hero section is in view, try to unmute
            setIsMuted(false);
            if (videoRef.current) {
              videoRef.current.muted = false;
              // Some browsers block programmatic unmuting without prior user interaction.
              // If it fails, we catch the error, mute it back, and let it play silently.
              videoRef.current.play().catch(e => {
                console.warn("Browser blocked autoplay with sound. Muting to resume playback.");
                setIsMuted(true);
                videoRef.current.muted = true;
                videoRef.current.play();
              });
            }
          } else {
            // When hero section is out of view, mute it
            setIsMuted(true);
            if (videoRef.current) {
              videoRef.current.muted = true;
            }
          }
        });
      },
      { threshold: 0.3 } // Trigger when 30% of the hero section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" ref={containerRef} className="scroll-wrap visible" style={{ minHeight: '100vh', position: 'relative', overflow: 'visible' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
        
        {/* VIDEO CONTAINER ON THE RIGHT */}
        <div className="home-video-container" style={{ position: 'absolute', top: 0, right: '5%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none', zIndex: 1 }}>
          {/* Intense Glow Behind Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              position: 'absolute', top: '50%', left: '50%', 
              transform: 'translate(-50%, -50%)', 
              width: '600px', height: '600px', 
              background: 'radial-gradient(circle, rgba(0,242,254,0.4) 0%, rgba(0,242,254,0) 70%)', 
              borderRadius: '50%',
              pointerEvents: 'none'
            }} 
          />
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
            style={{
              position: 'relative',
              width: '100%',
              height: '80vh', // Allow it to take up most of the vertical space
              maxWidth: '600px',
              /* Only fade the bottom to hide the logo and blend into the background, leaving sides untouched */
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
              maskImage: 'linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
              pointerEvents: 'auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted={isMuted}
              playsInline
              onLoadedData={() => setIsVideoLoaded(true)}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', // Ensure no part of the video is cropped
                opacity: 0.9,
                mixBlendMode: 'screen'
              }}
            >
              {/* This WebM file will be generated by the AI script in the background */}
              <source src="/assets/videos/hero_video_nobg.webm" type="video/webm" />
              {/* Fallback to original MP4 while we wait for AI processing */}
              <source src="/assets/videos/hero_video.mp4" type="video/mp4" />
            </video>

            <AnimatePresence>
              {!isVideoLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="shimmer"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 5
                  }}
                />
              )}
            </AnimatePresence>

            {/* Sound Toggle Button */}
            <button 
              onClick={toggleMute}
              className="link-hover"
              style={{
                position: 'absolute',
                bottom: '10%',
                right: '10%',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff',
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.5rem',
                zIndex: 20,
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </motion.div>
        </div>

        <motion.div style={{ padding: '0 var(--pad-x)', width: '100%', y, pointerEvents: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          
          {/* MASSIVE TYPOGRAPHY */}
          <div className="home-text-container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(3rem, 8vw, 6rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                color: 'var(--fg)',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
              }}
            >
              CRAFTING
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(3rem, 8vw, 6rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                margin: 0,
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '3px var(--accent)',
                fontStyle: 'italic',
                marginLeft: '5vw',
                filter: 'drop-shadow(0 0 20px rgba(0, 242, 254, 0.4))'
              }}
            >
              DIGITAL
            </motion.h1>
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'clamp(3rem, 8vw, 6rem)', 
                fontWeight: 900, 
                lineHeight: 0.85, 
                letterSpacing: '-0.04em', 
                color: 'var(--fg)',
                margin: 0,
                textTransform: 'uppercase',
                textShadow: '0 0 40px rgba(0, 242, 254, 0.2)'
              }}
            >
              REALITIES
            </motion.h1>
          </div>

          {/* SUBTEXT */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', 
              color: 'var(--fg-dim)', 
              maxWidth: '800px', 
              lineHeight: 1.6,
              marginTop: '3rem',
              marginBottom: '2rem',
              zIndex: 10
            }}
          >
            Hi, I'm Anusha. Translating complex logic into immersive digital experiences.
          </motion.p>

          {/* CURRENTLY STATUS */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            style={{ 
              fontFamily: 'var(--font-mono)', 
              fontSize: '0.85rem', 
              color: 'var(--fg-dim)', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em',
              marginBottom: '4rem',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            CURRENTLY: <span style={{ color: 'var(--fg)', fontWeight: 600 }}>{typeText}</span>
            <motion.div 
              animate={{ opacity: [1, 0] }} 
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              style={{ width: '8px', height: '16px', background: 'var(--accent)' }}
            />
          </motion.div>

          {/* BUTTONS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', zIndex: 10, flexWrap: 'wrap' }}
          >
            <Magnetic>
              <button 
                onClick={() => {
                  const el = document.getElementById('works');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="link-hover glass-pill"
                style={{
                  background: 'var(--fg)',
                  color: 'var(--bg)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  padding: '1rem 2rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}
              >
                EXPLORE INDEX &rarr;
              </button>
            </Magnetic>
            
            <Magnetic>
              <DownloadCV />
            </Magnetic>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Home;
