"use client";
import { useEffect, useState } from "react";
import PersonalData from "./PersonalData";
import OrderHistory from "./OrderHistory";
import BankCards from "./BankCards";
import { User } from "@/lib/types";

interface AccountContentProps {
  user: User | null;
}

export default function AccountContent({ user }: AccountContentProps) {
  const [active, setActive] = useState<string>("personal");

  useEffect(() => {
    const saved = localStorage.getItem("activeTab");
    if (saved) setActive(saved);

    const handler = () => {
      const val = localStorage.getItem("activeTab") || "personal";
      setActive(val);
    };

    window.addEventListener("account-tab-change", handler);
    return () => window.removeEventListener("account-tab-change", handler);
  }, []);

  switch (active) {
    case "personal":
      return <PersonalData personalData={user?.personalData!} />;
    case "orders":
      return <OrderHistory orders={user?.orders!} />;
    default:
      return <BankCards payment={user?.payment} />;
  }
}
