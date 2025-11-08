// api/shops.js
import { connectToDB } from "../db.js";
import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  categories: [String],
  rating: Number,
});

const Shop = mongoose.models.Shop || mongoose.model("Shop", shopSchema);

export default async function handler(req, res) {
  await connectToDB(process.env.MONGO_URI);

  if (req.method === "GET") {
    try {
      const shops = await Shop.find();
      res.status(200).json(shops);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
