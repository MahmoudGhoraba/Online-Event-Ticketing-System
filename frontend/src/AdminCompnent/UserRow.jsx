import { useState } from 'react';
import axios from 'axios';

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
    <tr>
      <td>{user.id || user._id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        {isEditing ? (
          <select
            value={currentRole}
            onChange={(e) => setCurrentRole(e.target.value)}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
            <option value="Organizer">Organizer</option>
          </select>
        ) : (
          user.role
        )}
      </td>
      <td>
        {isEditing ? (
          <>
            <button 
              className="save-btn"
              onClick={handleUpdate}
              disabled={isDeleting}
            >
              Save
            </button>
            <button 
              className="cancel-btn"
              onClick={() => setIsEditing(false)}
              disabled={isDeleting}
            >
              Cancel
            </button>
          </>
        ) : (
          <button 
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            disabled={isDeleting}
          >
            Edit Role
          </button>
        )}
        <button 
          className="delete-btn"
          onClick={handleDelete}
          disabled={isEditing || isDeleting}
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </td>
    </tr>
  );
}