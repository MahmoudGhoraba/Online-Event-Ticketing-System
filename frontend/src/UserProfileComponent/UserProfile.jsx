// src/UserProfileComponent/UserProfile.jsx
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Replace this with your real API call
    fetch('http://localhost:3000/api/profile', {
      credentials: 'include', // optional if using cookies
    })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error('Failed to load user:', err));
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>
    </div>
  );
}

export default UserProfile;
