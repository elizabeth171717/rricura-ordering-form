const express = require('express');
const router = express.Router();
const sendEmail = require("../sendEmail"); // Import email function
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order'); // Make sure this is imported at the top



router.post("/create-payment-intent", async (req, res) => {
  const { total, customerEmail } = req.body;

  try {
    // Create a Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Stripe wants the amount in cents
      currency: "usd",
      receipt_email: customerEmail,
    });

    // Send clientSecret to frontend
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Payment Intent Error:", error);
    res.status(500).send("Internal Server Error");
  }
});



router.post("/payment", async (req, res) => {
  const { paymentIntentId, orderData } = req.body;

  try {
    // Confirm the payment (optional but good for security)
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    if (paymentIntent.status === 'succeeded') {
      console.log(`✅ Payment succeeded for order ${orderData.orderNumber}`);

      // Save the order to MongoDB
      const newOrder = new Order(orderData);
      await newOrder.save();

      // Send email to customer & owner
      await sendEmail(orderData.customerEmail, orderData.customerName, orderData);

      res.status(200).json({ message: 'Payment succeeded and email sent' });
    } else {
      res.status(400).json({ message: 'Payment not completed yet' });
    }
  } catch (error) {
    console.error("❌ Error in /payment route:", error);
    res.status(500).json({ message: 'Server error during post-payment processing' });
  }
});
module.exports = router;