import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Ticket,
  Tag,
} from "lucide-react";
import './events.css'

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation();
    navigate(`/events/${event._id}`);
  };

  const eventImage = (event.image !== undefined )?  event.image : "src/assets/ed.jpg" ;
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
    <div className={`destination-card ${isEventPassed ? "event-passed" : ""}`} onClick={handleViewDetails}>
      <div className="destination-card__image">
        <img src={eventImage} alt={event.title} />
        {event.status !== "approved" && (
          <div className="status-badge">{event.status}</div>
        )}
        {isEventPassed && (
          <div className="destination-card__overlay">
            <span className="event-ended-badge">Event Ended</span>
          </div>
        )}
      </div>

      <div className="destination-card__content">
        <div className="destination-card__info">
          <h3 className="destination-card__title">{event.title}</h3>
          <span className="destination-card__price">${event.ticketPrice.toFixed(2)}</span>
        </div>

        <div className="info-row">
          <Calendar size={16} className="icon" />
          <span>{formattedDate}</span>
        </div>

        <div className="info-row">
          <MapPin size={16} className="icon" />
          <span>{event.location}</span>
        </div>

        <div className={`ticket-status ${ticketColor}`}>
          <Ticket size={16} className="icon" />
          <span>{isEventPassed ? "Event ended" : `${event.remainingTickets} tickets left`}</span>
        </div>
      </div>
    </div>
  );
}
