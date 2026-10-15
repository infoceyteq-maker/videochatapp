"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wand2, RefreshCw, MessageCircle, Check } from "lucide-react";

const STYLES = [
  { value: "adventurer", label: "Realistic" },
  { value: "adventurer-neutral", label: "Soft" },
  { value: "big-smile", label: "Cheerful" },
  { value: "lorelei", label: "Anime" },
  { value: "micah", label: "Illustrated" },
  { value: "notionists", label: "Sketch" },
];

const VIBES = [
  "Sarcastic & witty",
  "Sweet & caring",
  "Bold & dominant",
  "Shy & dreamy",
  "Adventurous",
  "Intellectual",
  "Playful & chaotic",
];

const AGES = ["18-21", "22-26", "27-35", "36-45", "46+"];

const GENDERS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "nonbinary", label: "Non-binary" },
];

const INTERESTS = [
  "Music", "Gaming", "Fitness", "Art", "Books", "Cooking",
  "Travel", "Anime", "Fashion", "Science", "Film", "Dancing",
];

function randomSeed() {
  return Math.random().toString(36).slice(2, 10);
}

export default function CharacterCreator() {
  const [seed, setSeed] = useState(randomSeed);
  const [name, setName] = useState("");
  const [style, setStyle] = useState("lorelei");
  const [vibe, setVibe] = useState(VIBES[1]);
  const [age, setAge] = useState(AGES[1]);
  const [gender, setGender] = useState("female");
  const [interests, setInterests] = useState<string[]>(["Music", "Anime"]);
  const [creating, setCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const avatarUrl = useMemo(
    () =>
      `https://api.dicebear.com/9.x/${style}/png?seed=${seed}&backgroundColor=transparent`,
    [seed, style]
  );

  const toggleInterest = (i: string) =>
    setInterests((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : prev.length < 5 ? [...prev, i] : prev
    );

  const create = () => {
    setCreating(true);
    setTimeout(() => {
      setCreating(false);
      setCreated(true);
    }, 1600);
  };

  if (created) {
    return (
      <div className="mx-auto max-w-md animate-scale-in text-center">
        <div className="mx-auto h-40 w-40 overflow-hidden rounded-3xl border-4 border-accent/40 shadow-glow">
          <Image
            src={avatarUrl}
            alt="Your character"
            unoptimized
            width={160}
            height={160}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="mt-6 text-2xl font-extrabold">
          {name.trim() || "Your companion"} is ready! 🎉
        </h2>
        <p className="mt-2 text-sm text-muted">
          {vibe} · {age} · {interests.slice(0, 3).join(", ")}
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href={`/characters/sam-rivers/chat`}
            className="btn-gradient flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            Start chatting
          </Link>
          <button
            onClick={() => {
              setCreated(false);
              setSeed(randomSeed());
            }}
            className="rounded-xl border border-line bg-surface px-6 py-3.5 text-sm font-semibold text-muted transition-colors hover:text-text"
          >
            Create another
          </button>
        </div>
        <p className="mt-6 text-[11px] leading-5 text-subtle">
          Demo mode — in production this would save your character to the
          database and generate a full personality profile.
        </p>
      </div>
    );
  }

  return (
    <div className="grid items-start gap-10 lg:grid-cols-2">
      {/* Preview */}
      <div className="mx-auto w-full max-w-sm lg:sticky lg:top-24">
        <div
          className="relative overflow-hidden rounded-3xl border border-line shadow-card"
          style={{ background: "linear-gradient(155deg, #7c3aed, #ff2d7a)" }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
          <div className="relative flex aspect-[4/5] items-end justify-center">
            {creating ? (
              <div className="mb-10 flex flex-col items-center gap-3">
                <div className="skeleton h-12 w-12 rounded-full" />
                <div className="flex gap-1">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
                <p className="text-xs font-medium text-white/85">
                  Weaving personality…
                </p>
              </div>
            ) : (
              <Image
                src={avatarUrl}
                alt="Character preview"
                unoptimized
                width={420}
                height={525}
                className="h-[92%] w-auto object-contain drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
              />
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
            <p className="text-lg font-extrabold text-white">
              {name.trim() || "Your companion"}
            </p>
            <p className="text-xs text-white/75">
              {vibe} · {age}
            </p>
          </div>
        </div>

        <button
          onClick={() => setSeed(randomSeed())}
          disabled={creating}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-line bg-surface px-4 py-3 text-sm font-semibold text-muted transition-colors hover:border-accent/50 hover:text-text disabled:opacity-50"
        >
          <RefreshCw className="h-4 w-4" />
          Reroll look
        </button>
      </div>

      {/* Form */}
      <div className="space-y-7">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-semibold">
            Name <span className="text-subtle font-normal">(they can rename themselves later 😉)</span>
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Luna, Kai, Nova…"
            maxLength={24}
            className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-[15px] text-text placeholder:text-subtle outline-none transition-colors focus:border-accent/70"
          />
        </div>

        {/* Style */}
        <div>
          <p className="mb-2 text-sm font-semibold">Art style</p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  style === s.value
                    ? "btn-gradient text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div>
          <p className="mb-2 text-sm font-semibold">Gender</p>
          <div className="flex flex-wrap gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  gender === g.value
                    ? "btn-gradient text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Age */}
        <div>
          <p className="mb-2 text-sm font-semibold">Age range</p>
          <div className="flex flex-wrap gap-2">
            {AGES.map((a) => (
              <button
                key={a}
                onClick={() => setAge(a)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  age === a
                    ? "btn-gradient text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Vibe */}
        <div>
          <p className="mb-2 text-sm font-semibold">Personality vibe</p>
          <div className="flex flex-wrap gap-2">
            {VIBES.map((v) => (
              <button
                key={v}
                onClick={() => setVibe(v)}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  vibe === v
                    ? "btn-gradient text-white"
                    : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div>
          <p className="mb-2 text-sm font-semibold">
            Interests <span className="font-normal text-subtle">(up to 5)</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((i) => (
              <button
                key={i}
                onClick={() => toggleInterest(i)}
                className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                  interests.includes(i)
                    ? "border border-accent/60 bg-accent-soft text-accent"
                    : "border border-line bg-surface text-muted hover:border-accent/50 hover:text-text"
                }`}
              >
                {interests.includes(i) && <Check className="h-3.5 w-3.5" />}
                {i}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={create}
          disabled={creating}
          className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white disabled:opacity-60"
        >
          <Wand2 className="h-4 w-4" />
          {creating ? "Creating…" : "Create companion"}
        </button>
      </div>
    </div>
  );
}
