import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Inventory from './components/Inventory';
import Sales from './components/Sales';
import Reports from './components/Reports';
import './App.css';

function App() {
  const [page, setPage] = useState('Dashboard');

  const renderPage = () => {
    switch(page) {
      case 'Products': return <Products />;
      case 'Inventory': return <Inventory />;
      case 'Sales': return <Sales />;
      case 'Reports': return <Reports />;
      default: return <Dashboard />;
    }
  }

  return (
    <div>
      <Navbar setPage={setPage} />
      <div className="content">{renderPage()}</div>
    </div>
  );
}

export default App;
