import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Ticket,
  Tag,
} from "lucide-react";
import "./EventCardStyle.css"; // 🔁 Import the CSS file

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/events/${event._id}`);
  };

  const eventImage = event.image || "/api/placeholder/400/320";

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const ticketAvailability =
    (event.remainingTickets / event.totalNumberOfTickets) * 100;

  const isEventPassed = new Date(event.date) < new Date();

  const ticketColor =
    ticketAvailability <= 20
      ? "ticket-red"
      : ticketAvailability <= 50
      ? "ticket-yellow"
      : "ticket-green";

  return (
    <div
      className={`event-card ${isEventPassed ? "event-passed" : ""}`}
    >
      <div className="event-image-container">
        {event.status !== "approved" && (
          <div className="status-badge">{event.status}</div>
        )}
        {isEventPassed && (
          <div className="overlay">
            <span className="overlay-text">Event Ended</span>
          </div>
        )}
        <img src={eventImage} alt={event.title} className="event-image" />
        <div className="gradient-bottom">
          <span>${event.ticketPrice.toFixed(2)}</span>
          <span>{event.category}</span>
        </div>
      </div>

      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <div className="info-row">
          <Calendar size={16} className="icon" />
          {formattedDate}
        </div>
        <div className="info-row">
          <MapPin size={16} className="icon" />
          {event.location}
        </div>
        <div className={`ticket-status ${ticketColor}`}>
          <Ticket size={16} className="icon" />
          {isEventPassed
            ? "Event ended"
            : `${event.remainingTickets} tickets left`}
        </div>
        <div className="bottom-row">
          <div className="category-info">
            <Tag size={14} className="icon-small" />
            {event.category}
          </div>
          <button className="view-button" onClick={handleViewDetails}>
            View details <ArrowRight size={16} style={{ marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
