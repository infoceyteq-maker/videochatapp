import Link from "next/link";
import type { Metadata } from "next";
import { CATEGORIES, CHARACTERS, getByCategory } from "@/lib/data";
import CharacterCard from "@/components/character/CharacterCard";

export const metadata: Metadata = {
  title: "Discover",
  description: "Browse all categories and find your perfect AI companion.",
};

export default function DiscoverPage() {
  const trending = [...CHARACTERS].sort((a, b) => b.views - a.views).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Discover
        </h1>
        <p className="mt-1.5 text-sm text-muted">
          Every world, every vibe — all in one place
        </p>
      </header>

      {/* Category tiles */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((cat) => {
          const count = getByCategory(cat.slug).length;
          return (
            <Link
              key={cat.slug}
              href={`/characters?category=${cat.slug}`}
              className="card-hover group relative overflow-hidden rounded-2xl border border-line bg-surface p-5"
            >
              <span className="text-3xl">{cat.emoji}</span>
              <h2 className="mt-3 font-bold">{cat.label}</h2>
              <p className="mt-0.5 text-xs text-subtle">
                {count} companion{count === 1 ? "" : "s"}
              </p>
              <span className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-accent-soft opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>
          );
        })}
      </div>

      {/* Most viewed */}
      <section className="mt-14">
        <h2 className="mb-6 text-xl font-extrabold tracking-tight sm:text-2xl">
          🔥 Most viewed this week
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {trending.map((c, i) => (
            <CharacterCard key={c.slug} character={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
