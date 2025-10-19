import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/ui/client/Breadcrumb";
import ProductDetails from "@/components/ui/client/ProductDetails";
import { Locale } from "@/navigation";

interface ProductPageProps {
  params: { id: string; locale: Locale };
}

export default async function ProductPage({
  params: { id, locale },
}: ProductPageProps) {
  let product = null;

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
