// src/pages/Unauthorized.js
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Access Denied</h2>
      <p>You need to be logged in to view this page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
};

export default Unauthorized;
