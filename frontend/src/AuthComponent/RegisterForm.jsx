import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";  // We'll reuse the same CSS

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your registration logic here
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="illustration-side">
        <div className="stars"></div>
        <div className="moon"></div>
        <div className="mountains">
          <div className="mountain mountain-1"></div>
          <div className="mountain mountain-2"></div>
          <div className="mountain mountain-3"></div>
        </div>
      </div>
      
      <div className="login-side">
        <div className="login-card">
          <div className="login-header">
            <h1>Create Account</h1>
            <p className="login-subtitle">Please fill in your information below</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="form-input"
              />
            </div>
            
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

            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                />
                <span>I agree to the Terms & Conditions</span>
              </label>
            </div>

            <button type="submit" className="login-button">
              CREATE ACCOUNT <span>→</span>
            </button>

            <div className="register-link">
              Already have an account? <a href="/login">Sign in here</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
