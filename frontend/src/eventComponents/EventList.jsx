import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import "./events.css";
import EventCard from "./EventCard";
import Loader from "../sharedComponents/Loader";

export default function EventList(props) {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("");
  const [priceSort, setPriceSort] = useState(""); // "" | "asc" | "desc"
  const [statusFilter, setStatusFilter] = useState("all"); // for admin only
  const itemsPerPage = 3;

  const navigate = useNavigate();
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const visibleEvents = filteredEvents.slice(startIndex, startIndex + itemsPerPage);

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
          setFeaturedEvents(props.events);
          setFilteredEvents(props.events);
          setLoading(false);
          return;
        }
        let res;
        if (!user || user.role === "User") {
         res  = await axios.get("http://localhost:3000/api/v1/events/");
        } else if (user.role === "Organizer") {
           res = await axios.get("http://localhost:3000/api/v1/users/events");
        }
        else if (user.role === "Admin") {
           res = await axios.get("http://localhost:3000/api/v1/events/all");
        }
        data = res.data.events;
        setFeaturedEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [user, props.events]);

  useEffect(() => {
    let filtered = [...featuredEvents];

    // Apply date filter
    if (selectedDate) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0];
        return eventDate === selectedDate;
      });
    }

    // Apply price sorting
    if (priceSort) {
      filtered.sort((a, b) => {
        if (priceSort === "asc") {
          return a.ticketPrice - b.ticketPrice;
        } else {
          return b.ticketPrice - a.ticketPrice;
        }
      });
    }

    // Apply status filter for admin
    if (user?.role === "Admin" && statusFilter !== "all") {
      filtered = filtered.filter(event => event.status === statusFilter);
    }

    setFilteredEvents(filtered);
    setCurrentPage(0);
  }, [selectedDate, priceSort, statusFilter, featuredEvents, user]);

  const handleClick = (event) => {
    navigate(`/events/${event._id}`);
  };

  const clearFilters = () => {
    setSelectedDate("");
    setPriceSort("");
    setStatusFilter("all");
  };

  return (
    <div className={`top-destinations ${isDarkMode ? 'dark-mode' : ''}`}>
      <div
        style={{
          borderTop: "2px solid #d1d5db",
          width: "50%",
          margin: "0 auto",
          marginBottom: "4rem",
          backgroundColor: isDarkMode ? 'var(--bg-dark)' : 'white',
        }}
      ></div>

      <div className="filters-section">
        <div className="filters-container">
          <div className="filter-group">
            <label htmlFor="date-filter" className="filter-label">Date:</label>
            <input
              id="date-filter"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="price-sort" className="filter-label">Price:</label>
            <select
              id="price-sort"
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="filter-select"
            >
              <option value="">No Sort</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>

          {/* Status Filter - Only visible for admin */}
          {user?.role === "Admin" && (
            <div className="filter-group">
              <label htmlFor="status-filter" className="filter-label">Status:</label>
              <select
                id="status-filter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="declined">Declined</option>
              </select>
            </div>
          )}

          <button
            onClick={clearFilters}
            className="clear-filters-btn"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      <div className="top-destinations__spiral">
        <svg width="120" height="200" viewBox="0 0 120 200">
          {/* Spiral Paths */}
        </svg>
      </div>

      <div className="top-destinations__container">
        <div className="top-destinations__header">
          <div className="top-destinations__subheading">Top Selling</div>
          {user?.role === "User" && (
            <h2 className="top-destinations__heading">Available Events</h2>
          )}
          {user?.role === "Organizer" && (
            <h2 className="top-destinations__heading">My Events</h2>
          )}
          {user?.role === "Admin" && (
            <h2 className="top-destinations__heading">All Events</h2>
          )}
          {(selectedDate || priceSort || (user?.role === "Admin" && statusFilter !== "all")) && (
            <div className="active-filters">
              {selectedDate && `Date: ${new Date(selectedDate).toLocaleDateString()}`}
              {selectedDate && (priceSort || statusFilter !== "all") && " | "}
              {priceSort && `Price: ${priceSort === "asc" ? "Low to High" : "High to Low"}`}
              {priceSort && statusFilter !== "all" && " | "}
              {statusFilter !== "all" && `Status: ${statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)}`}
            </div>
          )}
        </div>

        <div className="top-destinations__grid">
          {loading ? (
            <Loader />
          ) : filteredEvents.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6B7280", fontSize: 18 }}>
              No events found with the current filters.
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
