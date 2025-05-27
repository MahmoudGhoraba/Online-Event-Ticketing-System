import React from "react";
import "./Unauthorized.css";
import "./Unauthorized.css";
import { Link } from "react-router-dom";

const Unauthorized = () => (
  <div className="unauthorized-container">
    <h1 className="unauthorized-title">401 - Unauthorized</h1>
    <p className="unauthorized-message">
      You do not have permission to access this page.
    </p>
    <Link to="/" className="unauthorized-home-link">
      Go to Home
    </Link>
  </div>
);

export default Unauthorized;