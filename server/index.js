import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config(); // .env faylni o‘qish
connectDB(); // MongoDB’ga ulanish

const app = express();

// Middlewares
app.use(cors()); // CORS uchun
app.use(express.json()); // JSON body parsing

// Routes
app.use("/api/products-api", productRoutes);

// 404 Not Found middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Sahifa topilmadi" });
});

// Global xatolik tutuvchi middleware
app.use((err, req, res, next) => {
  res.status(500).json({ message: "Server xatosi", error: err.message });
});

// Serverni ishga tushirish
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT}-portda ishga tushdi`);
});
