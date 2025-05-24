import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterForm.css";
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
      setMessage("Registration failed. Please try again.");
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
        <div className="welcome-text">
          <h2>Begin Your Event Journey <span>Today!</span></h2>
        </div>

        <div className="cards-container">
          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Easy Booking</h2>
              <p className="event-date">Quick & Simple</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🎫 Book with just a few clicks</div>
              <div className="ticket-info">✨ Secure payments</div>
            </div>
          </div>
          
          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Diverse Events</h2>
              <p className="event-date">Something for Everyone</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🎭 Concerts to Workshops</div>
              <div className="ticket-info">🌟 Premium Events</div>
            </div>
          </div>
          
          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Exclusive Access</h2>
              <p className="event-date">VIP Benefits</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">💫 Early Bird Access</div>
              <div className="ticket-info">🎁 Special Discounts</div>
            </div>
          </div>
          
          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Mobile Ready</h2>
              <p className="event-date">On the Go</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">📱 Manage Anywhere</div>
              <div className="ticket-info">🔔 Instant Updates</div>
            </div>
          </div>
        </div>
      </div>

      <div className={`login-side ${loading ? "blurred" : ""}`}>
        <div className="login-card">
          <div className="login-header">
            <h1>Create Account</h1>
            <p className="login-subtitle">Join us to discover amazing events!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
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
                className="form-s"
                required
              >
                <option value="User">Attendee</option>
                <option value="Organizer">Event Organizer</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" required />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT"} <span>→</span>
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="register-link">
            Already have an account? <a href="/login">Sign in here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
