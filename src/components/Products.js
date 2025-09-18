import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    image: ""
  });

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

  const handleDelete = async id => {
    try {
      await axios.delete(`https://wings-backend-gsej.onrender.com/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestock = async id => {
    const quantity = parseInt(prompt("Quantity to restock:"), 10);
    if (!isNaN(quantity) && quantity > 0) {
      const product = products.find(p => p.id === id);
      const updatedStock = (product.stock || product.quantity || 0) + quantity;
      await axios.put(`https://wings-backend-gsej.onrender.com/products/${id}`, { stock: updatedStock });
      fetchProducts();
    }
  };

  const handleEdit = async id => {
    const name = prompt("New name:");
    const price = parseFloat(prompt("New price:"));
    if (!name || isNaN(price)) return;
    await axios.put(`https://wings-backend-gsej.onrender.com/products/${id}`, { name, price });
    fetchProducts();
  };

  const handleAddProduct = async e => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;
    try {
      await axios.post("https://wings-backend-gsej.onrender.com/products", {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      });
      setFormData({ name: "", price: "", stock: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="section-card">
      <h2>Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price (LSL)</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(p => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>
                  {p.stock || p.quantity}{" "}
                  {(p.stock || p.quantity) <= 5 && <span className="low-stock-alert">⚠ Low Stock!</span>}
                </td>
                <td>{p.image ? <img src={p.image} alt={p.name} className="product-img" /> : "No Image"}</td>
                <td className="table-actions">
                  <button onClick={() => handleDelete(p.id)}>Delete</button>
                  <button onClick={() => handleEdit(p.id)}>Edit</button>
                  <button onClick={() => handleRestock(p.id)}>Restock</button>
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

      {/* Add Product Form BELOW the table */}
      <div className="add-product-form">
        <h3>Add Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={e => setFormData({ ...formData, price: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.stock}
            onChange={e => setFormData({ ...formData, stock: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={e => setFormData({ ...formData, image: e.target.value })}
          />
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Products;
