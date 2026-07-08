import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    url: String,
    detailUrl: String,

    title: {
      shortTitle: String,
      longTitle: String,
    },

    price: {
      mrp: Number,
      cost: Number,
      discount: String,
    },

    quantity: Number,
    description: String,
    discount: String,
    tagline: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;