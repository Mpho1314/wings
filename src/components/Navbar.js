import React from 'react';

const Navbar = ({ setPage }) => {
  return (
    <nav className="navbar">
      <ul>
        <li onClick={() => setPage('Dashboard')}>Dashboard</li>
        <li onClick={() => setPage('Products')}>Products</li>
        <li onClick={() => setPage('Inventory')}>Inventory</li>
        <li onClick={() => setPage('Sales')}>Sales</li>
        <li onClick={() => setPage('Reports')}>Reports</li>
      </ul>
    </nav>
  );
};

export default Navbar;
