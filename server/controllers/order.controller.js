import Order from "../models/order.models.js";

// ======================================================
// CREATE ORDER
// ======================================================

export const createOrder = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      paymentStatus,
    } = req.body;

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "No products found",
      });
    }

    const order = new Order({
      userId,

      orderId: `QC${Date.now()}`,

      products,

      totalAmount,

      paymentStatus: paymentStatus || "Pending",

      orderStatus: "Processing",
    });

    await order.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// GET USER ORDERS
// ======================================================

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Get Orders Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// GET SINGLE ORDER
// ======================================================

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      orderId: id,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get Order Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};