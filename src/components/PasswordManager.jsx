
import React, { useState, useEffect } from 'react';
import { Key, Copy, Eye, EyeOff, Plus, Search, Filter, Shield, RefreshCw, Tag, Star, Trash2 } from 'lucide-react';
import axios from '../../utils/axios';

const PasswordManager = () => {
  const [showPassword, setShowPassword] = useState({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    username: '',
    password: '',
    url: '',
    notes: ''
  });
  const [error, setError] = useState('');

  // Fetch passwords from backend
  useEffect(() => {
    fetchPasswords();
  }, []);

  const fetchPasswords = async () => {
    setLoading(true);
    try {
    const res = await axios.get('/api/passwords');
      setPasswords(res.data);
    } catch (err) {
      setError('Failed to fetch passwords');
    } finally {
      setLoading(false);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('/api/passwords', form);
      setPasswords([res.data, ...passwords]);
      setShowAddForm(false);
      setForm({ title: '', username: '', password: '', url: '', notes: '' });
    } catch (err) {
      setError('Failed to add password');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePassword = async (id) => {
    if (!window.confirm('Delete this password?')) return;
    setLoading(true);
    setError('');
    try {
      await axios.delete(`/api/passwords/${id}`);
      setPasswords(passwords.filter(p => p._id !== id));
    } catch (err) {
      setError('Failed to delete password');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="space-y-4 sm:space-y-6 pb-4 px-2 sm:px-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 space-y-4 sm:space-y-0">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Password Manager</h1>
          <p className="text-gray-400 text-sm sm:text-base">Secure storage for all your passwords</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
        >
          <Plus className="w-4 sm:w-5 h-4 sm:h-5" />
          <span className="text-sm sm:text-base">Add Password</span>
        </button>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-cyan-500/20">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="relative w-full sm:w-auto">
              <Search className="w-4 sm:w-5 h-4 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search passwords..."
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 text-sm sm:text-base"
              />
            </div>
            <div className="flex space-x-2 sm:space-x-4">
              <select className="flex-1 sm:flex-none px-3 sm:px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-sm sm:text-base">
                <option value="">All Categories</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="finance">Finance</option>
              </select>
              <button className="flex items-center justify-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:text-white hover:border-cyan-500 transition-colors">
                <Filter className="w-4 h-4" />
                <span className="text-sm sm:text-base hidden sm:inline">Filter</span>
              </button>
            </div>
          </div>
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-right">
            {passwords.length} passwords stored
          </div>
        </div>
      </div>

      {/* Password List */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-white">Saved Passwords</h3>
          {loading && <span className="text-cyan-400 ml-2 sm:ml-4 text-sm sm:text-base">Loading...</span>}
        </div>
        {error && <div className="text-red-400 px-4 sm:px-6 py-2 text-sm sm:text-base">{error}</div>}
        <div className="divide-y divide-slate-700/50">
          {passwords.length === 0 && !loading && (
            <div className="p-4 sm:p-6 text-gray-400 text-center text-sm sm:text-base">No passwords found.</div>
          )}
          {passwords.map((password) => (
            <div key={password._id} className="p-4 sm:p-6 hover:bg-slate-700/30 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 flex-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                    <Key className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                      <h4 className="text-white font-medium text-base sm:text-lg truncate">{password.title || password.url || 'No Title'}</h4>
                      {password.url && <span className="px-2 py-1 bg-slate-700 text-xs text-cyan-300 rounded mt-1 sm:mt-0 inline-block w-fit">{password.url}</span>}
                    </div>
                    <p className="text-gray-400 text-sm mb-2 truncate">{password.username}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type={showPassword[password._id] ? 'text' : 'password'}
                          value={password.password}
                          readOnly
                          className="bg-slate-700/50 border border-slate-600 rounded px-2 sm:px-3 py-1 text-white text-xs sm:text-sm w-32 sm:w-40"
                        />
                        <button
                          onClick={() => togglePasswordVisibility(password._id)}
                          className="p-1 text-gray-400 hover:text-cyan-400 transition-colors"
                        >
                          {showPassword[password._id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(password.password)}
                          className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {password.notes && <div className="text-xs text-gray-400 mt-2 break-words">{password.notes}</div>}
                  </div>
                </div>
                <div className="flex items-center justify-end sm:justify-start space-x-2 sm:ml-4">
                  <button className="p-2 text-red-400 hover:text-red-600 transition-colors" onClick={() => handleDeletePassword(password._id)}>
                    <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Password Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleAddPassword} className="bg-slate-900 rounded-2xl p-4 sm:p-8 w-full max-w-md border border-cyan-500/30 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-4">Add New Password</h2>
            <input
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
              placeholder="Title (e.g. GitHub)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none text-sm sm:text-base"
            />
            <input
              name="username"
              value={form.username}
              onChange={handleFormChange}
              required
              placeholder="Username or Email"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none text-sm sm:text-base"
            />
            <input
              name="password"
              value={form.password}
              onChange={handleFormChange}
              required
              placeholder="Password"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none text-sm sm:text-base"
            />
            <input
              name="url"
              value={form.url}
              onChange={handleFormChange}
              placeholder="Website URL (optional)"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none text-sm sm:text-base"
            />
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleFormChange}
              placeholder="Notes (optional)"
              rows="3"
              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded bg-slate-800 text-white border border-slate-700 focus:border-cyan-500 outline-none text-sm sm:text-base resize-none"
            />
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded bg-slate-700 text-gray-300 hover:bg-slate-600 text-sm sm:text-base order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-cyan-500 text-white hover:bg-cyan-600 text-sm sm:text-base order-1 sm:order-2"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add'}
              </button>
            </div>
            {error && <div className="text-red-400 mt-2 text-sm sm:text-base">{error}</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default PasswordManager;