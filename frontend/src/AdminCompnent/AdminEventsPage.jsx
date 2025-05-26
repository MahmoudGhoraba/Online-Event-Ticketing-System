import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "../eventComponents/EventList";
import "./index.css";

axios.defaults.withCredentials = true;

export default function AdminTables() {
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [errorEvents, setErrorEvents] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [expandedEventIds, setExpandedEventIds] = useState([]);

  // Hardcoded current user role — replace with your auth logic!
  const currentUserRole = "Admin";

  // Fetch events
  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const data  = await axios.get(
        "http://localhost:3000/api/v1/events/all"
      );
      setEvents(data.data.events || []);
      console.log(data);
      setErrorEvents(null);
    } catch (err) {
      setErrorEvents(err.response?.data?.message || "Failed to load events");
    } finally {
      setLoadingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filter events by status
  const filteredEvents =
    filterStatus === "all"
      ? events
      : events.filter((event) => event.status === filterStatus);

  // Toggle expand/collapse event for showing statuses
  const toggleEventExpand = (eventId) => {
    setExpandedEventIds((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  // Update event status via API
  const updateEventStatus = async (event, newStatus) => {
    try {
      const updatedEventData = {
        ...event,
        status: newStatus,
      };
      console.log(event);
      const res = await axios.put(
        `http://localhost:3000/api/v1/events/${updatedEventData._id}`,
        updatedEventData
      );
      setEvents((prevEvents) =>
        prevEvents.map((evt) => (evt._id === event._id ? res.data.event : evt))
      );
      alert(`Event status updated to "${newStatus}"`);
    } catch (error) {
      alert(
        "Failed to update event status: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  if (loadingEvents)
    return (
      <div
        className="loading"
        style={{ padding: 20, color: "#111", backgroundColor: "#f0f0f0" }}
      >
        Loading events...
      </div>
    );

  if (errorEvents)
    return (
      <div
        className="error"
        style={{ padding: 20, color: "red", backgroundColor: "#fff0f0" }}
      >
        Error loading events: {errorEvents}
      </div>
    );

  return (
    <div
      className="admin-tables"
      style={{
        backgroundColor: "#ffffff",
        color: "#1f2937",
        padding: 20,
        maxWidth: 900,
        margin: "0 auto",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgb(0 0 0 / 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#2563EB" }}>Event Management</h2>

      {/* Filter buttons */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontWeight: "bold", marginRight: 10 }}>
          Filter by status:
        </label>
        {["all", "approved", "declined", "pending"].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            style={{
              margin: "0 8px",
              padding: "6px 12px",
              backgroundColor: filterStatus === status ? "#2563EB" : "#e0e0e0",
              color: filterStatus === status ? "white" : "black",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: filterStatus === status ? "bold" : "normal",
            }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Event List */}
      <EventList
        events={filteredEvents}
        onClick={(event) => toggleEventExpand(event._id)}
      />

      {/* Expanded event status updater */}
      {expandedEventIds.map((eventId) => {
        const event = events.find((e) => e._id === eventId);
        if (!event) return null;

        return (
          <div
            key={"status-" + eventId}
            style={{
              marginTop: 12,
              padding: 12,
              border: "1px solid #ccc",
              borderRadius: 8,
              maxWidth: 400,
              backgroundColor: "#f9f9f9",
              color: "#111",
            }}
          >
            <h4>
              Update Status for:{" "}
              <span style={{ color: "#2563EB" }}>{event.title}</span>
            </h4>

            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {["approved", "declined", "pending"].map((statusOption) => {
                const isActive = event.status === statusOption;
                const canUpdateStatus = currentUserRole === "Admin";

                return (
                  <li key={statusOption} style={{ marginBottom: 8 }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isActive && canUpdateStatus)
                          updateEventStatus(event, statusOption);
                      }}
                      disabled={!canUpdateStatus || isActive}
                      style={{
                        cursor:
                          !canUpdateStatus || isActive ? "default" : "pointer",
                        color: isActive
                          ? statusOption === "approved"
                            ? "#16a34a"
                            : statusOption === "declined"
                            ? "#dc2626"
                            : "#ca8a04"
                          : "#6b7280",
                        fontWeight: isActive ? "bold" : "normal",
                        background: isActive
                          ? statusOption === "approved"
                            ? "#bbf7d0"
                            : statusOption === "declined"
                            ? "#fecaca"
                            : "#fde68a"
                          : "transparent",
                        border: isActive
                          ? `1px solid currentColor`
                          : "1px solid transparent",
                        padding: "4px 8px",
                        borderRadius: 4,
                        textDecoration: isActive ? "underline" : "none",
                        opacity: !canUpdateStatus ? 0.5 : 1,
                      }}
                      title={
                        !canUpdateStatus
                          ? "You do not have permission to change the status"
                          : isActive
                          ? `Status is already "${statusOption}"`
                          : `Set status to "${statusOption}"`
                      }
                    >
                      {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
                      {isActive ? " ✔" : ""}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
} 