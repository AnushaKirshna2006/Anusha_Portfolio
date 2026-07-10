import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Avatar3D = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm Anusha's digital assistant. How can I help you today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const suggestedQuestions = [
    { q: "What is your core expertise?", a: "Anusha is a Frontend Developer who specializes in building highly interactive, accessible, and performant web applications using React and Framer Motion." },
    { q: "What technologies do you use?", a: "Her go-to stack includes React, Vite, Framer Motion for animations, and she loves using custom CSS to achieve pixel-perfect designs." },
    { q: "Are you available for work?", a: "Anusha is always open to discussing new projects, creative ideas or opportunities to be part of your visions." },
    { q: "Tell me a fun fact.", a: "When she's not writing code, she's probably exploring 3D web graphics or enjoying a good cup of coffee!" },
    { q: "How can I contact you?", a: "You can reach Anusha via email at anushakirshna@gmail.com or connect with her on GitHub." },
    { q: "What is your educational background?", a: "Anusha is currently a computing software engineering student at the University of Stirling." },
    { q: "What are your favorite tools?", a: "She loves working with VS Code, Git, Figma for UI design, and Vite for lightning-fast React development." },
    { q: "Do you have any certifications?", a: "Yes, she holds over 20 certifications in various domains including Full-Stack Web Development, Data Science, and UI/UX design." }
  ];

  const getAIResponse = async (input, history) => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    
    // Check if input matches a suggested question
    const matchedSuggestion = suggestedQuestions.find(sq => 
      sq.q.toLowerCase() === input.toLowerCase().trim() || 
      input.toLowerCase().includes(sq.q.toLowerCase().replace('?', ''))
    );

    if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
      if (matchedSuggestion) {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 800));
        return matchedSuggestion.a;
      }
      return "I'm currently running in offline demo mode without an API key! Please add a valid VITE_GEMINI_API_KEY to the .env file to chat with me freely.";
    }
    
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are a friendly AI assistant for Anusha's personal portfolio. You are polite, enthusiastic, and your job is to answer questions about Anusha's frontend development skills, projects, and contact information. Anusha specializes in building highly interactive, accessible, and performant web applications using modern React, Vite, and Framer Motion. She loves creative coding, 3D web graphics, and optimizing web performance. Keep your answers concise, friendly, and usually under 3 sentences unless asked for more detail."
      });

      // Build history for context: Gemini API requires history to start with a 'user' role
      const formattedHistory = history
        .filter((msg, index) => !(index === 0 && msg.sender === 'ai'))
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' : 'model',
          parts: [{ text: msg.text }]
        }));

      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(input);
      return result.response.text();
    } catch (error) {
      console.error("Gemini API Error:", error);
      return `Connection Error: ${error.message || 'Unknown error occurred'}`;
    }
  };

  const handleQuestionClick = async (qa) => {
    const currentHistory = [...messages];
    setMessages(prev => [...prev, { sender: 'user', text: qa.q }]);
    setIsTyping(true);
    
    const responseText = await getAIResponse(qa.q, currentHistory);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { sender: 'ai', text: responseText }]);
  };

  const handleClick = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem', pointerEvents: 'none' }}>
      <style>{`
        .chat-scroll::-webkit-scrollbar {
          width: 5px;
        }
        .chat-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .chat-scroll::-webkit-scrollbar-thumb {
          background: rgba(0, 242, 254, 0.4);
          border-radius: 10px;
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel"
            style={{
              width: 'clamp(280px, 80vw, 350px)',
              height: '450px',
              maxHeight: '70vh',
              borderRadius: '16px',
              position: 'absolute',
              bottom: '80px',
              right: '0',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              pointerEvents: 'auto',
              border: '1px solid var(--accent)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 242, 254, 0.2)'
            }}
          >
             {/* Chat Header */}
             <div style={{ padding: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <span style={{ fontSize: '1.2rem' }}>🤖</span> Anusha's AI
               </div>
               <button onClick={() => setIsOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '1.2rem' }}>&times;</button>
             </div>

             {/* Chat Messages */}
             <div 
               ref={chatContainerRef}
               className="chat-scroll"
               data-lenis-prevent="true" 
               onWheel={(e) => e.stopPropagation()}
               style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
             >
                {messages.map((msg, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx} 
                    style={{ 
                      alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                      background: msg.sender === 'user' ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: msg.sender === 'user' ? '1px solid rgba(0, 242, 254, 0.3)' : '1px solid rgba(255, 255, 255, 0.1)',
                      padding: '0.8rem 1rem',
                      borderRadius: msg.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                      maxWidth: '85%',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9rem',
                      lineHeight: 1.5,
                      color: 'var(--fg)'
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    style={{ alignSelf: 'flex-start', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', borderRadius: '16px 16px 16px 0' }}
                  >
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1.5 }} style={{ display: 'flex', gap: '5px' }}>
                      <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }} />
                      <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }} />
                      <div style={{ width: '6px', height: '6px', background: 'var(--accent)', borderRadius: '50%' }} />
                    </motion.div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
             </div>

             {/* Suggestions Chips */}
             <div 
               data-lenis-prevent="true"
               onWheel={(e) => e.stopPropagation()}
               className="hide-scrollbar" 
               style={{ padding: '0.6rem 1rem', display: 'flex', gap: '0.5rem', overflowX: 'auto', background: 'rgba(0,0,0,0.2)', borderTop: '1px solid rgba(255,255,255,0.1)' }}
             >
               {suggestedQuestions.map((qa, idx) => (
                 <button 
                   key={idx}
                   onClick={() => handleQuestionClick(qa)}
                   disabled={isTyping}
                   style={{
                     background: 'rgba(255,255,255,0.05)',
                     border: '1px solid rgba(255,255,255,0.2)',
                     padding: '0.4rem 0.8rem',
                     borderRadius: '20px',
                     color: 'var(--accent)',
                     fontFamily: 'var(--font-mono)',
                     fontSize: '0.7rem',
                     whiteSpace: 'nowrap',
                     cursor: isTyping ? 'not-allowed' : 'pointer',
                     transition: 'all 0.2s',
                   }}
                   onMouseEnter={e => !isTyping && (e.currentTarget.style.background = 'rgba(0, 242, 254, 0.1)')}
                   onMouseLeave={e => !isTyping && (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                 >
                   {qa.q}
                 </button>
               ))}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{ 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%',
          background: 'var(--accent)',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'auto',
          cursor: 'pointer',
          boxShadow: '0 4px 20px rgba(0, 242, 254, 0.4)'
        }}
        onClick={handleClick}
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </motion.button>
    </div>
  );
};

export default Avatar3D;
