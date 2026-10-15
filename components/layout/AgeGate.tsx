"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import { ShieldCheck } from "lucide-react";

const STORAGE_KEY = "seeme:age-verified";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function getSnapshot() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  // server always reports "verified" so nothing renders during SSR/hydration
  return true;
}

export default function AgeGate() {
  const verified = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [locallyConfirmed, setLocallyConfirmed] = useState(false);

  const confirm = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore — session-only confirmation still applies below
    }
    setLocallyConfirmed(true);
  }, []);

  if (verified || locallyConfirmed) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="agegate-title"
    >
      <div className="w-full max-w-md animate-scale-in rounded-2xl border border-line bg-surface p-8 text-center shadow-card">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl btn-gradient">
          <ShieldCheck className="h-7 w-7 text-white" />
        </span>
        <h2 id="agegate-title" className="mt-5 text-2xl font-extrabold">
          Mature content
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          This page may contain sensitive or adult content. To continue, confirm
          you&apos;re over 18 years old. You can hide mature content again at any
          time in Settings.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={confirm}
            className="btn-gradient w-full rounded-xl px-5 py-3 text-sm font-semibold text-white"
          >
            Yes, I&apos;m over 18
          </button>
          <a
            href="https://www.google.com"
            className="w-full rounded-xl border border-line px-5 py-3 text-sm font-semibold text-muted transition-colors hover:text-text"
          >
            Take me out
          </a>
        </div>
      </div>
    </div>
  );
}
