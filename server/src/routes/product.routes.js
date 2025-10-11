import { Router } from "express";
import { productController } from "../controllers/product.controller.js";
import auth from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";

const router = Router();

router.post(
  "/products",
  auth,
  validate(createProductSchema),
  productController.createProduct
);

router.get("/products/best-seller", productController.getBestSellerProducts);
router.get("/products", productController.getAllProducts);
router.get("/products/:id", productController.getProductById);
router.patch(
  "/products/:id",
  auth,
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete("/products/:id", auth, productController.deleteProduct);

router.get(
  "/categories/:slug/products",
  productController.getProductsByCategory
);


export default router;
