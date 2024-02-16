import express from "express";
import dotenv from "dotenv";
import connectToDb from "./config/db.js";
import ProductRoutes from "./routes/products.js";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/api/products", ProductRoutes);

try {
  connectToDb().then();

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
} catch (error) {
  console.log("Error");
}
