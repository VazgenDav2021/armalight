"use client";

import { Form, Field } from "react-final-form";
import {
  shippingSchema,
  type ShippingFormData,
} from "@/lib/validation/schemas";
import { getErrorMessage } from "@/lib/validation/messages";
import { useLocale, useTranslations } from "next-intl";

const ShippingForm = () => {
  const locale = useLocale() as "hy" | "ru" | "en";
  const t = useTranslations("checkout.SHIPPING");

  const validate = (values: ShippingFormData) => {
    const result = shippingSchema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const err of result.error.errors) {
        const field = String(err.path[0]);
        errors[field] = getErrorMessage(err.message, locale);
      }
      return errors;
    }
    return undefined;
  };

  const onSubmit = (values: ShippingFormData) => {
    console.log("Shipping Data:", values);
    alert("Shipping form submitted ✅");
  };

  return (
    <Form<ShippingFormData> onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-3">
          <h2 className="text-lg font-semibold">{t("TITLE")}</h2>

          <Field name="firstName">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("NAME")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name="lastName">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("SNAME")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name="phone">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("PHONE")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name="city">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("CITY")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name="address">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("ADDRESS")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <Field name="postalCode">
            {({ input, meta }) => (
              <div>
                <input
                  {...input}
                  placeholder={t("POST")}
                  className="border p-2 rounded w-full"
                />
                {meta.touched && meta.error && (
                  <p className="text-red-500 text-sm">{meta.error}</p>
                )}
              </div>
            )}
          </Field>

          <button
            type="submit"
            className="bg-brand text-white py-2 rounded w-full">
            {t("SUBMIT")}
          </button>
        </form>
      )}
    </Form>
  );
};

export default ShippingForm;
