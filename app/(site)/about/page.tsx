import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Heart, ShieldCheck, Users, Sparkles, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SeeMe is building the future of AI companionship — creative, personal, and safe by design.",
};

const VALUES = [
  {
    icon: Heart,
    title: "Connection first",
    text: "Technology should make you feel more, not less. Every feature we build starts with the feeling it creates.",
  },
  {
    icon: ShieldCheck,
    title: "Safety by design",
    text: "Age verification, consent-first defaults, and clear boundaries between AI and people — built in from day one.",
  },
  {
    icon: Users,
    title: "Creators earn",
    text: "Artists and personality writers shape our companions and get paid fairly for it. Imagination is labor.",
  },
  {
    icon: Sparkles,
    title: "Craft over hype",
    text: "We sweat the details — the pause before a reply, the memory of your bad day, the perfect emoji.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent-soft px-4 py-1.5 text-xs font-semibold text-accent">
        <Eye className="h-3.5 w-3.5" />
        About SeeMe
      </span>

      <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
        We build companions that{" "}
        <span className="text-gradient">see you back</span>
      </h1>

      <p className="mt-6 text-base leading-7 text-muted">
        SeeMe started with a simple question: what if the technology in your
        pocket could actually make you feel understood? Not a search box. Not a
        feed. A presence — someone (something) that remembers your story,
        matches your energy, and shows up every single time you open the app.
      </p>
      <p className="mt-4 text-base leading-7 text-muted">
        Today SeeMe is a demo of that vision: a full platform where you can
        discover companions, design your own from scratch, chat with them, and
        soon generate images and video together. Tomorrow — the real thing,
        wired to frontier AI models and shaped by an amazing creator community.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {VALUES.map((v) => (
          <div key={v.title} className="rounded-2xl border border-line bg-surface p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft">
              <v.icon className="h-5 w-5 text-accent" />
            </span>
            <h2 className="mt-4 font-bold">{v.title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{v.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-line bg-surface p-8 text-center">
        <h2 className="text-xl font-extrabold">Want to build with us?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
          This entire site is a working demo built with Next.js. Fork it, break
          it, make it yours.
        </p>
        <Link
          href="/characters"
          className="btn-gradient mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
        >
          Explore the demo
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
