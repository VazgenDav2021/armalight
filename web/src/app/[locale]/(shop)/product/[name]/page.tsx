import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/ui/client/Breadcrumb";
import ProductDetails from "@/components/ui/client/ProductDetails";
import { Locale } from "@/navigation";
import { productService } from "@/services/productService";
import { LocalizedProduct } from "@/types";

interface ProductPageProps {
  params: { name: string; locale: Locale };
}

export default async function ProductPage({
  params: { name, locale },
}: ProductPageProps) {
  let product: LocalizedProduct | null = null;

  try {
    product = await productService.getProductByName<LocalizedProduct>({
      name,
      locale,
    });
  } catch (err) {
    console.error("Product not found:", err);
  }

  if (!product) {
    return (
      <div className="container max-w-[1220px] py-12">
        <Breadcrumb
          items={[{ title: "Главная", url: "/" }, { title: "Товар не найден" }]}
        />
        <p className="text-center text-gray-500 mt-12">Товар не найден</p>
      </div>
    );
  }

  return (
    <>
      <Navbar locale={locale} />
      <div className="container max-w-[1220px] py-12">
        <ProductDetails product={product} />
      </div>
    </>
  );
}
