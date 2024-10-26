const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Get recommendations (simplified version)
router.get('/', async (req, res) => {
  try {
    // For this example, we're just returning random products
    // In a real AI-powered system, you'd use more sophisticated algorithms
    const recommendations = await Product.aggregate([{ $sample: { size: 4 } }]);
    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;