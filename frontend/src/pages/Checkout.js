import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, total, clearCart } = useContext(CartContext);
  const [phone, setPhone] = useState("0757090860"); // default to your number
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    if (!phone) return alert("Please enter your phone number");
    setLoading(true);
    setMessage("");

    try {
      const formattedPhone =
        phone.startsWith("0") ? "254" + phone.slice(1) : phone;

      const response = await axios.post(
        "http://localhost:5000/api/payment/stkpush",
        { amount: total, phoneNumber: formattedPhone }
      );

      console.log("STK Push response:", response.data);

      // Inform user to check their phone
      setMessage(
        "Payment request sent! Please check your phone and enter your PIN."
      );

      // Optionally, poll backend or wait for callback to confirm success
      // For demo, we'll simulate a successful payment after a few seconds
      setTimeout(() => {
        setMessage("Payment successful! Your tickets are confirmed.");
        clearCart(); // empty the cart after successful payment
      }, 15000); // 15 seconds demo

    } catch (error) {
      console.error(error.response?.data || error.message);
      setMessage("Payment failed. Check console for details.");
    }

    setLoading(false);
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.title} - KES {item.price}
              </li>
            ))}
          </ul>
          <p>Total: KES {total}</p>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />

          <button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Pay with M-Pesa"}
          </button>

          {message && <p className="payment-message">{message}</p>}
        </>
      )}
    </div>
  );
};

export default Checkout;
