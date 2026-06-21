import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const GitHubStats = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/AnushaKirshna2006')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching GitHub stats:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="shimmer" style={{ height: '200px', borderRadius: '16px' }}></div>;
  if (!data || data.message) return null;

  return (
    <div className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header & Live Status */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.1em', margin: 0 }}>DEVELOPER STATS</h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(74, 222, 128, 0.1)', border: '1px solid rgba(74, 222, 128, 0.2)', padding: '0.4rem 1rem', borderRadius: '50px' }}>
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80' }} 
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#4ade80' }}>Building something cool...</span>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>REPOSITORIES</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 600, lineHeight: 1, color: 'var(--accent)' }}>{data.public_repos}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>FOLLOWERS</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 600, lineHeight: 1 }}>{data.followers}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>GISTS</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', fontWeight: 600, lineHeight: 1 }}>{data.public_gists}</span>
        </div>
        
        {/* Placeholder for top language */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>TOP LANGUAGE</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', fontWeight: 600, lineHeight: 1, color: 'var(--accent-2)' }}>React</span>
        </div>
      </div>

      <div style={{ marginTop: '1rem' }}>
        <a 
          href={data.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 1.5rem',
            background: 'var(--fg)',
            color: 'var(--bg)',
            borderRadius: '30px',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          View GitHub Profile
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>

    </div>
  );
};

export default GitHubStats;
