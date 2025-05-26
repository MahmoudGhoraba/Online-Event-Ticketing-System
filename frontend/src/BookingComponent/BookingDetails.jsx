import React, { useState } from "react";
import axios from "axios";
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
    <div className="booking-details-container">
      <div className="booking-search">
        <h2 className="section-title">Find Booking</h2>
        <div className="search-container">
          <input
            type="text"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
            placeholder="Enter Booking ID"
            className="booking-input"
          />
          <button onClick={() => getBooking(bookingId)} className="view-booking-btn">
            View Booking
          </button>
        </div>
      </div>

      {!booking && (
        <p className="info-message">Enter a Booking ID and click "View Booking" to see the details.</p>
      )}

      {booking && (
        <div className="booking-card">
          <h2 className="booking-title">Booking Details</h2>
          <div className="booking-info">
            <div className="info-row">
              <span className="info-label">Event:</span>
              <span className="info-value">{booking.event.title}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Tickets:</span>
              <span className="info-value">{booking.tickets}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Total Price:</span>
              <span className="info-value">${booking.totalPrice.toFixed(2)}</span>
            </div>
            <div className="info-row">
            <span className="info-label">Status:</span>
              <span className={`status-badge ${booking.bookingStatus.toLowerCase()}`}>
                {booking.bookingStatus}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Created At:</span>
              <span className="info-value">
                {new Date(booking.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetails;
