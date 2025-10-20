import express from "express";
import {
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  getBestSellers,
  getProductByName,
} from "../controllers/productController.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

router.get("/category/:categoryId", getProductsByCategory);
router.get("/best-sellers", getBestSellers);
router.post("/", adminMiddleware, createProduct);
router.put("/:id", adminMiddleware, updateProduct);
router.delete("/:id", adminMiddleware, deleteProduct);
router.get("/by-name", getProductByName);

export default router;
