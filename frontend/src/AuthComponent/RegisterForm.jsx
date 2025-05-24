import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import Loader from "../sharedComponents/Loader"; 

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "User",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await axios.post("http://localhost:3000/api/v1/register/", form);
      setMessage("Registration successful. Redirecting to login...");
      
      setTimeout(() => {
        setLoading(false); 
        navigate("/login");
      }, 2000);
      
    } catch (error) {
      alert("Registration failed. Please try again.");
      setLoading(false); 
    }
  };

  return (
    <div className="login-container">
      {loading && (
      <div className="loader-overlay">
        <div className="loader-popup">
          <Loader />
        </div>
      </div>
    )}

      <div className={`illustration-side ${loading ? "blurred" : ""}`}>
        <div className="stars"></div>
        <div className="moon"></div>
        <div className="mountains">
          <div className="mountain mountain-1"></div>
          <div className="mountain mountain-2"></div>
          <div className="mountain mountain-3"></div>
        </div>
      </div>

      <div className={`login-side ${loading ? "blurred" : ""}`}>
        <div className="login-card">
          <div className="login-header">
            <h1>Create Account</h1>
            <p className="login-subtitle">Please fill in your information below</p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* All input fields stay the same */}
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="form-input"
                required
              >
                <option value="User">User</option>
                <option value="Organizer">Organizer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating..." : "CREATE ACCOUNT"} <span>→</span>
            </button>
          </form>

          {message && <p className="success-message">{message}</p>}

          <div className="register-link">
            Already have an account? <a href="/login">Sign in here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
