import React, { useState, useEffect } from "react";
import axios from "axios";
import TypingMessage from "../homeComponents/TypingMessage";
import EventCard from "../eventComponents/EventCard";
import Footer from "../sharedComponents/Footer";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/events/");
        setFeaturedEvents(response.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const styles = {
    container: {
      display: "flex",   
      flexDirection: "column",
      minHeight: "100vh",
      backgroundColor: "white",
      overflowX: "hidden", // <-- add this
      overflowY: "hidden",
    },
    heroSection: {
      background: "linear-gradient(135deg, #FEF3C7 0%, #FCD34D 100%)",
      paddingTop: 80,
      paddingBottom: 96,
      textAlign: "center",
    },
    heroContainer: {
      maxWidth: 1200,
      margin: "0 auto",
      paddingLeft: 24,
      paddingRight: 24,
      boxSizing: "border-box",
    },
    heroText: {
      fontSize: 18,
      color: "#4B5563",
      maxWidth: 640,
      margin: "16px auto 40px auto",
      lineHeight: 1.6,
    },
    buttonsWrapper: {
      display: "flex",
      justifyContent: "center",
      gap: 24,
      flexWrap: "wrap",
      marginTop: 32,
    },
    buttonGreen: {
      backgroundColor: "#16A34A",
      color: "white",
      fontWeight: 600,
      padding: "12px 40px",
      borderRadius: 12,
      border: "none",
      boxShadow: "0 4px 6px rgba(22, 163, 74, 0.5)",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonGreenHover: {
      backgroundColor: "#15803D",
    },
    buttonBlue: {
      backgroundColor: "#2563EB",
      color: "white",
      fontWeight: 600,
      padding: "12px 40px",
      borderRadius: 12,
      border: "none",
      boxShadow: "0 4px 6px rgba(37, 99, 235, 0.5)",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonBlueHover: {
      backgroundColor: "#1D4ED8",
    },
    featuredSection: {
      backgroundColor: "#F9FAFB",
      paddingTop: 64,
      paddingBottom: 64,
      flexGrow: 1,
    },
    featuredContainer: {
      maxWidth: 1200,
      margin: "0 auto",
      paddingLeft: 24,
      paddingRight: 24,
      boxSizing: "border-box",
    },
    featuredHeading: {
      fontSize: 28,
      fontWeight: 800,
      color: "#111827",
      textAlign: "center",
      marginBottom: 48,
    },
    loadingText: {
      textAlign: "center",
      color: "#6B7280",
      fontSize: 18,
    },
    eventsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: 32,
    },
    exploreButton: {
      marginTop: 48,
      backgroundColor: "#2563EB",
      color: "white",
      fontWeight: 600,
      padding: "12px 48px",
      borderRadius: 12,
      border: "none",
      boxShadow: "0 4px 6px rgba(37, 99, 235, 0.5)",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      display: "inline-block",
    },
    exploreButtonHover: {
      backgroundColor: "#1D4ED8",
    },
  };

  const [loginHover, setLoginHover] = useState(false);
  const [registerHover, setRegisterHover] = useState(false);
  const [exploreHover, setExploreHover] = useState(false);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroContainer}>
          <TypingMessage />
          <p style={styles.heroText}>
            Discover, book, and enjoy events easily with our platform. Find the perfect experience for every occasion.
          </p>
          <div style={styles.buttonsWrapper}>
            <button
              style={{
                ...styles.buttonGreen,
                ...(loginHover ? styles.buttonGreenHover : {}),
              }}
              onMouseEnter={() => setLoginHover(true)}
              onMouseLeave={() => setLoginHover(false)}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              style={{
                ...styles.buttonBlue,
                ...(registerHover ? styles.buttonBlueHover : {}),
              }}
              onMouseEnter={() => setRegisterHover(true)}
              onMouseLeave={() => setRegisterHover(false)}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section style={styles.featuredSection}>
        <div style={styles.featuredContainer}>
          <h2 style={styles.featuredHeading}>Featured Events</h2>

          {loading ? (
            <p style={styles.loadingText}>Loading events...</p>
          ) : featuredEvents.length === 0 ? (
            <p style={styles.loadingText}>No events available.</p>
          ) : (
            <div style={styles.eventsGrid}>
              {featuredEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}

          <div style={{ textAlign: "center" }}>
            <button
              style={{
                ...styles.exploreButton,
                ...(exploreHover ? styles.exploreButtonHover : {}),
              }}
              onMouseEnter={() => setExploreHover(true)}
              onMouseLeave={() => setExploreHover(false)}
              onClick={() => navigate("/events")}
            >
              Explore All Events
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;
