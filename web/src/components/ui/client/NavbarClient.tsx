"use client";

import { useState } from "react";
import AvatarIcon from "@/icons/AvatarIcon";
import LogoIcon from "@/icons/LogoIcon";
import BurgerIcon from "@/icons/BurgerIcon";
import Dropdown from "@/components/ui/client/Dropdown";
import LanguageSwitcher from "@/components/ui/client/LanguageSwitcher";
import SearchBar from "@/components/ui/client/SearchBar";
import CartIcon from "@/icons/CartIcon";

type Props = {
  locale: string;
  navChildren: {
    title: string;
    type: string;
    url?: string;
    children?: { title: string; url: string }[];
  }[];
  loginTitle: string;
};

export default function NavbarClient({
  locale,
  navChildren,
  loginTitle,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col md:hidden">
      {/* Верхняя панель */}
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

      {/* Поиск + корзина */}
      <div className="flex px-2 pb-2 justify-center">
        <SearchBar />
        <CartIcon />
      </div>

      {/* Выпадающее меню */}
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

            <a
              className="px-3 py-2 border rounded"
              href={`/${locale}/sign-in`}
              onClick={() => setMenuOpen(false)}>
              {loginTitle}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
