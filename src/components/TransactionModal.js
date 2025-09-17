import React, { useState } from 'react';

const TransactionModal = ({ products, onClose, onSubmit }) => {
  const [quantities, setQuantities] = useState(products.reduce((acc, p) => ({ ...acc, [p.id]: 0 }), {}));

  const handleChange = (productId, value) => {
    if (!/^\d*$/.test(value)) return;
    setQuantities({ ...quantities, [productId]: parseInt(value) });
  };

  const handleSubmit = () => {
    const selected = products.filter(p => quantities[p.id] > 0)
      .map(p => ({ productId: p.id, quantity: quantities[p.id], amount: p.price * quantities[p.id] }));
    if (selected.length === 0) return alert('Select at least one product.');
    onSubmit(selected);
    onClose();
  };

  return (
    <div className="modal">
      <h2>Purchase Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th><th>Stock</th><th>Price</th><th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td><td>{p.stock}</td><td>{parseFloat(p.price).toFixed(2)}</td>
              <td><input type="text" value={quantities[p.id]} onChange={(e) => handleChange(p.id, e.target.value)} max={p.stock}/></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Purchase</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default TransactionModal;
