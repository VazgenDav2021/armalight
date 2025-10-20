import Navbar from "@/components/layout/Navbar";
import CartList from "@/components/ui/client/CartList";
import CartSummary from "@/components/ui/client/CartSummary";
import { makeGenerateMetadata } from "@/app/utils/seo";
import { Locale } from "@/navigation";
import { getCartServer } from "@/services/cartService.server";
import { getTranslations } from "next-intl/server";
import { cookies } from "next/headers"; // для доступа к куки на сервере

export const generateMetadata = makeGenerateMetadata({
  namespace: "cart",
  baseUrl: "https://armlight.hy",
  routePath: "/",
  siteName: "ArmLight",
  imagePath: "/og-image.jpg",
  locales: ["hy", "en", "ru"],
});

export default async function CartPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const t = await getTranslations({ locale, namespace: "cart" });

  // Получаем куки с сервера
  const cartCookies = cookies();

  // Получаем корзину через серверную функцию
  const cart = await getCartServer(cartCookies);

  return (
    <>
      <Navbar locale={locale} />
      <section className="py-6 space-y-6">
        <h1 className="text-2xl font-semibold text-[#565656]">{t("TITLE")}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CartList items={cart.items} />
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      </section>
    </>
  );
}
