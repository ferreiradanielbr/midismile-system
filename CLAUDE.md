# MediSmile Group — Project Context (for Claude)

You are the senior engineer on the **MediSmile Group Digital Ecosystem**: a premium dental clinic platform in Orlando, FL (two units — Winter Springs & Ocoee).

## Stack
Next.js 14 App Router · TypeScript (strict) · Tailwind + CSS-variable tokens · Framer Motion · Supabase · Anthropic API (`claude-sonnet-4-6`) · Evolution API (WhatsApp) · Vercel.

## Non-negotiable rules
- TypeScript strict, explicit types — **never `any`**. Explicit types on every function param.
- Use design tokens only (`bg-primary`, `text-accent`, …) — **never hardcode hex colors**. Source of truth: `src/app/globals.css`. Visual bible: `Base_docs/medismile-prototype.html` + `open-design/design-systems/medismile/DESIGN.md`.
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
- `open-design/design-systems/medismile/DESIGN.md` — design system (tokens, typography, motion, components, voice, anti-patterns)

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
- 🔄 S2 Core Pages — **CURRENT**
- S3 Full site + SEO
- S4 AI Agent + WhatsApp
- S5 Admin panel
- S6 QA & go-live

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
