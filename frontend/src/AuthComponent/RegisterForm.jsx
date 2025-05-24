import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../cssStyles/RegisterForm.css";
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

  const testimonials = [
    {
      text: "Just booked VIP tickets in seconds! 🎵",
      author: "Sarah M."
    },
    {
      text: "Best event platform ever! 🌟",
      author: "Michael R."
    },
    {
      text: "Amazing deals and service! 💎",
      author: "James L."
    }
  ];

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
    <div className="auth-register-container">
      {loading && (
        <div className="loader-overlay">
          <div className="loader-popup">
            <Loader />
          </div>
        </div>
      )}

      <div className={`auth-register-left ${loading ? "blurred" : ""}`}>
        <div className="auth-register-welcome">
          <h2>Begin Your Event Journey <span>Today!</span></h2>
        </div>

        <div className="auth-register-cards">
          <div className="auth-register-feature">
            <div className="auth-register-feature-icon">🎫</div>
            <h3>Easy Booking</h3>
            <p>Book your favorite events with just a few clicks</p>
          </div>
          
          <div className="auth-register-feature">
            <div className="auth-register-feature-icon">🎭</div>
            <h3>Diverse Events</h3>
            <p>From concerts to workshops, find your perfect event</p>
          </div>
          
          <div className="auth-register-feature">
            <div className="auth-register-feature-icon">💫</div>
            <h3>VIP Access</h3>
            <p>Get early access and exclusive discounts</p>
          </div>
          
          <div className="auth-register-feature">
            <div className="auth-register-feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Manage your tickets on the go, anytime</p>
          </div>
        </div>

        <div className="auth-register-floating-testimonials">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="auth-register-floating-testimonial">
              <div className="auth-register-floating-content">
                <p>{testimonial.text}</p>
                <span>- {testimonial.author}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="auth-register-stats">
          <div className="auth-register-stat">
            <span className="auth-register-stat-number">500K+</span>
            <span className="auth-register-stat-label">Happy Users</span>
          </div>
          <div className="auth-register-stat">
            <span className="auth-register-stat-number">10K+</span>
            <span className="auth-register-stat-label">Events Monthly</span>
          </div>
          <div className="auth-register-stat">
            <span className="auth-register-stat-number">98%</span>
            <span className="auth-register-stat-label">Satisfaction Rate</span>
          </div>
        </div>
      </div>

      <div className={`auth-register-right ${loading ? "blurred" : ""}`}>
        <div className="auth-register-form">
          <div className="auth-register-header">
            <h1>Create Account</h1>
            <p className="auth-register-subtitle">Join us to discover amazing events!</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="auth-register-group">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="auth-register-input"
                required
              />
            </div>

            <div className="auth-register-group">
              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="auth-register-input"
                required
              />
            </div>

            <div className="auth-register-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="auth-register-input"
                required
              />
            </div>

            <div className="auth-register-group">
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="auth-register-select"
                required
              >
                <option value="User">Attendee</option>
                <option value="Organizer">Event Organizer</option>
                <option value="Admin">Administrator</option>
              </select>
            </div>

            <div className="auth-register-checkbox">
              <input type="checkbox" className="auth-register-check" required />
              <span>I agree to the Terms & Conditions</span>
            </div>

            <button type="submit" className="auth-register-button" disabled={loading}>
              {loading ? "Creating Account..." : "CREATE ACCOUNT"} <span>→</span>
            </button>
          </form>

          {message && (
            <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <div className="auth-register-login-link">
            Already have an account? <a href="/login">Sign in here</a>
          </div>
        </div>
      </div>
    </div>
  );
}
