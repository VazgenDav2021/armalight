"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { redirect } from "@/navigation";

export default function AccountSidebar() {
  const [active, setActive] = useState("personal");
  const t = useTranslations("account");

  const menuItems = t.raw("MENU_ITEMS") as { id: string; label: string }[];

  useEffect(() => {
    const saved = localStorage.getItem("activeTab");
    if (saved) setActive(saved);
  }, []);

  const handleClick = (id: string) => {
    setActive(id);
    localStorage.setItem("activeTab", id);
    window.dispatchEvent(new Event("account-tab-change"));
  };

  const handleLogout = () => {
    localStorage.removeItem("activeTab");
    document.cookie = "token=; Max-Age=0; path=/;";
    redirect("/sign-in")
  };

  return (
    <nav className="flex flex-col gap-2 bg-white shadow px-4 py-10 h-min min-w-[300px]">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => handleClick(item.id)}
          className={`inline-flex items-center px-4 py-2 rounded transition ${
            active === item.id
              ? "bg-[#F3F3F3] text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }`}>
          {item.label}
        </button>
      ))}

      <button
        onClick={handleLogout}
        className="inline-flex items-center mt-6 px-4 py-2 rounded text-red-600 hover:bg-red-50 transition">
        {t("exit")}
      </button>
    </nav>
  );
}
