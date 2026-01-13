import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "../pages/Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  const payWithPaystack = () => {
    const handler = window.PaystackPop.setup({
      key: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
      email: "customer@example.com",
      amount: total * 100, // kobo
      currency: "KES",
      callback: function (response) {
        alert("Payment successful!");
        clearCart();
        navigate("/events");
      },
      onClose: function () {
        alert("Payment cancelled");
      },
    });

    handler.openIframe();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {cartItems.map((item) => (
        <div key={item.id} className="checkout-item">
          <span>{item.title}</span>
          <span>KES {item.price}</span>
        </div>
      ))}

      <h3>Total: KES {total}</h3>

      <button onClick={payWithPaystack}>Pay with Paystack</button>
    </div>
  );
};

export default Checkout;
