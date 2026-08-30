import express from "express";

import {
  userSignup,
  userLogin,
} from "../controllers/user.controller.js";

import {
  getProducts,
  getProductById,
  addSellerProduct,
  getSellerProducts,
  updateSellerProduct,
  deleteSellerProduct,
} from "../controllers/product.controller.js";

import {
  createCheckoutSession,
  stripeWebhooks,
} from "../controllers/payment.controller.js";

// Seller
import {
  sellerSignup,
  sellerLogin,
} from "../controllers/seller.controller.js";

import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/order.controller.js";

const router = express.Router();

// ======================================================
// USER
// ======================================================

router.post("/signup", userSignup);

router.post("/login", userLogin);

// ======================================================
// PRODUCTS
// ======================================================

// Get all products
router.get("/products", getProducts);

// Get single product
router.get("/product/:id", getProductById);

// ======================================================
// PAYMENT
// ======================================================

router.post(
  "/create-checkout-session",
  createCheckoutSession
);

// ======================================================
// SELLER AUTH
// ======================================================

// Seller signup
router.post("/seller/signup", sellerSignup);

// Seller login
router.post("/seller/login", sellerLogin);

// ======================================================
// SELLER PRODUCTS
// ======================================================

// Add product
router.post(
  "/seller/products",
  addSellerProduct
);

// Get seller's products
router.get(
  "/seller/products/:sellerId",
  getSellerProducts
);

// Update seller product
router.put(
  "/seller/products/:id",
  updateSellerProduct
);

// Delete seller product
router.delete(
  "/seller/products/:id",
  deleteSellerProduct
);

// ======================================================
// ORDERS
// ======================================================

router.post("/orders", createOrder);

router.get("/orders/:userId", getUserOrders);

router.get("/order/:id", getOrderById);

export default router;