"use client";
import { useState } from "react";
import clsx from "clsx";

export default function Dropdown({
  label,
  items,
}: {
  label: string;
  items: { title: string; url: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        className={clsx(
          "flex items-center gap-1 px-3 py-2 border rounded",
          open && "bg-brand-gray"
        )}
        onClick={() => setOpen((v) => !v)}>
        <span>{label}</span>
        <svg
          className={clsx(
            "w-4 h-4 transition-transform duration-200",
            open && "rotate-180"
          )}
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

      <div
        className={clsx(
          "absolute left-0 top-full mt-2 w-max border bg-white rounded shadow z-20",
          { hidden: !open }
        )}>
        {items.map((i, index) => (
          <a
            key={index}
            className="block px-3 py-2 hover:bg-gray-50"
            href={i.url}>
            {i.title}
          </a>
        ))}
      </div>
    </div>
  );
}
