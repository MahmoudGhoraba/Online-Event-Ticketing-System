import React, { useState, useEffect } from "react";
import './BookTicketForm.css';
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useTheme } from '../theme/ThemeContext';
import { toast, ToastContainer } from 'react-toastify';

const BookTicketForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/events/${eventId}`);
        setEvent(res.data);
      } catch (error) {
        toast.error("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className={`booking-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="booking-content">
          <p className="loading">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className={`booking-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="booking-content">
          <p className="error">Event not found</p>
        </div>
      </div>
    );
  }

  const totalPrice = quantity * event.ticketPrice;

  const createBooking = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/v1/bookings",
        { event: eventId, tickets: quantity },
        { withCredentials: true }
      );
      
      toast.success("Booking completed successfully!");
      
      setEvent((prevEvent) => ({
        ...prevEvent,
        remainingTickets: prevEvent.remainingTickets - quantity
      }));
      setQuantity(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  function handleQuantityChange(e) {
    const value = Number(e.target.value);
    if (value > event.remainingTickets) {
      toast.warning("Cannot exceed available tickets!");
      setQuantity(event.remainingTickets);
    } else if (value < 1) {
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  }

  return (
    <div className={`booking-container ${isDarkMode ? 'dark-mode' : ''}`}>
      <ToastContainer />
      <div className="navigation-buttons">
        <Link to="/" className={`profile-button ${isDarkMode ? 'dark-mode' : ''}`}>
          Back to Home
        </Link>
        <Link to="/profile" className={`profile-button ${isDarkMode ? 'dark-mode' : ''}`}>
          Profile
        </Link>
      </div>

      <div className={`booking-content ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className={`event-details ${isDarkMode ? 'dark-mode' : ''}`}>
          <h2 className="event-title">{event.title}</h2>
          <p className="tickets-available">Available Tickets: {event.remainingTickets}</p>
        </div>

        <div className={`booking-form ${isDarkMode ? 'dark-mode' : ''}`}>
          <label className="quantity-label">
            Number of Tickets:
            <input
              type="number"
              min="1"
              max={event.remainingTickets}
              value={quantity}
              onChange={handleQuantityChange}
              className="quantity-input"
            />
          </label>
          
          <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
          
          <button 
            className="book-btn"
            onClick={createBooking}
            disabled={event.remainingTickets === 0}
          >
            {event.remainingTickets === 0 ? 'Sold Out' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookTicketForm;

