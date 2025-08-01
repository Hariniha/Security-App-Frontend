import React, { useState } from 'react';
import { AlertTriangle, Mail, Shield, Plus, Search, Trash2, Bell, CheckCircle, XCircle } from 'lucide-react';

const BreachMonitor = () => {
  const [newEmail, setNewEmail] = useState('');
  const [emails, setEmails] = useState([
    {
      id: 1,
      email: 'john.doe@gmail.com',
      breachCount: 2,
      lastChecked: '2024-01-15',
      status: 'monitored',
      breaches: ['LinkedIn (2021)', 'Adobe (2019)'],
      alertsEnabled: true
    },
    {
      id: 2,
      email: 'john.work@company.com',
      breachCount: 0,
      lastChecked: '2024-01-15',
      status: 'clean',
      breaches: [],
      alertsEnabled: true
    },
    {
      id: 3,
      email: 'old.email@service.com',
      breachCount: 5,
      lastChecked: '2024-01-14',
      status: 'high-risk',
      breaches: ['Facebook (2019)', 'Twitter (2020)', 'Dropbox (2012)', 'Yahoo (2013)', 'Equifax (2017)'],
      alertsEnabled: false
    }
  ]);

  const addEmail = () => {
    if (newEmail.trim() && newEmail.includes('@')) {
      const newEmailEntry = {
        id: emails.length + 1,
        email: newEmail,
        breachCount: 0,
        lastChecked: new Date().toISOString().split('T')[0],
        status: 'checking',
        breaches: [],
        alertsEnabled: true
      };
      setEmails([...emails, newEmailEntry]);
      setNewEmail('');
    }
  };

  const removeEmail = (id) => {
    setEmails(emails.filter(email => email.id !== id));
  };

  const toggleAlerts = (id) => {
    setEmails(emails.map(email => 
      email.id === id ? { ...email, alertsEnabled: !email.alertsEnabled } : email
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'clean':
        return 'text-green-400';
      case 'monitored':
        return 'text-yellow-400';
      case 'high-risk':
        return 'text-red-400';
      case 'checking':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'clean':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'monitored':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'high-risk':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'checking':
        return <Shield className="w-5 h-5 text-blue-400 animate-pulse" />;
      default:
        return <Shield className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Breach Monitor</h1>
        <p className="text-gray-400">Monitor your email addresses for data breaches</p>
      </div>

      {/* Add Email */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <h3 className="text-xl font-semibold text-white mb-4">Add Email to Monitor</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addEmail()}
              placeholder="Enter email address to monitor..."
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
          <button
            onClick={addEmail}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
          >
            <Plus className="w-5 h-5" />
            <span>Monitor</span>
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          We'll check your email against known data breaches and notify you of any findings
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Monitored</h4>
            <Mail className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-cyan-400 mb-2">{emails.length}</p>
            <p className="text-sm text-gray-400">Email addresses</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Clean</h4>
            <CheckCircle className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-400 mb-2">
              {emails.filter(e => e.status === 'clean').length}
            </p>
            <p className="text-sm text-gray-400">No breaches</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">At Risk</h4>
            <AlertTriangle className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-yellow-400 mb-2">
              {emails.filter(e => e.status === 'monitored' || e.status === 'high-risk').length}
            </p>
            <p className="text-sm text-gray-400">Found in breaches</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-white">Total Breaches</h4>
            <XCircle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-400 mb-2">
              {emails.reduce((sum, email) => sum + email.breachCount, 0)}
            </p>
            <p className="text-sm text-gray-400">Incidents found</p>
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">Monitored Emails</h3>
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search emails..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>
        <div className="divide-y divide-slate-700/50">
          {emails.map((email) => (
            <div key={email.id} className="p-6 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-slate-600 to-slate-700 flex items-center justify-center">
                    {getStatusIcon(email.status)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-white font-medium text-lg">{email.email}</h4>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        email.status === 'clean' ? 'bg-green-900/50 text-green-400' :
                        email.status === 'monitored' ? 'bg-yellow-900/50 text-yellow-400' :
                        email.status === 'high-risk' ? 'bg-red-900/50 text-red-400' :
                        'bg-blue-900/50 text-blue-400'
                      }`}>
                        {email.status.replace('-', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-6 text-sm text-gray-400">
                      <span>Breaches: <span className={getStatusColor(email.status)}>{email.breachCount}</span></span>
                      <span>Last checked: {email.lastChecked}</span>
                      <div className="flex items-center space-x-2">
                        <Bell className={`w-4 h-4 ${email.alertsEnabled ? 'text-cyan-400' : 'text-gray-500'}`} />
                        <span>Alerts {email.alertsEnabled ? 'On' : 'Off'}</span>
                      </div>
                    </div>
                    {email.breaches.length > 0 && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-400 mb-2">Found in breaches:</p>
                        <div className="flex flex-wrap gap-2">
                          {email.breaches.map((breach, index) => (
                            <span key={index} className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded">
                              {breach}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => toggleAlerts(email.id)}
                    className={`p-2 transition-colors ${
                      email.alertsEnabled 
                        ? 'text-cyan-400 hover:text-cyan-300' 
                        : 'text-gray-500 hover:text-cyan-400'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => removeEmail(email.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreachMonitor;