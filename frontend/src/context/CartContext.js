import React, { createContext, useState } from "react";

// Create context
export const CartContext = createContext();

// Provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add event to cart
  const addToCart = (event) => {
    // Prevent duplicates
    const exists = cartItems.find(item => item.id === event.id);
    if (!exists) {
      setCartItems([...cartItems, event]);
    }
  };

  // Remove event from cart
  const removeFromCart = (eventId) => {
    setCartItems(cartItems.filter(item => item.id !== eventId));
  };

  // Clear cart
  const clearCart = () => setCartItems([]);

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalAmount }}>
      {children}
    </CartContext.Provider>
  );
};
