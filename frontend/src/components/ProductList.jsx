import React from 'react';
import { Link } from 'react-router-dom';

function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id} className="border p-4 rounded hover:shadow-lg transition">
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-2" />
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
        </Link>
      ))}
    </div>
  );
}

export default ProductList;