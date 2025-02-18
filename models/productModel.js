import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
