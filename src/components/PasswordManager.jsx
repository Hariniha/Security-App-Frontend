import React, { useState } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Search, Filter, Shield, RefreshCw, Tag, Star } from 'lucide-react';

const PasswordManager = () => {
  const [showPassword, setShowPassword] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [passwords, setPasswords] = useState([
    {
      id: 1,
      website: 'GitHub',
      username: 'john.doe@email.com',
      password: 'Gh7$kL9pX2@vN5',
      strength: 95,
      category: 'Development',
      tags: ['work', 'code'],
      lastUpdated: '2024-01-15',
      favorite: true
    },
    {
      id: 2,
      website: 'Gmail',
      username: 'john.doe@gmail.com',
      password: 'Zx8#mQ4wE6!rT2',
      strength: 88,
      category: 'Personal',
      tags: ['email', 'personal'],
      lastUpdated: '2024-01-10',
      favorite: false
    },
    {
      id: 3,
      website: 'Banking',
      username: 'johndoe123',
      password: 'Ab3$nM7yU9@kL1',
      strength: 92,
      category: 'Finance',
      tags: ['banking', 'finance'],
      lastUpdated: '2024-01-08',
      favorite: true
    }
  ]);

  const togglePasswordVisibility = (id) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Add toast notification here
  };

  const getStrengthColor = (strength) => {
    if (strength >= 90) return 'text-green-400';
    if (strength >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStrengthBg = (strength) => {
    if (strength >= 90) return 'bg-green-400';
    if (strength >= 70) return 'bg-yellow-400';
    return 'bg-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Password Manager</h1>
          <p className="text-gray-400">Secure storage for all your passwords</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          <span>Add Password</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search passwords..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <select className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500">
              <option value="">All Categories</option>
              <option value="personal">Personal</option>
              <option value="work">Work</option>
              <option value="finance">Finance</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:text-white hover:border-cyan-500 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {passwords.length} passwords stored
          </div>
        </div>
      </div>

      {/* Password List */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-xl font-semibold text-white">Saved Passwords</h3>
        </div>
        <div className="divide-y divide-slate-700/50">
          {passwords.map((password) => (
            <div key={password.id} className="p-6 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="text-white font-medium text-lg">{password.website}</h4>
                      {password.favorite && <Star className="w-4 h-4 text-yellow-400 fill-current" />}
                      <span className="px-2 py-1 bg-slate-700 text-xs text-gray-300 rounded">{password.category}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">{password.username}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type={showPassword[password.id] ? 'text' : 'password'}
                          value={password.password}
                          readOnly
                          className="bg-slate-700/50 border border-slate-600 rounded px-3 py-1 text-white text-sm w-40"
                        />
                        <button
                          onClick={() => togglePasswordVisibility(password.id)}
                          className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {showPassword[password.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Strength:</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${getStrengthBg(password.strength)}`}
                              style={{ width: `${password.strength}%` }}
                            ></div>
                          </div>
                          <span className={`text-sm font-medium ${getStrengthColor(password.strength)}`}>
                            {password.strength}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                    <RefreshCw className="w-5 h-5" />
                  </button>
                  <div className="text-right text-sm text-gray-400">
                    <p>Updated</p>
                    <p>{password.lastUpdated}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Average Strength</h4>
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-2">92%</p>
            <p className="text-sm text-gray-400">Excellent security</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Weak Passwords</h4>
            <Key className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-400 mb-2">0</p>
            <p className="text-sm text-gray-400">Need attention</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Duplicates</h4>
            <Copy className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400 mb-2">0</p>
            <p className="text-sm text-gray-400">Reused passwords</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordManager;