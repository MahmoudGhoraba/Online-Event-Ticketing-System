import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../cssStyles/RegisterForm.css";
import Loader from "../sharedComponents/Loader";
import { Toast, showToast } from '../sharedComponents/Toast';
import { useTheme } from '../theme/ThemeContext';

export default function RegisterForm() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "User",
        profilePicture: ""
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);


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

    const handleImageChange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
        
            if (file.size > 5 * 1024 * 1024) {
                showToast.error("Image size should be less than 5MB");
                setMessage("Image size should be less than 5MB");
                return;
            }
        
            const reader = new FileReader();
            reader.onloadend = () => setPreviewUrl(reader.result);
            reader.readAsDataURL(file);
        
            try {
                setMessage("Uploading image...");
                setUploadingImage(true);
        
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'unsigned_preset');
        
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dvmqahby6/image/upload',
                    formData ,    {
                        withCredentials: false,
                    });
        
                const imageUrl = response.data.secure_url;
                setForm(prev => ({ ...prev, profilePicture: imageUrl }));
                showToast.success("Image uploaded successfully!");
                setMessage("Image uploaded successfully!");
            } catch (error) {
                console.error(error);
                showToast.error("Failed to upload image. Please try again.");
                setMessage("Failed to upload image. Please try again.");
                setPreviewUrl(null);
            } finally {
                setUploadingImage(false);
            }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post("http://localhost:3000/api/v1/register/", form);
            
            showToast.success("Registration successful! Redirecting to login...");
            setMessage("Registration successful. Redirecting to login...");
            
            setTimeout(() => {
                setLoading(false);
                navigate("/login");
            }, 2000);
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
            showToast.error(errorMessage);
            setMessage(errorMessage);
            setLoading(false);
        }
    };

    return (
        <div className={`auth-register-container ${isDarkMode ? 'dark-mode' : ''}`}>
            <Toast />
            <div className="back-to-home">
                <Link to="/" className="back-home-button">
                    ← Back to Home
                </Link>
            </div>
            
            {loading && (
                <div className="loader-overlay">
                    <div className="loader-popup">
                        <Loader />
                    </div>
                </div>
            )}

            <div className={`auth-register-left ${loading ? "blurred" : ""} ${isDarkMode ? 'dark-mode' : ''}`}>
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

            <div className={`auth-register-right ${loading ? "blurred" : ""} ${isDarkMode ? 'dark-mode' : ''}`}>
                <div className="auth-register-form">
                    <div className="auth-register-header">
                        <h1>Create Account</h1>
                        <p className="auth-register-subtitle">Join us to discover amazing events!</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="auth-register-group profile-picture-upload">
                            <div className="profile-picture-container">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="profile-input"
                                    id="profile-upload"
                                />
                                <label htmlFor="profile-upload" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {previewUrl ? (
                                        <img src={previewUrl} alt="Profile Preview" className="profile-preview" />
                                    ) : (
                                        <div className="profile-placeholder">
                                            <span>📷</span>
                                            <p>Add Profile Picture</p>
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>

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
