import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ chart }) => {
  const ref = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'dark',
      securityLevel: 'loose',
      fontFamily: 'var(--font-mono)'
    });
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div 
      className="mermaid glass-panel" 
      ref={ref} 
      style={{ padding: '2rem', borderRadius: '12px', display: 'flex', justifyContent: 'center', overflowX: 'auto' }}
    >
      {chart}
    </div>
  );
};

export default MermaidDiagram;
