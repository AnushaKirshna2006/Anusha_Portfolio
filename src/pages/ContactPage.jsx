import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTransition } from '../components/TransitionContext';
import Magnetic from '../components/Magnetic';
import ParticleBackground from '../components/ParticleBackground';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

const ContactPage = () => {
  const { navigateWithTransition } = useTransition();
  const [formState, setFormState] = useState('idle');
  const form = React.useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('submitting');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <>
    <SEO title="Contact" description="Get in touch for freelance projects and job opportunities." url="/contact" />
    <section style={{ minHeight: '100vh', width: '100vw', background: 'var(--bg)', color: 'var(--fg)', position: 'relative', overflowX: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
        <ParticleBackground />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '3rem var(--pad-x)', zIndex: 1, position: 'relative' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', width: '100%', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', zIndex: 10 }}>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, textShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
              Contact
            </motion.h1>
            <Magnetic>
              <a href="/" onClick={(e) => { e.preventDefault(); navigateWithTransition('/'); }} className="glass-pill link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer', padding: '0.8rem 1.5rem', color: 'var(--fg)', textDecoration: 'none' }}>
                BACK
              </a>
            </Magnetic>
          </header>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '5rem', position: 'relative', zIndex: 10 }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 500, marginBottom: '1rem', lineHeight: 1.3, color: 'var(--accent)' }}>Let's talk about your project.</h3>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: 'var(--fg-dim)', lineHeight: 1.6, margin: 0 }}>I respond quickly to freelance missions, full-time opportunities, and collaborations around interactive web experiences.</p>
              </div>
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase', padding: '1rem 2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}><span style={{ color: 'var(--fg-dim)' }}>BASED IN</span><span style={{ color: 'var(--fg)' }}>Ras Al-Khaimah, UAE</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: '1px solid var(--glass-border)' }}><span style={{ color: 'var(--fg-dim)' }}>STATUS</span><span style={{ color: 'var(--fg)' }}>Looking for an internship</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0' }}><span style={{ color: 'var(--fg-dim)' }}>AVG. RESPONSE</span><span style={{ color: 'var(--fg)' }}>24h</span></div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '2rem' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '0.5rem' }}>CONTACT</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '1rem', margin: 0 }}>Let's build together.</h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--fg-dim)', maxWidth: '700px', lineHeight: 1.6, margin: 0 }}>If you have a project in mind, an ambitious idea, or an exciting career opportunity, I'd be glad to discuss it with you and explore a potential collaboration.</p>
              </div>

              <div className="glass-panel" style={{ padding: '3rem', position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <AnimatePresence mode="wait">
                  {formState === 'success' ? (
                    <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-start', margin: 'auto 0' }}>
                      <div style={{ fontSize: '3rem', color: 'var(--accent)' }}>✓</div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 500, margin: 0 }}>Message Received</h3>
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: '1.1rem', color: 'var(--fg-dim)' }}>Thank you for reaching out. I'll get back to you shortly.</p>
                      <button onClick={() => setFormState('idle')} className="glass-pill link-hover" style={{ marginTop: '1.5rem', padding: '1rem 2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent)', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', cursor: 'pointer' }}>SEND ANOTHER MESSAGE</button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form" 
                      ref={form} 
                      initial="hidden" 
                      animate="show" 
                      exit={{ opacity: 0, y: -20 }} 
                      variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.15 } }
                      }}
                      onSubmit={handleSubmit} 
                      style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', flex: 1, justifyContent: 'space-between' }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>YOUR NAME</label><input name="user_name" required type="text" placeholder="John Doe" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontSize: '1.1rem', padding: '0.6rem 0', outline: 'none' }} /></motion.div>
                        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>EMAIL ADDRESS</label><input name="user_email" required type="email" placeholder="john@example.com" style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontSize: '1.1rem', padding: '0.6rem 0', outline: 'none' }} /></motion.div>
                      </div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>WHAT ARE YOU LOOKING FOR?</label><input name="project_type" required type="text" placeholder="e.g. Freelance project, full-time role..." style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontSize: '1.1rem', padding: '0.6rem 0', outline: 'none' }} /></motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}><label style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.05em' }}>YOUR MESSAGE</label><textarea name="message" required placeholder="Hello Anusha, I would like to discuss..." rows={3} style={{ background: 'transparent', border: 'none', borderBottom: '1px solid var(--glass-border)', color: 'var(--fg)', fontFamily: 'var(--font-sans)', fontSize: '1.1rem', padding: '0.6rem 0', outline: 'none', resize: 'vertical' }} /></motion.div>
                      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', gap: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}><a href="mailto:anushakirshna@gmail.com" className="link-hover" style={{ color: 'var(--fg-dim)' }}>Direct mail</a><a href="https://www.linkedin.com/in/anusha-kirshna/" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ color: 'var(--fg-dim)' }}>LinkedIn</a></div>
                        <button disabled={formState === 'submitting'} type="submit" className="glass-pill link-hover" style={{ padding: '0.8rem 1.8rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600, color: formState === 'submitting' ? 'var(--fg-dim)' : 'var(--accent)', background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', cursor: formState === 'submitting' ? 'not-allowed' : 'pointer' }}>{formState === 'submitting' ? 'SENDING...' : 'SEND MESSAGE'}</button>
                      </motion.div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <footer className="glass-panel" style={{ width: '100%', padding: '1rem var(--pad-x)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)', position: 'relative', zIndex: 10, borderBottom: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, background: 'rgba(0,0,0,0.2)' }}>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Magnetic><a href="https://github.com/AnushaKirshna2006" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ color: 'var(--fg)' }}>GitHub</a></Magnetic>
          <Magnetic><a href="https://linkedin.com/in/anusha-kirshna" target="_blank" rel="noopener noreferrer" className="link-hover" style={{ color: 'var(--fg)' }}>LinkedIn</a></Magnetic>
        </div>
        <div><a href="mailto:anushakirshna@gmail.com" className="link-hover" style={{ color: 'var(--accent)' }}>anushakirshna@gmail.com</a></div>
        <span style={{ color: 'var(--fg-muted)', letterSpacing: '0.05em' }}>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
      </footer>
    </section>
    </>
  );
};

export default ContactPage;
