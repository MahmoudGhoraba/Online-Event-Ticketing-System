import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './BookingDetails.css';

const BookingDetails = () => {
  const [booking, setBooking] = useState(null);
  const [bookingId, setBookingId] = useState("");

  const getBooking = async (id) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/v1/bookings/${id}`);
      setBooking(res.data);
    } catch (err) {
      console.error("Error fetching booking");
    }
  };

  return (
    <div className="booking-view-container">
      <div className="navigation-buttons">
        <Link to="/" className="back-home-button">
          ← Back to Home
        </Link>
        <Link to="/profile" className="profile-button">
          Profile →
        </Link>
      </div>
      
      <div className="booking-view-content">
        <div className="booking-view-search">
          <h2 className="booking-view-title">Find Your Booking</h2>
          <p className="booking-view-subtitle">Enter your booking ID to view your ticket details</p>
          <div className="booking-view-search-box">
            <input
              type="text"
              value={bookingId}
              onChange={(e) => setBookingId(e.target.value)}
              placeholder="Enter Booking ID"
              className="booking-view-input"
            />
            <button onClick={() => getBooking(bookingId)} className="booking-view-button">
              View Booking
            </button>
          </div>
        </div>

        {!booking && (
          <div className="booking-view-placeholder">
            <p>Enter your booking ID above to see your ticket details</p>
          </div>
        )}

        {booking && (
          <div className="booking-view-details">
            <h2 className="booking-view-details-title">Booking Details</h2>
            <div className="booking-view-info-container">
              <div className="booking-view-info-row">
                <span className="booking-view-info-label">Event</span>
                <span className="booking-view-info-value">{booking.event.title}</span>
              </div>
              <div className="booking-view-info-row">
                <span className="booking-view-info-label">Tickets</span>
                <span className="booking-view-info-value">{booking.tickets}</span>
              </div>
              <div className="booking-view-info-row">
                <span className="booking-view-info-label">Total Price</span>
                <span className="booking-view-info-value">${booking.totalPrice.toFixed(2)}</span>
              </div>
              <div className="booking-view-info-row">
                <span className="booking-view-info-label">Status</span>
                <span className={`booking-view-status ${booking.bookingStatus.toLowerCase()}`}>
                  {booking.bookingStatus}
                </span>
              </div>
              <div className="booking-view-info-row">
                <span className="booking-view-info-label">Created At</span>
                <span className="booking-view-info-value">
                  {new Date(booking.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
