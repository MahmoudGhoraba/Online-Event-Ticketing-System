import { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import AdminTables from './AdminEventsPage';
import './index.css';
import Navbar from '../sharedComponents/navBar';
import Footer from '../sharedComponents/Footer';
import Loader from '../sharedComponents/Loader';
import { Toast, showToast } from '../sharedComponents/Toast';
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
            const errorMessage = err.response?.data?.message || "Failed to load users";
            setError(errorMessage);
            showToast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchUsers(); }, []);

    if (loading) return <Loader />;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <>
        <Navbar />
        <div className="admin-users">
            <h1>Admin Users</h1>
            <UserTable 
                users={users} 
                onUsersChange={fetchUsers} 
            />
        </div>
        <Toast />
        <Footer />
        </>
    );
}
