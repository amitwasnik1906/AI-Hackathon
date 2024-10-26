const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Create a new order
router.post('/', async (req, res) => {
  console.log(req.body);
  
  try {
    const cart = await Cart.findOne({ user: req.body.user }).populate('items.product');
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = orderItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const order = new Order({
      user: req.data.user,
      items: orderItems,
      totalAmount,
      shippingAddress: req.body.address,
    });

    await order.save();

    // Update inventory
    for (let item of cart.items) {
      await Product.findByIdAndUpdate(item.product._id, { $inc: { inventory: -item.quantity } });
    }

    // Clear the cart
    await Cart.findOneAndDelete({ user: 'dummy_user_id' });

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