"use client";

import { useTranslations } from "next-intl";
import { Order, User } from "@/lib/types";
import OrderTable from "./OrderTable";


interface OrderHistoryProps {
  user: User | null;
}

export default function OrderHistory({ user }: OrderHistoryProps) {
  const t = useTranslations("account.ORDERS");

  const orders: Order[] = [
    {
      id: "#12345",
      userEmail: "anna@example.com",
      items: [
        { productId: "P-001", qty: 2, price: 5000 },
        { productId: "P-002", qty: 1, price: 5000 },
      ],
      total: 15000,
      createdAt: "21.09.2025",
    },
    {
      id: "#12346",
      userEmail: "ivan@example.com",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },

    {
      id: "#123464",
      userEmail: "ivan@example.com",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },

    {
      id: "#123462",
      userEmail: "ivan@example.com",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },
  ];

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-[#565656]">
        {t("title")}
      </h2>
      {orders.length > 0 ? (
        <OrderTable orders={orders} />
      ) : (
        <p className="text-gray-600">{t("noOrder")}</p>
      )}
    </div>
  );
}
