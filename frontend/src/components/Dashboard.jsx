import React from 'react';
import { Shield, Bell, MessageSquare, AlertTriangle, Play, Plus, Send, TrendingUp, Lock, Users } from 'lucide-react';

const Dashboard= () => {
  const safetyScore = 85;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Security Overview</h1>
        <p className="text-gray-400">Monitor your digital safety and security status</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Digital Safety Score */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Safety Score</h3>
            <Shield className="w-6 h-6 text-cyan-400" />
          </div>
          <div className="relative w-24 h-24 mx-auto mb-4">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                fill="none"
                stroke="rgb(71 85 105)"
                strokeWidth="2"
              />
              <path
                d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                fill="none"
                stroke="rgb(34 211 238)"
                strokeWidth="2"
                strokeDasharray={`${safetyScore}, 100`}
                className="animate-pulse"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-cyan-400">{safetyScore}%</span>
            </div>
          </div>
          <p className="text-sm text-center text-gray-400">Excellent Security</p>
        </div>

        {/* Recent Alerts */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Alerts</h3>
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">2</p>
            <p className="text-sm text-gray-400">New this week</p>
          </div>
        </div>

        {/* Secure Messages */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Messages</h3>
            <MessageSquare className="w-6 h-6 text-green-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">5</p>
            <p className="text-sm text-gray-400">Unread secure</p>
          </div>
        </div>

        {/* Breach Status */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Breaches</h3>
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">0</p>
            <p className="text-sm text-gray-400">Recent breaches</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-500/30 text-white hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-300 group">
            <Play className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Run Security Check</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl border border-green-500/30 text-white hover:from-green-500/30 hover:to-cyan-500/30 transition-all duration-300 group">
            <Plus className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Add Vault File</span>
          </button>
          <button className="flex items-center justify-center space-x-3 p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-blue-500/30 text-white hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300 group">
            <Send className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="font-medium">Start Secure Chat</span>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Timeline */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { icon: Lock, text: 'Password updated for GitHub', time: '2 hours ago', color: 'text-green-400' },
              { icon: Shield, text: 'Security scan completed', time: '5 hours ago', color: 'text-cyan-400' },
              { icon: Users, text: 'New secure chat initiated', time: '1 day ago', color: 'text-blue-400' },
              { icon: AlertTriangle, text: 'Breach alert resolved', time: '2 days ago', color: 'text-yellow-400' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.text}</p>
                  <p className="text-gray-400 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Stats */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h3 className="text-xl font-semibold text-white mb-6">Security Statistics</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Password Strength</span>
                <span className="text-cyan-400">92%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-500 to-green-500 h-2 rounded-full w-[92%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Vault Encryption</span>
                <span className="text-green-400">100%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">2FA Coverage</span>
                <span className="text-yellow-400">76%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full w-[76%]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;