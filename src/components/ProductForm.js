import React, { useState, useEffect } from 'react';

const ProductForm = ({ selectedProduct, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '', description: '', category: '', price: '', stock: '', image: ''
  });

  useEffect(() => {
    if (selectedProduct) setFormData(selectedProduct);
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'price' || name === 'stock') {
      if (!/^\d*\.?\d*$/.test(value)) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.stock) return alert('Name, price, and stock required!');
    onSave({ ...formData, price: parseFloat(formData.price).toFixed(2), stock: parseInt(formData.stock) });
    setFormData({ name: '', description: '', category: '', price: '', stock: '', image: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <h2>{selectedProduct ? 'Edit Product' : 'Add Product'}</h2>
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required/>
      <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange}/>
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange}/>
      <input type="text" name="price" placeholder="Price (LSL)" value={formData.price} onChange={handleChange} required/>
      <input type="text" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} required/>
      <input type="text" name="image" placeholder="Image URL" value={formData.image} onChange={handleChange}/>
      <div className="form-buttons">
        <button type="submit">{selectedProduct ? 'Update' : 'Add'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
};

export default ProductForm;
