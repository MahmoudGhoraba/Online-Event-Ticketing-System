import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext';
import EventList from '../eventComponents/EventList';
import { useLocation } from 'react-router-dom';
import Navbar from './navBar';
import Footer from './Footer';

const SearchedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchEvents = async () => {
      if (!searchQuery) {
        setEvents([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let endpoint = '/api/v1/events'; // Default endpoint for users and non-logged in users

        if (user) {
          if (user.role === 'Organizer') {
            endpoint = '/api/v1/users/events';
          } else if (user.role === 'Admin') {
            endpoint = '/api/v1/events/all';
          }
        }

        const response = await axios.get(`http://localhost:3000${endpoint}`);
        console.log(response.data.events);
        // Filter events by title
        const filteredEvents = response.data.events.filter(event => 
          event.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        
        setEvents(filteredEvents);
        setError(null);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError('Failed to fetch events. Please try again later.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery, user]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Searching for events...</p>
        </div>
      );
    }

    if (error) {
      return <div className="error">{error}</div>;
    }

    if (!searchQuery) {
      return <div className="no-search">Enter a search term to find events</div>;
    }

    if (events.length === 0) {
      return (
        <div className="no-results">
          <p>No events found matching "{searchQuery}"</p>
          <small>Try using different keywords or check your spelling</small>
        </div>
      );
    }

    return (
      <div className="searched-events-container">
        <h2>Search Results for "{searchQuery}"</h2>
        <p className="results-count">{events.length} event{events.length !== 1 ? 's' : ''} found</p>
        <EventList events={events} />
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {renderContent()}
      <Footer />
    </>
  );
};

export default SearchedEvents;
