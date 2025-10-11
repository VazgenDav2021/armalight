import CartList from "@/components/ui/client/CartList";
import CartSummary from "@/components/ui/client/CartSummary";
import { makeGenerateMetadata } from "@/lib/seo";
import { useTranslations } from "next-intl";

export const generateMetadata = makeGenerateMetadata({
  namespace: "cart",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

export default function CartPage() {
  const t = useTranslations("cart");
  return (
    <section className="py-6 space-y-6">
      <h1 className="text-2xl font-semibold text-[#565656]">{t("TITLE")}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartList />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </section>
  );
}
