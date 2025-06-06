import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext'; // Adjust path as needed
import { useTheme } from '../theme/ThemeContext';
import '../cssStyles/EventDetails.css';
import Loader from '../sharedComponents/Loader';
import {
  CalendarIcon,
  MapPinIcon,
  TagIcon,
  TicketIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  PencilSquareIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowRightOnRectangleIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // access logged-in user
  const { isDarkMode } = useTheme();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Convert ISO date to local datetime-local input value
  const toLocalDatetime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
        console.log("Event data:", response.data); // Debug log
        setEvent(response.data);
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Could not load event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const NavigateToBookTicketForm = () => {
    console.log("hello");
    if(user.role === 'User'){
      navigate(`/booking/BookTicketForm/${event._id}`);
    }else{
      alert('You are not authorized to book tickets');
      navigate('/login');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  const handleStatusChange = async (newStatus) => {
    setUpdatingStatus(true);
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/events/${id}`, {
        ...event,
        status: newStatus
      });
      setEvent(response.data.event);
      alert(`Event status updated to ${newStatus}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      alert('Failed to update event status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) return (
    <Loader />
  );
  
  if (error) return (
    <div className="event-details-error">
      <XCircleIcon className="error-icon" />
      <p>{error}</p>
    </div>
  );
  
  if (!event) return (
    <div className="event-details-error">
      <XCircleIcon className="error-icon" />
      <p>No event found.</p>
    </div>
  );

  const isOrganizer = user?.role === 'Organizer';
  const isUser = user?.role === 'User';
  const isAdmin = user?.role === 'Admin';

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className={`event-details-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="navigation-buttons">
        <Link to="/" className={`profile-button ${isDarkMode ? 'dark-mode' : ''}`}>
          ← Back to Home
        </Link>
        { user !== undefined && (
        <Link to="/profile" className={`profile-button ${isDarkMode ? 'dark-mode' : ''}`}>
          Profile →
        </Link>
        )}
      </div>

      <div className={`event-details-card ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className={`event-details-header ${isDarkMode ? 'dark-mode' : ''}`}>
          <h1 className="event-details-title">{event.title}</h1>
          {isOrganizer && !isEditing && (
            <div className={`event-details-organizer-actions ${isDarkMode ? 'dark-mode' : ''}`}>
              <div className={`status-display ${isDarkMode ? 'dark-mode' : ''}`}>
                <ClipboardDocumentCheckIcon className="button-icon" />
                <span>Status: {event.status || 'pending'}</span>
              </div>
              <button
                onClick={() => setIsEditing(true)}
                className={`event-details-edit-button ${isDarkMode ? 'dark-mode' : ''}`}
              >
                <PencilSquareIcon className="button-icon" />
                Edit Event
              </button>
              <button
                onClick={async () => {
                  if (window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
                    setDeleting(true);
                    try {
                      await axios.delete(`http://localhost:3000/api/v1/events/${id}`);
                      alert("Event deleted successfully");
                      navigate('/my-events');
                    } catch (err) {
                      console.error("Delete failed", err);
                      alert("Failed to delete event");
                    } finally {
                      setDeleting(false);
                    }
                  }
                }}
                disabled={deleting}
                className={`event-details-delete-button ${isDarkMode ? 'dark-mode' : ''}`}
              >
                <TrashIcon className="button-icon" />
                {deleting ? "Deleting..." : "Delete Event"}
              </button>
            </div>
          )}
        </div>

        {!isEditing ? (
          <div className={`event-details-content ${isDarkMode ? 'dark-mode' : ''}`}>
            {event.image && (
              <div className={`event-image-container ${isDarkMode ? 'dark-mode' : ''}`}>
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="event-image" 
                  onError={(e) => {
                    console.error('Image failed to load:', event.image);
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="event-details-info-grid">
              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <CalendarIcon className="info-icon" />
                <div className="info-text">
                  <h3>Date & Time</h3>
                  <p>{formatDate(event.date)}</p>
                </div>
              </div>

              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <MapPinIcon className="info-icon" />
                <div className="info-text">
                  <h3>Location</h3>
                  <p>{event.location}</p>
                </div>
              </div>

              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <TagIcon className="info-icon" />
                <div className="info-text">
                  <h3>Category</h3>
                  <p>{event.category}</p>
                </div>
              </div>

              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <CurrencyDollarIcon className="info-icon" />
                <div className="info-text">
                  <h3>Ticket Price</h3>
                  <p>${event.ticketPrice}</p>
                </div>
              </div>

              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <TicketIcon className="info-icon" />
                <div className="info-text">
                  <h3>Available Tickets</h3>
                  <p>{event.remainingTickets} / {event.totalNumberOfTickets}</p>
                </div>
              </div>

              <div className={`info-card ${isDarkMode ? 'dark-mode' : ''}`}>
                <UserGroupIcon className="info-icon" />
                <div className="info-text">
                  <h3>Capacity</h3>
                  <p>{event.totalNumberOfTickets} seats</p>
                </div>
              </div>
            </div>

            <div className={`event-details-description ${isDarkMode ? 'dark-mode' : ''}`}>
              <h2>About This Event</h2>
              <p>{event.description}</p>
            </div>

            <div className={`event-details-booking ${isDarkMode ? 'dark-mode' : ''}`}>
              <div className={`ticket-status ${event.remainingTickets > 0 ? 'tickets-available' : 'tickets-sold-out'} ${isDarkMode ? 'dark-mode' : ''}`}>
                {event.remainingTickets > 0 ? (
                  <CheckCircleIcon className="status-icon" />
                ) : (
                  <XCircleIcon className="status-icon" />
                )}
                <span>
                  {event.remainingTickets > 0 
                    ? `${event.remainingTickets} tickets available` 
                    : 'Sold Out'}
                </span>
              </div>
              
              {user ? (
                <>
                  {isUser && (
                    <button
                      onClick={NavigateToBookTicketForm}
                      disabled={event.remainingTickets <= 0 || new Date(event.date) < new Date()}
                      className={`event-details-button ${isDarkMode ? 'dark-mode' : ''}`}
                    >
                      <TicketIcon className="button-icon" />
                      {event.remainingTickets > 0 ? "Book Now!" : "Sold Out"}
                    </button>
                  )}
                  {isAdmin && (
                    <div className={`admin-status-control ${isDarkMode ? 'dark-mode' : ''}`}>
                      <div className={`status-dropdown ${isDarkMode ? 'dark-mode' : ''}`}>
                        <ClipboardDocumentCheckIcon className="button-icon" />
                        <select
                          value={event.status || ''}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          disabled={updatingStatus}
                          className={`status-select ${isDarkMode ? 'dark-mode' : ''}`}
                        >
                          <option value="">Current: {event.status || 'pending'}</option>
                          <option value="approved">approve</option>
                          <option value="declined">decline</option>
                          <option value="pending">pending</option>
                        </select>
                      </div>
                      {updatingStatus && <span className="status-updating">Updating...</span>}
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={handleLoginRedirect}
                  className={`event-details-login-button ${isDarkMode ? 'dark-mode' : ''}`}
                >
                  <ArrowRightOnRectangleIcon className="button-icon" />
                  Login to Book Tickets
                </button>
              )}
            </div>
          </div>
        ) : (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setSaving(true);
              try {
                await axios.put(`http://localhost:3000/api/v1/events/${id}`, event);
                alert("Event updated successfully");
                setIsEditing(false);
              } catch (err) {
                console.error("Update failed", err);
                alert("Failed to update event");
              } finally {
                setSaving(false);
              }
            }}
            className={`event-details-form ${isDarkMode ? 'dark-mode' : ''}`}
          >
            <div className="form-grid">
              <div className="form-group event-image-upload">
                <div className="image-upload-container">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files[0];
                      if (!file) return;

                      if (file.size > 5 * 1024 * 1024) {
                        alert("Image size should be less than 5MB");
                        return;
                      }

                      try {
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

                        setEvent(prev => ({ ...prev, image: response.data.secure_url }));
                      } catch (err) {
                        console.error(err);
                        alert("Failed to upload image. Please try again.");
                      }
                    }}
                    className="image-input"
                    id="event-image-upload"
                  />
                  <label htmlFor="event-image-upload" style={{ width: '100%', height: '100%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {event.image ? (
                      <img src={event.image} alt="Event Preview" className="image-preview" />
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
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                    placeholder="Event Title"
                    className="event-details-input"
                    required
                  />
                </label>
              </div>

              <div className="form-group full-width">
                <label>
                  <span>Description</span>
                  <textarea
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                    placeholder="Description"
                    className="event-details-input event-details-textarea"
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span>Date & Time</span>
                  <input
                    type="datetime-local"
                    value={toLocalDatetime(event.date)}
                    onChange={(e) => setEvent({ ...event, date: new Date(e.target.value).toISOString() })}
                    className="event-details-input"
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span>Location</span>
                  <input
                    type="text"
                    value={event.location}
                    onChange={(e) => setEvent({ ...event, location: e.target.value })}
                    placeholder="Location"
                    className="event-details-input"
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span>Category</span>
                  <input
                    type="text"
                    value={event.category}
                    onChange={(e) => setEvent({ ...event, category: e.target.value })}
                    placeholder="Category"
                    className="event-details-input"
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span>Ticket Price ($)</span>
                  <input
                    type="number"
                    value={event.ticketPrice}
                    onChange={(e) => setEvent({ ...event, ticketPrice: parseFloat(e.target.value) })}
                    placeholder="Ticket Price"
                    className="event-details-input"
                    min={0}
                    step="0.01"
                    required
                  />
                </label>
              </div>

              <div className="form-group">
                <label>
                  <span>Total Tickets</span>
                  <input
                    type="number"
                    value={event.totalNumberOfTickets}
                    onChange={(e) => {
                      const newTotal = parseInt(e.target.value, 10);
                      if (isNaN(newTotal) || newTotal < 0) return;
                      const oldTotal = event.totalNumberOfTickets ?? 0;
                      const oldRemaining = event.remainingTickets ?? 0;
                      const bookedTickets = oldTotal - oldRemaining;
                      const safeBookedTickets = bookedTickets < 0 ? 0 : bookedTickets;
                      const newRemaining = newTotal - safeBookedTickets >= 0 ? newTotal - safeBookedTickets : 0;

                      setEvent({
                        ...event,
                        totalNumberOfTickets: newTotal,
                        remainingTickets: newRemaining,
                      });
                    }}
                    placeholder="Total Tickets"
                    className="event-details-input"
                    min={0}
                    required
                  />
                </label>
              </div>
            </div>

            <div className="event-details-actions">
              <button
                type="submit"
                disabled={saving}
                className="event-details-save-button"
              >
                <CheckCircleIcon className="button-icon" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={saving}
                className="event-details-delete-button"
              >
                <XCircleIcon className="button-icon" />
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
