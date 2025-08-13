import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SecureChat from './components/SecureChat';
import FileVault from './components/FileVault';
import PasswordManager from './components/PasswordManager';
import Settings from './components/Settings';
import ResetPassword from './components/ResetPassword';
import ChatPage from './components/ChatPage';

function AppRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token') && !!localStorage.getItem('user');
  });
  const [activeModule, setActiveModule] = useState('dashboard');
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token') && !!localStorage.getItem('user'));
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setActiveModule('dashboard');
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="*"
        element={
          !isAuthenticated ? (
            <AuthPage onLogin={handleLogin} />
          ) : (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
              <div className="flex">
                <Sidebar
                  activeModule={activeModule}
                  setActiveModule={setActiveModule}
                  onLogout={handleLogout}
                />
                <main className="flex-1 ml-64 p-6 min-h-screen">
                  <div className="max-w-7xl mx-auto">
                    {(() => {
                      switch (activeModule) {
                        case 'dashboard':
                          return <Dashboard />;
                        case 'chat': {
                          let sender = 'alice';
                          try {
                            const user = JSON.parse(localStorage.getItem('user'));
                            if (user && user.email) sender = user.email;
                            if (user && user.username) sender = user.username;
                          } catch {}
                          return <ChatPage sender={sender} />;
                        }
                        case 'vault':
                          return <FileVault />;
                        case 'passwords':
                          return <PasswordManager />;
                        case 'settings':
                          return <Settings />;
                        default:
                          return <Dashboard />;
                      }
                    })()}
                  </div>
                </main>
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}

export default AppRoutes;
