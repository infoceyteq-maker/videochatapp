import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "SeeMe — AI Companions, Chat & Create",
    template: "%s · SeeMe",
  },
  description:
    "Create, discover, and chat with AI companions built exactly the way you imagine them. Your fantasy, your rules.",
  keywords: [
    "AI companion",
    "AI chat",
    "AI characters",
    "create AI",
    "SeeMe",
  ],
  openGraph: {
    title: "SeeMe — AI Companions, Chat & Create",
    description:
      "Create, discover, and chat with AI companions built exactly the way you imagine them.",
    type: "website",
    siteName: "SeeMe",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-bg font-sans text-text">{children}</body>
    </html>
  );
}
