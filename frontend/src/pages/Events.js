// src/pages/Events.js
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Events.css";
import { CartContext } from "../context/CartContext";

const Events = () => {
  const navigate = useNavigate();
  const { addToCart, cartItems } = useContext(CartContext);

  const events = [
    { id: 1, title: "Tech Conference Nairobi", date: "Dec 20, 2025", venue: "KICC", image: "/assets/tech conference.png", price: 1000 },
    { id: 2, title: "Music Festival Kenya", date: "Jan 10, 2026", venue: "Ngong Racecourse", image: "/assets/festival.png", price: 1200 },
    { id: 3, title: "AI & Robotics Expo", date: "Feb 15, 2026", venue: "Sarit Expo Centre", image: "/assets/AI and robotics.png", price: 1500 },
    { id: 4, title: "Startup Pitch Day", date: "Mar 5, 2026", venue: "KICC", image: "/assets/pitch.png", price: 800 },
    { id: 5, title: "Hackathon 2026", date: "Jan 20, 2026", venue: "iHub Nairobi", image: "/assets/hackathon.png", price: 900 },
    { id: 6, title: "Earth Day Celebration", date: "Feb 10, 2026", venue: "Uhuru Park", image: "/assets/earth day.png", price: 700 },
    { id: 7, title: "Comedy Night Live", date: "Jan 13, 2026", venue: "The Alchemist", image: "/assets/comedy night live.png", price: 500 },
    { id: 8, title: "Cultural Fest 2026", date: "Feb 3, 2026", venue: "Nairobi National Museum", image: "/assets/cultural day.png", price: 600 },
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