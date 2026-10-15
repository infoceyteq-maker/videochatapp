import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The rules of the road for using SeeMe (demo).",
};

const SECTIONS = [
  {
    title: "1. Acceptance of terms",
    body: "By accessing SeeMe you agree to these terms. This is a demonstration application — features are simulated and provided as-is without warranty of any kind.",
  },
  {
    title: "2. Eligibility & age",
    body: "You must be at least 18 years old to use SeeMe. The age gate exists for a reason — please respect it.",
  },
  {
    title: "3. AI-generated content",
    body: "All characters and conversations on SeeMe are AI-generated fiction. Companions are not real people and no representation is made to the contrary.",
  },
  {
    title: "4. Acceptable use",
    body: "Don't use SeeMe to harass, defame, or impersonate real people; to generate content involving minors; or to break any applicable law. We cooperate with law enforcement where required.",
  },
  {
    title: "5. Your content",
    body: "You retain rights to prompts and text you submit. You grant us the license needed to operate the service and generate responses.",
  },
  {
    title: "6. Availability",
    body: "This is a demo build. Features may change, break, or disappear at any time without notice.",
  },
  {
    title: "7. Contact",
    body: "Questions about these terms? Reach out via the help center linked in the footer.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Terms of Service</h1>
      <p className="mt-2 text-sm text-subtle">Last updated: October 2026 · Demo version</p>

      <div className="mt-10 space-y-8">
        {SECTIONS.map((s) => (
          <section key={s.title}>
            <h2 className="font-bold">{s.title}</h2>
            <p className="mt-2 text-[15px] leading-7 text-muted">{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
