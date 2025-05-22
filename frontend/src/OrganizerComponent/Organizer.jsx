import React, { useState, useEffect } from "react";
import axios from "axios";
import TypingMessage from "../homeComponents/TypingMessage";
import EventList from "../eventComponents/EventList";
import Footer from "../sharedComponents/Footer";
import Navbar from "../sharedComponents/navBar";
import CreateEventcard from '../eventComponents/createevent';
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react"; // Make sure to import icons or replace
import ChartComponent from './chartcomponent'; // adjust path



function OrganizerPage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [activeTab, setActiveTab] = useState("discover");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/users/events");
        console.log(response.data);
        setFeaturedEvents(response.data.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleClick = (event) => {
    console.log("clicked");
    navigate(`/organizer/eventdeatails/${event._id}`);
  };

  // Styles object
  const styles = {
    tabsContainer: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "0 24px",
    },
    tabButtonsWrapper: {
      display: "flex",
      borderBottom: "1px solid #e5e7eb",
      overflowX: "auto",
      paddingBottom: 8,
      gap: 24,
      justifyContent: "start",
    },
    tabButton: (isActive) => ({
      padding: "12px 24px",
      cursor: "pointer",
      borderBottom: isActive ? "2px solid #2563EB" : "2px solid transparent",
      color: isActive ? "#2563EB" : "#6B7280",
      fontWeight: isActive ? 600 : 500,
      whiteSpace: "nowrap",
      background: "none",
      outline: "none",
      border: "none",
    }),
    tabContent: {
      marginTop: 24,
      maxWidth: 1200,
      margin: "auto",
      padding: "0 24px",
    },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F9FAFB", overflowX: "hidden" }}>
      <Navbar />

      {/* Featured Events Section */}
      <section style={{ backgroundColor: "#F9FAFB", paddingTop: 64, paddingBottom: 64 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "#111827", textAlign: "center", marginBottom: 48 }}>
            Featured Events
          </h2>

          {loading ? (
            <p style={{ textAlign: "center", color: "#6B7280", fontSize: 18 }}>Loading events...</p>
          ) : featuredEvents.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6B7280", fontSize: 18 }}>No events available.</p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: 32,
                }}
              >
                {/* Show either first 3 events or all events */}
                <EventList events={showAllEvents ? featuredEvents : featuredEvents.slice(0, 3)} onClick={handleClick} />

                {/* CreateEventcard always last */}
                <CreateEventcard />
              </div>

              {/* Toggle button for show more / show less */}
              {featuredEvents.length > 3 && (
                <div style={{ textAlign: "center", marginTop: 24 }}>
                  <button
                    style={{
                      backgroundColor: "#2563EB",
                      color: "white",
                      fontWeight: 600,
                      padding: "12px 32px",
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 4px 6px rgba(37, 99, 235, 0.5)",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowAllEvents(!showAllEvents)}
                  >
                    {showAllEvents ? "Show Less" : "Explore More"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Tabs Section */}
      <div style={styles.tabsContainer}>
        <div style={styles.tabButtonsWrapper}>
          {["discover", "organize", "attend", "analyze"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={styles.tabButton(activeTab === tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={styles.tabContent}>
          {activeTab === "discover" && (
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 40%" }}>
                <h3 style={{ fontSize: 24, fontWeight: "bold", color: "#111827" }}>
                  Find the perfect events for you
                </h3>
                <p style={{ marginTop: 16, fontSize: 18, color: "#4B5563" }}>
                  Our smart discovery engine helps you find events that match your interests, location, and schedule.
                </p>
                <ul style={{ marginTop: 32, listStyleType: "none", paddingLeft: 0 }}>
                  {["Personalized recommendations", "Advanced search filters", "Location-based discovery"].map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "start", marginBottom: 10 }}>
                      <Check className="h-5 w-5 text-green-500" />
                      <p style={{ marginLeft: 12, color: "#374151" }}>{item}</p>
                    </li>
                  ))}
                </ul>
                <a href="#" style={{ marginTop: 40, display: "inline-flex", alignItems: "center", color: "#2563EB", fontWeight: 600 }}>
                  Learn more about discovery
                  <ArrowRight style={{ marginLeft: 8, width: 16, height: 16 }} />
                </a>
              </div>
              <div style={{ flex: "1 1 60%" }}>
                <div style={{ borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
                  <img src="src/assets/react.svg" alt="Event discovery interface" style={{ width: "20%", height: "auto" }} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "organize" && (
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {/* Content for organize */}
              {/* ... */}
            </div>
          )}
          {activeTab === "attend" && (
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {/* Content for attend */}
              {/* ... */}
            </div>
          )}
          {activeTab === "analyze" && (
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {/* Content for analyze */}
              {/* ... */}
            </div>
          )}
        </div>
      </div>
      {activeTab === "analyze" && (
  <div style={{ padding: '24px 0' }}>
    
  </div>
)}
<ChartComponent />
      <Footer />
    </div>
  );
}

export default OrganizerPage;
