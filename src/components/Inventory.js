import React, { useEffect, useState } from "react";
import API from "../config";
import "../App.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="container">
      <h2>Inventory</h2>
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

export default Inventory;

