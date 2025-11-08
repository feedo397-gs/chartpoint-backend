<<<<<<< HEAD
// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ordersHandler from "./api/orders.js";
import shopsHandler from "./api/shops.js";
import indexHandler from "./api/index.js";
import { connectToDB } from "./db.js";

dotenv.config();
const app = express();

// Allow frontend domain (Vercel) for CORS
app.use(cors({
  origin: ["https://app-eta-eosin.vercel.app"], // frontend URL
  methods: ["GET","POST","PATCH","PUT","DELETE","OPTIONS"],
  credentials: true
}));

app.use(express.json());

// Connect to MongoDB
connectToDB(process.env.MONGO_URI);

// API routes
app.use("/api", (req, res) => {
  if (req.path === "/" || req.path === "/index") return indexHandler(req, res);
  else if (req.path.startsWith("/orders")) return ordersHandler(req, res);
  else if (req.path.startsWith("/shops")) return shopsHandler(req, res);
  else return res.status(404).json({ message: "API route not found" });
});

// Run locally only
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
=======
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("✅ Backend is live on Vercel!");
});

app.post("/register", async (req, res) => {
  const { name, phone, password } = req.body;
  if (!name || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userExists = await User.findOne({ phone });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = new User({ name, phone, password });
  await newUser.save();
  res.json({ message: "Registration successful" });
});

app.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  if (!phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findOne({ phone, password });
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({ message: "Login successful", user });
});

// Export app for Vercel
module.exports = app;

// Local development (only runs locally, ignored on Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`🚀 Server running locally at http://localhost:${PORT}`)
  );
}
>>>>>>> ae88f8bce1663745ab761bc6dfe0b147fa36df4d
