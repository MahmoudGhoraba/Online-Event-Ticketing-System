import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import '../cssStyles/LoginForm.css';

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
    <div className="auth-login-container">
      <div className="auth-login-left">
        <div className="auth-login-welcome">
          <h2>Login to book your tickets now... <span>what are you waiting for?</span></h2>
        </div>
        <div className="auth-login-cards">
          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Music Festival</h2>
              <p className="auth-login-event-date">Summer 2024</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">🎵 Live Performances</div>
              <div className="auth-login-ticket-info">🎪 Multiple Stages</div>
              <div className="auth-login-ticket-info">🌟 Featured Artists</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Sports Championship</h2>
              <p className="auth-login-event-date">Season Finals</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">🏆 Premium Seating</div>
              <div className="auth-login-ticket-info">🎯 Live Action</div>
              <div className="auth-login-ticket-info">🌟 Star Players</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Art Exhibition</h2>
              <p className="auth-login-event-date">Gallery Opening</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">🎨 Modern Art</div>
              <div className="auth-login-ticket-info">🍷 VIP Reception</div>
              <div className="auth-login-ticket-info">✨ Special Guests</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Tech Conference</h2>
              <p className="auth-login-event-date">Innovation Summit</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">💻 Workshops</div>
              <div className="auth-login-ticket-info">🚀 Keynotes</div>
              <div className="auth-login-ticket-info">🤝 Networking</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Food Festival</h2>
              <p className="auth-login-event-date">Culinary Week</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">🍳 Chef Demos</div>
              <div className="auth-login-ticket-info">🍷 Wine Tasting</div>
              <div className="auth-login-ticket-info">🌮 Global Cuisine</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Comedy Night</h2>
              <p className="auth-login-event-date">Stand-up Special</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">😂 Top Comics</div>
              <div className="auth-login-ticket-info">🎭 Live Shows</div>
              <div className="auth-login-ticket-info">🎪 After Party</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Film Festival</h2>
              <p className="auth-login-event-date">Premiere Week</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">🎬 Screenings</div>
              <div className="auth-login-ticket-info">🎭 Q&A Sessions</div>
              <div className="auth-login-ticket-info">🌟 Celebrity Guests</div>
            </div>
          </div>

          <div className="auth-login-ticket">
            <div className="auth-login-ticket-header">
              <h2 className="auth-login-event-title">Dance Show</h2>
              <p className="auth-login-event-date">Contemporary Arts</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className="auth-login-ticket-info">💃 Performance</div>
              <div className="auth-login-ticket-info">✨ Light Show</div>
              <div className="auth-login-ticket-info">🎵 Live Music</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="auth-login-right">
        <div className="auth-login-form">
          <div className="auth-login-header">
            <h1>HELLO!</h1>
            <p className="auth-login-subtitle">Welcome back! Please login to your account.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="auth-login-group">
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="auth-login-input"
              />
            </div>
            
            <div className="auth-login-group">
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="auth-login-input"
              />
            </div>

            <div className="auth-login-options">
              <label className="auth-login-remember">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="/forget-password" className="auth-login-forgot">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="auth-login-button">
              NEXT <span>→</span>
            </button>

            <div className="auth-login-register-link">
              Don't have an account? <a href="/register">Register here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
