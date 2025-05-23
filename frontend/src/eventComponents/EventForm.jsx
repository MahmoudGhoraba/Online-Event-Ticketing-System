import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import "./EventCardStyle.css"; // Import the CSS file

export default function CreateEventCard() {
  const navigate = useNavigate();

  return (
    <div
      className="event-card" // Applying event-card class from the provided CSS
      onClick={() => navigate("/organizer/createvents")}
    >
      <div className="event-image-container">
        <Plus size={32} strokeWidth={2} className="icon" />
      </div>
      <div className="event-content">
        <span className="event-title">Create New Event</span>
      </div>
    </div>
  );
}
