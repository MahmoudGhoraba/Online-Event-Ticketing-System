import { useState } from 'react';
import axios from 'axios';
import './UserRow.css';

export default function UserRow({ user, onUsersChange }) {
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
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete ${user.name}?`)) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${user.id || user._id}`);
      onUsersChange();
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <tr className={`user-row ${isDeleting ? 'user-row-loading' : ''}`}>
      <td className="user-row-cell user-row-id">{user.id || user._id}</td>
      <td className="user-row-cell user-row-name">{user.name}</td>
      <td className="user-row-cell user-row-email">{user.email}</td>
      <td className="user-row-cell">
        {isEditing ? (
          <select
            className="user-role-select"
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Organizer">Organizer</option>
          </select>
        ) : (
          <span className={`user-role-display ${currentRole.toLowerCase()}`}>
            {currentRole}
          </span>
        )}
      </td>
      <td className="user-row-cell">
        <div className="user-row-actions">
          {isEditing ? (
            <>
              <button 
                className="user-row-btn user-row-save-btn"
                onClick={handleUpdate}
                disabled={isDeleting}
              >
                Save
              </button>
              <button 
                className="user-row-btn user-row-cancel-btn"
                onClick={() => setIsEditing(false)}
                disabled={isDeleting}
              >
                Cancel
              </button>
            </>
          ) : (
            <button 
              className="user-row-btn user-row-edit-btn"
              onClick={() => setIsEditing(true)}
              disabled={isDeleting}
            >
              Edit Role
            </button>
          )}
          <button 
            className="user-row-btn user-row-delete-btn"
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