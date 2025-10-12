import SearchResult from "@/components/ui/client/SearchResult";
import CategoryHeader from "@/components/ui/client/CategoryHeader";
import { getTranslations } from "next-intl/server";
import { makeGenerateMetadata } from "@/lib/seo";
import { productService } from "@/services/productService";
import { Locale } from "@/navigation";

type Props = {
  params: { slug: string; locale: "hy" | "en" | "ru" };
  searchParams: { page?: string; q?: string; min?: string; max?: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug, locale } = params;

  const base = makeGenerateMetadata({
    namespace: "category",
    baseUrl: "https://armlight.hy",
    routePath: `/category/${slug}`,
    siteName: "ArmLight",
    imagePath: "/og-image.jpg",
    locales: ["hy", "en", "ru"],
  })({ params: { locale } });

  const category = { name: "Example" };

  const t = await getTranslations({ locale, namespace: "category" });
  const name = category?.name ?? slug;

  return {
    ...base,
    title: t("metadata.TITLE", { name }),
    description: t("metadata.DESCRIPTION", { name }),
    keywords: t("metadata.KEYWORDS", { name })
      .split(",")
      .map((k: string) => k.trim()),
    openGraph: {
      title: t("metadata.OG_TITLE", { name, site: "ArmLight" }),
      description: t("metadata.OG_DESCRIPTION", { name }),
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { slug: string; locale: string };
  searchParams: { page?: string; q?: string; min?: string; max?: string };
}) {
  const page = Number(searchParams?.page ?? 1);
  const pageSize = 12;
  const { locale } = await params;

  const q = searchParams?.q || undefined;
  const minPrice = searchParams?.min ? Number(searchParams.min) : undefined;
  const maxPrice = searchParams?.max ? Number(searchParams.max) : undefined;

  const category = { name: "Example" };

  const products = await productService.getProductsByCategory({
    slug: params.slug,
    page,
    pageSize,
    q,
    minPrice,
    maxPrice,
    locale: locale as Locale,
  });

  const crumbs = [
    { title: "Главная", url: "/" },
    { title: category?.name || "Категория" },
  ];

  return (
    <>
      <CategoryHeader crumbs={crumbs} />
      <SearchResult
        products={products.items}
        isLoading={false}
        pagination={{
          page,
          pageSize,
          total: products.total,
          basePath: `/${params.locale}/category/${params.slug}`,
        }}
      />
    </>
  );
}
