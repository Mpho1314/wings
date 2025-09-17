import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";
import "../theme.css";


const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/products`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, { ...product, quantity: 1 }]);
  };

  const checkout = async () => {
    try {
      for (const item of cart) {
        await axios.post(`${API_URL}/transactions`, {
          productId: item.id,
          quantity: item.quantity,
          type: "out",
        });
      }
      alert("Sale completed successfully!");
      setCart([]);
      fetchProducts();
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="sales">
      <h2>Sales</h2>
      <div className="card-container">
        {products.map((product) => (
          <div key={product.id} className="card bubbly">
            <h3>{product.name}</h3>
            <p>Price: LSL{product.price}</p>
            <p>Stock: {product.stock}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h3>Cart</h3>
      <div className="card-container">
        {cart.map((item, index) => (
          <div key={index} className="card bubbly">
            <h4>{item.name}</h4>
            <p>Qty: {item.quantity}</p>
            <p>Total: LSL{item.price * item.quantity}</p>
          </div>
        ))}
      </div>
      {cart.length > 0 && (
        <button className="checkout-btn" onClick={checkout}>
          Checkout
        </button>
      )}
    </div>
  );
};

export default Sales;
