import express from "express";

// ======================================================
// USER CONTROLLER
// ======================================================

import {
  userSignup,
  userLogin,
} from "../controllers/user.controller.js";

// ======================================================
// PRODUCT CONTROLLER
// ======================================================

import {
  getProducts,
  getProductById,
  addSellerProduct,
  getSellerProducts,
  updateSellerProduct,
  deleteSellerProduct,
} from "../controllers/product.controller.js";

// ======================================================
// PAYMENT CONTROLLER
// ======================================================

import {
  createCheckoutSession,
} from "../controllers/payment.controller.js";

// ======================================================
// SELLER CONTROLLER
// ======================================================

import {
  sellerSignup,
  sellerLogin,
} from "../controllers/seller.controller.js";

// ======================================================
// ORDER CONTROLLER
// ======================================================

import {
  createOrder,
  getUserOrders,
  getOrderById,
} from "../controllers/order.controller.js";

const router = express.Router();

// ======================================================
// USER
// ======================================================

router.post(
  "/signup",
  userSignup
);

router.post(
  "/login",
  userLogin
);

// ======================================================
// PRODUCTS
// ======================================================

// Get all products
router.get(
  "/products",
  getProducts
);

// Get single product
router.get(
  "/product/:id",
  getProductById
);

// ======================================================
// PAYMENT
// ======================================================

// Create Stripe checkout session
router.post(
  "/create-checkout-session",
  createCheckoutSession
);

// ======================================================
// SELLER AUTH
// ======================================================

// Seller signup
router.post(
  "/seller/signup",
  sellerSignup
);

// Seller login
router.post(
  "/seller/login",
  sellerLogin
);

// ======================================================
// SELLER PRODUCTS
// ======================================================

// Add seller product
router.post(
  "/seller/products",
  addSellerProduct
);

// Get seller products
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

// Create order manually
router.post(
  "/orders",
  createOrder
);

// Get user's orders
router.get(
  "/orders/:userId",
  getUserOrders
);

// Get single order
router.get(
  "/order/:id",
  getOrderById
);

export default router;