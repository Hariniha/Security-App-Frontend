import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import { Menu } from 'lucide-react';
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

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
                {/* Hamburger for mobile */}
                <button
                  className="fixed top-4 left-4 z-[100] p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-400 shadow-lg sm:hidden"
                  onClick={() => setSidebarOpen(true)}
                  aria-label="Open sidebar"
                >
                  <Menu className="w-7 h-7" />
                </button>
                {/* Sidebar Drawer Overlay */}
                {sidebarOpen && (
                  <div className="fixed inset-0 z-50 bg-black/40 sm:hidden" onClick={() => setSidebarOpen(false)} />
                )}
                <div className="flex">
                  <Sidebar
                    activeModule={activeModule}
                    setActiveModule={setActiveModule}
                    onLogout={handleLogout}
                    open={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                  />
                  <main className="flex-1 sm:ml-64 p-2 sm:p-6 min-h-screen pt-16 sm:pt-6">
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