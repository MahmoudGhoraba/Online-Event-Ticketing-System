import { useState } from 'react';
import UserRow from './UserRow';
import './UserTable.css';

export default function UserTable({ users, onUsersChange, isDarkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className={`user-table-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="user-table-search">
        <input
          type="text"
          placeholder="Search by name or email..."
          className={`search-input ${isDarkMode ? 'dark-mode' : ''}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className={`user-table admin-table ${isDarkMode ? 'dark-mode' : ''}`}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Current Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.length > 0 ? (
            paginatedUsers.map(user => (
              <UserRow 
                key={user.id || user._id} 
                user={user}
                onUsersChange={onUsersChange}
                isDarkMode={isDarkMode}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className={`user-table-empty ${isDarkMode ? 'dark-mode' : ''}`}>
                {searchTerm ? "No users found matching your search" : "No users available"}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className={`user-table-pagination ${isDarkMode ? 'dark-mode' : ''}`}>
          <button
            className={`pagination-button ${isDarkMode ? 'dark-mode' : ''}`}
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className={isDarkMode ? 'dark-mode' : ''}>Page {currentPage} of {totalPages}</span>
          <button
            className={`pagination-button ${isDarkMode ? 'dark-mode' : ''}`}
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}