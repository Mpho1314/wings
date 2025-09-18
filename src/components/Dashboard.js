// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchTransactions();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://wings-backend-gsej.onrender.com/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("https://wings-backend-gsej.onrender.com/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = transactions.reduce((acc, t) => acc + (t.totalPrice || 0), 0);
  const totalStock = products.reduce((acc, p) => acc + (p.stock || p.quantity || 0), 0);
  const totalSales = transactions.filter(t => t.type === "out").length;

  const bestSelling = products.reduce((best, p) => {
    const soldQty = transactions.filter(t => t.productId === p.id && t.type === "out")
      .reduce((a,b) => a+b.quantity,0);
    return soldQty > (best.soldQty || 0) ? {...p, soldQty} : best;
  }, {});

  return (
    <div className="section-card">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card">Total Revenue: {totalRevenue} LSL</div>
        <div className="dashboard-card">Total Stock: {totalStock}</div>
        <div className="dashboard-card">Total Sales: {totalSales}</div>
        <div className="dashboard-card">
          Best Selling: {bestSelling.name || "N/A"}
          {bestSelling.image && (
            <img
              src={bestSelling.image}
              alt={bestSelling.name}
              className="tiny-img"
              style={{ display: "block", marginTop: "5px" }}
            />
          )}
        </div>
      </div>

      {/* Product Menu below */}
      <div className="product-menu">
        <h3>Products Menu</h3>
        <div className="products-cards">
          {products.map(p => (
            <div key={p.id} className="product-card">
              <img src={p.image} alt={p.name} />
              <p>{p.name}</p>
              <p>{p.price} LSL</p>
              <p>Stock: {p.stock || p.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
