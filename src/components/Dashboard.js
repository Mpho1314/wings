import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../theme.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchData = async () => {
    try {
      const [prodRes, transRes] = await Promise.all([
        axios.get(`${API_URL}/products`),
        axios.get(`${API_URL}/transactions`),
      ]);
      setProducts(prodRes.data);
      setTransactions(transRes.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Pick 6 random menu items
  const randomMenu = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  // Best Selling Product
  const salesOnly = transactions.filter((t) => t.type === "out");
  const productSales = {};
  salesOnly.forEach((t) => {
    productSales[t.productName] = (productSales[t.productName] || 0) + t.quantity;
  });
  const bestSelling = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

  // Totals
  const totalRevenue = salesOnly.reduce(
    (sum, t) => sum + t.quantity * t.price,
    0
  );
  const totalSales = salesOnly.length;
  const totalStock = products.reduce((sum, p) => sum + (p.stock || 0), 0);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      {/* Summary Cards */}
      <div className="summary-cards small-cards">
        <div className="card bubbly">
          <h3>Total Revenue</h3>
          <p>LSL {totalRevenue.toFixed(2)}</p>
        </div>
        <div className="card bubbly">
          <h3>Total Sales</h3>
          <p>{totalSales}</p>
        </div>
        <div className="card bubbly">
          <h3>Total Stock</h3>
          <p>{totalStock}</p>
        </div>
        <div className="card bubbly">
          <h3>Best Seller</h3>
          <p>
            {bestSelling
              ? `${bestSelling[0]} — ${bestSelling[1]} sold`
              : "No sales yet"}
          </p>
        </div>
      </div>

      {/* Random Menu as Cards */}
      <h3>Today’s Menu</h3>
      <div className="card-container">
        {randomMenu.map((p) => (
          <div key={p.id} className="card bubbly">
            <h4>{p.name}</h4>
            <p>Price: LSL {Number(p.price).toFixed(2)}</p>
            <p>Qty: {p.stock}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
