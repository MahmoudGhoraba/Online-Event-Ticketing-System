import React, { useEffect, useState } from "react";
import "./UserBookingsPage.css";
import EventCard from "../eventComponents/EventCard";
import axios from "axios";

const UserBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);  // Optional: loading state

  const getBookings = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users/bookings");
      console.log("Bookings response:", res.data);
      setBookings(res.data || []);
    } catch (error) {
      console.error("Failed to get bookings from database", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/bookings/${id}`);
      getBookings();
    } catch (error) {
      console.error("Failed to cancel booking from database", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  if (loading) {
    return <div className="booking-page-container">Loading bookings...</div>;
  }

  return (
    <div className="booking-page-container">
      <div className="bookings-section">
        <h2 className="bookings-header">My Bookings</h2>

        {bookings.length === 0 ? (
          <p className="no-bookings">No bookings yet.</p>
        ) : (
          <div className="bookings-list">
            {Array.isArray(bookings) && bookings.map((booking) => {
              const event = booking.event || {};
              const status = booking.bookingStatus || "Unknown";

              return (
                <div key={booking._id} className="booking-card">
                  {/* Reuse the EventCard component for cleaner layout */}
                  <EventCard event={event} />

                  <div className="booking-details">
                    <p className="detail-item">
                      <span className="detail-label">Tickets:</span>
                      <span className="detail-value">{booking.tickets || 0}</span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-label">Total Price:</span>
                      <span className="detail-value">
                        ${booking.totalPrice?.toFixed(2) || "0.00"}
                      </span>
                    </p>
                    <p className="detail-item">
                      <span className="detail-label">Status:</span>
                      <span className={`status-badge ${status.toLowerCase()}`}>
                        {status}
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookingsPage;






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