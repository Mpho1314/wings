import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct, addTransaction } from '../api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name:'', category:'', price:'', stock:0, image:'' });

  const fetchProducts = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSave = async () => {
    if(selectedProduct) await updateProduct(selectedProduct.id, formData);
    else await addProduct(formData);
    setShowForm(false); setSelectedProduct(null); setFormData({ name:'', category:'', price:'', stock:0, image:'' });
    fetchProducts();
  };

  const handleDelete = async (id) => { await deleteProduct(id); fetchProducts(); };
  const handleRestock = async (product) => {
    const qty = parseInt(prompt('Enter quantity to restock:', '10'));
    if(!isNaN(qty) && qty>0) {
      await addTransaction({ productId: product.id, quantity: qty, type:'in', amount: 0 });
      fetchProducts();
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <button onClick={()=>setShowForm(true)}>Add Product</button>
      {showForm && (
        <div style={{marginTop:'10px',padding:'10px',border:'1px solid #ccc'}}>
          <input placeholder="Name" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} />
          <input placeholder="Category" value={formData.category} onChange={e=>setFormData({...formData,category:e.target.value})} />
          <input placeholder="Price" type="number" value={formData.price} onChange={e=>setFormData({...formData,price:e.target.value})} />
          <input placeholder="Stock" type="number" value={formData.stock} onChange={e=>setFormData({...formData,stock:e.target.value})} />
          <input placeholder="Image URL" value={formData.image} onChange={e=>setFormData({...formData,image:e.target.value})} />
          <button onClick={handleSave}>Save</button>
          <button onClick={()=>setShowForm(false)}>Cancel</button>
        </div>
      )}
      <table>
        <thead>
          <tr><th>Image</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {products.map(p=>(
            <tr key={p.id}>
              <td><img src={p.image} alt={p.name} width="50"/></td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{parseFloat(p.price).toFixed(2)}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={()=>{setSelectedProduct(p); setFormData(p); setShowForm(true);}}>Edit</button>
                <button onClick={()=>handleDelete(p.id)}>Delete</button>
                <button onClick={()=>handleRestock(p)}>Restock</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
