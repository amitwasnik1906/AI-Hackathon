import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../components/ProductList';
import RecommendationList from '../components/RecommendationList';

function Home() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await axios.get('http://localhost:5000/api/products');
        setProducts(productsResponse.data);

        const recommendationsResponse = await axios.get('http://localhost:5000/api/recommendations');
        setRecommendations(recommendationsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-8">Welcome to AI Shop</h1>
      <ProductList products={products} />
      <RecommendationList recommendations={recommendations} />
    </div>
  );
}

export default Home;