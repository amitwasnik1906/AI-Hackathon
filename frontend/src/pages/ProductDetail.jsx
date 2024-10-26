import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RefreshCcw,
  Loader,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

function ProductDetail() {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    setIsAddingToCart(true);
    try {
      await axios.post('http://localhost:5000/api/cart', { productId: product._id, quantity: 1 });
      // You might want to show a toast notification instead of an alert
      // For now, we'll keep it simple
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-gray-600">Product not found</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-1/2">
              <div className="relative aspect-w-4 aspect-h-3 bg-gray-100">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Info Section */}
            <div className="lg:w-1/2 p-8 lg:p-12">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                  <p className="text-2xl font-bold text-blue-600 mb-6">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Heart className="w-6 h-6 text-gray-500" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                    <Share2 className="w-6 h-6 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="border-t border-b border-gray-200 py-6 my-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">2-year warranty included</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCcw className="w-5 h-5 text-green-600" />
                  <span className="text-gray-600">30-day money-back guarantee</span>
                </div>
              </div>

              <button
                onClick={addToCart}
                disabled={isAddingToCart}
                className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 
                  focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 
                  flex items-center justify-center gap-2 font-medium disabled:opacity-70"
              >
                {isAddingToCart ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Adding to Cart...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;