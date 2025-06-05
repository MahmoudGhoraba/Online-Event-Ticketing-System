import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';
import axios from 'axios';


const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useTheme();

  const handleSubscribe = async (e) => {
    if (email) {
      try {
        setIsLoading(true); // Start loading
        const res = await axios.put("http://localhost:3000/api/v1/users/subscribe", {
          email
        });
        console.log(res.data);
        setIsLoading(false); // Stop loading
        setIsSubscribed(true);
        setIsFailed(false);
        setTimeout(() => {
          setIsSubscribed(false);
          setEmail('');
        }, 3000);
      } catch (err) {
        console.error('Subscription error:', err);
        setIsLoading(false); // Stop loading
        setIsFailed(true);
        setIsSubscribed(false);
        setTimeout(() => {
          setIsFailed(false);
          setEmail('');
        }, 3000);
        return;
      }
    }
  };

  const socialLinks = [
    { 
      icon: Facebook, 
      url: 'https://www.facebook.com/mahmoud.ghoraba.14/',
      style: { 
        color: isDarkMode ? '#60a5fa' : '#3b82f6', 
        backgroundColor: isDarkMode ? 'rgba(96, 165, 250, 0.1)' : '#eff6ff' 
      }
    },
    { 
      icon: Twitter, 
      url: 'https://twitter.com/spaghettis',
      style: { 
        color: isDarkMode ? '#38bdf8' : '#0ea5e9', 
        backgroundColor: isDarkMode ? 'rgba(56, 189, 248, 0.1)' : '#f0f9ff' 
      }
    },
    { 
      icon: Instagram, 
      url: 'https://www.instagram.com/m.ghoraba/',
      style: { 
        color: isDarkMode ? '#f472b6' : '#ec4899', 
        backgroundColor: isDarkMode ? 'rgba(244, 114, 182, 0.1)' : '#fdf2f8' 
      }
    },
    { 
      icon: Mail, 
      url: 'mailto:mahmoud.ghoraba2005@gmail.com',
      style: { 
        color: isDarkMode ? '#fb923c' : '#f97316', 
        backgroundColor: isDarkMode ? 'rgba(251, 146, 60, 0.1)' : '#fff7ed' 
      }
    }
  ];

  const quickLinks = ['Home', 'Events', 'How It Works', 'About Us', 'Contact', 'FAQ'];

  return (
    <footer style={{
      background: isDarkMode 
        ? 'linear-gradient(to bottom right, #111827, #1f2937, #1e293b)'
        : 'linear-gradient(to bottom right, #f8fafc, #ffffff, #fff7ed)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: isDarkMode ? 0.1 : 0.05,
        zIndex: 0
      }}>
        <div style={{ 
          position: 'absolute', 
          top: -160, 
          right: -160, 
          width: 320, 
          height: 320, 
          backgroundColor: isDarkMode ? '#fb923c' : '#fdba74', 
          borderRadius: '50%', 
          filter: 'blur(64px)' 
        }}></div>
        <div style={{ 
          position: 'absolute', 
          bottom: -160, 
          left: -160, 
          width: 320, 
          height: 320, 
          backgroundColor: isDarkMode ? '#60a5fa' : '#93c5fd', 
          borderRadius: '50%', 
          filter: 'blur(64px)' 
        }}></div>
      </div>

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>

          {/* Brand Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '1.5rem' }}>🍝</div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold', 
                background: 'linear-gradient(to right, #f97316, #ef4444)', 
                WebkitBackgroundClip: 'text', 
                WebkitTextFillColor: 'transparent' 
              }}>Spaghetti's</h3>
            </div>
            <p style={{ 
              color: isDarkMode ? '#d1d5db' : '#4b5563', 
              marginBottom: '1rem', 
              lineHeight: 1.4, 
              fontSize: '0.9rem' 
            }}>
              Your go-to place for free and easy event bookings. No seats, just good vibes and unforgettable experiences.
            </p>

            <div style={{ color: isDarkMode ? '#9ca3af' : '#4b5563', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <MapPin size={14} color={isDarkMode ? '#fb923c' : '#f97316'} />
                <span>German International University, Egypt</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Phone size={14} color={isDarkMode ? '#fb923c' : '#f97316'} />
                <span>+20 102 086 5020</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} color={isDarkMode ? '#fb923c' : '#f97316'} />
                <span>24/7 Event Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: isDarkMode ? '#f3f4f6' : '#1f2937', 
              marginBottom: '1rem' 
            }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: isDarkMode ? '#9ca3af' : '#4b5563', fontSize: '0.9rem' }}>
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    color: isDarkMode ? '#9ca3af' : '#4b5563', 
                    textDecoration: 'none',
                    transition: 'color 0.3s ease'
                  }}>
                    <ArrowRight size={14} style={{ marginRight: '0.5rem', color: isDarkMode ? '#fb923c' : '#f97316' }} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: isDarkMode ? '#f3f4f6' : '#1f2937', 
              marginBottom: '1rem' 
            }}>Stay Updated</h4>
            <p style={{ 
              color: isDarkMode ? '#9ca3af' : '#4b5563', 
              marginBottom: '1rem', 
              fontSize: '0.9rem' 
            }}>Get the latest events and exclusive offers delivered to your inbox.</p>

            <div>
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  style={{
                    width: '78.5%',
                    padding: '0.5rem 1rem',
                    border: `2px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    paddingRight: '3rem',
                    outline: 'none',
                    fontSize: '0.9rem',
                    backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                    color: isDarkMode ? '#f3f4f6' : '#1f2937'
                  }}
                />
                <Mail style={{ 
                  position: 'absolute', 
                  right: '1rem', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: isDarkMode ? '#4b5563' : '#9ca3af' 
                }} />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={!email || isSubscribed || isLoading}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontWeight: '600',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: isSubscribed 
                    ? (isDarkMode ? '#059669' : '#22c55e')
                    : isFailed
                    ? (isDarkMode ? '#dc2626' : '#ef4444')
                    : isLoading
                    ? (isDarkMode ? '#4b5563' : '#9ca3af')
                    : 'linear-gradient(to right, #f97316, #ef4444)',
                  color: 'white',
                  cursor: (isSubscribed || isLoading) ? 'default' : 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease',
                  opacity: (!email || isLoading) ? 0.7 : 1,
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {isLoading ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <div style={{
                      width: '0.75rem',
                      height: '0.75rem',
                      border: '2px solid #ffffff',
                      borderTopColor: 'transparent',
                      borderRadius: '50%',
                      animation: 'spin 1s linear infinite',
                      display: 'inline-block'
                    }} />
                    Subscribing...
                  </div>
                ) : isSubscribed ? '✓ Subscribed!' : isFailed ? '✗ Failed to Subscribe' : 'Subscribe Now'}
              </button>
              <style>
                {`
                  @keyframes spin {
                    to {
                      transform: rotate(360deg);
                    }
                  }
                `}
              </style>
            </div>
          </div>

          {/* Social Media & App */}
          <div>
            <h4 style={{ 
              fontSize: '1.1rem', 
              fontWeight: 'bold', 
              color: isDarkMode ? '#f3f4f6' : '#1f2937', 
              marginBottom: '1rem' 
            }}>Connect With Us</h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div 
                    key={index} 
                    onClick={() => window.open(social.url, '_blank')}
                    style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '0.5rem',
                      backgroundColor: social.style.backgroundColor,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      ':hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }
                    }}
                  >
                    <Icon style={{ color: social.style.color }} />
                  </div>
                );
              })}
            </div>

            <p style={{ 
              fontWeight: '600', 
              marginBottom: '0.75rem', 
              color: isDarkMode ? '#f3f4f6' : '#1f2937', 
              fontSize: '0.9rem' 
            }}>Download Our App</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{
                width: '100%',
                backgroundColor: isDarkMode ? '#374151' : 'black',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: isDarkMode ? '#9ca3af' : '#d1d5db' }}>GET IT ON</div>
                  <div style={{ fontWeight: 'bold' }}>Google Play</div>
                </div>
              </button>
              <button style={{
                width: '100%',
                backgroundColor: isDarkMode ? '#374151' : 'black',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.65rem', color: isDarkMode ? '#9ca3af' : '#d1d5db' }}>Download on the</div>
                  <div style={{ fontWeight: 'bold' }}>App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div style={{ 
          height: '1px', 
          background: isDarkMode 
            ? 'linear-gradient(to right, transparent, #374151, transparent)'
            : 'linear-gradient(to right, transparent, #d1d5db, transparent)', 
          marginBottom: '0.75rem' 
        }}></div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '0.75rem', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          fontSize: '0.75rem', 
          color: isDarkMode ? '#9ca3af' : '#6b7280' 
        }}>
          <div>
            © 2025 Spaghetti's. All rights reserved. Made with ❤️ for event lovers.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a style={{ textDecoration: 'none', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Privacy Policy</a>
            <a style={{ textDecoration: 'none', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Terms of Service</a>
            <a style={{ textDecoration: 'none', color: isDarkMode ? '#9ca3af' : '#6b7280' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
