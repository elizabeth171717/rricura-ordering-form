const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 5000;
const sendEmail = require("./sendEmail"); // Import email function
const connectDB = require('./db');
const Order = require('./models/Order'); // Import your Mongoose Order model
const orderRoutes = require('./routes/orderRoutes');
app.use(cors());
app.use(express.json());



app.post("/order", async (req, res) => {
  try {
    
    const orderData = req.body; // Receive the entire request body
    const { customerEmail, customerName } = orderData; // Extract customer info

    
    console.log("New Order Received:", orderData);

    // Send email before saving the order
    await sendEmail( customerEmail, customerName, orderData );

    
    // Save order to MongoDB using Mongoose
    const newOrder = new Order(orderData);
    await newOrder.save(); // Save the order to the database

    
      res.status(200).json({ message: "Order received successfully" });
 
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Error processing order" });
  }
});

// Connect to MongoDB
connectDB();

// Routes
app.use('/api', orderRoutes);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
