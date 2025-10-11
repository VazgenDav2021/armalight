"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";

const locales = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "hy", label: "Հայերեն", flag: "🇦🇲" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const currentLocale = pathname.split("/")[1] || "en";
  const current = locales.find((l) => l.code === currentLocale) || locales[0];

  const [, , ...rest] = pathname.split("/");

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center items-center gap-1 px-3 py-1 rounded-md bg-white shadow-sm hover:bg-gray-50">
        <span className="text-lg">{current.flag}</span>
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            {locales.map(({ code, label, flag }) => (
              <a
                key={code}
                href={`/${code}/${rest.join("/")}`}
                className={`flex items-center gap-2 px-4 py-2 text-sm ${
                  code === current.code
                    ? "bg-gray-100 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}>
                <span className="text-lg">{flag}</span>
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
