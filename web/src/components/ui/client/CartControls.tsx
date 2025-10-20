"use client";

import { useState, useEffect } from "react";
import CartDrawer from "./CartDrawer";
import { useRouter } from "next/navigation";
import { cartService } from "@/services/cartService";
import { LocalizedProduct } from "@/types";

interface Props {
  product: LocalizedProduct;
}

export default function CartControls({ product }: Props) {
  const [count, setCount] = useState(0); // текущее количество в корзине
  const [drawerProduct, setDrawerProduct] = useState<null | LocalizedProduct>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [inputCount, setInputCount] = useState(0);
  const router = useRouter();

  // Получаем текущее количество из корзины
  useEffect(() => {
    const fetchCart = async () => {
      const cart = await cartService.getCart();
      const item = cart.items.find((i) => i.productId === product._id);
      if (item) {
        setCount(item.quantity);
        setInputCount(item.quantity);
      }
    };
    fetchCart();
  }, [product._id]);

  const handleUpdateCart = async () => {
    try {
      setLoading(true);
      await cartService.updateItem({
        productId: product._id,
        quantity: inputCount, // если 0 — товар будет удалён
      });
      setCount(inputCount);
      setEditing(false);

      // Открываем Drawer при любом обновлении количества > 0
      if (inputCount > 0) {
        setDrawerProduct(product);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = () => setInputCount(Math.max(0, inputCount - 1));
  const handleIncrease = () => setInputCount(inputCount + 1);
  const handleAddToCart = () => handleUpdateCart();

  return (
    <div className="flex items-center gap-3">
      {count === 0 && !editing && (
        <button
          className="border border-gray-300 text-white py-2 px-4 rounded bg-brand whitespace-nowrap"
          onClick={() => setEditing(true)}>
          Добавить в корзину
        </button>
      )}

      {(editing || count > 0) && (
        <div className="flex items-center gap-2 border rounded py-2 px-3">
          <button
            className="px-3 py-1 text-lg font-bold"
            onClick={handleDecrease}
            disabled={loading}>
            –
          </button>
          <input
            type="number"
            min={0}
            value={inputCount}
            onChange={(e) => setInputCount(Number(e.target.value))}
            className="w-12 text-center border rounded"
            disabled={loading}
          />
          <button
            className="px-3 py-1 text-lg font-bold"
            onClick={handleIncrease}
            disabled={loading}>
            +
          </button>
          <button
            className="border border-gray-300 text-white py-2 px-4 rounded bg-brand"
            onClick={handleAddToCart}
            disabled={loading}>
            Добавить
          </button>
        </div>
      )}

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
