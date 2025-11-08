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
