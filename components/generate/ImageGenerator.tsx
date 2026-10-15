"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon, Sparkles, Download, Heart } from "lucide-react";

const STYLES = [
  { value: "lorelei", label: "Anime", emoji: "🌸" },
  { value: "adventurer", label: "Realistic", emoji: "📸" },
  { value: "micah", label: "Illustrated", emoji: "🎨" },
  { value: "notionists", label: "Sketch", emoji: "✏️" },
  { value: "pixel-art", label: "Pixel art", emoji: "🕹️" },
  { value: "identicon", label: "Abstract", emoji: "🌀" },
];

const IDEAS = [
  "cyberpunk girl with neon purple hair, tokyo street at night",
  "elf archer in an enchanted forest, golden hour",
  "cozy reading nook, rain on the window, warm light",
  "astronaut floating above a coral-pink nebula",
];

interface GenImage {
  id: number;
  seed: string;
  style: string;
  prompt: string;
}

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("lorelei");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<GenImage[]>([]);

  const generate = () => {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setImages([]);
    setTimeout(() => {
      const batch: GenImage[] = Array.from({ length: 4 }, (_, i) => ({
        id: Date.now() + i,
        seed: `${prompt}-${Math.random().toString(36).slice(2, 9)}`,
        style,
        prompt: prompt.trim(),
      }));
      setImages(batch);
      setLoading(false);
    }, 1800);
  };

  const url = (g: GenImage) =>
    `https://api.dicebear.com/9.x/${g.style}/png?seed=${encodeURIComponent(g.seed)}&backgroundColor=111827`;

  return (
    <div className="space-y-8">
      {/* Prompt box */}
      <div className="rounded-2xl border border-line bg-surface p-5">
        <label htmlFor="prompt" className="text-sm font-semibold">
          Describe your image
        </label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. cyberpunk girl with neon purple hair, tokyo street at night…"
          rows={3}
          maxLength={400}
          className="mt-3 w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-[15px] text-text placeholder:text-subtle outline-none transition-colors focus:border-accent/70"
        />

        <div className="mt-3 flex flex-wrap gap-2">
          {IDEAS.map((idea) => (
            <button
              key={idea}
              onClick={() => setPrompt(idea)}
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-text"
            >
              ✨ {idea.slice(0, 42)}…
            </button>
          ))}
        </div>

        <p className="mb-2 mt-5 text-sm font-semibold">Style</p>
        <div className="flex flex-wrap gap-2">
          {STYLES.map((s) => (
            <button
              key={s.value}
              onClick={() => setStyle(s.value)}
              className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all ${
                style === s.value
                  ? "btn-gradient text-white"
                  : "border border-line bg-bg text-muted hover:border-accent/50 hover:text-text"
              }`}
            >
              <span className="mr-1.5">{s.emoji}</span>
              {s.label}
            </button>
          ))}
        </div>

        <button
          onClick={generate}
          disabled={!prompt.trim() || loading}
          className="btn-gradient mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold text-white disabled:opacity-40 disabled:pointer-events-none sm:w-auto"
        >
          <Sparkles className="h-4 w-4" />
          {loading ? "Dreaming…" : "Generate 4 images"}
        </button>
      </div>

      {/* Results */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="skeleton aspect-square rounded-2xl border border-line"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      )}

      {images.length > 0 && !loading && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {images.map((g, i) => (
              <div
                key={g.id}
                className="group relative animate-scale-in overflow-hidden rounded-2xl border border-line bg-surface"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="aspect-square">
                  <Image
                    src={url(g)}
                    alt={g.prompt}
                    unoptimized
                    width={512}
                    height={512}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/70 via-transparent to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="line-clamp-2 max-w-[70%] text-[11px] text-white/85">
                    {g.prompt}
                  </p>
                  <div className="flex gap-1.5">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-md"
                      aria-label="Like"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/50 text-white backdrop-blur-md"
                      aria-label="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-subtle">
            Demo mode — placeholder art shown. Connect an image model (SDXL,
            Flux, DALL·E…) in production for real generations.
          </p>
        </>
      )}

      {images.length === 0 && !loading && (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-line bg-surface/50 py-20 text-center">
          <ImageIcon className="h-10 w-10 text-subtle" />
          <p className="mt-4 font-bold">Your gallery starts here</p>
          <p className="mt-1 max-w-xs text-sm text-muted">
            Write a prompt above, pick a style, and hit generate.
          </p>
        </div>
      )}
    </div>
  );
}
