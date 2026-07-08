import express from "express";
import connectDB from "./db/db.js";
import defaultData from "./default.js";
import "dotenv/config";
import router from "./routes/routes.js";
import cors from 'cors'
import bodyParser from "body-parser";
import { v4 as uuid } from "uuid";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors())
app.use(bodyParser.json({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',router);

await connectDB();

app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING SUCCESSFULLY ON PORT: http://localhost:${PORT}`);
});

defaultData();

export const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;

