import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { makeGenerateMetadata } from "@/lib/seo";

export const generateMetadata = makeGenerateMetadata({
  namespace: "changePasswordSuccess",
  baseUrl: "https://armlight.hy",
  routePath: "/sign-in",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

const ChangePasswordSuccessPage = () => {
  const t = useTranslations("changePasswordSuccess");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="flex w-full max-w-md flex-col items-center rounded-lg p-8 shadow text-center">
        <Image src="/common/success.svg" alt="Success" width={80} height={80} />
        <p className="mt-2 text-base font-normal text-[#565656]">
          {t("message")}
        </p>
        <Link
          href="/sign-in"
          className="mt-8 w-full rounded-md bg-brand py-3 text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2 text-center">
          {t("signIn")}
        </Link>
      </div>
    </div>
  );
};

export default ChangePasswordSuccessPage;
