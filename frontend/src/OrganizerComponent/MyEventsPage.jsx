import React, { useState, useEffect } from "react";
import axios from "axios";
import EventList from "../eventComponents/EventList";
import Footer from "../sharedComponents/Footer";
import Navbar from "../sharedComponents/navBar";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import '../cssStyles/MyEventsPage.css';
import Loader from "../sharedComponents/Loader";
import { useTheme } from '../theme/ThemeContext';

function OrganizerPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/events");
        setEvents(response.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleCreateEvent = () => {
    navigate('/my-events/new');
  };

  return (
    <div className={`organizer-page ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="organizer-background-decor">
        <div className="organizer-circle organizer-circle-1"></div>
        <div className="organizer-circle organizer-circle-2"></div>
      </div>

      <Navbar />

      <div className="organizer-content">
        <div className="organizer-header">
          <h1 className={`organizer-title ${isDarkMode ? 'dark-mode' : ''}`}>My Events Dashboard</h1>
          <p className="organizer-subtitle">Manage and create your events</p>
        </div>

        <div className="organizer-grid">
          {/* Create Event Card */}
          <div className="organizer-create-card" onClick={handleCreateEvent}>
            <div className="organizer-create-card-content">
              <div className="organizer-create-icon">
                <Plus size={32} />
              </div>
              <h2 className="organizer-create-title">Create New Event</h2>
              <p className="organizer-create-description">
                Start planning your next amazing event
              </p>
            </div>
          </div>

          {/* Events Overview Card */}
          <div className="organizer-stats-card">
            <div className="organizer-stats-header">
              <Calendar size={24} />
              <h2>Events Overview</h2>
            </div>
            <div className="organizer-stats-content">
              <div className="organizer-stat-item">
                <span className="organizer-stat-number">{events.length}</span>
                <span className="organizer-stat-label">Total Events</span>
              </div>
            </div>
          </div>
        </div>

      </div>
      {loading ? (
          <Loader />
        ) : (
          <EventList events={events} />
        )}
      <Footer />
    </div>
  );
}

export default OrganizerPage;
