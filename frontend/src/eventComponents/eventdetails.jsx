import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function EventDetails() {
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("in the rifht comp")
        const response = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
        setEvent(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Failed to fetch event:', err);
        setError('Could not load event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;
  if (!event) return <p>No event found.</p>;

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {event.date}</p>
      <p><strong>Location:</strong> {event.location}</p>
      {/* Add any other fields you expect from your API */}

      <button>
        Book Now!
      </button>
    </div>
  );
}

export default EventDetails;
