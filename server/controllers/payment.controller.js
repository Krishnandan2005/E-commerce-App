import Stripe from "stripe";
import Order from "../models/order.models.js";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY
);

// ======================================================
// CREATE CHECKOUT SESSION
// ======================================================

export const createCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
      orderId,
    } = req.body;

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!userId) {
      return res.status(400).json({
        message: "User ID is required",
      });
    }

    if (
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      return res.status(400).json({
        message: "No products found",
      });
    }

    if (
      !totalAmount ||
      Number(totalAmount) <= 0
    ) {
      return res.status(400).json({
        message: "Invalid total amount",
      });
    }

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
      });
    }

    // ==================================================
    // CHECK WHETHER ORDER EXISTS
    // ==================================================

    const existingOrder = await Order.findOne({
      orderId,
    });

    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    // ==================================================
    // CREATE STRIPE LINE ITEMS
    // ==================================================

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name:
            item.title ||
            item.shortTitle ||
            "Product",
        },

        unit_amount: Math.round(
          Number(item.price) * 100
        ),
      },

      quantity:
        Number(item.quantity) || 1,
    }));

    // ==================================================
    // CREATE STRIPE CHECKOUT SESSION
    // ==================================================

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: lineItems,

        mode: "payment",

        metadata: {
          userId: String(userId),

          orderId: String(orderId),
        },

        success_url:
          "https://e-commerce-client-coral-sigma.vercel.app/orders",

        cancel_url:
          "https://e-commerce-client-coral-sigma.vercel.app/cart",
      });

    // ==================================================
    // SAVE STRIPE SESSION ID TO EXISTING ORDER
    // ==================================================

    existingOrder.stripeSessionId =
      session.id;

    await existingOrder.save();

    console.log(
      "Stripe session created:",
      session.id
    );

    console.log(
      "Order connected to Stripe:",
      orderId
    );

    // ==================================================
    // SEND SESSION ID
    // ==================================================

    return res.status(200).json({
      id: session.id,
      orderId,
    });

  } catch (error) {
    console.error(
      "Create Checkout Session Error:",
      error
    );

    return res.status(500).json({
      message: error.message,
    });
  }
};

// ======================================================
// STRIPE WEBHOOK
// ======================================================

export const stripeWebhooks = async (req, res) => {
  const signature =
    req.headers["stripe-signature"];

  let event;

  // ==================================================
  // VERIFY STRIPE WEBHOOK
  // ==================================================

  try {
    event =
      stripe.webhooks.constructEvent(
        req.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
  } catch (error) {
    console.error(
      "Webhook signature verification failed:",
      error.message
    );

    return res.status(400).send(
      `Webhook Error: ${error.message}`
    );
  }

  // ==================================================
  // PAYMENT SUCCESS
  // ==================================================

  if (
    event.type ===
    "checkout.session.completed"
  ) {
    try {
      const session =
        event.data.object;

      const {
        orderId,
        userId,
      } = session.metadata || {};

      // ----------------------------------------------
      // VALIDATE METADATA
      // ----------------------------------------------

      if (!orderId || !userId) {
        console.error(
          "Missing orderId or userId in Stripe metadata"
        );

        return res.status(400).json({
          message:
            "Missing order information",
        });
      }

      // ----------------------------------------------
      // FIND EXISTING ORDER
      // ----------------------------------------------

      const order =
        await Order.findOne({
          orderId,
        });

      if (!order) {
        console.error(
          "Order not found:",
          orderId
        );

        return res.status(404).json({
          message: "Order not found",
        });
      }

      // ----------------------------------------------
      // UPDATE ORDER
      // ----------------------------------------------

      order.paymentStatus = "Paid";

      order.orderStatus = "Processing";

      order.stripeSessionId =
        session.id;

      await order.save();

      console.log(
        "Order payment updated successfully:",
        order.orderId
      );

    } catch (error) {
      console.error(
        "Update Order From Webhook Error:",
        error
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  // ==================================================
  // WEBHOOK RESPONSE
  // ==================================================

  return res.status(200).json({
    received: true,
  });
};