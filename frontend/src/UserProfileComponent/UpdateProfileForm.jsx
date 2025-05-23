// src/UserProfileComponent/UpdateProfileForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';

export default function UpdateProfileForm() {
  const { user, setUser } = useAuth(); // ✅ Get user and setUser from context

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    profilePicture: user?.profilePicture || '',
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      const res = await axios.put(
        'http://localhost:3000/api/v1/users/profile/',
        form,
        { withCredentials: true }
      );
      setUser(res.data.user); // ✅ Update global user state
      setStatus('Profile updated successfully!');
      // Optionally sync form again:
      setForm({
        name: res.data.user.name || '',
        email: res.data.user.email || '',
        profilePicture: res.data.user.profilePicture || '',
      });
    } catch (err) {
      console.error('Update failed:', err);
      setStatus('Failed to update profile. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4 p-4 border rounded">
      <h2 className="text-xl font-bold mb-2">Update Profile</h2>

      <label className="block">Name:</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="block">Email:</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <label className="block">Profile Picture URL:</label>
      <input
        type="text"
        name="profilePicture"
        value={form.profilePicture}
        onChange={handleChange}
        className="border p-2 w-full"
      />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Update
      </button>

      {status && (
        <p className={`mt-2 ${status.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </form>
  );
}
