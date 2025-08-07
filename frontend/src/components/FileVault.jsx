import React, { useState } from 'react';
import { Upload, File, Lock, Download, Trash2, Clock, Key, Search, Filter } from 'lucide-react';

const FileVault = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'financial_report_2024.pdf',
      size: '2.4 MB',
      encrypted: true,
      passwordProtected: true,
      expiresIn: '7 days',
      uploadDate: '2024-01-15',
      status: 'secure'
    },
    {
      id: 2,
      name: 'personal_documents.zip',
      size: '15.8 MB',
      encrypted: true,
      passwordProtected: false,
      expiresIn: '30 days',
      uploadDate: '2024-01-14',
      status: 'secure'
    },
    {
      id: 3,
      name: 'backup_keys.txt',
      size: '1.2 KB',
      encrypted: true,
      passwordProtected: true,
      expiresIn: '2 days',
      uploadDate: '2024-01-10',
      status: 'expiring'
    }
  ]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file upload logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'secure':
        return 'text-green-400';
      case 'expiring':
        return 'text-yellow-400';
      case 'expired':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Secure File Vault</h1>
        <p className="text-gray-400">Encrypted storage for your sensitive documents</p>
      </div>

      {/* Upload Area */}
      <div
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
          dragActive
            ? 'border-cyan-400 bg-cyan-500/10'
            : 'border-gray-600 hover:border-cyan-500 bg-slate-800/40 backdrop-blur-xl'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Drop files to encrypt and store</h3>
        <p className="text-gray-400 mb-4">or</p>
        <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105">
          Browse Files
        </button>
        <p className="text-sm text-gray-500 mt-4">Files are automatically encrypted with AES-256</p>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-gray-300 hover:text-white hover:border-cyan-500 transition-colors">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          <div className="text-sm text-gray-400">
            {files.length} files • Total: 19.4 MB
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h3 className="text-xl font-semibold text-white">Stored Files</h3>
        </div>
        <div className="divide-y divide-slate-700/50">
          {files.map((file) => (
            <div key={file.id} className="p-6 hover:bg-slate-700/30 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <File className="w-8 h-8 text-cyan-400" />
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{file.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>Uploaded {file.uploadDate}</span>
                      <div className="flex items-center space-x-1">
                        <Lock className="w-3 h-3 text-green-400" />
                        <span className="text-green-400">Encrypted</span>
                      </div>
                      {file.passwordProtected && (
                        <div className="flex items-center space-x-1">
                          <Key className="w-3 h-3 text-blue-400" />
                          <span className="text-blue-400">Password Protected</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className={getStatusColor(file.status)}>
                        Expires in {file.expiresIn}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h4 className="text-lg font-semibold text-white mb-4">Storage Usage</h4>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Used</span>
              <span className="text-cyan-400">19.4 MB / 5 GB</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-[1%]"></div>
            </div>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h4 className="text-lg font-semibold text-white mb-4">Encryption</h4>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400 mb-2">AES-256</p>
            <p className="text-sm text-gray-400">Military-grade encryption</p>
          </div>
        </div>
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
          <h4 className="text-lg font-semibold text-white mb-4">Auto-Delete</h4>
          <div className="text-center">
            <p className="text-2xl font-bold text-yellow-400 mb-2">1</p>
            <p className="text-sm text-gray-400">Files expiring soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileVault;