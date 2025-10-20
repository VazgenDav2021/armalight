"use client";

import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import { useTranslations } from "next-intl";

export default function CartSummary() {
  const t = useTranslations("cart");

  return (
    <div className="bg-white border rounded-lg p-6 shadow space-y-4 text-[#565656]">
      <div className="flex justify-between font-semibold text-lg">
        <span> {t("SUMARY.ALL_IN_ALL")}</span>
        <span>{formatPriceAMD(0)}</span>
      </div>

      <a
        href="/checkout"
        className="w-full text-center block bg-brand text-white py-2 rounded hover:opacity-90 transition">
        <span> {t("SUMARY.CHECKOUT")}</span>
      </a>
    </div>
  );
}
