import React, { useState } from "react";
import axios from "axios";
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import '../cssStyles/EventDetails.css';

function OrganizerCreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    ticketPrice: "",
    remainingTickets: "",
    totalNumberOfTickets: "",
    Organizer: "",
    status: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/events", {
        ...formData,
        ticketPrice: Number(formData.ticketPrice),
        remainingTickets: Number(formData.remainingTickets),
        totalNumberOfTickets: Number(formData.totalNumberOfTickets),
        date: new Date(formData.date).toISOString(),
      });
      setSuccess("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        ticketPrice: "",
        remainingTickets: "",
        totalNumberOfTickets: "",
        status: "pending",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="event-details-loading">
      <div className="loading-spinner"></div>
      <p>Creating event...</p>
    </div>
  );

  return (
    <div className="event-details-container">
      <div className="event-details-card">
        <div className="event-details-header">
          <h1 className="event-details-title">Create New Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="event-details-form">
          <div className="form-grid">
            <div className="form-group">
              <label>
                <span>Event Title</span>
                <div className="input-with-icon">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="event-details-input"
                    placeholder="Enter event title"
                  />
                </div>
              </label>
            </div>

            <div className="form-group full-width">
              <label>
                <span>Description</span>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="event-details-input event-details-textarea"
                  placeholder="Enter event description"
                  rows={4}
                />
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Date and Time</span>
                <div className="input-with-icon">
                  <CalendarIcon className="input-icon" />
                  <input
                    type="datetime-local"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="event-details-input"
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Location</span>
                <div className="input-with-icon">
                  <MapPinIcon className="input-icon" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="event-details-input"
                    placeholder="Enter event location"
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Category</span>
                <div className="input-with-icon">
                  <TagIcon className="input-icon" />
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="event-details-input"
                    placeholder="Enter event category"
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Ticket Price ($)</span>
                <div className="input-with-icon">
                  <CurrencyDollarIcon className="input-icon" />
                  <input
                    type="number"
                    name="ticketPrice"
                    value={formData.ticketPrice}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="event-details-input"
                    placeholder="0.00"
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Total Number of Tickets</span>
                <div className="input-with-icon">
                  <UserGroupIcon className="input-icon" />
                  <input
                    type="number"
                    name="totalNumberOfTickets"
                    value={formData.totalNumberOfTickets}
                    onChange={handleChange}
                    min="0"
                    required
                    className="event-details-input"
                    placeholder="Enter total tickets"
                  />
                </div>
              </label>
            </div>

            <div className="form-group">
              <label>
                <span>Initial Available Tickets</span>
                <div className="input-with-icon">
                  <TicketIcon className="input-icon" />
                  <input
                    type="number"
                    name="remainingTickets"
                    value={formData.remainingTickets}
                    onChange={handleChange}
                    min="0"
                    required
                    className="event-details-input"
                    placeholder="Enter available tickets"
                  />
                </div>
              </label>
            </div>
          </div>

          <div className="event-details-actions">
            <button
              type="submit"
              disabled={loading}
              className="event-details-button"
            >
              <PlusCircleIcon className="button-icon" />
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>

          {error && <div className="event-details-error">{error}</div>}
          {success && <div className="event-details-success">{success}</div>}
        </form>
      </div>
    </div>
  );
}

export default OrganizerCreateEvent;
