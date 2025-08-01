import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import SecureChat from './components/SecureChat';
import FileVault from './components/FileVault';
import PasswordManager from './components/PasswordManager';
import BreachMonitor from './components/BreachMonitor';
import Settings from './components/Settings';

function App() {
  const [activeModule, setActiveModule] = useState('dashboard');

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <SecureChat />;
      case 'vault':
        return <FileVault />;
      case 'passwords':
        return <PasswordManager />;
      case 'breaches':
        return <BreachMonitor />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="flex">
        <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 ml-64 p-6 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {renderActiveModule()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;