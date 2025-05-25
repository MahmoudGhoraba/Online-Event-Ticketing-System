import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import "./events.css";
import EventCard from "./EventCard";

export default function EventList(props) {
  const { user } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  const navigate = useNavigate();
  const totalPages = Math.ceil(featuredEvents.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleEvents = featuredEvents.slice(startIndex, startIndex + itemsPerPage);

  const goNext = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  const goPrevious = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        let data;
        if (props && props.events) {
          // Use events passed via props
          setFeaturedEvents(props.events);
          setLoading(false);
          return;
        }

        // Otherwise fetch from API
        if (!user || user.role === "User" || user.role === "Admin") {
          const res = await axios.get("http://localhost:3000/api/v1/events/");
          data = res.data;
        } else if (user.role === "Organizer") {
          const res = await axios.get("http://localhost:3000/api/v1/users/events");
          data = res.data.events;
        }

        setFeaturedEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [user, props.events]);

  const handleClick = (event) => {
    navigate(`/events/${event._id}`);
  };

  return (
    <div className="top-destinations">
      <div
        style={{
          borderTop: "2px solid #d1d5db",
          width: "50%",
          margin: "0 auto",
          marginBottom: "4rem",
          backgroundColor: "white",
        }}
      ></div>

      <div className="top-destinations__spiral">
        <svg width="120" height="200" viewBox="0 0 120 200">
          {/* Spiral Paths */}
        </svg>
      </div>

      <div className="top-destinations__container">
        <div className="top-destinations__header">
          <div className="top-destinations__subheading">Top Selling</div>
          <h2 className="top-destinations__heading">Top Events</h2>
        </div>

        <div className="top-destinations__grid">
          {loading ? (
            <p style={{ textAlign: "center", color: "#6B7280", fontSize: 18 }}>
              Loading events...
            </p>
          ) : featuredEvents.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6B7280", fontSize: 18 }}>
              No events available.
            </p>
          ) : (
            visibleEvents.map((event, index) => (
              <div className="destination-card" key={index} onClick={() => handleClick(event)}>
                <EventCard event={event} />
              </div>
            ))
          )}
        </div>

        <div className="top-destinations__pagination">
          <button onClick={goPrevious} disabled={currentPage === 0}>
            Previous
          </button>
          <button onClick={goNext} disabled={currentPage >= totalPages - 1}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
