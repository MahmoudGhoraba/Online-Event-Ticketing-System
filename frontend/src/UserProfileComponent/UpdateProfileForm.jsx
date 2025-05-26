// src/UserProfileComponent/UpdateProfileForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import '../cssStyles/UpdateProfileForm.css';
import Loader from '../sharedComponents/Loader';

export default function UpdateProfileForm({ onFinish }) {
  const { user, setUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || '',
  });

  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    if (file.size > 5 * 1024 * 1024) {
      setStatus("Image size should be less than 5MB");
      return;
    }
  
    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);
  
    try {
      setStatus("Uploading image...");
      setUploadingImage(true);
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'unsigned_preset');
  
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dvmqahby6/image/upload',
        formData,
        {
          withCredentials: false,
        }
      );
  
      const imageUrl = response.data.secure_url;
      setForm(prev => ({ ...prev, profilePicture: imageUrl }));
      setStatus("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Failed to upload image. Please try again.");
      setPreviewUrl(user?.profilePicture || null);
    } finally {
      setUploadingImage(false);
    }
  };

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
      setUser(res.data);
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
    <div className="update-profile-container">
      {isLoading && (
        <div className="update-profile-loader-overlay">
          <div className="update-profile-loader-popup">
            <Loader />
          </div>
        </div>
      )}

      <h2 className="update-profile-title">Update Profile</h2>
      <form onSubmit={handleSubmit} className="update-profile-form">
        <div className="update-profile-picture-upload">
          <div className="update-profile-picture-container">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="update-profile-input"
              id="update-profile-upload"
            />
            <label 
              htmlFor="update-profile-upload" 
              style={{ 
                width: '100%', 
                height: '100%', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Profile Preview" className="update-profile-preview" />
              ) : (
                <div className="update-profile-placeholder">
                  <span>📷</span>
                  <p>Update Profile Picture</p>
                </div>
              )}
            </label>
          </div>
        </div>

        <div className="update-profile-field">
          <label className="update-profile-label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="update-profile-input-field"
            placeholder="Enter your name"
          />
        </div>

        <div className="update-profile-field">
          <label className="update-profile-label" htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="update-profile-input-field"
            placeholder="Enter your email"
          />
        </div>

        <div className="update-profile-actions">
          <button
            type="submit"
            className={`update-profile-submit-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading || uploadingImage}
          >
            {isLoading ? 'Updating...' : 'Update Profile'}
          </button>
          <button
            type="button"
            onClick={onFinish}
            className="update-profile-cancel-btn"
            disabled={isLoading || uploadingImage}
          >
            Cancel
          </button>
        </div>

        {status && (
          <div className={`update-profile-status ${status.includes('success') ? 'success' : 'error'}`}>
            {status}
          </div>
        )}
      </form>
    </div>
  );
}
