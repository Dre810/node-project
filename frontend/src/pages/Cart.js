import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, totalAmount, clearCart } =
    useContext(CartContext);

  if (cartItems.length === 0)
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate("/events")}>Back to Events</button>
      </div>
    );

  const handleCheckout = () => {
    navigate("/checkout", { state: { selectedEvent: cartItems, totalAmount } });
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.map((item) => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.title} />
          <div>
            <h3>{item.title}</h3>
            <p>Date: {item.date}</p>
            <p>Venue: {item.venue}</p>
            <p>Price: KES {item.price}</p>
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </div>
        </div>
      ))}
      <h3>Total: KES {totalAmount}</h3>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
      <button onClick={clearCart} style={{ marginLeft: "10px" }}>
        Clear Cart
      </button>
    </div>
  );
};

export default Cart;
