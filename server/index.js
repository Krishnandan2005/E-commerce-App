import express from "express";
import connectDB from "./db/db.js";
import defaultData from "./default.js";
import "dotenv/config";
import router from "./routes/routes.js";
import cors from "cors";

import { stripeWebhooks } from "./controllers/payment.controller.js";

const app = express();

// ======================================================
// CORS
// ======================================================

app.use(cors());

// ======================================================
// STRIPE WEBHOOK
// IMPORTANT:
// Webhook must come BEFORE express.json()
// because Stripe requires the raw request body.
// ======================================================

app.post(
  "/stripe/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhooks
);

// ======================================================
// BODY PARSER
// ======================================================

app.use(
  express.json()
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================================
// NORMAL API ROUTES
// ======================================================

app.use("/", router);

// ======================================================
// DATABASE
// ======================================================

await connectDB();
await defaultData();

// ======================================================
// START SERVER
// ======================================================

if (!process.env.VERCEL) {
  const PORT =
    process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(
      `Server running on port ${PORT}`
    );
  });
}


export default app;