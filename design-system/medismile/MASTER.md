# Design System Master — MediSmile Group

> **LOGIC:** When building a specific page, first check `design-system/medismile/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

**Project:** MediSmile Group  
**Generated:** 2026-06-15 (corrected from ui-ux-pro-max output — palette & fonts are locked per CLAUDE.md)  
**Category:** Premium Dental Clinic · Bilingual (EN/PT) · Orlando, FL  
**Source of truth for CSS vars:** `src/app/globals.css`  

---

## 1. Color System

> All values sourced from `src/app/globals.css`. **Never hardcode hex in components.** Use the CSS variable names below.

### Core Palette

| Role | Token | Hex | Notes |
|------|-------|-----|-------|
| Brand primary | `--color-primary` | `#0B4F6C` | Deep Ocean Blue — headers, CTAs, nav |
| Primary light | `--color-primary-light` | `#1A7BA0` | Hover states on primary |
| Primary dark | `--color-primary-dark` | `#073A52` | Pressed / active states |
| Accent / CTA | `--color-accent` | `#22C9A5` | Aqua Vitae — highlights, links, badges |
| Accent light | `--color-accent-light` | `#4DD9B8` | Hover on accent |
| Accent dim | `--color-accent-dim` | `#1AAC8D` | Active / pressed on accent |
| Gold | `--color-gold` | `#C8A96E` | Champagne Gold — premium badges, dividers, stars |
| Background | `--color-neutral-50` | `#F8FAFB` | Pearl White — page background |
| Card bg | `--color-neutral-100` | `#EFF4F7` | Soft — cards, alternate sections |
| Border | `--color-neutral-200` | `#DDE8EE` | Mist — dividers, input borders |
| Muted text | `--color-neutral-500` | `#5E7A8A` | Secondary / caption text |
| Body text | `--color-body` | `#2C3E4A` | Default paragraph text |
| Headings | `--color-neutral-900` | `#0F1923` | Midnight — h1/h2/h3 |
| White | `--color-white` | `#FFFFFF` | Text on dark backgrounds |
| Success | `--color-success` | `#22C55E` | Form success, confirmations |
| Error | `--color-error` | `#EF4444` | Form errors, destructive |
| Warning | `--color-warning` | `#F59E0B` | Alerts |
| WhatsApp | `--color-whatsapp` | `#25D366` | WhatsApp CTA only |

### Alpha / Overlay Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-accent-subtle` | `rgba(34,201,165,0.15)` | Accent tinted backgrounds |
| `--color-accent-border` | `rgba(34,201,165,0.25)` | Accent bordered cards |
| `--color-gold-subtle` | `rgba(200,169,110,0.15)` | Gold tinted sections |
| `--color-gold-border` | `rgba(200,169,110,0.25)` | Gold bordered elements |
| `--color-white-subtle` | `rgba(255,255,255,0.08)` | Frosted overlays on dark bg |
| `--color-white-faded` | `rgba(255,255,255,0.60)` | Faded white text on primary |
| `--color-white-border` | `rgba(255,255,255,0.12)` | Borders on dark sections |
| `--color-white-muted` | `rgba(255,255,255,0.45)` | Muted white text on primary |

### Dark Section Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary-darker` | `#0B2D40` | Gradient stop — darkest |
| `--color-primary-deep` | `#0A3850` | Gradient stop — mid |
| `--overlay-primary` | `rgba(11,79,108,0.55)` | Orb gradient on dark sections |
| `--overlay-accent` | `rgba(34,201,165,0.12)` | Accent orb on dark sections |

### Accessibility Notes

| Pair | Ratio | Result |
|------|-------|--------|
| `#0F1923` on `#F8FAFB` | ~17:1 | AAA |
| `#0B4F6C` on `#F8FAFB` | ~7.5:1 | AAA |
| `#FFFFFF` on `#0B4F6C` | ~7.5:1 | AAA |
| `#22C9A5` on `#0B4F6C` | ~4.6:1 | AA ✓ |
| `#22C9A5` on `#F8FAFB` | ~3.1:1 | AA Large only — never use as body text on white |
| `#C8A96E` on `#0B4F6C` | ~3.5:1 | AA Large — use at 18px+ only |
| `#C8A96E` on `#F8FAFB` | ~2.8:1 | Decorative only — never body text |

**Rule:** Gold (`--color-gold`) is decorative. Never use it as body text on light backgrounds.

---

## 2. Typography

> Fonts loaded via `next/font` in `app/layout.tsx`. CSS vars: `--font-playfair`, `--font-inter`, `--font-dm-sans`.

| Role | Family | CSS Token | Weight range |
|------|--------|-----------|-------------|
| Display / Headlines | Playfair Display | `--font-display` | 400, 500, 600, 700 |
| Body copy | Inter | `--font-body` | 300, 400, 500, 600 |
| UI elements (labels, buttons, nav) | DM Sans | `--font-ui` | 400, 500, 600 |

### Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-xs` | 12px / 0.75rem | Captions, fine print |
| `--text-sm` | 14px / 0.875rem | Labels, helper text |
| `--text-base` | 16px / 1rem | Body copy (minimum on mobile) |
| `--text-lg` | 18px / 1.125rem | Lead paragraphs |
| `--text-xl` | 20px / 1.25rem | Section intros |
| `--text-2xl` | 24px / 1.5rem | H3 / card titles |
| `--text-4xl` | 36px / 2.25rem | H2 section headings |
| `--text-6xl` | 60px / 3.75rem | H1 hero headline |

### Typography Rules

- Line-height: `1.5–1.75` for body, `1.1–1.3` for display headings
- Max line length: 65–75 chars on desktop, 35–55 on mobile
- Body weight: 400 (regular), labels 500 (medium), headings 600–700 (bold)
- Letter-spacing: `-0.02em` on large display text, `0` on body

---

## 3. Spacing System (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Tight inline gaps |
| `--space-2` | 8px | Icon gaps, badge padding |
| `--space-3` | 12px | Small padding |
| `--space-4` | 16px | Standard component padding |
| `--space-5` | 20px | Medium spacing |
| `--space-6` | 24px | Section inner padding |
| `--space-8` | 32px | Large component gaps |
| `--space-10` | 40px | Section spacing |
| `--space-12` | 48px | Major section margins |
| `--space-16` | 64px | Hero internal spacing |
| `--space-20` | 80px | Section vertical padding |
| `--space-24` | 96px | Large section gaps |
| `--space-28` | 112px | XL section spacing |
| `--space-32` | 128px | Max section padding |
| `--container-max` | 1200px | Max content width |

---

## 4. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 4px | Badges, tags |
| `--radius-md` | 8px | Buttons, inputs, small cards |
| `--radius-lg` | 16px | Cards, panels |
| `--radius-xl` | 24px | Modal, hero cards |
| `--radius-full` | 9999px | Pills, avatars, circular buttons |

---

## 5. Shadow System

> Shadows use the brand primary color tint (`rgba(11,79,108,…)`) for cohesion.

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(11,79,108,0.08)` | Subtle lift — nav items, inputs |
| `--shadow-md` | `0 4px 16px rgba(11,79,108,0.12)` | Cards, buttons |
| `--shadow-lg` | `0 8px 32px rgba(11,79,108,0.16)` | Modals, dropdowns, floating elements |
| `--shadow-xl` | `0 20px 60px rgba(11,79,108,0.20)` | Hero images, featured cards |
| `--shadow-chat` | `0 24px 64px rgba(11,79,108,0.22)` | Chat widget floating panel |
| `--shadow-premium` | `0 20px 60px rgba(11,79,108,0.20)` | Premium/featured components |

---

## 6. Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--z-base` | 0 | Normal document flow |
| `--z-raised` | 10 | Cards on hover, tooltips |
| `--z-nav` | 40 | Sticky navigation |
| `--z-chat` | 100 | Sofia chat widget |
| `--z-modal` | 200 | Modals, dialogs |
| `--z-toast` | 300 | Toast notifications |

---

## 7. Breakpoints

| Name | Width | Usage |
|------|-------|-------|
| Mobile | 375px | Base design target |
| Tablet | 768px | `md:` prefix |
| Desktop | 1024px | `lg:` prefix |
| Wide | 1440px | `xl:` prefix |

**Rules:**
- Use `min-h-dvh` (not `100vh`) on mobile
- No horizontal scroll at any breakpoint
- `max-w-[1200px]` container centered on desktop
- Gutters: `px-4` (mobile) → `px-6` (tablet) → `px-8` (desktop)

---

## 8. Motion & Animation

### Easing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-smooth` | `cubic-bezier(0.4,0,0.2,1)` | Standard UI transitions |
| `--ease-spring` | `cubic-bezier(0.34,1.56,0.64,1)` | Spring-feel: buttons, cards, modals |
| `--ease-in` | `cubic-bezier(0.4,0,1,1)` | Elements exiting the screen |
| `--ease-out` | `cubic-bezier(0,0,0.2,1)` | Elements entering the screen |

### Duration Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | 150ms | Micro-interactions (hover, focus rings) |
| `--duration-base` | 250ms | Standard transitions |
| `--duration-slow` | 400ms | Page sections, complex transitions |
| `--duration-xslow` | 600ms | Hero reveals, staggered entrances |

### Animation Rules

- **Micro-interactions:** 150–300ms (`--duration-fast` to `--duration-base`)
- **Entering:** use `--ease-out` (decelerate to rest)
- **Exiting:** use `--ease-in` (accelerate away), duration ~60% of enter
- **Spring physics (Framer Motion):** `type: "spring"` with `stiffness: 300, damping: 30` for buttons/cards
- **Stagger:** 30–50ms delay per item in lists/grids
- **Only animate:** `transform` + `opacity` — never `width`, `height`, `top`, `left`
- **Max decorative:** 1–2 animated elements per view
- **`prefers-reduced-motion`:** already handled globally in `globals.css` — all durations collapse to `0.01ms`

### Framer Motion Presets (use these)

```ts
// Card hover
whileHover={{ y: -4, scale: 1.01 }}
transition={{ type: "spring", stiffness: 300, damping: 25 }}

// Section entrance
initial={{ opacity: 0, y: 24 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
viewport={{ once: true, margin: "-80px" }}

// Button press
whileTap={{ scale: 0.97 }}
transition={{ type: "spring", stiffness: 400, damping: 30 }}

// Stagger list
variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
```

---

## 9. Component Interaction States

| State | Visual treatment |
|-------|----------------|
| **Default** | Base token values |
| **Hover** | `--color-primary-light` / `translateY(-2px)` / `--shadow-md` | 
| **Pressed / Active** | `--color-primary-dark` / `scale(0.98)` |
| **Focus** | `outline: 2px solid --color-accent; outline-offset: 2px` |
| **Disabled** | `opacity: 0.5; cursor: not-allowed; pointer-events: none` |
| **Loading** | Spinner + disabled state, never plain text change |
| **Error** | `border-color: --color-error` + error message below field |
| **Success** | `border-color: --color-success` + brief confirmation |

---

## 10. Page Pattern

**Recommended structure for MediSmile landing pages:**

```
1. Hero — headline + subheadline + primary CTA (above fold)
2. Social Proof strip — logos / patient count / years of experience
3. Services grid — implants, cosmetics, aligners, etc.
4. Doctor section — Dr. Nelson Marques credibility block
5. Testimonials carousel — 3-5 reviews with photo + name
6. FAQ — address insurance & financing objections
7. Final CTA — schedule appointment + WhatsApp floating
8. Footer — addresses (Winter Springs & Ocoee), hours, map links
```

---

## 11. Dark Section Utility

Use the `.section-dark` CSS class (defined in `globals.css`) for dark-background sections.
It applies a radial gradient orb pattern — never use flat midnight `#0F1923` as a plain background.

```html
<section class="section-dark py-20">
  <!-- text must use text-white or --color-white tokens -->
</section>
```

---

## 12. Anti-Patterns — Do NOT Use

### Colors
- ❌ Hardcoded hex anywhere in components — use CSS variables only
- ❌ `--color-gold` as body text on `--color-neutral-50` (fails contrast)
- ❌ `--color-accent` (`#22C9A5`) as body text on white (3:1 ratio — fails AA for normal text)
- ❌ Flat `#0F1923` midnight as section background (use `.section-dark` instead)
- ❌ Pink, lavender, purple, neon — not in the MediSmile palette

### Typography
- ❌ EB Garamond, Lora, Raleway, Rubik — not in the MediSmile stack
- ❌ Body text below 16px on mobile (triggers iOS auto-zoom)
- ❌ Gray-on-gray text combinations

### Icons & UI
- ❌ Emojis as icons — use Lucide or Heroicons SVG
- ❌ Missing `cursor-pointer` on interactive elements
- ❌ Icon-only buttons without `aria-label`

### Animation
- ❌ Animating `width` / `height` / `top` / `left` — use `transform` only
- ❌ Linear easing for UI transitions
- ❌ Decorative-only animation with no interaction meaning
- ❌ Blocking user input during animation

### Layout
- ❌ `100vh` on mobile — use `min-h-dvh`
- ❌ Horizontal scroll on any breakpoint
- ❌ Fixed elements without safe-area padding compensation
- ❌ Mixing arbitrary spacing values outside the 4px grid

### Forms
- ❌ Placeholder-only labels (no visible `<label>`)
- ❌ `onChange` validation — validate `onBlur` only
- ❌ Errors shown only at top of form (show below each field)

---

## 13. Pre-Delivery Checklist

### Visual
- [ ] Zero hardcoded hex in any component (CSS vars only)
- [ ] No emojis used as icons (SVG from Lucide/Heroicons)
- [ ] Gold used decoratively only (not as body text on light bg)
- [ ] Accent (`#22C9A5`) not used as normal-weight body text on white

### Accessibility
- [ ] Body text contrast ≥ 4.5:1 verified
- [ ] All icon-only buttons have `aria-label`
- [ ] All images have `alt` prop
- [ ] Keyboard focus states visible (outline using `--color-accent`)
- [ ] `skip-link` "Skip to content" present
- [ ] Heading hierarchy: h1 → h2 → h3 (no skips)

### Animation
- [ ] Micro-interactions 150–300ms
- [ ] `ease-out` entering, `ease-in` exiting
- [ ] `prefers-reduced-motion` already covered by `globals.css`
- [ ] Only `transform` + `opacity` animated (no layout properties)
- [ ] Spring physics used on main interactive components (`type: "spring"`)

### Forms (Sofia)
- [ ] Multi-step with visible progress indicator
- [ ] Validation `onBlur`, not `onChange`
- [ ] Error message below each field with recovery path
- [ ] Loading + success + error states on submit

### Layout
- [ ] `min-h-dvh` (not `100vh`) on full-height sections
- [ ] Breakpoints verified: 375 / 768 / 1024 / 1440
- [ ] No horizontal scroll on mobile
- [ ] Z-index uses scale tokens (10 / 40 / 100 / 200 / 300)
- [ ] Dark sections use `.section-dark` class (not flat color)

---

## Divergences vs. ui-ux-pro-max Script Output

The script recommended palette and fonts that **conflict with the locked project tokens**. These were overridden:

| Field | Script Output | Correct (MediSmile) |
|-------|--------------|----------------------|
| Primary | `#1E3A8A` navy | `#0B4F6C` Deep Ocean Blue |
| Accent/CTA | `#B45309` bronze | `#22C9A5` Aqua Vitae |
| Background | `#F8FAFC` | `#F8FAFB` Pearl White |
| Foreground | `#0F172A` | `#0F1923` Midnight |
| Heading font | EB Garamond | Playfair Display |
| Body font | Lato | Inter |
| UI font | (none) | DM Sans |

**Useful from the script:** pattern structure (Hero-Centric + Social Proof), Soft UI Evolution style, anti-pattern checklist, animation rules — all incorporated above.
