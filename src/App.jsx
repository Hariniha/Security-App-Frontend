import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/AuthPage';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SecureChat from './components/SecureChat';
import FileVault from './components/FileVault';
import PasswordManager from './components/PasswordManager';
import Settings from './components/Settings';
import ResetPassword from './components/ResetPassword';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeModule, setActiveModule] = useState('dashboard');

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveModule('dashboard');
  };

  return (
    <Router>
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
                          case 'chat':
                            return <SecureChat />;
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
    </Router>
  );
}

export default App;