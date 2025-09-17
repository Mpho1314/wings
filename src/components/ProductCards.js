import React from 'react';

const ProductCard = ({ product, onEdit, onDelete, onPurchase }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-img"/>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: LSL {parseFloat(product.price).toFixed(2)}</p>
      <p>Stock: {product.stock}</p>
      <button onClick={() => onPurchase(product)}>Purchase</button>
      <button onClick={() => onEdit(product)}>Edit</button>
      <button onClick={() => onDelete(product.id)}>Delete</button>
    </div>
  );
};

export default ProductCard;
