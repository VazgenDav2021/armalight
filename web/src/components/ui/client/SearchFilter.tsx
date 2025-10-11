"use client";

import { useState } from "react";

type SearchFilterProps = {
  onSearch: (query: string) => void;
};

const SearchFilter = ({ onSearch }: SearchFilterProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md flex items-center gap-2 border rounded px-3 py-2 bg-white">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Поиск товаров..."
        className="flex-1 outline-none text-sm"
      />
      <button
        type="submit"
        className="px-4 py-1 bg-brand text-white rounded text-sm">
        Искать
      </button>
    </form>
  );
};

export default SearchFilter;
