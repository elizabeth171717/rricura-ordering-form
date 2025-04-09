const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../models/Order");
const sendEmail = require("../sendEmail");

const router = express.Router();

router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error("Webhook Error:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        const orderData = JSON.parse(session.metadata.orderData); // Retrieve stored order data

        try {
            // ✅ Save order to MongoDB
            const newOrder = new Order(orderData);
            await newOrder.save();

            // ✅ Send confirmation email to customer
            await sendEmail(orderData.customerEmail, orderData.customerName, orderData);
            
            // ✅ Send notification email to yourself
            const yourEmail = process.env.BUSINESS_EMAIL; // Your email from .env
            await sendEmail(yourEmail, "New Order Received!", orderData);

            console.log("✅ Order saved & emails sent!");

        } catch (error) {
            console.error("❌ Error saving order or sending emails:", error);
        }
    }

    res.status(200).send("Webhook received!");
});

module.exports = router;
