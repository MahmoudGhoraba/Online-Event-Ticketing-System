import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import '../cssStyles/LoginForm.css';
import { Toast, showToast } from '../sharedComponents/Toast';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [form, setForm] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const role = await login(form);
      showToast.success("Login successful! Welcome back!");
      console.log("User role:", role);
      navigate("/profile");
    } catch (error) {
      console.error("Login failed:", error);
      showToast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
    } 
  };

  return (
    <div className={`auth-login-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <Toast />
      <div className="back-to-home">
        <Link to="/" className={`back-home-button ${isDarkMode ? 'dark-mode' : ''}`}>
          ← Back to Home
        </Link>
      </div>

      <div className={`auth-login-left ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className={`auth-login-welcome ${isDarkMode ? 'dark-mode' : ''}`}>
          <h2 className={isDarkMode ? 'dark-mode' : ''}>Login to book your tickets now... <span>what are you waiting for?</span></h2>
        </div>
        <div className="auth-login-cards">
          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Music Festival</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Summer 2024</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎵 Live Performances</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎪 Multiple Stages</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🌟 Featured Artists</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Sports Championship</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Season Finals</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🏆 Premium Seating</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎯 Live Action</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🌟 Star Players</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Art Exhibition</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Gallery Opening</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎨 Modern Art</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🍷 VIP Reception</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>✨ Special Guests</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Tech Conference</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Innovation Summit</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>💻 Workshops</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🚀 Keynotes</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🤝 Networking</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Food Festival</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Culinary Week</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🍳 Chef Demos</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🍷 Wine Tasting</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🌮 Global Cuisine</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Comedy Night</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Stand-up Special</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>😂 Top Comics</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎭 Live Shows</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎪 After Party</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Film Festival</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Premiere Week</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎬 Screenings</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎭 Q&A Sessions</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🌟 Celebrity Guests</div>
            </div>
          </div>

          <div className={`auth-login-ticket ${isDarkMode ? 'dark-mode' : ''}`}>
            <div className="auth-login-ticket-header">
              <h2 className={`auth-login-event-title ${isDarkMode ? 'dark-mode' : ''}`}>Dance Show</h2>
              <p className={`auth-login-event-date ${isDarkMode ? 'dark-mode' : ''}`}>Contemporary Arts</p>
            </div>
            <div className="auth-login-ticket-body">
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>💃 Performance</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>✨ Light Show</div>
              <div className={`auth-login-ticket-info ${isDarkMode ? 'dark-mode' : ''}`}>🎵 Live Music</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`auth-login-right ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className={`auth-login-form ${isDarkMode ? 'dark-mode' : ''}`}>
          <div className={`auth-login-header ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 className={isDarkMode ? 'dark-mode' : ''}>HELLO!</h1>
            <p className={`auth-login-subtitle ${isDarkMode ? 'dark-mode' : ''}`}>Welcome back! Please login to your account.</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className={`auth-login-group ${isDarkMode ? 'dark-mode' : ''}`}>
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`auth-login-input ${isDarkMode ? 'dark-mode' : ''}`}
              />
            </div>
            
            <div className={`auth-login-group ${isDarkMode ? 'dark-mode' : ''}`}>
              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className={`auth-login-input ${isDarkMode ? 'dark-mode' : ''}`}
              />
            </div>

            <div className={`auth-login-options ${isDarkMode ? 'dark-mode' : ''}`}>
              <label className={`auth-login-remember ${isDarkMode ? 'dark-mode' : ''}`}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className={isDarkMode ? 'dark-mode' : ''}>Remember me</span>
              </label>
              <a href="/forget-password" className={`auth-login-forgot ${isDarkMode ? 'dark-mode' : ''}`}>
                Forgot password?
              </a>
            </div>

            <button type="submit" className={`auth-login-button ${isDarkMode ? 'dark-mode' : ''}`}>
              NEXT <span className={isDarkMode ? 'dark-mode' : ''}>→</span>
            </button>

            <div className={`auth-login-register-link ${isDarkMode ? 'dark-mode' : ''}`}>
              Don't have an account? <a href="/register" className={isDarkMode ? 'dark-mode' : ''}>Register here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//                   className="auth-forgetPassword-input"  