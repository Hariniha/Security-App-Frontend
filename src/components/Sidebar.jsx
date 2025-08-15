import React from 'react';
import { Shield, MessageSquare, FolderLock, Key, Settings, User, LogOut, Home } from 'lucide-react';

// Profile section as a separate component for clarity
function SidebarProfile({ onLogout }) {
  let name = 'User';
  let email = '';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      name = user.fullName || user.username || user.email || 'User';
      email = user.email || '';
    }
  } catch (e) {}
  return (
    <div className="flex items-center space-x-3 pr-3 pt-3 pb-3 rounded-lg bg-slate-800/50">
      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
        <User className="w-10 h-5 text-white" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-white">{name}</p>
        <p className="text-xs text-gray-400">{email}</p>
      </div>
      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors duration-200" onClick={onLogout}>
        <LogOut className="w-4 h-4" />
      </button>
    </div>
  );
}

const Sidebar = ({ activeModule, setActiveModule, onLogout, open, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'chat', label: 'Secure Chat', icon: MessageSquare },
    { id: 'vault', label: 'File Vault', icon: FolderLock },
    { id: 'passwords', label: 'Passwords', icon: Key },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-slate-900/90 backdrop-blur-xl border-r border-cyan-500/20 z-[100] min-w-[56px] transition-transform duration-300 sm:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'} sm:fixed sm:top-0 sm:left-0 sm:z-50`}
      style={{ boxShadow: '0 0 40px 0 rgba(0,0,0,0.2)' }}
    >
      {/* Header & Close for mobile */}
      <div className="p-6 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Shield className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Digital Safety</h1>
            <p className="text-sm text-gray-400">Dashboard</p>
          </div>
        </div>
        {/* Close button for mobile */}
        <button
          className="sm:hidden p-2 ml-2 rounded-lg text-cyan-400 hover:bg-slate-800/60 transition-colors"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeModule === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveModule(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    isActive
                      ? 'bg-cyan-500/20 text-cyan-400 shadow-lg shadow-cyan-500/10'
                      : 'text-gray-300 hover:bg-slate-800/50 hover:text-white'
                  }`}
                >
                  <Icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${
                    isActive ? 'text-cyan-400' : 'text-gray-400 group-hover:text-cyan-400'
                  }`} />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      {/* Profile Section */}
      <div className="p-4 border-t border-cyan-500/20">
        <SidebarProfile onLogout={onLogout} />
      </div>
    </div>
  );
}

export default Sidebar;