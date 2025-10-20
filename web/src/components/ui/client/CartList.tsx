"use client";

import CartItem from "./CartItem";
import { CartItem as CartItemTypes } from "@/types";

export default function CartList({ items }: { items: CartItemTypes[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
}
