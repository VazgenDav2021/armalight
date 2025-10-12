// user.controller.ts
import { userService } from "../services/user.service.js";

export const userController = {
  async getProfile(req, res) {
    try {
      const user = await userService.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const {
        password,
        resetToken,
        resetTokenExp,
        verificationCode,
        ...userData
      } = user.toObject();
      res.json(userData);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async updateProfile(req, res) {
    try {
      const user = await userService.updateProfile(req.user.id, req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async addCard(req, res) {
    try {
      const user = await userService.addCard(req.user.id, req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async removeCard(req, res) {
    try {
      const user = await userService.removeCard(
        req.user.id,
        req.body.cardNumber
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },

  async resetPassword(req, res) {
    try {
      const user = await userService.resetPasswordById(
        req.user.id,
        req.body.password
      );
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
};
