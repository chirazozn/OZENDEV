import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

export default function ChatBox() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '👋 Bonjour, je suis Innovabot ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: 'smooth'
    });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', content: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/chat', { message: input.trim() });
      if (res.data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Réponse vide du serveur.' }]);
      }
    } catch (err) {
      console.error("Erreur Chat :", err);
      setMessages(prev => [...prev, { role: 'assistant', content: '❌ Désolé, erreur serveur. Réessaie plus tard.' }]);
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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Messages */}
      <div ref={containerRef} style={{ flex: 1, overflowY: 'auto', padding: 12, backgroundColor: '#f9f9f9' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10, textAlign: m.role === 'user' ? 'right' : 'left' }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 12,
              background: m.role === 'user' ? '#002244' : '#eaeaea',
              color: m.role === 'user' ? '#fff' : '#000',
              maxWidth: '85%',
              wordWrap: 'break-word'
            }}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ color: '#666', fontStyle: 'italic' }}>L’IA rédige...</div>}
      </div>

      {/* Zone de saisie */}
      <div style={{
  padding: 12,
  borderTop: '1px solid #ddd',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center' // centre horizontalement
}}>        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKey}
          placeholder="Écris ton message ici..."
          style={{ width: '100%', height: 60, resize: 'none', padding: 8, borderRadius: 8, border: '1px solid #ccc' }}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{ marginTop: 8, width: '100%', padding: 10, background: '#002244', color: '#fff', borderRadius: 8, border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Envoi...' : 'Envoyer'}
        </button>
      </div>
    </div>
  );
}
