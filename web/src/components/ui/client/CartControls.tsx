"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/store";
import CartDrawer from "./CartDrawer";
import { useRouter } from "next/navigation";
import { Locale } from "@/navigation";
import { ProductLocale } from "@/services/productService";

export default function CartControls({ product }: { product: ProductLocale<Locale> }) {
  const { addItem } = useCart();
  const [count, setCount] = useState(0);
  const [drawerProduct, setDrawerProduct] =
    useState<ProductLocale<Locale> | null>(null);
  const router = useRouter();

  const handleAddToCart = () => {
    if (count > 0) {
      for (let i = 0; i < count; i++) {
        addItem(product);
      }
      setDrawerProduct(product);
      setCount(0);
    } else {
      setCount(1);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {count > 0 && (
        <div className="flex items-center border rounded py-2 px-3">
          <button
            className="px-3 py-1 text-lg font-bold"
            onClick={() => setCount((c) => Math.max(1, c - 1))}>
            –
          </button>
          <span className="px-2 font-medium">{count}</span>
          <button
            className="px-3 py-1 text-lg font-bold"
            onClick={() => setCount((c) => c + 1)}>
            +
          </button>
        </div>
      )}

      <button
        className="border border-gray-300 text-white py-2 px-4 rounded bg-brand whitespace-nowrap"
        onClick={handleAddToCart}>
        Добавить в корзину
      </button>

      {drawerProduct && (
        <CartDrawer
          product={drawerProduct}
          onClose={() => setDrawerProduct(null)}
          onGoToCart={() => {
            setDrawerProduct(null);
            router.push("/cart");
          }}
        />
      )}
    </div>
  );
}
