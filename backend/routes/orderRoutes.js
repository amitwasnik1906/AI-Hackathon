const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { user, items, totalAmount, shippingAddress, status } = req.body;

    // Create a new order with the provided data
    const order = new Order({
      user,
      items,
      totalAmount,
      shippingAddress,
      status: status || 'Pending', // set default to 'Pending' if not provided
    });

    // Save the order to the database
    await order.save();

    // Respond with the created order
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all orders for a user
router.get('/:id', async (req, res) => {
  try {
    const {id} = req.params
    const orders = await Order.find({ user: id}).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;