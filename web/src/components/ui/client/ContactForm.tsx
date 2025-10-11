"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contact");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Форма успешно отправлена!");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4 w-[-webkit-fill-available]">
      <input
        name="name"
        placeholder={t("form.namePlaceholder")}
        value={form.name}
        onChange={handleChange}
        className="border rounded px-4 py-2"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="email"
          placeholder={t("form.emailPlaceholder")}
          value={form.email}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        />
        <input
          name="phone"
          placeholder={t("form.phonePlaceholder")}
          value={form.phone}
          onChange={handleChange}
          className="border rounded px-4 py-2"
        />
      </div>
      <textarea
        name="message"
        placeholder={t("form.messagePlaceholder")}
        value={form.message}
        onChange={handleChange}
        rows={4}
        className="border rounded px-4 py-2"
      />
      <button
        type="submit"
        className="bg-brand text-white py-2 rounded hover:opacity-90 transition">
        {t("form.submit")}
      </button>
    </form>
  );
}
