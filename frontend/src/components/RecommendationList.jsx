import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, Star } from 'lucide-react';

function RecommendationList({ recommendations }) {
  return (
    <div className="mt-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Recommended for You
        </h2>
        <div className="flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
          <span className="text-sm text-gray-600">Personalized picks</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {recommendations.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="group bg-white rounded-lg overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 right-3">
                <div className="bg-white px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-500">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {product.name}
              </h3>
              {product.rating && (
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300 fill-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>
              )}
              
              {product.badge && (
                <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                  {product.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;