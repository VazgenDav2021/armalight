import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import { LocalizedProduct } from "@/types";

export default function ProductCard({
  product,
}: {
  product: LocalizedProduct;
}) {
  return (
    <a
      href={`product/${product.name}`}
      className="border rounded-lg overflow-hidden flex flex-col">
      <img
        src={`/common/product1.svg`}
        alt={product.name}
        className="aspect-square object-cover max-h-[242px]"
      />
      <div className="p-3 space-y-1 flex-1">
        <div className="text-xs text-gray-500">{product.sku}</div>
        <div className="font-medium line-clamp-1">{product.name}</div>
        <div className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </div>
        <div className="font-semibold">
          {formatPriceAMD(Number(product.finalPrice))}
        </div>
      </div>
    </a>
  );
}
