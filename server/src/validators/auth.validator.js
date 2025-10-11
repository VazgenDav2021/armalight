import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const verifySchema = z.object({
  body: z.object({
    email: z.string().email(),
    code: z.string().length(6),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export const forgotSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const resetSchema = z.object({
  body: z.object({
    token: z.string(),
    password: z.string().min(6),
  }),
});

export const updateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2),
    lastName: z.string().optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
  }),
});
