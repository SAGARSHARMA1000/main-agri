require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');

const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorHandler');

//const { autoReleaseEscrow } = require("./jobs/autoConfirmDelivery");
//setInterval(autoReleaseEscrow, 60 * 60 * 1000); // every hour
const cron = require("node-cron");
const autoConfirmDelivery = require("./cron/autoConfirmDelivery");

// Runs every 30 minutes (recommended)
cron.schedule("*/30 * * * *", async () => {
  console.log("⏰ Running auto-confirm delivery job");
  await autoConfirmDelivery();
});

const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');
const proposalRoutes = require('./routes/proposalRoutes');
const contractRoutes = require('./routes/contractRoutes');
const escrowRoutes = require('./routes/escrowRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');


const app = express();
connectDB();

/* =======================
   🔥 CORS — MUST BE FIRST
   ======================= */
const CLIENT_URL = "http://localhost:5173"||"http://localhost:5174";

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// ✅ VERY IMPORTANT — allow preflight


/* =======================
   MIDDLEWARES
   ======================= */
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));

/* =======================
   STATIC FILES
   ======================= */
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

/* =======================
   ROUTES
   ======================= */
app.use('/api/auth', authRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/escrow', escrowRoutes);
app.use('/api/delivery', deliveryRoutes);
/* =======================
   ERROR HANDLER
   ======================= */
app.use(errorHandler);

/* =======================
   SERVER
   ======================= */
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
