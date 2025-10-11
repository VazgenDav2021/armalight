"use client";

import { useCart } from "@/lib/cart/store";
import { useTranslations } from "next-intl";

export default function CartSummary() {
  const { items } = useCart();
  const t = useTranslations("cart");
  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0);
  const delivery = total > 0 ? 5 : 0;
  const grandTotal = total + delivery;

  return (
    <div className="bg-white border rounded-lg p-6 shadow space-y-4 text-[#565656]">
      <h2 className="text-lg font-semibold">{t("SUMARY.TITLE")}</h2>

      <div className="flex justify-between text-sm">
        <span>
          {t("SUMARY.ITEMS")} ({items.length})
        </span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span> {t("SUMARY.DELIVER")}</span>
        <span>${delivery.toFixed(2)}</span>
      </div>

      <hr />

      <div className="flex justify-between font-semibold text-lg">
        <span> {t("SUMARY.ALL_IN_ALL")}</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>

      <a
        href="/checkout"
        className="w-full text-center block bg-brand text-white py-2 rounded hover:opacity-90 transition">
        <span> {t("SUMARY.CHECKOUT")}</span>
      </a>
    </div>
  );
}
