import React from 'react';
import './review.css';
import { Search, Calendar, CheckCircle, Users, Heart, Music2, Ticket } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function BookingStep() {
  const { isDarkMode } = useTheme();
  const steps = [
    {
      icon: <Search className="icon" />,
      iconBg: "step-icon-yellow",
      title: "Browse Events",
      description: "Explore exciting events happening near you with just a few clicks."
    },
    {
      icon: <Calendar className="icon" />,
      iconBg: "step-icon-orange",
      title: "Select Date",
      description: "Pick the date that works best for you—no seat selection required."
    },
    {
      icon: <CheckCircle className="icon" />,
      iconBg: "step-icon-blue",
      title: "Book Instantly for Free",
      description: "No payments, no hassle—just confirm your attendance and you're in!"
    }
  ];

  return (
    <div className={`step-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div
        style={{
          borderTop: '2px solid #d1d5db',
          width: '50%',
          margin: '0 auto',
          marginBottom: '4rem',
          backgroundColor: 'white',
        }}
      ></div>
      <div className="booking-inner">
        <div>
          <div className="booking-header">Quick and Free</div>
          <h2 className="booking-title">
            Reserve Your Spot
            <br />
            In 3 Simple Steps
          </h2>

          <div className="steps-list">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div className={`step-icon ${step.iconBg}`}>
                  {step.icon}
                </div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="trip-card-container">
          <div className="trip-card">
            <img
              src="/src/assets/MusicJam.jpg"
              alt="Live Music Event"
              className="trip-image"
            />
            <div className="trip-content">
              <h3 className="trip-title">Outdoor Music Jam</h3>
              <div className="trip-date">
                June 24 | <span>by FreeCity Events</span>
              </div>
              <div className="trip-icons">
                <div className="trip-icon-circle"><Music2 size={16} /></div>
                <div className="trip-icon-circle"><Calendar size={16} /></div>
                <div className="trip-icon-circle"><Ticket size={16} /></div>
              </div>
              <div className="trip-footer">
                <div className="trip-people">
                  <Users size={16} />
                  <span>700+ attending</span>
                </div>
                <Heart className="trip-heart" />
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-details">
              <div className="status-ongoing">Ongoing</div>
              <div className="status-title">Food Truck Fiesta</div>
              <div className="status-progress-label">
                <span>60%</span> capacity filled
              </div>
              <div className="status-bar">
                <div className="status-bar-fill"></div>
              </div>
            </div>
            <div className="status-image">
              <img 
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
                alt="Food Truck Fiesta"
              />
            </div>
          </div>

          <div className="dot-yellow"></div>
          <div className="dot-purple"></div>
          <div className="dot-blue"></div>
        </div>
      </div>
    </div>
  );
}
