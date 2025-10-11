"use server";

import BestSellerSection from "@/components/ui/client/BestSellerSection";
import CategorySection from "@/components/ui/client/CategorySection";
import HeroSection from "@/components/ui/client/HeroSection";
import OurAdvantages from "@/components/ui/client/OurAdvantages";
import OurPartners from "@/components/ui/client/OurPartners";
import QuestionsAnswers from "@/components/ui/client/QuestionsAnswers";
import ProductSlider from "@/components/ui/client/Slider";
import { makeGenerateMetadata } from "@/lib/seo";
import { Locale } from "@/navigation";
import { productService } from "@/services/productService";
import { getTranslations } from "next-intl/server";

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
  const products = await productService.getBestSellerProducts(locale);
  const t = await getTranslations({ locale, namespace: "home" });
  const ledLamps = t.raw("ledLamps");

  return (
    <>
      <HeroSection />
      <CategorySection locale={locale} />
      <BestSellerSection
        imageUrl="/home/bestseller.svg"
        button={{ text: ledLamps.knowMore, url: "/category/led-lamps" }}
        text={ledLamps.text}
        title={ledLamps.title}
      />
      <OurAdvantages />
      <ProductSlider products={products.items} />
      <OurPartners />
      <QuestionsAnswers />
    </>
  );
}
