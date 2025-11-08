// models/User.js
import mongoose from "../src/db.js";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.models.User || mongoose.model("User", userSchema);
