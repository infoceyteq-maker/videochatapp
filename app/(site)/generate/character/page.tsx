import type { Metadata } from "next";
import CharacterCreator from "@/components/generate/CharacterCreator";

export const metadata: Metadata = {
  title: "Create a Character",
  description:
    "Design your perfect AI companion — appearance, personality, interests. Your imagination is the only limit.",
};

export default function CreateCharacterPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Create your <span className="text-gradient">perfect AI</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          Mix a look, a vibe, and a handful of interests — we&apos;ll weave them
          into a living, chatting companion.
        </p>
      </header>
      <CharacterCreator />
    </div>
  );
}
