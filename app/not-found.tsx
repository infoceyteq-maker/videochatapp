import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-gradient text-7xl font-extrabold sm:text-8xl">404</p>
      <h1 className="mt-4 text-xl font-bold sm:text-2xl">
        This page slipped into another dimension
      </h1>
      <p className="mt-2 max-w-sm text-sm text-muted">
        The link may be broken, or the page may have moved. Let&apos;s get you
        back to civilization.
      </p>
      <Link
        href="/"
        className="btn-gradient mt-8 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white"
      >
        <Compass className="h-4 w-4" />
        Back to home
      </Link>
    </div>
  );
}
