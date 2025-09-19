import React, { useEffect, useState } from "react";
import API from "../config";
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
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRestock = async (id) => {
    const quantity = parseInt(prompt("Quantity to restock:"), 10);
    if (!isNaN(quantity) && quantity > 0) {
      const product = products.find((p) => p.id === id);
      const updatedStock =
        (product.stock || product.quantity || 0) + quantity;
      await API.put(`/products/${id}`, { stock: updatedStock });
      fetchProducts();
    }
  };

  const handleEdit = async (id) => {
    const name = prompt("New name:");
    const price = parseFloat(prompt("New price:"));
    if (!name || isNaN(price)) return;
    await API.put(`/products/${id}`, { name, price });
    fetchProducts();
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return;
    try {
      await API.post("/products", {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      setFormData({ name: "", price: "", stock: "", image: "" });
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <form onSubmit={handleAddProduct}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price}
          onChange={(e) =>
            setFormData({ ...formData, price: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Stock"
          value={formData.stock}
          onChange={(e) =>
            setFormData({ ...formData, stock: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image}
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.value })
          }
        />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} - ${p.price} - Stock: {p.stock}
            <button onClick={() => handleEdit(p.id)}>Edit</button>
            <button onClick={() => handleRestock(p.id)}>Restock</button>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
