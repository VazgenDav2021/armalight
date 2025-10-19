"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const t = useTranslations("resetPassword");
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error(t("invalidLink"));
      router.push("/sign-in");
    }
  }, [token, router, t]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirm) {
      toast.error(t("passwordsMismatch"));
      return;
    }
    try {
      setLoading(true);
      toast.success(t("success"));
      router.push("/sign-in");
    } catch (err) {
      console.error("Reset password error:", err);
      toast.error(t("error"));
    } finally {
      setLoading(false);
      router.push("/account")
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

        <form onSubmit={handleSubmit} className="mt-12 space-y-6">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-normal text-[#565656]">
              {t("newPassword")}
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-normal text-[#565656]">
              {t("confirmPassword")}
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-70">
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
