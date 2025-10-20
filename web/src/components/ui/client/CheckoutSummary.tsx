"use client";

import { useTranslations } from "next-intl";
import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import { useRouter } from "next/navigation";

function CheckoutSummary() {
  const router = useRouter();
  const t = useTranslations("checkout.SUMARY");
  

  const onSubmit = () => {
    alert("Order placed! (mock)");
    router.push("/order-confirmation");
  };

  return (
    <div className="space-y-3 bg-white rounded-lg border p-4 shadow-sm">
      <div className="pt-2 font-semibold flex justify-between">
        <span>{t("ALL_IN_ALL")}</span>
        <span>{formatPriceAMD(0)}</span>
      </div>
      <button
        className="w-full bg-brand text-white py-2 rounded hover:opacity-90 transition"
        onClick={onSubmit}>
        {t("CHECKOUT")}
      </button>
    </div>
  );
}

export default CheckoutSummary;
