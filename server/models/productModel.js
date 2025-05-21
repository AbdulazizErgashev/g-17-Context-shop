import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Mahsulot nomi majburiy"],
    },
    price: {
      type: Number,
      required: [true, "Narx majburiy"],
    },
    category: {
      type: String,
      required: [true, "Kategoriya majburiy"],
    },
    image: {
      type: String,
      required: [true, "Rasm URL majburiy"],
    },
    description: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "white",
    },
    count: {
      type: Number,
      default: 1,
    },
    liked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
