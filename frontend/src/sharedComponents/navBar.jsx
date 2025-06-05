import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../assets/search.svg";
import phoneIcon from "../assets/Phone.svg";
import envelopeIcon from "../assets/Envelope.svg";
import { useAuth } from "../auth/AuthContext";
import { useTheme } from "../theme/ThemeContext";
import "../theme/darkMode.css";

// HoverLink component using navigate
const HoverLink = ({ text, href, role }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const hoverColors = {
    user: "#94aeb7",
    organizer: "#a772f7",
    admin: "#e74c3c",
  };

  const baseStyle = {
    cursor: "pointer",
    color: hover ? hoverColors[role] || "#94aeb7" : isDarkMode ? "var(--text-dark)" : "var(--text-light)",
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

// Language options
const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'ar', name: 'العربية' }
];

// Mock notifications - In a real app, these would come from your backend
const mockNotifications = [
  { id: 1, type: 'event', message: 'New event in your area!', time: '2 hours ago' },
  { id: 2, type: 'booking', message: 'Your booking was confirmed', time: '1 day ago' },
  { id: 3, type: 'system', message: 'Welcome to our platform!', time: '2 days ago' }
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);

  // Close all dropdowns except the one being opened
  const handleDropdownToggle = (dropdownName) => {
    if (dropdownName === 'profile') {
      setShowDropdown(!showDropdown);
      setShowNotifications(false);
      setShowLanguageMenu(false);
      setShowSearchHistory(false);
    } else if (dropdownName === 'notifications') {
      setShowNotifications(!showNotifications);
      setShowDropdown(false);
      setShowLanguageMenu(false);
      setShowSearchHistory(false);
    } else if (dropdownName === 'language') {
      setShowLanguageMenu(!showLanguageMenu);
      setShowDropdown(false);
      setShowNotifications(false);
      setShowSearchHistory(false);
    }
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container')) {
        setShowDropdown(false);
        setShowNotifications(false);
        setShowLanguageMenu(false);
        setShowSearchHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      setShowDropdown(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Handle search with history
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchHistory(prev => [searchQuery, ...prev.slice(0, 4)]);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setShowSearchHistory(false);
    }
  };

  // Quick create event function for organizers
  const handleQuickCreateEvent = () => {
    navigate('/my-events/new');
  };

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode);
    setShowLanguageMenu(false);
    // In a real app, you would implement actual language switching logic here
  };

  const getNavigationItems = () => {
    if (!user) return [];

    const commonItems = [
      { icon: '👤', text: 'Profile', onClick: () => navigate('/profile') },
      { icon: '🔍', text: 'Search Events', onClick: () => navigate('/search') },
    ];

    const roleSpecificItems = {
      User: [
        { icon: '🎫', text: 'My Bookings', onClick: () => navigate('/bookings') },
        { icon: '📅', text: 'Available Events', onClick: () => navigate('/user-events') },
      ],
      Organizer: [
        { icon: '📅', text: 'My Events', onClick: () => navigate('/my-events') },
        { icon: '📊', text: 'Analytics', onClick: () => navigate('/my-events/analytics') },
        { icon: '➕', text: 'Create Event', onClick: () => navigate('/my-events/new') },
      ],
      Admin: [
        { icon: '👥', text: 'Manage Users', onClick: () => navigate('/admin/users') },
        { icon: '🎪', text: 'Manage Events', onClick: () => navigate('/admin/events') },
      ],
    };

    return [...commonItems, ...(roleSpecificItems[user.role] || [])];
  };

  return (
    <div>
      {/* Top Bar */}
      <div style={{
        background: isDarkMode 
          ? "linear-gradient(to right, var(--bg-dark), #2c2c2c,rgb(30, 30, 30))"
          : "linear-gradient(to bottom right, #faf5ff, #ffe4e6, #ffedd5)",
        color: isDarkMode ? "var(--text-dark)" : "rgba(12, 12, 30, 1)",
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
        height: "40px",
        boxSizing: "border-box",
      }}>
        <div
          style={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <img
              src={phoneIcon}
              alt="Phone icon"
              style={{ 
                height: "16px", 
                width: "16px",
                filter: isDarkMode ? "brightness(0) invert(1)" : "none"
              }}
            />
            <span style={{ 
              fontWeight: "bold",
              color: isDarkMode ? "#ffffff" : "#000000"
            }}>+20 102 086 5020</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
            <img
              src={envelopeIcon}
              alt="Email icon"
              style={{ 
                height: "16px", 
                width: "16px",
                filter: isDarkMode ? "brightness(0) invert(1)" : "none"
              }}
            />
            <span style={{ 
              fontWeight: "bold",
              color: isDarkMode ? "#ffffff" : "#000000"
            }}>mahmoud.ghoraba2005@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: "40px" }} />

      {/* Main Navbar */}
      <div style={{
        backgroundColor: isDarkMode ? "var(--bg-dark)" : "#fff",
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
        borderTop: isDarkMode ? "1px solid var(--border-dark)" : "none",
      }}>
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer"
          }}
          onClick={() => navigate('/')}
        >
          <span style={{ fontSize: "24px" }}>🎟️</span>
          <h2
            style={{
              color: isDarkMode ? "var(--text-dark)" : "#000000",
              fontFamily: '"Roboto-Bold", Helvetica, sans-serif',
              fontSize: "24px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            Spaghetti's
          </h2>
        </div>

        {/* Right Section: Search, Notifications, Language, Profile */}
        <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }} className="dropdown-container">
          {/* Search Section */}
          <div style={{ position: "relative" }}>
            {isSearchOpen ? (
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => { 
                    setSearchQuery(e.target.value);
                    setShowSearchHistory(true);
                  }}
                  onFocus={() => setShowSearchHistory(true)}
                  placeholder="Search events..."
                  style={{
                    padding: "8px 12px",
                    paddingRight: "40px",
                    border: `2px solid ${isDarkMode ? "var(--border-dark)" : "#000"}`,
                    borderRadius: "20px",
                    fontSize: "16px",
                    width: "250px",
                    outline: "none",
                    backgroundColor: isDarkMode ? "var(--bg-dark)" : "var(--bg-light)",
                    color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                  }}
                  autoFocus
                />
                <button
                  onClick={() => {
                    if (searchQuery.trim()) {
                      handleSearch({ preventDefault: () => {} });
                    }
                  }}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  🔍
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: `2px solid ${isDarkMode ? "var(--border-dark)" : "#000"}`,
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                }}
              >
                🔍
              </button>
            )}
            {/* Search History Dropdown */}
            {showSearchHistory && searchHistory.length > 0 && (
              <div style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                marginTop: "4px",
                backgroundColor: isDarkMode ? "var(--bg-dark)" : "white",
                border: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
              }}>
                {searchHistory.map((query, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchQuery(query);
                      setShowSearchHistory(false);
                      handleSearch({ preventDefault: () => {} });
                    }}
                    style={{
                      padding: "8px 12px",
                      cursor: "pointer",
                      borderBottom: index !== searchHistory.length - 1 
                        ? `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}` 
                        : "none",
                      color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    {query}
                  </div>
                ))}
              </div>
            )}
          </div>

          {user && (
            <>
              {/* Notifications */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => handleDropdownToggle('notifications')}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: `2px solid ${isDarkMode ? "var(--border-dark)" : "#000"}`,
                    background: showNotifications ? (isDarkMode ? "var(--hover-dark)" : "#f3f4f6") : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                  }}
                >
                  🔔
                </button>
                {showNotifications && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: isDarkMode ? "var(--bg-dark)" : "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                    width: "300px",
                    zIndex: 1000,
                  }}>
                    <div style={{
                      padding: "12px",
                      borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                      fontWeight: "bold",
                      color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                    }}>
                      Notifications
                    </div>
                    {mockNotifications.map(notification => (
                      <div
                        key={notification.id}
                        style={{
                          padding: "12px",
                          borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                          cursor: "pointer",
                          color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        <div style={{ fontWeight: "500" }}>{notification.message}</div>
                        <div style={{ 
                          fontSize: "12px", 
                          color: isDarkMode ? "var(--text-secondary-dark)" : "var(--text-secondary-light)", 
                          marginTop: "4px" 
                        }}>
                          {notification.time}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Language Selector */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => handleDropdownToggle('language')}
                  style={{
                    height: "40px",
                    padding: "0 12px",
                    borderRadius: "20px",
                    border: `2px solid ${isDarkMode ? "var(--border-dark)" : "#000"}`,
                    background: showLanguageMenu ? (isDarkMode ? "var(--hover-dark)" : "#f3f4f6") : "transparent",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                  }}
                >
                  <span>🌐</span>
                  <span>{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                </button>
                {showLanguageMenu && (
                  <div style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    marginTop: "8px",
                    backgroundColor: isDarkMode ? "var(--bg-dark)" : "white",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    border: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                    zIndex: 1000,
                    minWidth: "150px",
                  }}>
                    {languages.map(lang => (
                      <div
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        style={{
                          padding: "10px 16px",
                          cursor: "pointer",
                          borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                          color: currentLanguage === lang.code 
                            ? "#4CAF50" 
                            : isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                      >
                        {lang.name}
                        {currentLanguage === lang.code && <span style={{ marginLeft: "auto" }}>✓</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* User Profile Section */}
          {user ? (
            <div style={{ position: "relative" }}>
              <button
                onClick={() => handleDropdownToggle('profile')}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                  padding: "0.5rem",
                  borderRadius: "8px",
                  border: "none",
                  background: showDropdown ? (isDarkMode ? "var(--hover-dark)" : "#f3f4f6") : "transparent",
                }}
              >
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: `2px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                }}>
                  <img
                    src={user.profilePicture || "https://via.placeholder.com/40"}
                    alt="Profile"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>
                <span style={{
                  color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                  fontFamily: '"Roboto-Bold", Helvetica',
                  fontSize: "16px",
                  fontWeight: 600,
                }}>
                  {user.name}
                </span>
              </button>

              {showDropdown && (
                <div style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  marginTop: "8px",
                  backgroundColor: isDarkMode ? "var(--bg-dark)" : "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  border: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                  zIndex: 1000,
                  minWidth: "220px",
                }}>
                  {/* User Info Section */}
                  <div style={{
                    padding: "16px",
                    borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                  }}>
                    <div style={{
                      color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                      fontSize: "14px",
                      marginBottom: "4px",
                    }}>
                      Signed in as
                    </div>
                    <div style={{
                      color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}>
                      {user.email}
                    </div>
                  </div>

                  {/* Navigation Items */}
                  {getNavigationItems().map((item, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        item.onClick();
                        setShowDropdown(false);
                      }}
                      style={{
                        padding: "10px 16px",
                        cursor: "pointer",
                        borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                        color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                    >
                      <span>{item.icon}</span>
                      {item.text}
                    </div>
                  ))}

                  {/* Theme Toggle */}
                  <div
                    onClick={() => {
                      toggleDarkMode();
                      setShowDropdown(false);
                    }}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      borderBottom: `1px solid ${isDarkMode ? "var(--border-dark)" : "#e2e8f0"}`,
                      color: isDarkMode ? "var(--text-dark)" : "var(--text-light)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <span>{isDarkMode ? "🌙" : "☀️"}</span>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                  </div>

                  {/* Logout */}
                  <div
                    onClick={handleLogout}
                    style={{
                      padding: "10px 16px",
                      cursor: "pointer",
                      color: "#e74c3c",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkMode ? "var(--hover-dark)" : "#f3f4f6"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
                  >
                    <span>🚪</span>
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <button
                onClick={toggleDarkMode}
                style={{
                  padding: "8px",
                  borderRadius: "50%",
                  border: `2px solid ${isDarkMode ? "var(--dark-border)" : "#000"}`,
                  background: "transparent",
                  cursor: "pointer",
                  color: isDarkMode ? "var(--dark-text)" : "var(--text-light)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDarkMode ? "var(--dark-hover)" : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
              <button
                onClick={() => navigate('/login')}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: `2px solid ${isDarkMode ? "var(--dark-border)" : "#000"}`,
                  background: "transparent",
                  cursor: "pointer",
                  color: isDarkMode ? "var(--dark-text)" : "var(--text-light)",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDarkMode ? "var(--dark-hover)" : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: `2px solid ${isDarkMode ? "var(--dark-border)" : "#000"}`,
                  background: "transparent",
                  cursor: "pointer",
                  color: isDarkMode ? "var(--dark-text)" : "var(--text-light)",
                  fontWeight: "bold",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = isDarkMode ? "var(--dark-hover)" : "#f3f4f6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                Register
              </button>
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