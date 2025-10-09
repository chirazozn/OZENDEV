import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatBox({ systemPrompt }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    // faire défiler vers le bas
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
  
    const userMsg = { role: 'user', content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
  
    try {
      // Envoi au backend
      const res = await axios.post('https://ozendev-backend.onrender.com/api/chat', {
        message: input.trim(),
      });
  
      // Réponse du bot
      if (res.data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Réponse vide du serveur.' }]);
      }
  
    } catch (err) {
      console.error("Erreur Chat :", err);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: '❌ Désolé, erreur serveur. Réessaie plus tard.' }
      ]);
    } finally {
      setLoading(false);
    }
  };
  

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div style={{ position:'fixed', right:20, bottom:20, width:360, maxWidth:'90%', boxShadow:'0 6px 18px rgba(0,0,0,0.15)', borderRadius:12, background:'#fff', zIndex:9999 }}>
      <div style={{ padding:12, borderBottom:'1px solid #eee', fontWeight:600 }}>Support IA</div>
      <div ref={containerRef} style={{ height:320, overflowY:'auto', padding:12 }}>
        {messages.map((m,i) => (
          <div key={i} style={{ marginBottom:10, textAlign: m.role==='user' ? 'right' : 'left' }}>
            <div style={{
              display:'inline-block',
              padding:'8px 12px',
              borderRadius:12,
              background: m.role==='user' ? '#002244' : '#f1f1f1',
              color: m.role==='user' ? '#fff' : '#000',
              maxWidth:'85%'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color:'#666', fontStyle:'italic' }}>L’IA rédige...</div>}
      </div>

      <div style={{ padding:12, borderTop:'1px solid #eee' }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Écris un message..."
          style={{ width:'100%', height:60, resize:'none', padding:8, borderRadius:8, border:'1px solid #ddd' }}
        />
        <button onClick={send} disabled={loading} style={{ marginTop:8, width:'100%', padding:10, background:'#002244', color:'#fff', borderRadius:8 }}>
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
