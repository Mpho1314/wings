import React, { useEffect, useState } from "react";
import API from "../config";
import "../App.css";

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const transRes = await API.get("/transactions");
        setTransactions(transRes.data);

        const prodRes = await API.get("/products");
        setProducts(prodRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <h2>Reports</h2>
      <h3>Transactions</h3>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            Product {t.productId} - {t.type} - Qty: {t.quantity} - $
            {t.totalPrice}
          </li>
        ))}
      </ul>
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - Stock: {p.stock}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Reports;
