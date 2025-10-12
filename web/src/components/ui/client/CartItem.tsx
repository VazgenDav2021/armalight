"use client";

import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import TrashIcon from "@/icons/TrashIcon";
import { useCart } from "@/lib/cart/store";
import { CartItem as CartItemType } from "@/lib/types";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQty, removeItem } = useCart();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border p-3 rounded-lg">
      <img
        src={`/common/${item.image[0]}`}
        alt={item.name}
        className="w-20 h-20 object-cover rounded mx-auto sm:mx-0"
      />
      <div className="flex-1 text-center sm:text-left">
        <div className="text-[#565656] truncate sm:max-w-[315px]">
          {item.name}
        </div>
      </div>
      <div className="flex items-center justify-center sm:justify-start gap-2">
        <button
          className="px-2 border rounded-full text-[#565656]"
          onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}>
          –
        </button>
        <span className="text-[#565656]">{item.qty}</span>
        <button
          className="px-2 border rounded-full text-[#565656]"
          onClick={() => updateQty(item._id, item.qty + 1)}>
          +
        </button>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-32 text-[#565656] gap-2">
        <button
          onClick={() => removeItem(item._id)}
          className="p-1 hover:opacity-70 transition"
          aria-label="Удалить товар">
          <TrashIcon width={20} height={20} />
        </button>
        <div className="font-medium">
          {formatPriceAMD(item.price * item.qty)}
        </div>
      </div>
    </div>
  );
}
