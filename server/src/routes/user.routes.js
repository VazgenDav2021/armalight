import { Router } from "express";
import validate from "../middlewares/validate.js";
import auth from "../middlewares/auth.js";
import { userController } from "../controllers/user.controller.js";
import {
  updateUserSchema,
  addCardSchema,
  removeCardSchema,
  resetPasswordSchema,
} from "../validators/user.validator.js";

const router = Router();

router.get("/users/me", auth, userController.getProfile);
router.patch(
  "/users/me",
  auth,
  validate(updateUserSchema),
  userController.updateProfile
);
router.post(
  "/users/cards",
  auth,
  validate(addCardSchema),
  userController.addCard
);
router.delete(
  "/users/cards",
  auth,
  validate(removeCardSchema),
  userController.removeCard
);
router.post(
  "/users/reset-password",
  auth,
  validate(resetPasswordSchema),
  userController.resetPassword
);

export default router;
