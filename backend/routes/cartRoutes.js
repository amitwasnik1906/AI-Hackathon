const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get cart
router.get('/', async (req, res) => {
  try {
    // For simplicity, we're assuming a single user. In a real app, you'd get the user ID from the authenticated session.
    const cart = await Cart.findOne({ user: 'dummy_user_id' }).populate('items.product');
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: 'dummy_user_id' });
    if (!cart) {
      cart = new Cart({ user: 'dummy_user_id', items: [] });
    }

    const cartItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (cartItemIndex > -1) {
      cart.items[cartItemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove item from cart
router.delete('/:productId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: 'dummy_user_id' });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;