"use client";

import { useState, Fragment } from "react";
import { useTranslations } from "next-intl";
import { Order, OrderRef } from "@/lib/types";
import clsx from "clsx";

export default function OrderTable({ orders }: { orders: OrderRef }) {
  const t = useTranslations("account.ORDERS");
  const [openRows, setOpenRows] = useState<string[]>([]);

  const toggleRow = (id: string) => {
    setOpenRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  return (
    <div className="mt-6 overflow-hidden">
      {/* Заголовок вне таблицы */}
      <div className="grid grid-cols-3 bg-[#F3F3F3] text-[#565656] rounded-t-lg">
        <div className="px-4 py-6">{t("orderNumber")}</div>
        <div className="px-4 py-6 text-center">{t("date")}</div>
        <div className="px-4 py-6 text-right">{t("price")}</div>
      </div>

      {/* Контейнер со скроллом */}
      <div className="max-h-[400px] overflow-y-auto">
        <table className="w-full text-left text-[#565656] border-separate border-spacing-y-4">
          <tbody>
            {orders.map((order) => {
              const isOpen = openRows.includes(order.id);
              return (
                <Fragment key={order.id}>
                  {/* Основная строка */}
                  <tr
                    className={clsx(
                      "cursor-pointer transition rounded-lg shadow-sm",
                      isOpen
                        ? "bg-gray-50 text-black shadow-md"
                        : "bg-white text-black hover:shadow-md"
                    )}
                    onClick={() => toggleRow(order.id)}>
                    <td className="px-4 py-6 rounded-l-lg">{order.id}</td>
                    <td className="px-4 py-6 text-center">{order.createdAt}</td>
                    <td className="px-4 py-6 text-right rounded-r-lg">
                      {order.total} ֏
                    </td>
                  </tr>

                  {/* Детали заказа */}
                  {isOpen && (
                    <tr>
                      <td
                        colSpan={3}
                        className="bg-gray-50 px-4 py-6 rounded-lg">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="py-2 pr-2 text-left">
                                {t("PRODUCT_ID")}
                              </th>
                              <th className="py-2 pr-2 text-center">
                                {t("itemQnty")}
                              </th>
                              <th className="py-2 pr-2 text-right">
                                {t("price")}
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, idx) => (
                              <tr key={idx} className="border-b">
                                <td className="py-2 pr-2">{item.productId}</td>
                                <td className="py-2 pr-2 text-center">
                                  {item.qty}
                                </td>
                                <td className="py-2 pr-2 text-right">
                                  {item.price} ֏
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
