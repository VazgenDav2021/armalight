import { Router } from "express";
import { messageController } from "../controllers/message.controller.js";
import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";
import {
  createMessageSchema,
  updateMessageSchema,
} from "../validators/message.validator.js";

const router = Router();

router.post(
  "/messages",
  validate(createMessageSchema),
  messageController.create
);

router.get("/messages", auth, messageController.getAll);
router.get("/messages/:id", auth, messageController.getOne);
router.patch(
  "/messages/:id",
  auth,
  validate(updateMessageSchema),
  messageController.update
);
router.delete("/messages/:id", auth, messageController.remove);

export default router;
