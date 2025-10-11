import { ProductLocale } from "@/services/productService";
import ProductCard from "./ProductCard";
import Skeleton from "./Skeleton";
import { Locale } from "@/navigation";

export default function SearchResult({
  products,
  isLoading,
  pagination,
}: {
  products: ProductLocale<Locale>[];
  isLoading: boolean;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    basePath: string;
  };
}) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full py-12">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton key={i} className="h-72" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="w-full py-12 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Ничего не найдено</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((p) => (
          <ProductCard key={p._id} product={p} />
        ))}
      </div>
      {pagination && (
        <div className="flex items-center justify-center gap-2">
          {Array.from(
            { length: Math.ceil(pagination.total / pagination.pageSize) },
            (_, i) => i + 1
          ).map((n) => (
            <a
              key={n}
              className={`px-3 py-1 border rounded ${
                n === pagination.page ? "bg-gray-100" : ""
              }`}
              href={`${pagination.basePath}?page=${n}`}>
              {n}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
