import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* LEFT - Logo */}
      <div className="navbar-logo">
        <Link to="/">SmartEvent</Link>
      </div>

      {/* HAMBURGER ICON */}
      <div
        className={`menu-icon ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* CENTER - Links */}
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      {/* RIGHT - Auth Buttons */}
      <div className={`navbar-right ${menuOpen ? "open" : ""}`}>
        <button className="btn-login">
          <Link to="/login">Login</Link>
        </button>
        <button className="btn-register">
          <Link to="/register">Register</Link>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
