"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/components/ui/client/SearchBar";
import LanguageSwitcher from "@/components/ui/client/LanguageSwitcher";
import Dropdown from "@/components/ui/client/Dropdown";
import CartIcon from "@/icons/CartIcon";
import { useTranslations, useLocale } from "next-intl";
import LogoIcon from "@/icons/LogoIcon";
import AvatarIcon from "@/icons/AvatarIcon";
import BurgerIcon from "@/icons/BurgerIcon";
import { authService } from "@/services/authService";

export default function Navbar() {
  const t = useTranslations("common");
  const locale = useLocale();

  const navChildren = t.raw("navigation.children") as {
    title: string;
    type: string;
    url?: string;
    children?: { title: string; url: string }[];
  }[];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full border-b bg-white z-50">
      <div className="container max-w-[1220px] px-4">
        <div className="hidden md:flex h-16 items-center">
          <div className="flex items-center gap-6 flex-1">
            <a href={`/${locale}`} className="flex items-center">
              <LogoIcon />
            </a>
            <SearchBar />
          </div>

          <nav className="flex items-center gap-4 ml-8">
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
            <a className="px-3 py-2 border rounded" href={`/${locale}/sign-in`}>
              {t("loginButton.title", { default: "Account" })}
            </a>
          </nav>
        </div>

        <div className="flex flex-col md:hidden">
          <div className="flex items-center justify-between h-14 px-2">
            <a href={`/${locale}/sign-in`}>
              <AvatarIcon />
            </a>

            <a href={`/${locale}`} className="flex items-center">
              <LogoIcon />
            </a>

            <div className="flex items-center gap-3">
              <button
                className="p-2"
                onClick={() => setMenuOpen(true)}
                aria-label="Открыть меню">
                <BurgerIcon />
              </button>
            </div>
          </div>

          <div className="flex px-2 pb-2 justify-center">
            <SearchBar />
            <CartIcon />
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col gap-4">
            <button
              className="ml-auto mb-4"
              onClick={() => setMenuOpen(false)}
              aria-label="Закрыть меню">
              ✕
            </button>

            {navChildren.map((item, i) =>
              item.type === "dropdown" ? (
                <Dropdown
                  key={i}
                  label={item.title}
                  items={item.children || []}
                />
              ) : (
                <a
                  key={i}
                  className="px-3 py-2"
                  href={`/${locale}${item.url}`}
                  onClick={() => setMenuOpen(false)}>
                  {item.title}
                </a>
              )
            )}
            <LanguageSwitcher />
          </div>
        </div>
      )}
    </header>
  );
}
