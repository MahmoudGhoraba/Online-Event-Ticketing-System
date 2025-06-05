import React, { useEffect, useState } from "react";
import './UserBookingsPage.css'
import EventCard from "../eventComponents/EventCard";
import axios from "axios";
import NavBar from "../sharedComponents/navBar"
import { useTheme } from '../theme/ThemeContext';

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const { isDarkMode } = useTheme();

  const getBookings = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/users/bookings');
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to get bookings from database");
    }
  };

  const cancelBooking = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3000/api/v1/bookings/${id}`)
      getBookings();
    } catch (error) {
      console.error("Failed to cancel booking from database");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <>
      <NavBar />
      <div className={`user-bookings-container ${isDarkMode ? 'dark-mode' : ''}`}>
        <div className="user-bookings-content">
          <div className={`user-bookings-header ${isDarkMode ? 'dark-mode' : ''}`}>
            <h1 className="user-bookings-title" data-text="My Bookings">My Bookings</h1>
            <p className="user-bookings-subtitle" data-text="Manage your event bookings">Manage your event bookings</p>
          </div>

          {bookings.length === 0 ? (
            <div className={`user-bookings-empty ${isDarkMode ? 'dark-mode' : ''}`}>
              <p>You haven't made any bookings yet.</p>
              <p className="user-bookings-empty-subtitle">Book an event to get started!</p>
            </div>
          ) : (
            <div className="user-bookings-list">
              {Array.isArray(bookings) && bookings.map((booking) => {
                const event = booking.event || {};
                const status = booking.bookingStatus || "Unknown";
                return (
                  <div key={booking._id} className={`user-booking-card ${isDarkMode ? 'dark-mode' : ''}`}>
                    <div className="user-booking-event">
                      <EventCard event={event} />
                    </div>
                    
                    <div className={`user-booking-info ${isDarkMode ? 'dark-mode' : ''}`}>
                      <h3 className="user-booking-event-title">{event.title}</h3>
                      
                      <div className="user-booking-details">
                        <div className={`user-booking-detail ${isDarkMode ? 'dark-mode' : ''}`}>
                          <span className="detail-icon">🎟️</span>
                          <span className="detail-label">Tickets</span>
                          <span className="detail-value">{booking.tickets || 0}</span>
                        </div>
                        
                        <div className={`user-booking-detail ${isDarkMode ? 'dark-mode' : ''}`}>
                          <span className="detail-icon">💰</span>
                          <span className="detail-label">Total Price</span>
                          <span className="detail-value">
                            ${booking.totalPrice?.toFixed(2) || "0.00"}
                          </span>
                        </div>
                        
                        <div className={`user-booking-detail ${isDarkMode ? 'dark-mode' : ''}`}>
                          <span className="detail-icon">📊</span>
                          <span className="detail-label">Status</span>
                          <span className={`user-booking-status ${status.toLowerCase()}`}>
                            {status}
                          </span>
                        </div>
                      </div>

                      <button
                        className={`user-booking-cancel-btn ${isDarkMode ? 'dark-mode' : ''}`}
                        onClick={() => cancelBooking(booking._id)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default UserBookingsPage;