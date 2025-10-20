import express from "express";
import {
  getCart,
  addItem,
  removeItem,
  checkout,
  getOrCreateCart,
  updateCartItem, // новый метод
} from "../controllers/cartController.js";
import { cartMiddleware } from "../middleware/cartMiddleware.js";

const router = express.Router();

// Middleware для обычных операций с корзиной
router.use(cartMiddleware);

// CRUD корзины
router.get("/", getCart);
router.post("/add", addItem);
router.post("/remove", removeItem);
router.post("/checkout", checkout);

// Endpoint для Next.js middleware
router.get("/get-or-create", getOrCreateCart);

// Новый endpoint для добавления/удаления/обновления количества через cartId
router.post("/update-item", updateCartItem);

export default router;
