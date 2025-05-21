import React, { useState } from "react";
import searchIcon from "../assets/search.svg";
import phoneIcon from "../assets/Phone.svg";
import envelopeIcon from "../assets/Envelope.svg";
import { Link } from "react-router-dom";


// HoverLink component that changes style based on role
const HoverLink = ({ text, href, role }) => {
  const [hover, setHover] = useState(false);

  const hoverColors = {
    user: "#94aeb7",
    organizer: "#a772f7",
    admin: "#e74c3c",
  };

  const baseStyle = {
    color: hover ? hoverColors[role] || "#94aeb7" : "#000000",
    fontFamily: '"Roboto-Bold", Helvetica',
    fontSize: "20px",
    fontWeight: 700,
    height: "30px",
    letterSpacing: "1.60px",
    lineHeight: "30px",
    textAlign: "center",
    width: "96px",
    textDecoration: "inherit",
    transition: "color 0.5s ease",
  };

  return (
      <Link
        to={href}
        style={baseStyle}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {text}
      </Link>
    );
    
};

// Role-based links
const linksByRole = {
  user: [
    { text: "About", href: "/about" },
    { text: "Services", href: "/services" },
    { text: "Features", href: "/features" },
    { text: "Shop", href: "/shop" },
    { text: "Contact", href: "/contact" },
  ],
  organizer: [
    { text: "Dashboard", href: "/organizer/dashboard" },
    { text: "My Events", href: "/organizer/events" },
    { text: "Analytics", href: "/organizer/analytics" },
    { text: "Contact", href: "/contact" },
  ],
  admin: [
    { text: "Admin Panel", href: "/admin" },
    { text: "Users", href: "/admin/users" },
    { text: "Reports", href: "/admin/reports" },
    { text: "Settings", href: "/admin/settings" },
  ],
};

// Main Navbar component with role prop
const Navbar = ({ role = "user" }) => {
  return (
    <div>
      {/* Top Bar */}
      <div
        style={{
          backgroundColor: "#94aeb7",
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
        <div style={{ display: "flex", gap: "1rem", fontSize: "18px" }}>
          {/* right icons if needed */}
        </div>
      </div>

      {/* Spacer to prevent overlap */}
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
          top: "40px", // below top bar
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        {/* Left: Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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

        {/* Center: Links based on role */}
        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          {linksByRole[role]?.map((link) => (
            <HoverLink
              key={link.text}
              text={link.text}
              href={link.href}
              role={role}
            />
          ))}
        </div>

        {/* Right: Search + Sign in */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid black",
              background: "transparent",
              fontSize: "18px",
              position: "relative",
              padding: 0,
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
          <button
            style={{
              backgroundColor: "#0f0f1d",
              color: "#fff",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            Sign in
          </button>
        </div>
      </div>

      {/* Spacer to prevent content hiding under navbar */}
      <div style={{ height: "80px" }} />
    </div>
  );
};

export default Navbar;
