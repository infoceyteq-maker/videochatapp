"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Compass,
  Sparkles,
  MessageCircle,
  Menu,
  X,
  Eye,
  Wand2,
  ImageIcon,
  Video,
} from "lucide-react";

function DrawerLink({
  href,
  onClick,
  className,
  children,
}: {
  href: string;
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

const NAV = [
  { href: "/characters", label: "Explore", icon: Compass },
  { href: "/discover", label: "Discover", icon: Sparkles },
  { href: "/chats", label: "Chats", icon: MessageCircle },
];

const CREATE_LINKS = [
  { href: "/generate/character", label: "Create characters", icon: Wand2 },
  { href: "/generate/images", label: "Generate images", icon: ImageIcon },
  { href: "/generate/videos", label: "Generate videos", icon: Video },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled ? "glass border-b border-line shadow-[0_8px_30px_rgba(0,0,0,0.35)]" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2" aria-label="SeeMe home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl btn-gradient">
              <Eye className="h-5 w-5 text-white" strokeWidth={2.4} />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              See<span className="text-gradient">Me</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:bg-white/5 hover:text-text"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Create dropdown */}
            <div className="group relative">
              <button
                className="flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium text-muted transition-colors hover:bg-white/5 hover:text-text"
                aria-haspopup="true"
              >
                <Wand2 className="h-4 w-4" />
                Create
                <svg
                  className="h-3.5 w-3.5 transition-transform group-hover:rotate-180"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div className="invisible absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 translate-y-1 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
                  {CREATE_LINKS.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-muted transition-colors hover:bg-elevated hover:text-text"
                    >
                      <l.icon className="h-4 w-4 text-accent" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/chats"
              className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-text"
            >
              Sign in
            </Link>
            <Link
              href="/generate/character"
              className="btn-gradient rounded-lg px-5 py-2 text-sm font-semibold text-white"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-text transition-colors hover:bg-white/5 md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div
            className="absolute inset-0 animate-fade-in bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-0 flex h-full w-[82%] max-w-xs animate-scale-in flex-col border-l border-line bg-surface">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="text-lg font-extrabold">
                See<span className="text-gradient">Me</span>
              </span>
              <button
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:bg-white/5 hover:text-text"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 overflow-y-auto p-4" aria-label="Mobile">
              {NAV.map((item) => (
                <DrawerLink
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive(item.href)
                      ? "bg-accent-soft text-accent"
                      : "text-muted hover:bg-elevated hover:text-text"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </DrawerLink>
              ))}

              <p className="mt-5 px-4 text-xs font-semibold uppercase tracking-widest text-subtle">
                Create
              </p>
              {CREATE_LINKS.map((l) => (
                <DrawerLink
                  key={l.href}
                  href={l.href}
                  onClick={close}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted hover:bg-elevated hover:text-text"
                >
                  <l.icon className="h-5 w-5 text-accent" />
                  {l.label}
                </DrawerLink>
              ))}
            </nav>

            <div className="mt-auto space-y-2 border-t border-line p-4 pb-[env(safe-area-inset-bottom)]">
              <DrawerLink
                href="/chats"
                onClick={close}
                className="block rounded-xl border border-line px-4 py-3 text-center text-sm font-semibold text-text"
              >
                Sign in
              </DrawerLink>
              <DrawerLink
                href="/generate/character"
                onClick={close}
                className="btn-gradient block rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Get Started
              </DrawerLink>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
