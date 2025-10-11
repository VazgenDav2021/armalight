import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const schema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().default(5000),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  CORS_ORIGIN: z.union([z.string(), z.array(z.string())]).default("*"),

  MAIL_HOST: z.string().min(1, "MAIL_HOST is required"),
  MAIL_PORT: z.coerce.number().default(1025),
  MAIL_USER: z.string().min(1, "MAIL_USER is required"),
  MAIL_PASS: z.string().min(1, "MAIL_PASS is required"),
  MAIL_FROM: z.string().default("ArmShop <no-reply@armshop.local>"),
  MAIL_SECURE: z
    .union([z.string(), z.boolean()])
    .transform((val) => val === "true" || val === true)
    .default(false),
});

const parsed = schema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CORS_ORIGIN: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim())
    : "*",

  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASS: process.env.MAIL_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_SECURE: process.env.MAIL_SECURE,
});

if (!parsed.success) {
  console.error("❌ Invalid environment variables:", parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
