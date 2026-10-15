import type { Metadata } from "next";
import ImageGenerator from "@/components/generate/ImageGenerator";

export const metadata: Metadata = {
  title: "Generate Images",
  description:
    "Turn your imagination into AI-generated art — anime, realistic, illustrated and more.",
};

export default function GenerateImagesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-10 max-w-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          Generate <span className="text-gradient">images</span>
        </h1>
        <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
          Describe anything — a scene, a portrait, a whole world — and watch it
          come alive in seconds.
        </p>
      </header>
      <ImageGenerator />
    </div>
  );
}
