// models/Order.js
const mongoose = require("../db");

const orderSchema = new mongoose.Schema({
  shop: String,
  items: Array,
  total: Number,
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
  customerName: String,
  customerPhone: String,
  address: String,
  customerId: String
});

module.exports = mongoose.model("Order", orderSchema);
