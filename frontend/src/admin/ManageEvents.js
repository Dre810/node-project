import React, { useState } from "react";

const ManageEvents = () => {
  const [events, setEvents] = useState([
    { id: 1, title: "Tech Conference", price: 3000, venue: "KICC" }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: "",
    venue: "",
    price: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEvent = () => {
    setEvents([...events, { ...form, id: Date.now() }]);
    setForm({ title: "", venue: "", price: "", image: "" });
    setShowModal(false);
  };

  return (
    <div>
      <h1>Manage Events</h1>
      <button onClick={() => setShowModal(true)}>+ Add Event</button>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Event</th>
            <th>Venue</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td>{event.title}</td>
              <td>{event.venue}</td>
              <td>KES {event.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Create Event</h2>

            <input name="title" placeholder="Event Title" onChange={handleChange} />
            <input name="venue" placeholder="Venue" onChange={handleChange} />
            <input name="price" placeholder="Price" onChange={handleChange} />
            <input name="image" placeholder="Image URL" onChange={handleChange} />

            <div className="modal-actions">
              <button onClick={addEvent}>Save</button>
              <button className="danger" onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEvents;
