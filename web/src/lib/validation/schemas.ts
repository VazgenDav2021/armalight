import { z } from "zod";

// Хелпер для обязательных строк
const required = () => z.string().nonempty({ message: "required" });

// Shipping schema
export const shippingSchema = z.object({
  firstName: required(),
  lastName: required(),
  phone: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^\+?[0-9]{6,15}$/, { message: "invalidPhone" }),
  city: required(),
  address: required(),
  postalCode: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[0-9]{4,10}$/, { message: "invalidPostal" }),
});
export type ShippingFormData = z.infer<typeof shippingSchema>;

// Payment schema
export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .nonempty({ message: "required" })
    .transform((v) => v.replace(/\s+/g, "")), // пробелы убираем
  firstName: required(),
  lastName: required(),
  expiry: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "invalidExpiry" }),
  cvv: z
    .string()
    .nonempty({ message: "required" })
    .regex(/^[0-9]{3,4}$/, { message: "invalidCvv" }),
});
export type PaymentFormData = z.infer<typeof paymentSchema>;
