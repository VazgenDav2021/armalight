import React from "react";
import { useTranslations } from "next-intl";
import { makeGenerateMetadata } from "@/lib/seo";

export const generateMetadata = makeGenerateMetadata({
  namespace: "changePassword",
  baseUrl: "https://armlight.hy",
  routePath: "/sign-in",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

const ChangePasswordPage = () => {
  const t = useTranslations("changePassword");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-lg p-8 shadow">
        <h1 className="text-[24px] font-normal leading-[150%] text-[#565656]">
          {t("title")}
        </h1>

        <p className="mt-2 text-sm text-[#565656]">{t("description")}</p>

        <form
          action="/api/auth/change-password"
          method="POST"
          className="mt-10 space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-normal text-[#565656]">
              {t("newPassword")}
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-normal text-[#565656]">
              {t("confirmPassword")}
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              required
              className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-[#565656] focus:border-brand focus:ring-brand"
            />
          </div>

          <button
            type="submit"
            className="mt-10 w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2">
            {t("submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
