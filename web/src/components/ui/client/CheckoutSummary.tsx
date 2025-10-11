import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useCart } from "@/lib/cart/store";

function CheckoutSummary({ onSubmit }: { onSubmit: () => void }) {
  const t = useTranslations("checkout.SUMARY");
  const { items } = useCart();
  const total = useMemo(
    () => items.reduce((a, i) => a + i.qty * i.price, 0),
    [items]
  );

  const delivery = total > 0 ? 5 : 0;
  const grandTotal = total + delivery;

  return (
    <div className="space-y-3 bg-white rounded-lg border p-4 shadow-sm">
      <h2 className="text-lg font-semibold">{t("TITLE")}</h2>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            {t("ITEMS")} ({items.length})
          </span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>{t("DELIVER")}</span>
          <span>${delivery}</span>
        </div>
      </div>
      <div className="border-t pt-2 font-semibold flex justify-between">
        <span>{t("ALL_IN_ALL")}</span>
        <span>${grandTotal.toFixed(2)}</span>
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
