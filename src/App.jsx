import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
// import SecureChat from './components/SecureChat';
import FileVault from './components/FileVault';
import PasswordManager from './components/PasswordManager';
import Settings from './components/Settings';
import ResetPassword from './components/ResetPassword';
import ChatPage from './components/ChatPage';




function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check for token in localStorage on initial load
    return !!localStorage.getItem('token');
  });
  const [activeModule, setActiveModule] = useState(() => {
    return localStorage.getItem('activeModule') || 'dashboard';
  });

  // Persist activeModule to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('activeModule', activeModule);
  }, [activeModule]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Keep isAuthenticated in sync with localStorage (e.g., if token is removed)
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule('dashboard');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('activeModule');
  };

  return (
    <>
  <ToastContainer position="top-center" autoClose={2000} />
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
                            // Get sender from localStorage (user info)
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
    </>
  );
}

export default App;