// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className="nav-bubble" to="/">Dashboard</Link>
      <Link className="nav-bubble" to="/inventory">Inventory</Link>
      <Link className="nav-bubble" to="/products">Products</Link>
      <Link className="nav-bubble" to="/sales">Sales</Link>
      <Link className="nav-bubble" to="/reports">Reports</Link>
    </nav>
  );
};

export default Navbar;
