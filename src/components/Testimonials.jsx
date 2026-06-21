import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    quote: "Anusha demonstrates exceptional attention to detail in her frontend work. Her ability to translate complex requirements into elegant, user-friendly interfaces sets her apart from her peers.",
    name: "Dr. Sarah Mitchell",
    role: "Senior Lecturer, University of Stirling",
    initials: "SM"
  },
  {
    id: 2,
    quote: "Working with Anusha on the Virtual Study Buddy project was an incredible experience. Her deep understanding of React and her eye for design elevated our entire team's output.",
    name: "Arjun Patel",
    role: "Peer Developer & Collaborator",
    initials: "AP"
  },
  {
    id: 3,
    quote: "Anusha's data visualization dashboards transformed how we interpreted clinical datasets. Her technical skills combined with her creative approach delivered results beyond our expectations.",
    name: "Dr. Khalid Al-Rashid",
    role: "Director, RAK Dental Care",
    initials: "KR"
  },
  {
    id: 4,
    quote: "She brings a rare combination of technical precision and artistic sensibility. Every project she touches becomes not just functional, but genuinely beautiful to interact with.",
    name: "Priya Sharma",
    role: "UI/UX Lead, /function AI Conference",
    initials: "PS"
  }
];

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [isPaused, next]);

  const t = testimonials[current];

  return (
    <section id="testimonials" style={{
      padding: '10rem var(--pad-x)',
      position: 'relative'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(0, 242, 254, 0.06) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: 'center', marginBottom: '5rem' }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
          textTransform: 'uppercase', letterSpacing: '0.15em',
          color: 'var(--accent)', display: 'block', marginBottom: '1.5rem'
        }}>
          What People Say
        </span>
        <h2 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.02em'
        }}>
          Testimonials.
        </h2>
      </motion.div>

      {/* Testimonial Card */}
      <div
        style={{
          maxWidth: '900px', margin: '0 auto', position: 'relative',
          minHeight: '320px'
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="glass-panel"
            style={{
              padding: 'clamp(2rem, 4vw, 4rem)',
              position: 'relative',
              textAlign: 'center'
            }}
          >
            {/* Decorative Quote Mark */}
            <div style={{
              position: 'absolute', top: '-1rem', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Georgia, serif', fontSize: '8rem',
              color: 'var(--accent)', opacity: 0.15,
              lineHeight: 1, pointerEvents: 'none', userSelect: 'none'
            }}>
              "
            </div>

            {/* Quote */}
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 1.5vw, 1.35rem)',
              lineHeight: 1.8, color: 'var(--fg)',
              fontStyle: 'italic', maxWidth: '700px',
              margin: '0 auto 2.5rem', position: 'relative', zIndex: 2,
              fontWeight: 400
            }}>
              "{t.quote}"
            </p>

            {/* Author */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '1rem', position: 'relative', zIndex: 2
            }}>
              {/* Avatar Circle */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
                fontWeight: 700, color: 'var(--bg)',
                flexShrink: 0
              }}>
                {t.initials}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'var(--font-body)', fontSize: '1rem',
                  fontWeight: 600, color: 'var(--fg)'
                }}>
                  {t.name}
                </div>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                  color: 'var(--fg-dim)', letterSpacing: '0.02em'
                }}>
                  {t.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          style={{
            position: 'absolute', left: '-3.5rem', top: '50%',
            transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            color: 'var(--fg)', fontSize: '1.2rem',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--fg)'; }}
        >
          ←
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          style={{
            position: 'absolute', right: '-3.5rem', top: '50%',
            transform: 'translateY(-50%)',
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
            border: '1px solid var(--glass-border)',
            color: 'var(--fg)', fontSize: '1.2rem',
            cursor: 'pointer', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--glass-border)'; e.currentTarget.style.color = 'var(--fg)'; }}
        >
          →
        </button>
      </div>

      {/* Progress Dots */}
      <div style={{
        display: 'flex', justifyContent: 'center', gap: '0.75rem',
        marginTop: '2.5rem'
      }}>
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to testimonial ${idx + 1}`}
            style={{
              width: idx === current ? '32px' : '10px',
              height: '10px',
              borderRadius: '10px',
              background: idx === current
                ? 'linear-gradient(90deg, var(--accent), var(--accent-2))'
                : 'rgba(255,255,255,0.15)',
              border: 'none', cursor: 'pointer',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: idx === current ? '0 0 12px rgba(0, 242, 254, 0.4)' : 'none'
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
