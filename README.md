# MediSmile Group — Digital Ecosystem

Premium dental clinic platform for **MediSmile Group**, Orlando FL (Winter Springs + Ocoee). Public marketing site, an AI receptionist ("Sofia") with WhatsApp handoff, and an internal admin panel for the commercial team.

## Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS variable design tokens |
| Animation | Framer Motion |
| Backend / DB | Supabase (Postgres, Auth, Realtime, RLS) |
| AI Agent | Anthropic API (`claude-sonnet-4-6`) |
| WhatsApp | Evolution API |
| Deploy | Vercel |

## Prerequisites

- Node.js ≥ 18.18
- A Supabase project
- Anthropic API key
- (Sprint 4+) Evolution API instance for WhatsApp

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.local.example .env.local
#    → fill in Supabase, Anthropic and (later) Evolution values

# 3. Apply the database schema
#    Option A — Supabase CLI:
npx supabase db push
#    Option B — paste supabase/migrations/001_initial.sql into the SQL editor

# 4. Run the dev server
npm run dev   # http://localhost:3000
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (Next.js + TS rules) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run format` | Prettier write |
| `npm run test:e2e` | Playwright E2E tests (Sprint 6) |

## Project structure

```
src/
├── app/
│   ├── (site)/              # Public site route group
│   │   ├── page.tsx         # Home
│   │   ├── services/ about/ insurance/ first-visit/ contact/
│   │   ├── blog/ + blog/[slug]/
│   │   └── design-system/   # Living style guide
│   ├── (admin)/             # Protected admin route group
│   │   └── admin/ (dashboard, leads, leads/[id], settings)
│   ├── api/
│   │   ├── chat/            # AI Agent endpoint
│   │   ├── leads/           # Lead CRUD
│   │   └── whatsapp/webhook/
│   ├── login/               # Admin sign-in
│   ├── layout.tsx           # Root layout + fonts
│   └── globals.css          # Design tokens (source of truth)
├── components/ ui | site | chat | admin
├── lib/ supabase | anthropic | whatsapp | utils.ts
├── types/                   # Shared domain types
└── middleware.ts            # /admin route protection
supabase/migrations/001_initial.sql
```

## Design system

All colors, typography, spacing, radii and shadows are CSS variables in
`src/app/globals.css` and surfaced as Tailwind utilities via `tailwind.config.ts`.
**Never hardcode colors** — use token-backed classes (`bg-primary`, `text-accent`,
`shadow-premium`, …). The approved `Base_docs/medismile-prototype.html` is the
visual reference. Browse `/design-system` to see components.

- **Palette:** Deep Ocean Blue `#0B4F6C` · Aqua Vitae `#22C9A5` · Champagne Gold `#C8A96E` · Pearl White `#F8FAFB`
- **Type:** Playfair Display (display) · Inter (body) · DM Sans (UI)

## Coding rules

- TypeScript strict, explicit types — never `any`.
- Server Components by default; Client Components only when needed.
- Never access the DB from the client — use Route Handlers / Server Actions.
- Never expose secrets to the browser (only `NEXT_PUBLIC_*` is public).
- Always add loading and error states.
- Commits in English: `feat(chat): add lead qualification flow`.

## Roadmap (6 sprints / 12 weeks)

1. **Foundation & Design System** ← _current_
2. Core Pages (Home, Services, Contact)
3. Full site + technical SEO
4. AI Agent + WhatsApp integration
5. Admin panel (dashboard, Kanban pipeline)
6. QA, polish & go-live

See `Base_docs/` for the full PRD, Sprint Plan and Developer Handoff.
