# MediSmile Group — Project Context (for Claude)

You are the senior engineer on the **MediSmile Group Digital Ecosystem**: a premium dental clinic platform in Orlando, FL (two units — Winter Springs & Ocoee).

## Stack
Next.js 14 App Router · TypeScript (strict) · Tailwind + CSS-variable tokens · Framer Motion · Supabase · Anthropic API (`claude-sonnet-4-6`) · Evolution API (WhatsApp) · Vercel.

## Non-negotiable rules
- TypeScript strict, explicit types — **never `any`**. Explicit types on every function param.
- Use design tokens only (`bg-primary`, `text-accent`, …) — **never hardcode hex colors**. Source of truth: `src/app/globals.css`. Visual bible: `Base_docs/medismile-prototype.html` + `design-system/medismile/MASTER.md`.
- Server Components by default; Client Components only when required (interactions, hooks).
- Never touch the DB from the client — use Route Handlers / Server Actions.
- Never expose secrets to the browser (only `NEXT_PUBLIC_*`).
- Always add loading + error states on every async operation.
- No `useEffect` for data fetching — use Server Components or React Query.
- Images always need `width`, `height`, and `alt` props.
- Commits in English: `feat(scope): description`.
- Ask before architecture decisions not covered by `Base_docs/`.

## Source documents (consult before implementing any feature)
- `Base_docs/MediSmile-PRD-v1.0.docx` — product requirements
- `Base_docs/MediSmile-Sprint-Plan-v1.0.docx` — sprint scope
- `Base_docs/MediSmile-Developer-Handoff-v1.0.docx` — component specs
- `Base_docs/medismile-prototype.html` — visual bible (absolute reference)
- `design-system/medismile/MASTER.md` — **canonical token reference** (palette, typography, spacing, z-index, motion, shadows, voice, anti-patterns). Always check before adding new visual values.
- `design-system/medismile/pages/` — per-page overrides (`home.md`, `services.md`, `sofia.md`) — take priority over MASTER for their specific page.

## Design tokens
Palette: Deep Ocean Blue `#0B4F6C` · Aqua Vitae `#22C9A5` · Champagne Gold `#C8A96E` · Pearl White `#F8FAFB` · Midnight `#0F1923`.
Type: Playfair Display (headlines) / Inter (body) / DM Sans (UI).
Token naming: `--color-*` (CSS vars in `globals.css`) → Tailwind utilities in `tailwind.config.ts`.

## Component pattern (follow Button.tsx as reference)
- `cva` + `VariantProps` for variant/size management
- `forwardRef` + `displayName`
- Named export + export of the variants object
- JSDoc comment per variant explaining when to use it
- Zero hardcoded values — Tailwind tokens only

## Known type fix for Supabase SSR cookies
In `setAll(cookiesToSet)` params, always type explicitly:
```ts
type CookieToSet = { name: string; value: string; options?: Record<string, unknown> };
setAll(cookiesToSet: CookieToSet[]) { ... }
```
Applied in: `src/lib/supabase/server.ts` · `src/middleware.ts`.

## Roadmap
- ✅ S1 Foundation & Design System — **DONE** (build passing, 18/18 pages)
- ✅ S2 Core Pages — **DONE**
  - ✅ S2.1 Home — $10K upgrade: CountUp stats, TestimonialsCarousel (autoplay + direction-aware), real clinic photos, animated hero with floating social-proof cards
  - ✅ S2.2 Services — 8 alternating dark/light sections, real content, First Visit $99 banner, 5 insurers, 7-question FAQ
  - ✅ S2.3 Sofia AI Chatbot — fixed 2026-06-18: `ChatWidget` was POSTing `{message, conversationId}` but `/api/chat` expected `{sessionId, messages}`, so Sofia never replied in any environment. Fixed the contract, made conversation persistence create the row (was a silent no-op before), and mounted the widget site-wide via `(site)/layout.tsx` instead of just the homepage. Full streaming/rate-limiting is still Sprint 4 per the code's own comments — current scope is "request actually works."
  - ✅ S2.4 About — Dr. Nelson timeline, mission, care team
  - ✅ S2.5 Contact — email regex validation fix
  - ✅ S2.6 First Visit + Insurance content pages — Insurance page rebuilt with real lead-capture form (`/api/leads`), FAQ, call/WhatsApp CTA
- ✅ S3 Full site + SEO — **DONE**
  - ✅ Technical SEO: dynamic `sitemap.ts` + `robots.ts`, JSON-LD (`Dentist`) for both locations, generated `opengraph-image.tsx` (brand colors, no fabricated photo), Vercel Analytics, optional GA4 via `NEXT_PUBLIC_GA_ID`
  - ✅ Mobile 375px pass found + fixed a real horizontal-overflow bug on Home/Services (Framer Motion off-screen `initial={{x}}` states) — fixed globally with `overflow-x: hidden` on `body`
  - ✅ Blog infra hardened: shared `src/lib/blog-posts.ts` data source (also used by sitemap), real `generateMetadata`, real 404 (`dynamicParams = false`) for unknown slugs, redesigned article template with design tokens
  - ✅ Blog content — 7 real articles written (5 service-focused: Implants, SureSmile/Orthodontics, Whitening, Endodontics, Orofacial Harmonization; plus First Visit and the existing Bilingual Community piece). Grounded only in facts already established in `services/page.tsx` and CLAUDE.md — no invented statistics, success rates, or specific medical claims. `BlogPost.content` is a typed block array (`heading`/`paragraph`) in `src/lib/blog-posts.ts`.
  - ✅ Security headers in `next.config.mjs`: CSP, HSTS, Permissions-Policy. CSP's `script-src` only adds `'unsafe-eval'` when `NODE_ENV !== 'production'` (Next dev server needs it for Fast Refresh; production doesn't).
  - ✅ Contact page converted to a Server Component shell (real `metadata`/`openGraph`) wrapping a new `ContactForm.tsx` Client Component — same pattern as the Insurance page.
  - ⚠️ `MotionProvider` (`src/components/providers/MotionProvider.tsx`) wraps the app in `LazyMotion` but **without** `strict` — every animated component here uses `motion.*`, not the lighter `m.*` API `strict` mode requires, so enabling `strict` throws a hard render error on every page (caught this in dev; the already-deployed prod site was unaffected since the invariant check is dev-only, but don't re-enable `strict` without migrating every `motion.*` call site to `m.*` first — see ChatWidget, DoctorSection, ServicesSections, FAQAccordion, TestimonialsCarousel, Card, AnimatedGrid, HeroSection).
  - ✅ Real insurance plan logos sourced from the user (`public/images/insurance/`) — see "Accepted insurance" below.
  - ✅ Hero photo fixes: floating badges (`HeroSection.tsx`) were misaligned on desktop because the wrapper around the photo had no width limit while the photo itself does (`max-w-[460px]`) — constrained the wrapper to match. The photo (`sorriso-bg.png`) also has real transparent regions, so it needs its own gradient background fill or the dark hero background bleeds through with no visible card edge.
  - ⏳ Performance: next/font + next/image already in place; no further action needed unless a Lighthouse pass surfaces something
- S4 AI Agent + WhatsApp
- S5 Admin panel (role-based: commercial vs admin; Supabase Storage CMS; image upload UI — see architecture below)
- S6 QA & go-live

## S5 Admin Panel Architecture (planned)
- **Roles:** `commercial` (leads/clients only) · `admin` (full CMS + user management) · `master` (adds commercial accounts + edits all site images/banners)
- **CMS:** Supabase Storage for image uploads + `site_content` table for banner/photo URLs
- **Client-editable:** banners (hero top bar), service photos, team photos — all via drag-and-drop upload UI
- Stack: existing Supabase project · Next.js Route Handlers · `@supabase/ssr`

## Real photos (public/images/)
- `brand/`: logo.png — real MediSmile Group logo, sourced from the official live site (medismilegroup.com). Used as-is in `Nav.tsx` and `Footer.tsx` — never recolor or distort it; it's a fixed brand asset, exempt from the "never hardcode hex" token rule.
- `hero/`: clinic-office.jpg · dentista-hero.jpg · sorriso-bg.png — all three are verified byte-identical to images on medismilegroup.com (this project's "real photos" were sourced from there originally). `dentista-hero.jpg` is used in the About page's "Your care team" section.
- `services/`: dental-tools.jpg · implants.png · tooth-anatomy.png · xray.png · orthodontics.jpg · suresmile-aligners.jpg · orofacial-harmonization.jpg (last 3 sourced from Unsplash, free tier, no attribution required — see `ServicesSections.tsx`'s `SERVICE_PHOTOS` map; every one of the 8 services now has its own dedicated photo, no duplicates)
- `team/`: dr-nelson.png — high-res professional photo (user-provided 2026-06-21, replaced the original 101x101 low-res crop from medismilegroup.com). Used in both `DoctorSection.tsx` (Home) and the About page hero. If a swapped image doesn't show up in dev after replacing a file at the same path, clear `.next/cache/images` — Next's dev image optimizer can serve a stale cached version.
- `about/`: lounge.jpg · reception.jpg · treatment-room.jpg · hallway.jpg · consultation-room.jpg · exterior.jpg — real interior/exterior photos of the actual office, sourced from a CSS-background-image gallery on medismilegroup.com (not visible to plain HTML scraping — found via headless-browser DOM inspection). Used in the About page's "Our space" section. 6 unused variants of this same WhatsApp-sourced photo set exist on the live site if more are ever needed.
- `testimonials/`: renata.png · vitoria.png · victor.png
- `insurance/`: aetna.avif · ameritas.avif · humana.avif · metlife.avif · geha.avif · united-concordia.avif · blue-cross-blue-shield.avif — real carrier logos provided by the user; referenced via `src/lib/insurance-plans.ts`, never hardcode a path to these elsewhere. Rendered via `InsuranceMarquee.tsx` (continuous CSS marquee, `animate-marquee` in `tailwind.config.ts`/`globals.css`) on Home and Services; the dedicated `/insurance` page keeps a static grid since that page's job is scannability, not a trust-bar teaser.
- `services/procedure-1.webp` · `procedure-2.webp` · `procedure-3.webp` exist but are unused (before/after clinical shots — missing tooth, decay, healthy smile) and not part of any page yet

## AI Agent handoff contract
Sofia emits, on qualification:
`<LEAD_QUALIFIED>{"name","service","insurance","unit","schedule_preference","language"}</LEAD_QUALIFIED>`
→ persist the lead and notify the commercial team via WhatsApp (`16893103396`).

## Clinic info (always use these, never invent)
- **Winter Springs:** 411 E State Rd 434 Suite D, FL 32708 · (689) 213-4161
- **Ocoee:** 10131 W Colonial Drive Suite 3, FL 34761 · (689) 310-3396
- **Hours:** Mon–Fri 10AM–6PM
- **WhatsApp:** (689) 310-3396
- **Doctor:** Dr. Nelson Marques — 30+ years, Implants + Orofacial Harmonization, U of Florida + MARC Institute Miami, bilingual EN/PT
- **Accepted insurance:** Humana, Aetna, Delta Dental, Ameritas, United Concordia, GEHA, MetLife, Blue Cross Blue Shield (+ self-pay). Single source of truth: `src/lib/insurance-plans.ts` — `system-prompt.ts` (Sofia) and the Home/Services/Insurance pages all read from it. Real logo assets exist for every plan except Delta Dental (`public/images/insurance/`). Never substitute or add a carrier without updating that file first.
