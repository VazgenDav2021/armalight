"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const t = useTranslations("common");
  const searchTitle = t("navigation.searchTitle");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") || "";
  const [q, setQ] = useState(initialQ);

  useEffect(() => {
    setQ(initialQ);
  }, [initialQ]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (q) {
        params.set("q", q);
      } else {
        params.delete("q");
      }

      params.set("page", "1");
      router.replace(`${pathname}?${params.toString()}`);
    }, 400);

    return () => clearTimeout(timeout);
  }, [q, pathname, router, searchParams]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex-1 w-full">
      <input
        className="w-full border rounded px-3 py-2 bg-brand-gray md:max-w-[308px]"
        placeholder={searchTitle}
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
    </form>
  );
}
