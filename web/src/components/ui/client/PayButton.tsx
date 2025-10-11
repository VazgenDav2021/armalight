"use client";
import { useState } from "react";

export function PayButton({
  items,
}: {
  items: { priceId: string; qty: number }[];
}) {
  const [loading, setLoading] = useState(false);

  const pay = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <button
      onClick={pay}
      disabled={loading}
      className="bg-blue-500 text-white p-2 rounded">
      {loading ? "Redirecting..." : "Оплатить"}
    </button>
  );
}
