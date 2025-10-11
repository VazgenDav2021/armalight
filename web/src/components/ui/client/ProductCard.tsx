"use client";
import { useCart } from "@/lib/cart/store";
import { Locale } from "@/navigation";
import { ProductLocale } from "@/services/productService";

export default function ProductCard({ product }: { product: ProductLocale<Locale> }) {
  const { addItem, decreaseItem, items } = useCart();
  const cartItem = items.find((i) => i._id === product._id);
  const count = cartItem?.qty || 0;

  return (
    <a
      href={`/product/${product._id}`}
      className="border rounded-lg overflow-hidden flex flex-col">
      <img
        src={`/common/${product.image[0]}`}
        alt={product.name}
        className="aspect-square object-cover max-h-[242px]"
      />
      <div className="p-3 space-y-1 flex-1">
        <div className="text-xs text-gray-500">{product.code}</div>
        <div className="font-medium line-clamp-1">{product.name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">
          {product.shortDetails}
        </div>
        <div className="font-semibold">${product.price.toFixed(2)}</div>
      </div>

      <div className="p-3 pt-0">
        {count === 0 ? (
          <button
            className="px-4 py-2 rounded-[50%] border border-[#D1D1D1] bg-transparent text-lg font-bold"
            onClick={() => addItem(product)}>
            +
          </button>
        ) : (
          <div className="flex items-center gap-4 py-2 px-3">
            <button
              className="px-4 py-2 rounded-[50%] border border-[#D1D1D1]"
              onClick={() => decreaseItem(product._id)}>
              –
            </button>
            <span className="font-medium">{count}</span>
            <button
              className="px-4 py-2 rounded-[50%] border border-[#D1D1D1]"
              onClick={() => addItem(product)}>
              +
            </button>
          </div>
        )}
      </div>
    </a>
  );
}
