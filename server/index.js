import express from "express";
import connectDB from "./db/db.js";
import defaultData from "./default.js";
import "dotenv/config";
import router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

import { stripeWebhooks } from "./controllers/payment.controller.js";

const app = express();

app.use(cors());

// ======================================================
// STRIPE WEBHOOK
// IMPORTANT: Must come BEFORE bodyParser.json()
// ======================================================

app.post(
  "/stripe/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// ======================================================
// BODY PARSER
// ======================================================

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ======================================================
// ROUTES
// ======================================================

app.use("/", router);

// ======================================================
// DATABASE
// ======================================================

await connectDB();
await defaultData();

// ======================================================
// SERVER
// ======================================================

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;