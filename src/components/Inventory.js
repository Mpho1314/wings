import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5001/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  return (
    <div className="bubble-card">
      <h2>Inventory</h2>
      <table className="bubble-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (LSL)</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="tiny-img" />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.quantity || p.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
