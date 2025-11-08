// models/Item.js// models/Item.js
import mongoose from "../src/db.js";

const itemSchema = new mongoose.Schema({
  shopName: { type: String, required: true },
  itemName: { type: String, required: true },
  description: String,
  amount: { type: Number, required: true },
  imageUrl: String
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);
