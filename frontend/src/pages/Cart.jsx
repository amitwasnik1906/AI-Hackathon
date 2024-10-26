import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Package, CreditCard, AlertCircle } from 'lucide-react';

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      setCart(cart.filter(item => item.product._id !== productId));
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingCart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600">Your cart is empty.</p>
              <Link
                to="/"
                className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <li key={item.product._id} className="py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-medium text-gray-900">
                          ${item.product.price.toFixed(2)}
                        </span>
                        <span className="text-gray-500">×</span>
                        <span className="text-gray-600">{item.quantity}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg text-gray-600">Total</span>
                  <span className="text-2xl font-bold text-gray-900">${total.toFixed(2)}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Link
                    to="/"
                    className="inline-flex justify-center items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/checkout"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    <CreditCard className="w-5 h-5" />
                    Checkout
                  </Link>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <p>Secure checkout powered by Stripe</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;