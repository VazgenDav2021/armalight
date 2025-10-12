import { Locale } from "@/navigation";

export type ErrorCode =
  | "required"
  | "invalidPhone"
  | "invalidPostal"
  | "invalidCard"
  | "invalidExpiry"
  | "invalidCvv";

const ALL_CODES = [
  "required",
  "invalidPhone",
  "invalidPostal",
  "invalidCard",
  "invalidExpiry",
  "invalidCvv",
] as const;

export const isErrorCode = (v: string): v is ErrorCode =>
  (ALL_CODES as readonly string[]).includes(v as ErrorCode);

const messages: Record<Locale, Record<ErrorCode, string>> = {
  hy: {
    required: "Պարտադիր դաշտ է",
    invalidPhone: "Մուտքագրեք ճիշտ հեռախոսահամար",
    invalidPostal: "Մուտքագրեք ճիշտ փոստային կոդ",
    invalidCard: "Քարտի համարը սխալ է",
    invalidExpiry: "Ավարտի ամսաթիվը սխալ է",
    invalidCvv: "CVV կոդը սխալ է",
  },
  ru: {
    required: "Обязательное поле",
    invalidPhone: "Введите корректный телефон",
    invalidPostal: "Введите корректный почтовый код",
    invalidCard: "Неверный номер карты",
    invalidExpiry: "Неверная дата окончания",
    invalidCvv: "Неверный CVV код",
  },
  en: {
    required: "This field is required",
    invalidPhone: "Enter a valid phone number",
    invalidPostal: "Enter a valid postal code",
    invalidCard: "Invalid card number",
    invalidExpiry: "Invalid expiry date",
    invalidCvv: "Invalid CVV",
  },
};

export function getErrorMessage(code: ErrorCode | string, locale: Locale) {
  const str = String(code).trim();
  const canonical = (ALL_CODES as readonly string[]).find(
    (c) => c.toLowerCase() === str.toLowerCase()
  );
  if (canonical) {
    return messages[locale][canonical as ErrorCode];
  }
  return str;
}

