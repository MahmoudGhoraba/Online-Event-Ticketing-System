import React, { useState, useEffect } from "react";
import './BookTicketForm.css'
import axios from "axios";
import { useParams } from "react-router-dom";

const BookTicketForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [event, setEvent] = useState(null);
  const { eventId } = useParams();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/events/${eventId}`);
        setEvent(res.data);
      } catch (error) {
        setMessage("Failed to load event details.");
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) {
    return (
      <div className="booking-container">
        <p>Loading event details...</p>
        {message && <p className="message error">{message}</p>}
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
      setMessage("Booking is done successfully");
      setEvent((prevEvent) => ({
        ...prevEvent,
        remainingTickets: prevEvent.remainingTickets - quantity
      }));
      setQuantity(1);
    } catch (error) {
      setMessage(error.response?.data?.message || "Booking failed");
    }
  };

  function DisplayQuantity(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <div className="booking-container">
      <div className="event-details">
        <h2 className="event-title">{event.title}</h2>
        <p className="tickets-available">Available Tickets: {event.remainingTickets}</p>
      </div>

      <div className="booking-form">
        <label className="quantity-label">
          Quantity:
          <input
            type="number"
            min="1"
            max={event.remainingTickets}
            value={quantity}
            onChange={DisplayQuantity}
            className="quantity-input"
          />
        </label>
        <p className="total-price">Total Price: ${totalPrice.toFixed(2)}</p>
        <button className="book-btn" onClick={createBooking}>
          Book Now
        </button>
        {message && (
          <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookTicketForm;

