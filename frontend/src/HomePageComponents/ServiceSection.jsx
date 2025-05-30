import React from 'react';
import './service.css';
import { CalendarCheck, Ticket, Users, Settings } from 'lucide-react';
import { useTheme } from '../theme/ThemeContext';

export default function ServiceSection() {
  const { isDarkMode } = useTheme();

  const services = [
    {
      icon: <CalendarCheck className="service-icon-svg" />,
      title: "Curated Events",
      description: "Explore hand-picked concerts, sports, and shows tailored to your interests.",
      bgColor: isDarkMode ? "bg-dark-800" : "bg-blue-50",
      iconBg: isDarkMode ? "bg-dark-700" : "bg-blue-100"
    },
    {
      icon: <Ticket className="service-icon-svg" />,
      title: "Instant Tickets",
      description: "Book your seat instantly with our secure and fast ticketing system.",
      bgColor: isDarkMode ? "bg-dark-900" : "bg-white",
      iconBg: isDarkMode ? "bg-dark-700" : "bg-orange-100",
    },
    {
      icon: <Users className="service-icon-svg" />,
      title: "Group Discounts",
      description: "Planning with friends? Enjoy special rates for group bookings.",
      bgColor: isDarkMode ? "bg-dark-800" : "bg-gray-50",
      iconBg: isDarkMode ? "bg-dark-700" : "bg-gray-100"
    },
    {
      icon: <Settings className="service-icon-svg" />,
      title: "Custom Alerts",
      description: "Get notified for upcoming events based on your preferences.",
      bgColor: isDarkMode ? "bg-dark-900" : "bg-blue-50",
      iconBg: isDarkMode ? "bg-dark-700" : "bg-blue-100"
    }
  ];

  return (
    <div className={`services-section ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="section-divider"></div>

      {/* Background decorative elements */}
      <div className="background-icons">
        <div style={{ top: '2rem', right: '3rem', color: '#fdba74', opacity: 0.6 }}>+</div>
        <div style={{ top: '8rem', right: '6rem', color: '#fdba74', opacity: 0.4 }}>+</div>
        <div style={{ top: '5rem', right: '16rem', color: '#c084fc', opacity: 0.5 }}>+</div>
        <div style={{ bottom: '8rem', left: '4rem', color: '#93c5fd', opacity: 0.4 }}>+</div>
      </div>

      <div className="decorative-shapes">
        <div style={{ bottom: 430, left: 1170, width: '8rem', height: '8rem', backgroundColor: '#fdba74', borderTopLeftRadius: '50%', borderTopRightRadius: '50%' ,borderBottomRightRadius: '50%' ,opacity: 0.3, transform: 'translateX(-4rem)' }}></div>
        <div style={{ top: '5rem', left: '2rem', width: '1rem', height: '1rem', backgroundColor: '#c084fc', borderRadius: '50%', opacity: 0.4 }}></div>
        <div style={{ bottom: '10rem', right: '5rem', width: '1.5rem', height: '1.5rem', backgroundColor: '#93c5fd', borderRadius: '50%', opacity: 0.3 }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="header">
          <div className="category">Our Services</div>
          <h2 className="title">What We Offer</h2>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card ${service.bgColor} shadow`}
            >
              <div className={`service-icon ${service.iconBg}`}>
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-hover-dot"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
