// src/UserProfileComponent/ProfilePage.jsx
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import UpdateProfileForm from './UpdateProfileForm';
import Navbar from '../sharedComponents/navBar';

function ProfilePage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  if (!user) return <p className="text-red-500">User not found. Please login.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <Navbar/>
      {!showForm ? (
        <>
          <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
          {user.profilePicture && (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          )}
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> <span className="capitalize">{user.role}</span></p>
          <div className="text-center mt-4">
            <button
              onClick={() => setShowForm(true)}
              className="text-blue-600 underline"
            >
              Update Profile
            </button>
          </div>
        </>
      ) : (
        <>
          <UpdateProfileForm onFinish={() => setShowForm(false)} />
          <div className="text-center mt-4">
            <button
              onClick={() => setShowForm(false)}
              className="text-red-600 underline"
            >
              Cancel
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ProfilePage;
