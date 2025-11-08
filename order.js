// api/orders.js
import { connectToDB } from "../db.js";
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: String,
  shop: String,
  items: [{ itemName: String, quantity: Number, price: Number }],
  total: Number,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default async function handler(req, res) {
  await connectToDB(process.env.MONGO_URI);
  const { method } = req;

  if (method === "GET") {
    const userId = req.query.userId;
    if (!userId) return res.status(400).json({ message: "Missing userId" });

    try {
      const orders = await Order.find({ userId });
      const current = orders.filter(o => o.status === "pending");
      const completed = orders.filter(o => o.status === "completed");
      res.status(200).json({ current, completed });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (method === "POST") {
    try {
      const order = new Order(req.body);
      const saved = await order.save();
      res.status(201).json(saved);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else if (method === "PATCH") {
    const orderId = req.query.orderId;
    if (!orderId) return res.status(400).json({ message: "Missing orderId" });

    try {
      const updated = await Order.findByIdAndUpdate(
        orderId,
        { status: "completed" },
        { new: true }
      );
      res.status(200).json(updated);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
