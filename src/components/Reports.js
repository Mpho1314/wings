// Reports.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transRes = await axios.get("https://wings-backend-gsej.onrender.com/transactions");
        setTransactions(transRes.data);

        const prodRes = await axios.get("https://wings-backend-gsej.onrender.com/products");
        setProducts(prodRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Calculations for totals
  const totalRevenue = transactions.reduce((acc, t) => acc + (t.totalPrice || 0), 0);
  const totalStock = products.reduce((acc, p) => acc + (p.stock || p.quantity || 0), 0);
  const totalSalesMoney = transactions
    .filter(t => t.type === "out")
    .reduce((acc, t) => acc + (t.totalPrice || 0), 0);

  const bestSellingProduct = products.reduce((best, p) => {
    const soldQty = transactions
      .filter(t => t.productId === p.id && t.type === "out")
      .reduce((a,b) => a+b.quantity, 0);
    return soldQty > (best.soldQty || 0) ? {...p, soldQty} : best;
  }, {});

  return (
    <div className="section-card">
      <h2>Reports</h2>

      {/* Totals */}
      <div className="dashboard-cards" style={{ marginBottom: "15px" }}>
        <div className="dashboard-card">Total Revenue: {totalRevenue} LSL</div>
        <div className="dashboard-card">Total Stock: {totalStock}</div>
        <div className="dashboard-card">Total Sales Money: {totalSalesMoney} LSL</div>
      </div>

      {/* Best-selling product */}
      {bestSellingProduct.name && (
        <div className="dashboard-card" style={{ marginBottom: "15px" }}>
          <strong>Best Selling Product:</strong> {bestSellingProduct.name}
          {bestSellingProduct.image && (
            <img
              src={bestSellingProduct.image}
              alt={bestSellingProduct.name}
              className="tiny-img"
              style={{ display: "block", marginTop: "5px" }}
            />
          )}
        </div>
      )}

      <div className="reports-cards">
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div key={t.id} className="report-card">
              <p><strong>Product:</strong> {t.productName}</p>
              <p><strong>Quantity:</strong> {t.quantity}</p>
              <p><strong>Total Price:</strong> {t.totalPrice} LSL</p>
              <p><strong>Date:</strong> {new Date(t.date).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No transactions available</p>
        )}
      </div>
    </div>
  );
};

export default Reports;
