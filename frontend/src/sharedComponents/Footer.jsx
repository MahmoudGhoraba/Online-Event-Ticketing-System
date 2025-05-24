import React, { useState } from 'react';
import { Facebook, Twitter, Instagram, Mail, ArrowRight, MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const socialLinks = [
    { icon: Facebook, style: { color: '#3b82f6', backgroundColor: '#eff6ff' } },
    { icon: Twitter, style: { color: '#0ea5e9', backgroundColor: '#f0f9ff' } },
    { icon: Instagram, style: { color: '#ec4899', backgroundColor: '#fdf2f8' } },
    { icon: Mail, style: { color: '#f97316', backgroundColor: '#fff7ed' } }
  ];

  const quickLinks = ['Home', 'Events', 'How It Works', 'About Us', 'Contact', 'FAQ'];

  return (
    <footer style={{
      background: 'linear-gradient(to bottom right, #f8fafc, #ffffff, #fff7ed)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'sans-serif'
    }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.05,
        zIndex: 0
      }}>
        <div style={{ position: 'absolute', top: -160, right: -160, width: 320, height: 320, backgroundColor: '#fdba74', borderRadius: '50%', filter: 'blur(64px)' }}></div>
        <div style={{ position: 'absolute', bottom: -160, left: -160, width: 320, height: 320, backgroundColor: '#93c5fd', borderRadius: '50%', filter: 'blur(64px)' }}></div>
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
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #f97316, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spaghetti's</h3>
            </div>
            <p style={{ color: '#4b5563', marginBottom: '1rem', lineHeight: 1.4, fontSize: '0.9rem' }}>
              Your go-to place for free and easy event bookings. No seats, just good vibes and unforgettable experiences.
            </p>

            <div style={{ color: '#4b5563', fontSize: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <MapPin size={14} color="#f97316" />
                <span>123 Event Street, Party City</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <Phone size={14} color="#f97316" />
                <span>+1 (555) 123-PARTY</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={14} color="#f97316" />
                <span>24/7 Event Support</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', padding: 0, color: '#4b5563', fontSize: '0.9rem' }}>
              {quickLinks.map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href="#" style={{ display: 'flex', alignItems: 'center', color: '#4b5563', textDecoration: 'none' }}>
                    <ArrowRight size={14} style={{ marginRight: '0.5rem', color: '#f97316' }} /> {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Stay Updated</h4>
            <p style={{ color: '#4b5563', marginBottom: '1rem', fontSize: '0.9rem' }}>Get the latest events and exclusive offers delivered to your inbox.</p>

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
                    border: '2px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    paddingRight: '3rem',
                    outline: 'none',
                    fontSize: '0.9rem'
                  }}
                />
                <Mail style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
              </div>
              <button
                onClick={handleSubscribe}
                disabled={!email || isSubscribed}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  fontWeight: '600',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: isSubscribed ? '#22c55e' : 'linear-gradient(to right, #f97316, #ef4444)',
                  color: 'white',
                  cursor: isSubscribed ? 'default' : 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe Now'}
              </button>
            </div>
          </div>

          {/* Social Media & App */}
          <div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>Connect With Us</h4>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <div key={index} style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '0.5rem',
                    backgroundColor: social.style.backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #e5e7eb',
                    cursor: 'pointer'
                  }}>
                    <Icon style={{ color: social.style.color }} />
                  </div>
                );
              })}
            </div>

            <p style={{ fontWeight: '600', marginBottom: '0.75rem', color: '#1f2937', fontSize: '0.9rem' }}>Download Our App</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <button style={{
                width: '100%',
                backgroundColor: 'black',
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
                  <div style={{ fontSize: '0.65rem', color: '#d1d5db' }}>GET IT ON</div>
                  <div style={{ fontWeight: 'bold' }}>Google Play</div>
                </div>
              </button>
              <button style={{
                width: '100%',
                backgroundColor: 'black',
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
                  <div style={{ fontSize: '0.65rem', color: '#d1d5db' }}>Download on the</div>
                  <div style={{ fontWeight: 'bold' }}>App Store</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, #d1d5db, transparent)', marginBottom: '0.75rem' }}></div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
          <div>
            © 2025 Spaghetti's. All rights reserved. Made with ❤️ for event lovers.
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#" style={{ textDecoration: 'none', color: '#6b7280' }}>Privacy Policy</a>
            <a href="#" style={{ textDecoration: 'none', color: '#6b7280' }}>Terms of Service</a>
            <a href="#" style={{ textDecoration: 'none', color: '#6b7280' }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
