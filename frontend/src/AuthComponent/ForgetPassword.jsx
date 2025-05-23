import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.put("http://localhost:3000/api/v1/forgetPassword", {
        email
      });
      setMessage(res.data.message);
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post("http://localhost:3000/api/v1/authOTP", {
        email,
        otp,
        password,
      });
      setMessage(res.data.message);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed.");
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
            {step === 1 ? (
              <>
                <h1>Reset Password</h1>
                <p className="login-subtitle">Enter your email to receive a reset code</p>
              </>
            ) : (
              <>
                <h1>Verify OTP</h1>
                <p className="login-subtitle">Enter the code sent to your email</p>
              </>
            )}
          </div>

          {step === 1 && (
            <form onSubmit={handleEmailSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              <button type="submit" className="login-button">
                Send Reset Code <span>→</span>
              </button>

              <div className="register-link">
                Remember your password? <a href="/login">Sign in here</a>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleOtpSubmit}>
              <div className="form-group">
                <input
                  type="number"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="login-button">
                Reset Password <span>→</span>
              </button>

              <div className="register-link">
                <a href="/login">Back to login</a>
              </div>
            </form>
          )}

          {message && (
            <div className="mt-4 text-center text-green-600 font-medium">
              {message}
            </div>
          )}
          {error && (
            <div className="mt-4 text-center text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
