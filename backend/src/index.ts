import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./services/productService";
import cartRoute from "./routes/cartRoute";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const allowedOrigins = [
  'https://e-commerce-mern-lake.vercel.app',
  'http://localhost:5173'
];

app.use(cors({
  origin: function (origin, callback) {
    console.log('Origin:', origin); // Debugging log
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error('Not allowed by CORS:', origin); // Debugging log
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

const { DATABASE_URL, DATABASE_URL_PRODUCTION, NODE_ENV } = process.env;

if (!DATABASE_URL || !DATABASE_URL_PRODUCTION) {
  console.error("Missing required database environment variables.");
  process.exit(1);
}

const URI = NODE_ENV === 'production' ? DATABASE_URL_PRODUCTION : DATABASE_URL;

mongoose
  .connect(URI)
  .then(() => {
    console.log("Mongo connected!");
    seedInitialProducts(); // Ensure seeding happens after DB is connected
  })
  .catch((err) => console.log("Failed to connect!", err));

app.use("/user", (req, res, next) => {
  console.log("Request Body:", req.body);
  next();
}, userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});