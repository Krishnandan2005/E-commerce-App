import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // ======================================================
    // USER
    // ======================================================

    userId: {
      type: String,
      required: true,
      index: true,
    },

    // ======================================================
    // ORDER ID
    // ======================================================

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // ======================================================
    // STRIPE SESSION ID
    // ======================================================

    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
    },

    // ======================================================
    // PRODUCTS
    // ======================================================

    products: [
      {
        productId: {
          type: String,
          required: true,
        },

        title: {
          type: String,
          required: true,
        },

        image: {
          type: String,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },

        mrp: {
          type: Number,
        },
      },
    ],

    // ======================================================
    // TOTAL AMOUNT
    // ======================================================

    totalAmount: {
      type: Number,
      required: true,
    },

    // ======================================================
    // PAYMENT STATUS
    // ======================================================

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
      ],
      default: "Pending",
    },

    // ======================================================
    // ORDER STATUS
    // ======================================================

    orderStatus: {
      type: String,
      enum: [
        "Processing",
        "Shipped",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Processing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model(
  "Order",
  orderSchema
);

export default Order;