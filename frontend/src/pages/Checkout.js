import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Checkout.css";
import axios from "axios";

const Checkout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const selectedEvent = state?.selectedEvent;
  const totalAmount = state?.totalAmount || selectedEvent.reduce((sum, item) => sum + item.price, 0);

  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);




  if (!selectedEvent) {
    return <p>No event selected. Please go back to events page.</p>;
  }

  const handlePayment = async () => {
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/payment/stkpush", {
        phoneNumber: phone,
        amount: selectedEvent.price,
      });

      alert("STK Push sent! Check your phone to complete the payment.");
      navigate("/events");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="event-details">
        <img src={selectedEvent.image} alt={selectedEvent.title} />
        <h3>{selectedEvent.title}</h3>
        <p>Date: {selectedEvent.date}</p>
        <p>Venue: {selectedEvent.venue}</p>
        <p>Price: KES {selectedEvent.price}</p>
      </div>

      <div className="payment-form">
        <label>Mpesa Phone Number:</label>
        <input
          type="text"
          placeholder="2547XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : "Pay with Mpesa"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
