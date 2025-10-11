import { z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string().min(2).optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional(),
  }),
});

export const addCardSchema = z.object({
  body: z.object({
    cardNumber: z.string().min(12).max(19),
    expDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/), // MM/YY
    holderName: z.string().min(2),
  }),
});

export const removeCardSchema = z.object({
  body: z.object({
    cardNumber: z.string().min(12).max(19),
  }),
});

export const resetPasswordSchema = z.object({
  body: z.object({
    password: z.string().min(6),
  }),
});
