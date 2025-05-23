import React, { useEffect, useState } from "react";
import './UserBookingsPage.css'
import EventCard from "../eventComponents/EventCard";
import axios from "axios";
const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try{
        const res= await axios.get('http://localhost:3000/api/v1/users/bookings');
        setBookings(res.data);
    }catch(error){
       console.error("Failed to get bookings from database");
    }
  };

  const cancelBooking = async (id) => {
    try{
        const res= await axios.delete(`http://localhost:3000/api/v1/bookings/${id}`)
        getBookings();
    }catch(error){
       console.error("Failed to cancel booking from database");
    }
  };
  useEffect(() => {
    getBookings();
  }, []);
    return (
    <div className="booking-page-container">
      <div className="bookings-section">
        <h2 className="bookings-header">My Bookings</h2>
        
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h4 className="event-title">{booking.event.title}</h4>
                  <span className={`status-badge ${booking.bookingStatus.toLowerCase()}`}>
                    {booking.bookingStatus}
                  </span>
                </div>
                <div className="booking-details">
                  <p className="detail-item">
                    <span className="detail-label">Tickets:</span>
                    <span className="detail-value">{booking.tickets}</span>
                  </p>
                  <p className="detail-item">
                    <span className="detail-label">Total Price:</span>
                    <span className="detail-value">${booking.totalPrice.toFixed(2)}</span>
                  </p>
                </div>
                <button 
                  className="cancel-btn" 
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage ;





/*import React, { useEffect, useState } from "react";
import './UserBookingsPage.css'
import axios from "axios";
import EventCard from "../eventComponents/EventCard";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try{
        const res= await axios.get('http://localhost:3000/api/v1/users/bookings');
        setBookings(res.data);
    }catch(error){
       console.error("Failed to get bookings from database");
    }
  };

  const cancelBooking = async (id) => {
    try{
        await axios.delete(`http://localhost:3000/api/v1/bookings/${id}`)
        getBookings();
    }catch(error){
       console.error("Failed to cancel booking from database");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="booking-page-container">
      <div className="bookings-section">
        <h2 className="bookings-header">My Bookings</h2>
        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <EventCard event={booking.event} />
                <div className="booking-details">
                  <p className="detail-item">
                    <span className="detail-label">Tickets:</span>
                    <span className="detail-value">{booking.tickets}</span>
                  </p>
                  <p className="detail-item">
                    <span className="detail-label">Total Price:</span>
                    <span className="detail-value">${booking.totalPrice.toFixed(2)}</span>
                  </p>
                  <p className="detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`status-badge ${booking.bookingStatus.toLowerCase()}`}>
                      {booking.bookingStatus}
                    </span>
                  </p>
                </div>
                <button 
                  className="cancel-btn" 
                  onClick={() => cancelBooking(booking._id)}
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage;*/