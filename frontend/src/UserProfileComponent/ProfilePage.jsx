// src/UserProfileComponent/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import UpdateProfileForm from './UpdateProfileForm';
import Navbar from '../sharedComponents/navBar';
import './ProfilePage.css';
import { useNavigate } from 'react-router-dom';
import Footer from '../sharedComponents/Footer';
import axios from 'axios';
// Import icons (you'll need to install react-icons: npm install react-icons)
import { FaUser, FaEdit, FaCog, FaSignOutAlt, FaSearch, FaBell, FaLock, FaHistory, FaHeart, FaTicketAlt, FaChartLine } from 'react-icons/fa';

/*
Backend Requirements:

1. Activity History Endpoint:
   GET /api/v1/users/activity
   - Returns user's recent activities (bookings, reviews, favorites)
   - Include timestamp, action type, and related event details
   - Optional: Add pagination

2. Account Statistics Endpoint:
   GET /api/v1/users/statistics
   - Returns user's account statistics
   - Total bookings, reviews given, favorite events, etc.
   - Optional: Add date range filter

3. Notification Settings Endpoint:
   GET /api/v1/users/notification-settings
   - Returns user's current notification preferences
   PUT /api/v1/users/notification-settings
   - Update notification preferences

4. Security Settings Endpoint:
   PUT /api/v1/users/security
   - Update password
   - Enable/disable two-factor authentication
   - Manage connected devices

5. Favorites Endpoint:
   GET /api/v1/users/favorites
   - Returns user's favorite events
   DELETE /api/v1/users/favorites/:eventId
   - Remove an event from favorites

6. User Reviews Endpoint:
   GET /api/v1/users/reviews
   - Returns reviews written by the user
   - Include event details and timestamps
*/

function ProfilePage() {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('profile');
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();




  const getBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/users/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to get bookings from database");
    }
  };
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    totalReviews: 0,
    favoriteEvents: 0,
    lastLogin: null
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    marketingEmails: false
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [favoriteEvents, setFavoriteEvents] = useState([]);

  // Placeholder for actual API calls
  useEffect(() => {
    if (user.role === 'User') {
      getBookings();
    }
    // These will be replaced with actual API calls
    setStatistics({
      totalBookings: 12,
      totalReviews: 5,
      favoriteEvents: 8,
      lastLogin: new Date().toISOString()
    });

    setRecentActivity([
      {
        id: 1,
        type: 'booking',
        eventName: 'Summer Music Festival',
        date: new Date().toISOString(),
        status: 'confirmed'
      },
      // Add more mock activities
    ]);

    setFavoriteEvents([
      {
        id: 1,
        name: 'Jazz Night',
        date: '2024-04-15',
        venue: 'Blue Note'
      },
      // Add more mock favorite events
    ]);
  }, []);

  const handleNotificationChange = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    // TODO: Call API to update notification settings
  };

  const renderStatistics = () => (
    <div className="statistics-container">
      <h3 className="statistics-title">Account Statistics</h3>
      <div className="statistics-grid">
        <div className="statistic-item">
          <FaTicketAlt className="statistic-icon" />
          <div className="statistic-info">
            <span className="statistic-value">{bookings.length}</span>
            <span className="statistic-label">Total Bookings</span>
          </div>
        </div>
        <div className="statistic-item">
          <FaChartLine className="statistic-icon" />
          <div className="statistic-info">
            <span className="statistic-value">{statistics.totalReviews}</span>
            <span className="statistic-label">Reviews Given</span>
          </div>
        </div>
        <div className="statistic-item">
          <FaHeart className="statistic-icon" />
          <div className="statistic-info">
            <span className="statistic-value">{statistics.favoriteEvents}</span>
            <span className="statistic-label">Favorite Events</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3 className="settings-title">Notification Preferences</h3>
      <div className="settings-options">
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={notificationSettings.emailNotifications}
              onChange={() => handleNotificationChange('emailNotifications')}
            />
            Email Notifications
          </label>
          <p className="setting-description">Receive important updates via email</p>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={notificationSettings.pushNotifications}
              onChange={() => handleNotificationChange('pushNotifications')}
            />
            Push Notifications
          </label>
          <p className="setting-description">Get instant notifications in your browser</p>
        </div>
        <div className="setting-item">
          <label className="setting-label">
            <input
              type="checkbox"
              checked={notificationSettings.eventReminders}
              onChange={() => handleNotificationChange('eventReminders')}
            />
            Event Reminders
          </label>
          <p className="setting-description">Receive reminders before your events</p>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <h3 className="settings-title">Security Settings</h3>
      <div className="security-options">
        <button className="security-button">
          <FaLock className="button-icon" />
          Change Password
        </button>
        <button className="security-button">
          Enable Two-Factor Authentication
        </button>
        <button className="security-button">
          Manage Connected Devices
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
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
            {user.role==='User' && renderStatistics()}
          </div>
        );
      case 'activity':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
            <h2 className="profile-title">Recent Activity</h2>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {activity.type === 'booking' ? <FaTicketAlt /> : <FaHeart />}
                  </div>
                  <div className="activity-details">
                    <h4>{activity.eventName}</h4>
                    <p>{new Date(activity.date).toLocaleDateString()}</p>
                    <span className={`activity-status ${activity.status}`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
            <h2 className="profile-title">Favorite Events</h2>
            <div className="favorites-grid">
              {favoriteEvents.map(event => (
                <div key={event.id} className="favorite-event-card">
                  <h4>{event.name}</h4>
                  <p>{event.date}</p>
                  <p>{event.venue}</p>
                  <button className="remove-favorite-btn">
                    Remove from Favorites
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
            <h2 className="profile-title">Notification Settings</h2>
            {renderNotificationSettings()}
          </div>
        );
      case 'security':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
            <h2 className="profile-title">Security Settings</h2>
            {renderSecuritySettings()}
          </div>
        );
      case 'edit':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
            <UpdateProfileForm onFinish={() => setActiveSection('profile')} />
          </div>
        );
      case 'settings':
        return (
          <div className={`profile-container ${isDarkMode ? 'dark' : ''}`}>
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
      <div className={`profile-layout ${isDarkMode ? 'dark' : ''}`}>
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
                  href="#activity"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('activity');
                  }}
                  className={`nav-link ${activeSection === 'activity' ? 'active' : ''}`}
                >
                  <FaHistory className="nav-icon" />
                  Activity History
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#favorites"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('favorites');
                  }}
                  className={`nav-link ${activeSection === 'favorites' ? 'active' : ''}`}
                >
                  <FaHeart className="nav-icon" />
                  Favorites
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#notifications"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('notifications');
                  }}
                  className={`nav-link ${activeSection === 'notifications' ? 'active' : ''}`}
                >
                  <FaBell className="nav-icon" />
                  Notifications
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#security"
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection('security');
                  }}
                  className={`nav-link ${activeSection === 'security' ? 'active' : ''}`}
                >
                  <FaLock className="nav-icon" />
                  Security
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
              {user.role === 'User' && (
                <li className="nav-item">
                  <a
                    href="#search-booking"
                    onClick={e => {
                      e.preventDefault();
                      navigate("/bookings/:id");
                    }}
                    className="nav-link"
                  >
                    <FaSearch className="nav-icon" />
                    Search Booking
                  </a>
                </li>
              )}
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
