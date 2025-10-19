import { z } from "zod";
import { Locale } from "@/navigation";
import { getErrorMessage } from "./messages";

export const contactFormSchema = z.object({
  name: z.string().min(1, "required"),
  email: z.string().email("invalidEmail").min(1, "required"),
  phone: z.string().min(1, "required"),
  message: z.string().min(1, "required"),
});

export const validateContactForm = (
  data: { name: string; email: string; phone?: string; message: string },
  locale: Locale
) => {
  try {
    contactFormSchema.parse(data);
    return { valid: true, errors: {} as Record<string, string> };
  } catch (err) {
    const errors: Record<string, string> = {};
    if (err instanceof z.ZodError) {
      err.errors.forEach((e) => {
        if (e.path[0]) {
          const code = e.message; // в Zod мы указали "required", "invalidEmail" и т.д.
          errors[e.path[0] as string] = getErrorMessage(code, locale);
        }
      });
    }
    return { valid: false, errors };
  }
};
