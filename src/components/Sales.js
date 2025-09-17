import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Sales = () => {
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

  const handlePurchase = async (id) => {
    const quantity = parseInt(prompt("Quantity to buy:"), 10);
    if (!isNaN(quantity) && quantity > 0) {
      const product = products.find((p) => p.id === id);
      if (quantity > (product.stock || product.quantity)) {
        alert("Not enough stock!");
        return;
      }
      await axios.post("http://localhost:5001/transactions", {
        productId: id,
        quantity,
        totalPrice: product.price * quantity,
        type: "out",
      });
      fetchProducts();
    }
  };

  return (
    <div className="bubble-card">
      <h2>Sales</h2>
      <table className="bubble-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price (LSL)</th>
            <th>Quantity</th>
            <th>Action</th>
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
                <td>{p.stock || p.quantity}</td>
                <td>
                  <button onClick={() => handlePurchase(p.id)}>Purchase</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sales;
