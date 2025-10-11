import { userService } from "../services/user.service.js";

export const userController = {
  async getProfile(req, res) {
    const user = await userService.findById(req.user.id);
    res.json(user);
  },

  async updateProfile(req, res) {
    const user = await userService.update(req.user.id, req.body);
    res.json(user);
  },

  async addCard(req, res) {
    const updated = await userService.addCard(req.user.id, req.body);
    res.json(updated);
  },

  async removeCard(req, res) {
    const updated = await userService.removeCard(
      req.user.id,
      req.body.cardNumber
    );
    res.json(updated);
  },

  async resetPassword(req, res) {
    const updated = await userService.resetPassword(
      req.user.id,
      req.body.password
    );
    res.json(updated);
  },
};
