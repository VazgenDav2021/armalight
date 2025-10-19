import LogoIcon from "@/icons/LogoIcon";
import CartIcon from "@/icons/CartIcon";
import { getTranslations } from "next-intl/server";
import { Locale } from "@/navigation";
import Dropdown from "../ui/client/Dropdown";
import LanguageSwitcher from "../ui/client/LanguageSwitcher";
import UserMenu from "../ui/client/UserMenu";

export default async function Navbar({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "common" });
  const navChildren = t.raw("navigation.children") as {
    title: string;
    type: string;
    url?: string;
    children?: { title: string; url: string }[];
  }[];

  return (
    <header className="fixed top-0 left-0 w-full border-b bg-white z-50">
      <div className="container max-w-[1220px] px-4 flex items-center h-16 justify-between">
        <a href={`/${locale}`} className="flex items-center">
          <LogoIcon />
        </a>

        <nav className="flex items-center gap-4">
          {navChildren.map((item, i) =>
            item.type === "dropdown" ? (
              <Dropdown
                key={i}
                label={item.title}
                items={item.children || []}
              />
            ) : (
              <a key={i} className="px-3 py-2" href={`/${locale}${item.url}`}>
                {item.title}
              </a>
            )
          )}

          <LanguageSwitcher />
          <CartIcon />

          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
