"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocalizedProduct } from "@/types";

type CartDrawerProps = {
  product: LocalizedProduct
  onClose: () => void;
  onGoToCart: () => void;
};

export default function CartDrawer({
  product,
  onClose,
  onGoToCart,
}: CartDrawerProps) {
  const t = useTranslations("common.cartDrawer");

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <div className="w-80 sm:w-96 bg-white h-full shadow-lg p-4 flex flex-col">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">{t("title")}</h2>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <div className="relative w-20 h-20 border rounded overflow-hidden">
            <Image
              src={`/common/product1.svg`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{product.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full bg-brand text-white py-2 rounded"
            onClick={onGoToCart}>
            {t("goToCart")}
          </button>
          <button
            className="w-full border border-gray-300 py-2 rounded"
            onClick={onClose}>
            {t("continueShopping")}
          </button>
        </div>
      </div>
    </div>
  );
}
