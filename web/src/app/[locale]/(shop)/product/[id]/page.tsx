import Navbar from "@/components/layout/Navbar";
import Breadcrumb from "@/components/ui/client/Breadcrumb";
import ProductDetails from "@/components/ui/client/ProductDetails";
import { Locale } from "@/navigation";
import { ProductLocale, productService } from "@/services/productService";

interface ProductPageProps {
  params: { id: string; locale: Locale };
}

export default async function ProductPage({ params: { id, locale } }: ProductPageProps) {
  let product: null | ProductLocale<Locale> = null;

  try {
    product = await productService.getProductById(id, locale);
  } catch (error) {
    console.error("Ошибка при загрузке товара:", error);
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

  const crumbs = [
    { title: "Главная", url: "/" },
    { title: "Категория", url: `/category/${product.categoryId}` },
    { title: product.name },
  ];

  return (
    <>
      <Navbar locale={locale} />
      <div className="container max-w-[1220px] py-12">
        <Breadcrumb items={crumbs} />
        <ProductDetails product={product} />
      </div>
    </>
  );
}
