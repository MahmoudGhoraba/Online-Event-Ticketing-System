import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import Navbar from '../sharedComponents/navBar';
import './AdminPages.css';
axios.defaults.withCredentials = true;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/users');
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  if (loading) return <div className="admin-loading">Loading users...</div>;
  if (error) return <div className="admin-error">Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1>Manage Users</h1>
        </div>
        <div className="admin-content">
          <div className="admin-controls">
            <input
              type="search"
              placeholder="Search users..."
              className="admin-search"
            />
          </div>
          <UserTable 
            users={users} 
            onUsersChange={fetchUsers} 
          />
        </div>
      </div>
    </>
  );
}
