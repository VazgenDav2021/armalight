"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { messageService } from "@/services/messageService";
import toast from "react-hot-toast";
import { validateContactForm } from "@/lib/validation/contactFormValidation";
import { Locale } from "@/navigation";

export default function ContactForm() {
  const t = useTranslations("contact");
  const locale = useLocale();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { valid, errors: validationErrors } = validateContactForm(
      form,
      locale as unknown as Locale
    );

    if (!valid) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      await messageService.create({
        name: form.name,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      toast.success(t("form.successMessage"));
      setForm({ name: "", email: "", phone: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      toast.error(t("form.errorMessage"));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "border rounded px-4 py-2 w-full disabled:opacity-60 transition";

  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-[-webkit-fill-available]">
      <div>
        <input
          name="name"
          placeholder={t("form.namePlaceholder")}
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          className={`${inputClass} ${errors.name ? "border-red-500" : ""}`}
        />
        {errors.name && <div className={errorClass}>{errors.name}</div>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input
            name="email"
            placeholder={t("form.emailPlaceholder")}
            value={form.email}
            onChange={handleChange}
            disabled={loading}
            className={`${inputClass} ${errors.email ? "border-red-500" : ""}`}
          />
          {errors.email && <div className={errorClass}>{errors.email}</div>}
        </div>

        <div>
          <input
            name="phone"
            placeholder={t("form.phonePlaceholder")}
            value={form.phone}
            onChange={handleChange}
            disabled={loading}
            className={`${inputClass} ${errors.phone ? "border-red-500" : ""}`}
          />
          {errors.phone && <div className={errorClass}>{errors.phone}</div>}
        </div>
      </div>

      <div>
        <textarea
          name="message"
          placeholder={t("form.messagePlaceholder")}
          value={form.message}
          onChange={handleChange}
          rows={4}
          disabled={loading}
          className={`${inputClass} ${errors.message ? "border-red-500" : ""}`}
        />
        {errors.message && <div className={errorClass}>{errors.message}</div>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-brand text-white py-2 rounded hover:opacity-90 transition disabled:opacity-60">
        {loading ? t("form.sending") : t("form.submit")}
      </button>
    </form>
  );
}
