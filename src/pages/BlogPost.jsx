import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Magnetic from '../components/Magnetic';
import { blogPosts } from './Blog';

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section style={{ 
      minHeight: '100vh', 
      background: 'var(--bg)', 
      color: 'var(--fg)', 
      padding: '4rem var(--pad-x) 8rem',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <Magnetic><Link to="/blog" className="link-hover" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--fg)' }}>← BACK TO SANDBOX</Link></Magnetic>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{ display: 'flex', gap: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '1.5rem' }}>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.1, letterSpacing: '-0.04em', marginBottom: '2rem' }}>
            {post.title}
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="glass-panel"
          style={{ padding: '4rem', fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--fg-dim)', fontFamily: 'var(--font-body)' }}
        >
          <p style={{ marginBottom: '4rem', fontSize: '1.4rem', color: 'var(--fg)', fontWeight: 500 }}>
            {post.excerpt}
          </p>
          
          <div className="blog-content-container">
            {post.content}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;
