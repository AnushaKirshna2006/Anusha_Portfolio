import React, { useEffect, useState } from 'react';

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

  if (loading) return <div style={{ color: 'var(--fg-dim)', fontFamily: 'var(--font-mono)' }}>Loading GitHub Stats...</div>;
  if (!data || data.message) return null; // Handle API rate limit or error

  return (
    <div style={{ marginTop: '2rem', padding: '2rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'var(--bg-2)' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem' }}>GITHUB STATS</div>
      
      <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>FOLLOWERS</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1 }}>{data.followers}</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>PUBLIC REPOS</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1 }}>{data.public_repos}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--fg-dim)' }}>GISTS</span>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', lineHeight: 1 }}>{data.public_gists}</span>
        </div>

        <a 
          href={data.html_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="link-hover"
          style={{
            marginLeft: 'auto',
            alignSelf: 'center',
            padding: '0.8rem 1.5rem',
            border: '1px solid var(--border)',
            borderRadius: '30px',
            color: 'var(--fg)',
            textDecoration: 'none',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          View Profile
        </a>
      </div>
    </div>
  );
};

export default GitHubStats;
