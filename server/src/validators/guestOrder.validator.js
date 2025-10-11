import { z } from "zod";

export const guestOrderSchema = z.object({
  body: z.object({
    name: z.string().min(2),
    email: z.string().email().optional(),
    phone: z.string().min(6),
    items: z
      .array(
        z.object({
          productId: z.string(),
          quantity: z.number().min(1),
        })
      )
      .nonempty(),
  }),
});
