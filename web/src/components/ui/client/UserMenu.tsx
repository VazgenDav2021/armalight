"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { User } from "@/lib/types";

export default function UserMenu() {
  const [user, setUser] = useState<User | null>(null);
  const t = useTranslations("common");

  if (user?.personalData) {
    return (
      <a className="px-3 py-2 cursor-pointer" href="/account">
        {user.personalData.firstName}
      </a>
    );
  }

  return (
    <a className="px-3 py-2 border rounded" href={`/sign-in`}>
      {t("loginButton.title")}
    </a>
  );
}
