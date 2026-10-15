import type { Metadata } from "next";
import { Video, Zap, Clock, Film } from "lucide-react";
import CharacterCard from "@/components/character/CharacterCard";
import { CHARACTERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "Generate Videos",
  description: "Animate your AI companions with motion and voice — coming soon.",
};

const ROADMAP = [
  { icon: Zap, title: "Motion engine", status: "In the lab" },
  { icon: Film, title: "Lip-synced dialogue", status: "Next up" },
  { icon: Clock, title: "One-tap clips", status: "Planned" },
];

export default function GenerateVideosPage() {
  const picks = CHARACTERS.slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Generate <span className="text-gradient">videos</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          Bring companions to life with motion, expression, and voice.
        </p>
      </header>

      {/* Coming soon banner */}
      <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface px-6 py-14 text-center">
        <div
          className="ambient-orb left-1/2 top-0 h-[260px] w-[440px] -translate-x-1/2"
          style={{ background: "rgba(124,58,237,0.35)" }}
        />
        <div className="relative">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl btn-gradient">
            <Video className="h-8 w-8 text-white" />
          </span>
          <h2 className="mt-6 text-2xl font-extrabold">Video generation is coming</h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-muted">
            We&apos;re training the motion engine. Meanwhile, chat with the
            companions below and imagine them moving 😉
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {ROADMAP.map((r) => (
              <div
                key={r.title}
                className="flex items-center gap-2.5 rounded-xl border border-line bg-bg px-4 py-3"
              >
                <r.icon className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold">{r.title}</span>
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Teaser grid */}
      <section className="mt-14">
        <h2 className="mb-6 text-xl font-extrabold tracking-tight sm:text-2xl">
          Stars of the first drop
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {picks.map((c, i) => (
            <CharacterCard key={c.slug} character={c} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
