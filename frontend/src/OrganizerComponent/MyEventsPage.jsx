import React, { useState, useEffect } from "react";
import axios from "axios";
import TypingMessage from "../HomePageComponents/TypingMessage";
import EventList from "../eventComponents/EventList";
import Footer from "../sharedComponents/Footer";
import Navbar from "../sharedComponents/navBar";
import CreateEventcard from '../eventComponents/EventForm';
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Plus, Calendar } from "lucide-react";
import ChartComponent from './EventAnalytics';
import '../cssStyles/MyEventsPage.css';

function OrganizerPage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/events");
        console.log(response.data);
        setFeaturedEvents(response.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleClick = (event) => {
    console.log("clicked");
    navigate(`/events/${event._id}`);
  };

  return (
    <div className="organizer-page">
      <div className="organizer-background-decor">
        <div className="organizer-circle organizer-circle-1"></div>
        <div className="organizer-circle organizer-circle-2"></div>
      </div>

      <Navbar />

      <div className="organizer-content">
        <div className="organizer-header">
          <h1 className="organizer-title">My Events Dashboard</h1>
          <p className="organizer-subtitle">Manage and create your events</p>
        </div>

        <div className="organizer-grid">
          {/* Create Event Card */}
          <div className="organizer-create-card" onClick={() => setShowCreateForm(true)}>
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
                <span className="organizer-stat-number">{featuredEvents.length}</span>
                <span className="organizer-stat-label">Total Events</span>
              </div>
              {/* Add more stats as needed */}
            </div>
          </div>
        </div>

        {/* Create Event Form Modal */}
        {showCreateForm && (
          <div className="organizer-modal">
            <div className="organizer-modal-content">
              <button className="organizer-modal-close" onClick={() => setShowCreateForm(false)}>×</button>
              <CreateEventcard />
            </div>
          </div>
        )}

      </div>
        <EventList/>
      <Footer />
    </div>
  );
}

export default OrganizerPage;
