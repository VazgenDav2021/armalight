import { Router } from "express";
import validate from "../middlewares/validate.js";
import { guestOrderService } from "../services/guestOrder.service.js";
import { guestOrderSchema } from "../validators/guestOrder.validator.js";

const router = Router();

router.post("/orders/guest", validate(guestOrderSchema), async (req, res) => {
  const order = await guestOrderService.create(req.body);
  res.status(201).json(order);
});

export default router;
