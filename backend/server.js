const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

const sendEmail = require("./sendEmail"); // Import email function
const connectDB = require('./db');
const Order = require('./models/Order'); // Import your Mongoose Order model
const orderRoutes = require('./routes/orderRoutes');
app.use(cors());
app.use(express.json());



// ✅ Determine environment
const isProduction = process.env.NODE_ENV === "production";

// ✅ CORS configuration (automatically switches between production & development)
const corsOptions = {
  origin: isProduction ? process.env.FRONTEND_URL_PRODUCTION : process.env.FRONTEND_URL_DEVELOPMENT,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};



app.post("/order", async (req, res) => {
  try {
    
    const orderData = req.body; // Receive the entire request body
    const { customerEmail, customerName } = orderData; // Extract customer info

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ success: false, message: "Invalid phone number. Must be 10 digits." });
    }
    
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

// ✅ Define PORT before using it
const PORT = process.env.PORT || 5000;

// ✅ Start Server (only one instance of `app.listen`)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${isProduction ? "Production" : "Development"})`);
});