import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { useEffect } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: otp
  const navigate=useNavigate()


  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.put("http://localhost:3000/api/v1/forgetPassword", {
        email
      });
    
      setMessage(res.data.message); // Shows OTP (for dev/debug only)
      setStep(2); // move to next step
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
    <div className="max-w-sm mx-auto mt-20 space-y-4">
      {step === 1 && (
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
            Send OTP
          </button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <h2 className="text-xl font-bold">Enter OTP</h2>
            <p className="text-sm text-gray-600">
                An OTP has been sent to your email. Please enter it below.
            </p>
          <input
            type="number"
            placeholder="Enter the OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border p-2 w-full"
            required
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full"
            required
            />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Submit
          </button>
        </form>
      )}

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
}
