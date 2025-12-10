import React from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Landing.css";


const Landing = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem("userInfo");

  return (
    <div
      className="landing-container"
    >
      <div className="overlay">
        <h1>Welcome to Smart Event Booking System</h1>
        <p>Book tickets for your favorite events easily!</p>
        <div className="buttons">
          {!userInfo ? (
            <>
              <button onClick={() => navigate("/login")}>Login</button>
              <button onClick={() => navigate("/register")}>Register</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/events")}>Explore Events</button>
              <button onClick={() => { localStorage.removeItem("userInfo"); navigate("/"); }}>Logout</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
