"use client";

import { useState } from "react";
import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import TrashIcon from "@/icons/TrashIcon";
import { CartItem as CartItemType } from "@/types";
import { cartService } from "@/services/cartService";

export default function CartItem({ item }: { item: CartItemType }) {
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (newQuantity: number) => {
    if (newQuantity < 0 || loading) return;
    setLoading(true);
    try {
      const updatedCart = await cartService.updateItem({
        productId: item._id,
        quantity: newQuantity,
      });
      const updatedItem = updatedCart.items.find((i) => i._id === item._id);
      setQuantity(updatedItem?.quantity || 0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecrease = () => handleUpdate(quantity - 1);
  const handleIncrease = () => handleUpdate(quantity + 1);
  const handleRemove = () => handleUpdate(0);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border p-3 rounded-lg">
      <img
        src={item.images?.[0] || "/common/product1.svg"}
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
          onClick={handleDecrease}
          disabled={loading || quantity === 0}>
          –
        </button>
        <span className="text-[#565656]">{quantity}</span>
        <button
          className="px-2 border rounded-full text-[#565656]"
          onClick={handleIncrease}
          disabled={loading}>
          +
        </button>
      </div>
      <div className="flex items-center justify-between sm:justify-end w-full sm:w-32 text-[#565656] gap-2">
        <button
          className="p-1 hover:opacity-70 transition"
          onClick={handleRemove}
          disabled={loading}
          aria-label="Удалить товар">
          <TrashIcon width={20} height={20} />
        </button>
        <div className="font-medium">
          {formatPriceAMD(item.price * quantity)}
        </div>
      </div>
    </div>
  );
}
