import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SeeMe (demo) handles data — short version: locally, in your browser.",
};

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "In this demo build: nothing leaves your browser. Your age-gate confirmation and chat drafts are stored in localStorage only. No accounts, no servers, no tracking.",
  },
  {
    title: "2. In a production build",
    body: "A real deployment would collect: account details (email, hashed password), chat history (to power memory), and anonymized usage analytics with consent. This section would describe lawful bases, retention periods, and deletion rights.",
  },
  {
    title: "3. Cookies & storage",
    body: "We use localStorage for the age-verification flag only. No third-party advertising cookies in this demo.",
  },
  {
    title: "4. Your rights",
    body: "You can clear all demo data at any time by clearing your browser storage for this site.",
  },
  {
    title: "5. Children",
    body: "SeeMe is strictly 18+. We do not knowingly collect data from anyone under 18.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight">Privacy Policy</h1>
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
