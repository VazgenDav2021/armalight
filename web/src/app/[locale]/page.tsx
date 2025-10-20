"use server";

import Navbar from "@/components/layout/Navbar";
import CategorySection from "@/components/ui/client/CategorySection";
import HeroSection from "@/components/ui/client/HeroSection";
import OurAdvantages from "@/components/ui/client/OurAdvantages";
import OurPartners from "@/components/ui/client/OurPartners";
import QuestionsAnswers from "@/components/ui/client/QuestionsAnswers";
import ProductSlider from "@/components/ui/client/Slider";
import { makeGenerateMetadata } from "@/app/utils/seo";
import { Locale } from "@/navigation";
import { LocalizedProduct } from "@/types";
import { productService } from "@/services/productService";

export const generateMetadata = makeGenerateMetadata({
  namespace: "home",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

export default async function Home({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  let bestSellers: LocalizedProduct[] = [];

  try {
    bestSellers = await productService.getBestSellers<LocalizedProduct[]>({
      locale,
      discount: 10,
    });
  } catch (err) {
    console.error("Error fetching best sellers:", err);
  }

  return (
    <>
      <Navbar locale={locale} />
      <HeroSection />
      <CategorySection locale={locale} />
      <OurAdvantages />
      <ProductSlider products={bestSellers} />
      <OurPartners />
      <QuestionsAnswers />
    </>
  );
}
