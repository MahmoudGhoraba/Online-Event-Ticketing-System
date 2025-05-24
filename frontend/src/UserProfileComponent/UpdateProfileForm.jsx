// src/UserProfileComponent/UpdateProfileForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

export default function UpdateProfileForm({ onFinish }) {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || '',
  });

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setIsLoading(true);
    try {
      const res = await axios.put(
        'http://localhost:3000/api/v1/users/profile/',
        form,
        { withCredentials: true }
      );
      setUser(res.data.user);
      setStatus('Profile updated successfully!');
      setTimeout(() => {
        onFinish?.();
      }, 1500);
    } catch (err) {
      console.error('Update failed:', err);
      setStatus('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-form-container">
      <h2 className="profile-title">Update Profile</h2>
      <form onSubmit={handleSubmit} className="profile-info">
        <div className="info-item">
          <label className="info-label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your name"
          />
        </div>

        <div className="info-item">
          <label className="info-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter your email"
          />
        </div>

        <div className="info-item">
          <label className="info-label" htmlFor="profilePicture">Profile Picture URL</label>
          <input
            id="profilePicture"
            type="text"
            name="profilePicture"
            value={form.profilePicture}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter profile picture URL"
          />
        </div>

        <div className="profile-actions">
          <button
            type="submit"
            className={`update-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="cancel-button"
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>

        {status && (
          <div className={`status-message ${status.includes('success') ? 'success' : 'error'}`}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
}
