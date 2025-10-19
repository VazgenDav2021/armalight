"use client";

import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useCart } from "@/lib/cart/store";
import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import { useRouter } from "next/navigation";

function CheckoutSummary() {
  const { clear, user } = useCart();
  const router = useRouter();
  const t = useTranslations("checkout.SUMARY");
  const { items } = useCart();
  const total = useMemo(
    () => items.reduce((a, i) => a + i.qty * i.price, 0),
    [items]
  );

  const onSubmit = () => {
    alert("Order placed! (mock)");
    clear();
    router.push("/order-confirmation");
  };

  return (
    <div className="space-y-3 bg-white rounded-lg border p-4 shadow-sm">
      <div className="pt-2 font-semibold flex justify-between">
        <span>{t("ALL_IN_ALL")}</span>
        <span>{formatPriceAMD(total)}</span>
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
