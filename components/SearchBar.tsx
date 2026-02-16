"use client";

import { useState } from "react";

type SearchBarProps = {
  onSearch?: (q: string) => void;
  onNew?: () => void;
  placeholder?: string;
};

export function SearchBar({
  onSearch,
  onNew,
  placeholder = "Search...",
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const runSearch = () => {
    const q = query.trim();
    if (!q) return;
    onSearch?.(q);
  };

  return (
    <div className="w-full border-b border-green-500/30 bg-white dark:bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex w-full items-center gap-2">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") runSearch();
            }}
            className="flex-1 rounded-xl px-4 py-2 text-sm
              bg-zinc-100 dark:bg-zinc-900
              border border-zinc-200 dark:border-zinc-800
              text-zinc-900 dark:text-zinc-100
              focus:outline-none focus:ring-2 focus:ring-green-500/60"
          />

          <button
            type="button"
            onClick={runSearch}
            className="px-4 py-2 text-sm rounded-xl
              bg-zinc-900 text-white
              dark:bg-zinc-100 dark:text-zinc-900
              hover:opacity-90 transition"
          >
            Search
          </button>

          <button
            type="button"
            onClick={() => onNew?.()}
            className="px-4 py-2 text-sm rounded-xl
              bg-green-600 text-white
              hover:bg-green-500 transition"
          >
            New
          </button>
        </div>
      </div>
    </div>
  );
}
