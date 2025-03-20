const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  tamale: { type: String, required: true },
  sourCream: { type: Number, required: true, default: 0 },
  salsaVerde: { type: Number, required: true, default: 0 },
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  total: { type: Number, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: false },
  deliveryDate: { type: String, required: true }, // Store as a string to match `toDateString()`
  deliveryTime: { type: String, required: true },
  deliveryAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now // Automatically stores the order submission date
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
