const express = require("express");
const cors = require("cors");

const app = express();


const connectDB = require('./db');

const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');


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





// Connect to MongoDB
connectDB();

// Routes
app.use('/api', orderRoutes);
app.use('/api', paymentRoutes); // ✅
// ✅ Define PORT before using it
const PORT = process.env.PORT || 5000;

// ✅ Start Server (only one instance of `app.listen`)
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${isProduction ? "Production" : "Development"})`);
});