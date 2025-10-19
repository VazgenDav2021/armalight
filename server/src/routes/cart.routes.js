import { Router } from "express";
import { cartController } from "../controllers/cart.controller.js";
import { identifyUser } from "../middlewares/identifyUser.js";

const router = Router();

router.use(identifyUser);
router.get("/", cartController.getCart);
router.post("/add", cartController.addItem);
router.put("/update", cartController.updateQty);
router.delete("/remove/:productId", cartController.removeItem);
router.delete("/clear", cartController.clearCart);

export default router;
