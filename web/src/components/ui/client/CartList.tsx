"use client";

import { useCart } from "@/lib/cart/store";
import CartItem from "./CartItem";

export default function CartList() {
  const { items } = useCart();

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
}
