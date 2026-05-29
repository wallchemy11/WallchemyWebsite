# Wallchemy Website — Claude Code Context

## What this project is
Luxury texture & surface studio marketing site. Owner edits content frequently via `/admin` — no headless CMS, everything is a custom CMS built into the app.

## Stack
- **Next.js 14.2** (App Router) · React 18 · TypeScript · Tailwind CSS
- **GSAP 3.12** + Lenis for animations and smooth scroll
- **Neon Postgres** (`@neondatabase/serverless`) — live CMS data
- **Vercel Blob** — image/video uploads
- Deployed on **Vercel**

## Running locally
```bash
npm run dev        # custom scripts/dev.mjs — handles Node version detection
```
- Node 24 is installed globally; project targets Node 20. The dev script falls back to Turbopack automatically — this is expected, not a bug.
- Port 3000 is often occupied. Next.js will try 3001, 3002, etc. Check the terminal output for the actual port.
- All secrets are in `.env.local` (Neon DB URL, Vercel Blob token, admin credentials).

## Project structure
```
app/
  (site)/          # Public site — all dynamic, no static cache
    page.tsx       # Homepage — assembles all homepage sections
    about/
    textures/
    projects/
    process/
    contact/
  (admin)/admin/   # CMS — /admin/* routes, protected by cookie auth
components/
  sections/        # One file per homepage/page section
  ui/              # Reusable primitives (VideoHero, SplitText, SafeImage…)
  animations/      # GSAP helpers, ScrollReveal, SmoothScroll, useMotionPrefs
  layout/          # SiteHeader, SiteFooter (server + client variants)
lib/
  cms.ts           # CMS resolution: DB → file-based JSON → defaults
  cms-defaults.ts  # Fallback content (used when DB is unavailable)
  db/schema.sql    # Postgres schema
```

## CMS content flow
`lib/cms.ts` tries: **Neon DB** → `/data/*.json` → `cms-defaults.ts`. DB is always active in production. Admin at `/admin` edits DB via API routes under `/api/admin/*`.

## Design tokens (CSS vars injected in app/layout.tsx)
| Token | Value | Use |
|---|---|---|
| `ink` | `#0b0a09` | Background |
| `alabaster` | `#f2ede4` | Primary text |
| `brass` | `#c9a66b` | Accent / highlights |
| `smoke` | — | Muted surfaces |
| `ember` | — | Warm accent |

Display fonts: Playfair / Cormorant / DM Serif / Lora / Cinzel  
Body font: Inter / Manrope (configured via site_settings in DB)

## Homepage section order (app/(site)/page.tsx)
1. `VideoHero` — full-screen video hero
2. `SplitText` — intro paragraph (animated word-by-word)
3. `HomeCinematicPanels` — **Top Finishes** (scroll-pinned crossfade, editorial diptych layout)
4. `DramaticImageReveal` — full-bleed image, alt="Why Wallchemy"
5. `EditorialManifesto` — "What makes us different" principle rows
6. `CinematicDivider` — studio craft divider image
7. `HomeCtas` — primary CTA buttons
8. `TextureRibbon` — horizontal material library ribbon
9. `CinematicDivider` — selected work divider image
10. `SelectedWorkGallery` — selected work grid
11. `SelectedProjects` — featured projects

## Key constraints / non-obvious things
- **Never `pkill -f "Google Chrome"`** — the user keeps a real Chrome session open. Kill headless instances by PID only.
- `HomeCinematicPanels` uses GSAP scroll-pin on desktop (lg + pointer:fine). On mobile/touch it degrades to a plain vertical stack — the matchMedia cleanup handles this.
- All images in `HomeCinematicPanels` use `object-cover` (not `object-contain`). Do not revert this.
- Admin auth uses plain string compare against `ADMIN_USERNAME`/`ADMIN_PASSWORD` env vars (not bcrypt). 12h cookie session.
- Hero video: prefer direct `.mp4`/`.m3u8` URLs. Cloudflare watch-page URLs are rejected by the video component.

## Recent work (as of May 2026)
- Reworked `HomeCinematicPanels` (Top Finishes): editorial diptych layout, object-cover everywhere, ghost panel numeral, brass ruling line, scale-settle GSAP animation on panel entry, clean mobile vertical stack.
- Moved Top Finishes section to appear before the Why Wallchemy image reveal.
- Earlier: brand kit fonts enforced, background texture fixed, star revolving overlay in hero, font/padding sizing pass, Why Wallchemy row tightening.
