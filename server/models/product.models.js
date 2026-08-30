import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: false,
    },

    url: {
      type: String,
    },

    detailUrl: {
      type: String,
    },

    title: {
      shortTitle: {
        type: String,
      },

      longTitle: {
        type: String,
      },
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      mrp: {
        type: Number,
      },

      cost: {
        type: Number,
      },

      discount: {
        type: String,
      },
    },

    quantity: {
      type: Number,
    },

    description: {
      type: String,
    },

    discount: {
      type: String,
    },

    tagline: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;