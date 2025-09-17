import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../theme.css";

const Inventory = () => {
  const [products, setProducts] = useState([]);

  const fetchInventory = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div className="inventory">
      <h2>Inventory</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price (LSL)</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className={p.stock < 5 ? "low-stock-row" : ""}>
              <td>
                {p.image ? (
                  <img src={p.image} alt={p.name} className="product-img" />
                ) : (
                  "No Image"
                )}
              </td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{Number(p.price).toFixed(2)}</td>
              <td>{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
