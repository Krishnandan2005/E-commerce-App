import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    // Stripe session is created AFTER the order.
    // Therefore it is optional initially.
    stripeSessionId: {
      type: String,
      unique: true,
      sparse: true,
    },

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

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

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

const Order = mongoose.model("Order", orderSchema);

export default Order;