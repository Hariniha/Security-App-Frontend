import React, { useState } from 'react';
import { Send, Clock, Shield, Smile, Paperclip, MoreVertical, Check, CheckCheck } from 'lucide-react';

const SecureChat = () => {
  const [message, setMessage] = useState('');
  const [selfDestructTimer, setSelfDestructTimer] = useState(60);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! How's the new security setup going?",
      sender: 'other',
      timestamp: '2:34 PM',
      status: 'read',
      encrypted: true
    },
    {
      id: 2,
      text: "Great! The new encryption protocols are working perfectly.",
      sender: 'me',
      timestamp: '2:35 PM',
      status: 'read',
      encrypted: true
    },
    {
      id: 3,
      text: "That's awesome! Let me know if you need any help with the implementation.",
      sender: 'other',
      timestamp: '2:36 PM',
      status: 'read',
      encrypted: true
    }
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: 'me',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        encrypted: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="h-screen flex flex-col max-h-[calc(100vh-3rem)]">
      {/* Header */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-semibold">AS</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">Alex Smith</h2>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-green-400">Online</span>
                <Shield className="w-4 h-4 text-cyan-400 ml-2" />
                <span className="text-cyan-400">End-to-End Encrypted</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                    : 'bg-slate-700/50 text-white'
                } relative group select-none`}
                onContextMenu={(e) => e.preventDefault()}
                style={{ userSelect: 'none' }}
              >
                <p className="text-sm">{msg.text}</p>
                <div className="flex items-center justify-between mt-2 text-xs opacity-70">
                  <span>{msg.timestamp}</span>
                  <div className="flex items-center space-x-1">
                    {msg.encrypted && <Shield className="w-3 h-3" />}
                    {msg.sender === 'me' && (
                      msg.status === 'read' ? <CheckCheck className="w-3 h-3" /> : <Check className="w-3 h-3" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Self-Destruct Timer */}
        <div className="px-6 py-3 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-yellow-400">
              <Clock className="w-4 h-4" />
              <span>Self-destruct: {selfDestructTimer}s</span>
            </div>
            <select
              value={selfDestructTimer}
              onChange={(e) => setSelfDestructTimer(Number(e.target.value))}
              className="bg-slate-700 text-white text-xs rounded px-2 py-1 border border-slate-600"
            >
              <option value={30}>30s</option>
              <option value={60}>1m</option>
              <option value={300}>5m</option>
              <option value={600}>10m</option>
            </select>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-6 border-t border-slate-700/50">
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-yellow-400 transition-colors">
              <Smile className="w-5 h-5" />
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type an encrypted message..."
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
            <button
              onClick={sendMessage}
              className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureChat;