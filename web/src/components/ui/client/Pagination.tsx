"use client";

import { useParams, useSearchParams } from "next/navigation";

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  basePath: string;
}

export default function Pagination({
  page,
  pageSize,
  total,
  basePath,
}: PaginationProps) {
  const params = useParams();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(total / pageSize);
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
        const updatedParams = new URLSearchParams(searchParams.toString());
        updatedParams.set("page", n.toString());

        return (
          <a
            key={n}
            href={`${basePath}?${updatedParams.toString()}`}
            className={`px-3 py-1 border rounded transition ${
              n === page ? "bg-gray-100 border-gray-400" : "hover:bg-gray-50"
            }`}>
            {n}
          </a>
        );
      })}
    </div>
  );
}
