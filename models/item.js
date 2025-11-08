// models/Item.js
const mongoose = require("../db");

const itemSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  itemName: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  imageUrl: String
});

module.exports = mongoose.model("Item", itemSchema);
