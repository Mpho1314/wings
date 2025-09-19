import React, { useEffect, useState } from "react";
import API from "../config";
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
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await API.get("/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <h3>Products</h3>
      <p>Total: {products.length}</p>
      <h3>Transactions</h3>
      <p>Total: {transactions.length}</p>
    </div>
  );
};

export default Dashboard;

