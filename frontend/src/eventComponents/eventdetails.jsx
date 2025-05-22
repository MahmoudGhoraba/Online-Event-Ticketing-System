import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../auth/AuthContext'; // Adjust path as needed

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // access logged-in user
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/events/${id}`);
        setEvent(response.data);
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

  const isOrganizer = user.role === 'Organizer';

  return (
    <div style={{ padding: 32, backgroundColor: "#F9FAFB", minHeight: "100vh" }}>
      <div style={{
        maxWidth: 800,
        margin: "auto",
        background: "#F3F4F6",
        padding: 32,
        borderRadius: 12,
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
      }}>
        <h1 style={{ fontSize: 28, fontWeight: "bold" }}>{event.title}</h1>
        <p>{event.description}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Tickets Remaining:</strong> {event.remainingTickets}</p>
        <p><strong>Total Tickets:</strong> {event.totalNumberOfTickets}</p>

        {isOrganizer && (
          <div style={{ marginTop: 24 }}>
            {isEditing ? (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  try {
                    await axios.put(`http://localhost:3000/api/v1/events/${id}`, event);
                    alert("Event updated successfully");
                    setIsEditing(false);
                  } catch (err) {
                    console.error("Update failed", err);
                    alert("Failed to update event");
                  }
                }}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <input
                  type="text"
                  value={event.title}
                  onChange={(e) => setEvent({ ...event, title: e.target.value })}
                  placeholder="Event Title"
                  style={{ padding: 8, fontSize: 16 }}
                />
                <textarea
                  value={event.description}
                  onChange={(e) => setEvent({ ...event, description: e.target.value })}
                  placeholder="Description"
                  rows={4}
                  style={{ padding: 8, fontSize: 16 }}
                />
                <input
                  type="datetime-local"
                  value={new Date(event.date).toISOString().slice(0, 16)}
                  onChange={(e) => setEvent({ ...event, date: new Date(e.target.value).toISOString() })}
                  style={{ padding: 8 }}
                />
                <input
                  type="text"
                  value={event.location}
                  onChange={(e) => setEvent({ ...event, location: e.target.value })}
                  placeholder="Location"
                  style={{ padding: 8 }}
                />
                <input
                  type="text"
                  value={event.category}
                  onChange={(e) => setEvent({ ...event, category: e.target.value })}
                  placeholder="Category"
                  style={{ padding: 8 }}
                />
                <input
                  type="number"
                  value={event.ticketPrice}
                  onChange={(e) => setEvent({ ...event, ticketPrice: parseFloat(e.target.value) })}
                  placeholder="Ticket Price"
                  style={{ padding: 8 }}
                />
                <input
                  type="number"
                  value={event.totalNumberOfTickets}
                  onChange={(e) => {
                    const newTotal = parseInt(e.target.value, 10);
                    if (isNaN(newTotal) || newTotal < 0) {
                      return;
                    }
                    const oldTotal = event.totalNumberOfTickets ?? 0;
                    const oldRemaining = event.remainingTickets ?? 0;
                    const bookedTickets = oldTotal - oldRemaining;
                    const safeBookedTickets = bookedTickets < 0 ? 0 : bookedTickets;
                    const newRemaining = newTotal - safeBookedTickets >= 0 ? newTotal - safeBookedTickets : 0;

                    setEvent({
                      ...event,
                      totalNumberOfTickets: newTotal,
                      remainingTickets: newRemaining,
                    });
                  }}
                  placeholder="Total Tickets"
                  style={{ padding: 8 }}
                />

                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    type="submit"
                    style={{
                      backgroundColor: "#10B981",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer"
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    style={{
                      backgroundColor: "#EF4444",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: 6,
                      cursor: "pointer"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    backgroundColor: "#2563EB",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                    marginRight: 12,
                  }}
                >
                  Edit Event
                </button>

                <button
                  onClick={async () => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this event? This action cannot be undone."
                      )
                    ) {
                      try {
                        await axios.delete(`http://localhost:3000/api/v1/events/${id}`);
                        alert("Event deleted successfully");
                        navigate('/organizer/users'); // Redirect to events list page
                      } catch (err) {
                        console.error("Delete failed", err);
                        alert("Failed to delete event");
                      }
                    }
                  }}
                  style={{
                    backgroundColor: "#EF4444",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: 6,
                    cursor: "pointer",
                  }}
                >
                  Delete Event
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventDetails;
