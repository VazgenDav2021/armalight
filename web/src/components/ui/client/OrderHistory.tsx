"use client";

import { useTranslations } from "next-intl";
import { Order, OrderRef } from "@/lib/types";
import OrderTable from "./OrderTable";

interface OrderHistoryProps {
  orders: OrderRef;
}

export default function OrderHistory({
  orders = [
    {
      id: "#12345",
      items: [
        { productId: "P-001", qty: 2, price: 5000 },
        { productId: "P-002", qty: 1, price: 5000 },
      ],
      total: 15000,
      createdAt: "21.09.2025",
    },
    {
      id: "#12346",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },

    {
      id: "#123464",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },

    {
      id: "#123462",
      items: [{ productId: "P-003", qty: 1, price: 7500 }],
      total: 7500,
      createdAt: "20.09.2025",
    },
  ],
}: OrderHistoryProps) {
  const t = useTranslations("account.ORDERS");

  return (
    <div className="w-full max-w-3xl">
      <h2 className="text-xl font-semibold mb-4 text-[#565656]">
        {t("title")}
      </h2>
      {orders?.length > 0 ? (
        <OrderTable orders={orders} />
      ) : (
        <p className="text-gray-600">{t("noOrder")}</p>
      )}
    </div>
  );
}
