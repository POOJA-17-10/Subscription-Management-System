import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#198754", color: "white" }}>
      <h2>SMS App</h2>
      <ul style={{ listStyle: "none", display: "flex", gap: "15px" }}>
        <li><Link to="/" style={{ color: "white", textDecoration: "none" }}>Home</Link></li>
        <li><Link to="/about" style={{ color: "white", textDecoration: "none" }}>About</Link></li>
        <li><Link to="/my-subscriptions" style={{ color: "white", textDecoration: "none" }}>My Subscriptions</Link></li>
        <li><Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;