import express from "express";
import connectDB from "./db/db.js";
import defaultData from "./default.js";
import "dotenv/config";
import router from "./routes/routes.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

await connectDB();
await defaultData();

// Start server only when NOT running on Vercel
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;