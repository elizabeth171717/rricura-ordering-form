const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Route to create a new order
router.post('/order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully!', order: newOrder });
  } catch (error) {
    res.status(400).json({ message: 'Error placing order', error });
  }
});

module.exports = router;
