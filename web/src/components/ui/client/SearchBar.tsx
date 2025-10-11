"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const t = useTranslations("common");
  const searchTitle = t("navigation.searchTitle");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set("q", q);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex-1 w-full">
      <input
        className="w-full border rounded px-3 py-2 bg-brand-gray md:max-w-[308px]"
        placeholder={searchTitle}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}
