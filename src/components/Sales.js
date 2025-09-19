import React, { useEffect, useState } from "react";
import API from "../config";
import "../App.css";

const Sales = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

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

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handlePurchase = async () => {
    for (const item of cart) {
      await API.post("/transactions", {
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
    <div className="container">
      <h2>Sales</h2>
      <h3>Products</h3>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - Stock: {p.stock}
            <button onClick={() => addToCart(p)}>Add to Cart</button>
          </li>
        ))}
      </ul>
      <h3>Cart</h3>
      <ul>
        {cart.map((c) => (
          <li key={c.id}>
            {c.name} - Qty: {c.quantity}
          </li>
        ))}
      </ul>
      <button onClick={handlePurchase}>Complete Purchase</button>
    </div>
  );
};

export default Sales;
