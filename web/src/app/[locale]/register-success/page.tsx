import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useTranslations } from "next-intl";
import { makeGenerateMetadata } from "@/app/utils/seo";

export const generateMetadata = makeGenerateMetadata({
  namespace: "registerSuccess",
  baseUrl: "https://armlight.hy",
  routePath: "/sign-in",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

const RegisterSuccessPage = () => {
  const t = useTranslations("registerSuccess");

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col items-center rounded-lg p-8 shadow">
        <Image src="/common/Success.svg" alt="Success" width={80} height={80} />

        <p className="mt-2 text-[16px] font-normal text-[#565656] text-center">
          {t("message")}
        </p>

        <Link
          href="/sign-in"
          className="mt-8 w-full rounded-md bg-brand py-3 text-center text-white text-base font-medium hover:bg-brand/90 focus:ring-2 focus:ring-brand focus:ring-offset-2">
          {t("signIn")}
        </Link>
      </div>
    </div>
  );
};

export default RegisterSuccessPage;
