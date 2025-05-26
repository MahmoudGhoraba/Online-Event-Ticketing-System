import React, { useEffect, useState } from "react";
import axios from "axios";
import EventList from "../eventComponents/EventList";
import "./index.css";
import Navbar from "../sharedComponents/navBar";
import Footer from "../sharedComponents/Footer";
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
  <>
    <Navbar />
      <div
        className="loading"
        style={{ padding: 20, color: "#111", backgroundColor: "#f0f0f0" }}
      >
        Loading events...
      </div>
      </>
    );

  if (errorEvents)
    return (
  <>
    <Navbar />
      <div
        className="error"
        style={{ padding: 20, color: "red", backgroundColor: "#fff0f0" }}
      >
        Error loading events: {errorEvents}
      </div>
    </>
    );

  return (
    <>
    <Navbar />
    <EventList/>
    <Footer />
    </>
  );
} 