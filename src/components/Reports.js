import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../theme.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_URL}/transactions`);
      setTransactions(res.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Calculate totals
  const totalIn = transactions
    .filter((t) => t.type === "in")
    .reduce((sum, t) => sum + t.quantity * t.price, 0);

  const totalOut = transactions
    .filter((t) => t.type === "out")
    .reduce((sum, t) => sum + t.quantity * t.price, 0);

  // Best Selling Product
  const salesOnly = transactions.filter((t) => t.type === "out");
  const productSales = {};
  salesOnly.forEach((t) => {
    productSales[t.productName] = (productSales[t.productName] || 0) + t.quantity;
  });

  const bestSelling = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="reports">
      <h2>Reports</h2>

      <div className="summary-cards small-cards">
        <div className="card bubbly">
          <h3>Money In</h3>
          <p>LSL {totalIn.toFixed(2)}</p>
        </div>
        <div className="card bubbly">
          <h3>Money Out</h3>
          <p>LSL {totalOut.toFixed(2)}</p>
        </div>
        <div className="card bubbly">
          <h3>Best Seller</h3>
          <p>{bestSelling ? `${bestSelling[0]} (${bestSelling[1]} sold)` : "No sales yet"}</p>
        </div>
      </div>

      <h3>Transactions</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price (LSL)</th>
            <th>Total (LSL)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t, index) => (
            <tr key={index}>
              <td>{t.type === "in" ? "Stock In" : "Sale"}</td>
              <td>{t.productName}</td>
              <td>{t.quantity}</td>
              <td>{Number(t.price).toFixed(2)}</td>
              <td>{(t.quantity * t.price).toFixed(2)}</td>
              <td>{new Date(t.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
