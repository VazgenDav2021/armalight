"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { authService } from "@/services/authService";

const ForgotPasswordPage = () => {
  const t = useTranslations("forgotPassword");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error(t("emailRequired"));
      return;
    }

    try {
      setLoading(true);
      await authService.forgotPassword({ email });
      toast.success(t("success"));
      setSent(true);
    } catch (err: any) {
      console.error("Forgot password error:", err);
      toast.error(t("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg p-8 shadow bg-white/80 backdrop-blur">
        <h1 className="text-[24px] font-normal text-center leading-[150%] text-[#565656]">
          {t("title")}
        </h1>

        <p className="mt-2 text-sm text-center text-[#565656]">
          {t("description")}
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} className="mt-12 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-normal text-[#565656]">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-70">
              {loading ? t("loading") : t("submit")}
            </button>
          </form>
        ) : (
          <p className="mt-12 text-center text-[#565656]">{t("checkEmail")}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
