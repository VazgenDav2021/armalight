import crypto from "crypto";
import { User } from "../models/User.js";
import { emailService } from "./email.service.js";

export const userService = {
  async register(data) {
    const code = crypto.randomInt(100000, 999999).toString();
    const user = await User.create({
      ...data,
      verificationCode: code,
      isVerified: false,
    });

    await emailService.sendVerificationEmail(user.email, code);

    return user;
  },

  async findByEmail(email) {
    return User.findOne({ email });
  },

  async findById(id) {
    return User.findById(id);
  },

  async verifyEmail(email, code) {
    const user = await User.findOne({ email });
    if (!user || user.verificationCode !== code) return null;
    user.isVerified = true;
    user.verificationCode = null;
    await user.save();
    return user;
  },

  async forgotPassword(email) {
    1;
    const token = crypto.randomBytes(32).toString("hex");
    const user = await User.findOneAndUpdate(
      { email },
      { resetToken: token, resetTokenExp: Date.now() + 1000 * 60 * 15 },
      { new: true }
    );
    if (user) {
      await emailService.sendPasswordResetEmail(user.email, token);
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
      if (data[key] !== undefined) updateData[key] = data[key];
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) throw new Error("User not found");

    const { password, ...userData } = user.toObject();
    return userData;
  },
};
