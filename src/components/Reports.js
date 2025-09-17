// Reports.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5001/transactions");
        setTransactions(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="section-card">
      <h2>Reports</h2>
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
