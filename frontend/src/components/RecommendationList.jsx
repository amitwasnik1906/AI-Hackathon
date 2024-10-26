import React from 'react';
import { Link } from 'react-router-dom';

function RecommendationList({ recommendations }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {recommendations.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="border p-4 rounded hover:shadow-lg transition">
            <img src={product.image} alt={product.name} className="w-full h-32 object-cover mb-2" />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;