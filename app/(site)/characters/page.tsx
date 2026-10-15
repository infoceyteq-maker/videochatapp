import { Suspense } from "react";
import type { Metadata } from "next";
import { CHARACTERS, CATEGORIES } from "@/lib/data";
import CharacterCard from "@/components/character/CharacterCard";
import FilterBar from "@/components/character/FilterBar";

export const metadata: Metadata = {
  title: "Explore AI Companions",
  description:
    "Browse thousands of AI companions — anime, fantasy, romantic, dominant and more. Find your perfect match on SeeMe.",
};

export default async function CharactersPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; gender?: string; sort?: string }>;
}) {
  const sp = await searchParams;
  const category = sp.category ?? "";
  const gender = sp.gender ?? "";
  const sort = sp.sort ?? "trending";

  let list = [...CHARACTERS];

  if (category) {
    const cat = CATEGORIES.find((c) => c.slug === category);
    if (cat) {
      list = list.filter((c) => c.categories.includes(cat.slug));
    }
  }
  if (gender) {
    list = list.filter((c) => c.gender === gender);
  }

  switch (sort) {
    case "new":
      list = [...list].reverse();
      break;
    case "likes":
      list.sort((a, b) => b.likes - a.likes);
      break;
    default:
      list.sort((a, b) => b.views - a.views);
  }

  const catLabel = category
    ? CATEGORIES.find((c) => c.slug === category)?.label
    : undefined;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-7">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {catLabel ? `${catLabel} companions` : "Explore companions"}
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          {list.length} character{list.length === 1 ? "" : "s"} · find someone
          who gets you
        </p>
      </header>

      <Suspense fallback={<div className="mb-8 h-24" />}>
        <FilterBar />
      </Suspense>

      {list.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-line bg-surface py-20 text-center">
          <p className="text-4xl">🔍</p>
          <p className="mt-4 font-bold">No matches found</p>
          <p className="mt-1 text-sm text-muted">
            Try clearing a filter or two — your person is out there.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {list.map((c, i) => (
            <CharacterCard key={c.slug} character={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
