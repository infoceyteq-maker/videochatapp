# SeeMe 👁️ — AI Companions Platform

A full-featured **joi.com-style** AI companion platform built with **Next.js 16 (App Router) + Tailwind CSS v4 + TypeScript**.

> ⚠️ 18+ concept demo. All characters are fictional and AI-generated. Interactions are simulated — no real backend is connected yet.

## ✨ Features

| Area | What's included |
|---|---|
| **Home** | Hero with ambient orbs + floating avatar collage, stats, trending grid, feature cards, category tiles, how-it-works, CTA |
| **Explore** | 16 seeded characters, category chips (12), gender filter, sort (trending/new/likes) — all URL-driven (`?category=anime&gender=female`) |
| **Character profiles** | Gradient hero, stats, badges (Original / Creator / Trending / New), about, vibe, categories, related characters |
| **Chat** | Full-screen chat experience — message bubbles, typing indicator, starter chips, simulated AI replies with character-aware responses |
| **Create** | Interactive character creator — live avatar preview (6 art styles), reroll, gender/age/vibe/interests pickers, creation animation |
| **Image generator** | Prompt box, idea chips, 6 styles, skeleton loading, hover actions |
| **Video generator** | Coming-soon roadmap page |
| **Chats list** | Recent conversations with online status, timestamps, search |
| **Discover** | All categories + most-viewed section |
| **Global** | 18+ age gate (localStorage, hydration-safe via `useSyncExternalStore`), mobile bottom nav with floating "Create" button, desktop header with dropdowns, glassmorphism, 404 page, legal pages (Terms/Privacy/About) |

## 🎨 Design system

Dark-first theme defined in [`app/globals.css`](app/globals.css) via Tailwind v4 `@theme` tokens:

- **Colors** — `bg #07070d`, surface `#101018`, accent gradient `#ff2d7a → #b026ff → #7c3aed`
- **Font** — Plus Jakarta Sans (self-hosted via Fontsource, no Google Fonts dependency)
- **Motion** — fade-up, scale-in, float, shimmer skeletons, typing dots (staggered grid entrances)
- **Utilities** — `.text-gradient`, `.btn-gradient`, `.glass`, `.card-hover`, `.skeleton`

## 🗂 Structure

```
app/
├── layout.tsx                  # root layout (fonts, metadata, viewport)
├── (site)/                     # pages with header/footer chrome
│   ├── page.tsx                # home
│   ├── characters/             # explore + [slug] profile
│   ├── chats/                  # chat list
│   ├── discover/               # category hub
│   ├── generate/               # character / images / videos
│   └── about · terms · privacy
└── (chat)/                     # full-screen chat (no site chrome)
    └── characters/[slug]/chat/
components/
├── layout/                     # Header, BottomNav, Footer, AgeGate, SocialIcons
├── character/                  # CharacterCard, FilterBar
├── chat/                       # ChatThread
└── generate/                   # CharacterCreator, ImageGenerator
lib/
└── data.ts                     # types, 16 characters, categories, demo AI engine
```

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (45 static pages)
npm run lint     # eslint — clean
```

## 🔌 Wiring up a real backend

The demo is deliberately frontend-only. To go live:

1. **Characters** — replace `lib/data.ts` with API calls (`fetch` in RSC or route handlers)
2. **Chat AI** — swap `aiReply()` for an LLM endpoint (OpenAI / Anthropic / local), stream via server actions or API routes
3. **Avatars/images** — replace DiceBear URLs with your generated media on S3/R2 + `next/image` optimizer
4. **Auth** — add NextAuth/Auth.js with age verification
5. **Payments** — Stripe credits/subscription tiers

## 📝 Notes

- Remote images use `unoptimized` (DiceBear is fetched client-side) — drop the flag and configure `remotePatterns` when serving your own media
- Filters are URL-search-param driven, so every filter state is shareable and SEO-crawlable
- All pages are statically generated except `/characters` (dynamic for search params)
