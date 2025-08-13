import React, { useEffect, useState } from 'react';
import SecureChat from './SecureChat';
import axios from '../../utils/axios';

const ChatPage = ({ sender }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users');
        setUsers(res.data.filter(u => u.username !== sender));
        if (res.data.length > 0) setSelectedUser(res.data[0].username);
      } catch (err) {
        setUsers([]);
      }
    };
    fetchUsers();
  }, [sender]);

  return (
    <div className="flex h-full">
      {/* User List */}
      <div className="w-64 bg-slate-900/80 border-r border-cyan-700/20 rounded-2xl p-4 overflow-y-auto">
        <h3 className="text-lg font-bold text-cyan-300 mb-4">Users</h3>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.username}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selectedUser === user.username ? 'bg-cyan-700 text-white' : 'bg-slate-800 text-cyan-200 hover:bg-cyan-800'}`}
                onClick={() => setSelectedUser(user.username)}
              >
                {user.username}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Chat Box */}
      <div className="flex-1">
        {selectedUser ? (
          <SecureChat sender={sender} recipient={selectedUser} />
        ) : (
          <div className="flex items-center justify-center h-full text-cyan-400"></div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
