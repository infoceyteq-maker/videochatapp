import Link from "next/link";
import Image from "next/image";
import { Heart, Eye } from "lucide-react";
import type { Character } from "@/lib/data";
import { formatCount, BADGE_LABEL } from "@/lib/data";

export default function CharacterCard({
  character,
  index = 0,
}: {
  character: Character;
  index?: number;
}) {
  return (
    <Link
      href={`/characters/${character.slug}`}
      className="card-hover group relative block overflow-hidden rounded-2xl border border-line bg-surface"
      style={{ animation: `var(--animate-fade-up)`, animationDelay: `${Math.min(index, 12) * 45}ms` }}
    >
      {/* Cover */}
      <div
        className="relative aspect-[4/5] w-full"
        style={{
          background: `linear-gradient(155deg, ${character.coverFrom}, ${character.coverTo})`,
        }}
      >
        {/* soft radial highlight */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(255,255,255,0.22),transparent_55%)]" />

        {/* Avatar */}
        <div className="absolute inset-0 flex items-end justify-center">
          <Image
            src={character.avatar}
            alt={`${character.name} avatar`}
            unoptimized
            width={280}
            height={280}
            className="h-[86%] w-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 group-hover:scale-[1.04]"
          />
        </div>

        {/* Badge */}
        {character.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md ${
              character.badge === "trending" || character.badge === "new"
                ? "bg-accent/85 text-white"
                : "bg-black/50 text-white/90"
            }`}
          >
            {BADGE_LABEL[character.badge]}
          </span>
        )}

        {/* Stats */}
        <div className="absolute right-3 top-3 flex flex-col items-end gap-1.5">
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-md">
            <Heart className="h-3 w-3 fill-accent text-accent" />
            {formatCount(character.likes)}
          </span>
          <span className="flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white/90 backdrop-blur-md">
            <Eye className="h-3 w-3" />
            {formatCount(character.views)}
          </span>
        </div>

        {/* Bottom overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent px-4 pb-3.5 pt-12">
          <p className="text-[13px] font-semibold text-white/95">{character.title}</p>
          <p className="mt-0.5 text-sm font-extrabold text-white">
            {character.name.split(" ")[0]}, {character.age}
          </p>
        </div>
      </div>

      {/* Tagline */}
      <div className="px-4 py-3">
        <p className="line-clamp-2 text-[13px] leading-5 text-muted group-hover:text-text transition-colors">
          {character.tagline}
        </p>
      </div>
    </Link>
  );
}
