import Image from "next/image";
import dynamic from "next/dynamic";
import { Locale } from "@/navigation";
import { ProductLocale } from "@/services/productService";
import { formatPriceAMD } from "@/app/utils/formatPriceAMD";

const CartControls = dynamic(() => import("./CartControls"), { ssr: false });

export default function ProductDetails({ product }: { product: ProductLocale<Locale> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-8 items-stretch">
      <div className="flex flex-col h-full">
        <div className="relative w-full aspect-[4/3] max-h-[311px] border rounded overflow-hidden mb-4">
          <Image
            src={`/common/${product.image[0]}`}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 flex-grow">
          <div className="relative w-full aspect-[4/3] max-h-[255px] border rounded overflow-hidden">
            <Image
              src={`/common/${product.image[1]}`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative w-full aspect-[4/3] max-h-[255px] border rounded overflow-hidden">
            <Image
              src={`/common/${product.image[2]}`}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <span className="px-2 py-1 text-xs bg-gray-100 rounded w-fit cursor-pointer">
            {product.code}
          </span>
          <div className="text-2xl font-bold text-brand">
            {formatPriceAMD(product.price)}
          </div>

          <div className="bg-white shadow p-4 rounded space-y-2 flex-1">
            {Object.entries(product.technical || {}).map(([key, value]) => (
              <div
                key={key}
                className="flex justify-between text-sm border-b last:border-0 py-1">
                <span className="text-gray-600">{key}</span>
                <span className="font-medium">{value as string}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <CartControls product={product} />
        </div>
      </div>
    </div>
  );
}
