import Link from "next/link";
import { Eye } from "lucide-react";
import {
  DiscordIcon,
  InstagramIcon,
  RedditIcon,
  XIcon,
} from "@/components/layout/SocialIcons";

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Explore characters", href: "/characters" },
      { label: "Create a character", href: "/generate/character" },
      { label: "Generate images", href: "/generate/images" },
      { label: "Generate videos", href: "/generate/videos" },
      { label: "My chats", href: "/chats" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Discover", href: "/discover" },
      { label: "Become an affiliate", href: "/about" },
      { label: "Creator partnership", href: "/about" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "/about" },
      { label: "Safety at SeeMe", href: "/about" },
      { label: "Complaints policy", href: "/about" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Refund policy", href: "/about" },
    ],
  },
];

const SOCIALS = [
  { label: "Discord", icon: DiscordIcon },
  { label: "Reddit", icon: RedditIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "X", icon: XIcon },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface/50">
      <div className="mx-auto max-w-7xl px-4 py-14 pb-28 sm:px-6 md:pb-14">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl btn-gradient">
                <Eye className="h-5 w-5 text-white" strokeWidth={2.4} />
              </span>
              <span className="text-xl font-extrabold tracking-tight">
                See<span className="text-gradient">Me</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
              Your fantasy, your rules. Create, chat, and connect with AI companions
              built exactly the way you imagine them.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-subtle">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition-colors hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-line pt-8 md:flex-row">
          <p className="text-xs text-subtle">
            © {new Date().getFullYear()} SeeMe AI. All rights reserved. Demo build.
          </p>
          <div className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-muted">
            <span className="h-2 w-2 rounded-full bg-success animate-pulse-dot" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
