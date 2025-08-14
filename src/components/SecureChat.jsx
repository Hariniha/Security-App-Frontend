  


import EmojiPicker from 'emoji-picker-react';
import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axios';
import { io } from 'socket.io-client';
import { Send, Clock, Shield, Smile, Check, CheckCheck } from 'lucide-react';

const SecureChat = ({ sender, recipient }) => {


  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selfDestructTimer, setSelfDestructTimer] = useState(60);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/api/chat/messages', {
          params: { user1: sender, user2: recipient }
        });
        setMessages(res.data.map(msg => ({
          ...msg,
          _id: msg._id || msg.id || Math.random().toString(36).substr(2, 9), // fallback if missing
          text: msg.encryptedText,
          sender: msg.sender === sender ? 'me' : 'other',
          timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read',
          encrypted: true
        })));
      } catch (err) {
        // handle error
      }
    };
    fetchMessages();
  }, [sender, recipient]);

  useEffect(() => {
    socketRef.current = io('https://security-app-backend-ub96.onrender.com');
    socketRef.current.emit('join', { sender, recipient });
    socketRef.current.on('receiveMessage', (msg) => {
      setMessages(prev => {
        // If this is a message sent by me, update the last 'sent' message to 'read' (double tick)
        if (msg.sender === sender) {
          // Try to find a matching message by text, timestamp, and recipient
          const idx = prev.findIndex(m =>
            m.sender === 'me' &&
            m.text === msg.encryptedText &&
            m.recipient === msg.recipient &&
            m.status === 'sent'
          );
          if (idx !== -1) {
            // Update the status to 'read' and set _id from server
            const updated = [...prev];
            updated[idx] = {
              ...updated[idx],
              status: 'read',
              _id: msg._id || updated[idx]._id // set _id if available
            };
            return updated;
          }
        }
        // Otherwise, just add the message as usual
        return [
          ...prev,
          {
            ...msg,
            text: msg.encryptedText,
            sender: msg.sender === sender ? 'me' : 'other',
            timestamp: new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: 'read',
            encrypted: true
          }
        ];
      });
    });
    // Listen for real-time message deletions
    socketRef.current.on('messages_deleted', ({ ids }) => {
      console.log('Received messages_deleted event for IDs:', ids);
      setMessages(prev => prev.filter(msg => !ids.includes(msg._id)));
    });
    return () => {
      socketRef.current.disconnect();
    };
  }, [sender, recipient]);

  const sendMessage = async () => {
  // Allow sending emoji-only messages (any non-empty string, including emojis)
  if (!message || message.length === 0) return;
    const encryptedText = message;
    const msgPayload = {
      sender,
      recipient,
      encryptedText,
      selfDestructSeconds: selfDestructTimer
    };
    try {
      await axios.post('/api/chat/send', msgPayload);
      socketRef.current.emit('sendMessage', {
        ...msgPayload,
        timestamp: new Date().toISOString()
      });
  // Do not update messages here; wait for socket 'receiveMessage' event
      setMessage('');
    } catch (err) {
      // handle error
    }
  };

  const handleEmojiSelect = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };


  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-cyan-700/30 p-2">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-slate-900/80 rounded-t-2xl border-b border-cyan-700/20">
        <div className="flex items-center space-x-4">
          <div>
            <h2 className="text-2xl font-bold text-cyan-300 tracking-wide">{recipient}</h2>
            <div className="flex items-center space-x-2 text-xs mt-1">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 font-medium">End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 bg-slate-900/60 rounded-b-2xl border-b border-cyan-700/10">
        <div className="space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={msg._id || idx}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-5 py-3 rounded-2xl shadow-lg ${
                  msg.sender === 'me'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border border-cyan-400/40'
                    : 'bg-slate-800/80 text-white border border-slate-600/40'
                } relative group select-none`}
                onContextMenu={(e) => e.preventDefault()}
                style={{ userSelect: 'none' }}
              >






                {/* Only show text messages */}
                <p className="text-base leading-relaxed break-words">{msg.text}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-80">
                  <span>{msg.timestamp}</span>
                  <div className="flex items-center space-x-1">
                    {msg.encrypted && <Shield className="w-3 h-3 text-cyan-300" />}
                    {msg.sender === 'me' && (
                      msg.status === 'read' ? <CheckCheck className="w-3 h-3 text-cyan-200" /> : <Check className="w-3 h-3 text-cyan-200" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Self-Destruct Timer & Input */}
      <div className="bg-slate-900/80 border-t border-cyan-700/20 px-6 py-4 rounded-b-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2 text-yellow-400">
            <Clock className="w-4 h-4" />
            <span className="font-medium">Selfdestruct: {selfDestructTimer}s</span>
          </div>
          <select
            value={selfDestructTimer}
            onChange={(e) => setSelfDestructTimer(Number(e.target.value))}
            className="bg-slate-800 text-cyan-200 text-xs rounded px-2 py-1 border border-cyan-700/40 focus:outline-none"
          >
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={300}>5m</option>
            <option value={600}>10m</option>
          </select>
        </div>
        <div className="flex items-center space-x-3 mt-2">
          {/* Smile for emoji picker */}
          <div className="relative">
            <button
              className="p-2 text-yellow-300 hover:text-yellow-400 transition-colors"
              onClick={() => setShowEmojiPicker((v) => !v)}
            >
              <Smile className="w-5 h-5" />
            </button>
            {showEmojiPicker && (
              <div className="absolute z-50 bottom-12 left-0 bg-slate-900 rounded shadow-lg border border-cyan-700/30">
                <EmojiPicker onEmojiClick={handleEmojiSelect} theme="dark" />
              </div>
            )}
          </div>
          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type an encrypted message..."
              className="w-full px-4 py-3 bg-slate-800/70 border border-cyan-700/40 rounded-xl text-cyan-100 placeholder-cyan-400 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>
          <button
            onClick={sendMessage}
            className="p-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-200 hover:scale-105 shadow-lg"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;