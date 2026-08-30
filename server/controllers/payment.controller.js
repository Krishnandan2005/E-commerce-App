import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ======================================================
// CREATE CHECKOUT SESSION
// ======================================================

export const createCheckoutSession = async (req, res) => {
  try {
    const {
      userId,
      products,
      totalAmount,
    } = req.body;

    // --------------------------------------------
    // VALIDATION
    // --------------------------------------------

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

    if (!totalAmount || totalAmount <= 0) {
      return res.status(400).json({
        message: "Invalid total amount",
      });
    }

    // --------------------------------------------
    // CREATE STRIPE LINE ITEMS
    // --------------------------------------------

    const lineItems = products.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.title || "Product",
        },

        // Stripe expects amount in paise
        unit_amount: Math.round(
          Number(item.price) * 100
        ),
      },

      quantity: Number(item.quantity) || 1,
    }));

    // --------------------------------------------
    // CREATE CHECKOUT SESSION
    // --------------------------------------------

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: ["card"],

        line_items: lineItems,

        mode: "payment",

        // Store order information in Stripe
        // so webhook can use it later.
        metadata: {
          userId: String(userId),

          products: JSON.stringify(products),

          totalAmount: String(totalAmount),
        },

        success_url:
          "https://e-commerce-client-coral-sigma.vercel.app/orders",

        cancel_url:
          "https://e-commerce-client-coral-sigma.vercel.app/cart",
      });

    // --------------------------------------------
    // SEND SESSION ID TO FRONTEND
    // --------------------------------------------

    return res.status(200).json({
      id: session.id,
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

import Order from "../models/order.models.js";

export const stripeWebhooks = async (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
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

  // ====================================================
  // PAYMENT SUCCESS
  // ====================================================

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object;

      const {
        userId,
        products,
        totalAmount,
      } = session.metadata;

      if (!userId || !products || !totalAmount) {
        console.error(
          "Missing order data in Stripe metadata"
        );

        return res.status(400).json({
          message: "Missing order data",
        });
      }

      const parsedProducts =
        JSON.parse(products);

      // ----------------------------------------------
      // PREVENT DUPLICATE ORDER
      // ----------------------------------------------

      const existingOrder =
        await Order.findOne({
          stripeSessionId: session.id,
        });

      if (existingOrder) {
        console.log(
          "Order already exists:",
          existingOrder.orderId
        );

        return res.status(200).json({
          received: true,
        });
      }

      // ----------------------------------------------
      // CREATE ORDER
      // ----------------------------------------------

      const order = new Order({
        userId,

        orderId: `QC${Date.now()}`,

        stripeSessionId: session.id,

        products: parsedProducts,

        totalAmount: Number(totalAmount),

        paymentStatus: "Paid",

        orderStatus: "Processing",
      });

      await order.save();

      console.log(
        "Order created successfully:",
        order.orderId
      );
    } catch (error) {
      console.error(
        "Create Order From Webhook Error:",
        error
      );

      return res.status(500).json({
        message: error.message,
      });
    }
  }

  return res.status(200).json({
    received: true,
  });
};