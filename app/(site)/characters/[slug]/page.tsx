import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  Heart,
  Eye,
  MessageCircle,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CHARACTERS, getCharacter, formatCount, BADGE_LABEL } from "@/lib/data";
import CharacterCard from "@/components/character/CharacterCard";

export function generateStaticParams() {
  return CHARACTERS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) return { title: "Character not found" };
  return {
    title: `${c.name}, ${c.age} — ${c.title}`,
    description: c.bio.slice(0, 155),
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCharacter(slug);
  if (!c) notFound();

  const related = CHARACTERS.filter(
    (x) => x.slug !== c.slug && x.categories.some((cat) => c.categories.includes(cat))
  ).slice(0, 4);

  return (
    <div>
      {/* Hero banner */}
      <section
        className="relative overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${c.coverFrom}, ${c.coverTo})`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent" />

        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 pb-24 pt-10 sm:px-6 md:flex-row md:items-end md:pb-16 md:pt-14">
          <Link
            href="/characters"
            className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-black/30 text-white backdrop-blur-md transition-colors hover:bg-black/50"
            aria-label="Back to explore"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>

          <div className="animate-float h-44 w-44 shrink-0 overflow-hidden rounded-3xl border-4 border-black/30 shadow-card sm:h-52 sm:w-52">
            <Image
              src={c.avatar}
              alt={c.name}
              unoptimized
              width={208}
              height={208}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="text-center md:text-left">
            {c.badge && (
              <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                {BADGE_LABEL[c.badge]}
              </span>
            )}
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {c.name.split(" ")[0]}, {c.age}
            </h1>
            <p className="mt-1.5 text-base font-medium text-white/85">{c.title}</p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80 md:justify-start">
              <span className="flex items-center gap-1.5">
                <Heart className="h-4 w-4 fill-current" />
                {formatCount(c.likes)} likes
              </span>
              <span className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {formatCount(c.views)} views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-success" />
                Online now
              </span>
            </div>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/75 md:mx-0">
              {c.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Action bar */}
      <div className="mx-auto -mt-12 max-w-5xl px-4 sm:px-6">
        <div className="glass flex items-center gap-3 rounded-2xl border border-line p-3 shadow-card">
          <Link
            href={`/characters/${c.slug}/chat`}
            className="btn-gradient flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Start chatting
          </Link>
          <button
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
            aria-label="Like"
          >
            <Heart className="h-5 w-5" />
          </button>
          <button
            className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors hover:border-accent/60 hover:text-accent"
            aria-label="Share"
          >
            <Sparkles className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* About */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="text-lg font-bold">About {c.name.split(" ")[0]}</h2>
            <p className="mt-3 text-[15px] leading-7 text-muted">{c.bio}</p>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">
                Voice & vibe
              </h3>
              <p className="mt-2 text-sm font-medium">{c.voiceStyle}</p>
            </div>
            <div className="rounded-2xl border border-line bg-surface p-5">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">
                Categories
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/characters?category=${cat}`}
                    className="rounded-full border border-line px-3 py-1 text-xs text-muted transition-colors hover:border-accent/60 hover:text-accent"
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <p className="text-xs leading-5 text-muted">
                Interactions are simulated in this demo. Always engage
                respectfully — companions are AI, not real people.
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <h2 className="mb-6 text-xl font-extrabold tracking-tight sm:text-2xl">
            You might also like
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
            {related.map((r, i) => (
              <CharacterCard key={r.slug} character={r} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
