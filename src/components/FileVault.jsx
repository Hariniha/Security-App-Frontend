import React, { useState, useEffect, useRef } from 'react';
import axios from '../../utils/axios';
import { Upload, File, Lock, Download, Trash2, Clock, Key, Search, Filter } from 'lucide-react';

const FileVault = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState({ totalFiles: 0, totalSize: '0 MB', maxStorage: '5 GB' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchFiles();
    fetchStats();
  }, []);

  const fetchFiles = async (searchQuery = '') => {
    setLoading(true);
    try {
  const res = await axios.get('/api/files', {
        params: searchQuery ? { search: searchQuery } : {}
      });
      setFiles(res.data);
    } catch (err) {
      setError('Failed to load files');
    }
    setLoading(false);
  };

  const fetchStats = async () => {
    try {
  const res = await axios.get('/api/files/stats');
      setStats(res.data);
    } catch (err) {
      setStats({ totalFiles: 0, totalSize: '0 MB', maxStorage: '5 GB' });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post('/api/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      fetchFiles();
      fetchStats();
    } catch (err) {
      setError('File upload failed');
    }
    setLoading(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const handleDownload = async (fileId, fileName) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/files/download/${fileId}`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('Download failed');
    }
    setLoading(false);
  };

  const handleDelete = async (fileId) => {
    const confirmed = window.confirm('Are you sure you want to delete this file?');
    if (!confirmed) return;
    setLoading(true);
    try {
      await axios.delete(`/api/files/${fileId}`);
      fetchFiles();
      fetchStats();
    } catch (err) {
      setError('Delete failed');
    }
    setLoading(false);
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
        <button
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 hover:scale-105"
          onClick={handleBrowseFiles}
        >
          Browse Files
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
        />
        <p className="text-sm text-gray-500 mt-4">Files are automatically encrypted with AES-256</p>
      </div>

      {/* Controls */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') fetchFiles(search);
                }}
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
              />
              <button
                className="ml-2 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                onClick={() => fetchFiles(search)}
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            
          </div>
          <div className="text-sm text-gray-400">
            {stats.totalFiles} files • Total: {stats.totalSize}
          </div>
        </div>
      </div>

      {/* Files List */}
      <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-cyan-500/20 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          {files.length === 0 && (
            <div className="p-6 text-gray-400">No files found.</div>
          )}
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
                    
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors" onClick={() => handleDownload(file.id, file.name)}>
                      <Download className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-400 transition-colors" onClick={() => handleDelete(file.id)}>
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     
        
      {loading && <div className="text-cyan-400">Loading...</div>}
      {error && <div className="text-red-400">{error}</div>}
    </div>
  );

}
export default FileVault;