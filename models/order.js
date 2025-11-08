// models/Order.js
import mongoose from "../src/db.js";

const orderSchema = new mongoose.Schema({
  userId: String,
  shop: String,
  items: [{ itemName: String, quantity: Number, price: Number }],
  total: Number,
  status: { type: String, default: "pending" },
  date: { type: Date, default: Date.now },
  customerName: String,
  customerPhone: String,
  address: String
});

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
