// src/UserProfileComponent/ProfilePage.jsx
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import UpdateProfileForm from './UpdateProfileForm';
import Navbar from '../sharedComponents/navBar';
import './ProfilePage.css';

// Import icons (you'll need to install react-icons: npm install react-icons)
import { FaUser, FaEdit, FaCog, FaSignOutAlt } from 'react-icons/fa';

function ProfilePage() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');

  if (!user) return <p className="text-red-500">User not found. Please login.</p>;

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="profile-container">
            <div className="profile-header">
              <h2 className="profile-title">User Profile</h2>
              {user.profilePicture && (
                <div className="profile-picture-container">
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="profile-picture"
                  />
                </div>
              )}
            </div>
            <div className="profile-info">
              <div className="info-item">
                <span className="info-label">Name</span>
                <span className="info-value">{user.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{user.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Role</span>
                <span className="info-value capitalize">{user.role}</span>
              </div>
            </div>
          </div>
        );
      case 'edit':
        return (
          <div className="profile-container">
            <UpdateProfileForm onFinish={() => setActiveSection('profile')} />
          </div>
        );
      case 'settings':
        return (
          <div className="profile-container">
            <h2 className="profile-title">Settings</h2>
            <div className="profile-info">
              {/* Add your settings content here */}
              <p>Settings page content coming soon...</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Account</h2>
          </div>
          <nav>
            <ul className="nav-menu">
              <li className="nav-item">
                <a
                  href="#profile"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('profile');
                  }}
                  className={`nav-link ${activeSection === 'profile' ? 'active' : ''}`}
                >
                  <FaUser className="nav-icon" />
                  View Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#edit"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('edit');
                  }}
                  className={`nav-link ${activeSection === 'edit' ? 'active' : ''}`}
                >
                  <FaEdit className="nav-icon" />
                  Edit Profile
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#settings"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('settings');
                  }}
                  className={`nav-link ${activeSection === 'settings' ? 'active' : ''}`}
                >
                  <FaCog className="nav-icon" />
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="profile-main-content">
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default ProfilePage;
