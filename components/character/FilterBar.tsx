"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { CATEGORIES } from "@/lib/data";

const GENDERS = [
  { value: "", label: "Any gender" },
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
];

const SORTS = [
  { value: "trending", label: "Trending" },
  { value: "new", label: "Newest" },
  { value: "likes", label: "Most liked" },
];

export default function FilterBar({ basePath = "/characters" }: { basePath?: string }) {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") ?? "";
  const gender = params.get("gender") ?? "";
  const sort = params.get("sort") ?? "trending";

  const setParam = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      const qs = next.toString();
      router.push(qs ? `${basePath}?${qs}` : basePath, { scroll: false });
    },
    [params, router, basePath]
  );

  return (
    <div className="space-y-4">
      {/* Category chips */}
      <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          onClick={() => setParam("category", "")}
          className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
            category === ""
              ? "btn-gradient text-white"
              : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.slug}
            onClick={() => setParam("category", c.slug === category ? "" : c.slug)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              category === c.slug
                ? "btn-gradient text-white"
                : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
            }`}
          >
            <span className="mr-1.5">{c.emoji}</span>
            {c.label}
          </button>
        ))}
      </div>

      {/* Gender + sort */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex rounded-lg border border-line bg-surface p-1">
          {GENDERS.map((g) => (
            <button
              key={g.value}
              onClick={() => setParam("gender", g.value)}
              className={`rounded-md px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                gender === g.value
                  ? "bg-elevated text-text"
                  : "text-subtle hover:text-muted"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-subtle">Sort</span>
          <select
            value={sort}
            onChange={(e) => setParam("sort", e.target.value)}
            className="rounded-lg border border-line bg-surface px-3 py-2 text-[13px] text-muted outline-none transition-colors hover:text-text focus:border-accent"
            aria-label="Sort characters"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value} className="bg-surface">
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
