import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline';
import './createEvent.css';

function EventForm() {
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
    image: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploadingImage(true);
      setError(null);
      setSuccess("Uploading image...");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'unsigned_preset');

      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dvmqahby6/image/upload',
        formData,
        {
          withCredentials: false,
        }
      );

      const imageUrl = response.data.secure_url;
      setFormData(prev => ({ ...prev, image: imageUrl }));
      console.log("Image URL set:", imageUrl);
      setSuccess("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to upload image. Please try again.");
      setPreviewUrl(null);
    } finally {
      setUploadingImage(false);
    }
  };

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

    const eventData = {
      ...formData,
      ticketPrice: Number(formData.ticketPrice),
      remainingTickets: Number(formData.remainingTickets),
      totalNumberOfTickets: Number(formData.totalNumberOfTickets),
      date: new Date(formData.date).toISOString(),
    };

    console.log("Submitting event data:", eventData);

    try {
      const response = await axios.post("http://localhost:3000/api/v1/events", eventData);
      console.log("Server response:", response.data);
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
        Organizer: "",
        status: "pending",
        image: ""
      });
      setPreviewUrl(null);
    } catch (err) {
      console.error("Error creating event:", err.response?.data || err);
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="event-details-loading">
      <Loader />
    </div>
  );

  return (
    <div className="event-details-container">
      <div className="navigation-buttons">
        <Link to="/" className="back-home-button">
          ← Back to Home
        </Link>
        <Link to="/profile" className="profile-button">
          Profile →
        </Link>
      </div>

      <div className="event-details-card">
        <div className="event-details-header">
          <h1 className="event-details-title">Create New Event</h1>
        </div>

        <form onSubmit={handleSubmit} className="event-details-form">
          <div className="form-grid">
            <div className="form-group event-image-upload">
              <div className="image-upload-container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="image-input"
                  id="event-image-upload"
                />
                <label htmlFor="event-image-upload" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Event Preview" className="image-preview" />
                  ) : (
                    <div className="image-placeholder">
                      <span>📷</span>
                      <p>Add Event Image</p>
                    </div>
                  )}
                </label>
              </div>
            </div>

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
              disabled={loading || uploadingImage}
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

export default EventForm;
