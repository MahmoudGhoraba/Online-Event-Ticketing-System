import React from 'react';
import { Play } from 'lucide-react';
import './home.css';
import TypingMessage from './TypingMessage';
import Navbar from '../sharedComponents/navBar';
import Footer from '../sharedComponents/Footer';
import ServiceSection from './ServiceSection';
import BookingStep from './BookingStep';
import EventList from '../eventComponents/EventList';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <Navbar />

      <div className="background-decor">
        <div className="circle orange-circle"></div>
        <div className="circle purple-circle"></div>
        <div className="circle pink-circle"></div>

        <div className="plane plane-one">
          <svg width="60" height="20" viewBox="0 0 60 20" fill="currentColor">
            <path d="M2 10L8 6V4L12 6V2L16 4V8L20 10L16 12V16L12 14V18L8 16V14L2 10Z"/>
            <path d="M25 8L35 10L45 8L55 10L50 12L40 10L30 12L25 8Z" opacity="0.6"/>
          </svg>
        </div>
        <div className="plane plane-two">
          <svg width="40" height="15" viewBox="0 0 40 15" fill="currentColor">
            <path d="M2 7L6 4V3L9 4V1L12 3V6L15 7L12 8V11L9 10V12L6 11V10L2 7Z"/>
          </svg>
        </div>
      </div>

      <div className="hero-section">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="tagline">Your Gateway to Unforgettable Events</div>
            <h1 className="main-heading">
              {/* You may want to update TypingMessage content accordingly */}
              <TypingMessage />
            </h1>
            <p className="description">
              Discover and book tickets to concerts, festivals, sports games,
              theater performances, and more. Secure your spot today with a click.
            </p>

            <div className="buttons">
              <button className="find-out" onClick={() => navigate('/login')}>Sign in</button>
              <button className="play-demo" onClick={() => navigate('/register')}>
                <div className="play-icon">
                  <Play size={16} fill="white" className="text-white ml-1" />
                </div>
                <span>Get Started</span>
              </button>
            </div>
          </div>

          <div className="hero-image">
            <div className="image-box">
              <div className="traveler-circle"></div>
              <div className="backpack"></div>
              <div className="suitcase"></div>
              {/* You could replace these with ticket-themed visuals */}
            </div>
            <div className="float-one"></div>
            <div className="float-two"></div>
            <div className="dot-grid">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="dot"></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ServiceSection/>
      <EventList/>
      <BookingStep />
      <Footer />
    </div>
  );
}
