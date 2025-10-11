import { z } from "zod";

export const createMessageSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    phone: z.string().min(6),
    email: z.string().email(),
    message: z.string().min(5),
  }),
});

export const updateMessageSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().min(6).optional(),
    email: z.string().email().optional(),
    message: z.string().min(5).optional(),
    isRead: z.boolean().optional(),
  }),
});
