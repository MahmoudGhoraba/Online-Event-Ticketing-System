import React, { useState } from "react";
import axios from "axios";
function OrganizerCreateEvent(){

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    category: "",
    ticketPrice: "",
    remainingTickets: "",
    totalNumberOfTickets: "",
    Organizer: "", // probably a user id string
    status: "pending", // default to pending
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Update form values on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // Adjust the URL to your actual backend endpoint for creating an event
      const response = await axios.post("http://localhost:3000/api/v1/events", {
        ...formData,
        ticketPrice: Number(formData.ticketPrice),
        remainingTickets: Number(formData.remainingTickets),
        totalNumberOfTickets: Number(formData.totalNumberOfTickets),
        date: new Date(formData.date).toISOString(),
      });
      setSuccess("Event created successfully!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        category: "",
        ticketPrice: "",
        remainingTickets: "",
        totalNumberOfTickets: "",
        status: "pending",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "20px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>

        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Date and Time:
          <input
            type="datetime-local"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleChange}
            min="0"
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Remaining Tickets:
          <input
            type="number"
            name="remainingTickets"
            value={formData.remainingTickets}
            onChange={handleChange}
            min="0"
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

        <label>
          Total Number Of Tickets:
          <input
            type="number"
            name="totalNumberOfTickets"
            value={formData.totalNumberOfTickets}
            onChange={handleChange}
            min="0"
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>

       
        {/* Status is fixed to pending */}
        <input type="hidden" name="status" value={formData.status} />

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: "#2563EB",
            color: "white",
            padding: "12px 24px",
            borderRadius: 6,
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}
      {success && <p style={{ color: "green", marginTop: 12 }}>{success}</p>}
    </div>
  );
}

export default OrganizerCreateEvent;
