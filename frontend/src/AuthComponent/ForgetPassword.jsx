import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../cssStyles/ForgetPassword.css";
import Loader from "../sharedComponents/Loader";
import { Toast, showToast } from '../sharedComponents/Toast';

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.put("http://localhost:3000/api/v1/forgetPassword", {
        email
      });
      showToast.success("Reset code sent to your email!");
      setStep(2);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred.";
      showToast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/api/v1/authOTP", {
        email,
        otp,
        password,
      });
      showToast.success("Password reset successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "OTP verification failed.";
      showToast.error(errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="auth-forgetPassword-container">
      <Toast />
      {loading && (
        <div className="loader-overlay">
          <div className="loader-popup">
            <Loader />
          </div>
        </div>
      )}

      <div className={`auth-forgetPassword-left ${loading ? "blurred" : ""}`}>
        <div className="auth-forgetPassword-welcome">
          <h2>Reset Your Password <span>Securely</span></h2>
        </div>

        <div className="auth-forgetPassword-cards">
          <div className="auth-forgetPassword-feature">
            <div className="auth-forgetPassword-feature-icon">🔒</div>
            <h3>Secure Reset</h3>
            <p>Industry-standard security protocols</p>
          </div>
          
          <div className="auth-forgetPassword-feature">
            <div className="auth-forgetPassword-feature-icon">⚡</div>
            <h3>Quick Process</h3>
            <p>Reset your password in minutes</p>
          </div>
          
          <div className="auth-forgetPassword-feature">
            <div className="auth-forgetPassword-feature-icon">📧</div>
            <h3>Email Verification</h3>
            <p>Secure OTP sent to your email</p>
          </div>
          
          <div className="auth-forgetPassword-feature">
            <div className="auth-forgetPassword-feature-icon">🛡️</div>
            <h3>Safe & Protected</h3>
            <p>Your security is our priority</p>
          </div>
        </div>

        <div className="auth-forgetPassword-stats">
          <div className="auth-forgetPassword-stat">
            <span className="auth-forgetPassword-stat-number">100%</span>
            <span className="auth-forgetPassword-stat-label">Secure</span>
          </div>
          <div className="auth-forgetPassword-stat">
            <span className="auth-forgetPassword-stat-number">24/7</span>
            <span className="auth-forgetPassword-stat-label">Support</span>
          </div>
          <div className="auth-forgetPassword-stat">
            <span className="auth-forgetPassword-stat-number">2min</span>
            <span className="auth-forgetPassword-stat-label">Average Reset Time</span>
          </div>
        </div>
      </div>

      <div className={`auth-forgetPassword-right ${loading ? "blurred" : ""}`}>
        <div className="auth-forgetPassword-form">
          <div className="auth-forgetPassword-header">
            {step === 1 ? (
              <>
                <h1>Reset Password</h1>
                <p className="auth-forgetPassword-subtitle">Enter your email to receive a reset code</p>
              </>
            ) : (
              <>
                <h1>Verify OTP</h1>
                <p className="auth-forgetPassword-subtitle">Enter the code sent to your email</p>
              </>
            )}
          </div>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="auth-forgetPassword-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-forgetPassword-input"
                  required
                />
              </div>
              
              <button type="submit" className="auth-forgetPassword-button" disabled={loading}>
                {loading ? "Sending Code..." : "Send Reset Code"} <span>→</span>
              </button>

              <div className="auth-forgetPassword-login-link">
                Remember your password? <a href="/login">Sign in here</a>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="auth-forgetPassword-group">
                <input
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="auth-forgetPassword-input"
                  required
                />
              </div>

              <div className="auth-forgetPassword-group">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-forgetPassword-input"
                  required
                />
              </div>

              <button type="submit" className="auth-forgetPassword-button" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"} <span>→</span>
              </button>

              <div className="auth-forgetPassword-login-link">
                <a href="/login">Back to login</a>
              </div>
            </form>
          )}

          {(message || error) && (
            <div className={`message ${message ? "success" : "error"}`}>
              {message || error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
