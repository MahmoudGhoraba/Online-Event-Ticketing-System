import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.svg";
import phoneIcon from "../assets/Phone.svg";
import envelopeIcon from "../assets/Envelope.svg";
import { useAuth } from "../auth/AuthContext";

// HoverLink component using navigate
const HoverLink = ({ text, href, role }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const hoverColors = {
    user: "#94aeb7",
    organizer: "#a772f7",
    admin: "#e74c3c",
  };

  const baseStyle = {
    cursor: "pointer",
    color: hover ? hoverColors[role] || "#94aeb7" : "#000000",
    fontFamily: '"Roboto-Bold", Helvetica',
    fontSize: "20px",
    fontWeight: 700,
    height: "30px",
    letterSpacing: "1.60px",
    lineHeight: "30px",
    textAlign: "center",
    width: "96px",
    textDecoration: "none",
    transition: "color 0.5s ease",
  };

  return (
    <span
      style={baseStyle}
      onClick={() => navigate(href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {text}
    </span>
  );
};

// Role-based links
const linksByRole = {
  null:[],
  home: [
    { text: "Login", href: "/login" },
    { text: "Register", href: "/register" }
  ],
  User: [
    { text: "Home", href: "/" },
    { text: "Profile", href: "/profile" },
    { text: "Bookings", href: "/bookings" }, // removed extra spac
    
  ],
  Organizer: [
    { text: "Home", href: "/" },
    { text: "Profile", href: "/profile" },
    { text: "Events", href: "/my-events" },
    { text: "Analytics", href: "/my-events/analytics" },
  ],
  Admin: [
    { text: "Home", href: "/" },
    { text: "Profile", href: "/profile" },
    { text: "Users", href: "/admin/users" },
    { text: "Events", href: "/admin/events" },
  ],
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = async () => {
  try {
    await logout();
    navigate("/"); // React-router style navigation
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          background: "linear-gradient(to bottom right, #faf5ff, #ffe4e6, #ffedd5)",
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 2rem",
          fontSize: "14px",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            color: "rgba(12, 12, 30, 1)",
            fontFamily: '"Roboto", Helvetica',
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: 500,
            letterSpacing: "0px",
            lineHeight: "150%",
            whiteSpace: "nowrap",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <img
              src={phoneIcon}
              alt="Phone icon"
              style={{ height: "16px", width: "16px" }}
            />
            <span style={{ fontWeight: "bold" }}>+20 102 086 5020</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <img
              src={envelopeIcon}
              alt="Email icon"
              style={{ height: "16px", width: "16px" }}
            />
            <span style={{ fontWeight: "bold" }}>
              mahmoud.ghoraba2005@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "40px" }} />

      {/* Main Navbar */}
      <div
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem 2rem",
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          position: "fixed",
          top: "40px",
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }} onClick={() => navigate('/')}>
          <span style={{ fontSize: "24px" }}>🎟️</span>
          <h2
            style={{
              color: "#000000",
              fontFamily: '"Roboto-Bold", Helvetica, sans-serif',
              fontSize: "24px",
              fontWeight: "bold",
              letterSpacing: 0,
              lineHeight: "normal",
              margin: 0,
            }}
          >
            Spaghetti's
          </h2>
        </div>

        {/* Role-based Links */}
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
        {(linksByRole[user?.role] || linksByRole[null]).map((link) => (
            <HoverLink
              key={link.text}
              text={link.text}
              href={link.href}
              role={user?.role}
            />
          ))}
        </div>

        {/* Right: Search and Sign in */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center",
            position: "relative",
            transition: "all 0.3s ease"
          }}>
            {isSearchOpen && (
              <form onSubmit={handleSearch} style={{
                position: "absolute",
                right: "100%",
                marginRight: "10px",
                animation: "slideIn 0.3s ease"
              }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  style={{
                    padding: "8px 12px",
                    border: "2px solid black",
                    borderRadius: "20px",
                    fontSize: "16px",
                    width: "200px",
                    outline: "none",
                    transition: "all 0.3s ease"
                  }}
                  autoFocus
                />
              </form>
            )}
            <button
              onClick={() => {
                if (isSearchOpen && searchQuery) {
                  handleSearch({ preventDefault: () => {} });
                } else {
                  setIsSearchOpen(!isSearchOpen);
                }
              }}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "2px solid black",
                background: isSearchOpen ? "#f0f0f0" : "transparent",
                fontSize: "18px",
                position: "relative",
                padding: 0,
                cursor: "pointer",
                transition: "all 0.3s ease"
              }}
            >
              <img
                src={searchIcon}
                alt="Search"
                style={{
                  height: "9px",
                  left: "15px",
                  position: "absolute",
                  top: "15px",
                  width: "8px",
                }}
              />
            </button>
          </div>
          {user ? (
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#e74c3c",
                color: "#fff",
                padding: "0.5rem 1rem",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              Logout
            </button>
          ) : (
            <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
              {(linksByRole['home']).map((link) => (
                <HoverLink
                  key={link.text}
                  text={link.text}
                  href={link.href}
                  role={'home'}
                />
              ))}
        </div>
          )}
        </div>
      </div>

      {/* Bottom Spacer */}
      <div style={{ height: "80px" }} />
    </div>
  );
};

export default Navbar;