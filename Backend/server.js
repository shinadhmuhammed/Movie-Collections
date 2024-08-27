import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import Routers from "./Routes/router.js";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const port = process.env.PORT;
const mongoUrl = process.env.MONGOURL;

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.use("/", Routers);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
