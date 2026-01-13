// src/pages/Events.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import { CartContext } from "../context/CartContext";

const Events = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const events = [
    { id: 1, title: "Tech Conference Nairobi", date: "Dec 20, 2025", venue: "KICC", price: 2500, image: "/assets/tech conference.png" },
    { id: 2, title: "Music Festival Kenya", date: "Jan 10, 2026", venue: "Ngong Racecourse", price: 1200, image: "/assets/festival.png" },
    { id: 3, title: "AI & Robotics Expo", date: "Feb 15, 2026", venue: "Sarit Expo Centre", price: 1500, image: "/assets/AI and robotics.png" },
    { id: 4, title: "Startup Pitch Day", date: "Mar 5, 2026", venue: "KICC", price: 800, image: "/assets/pitch.png" },
    { id: 5, title: "Hackathon 2026", date: "Jan 20, 2026", venue: "iHub Nairobi", price: 900, image: "/assets/hackathon.png" },
    { id: 6, title: "Earth Day Celebration", date: "Feb 10, 2026", venue: "Uhuru Park", price: 700, image: "/assets/earth day.png" },
    { id: 7, title: "Comedy Night Live", date: "Jan 13, 2026", venue: "The Alchemist", price: 1000, image: "/assets/comedy night live.png" },
    { id: 8, title: "Cultural Fest 2026", date: "Feb 3, 2026", venue: "Nairobi National Museum", price: 1200, image: "/assets/cultural day.png"},
  ];

 return (
    <div className="events-container">
      <h1>Upcoming Events</h1>
      <div className="events-grid">
        {events.map((event) => (
          <div className="event-card" key={event.id}>
            <img src={event.image} alt={event.title} />
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p className="venue">{event.venue}</p>
            <p className="price">KES {event.price}</p>
            <button onClick={() => addToCart(event)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <button
        className="go-to-cart"
        onClick={() => navigate("/cart")}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Go to Cart
      </button>
    </div>
  );
};

export default Events;