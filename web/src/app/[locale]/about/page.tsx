"use server";

import Navbar from "@/components/layout/Navbar";
import AboutUsSection from "@/components/ui/client/AboutUsSection";
import Breadcrumb from "@/components/ui/client/Breadcrumb";
import OurValues from "@/components/ui/client/OurValues";
import { makeGenerateMetadata } from "@/lib/seo";
import { Locale } from "@/navigation";

export const generateMetadata = makeGenerateMetadata({
  namespace: "about",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

export default async function AboutPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const crumbs = [{ title: "Главная", url: "/" }, { title: "О нас" }];

  return (
    <div className="py-12">
      <Navbar locale={locale} />
      <Breadcrumb items={crumbs} />
      <AboutUsSection />
      <OurValues />
    </div>
  );
}
