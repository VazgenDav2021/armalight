import crypto from "crypto";
import { User } from "../models/User.js";
import { emailService } from "./email.service.js";

export const userService = {
  async register(data) {
    const user = await User.create({
      personalData: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
      password: data.password,
      orders: [],
      payment: {},
    });
    return user;
  },

  async findByEmail(email) {
    return User.findOne({ "personalData.email": email });
  },

  async findById(id) {
    return User.findById(id);
  },

  async forgotPassword(email) {
    const token = crypto.randomBytes(32).toString("hex");
    const user = await User.findOneAndUpdate(
      { "personalData.email": email },
      { resetToken: token, resetTokenExp: Date.now() + 1000 * 60 * 15 },
      { new: true }
    );

    if (user) {
      await emailService.sendPasswordResetEmail(email, token);
    }

    return user;
  },

  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExp: { $gt: new Date() },
    });
    if (!user) return null;

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExp = null;
    return user.save();
  },

  async updateProfile(userId, data) {
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
    ];
    const updateData = {};

    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        updateData[`personalData.${key}`] = data[key];
      }
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) throw new Error("User not found");

    const { password, ...userData } = user.toObject();
    return userData;
  },
};
