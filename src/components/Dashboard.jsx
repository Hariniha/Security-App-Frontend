import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { Shield, Bell, MessageSquare, AlertTriangle, Play, Plus, Send, TrendingUp, Lock, Users } from 'lucide-react';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState({
    safetyScore: 0,
    alerts: 0,
    unreadMessages: 0,
    passwordStrength: 0,
    vaultEncryption: 0,
    twoFACoverage: 0,
    recentActivity: [],
  });


  
  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
  const res = await axios.get('/api/dashboard/summary');
        setSummary(res.data);
        setError('');
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const { safetyScore, alerts, unreadMessages, recentActivity } = summary;

  if (loading) return <div className="text-cyan-400">Loading dashboard...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

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
          <p className="text-sm text-center text-gray-400">{safetyScore > 80 ? 'Excellent Security' : safetyScore > 60 ? 'Good Security' : 'Needs Improvement'}</p>
        </div>

        {/* Recent Alerts */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Alerts</h3>
            <Bell className="w-6 h-6 text-yellow-400" />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-2">{alerts}</p>
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
            <p className="text-3xl font-bold text-white mb-2">{unreadMessages}</p>
            <p className="text-sm text-gray-400">Unread secure</p>
          </div>
        </div>

        {/* Breach Status */}
        

      {/* Quick Actions */}
      

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Security Timeline */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.length === 0 && <div className="text-gray-400">No recent activity</div>}
            {recentActivity.map((activity, index) => {
              let icon = Lock, color = 'text-cyan-400', text = activity.message || activity.type;
              if (activity.type === 'alert') { icon = AlertTriangle; color = 'text-yellow-400'; }
              if (activity.type === 'password') { icon = Lock; color = 'text-green-400'; }
              if (activity.type === 'chat') { icon = Users; color = 'text-blue-400'; }
              if (activity.type === 'scan') { icon = Shield; color = 'text-cyan-400'; }
              return (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
                  {React.createElement(icon, { className: `w-5 h-5 ${color}` })}
                  <div className="flex-1">
                    <p className="text-white text-sm">{text}</p>
                    <p className="text-gray-400 text-xs">{new Date(activity.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Security Stats */}
 
</div>
      </div>
    </div>
  );

}

export default Dashboard;