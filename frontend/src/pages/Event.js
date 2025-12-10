import React from "react";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  // Protect page
  if (!userInfo) {
    navigate("/login");
    return null;
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Events Page</h1>
      <p>Here you can browse and book events!</p>
    </div>
  );
};

export default Events;
