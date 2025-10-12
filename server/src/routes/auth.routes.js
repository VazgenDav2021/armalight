import { Router } from "express";
import validate from "../middlewares/validate.js";
import {
  registerSchema,
  verifySchema,
  loginSchema,
  forgotSchema,
  resetSchema,
  updateProfileSchema,
} from "../validators/auth.validator.js";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/auth/register",
  validate(registerSchema),
  authController.register
);
router.post("/auth/login", validate(loginSchema), authController.login);
router.post("/auth/logout", authController.logout);
router.put(
  "/auth/me",
  validate(updateProfileSchema),
  authController.updateProfile
);
router.get("/auth/me", authController.getMe);
router.post(
  "/auth/forgot-password",
  validate(forgotSchema),
  authController.forgotPassword
);
router.post(
  "/auth/reset-password",
  validate(resetSchema),
  authController.resetPassword
);

export default router;
