import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";

export default function CreateEventCard() {
  const navigate = useNavigate();

  const styles = {
    card: {
      backgroundColor: "#F9FAFB",
      border: "2px dashed #D1D5DB",
      borderRadius: 12,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 360,
      cursor: "pointer",
      transition: "all 0.3s",
    },
    content: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      color: "#6B7280",
    },
    icon: {
      marginBottom: 8,
    },
    text: {
      fontSize: 16,
      fontWeight: 500,
    },
  };

  return (
    <div
      style={styles.card}
      onClick={() => navigate("/create-event")}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EFF6FF")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#F9FAFB")}
    >
      <div style={styles.content}>
        <Plus size={32} strokeWidth={2} style={styles.icon} />
        <span style={styles.text}>Create New Event</span>
      </div>
    </div>
  );
}
