import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Star, ShoppingBag, Filter } from 'lucide-react';

function ProductList({ products }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Get unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Filter Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                ${selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative">
              <div className="aspect-w-16 aspect-h-12 w-full">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover p-4"
                />
              </div>
              <div className="absolute top-4 right-4">
                <div className="bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ShoppingBag className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h2>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">4.5</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <span className="text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Details →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
          <button
            onClick={() => setSelectedCategory('all')}
            className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
          >
            View all products
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;