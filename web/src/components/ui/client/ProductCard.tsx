import { formatPriceAMD } from "@/app/utils/formatPriceAMD";
import { Locale } from "@/navigation";

export default function ProductCard({ product }: { product: null }) {
  return (
    <a
      href={`/product/${"product._id"}`}
      className="border rounded-lg overflow-hidden flex flex-col">
      <img
        src={`/common/${"product.image[0]"}`}
        alt={"product.name"}
        className="aspect-square object-cover max-h-[242px]"
      />
      <div className="p-3 space-y-1 flex-1">
        <div className="text-xs text-gray-500">{"product.code"}</div>
        <div className="font-medium line-clamp-1">{"product.name"}</div>
        <div className="text-sm text-gray-600 line-clamp-2">
          {"product.shortDetails"}
        </div>
        <div className="font-semibold">
          {formatPriceAMD(Number("product.priceWithDiscount"))}
        </div>
      </div>
    </a>
  );
}
