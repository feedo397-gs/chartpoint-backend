// models/Shop.js
import mongoose from "../src/db.js";

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  categories: [String],
  rating: { type: Number, default: 4.5 }
});

export default mongoose.models.Shop || mongoose.model("Shop", shopSchema);
