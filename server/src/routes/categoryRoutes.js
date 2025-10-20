import express from "express";
import {
  getCategories,
  createCategory,
} from "../controllers/categoryController.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

router.get("/", getCategories);
router.post("/", adminMiddleware, createCategory);

export default router;
