import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./LoginForm.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(form);
      console.log("User role:", role);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check your credentials.");
    } 
  };

  return (
    <div className="login-container">
      <div className="illustration-side">
        <div className="welcome-text">
          <h2>Login to book your tickets now... <span>what are you waiting for?</span></h2>
        </div>
        <div className="cards-container">
          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Music Festival</h2>
              <p className="event-date">Summer 2024</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🎵 Live Performances</div>
              <div className="ticket-info">🎪 Multiple Stages</div>
              <div className="ticket-info">🌟 Featured Artists</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Sports Championship</h2>
              <p className="event-date">Season Finals</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🏆 Premium Seating</div>
              <div className="ticket-info">🎯 Live Action</div>
              <div className="ticket-info">🌟 Star Players</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Art Exhibition</h2>
              <p className="event-date">Gallery Opening</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🎨 Modern Art</div>
              <div className="ticket-info">🍷 VIP Reception</div>
              <div className="ticket-info">✨ Special Guests</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Tech Conference</h2>
              <p className="event-date">Innovation Summit</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">💻 Workshops</div>
              <div className="ticket-info">🚀 Keynotes</div>
              <div className="ticket-info">🤝 Networking</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Food Festival</h2>
              <p className="event-date">Culinary Week</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🍳 Chef Demos</div>
              <div className="ticket-info">🍷 Wine Tasting</div>
              <div className="ticket-info">🌮 Global Cuisine</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Comedy Night</h2>
              <p className="event-date">Stand-up Special</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">😂 Top Comics</div>
              <div className="ticket-info">🎭 Live Shows</div>
              <div className="ticket-info">🎪 After Party</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Film Festival</h2>
              <p className="event-date">Premiere Week</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">🎬 Screenings</div>
              <div className="ticket-info">🎭 Q&A Sessions</div>
              <div className="ticket-info">🌟 Celebrity Guests</div>
            </div>
          </div>

          <div className="ticket-container">
            <div className="ticket-header">
              <h2 className="event-title">Dance Show</h2>
              <p className="event-date">Contemporary Arts</p>
            </div>
            <div className="ticket-body">
              <div className="ticket-info">💃 Performance</div>
              <div className="ticket-info">✨ Light Show</div>
              <div className="ticket-info">🎵 Live Music</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="login-side">
        <div className="login-card">
          <div className="login-header">
            <h1>HELLO!</h1>
            <p className="login-subtitle">Welcome back! Please login to your account.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/forget-password" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="login-button">
              NEXT <span>→</span>
            </button>

            <div className="register-link">
              Don't have an account? <a href="/register">Register here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
