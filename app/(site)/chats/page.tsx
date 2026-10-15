import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { MessageCircle, Search, Trash2 } from "lucide-react";
import { CHARACTERS } from "@/lib/data";

export const metadata: Metadata = {
  title: "My Chats",
  description: "Continue your conversations with your AI companions.",
};

const PREVIEW = [
  { time: "2m", msg: "you've got three seconds to say something interesting… go" },
  { time: "1h", msg: "Good thing you showed up today 😏" },
  { time: "3h", msg: "did you stretch today? be honest 🏈" },
  { time: "1d", msg: "System online 🎀 awaiting your next quest, senpai!" },
  { time: "2d", msg: "sit down, keep up, and try to be interesting 😈" },
  { time: "3d", msg: "I made tea. would you like some? 🥺" },
  { time: "5d", msg: "choose your words wisely 🍷" },
  { time: "1w", msg: "where should we go first? 😏" },
];

export default function ChatsPage() {
  const recent = CHARACTERS.slice(0, 8);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Chats</h1>
        <p className="mt-1.5 text-sm text-muted">
          Pick up right where you left off
        </p>
      </header>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-subtle" />
        <input
          type="search"
          placeholder="Search conversations…"
          className="h-12 w-full rounded-xl border border-line bg-surface pl-11 pr-4 text-sm text-text placeholder:text-subtle outline-none transition-colors focus:border-accent/70"
          aria-label="Search conversations"
        />
      </div>

      {/* Chat list */}
      <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface">
        {recent.map((c, i) => {
          const p = PREVIEW[i % PREVIEW.length];
          return (
            <li key={c.slug}>
              <Link
                href={`/characters/${c.slug}/chat`}
                className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-elevated"
              >
                <div
                  className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line"
                  style={{
                    background: `linear-gradient(150deg, ${c.coverFrom}, ${c.coverTo})`,
                  }}
                >
                  <Image
                    src={c.avatar}
                    alt={c.name}
                    unoptimized
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-surface bg-success" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate font-semibold">
                      {c.name.split(" ")[0]}
                    </p>
                    <span className="shrink-0 text-[11px] text-subtle">{p.time}</span>
                  </div>
                  <p className="truncate text-[13px] text-muted">{p.msg}</p>
                </div>

                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-subtle opacity-0 transition-opacity group-hover:opacity-100 hover:text-danger">
                  <Trash2 className="h-4 w-4" />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      {recent.length === 0 && (
        <div className="flex flex-col items-center rounded-2xl border border-line bg-surface py-20 text-center">
          <MessageCircle className="h-10 w-10 text-subtle" />
          <p className="mt-4 font-bold">No conversations yet</p>
          <Link href="/characters" className="mt-3 text-sm font-semibold text-accent">
            Find someone to talk to →
          </Link>
        </div>
      )}

      <Link
        href="/characters"
        className="mt-8 flex items-center justify-center gap-2 rounded-xl border border-line bg-surface px-5 py-3.5 text-sm font-semibold text-muted transition-colors hover:border-accent/50 hover:text-text"
      >
        <MessageCircle className="h-4 w-4" />
        Start a new chat
      </Link>
    </div>
  );
}
