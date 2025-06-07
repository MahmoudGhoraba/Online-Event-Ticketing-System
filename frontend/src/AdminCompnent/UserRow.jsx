import { useState } from 'react';
import axios from 'axios';
import './UserRow.css';
import { showToast } from '../sharedComponents/Toast';

export default function UserRow({ user, onUsersChange, isDarkMode }) {
    const [isEditing, setIsEditing] = useState(false);
    const [currentRole, setCurrentRole] = useState(user.role);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleUpdate = async () => {
        try {
            await axios.put(
                `http://localhost:3000/api/v1/users/${user.id || user._id}`,
                { role: currentRole }
            );
            onUsersChange();
            setIsEditing(false);
            showToast.success(`Successfully updated ${user.name}'s role to ${currentRole}`);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to update user role";
            showToast.error(errorMessage);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm(`Delete ${user.name}?`)) return;
        
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:3000/api/v1/users/${user.id || user._id}`);
            onUsersChange();
            showToast.success(`Successfully deleted user ${user.name}`);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "Failed to delete user";
            showToast.error(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <tr className={`user-row ${isDeleting ? 'user-row-loading' : ''} ${isDarkMode ? 'dark-mode' : ''}`}>
            <td className={`user-row-cell user-row-id ${isDarkMode ? 'dark-mode' : ''}`}>{user.id || user._id}</td>
            <td className={`user-row-cell user-row-name ${isDarkMode ? 'dark-mode' : ''}`}>{user.name}</td>
            <td className={`user-row-cell user-row-email ${isDarkMode ? 'dark-mode' : ''}`}>{user.email}</td>
            <td className={`user-row-cell ${isDarkMode ? 'dark-mode' : ''}`}>
                {isEditing ? (
                    <select
                        className={`user-role-select ${isDarkMode ? 'dark-mode' : ''}`}
                        value={currentRole}
                        onChange={(e) => setCurrentRole(e.target.value)}
                    >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                        <option value="Organizer">Organizer</option>
                    </select>
                ) : (
                    <span className={`user-role-display ${currentRole.toLowerCase()} ${isDarkMode ? 'dark-mode' : ''}`}>
                        {currentRole}
                    </span>
                )}
            </td>
            <td className={`user-row-cell ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="user-row-actions">
                    {isEditing ? (
                        <>
                            <button 
                                className={`user-row-btn user-row-save-btn ${isDarkMode ? 'dark-mode' : ''}`}
                                onClick={handleUpdate}
                                disabled={isDeleting}
                            >
                                Save
                            </button>
                            <button 
                                className={`user-row-btn user-row-cancel-btn ${isDarkMode ? 'dark-mode' : ''}`}
                                onClick={() => setIsEditing(false)}
                                disabled={isDeleting}
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button 
                            className={`user-row-btn user-row-edit-btn ${isDarkMode ? 'dark-mode' : ''}`}
                            onClick={() => setIsEditing(true)}
                            disabled={isDeleting}
                        >
                            Edit Role
                        </button>
                    )}
                    <button 
                        className={`user-row-btn user-row-delete-btn ${isDarkMode ? 'dark-mode' : ''}`}
                        onClick={handleDelete}
                        disabled={isEditing || isDeleting}
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </td>
        </tr>
    );
}