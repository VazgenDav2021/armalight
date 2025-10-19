import { Router } from "express";
import notFound from "../middlewares/notFound.js";
import errorHandler from "../middlewares/errorHandler.js";
import { apiLimiter } from "../middlewares/rateLimiter.js";

import authRoutes from "./auth.routes.js";
import userRoutes from "./user.routes.js";
import guestOrderRoutes from "./guestOrder.routes.js";
import messageRoutes from "./message.routes.js";
import productRoutes from "./product.routes.js"; 
import cartRoutes from "./cart.routes.js"; 

const router = Router();

router.use(apiLimiter);
router.use(cartRoutes);

router.use(authRoutes);
router.use(userRoutes);
router.use(guestOrderRoutes);
router.use(messageRoutes);
router.use(productRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;
