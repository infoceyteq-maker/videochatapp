"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, ImageIcon, MessageCircle, MoreHorizontal, Wand2 } from "lucide-react";

const ITEMS = [
  { href: "/characters", label: "Explore", icon: Compass },
  { href: "/generate/images", label: "Gallery", icon: ImageIcon },
  { href: "/generate/character", label: "Create AI", icon: Wand2, primary: true },
  { href: "/chats", label: "Chats", icon: MessageCircle },
  { href: "/discover", label: "More", icon: MoreHorizontal },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="glass fixed inset-x-0 bottom-0 z-50 border-t border-line pb-[env(safe-area-inset-bottom)] md:hidden"
      aria-label="Mobile bottom navigation"
    >
      <div className="grid grid-cols-5">
        {ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors ${
                active ? "text-accent" : "text-subtle hover:text-muted"
              }`}
            >
              {item.primary ? (
                <span className="btn-gradient -mt-4 flex h-11 w-11 items-center justify-center rounded-full shadow-glow">
                  <item.icon className="h-5 w-5 text-white" />
                </span>
              ) : (
                <item.icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              )}
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
