"use server";

import Navbar from "@/components/layout/Navbar";
import CategorySection from "@/components/ui/client/CategorySection";
import HeroSection from "@/components/ui/client/HeroSection";
import OurAdvantages from "@/components/ui/client/OurAdvantages";
import OurPartners from "@/components/ui/client/OurPartners";
import QuestionsAnswers from "@/components/ui/client/QuestionsAnswers";
import ProductSlider from "@/components/ui/client/Slider";
import { makeGenerateMetadata } from "@/lib/seo";
import { Locale } from "@/navigation";

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
  const products = null;

  return (
    <>
      <Navbar locale={locale} />
      <HeroSection />
      <CategorySection locale={locale} />
      <OurAdvantages />
      <ProductSlider products={[]}/>
      <OurPartners />
      <QuestionsAnswers />
    </>
  );
}
