import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Ticket,
  Tag,
} from "lucide-react";

export default function EventCard({ event }) {
  const navigate = useNavigate();

  const handleViewDetails = (e) => {
    e.stopPropagation(); // Prevent outer div click if button is clicked
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

  const getTicketColor = () => {
    if (ticketAvailability <= 20) return "#DC2626"; // red-500
    if (ticketAvailability <= 50) return "#D97706"; // yellow-500
    return "#16A34A"; // green-500
  };

  const isEventPassed = new Date(event.date) < new Date();

  // Styles as JavaScript objects
  const styles = {
    card: {
      backgroundColor: "white",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      transform: "scale(1)",
      transition: "transform 0.3s",
      cursor: "pointer",
      display: "flex",
      flexDirection: "column",
      opacity: isEventPassed ? 0.7 : 1,
    },
    imageContainer: {
      position: "relative",
      height: 192,
      backgroundColor: "#E5E7EB",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    statusBadge: {
      position: "absolute",
      top: 8,
      left: 8,
      backgroundColor: "#D97706",
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
      padding: "4px 8px",
      borderRadius: 4,
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlayText: {
      backgroundColor: "#DC2626",
      color: "white",
      padding: "6px 12px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 600,
    },
    gradientBottom: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      background: "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent)",
      padding: 8,
      color: "white",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 12,
      fontWeight: 600,
    },
    content: {
      padding: 16,
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 8,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    infoRow: {
      display: "flex",
      alignItems: "center",
      color: "#4B5563",
      marginBottom: 8,
      fontSize: 14,
    },
    ticketStatus: {
      display: "flex",
      alignItems: "center",
      marginBottom: 8,
      fontSize: 14,
      color: getTicketColor(),
    },
    bottomRow: {
      marginTop: "auto",
      paddingTop: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: 12,
      color: "#6B7280",
    },
    viewButton: {
      color: "#2563EB",
      fontWeight: 500,
      fontSize: 14,
      background: "none",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
    },
  };

  return (
    <div
      style={styles.card}
      onClick={() => navigate(`/events/${event._id}`)}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={styles.imageContainer}>
        {event.status !== "approved" && (
          <div style={styles.statusBadge}>{event.status}</div>
        )}
        {isEventPassed && (
          <div style={styles.overlay}>
            <span style={styles.overlayText}>Event Ended</span>
          </div>
        )}
        <img src={eventImage} alt={event.title} style={styles.image} />
        <div style={styles.gradientBottom}>
          <span>${event.ticketPrice.toFixed(2)}</span>
          <span>{event.category}</span>
        </div>
      </div>

      <div style={styles.content}>
        <h3 style={styles.title}>{event.title}</h3>
        <div style={styles.infoRow}>
          <Calendar size={16} style={{ marginRight: 8 }} />
          {formattedDate}
        </div>
        <div style={styles.infoRow}>
          <MapPin size={16} style={{ marginRight: 8 }} />
          {event.location}
        </div>
        <div style={styles.ticketStatus}>
          <Ticket size={16} style={{ marginRight: 8 }} />
          {isEventPassed ? "Event ended" : `${event.remainingTickets} tickets left`}
        </div>
        <div style={styles.bottomRow}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tag size={14} style={{ marginRight: 4 }} />
            {event.category}
          </div>
          <button style={styles.viewButton} onClick={handleViewDetails}>
            View details <ArrowRight size={16} style={{ marginLeft: 4 }} />
          </button>
        </div>
      </div>
    </div>
  );
}
