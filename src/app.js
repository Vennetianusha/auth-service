const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware (VERY IMPORTANT)
app.use(cors());
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Routes
app.use("/api/auth", authRoutes);

module.exports = app;
