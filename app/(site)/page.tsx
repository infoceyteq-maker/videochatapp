import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  Wand2,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { CHARACTERS, CATEGORIES, formatCount } from "@/lib/data";
import CharacterCard from "@/components/character/CharacterCard";

const HERO_STATS = [
  { value: "120K+", label: "Companions created" },
  { value: "4.8M", label: "Conversations" },
  { value: "99.9%", label: "Uptime" },
];

const FEATURES = [
  {
    icon: MessageCircle,
    title: "Real-feel conversations",
    text: "Companions with memory, personality, and a voice all their own. They remember you and adapt to your vibe.",
  },
  {
    icon: Wand2,
    title: "Create anyone",
    text: "Design your ideal companion — appearance, personality, backstory, interests. Your imagination is the only limit.",
  },
  {
    icon: Sparkles,
    title: "Generate images & videos",
    text: "Bring conversations to life with AI-generated visuals, from photo-realistic portraits to anime dreamscapes.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    text: "Your chats stay yours. Anonymous by default, encrypted in transit, and never sold to anyone.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pick or create a companion",
    text: "Browse trending characters or build your own from scratch in minutes.",
  },
  {
    n: "02",
    title: "Start chatting",
    text: "Say hi. Every conversation evolves and remembers where you left off.",
  },
  {
    n: "03",
    title: "Go beyond text",
    text: "Request images, generate videos, and shape the story you want to live.",
  },
];

export default function HomePage() {
  const featured = [...CHARACTERS]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 8);

  return (
    <div className="overflow-hidden">
      {/* ============ HERO ============ */}
      <section className="relative">
        {/* ambient orbs */}
        <div
          className="ambient-orb left-[-10%] top-[-10%] h-[420px] w-[420px] animate-float"
          style={{ background: "rgba(255,45,122,0.35)" }}
        />
        <div
          className="ambient-orb right-[-8%] top-[15%] h-[380px] w-[380px] animate-float"
          style={{ background: "rgba(124,58,237,0.35)", animationDelay: "2.5s" }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* copy */}
            <div className="stagger text-center lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent">
                <Zap className="h-3.5 w-3.5" />
                Powered by next-gen AI
              </span>

              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
                Your fantasy,
                <br />
                <span className="text-gradient">your rules.</span>
              </h1>

              <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-muted sm:text-lg lg:mx-0">
                Create and chat with AI companions that look, sound, and feel
                exactly the way you imagine. Photo-realistic or anime — the
                choice is yours.
              </p>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
                <Link
                  href="/generate/character"
                  className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white sm:w-auto"
                >
                  <Wand2 className="h-4 w-4" />
                  Create your companion
                </Link>
                <Link
                  href="/characters"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-7 py-3.5 text-sm font-semibold text-text transition-colors hover:border-accent/50 sm:w-auto"
                >
                  Explore characters
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* stats */}
              <div className="mt-10 flex items-center justify-center gap-8 lg:justify-start">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <p className="text-2xl font-extrabold text-text sm:text-3xl">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs text-subtle">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* hero collage */}
            <div className="relative mx-auto hidden w-full max-w-md lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[featured[0], featured[6], featured[3], featured[7]].map((c, i) => (
                  <Link
                    key={c.slug}
                    href={`/characters/${c.slug}`}
                    className={`card-hover relative overflow-hidden rounded-2xl border border-line ${
                      i % 2 === 1 ? "translate-y-8" : ""
                    }`}
                    style={{
                      background: `linear-gradient(150deg, ${c.coverFrom}, ${c.coverTo})`,
                    }}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={c.avatar}
                        alt={c.name}
                        unoptimized
                        width={320}
                        height={426}
                        className="h-full w-full object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)]"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                        <p className="text-xs font-bold text-white">
                          {c.name.split(" ")[0]}, {c.age}
                        </p>
                        <p className="flex items-center gap-1 text-[11px] text-white/70">
                          <Heart className="h-3 w-3 fill-current" />
                          {formatCount(c.likes)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED ============ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Trending now
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              The companions everyone is talking to
            </p>
          </div>
          <Link
            href="/characters"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-semibold text-accent transition-transform hover:translate-x-0.5 sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {featured.map((c, i) => (
            <CharacterCard key={c.slug} character={c} index={i} />
          ))}
        </div>

        <Link
          href="/characters"
          className="mt-6 flex items-center justify-center gap-1.5 text-sm font-semibold text-accent sm:hidden"
        >
          View all characters
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="border-y border-line bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
            Everything you need to{" "}
            <span className="text-gradient">feel the connection</span>
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="card-hover rounded-2xl border border-line bg-surface p-6"
                style={{ animation: "var(--animate-fade-up)", animationDelay: `${i * 80}ms` }}
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
                  <f.icon className="h-5 w-5 text-accent" />
                </span>
                <h3 className="mt-4 font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Find your type
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Every vibe, every style — what are you into?
        </p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/characters?category=${cat.slug}`}
              className="card-hover flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4"
              style={{ animation: "var(--animate-fade-up)", animationDelay: `${i * 40}ms` }}
            >
              <span className="text-2xl">{cat.emoji}</span>
              <span className="font-semibold">{cat.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="border-y border-line bg-surface/40 py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="relative text-center md:text-left">
                <span className="text-gradient text-5xl font-extrabold opacity-90">
                  {s.n}
                </span>
                <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 px-6 py-14 text-center sm:px-12">
          <div
            className="ambient-orb left-1/2 top-0 h-[300px] w-[500px] -translate-x-1/2"
            style={{ background: "rgba(255,45,122,0.3)" }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
              Someone is waiting to meet you{" "}
              <span className="text-gradient">right now</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">
              Join thousands of people crafting their perfect connections on
              SeeMe. Free to start, unforgettable to continue.
            </p>
            <Link
              href="/generate/character"
              className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-semibold text-white"
            >
              <Wand2 className="h-4 w-4" />
              Create your companion — it&apos;s free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
