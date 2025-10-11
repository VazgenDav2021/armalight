"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const PriceFilter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);
  const [min, setMin] = useState(Number(searchParams.get("min") || 100));
  const [max, setMax] = useState(Number(searchParams.get("max") || 1500));

  const MIN = 0;
  const MAX = 2000;

  const handleApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("min", String(min));
    params.set("max", String(max));
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 border rounded bg-white shadow-sm">
        Фильтры
      </button>

      {open && (
        <div className="absolute mt-2 w-80 bg-white border rounded shadow-lg p-4 z-20">
          <h3 className="font-semibold mb-3">Цена</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm text-gray-600 mb-1">Мин</label>
              <input
                type="number"
                value={min}
                min={MIN}
                max={max - 1}
                onChange={(e) => setMin(Number(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>

            <div className="flex flex-col flex-1">
              <label className="text-sm text-gray-600 mb-1">Макс</label>
              <input
                type="number"
                value={max}
                min={min + 1}
                max={MAX}
                onChange={(e) => setMax(Number(e.target.value))}
                className="w-full border rounded px-2 py-1"
              />
            </div>
          </div>
          <div className="relative h-6">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded" />
            <div
              className="absolute top-1/2 h-1 bg-brand rounded"
              style={{
                left: `${(min / MAX) * 100}%`,
                right: `${100 - (max / MAX) * 100}%`,
              }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={min}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < max) setMin(val);
              }}
              className="absolute w-full appearance-none bg-transparent accent-brand"
              style={{ top: "60%", zIndex: min > max - 50 ? 5 : 1 }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={max}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > min) setMax(val);
              }}
              className="absolute w-full appearance-none bg-transparent accent-brand"
              style={{ top: "-8%", zIndex: 2 }}
            />
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>{min}$</span>
            <span>{max}$</span>
          </div>

          <button
            onClick={handleApply}
            className="mt-4 w-full bg-brand text-white py-2 rounded">
            Применить
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
