import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  toggleLikeProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Barcha mahsulotlar va mahsulot qo‘shish
router.route("/").get(getProducts).post(addProduct);

// ID orqali mahsulotni olish, yangilash, o‘chirish
router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

// Like toggle qilish uchun PATCH route
router.patch("/:id/like", toggleLikeProduct);

export default router;
