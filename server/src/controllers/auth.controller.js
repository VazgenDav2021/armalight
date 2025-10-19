import { userService } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const authController = {
  async register(req, res) {
    try {
      const user = await userService.register(req.body);
      const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
      res.status(201).json({
        message:
          "User registered successfully. Check your email for the verification code.",
      });
    } catch (err) {
      console.error("Registration error:", err);
      res.status(500).json({ error: "Registration failed" });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;
    const user = await userService.findByEmail(email);
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, { httpOnly: true, sameSite: "lax" });
    res.json({ message: "Logged in successfully" });
  },

  async logout(req, res) {
    try {
      res.cookie("token", "", {
        httpOnly: true,
        sameSite: "lax",
        expires: new Date(0),
        path: "/",
      });
      res.json({ message: "Logged out successfully" });
    } catch (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: "Logout failed" });
    }
  },

  async forgotPassword(req, res) {
    await userService.forgotPassword(req.body.email);
    res.json({ message: "Reset token sent to your email" });
  },

  async resetPassword(req, res) {
    const { token, password } = req.body;
    const user = await userService.resetPassword(token, password);
    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });
    res.json({ message: "Password updated successfully" });
  },

  async getMe(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Not authenticated" });

      const decoded = jwt.verify(token, env.JWT_SECRET);
      
      const user = await userService.findById(decoded.id);

      if (!user) return res.status(404).json({ error: "User not found" });
      const { password, ...userData } = user.toObject();

      res.json(userData);
    } catch (err) {
      console.error("GetMe error:", err);
      res.status(401).json({ error: "Invalid token" });
    }
  },

  async updateProfile(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Not authenticated" });

      const decoded = jwt.verify(token, env.JWT_SECRET);
      const userId = decoded.id;

      const updatedUser = await userService.updateProfile(userId, req.body);
      res.json({ message: "Profile updated successfully", user: updatedUser });
    } catch (err) {
      console.error("Update profile error:", err);
      res
        .status(400)
        .json({ error: err.message || "Could not update profile" });
    }
  },
};
