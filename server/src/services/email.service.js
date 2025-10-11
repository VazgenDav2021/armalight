import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.MAIL_HOST,
  port: env.MAIL_PORT,
  secure: env.MAIL_SECURE,
  auth: {
    user: env.MAIL_USER,
    pass: env.MAIL_PASS,
  },
});

export const emailService = {
  async sendMail({ to, subject, html, text }) {
    const info = await transporter.sendMail({
      from: env.MAIL_FROM,
      to,
      subject,
      text,
      html,
    });
    return info;
  },

  async sendVerificationEmail(to, code) {
    const subject = "Verify your ArmShop account";
    const html = `
      <h2>Welcome to ArmShop!</h2>
      <p>Here is your verification code:</p>
      <h3>${code}</h3>
      <p>This code will expire soon. Enter it on the verification page to activate your account.</p>
    `;
    return this.sendMail({ to, subject, html });
  },

  async sendPasswordResetEmail(to, token) {
    const subject = "Reset your ArmShop password";
    const html = `
      <p>Click the link below to reset your password:</p>
      <a href="http://localhost:3000/reset-password?token=${token}">Reset Password</a>
    `;
    return this.sendMail({ to, subject, html });
  },
};
