import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://wings-backend-gsej.onrender.com/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const addToCart = (product, quantity) => {
    if (!quantity || quantity <= 0) return;
    if (quantity > (product.stock || product.quantity)) {
      alert("Not enough stock!");
      return;
    }

    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        return prev.map(p => p.id === product.id ? {...p, quantity: p.quantity + quantity} : p);
      }
      return [...prev, {...product, quantity}];
    });
  };

  const removeFromCart = id => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const handlePurchase = async () => {
    for (const item of cart) {
      await axios.post("https://wings-backend-gsej.onrender.com/transactions", {
        productId: item.id,
        quantity: item.quantity,
        totalPrice: item.price * item.quantity,
        type: "out",
      });
    }
    setCart([]);
    fetchProducts();
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
            products.map(p => (
              <tr key={p.id}>
                <td>{p.image ? <img src={p.image} alt={p.name} className="tiny-img" /> : "No Image"}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.stock || p.quantity} {(p.stock || p.quantity) <= 5 && <span className="low-stock-alert">⚠ Low Stock!</span>}</td>
                <td>
                  <button onClick={() => {
                    const qty = parseInt(prompt("Quantity to add to cart:"), 10);
                    addToCart(p, qty);
                  }}>Add to Cart</button>
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

      {/* Cart Summary */}
      {cart.length > 0 && (
        <div className="cart-section">
          <h3>Cart</h3>
          <ul>
            {cart.map(item => (
              <li key={item.id}>
                {item.name} x {item.quantity} = {item.price * item.quantity} LSL
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p>Total: {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)} LSL</p>
          <button onClick={handlePurchase}>Purchase All</button>
        </div>
      )}
    </div>
  );
};

export default Sales;
