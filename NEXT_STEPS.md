# MediSmile — Onde paramos / Próximos passos

> Cole o conteúdo abaixo (ou só "continuar projeto MediSmile") ao abrir um novo chat.
> O `CLAUDE.md` já carrega as regras e o contexto automaticamente.

---

## Status — Sprint 1 ✅ CONCLUÍDO (2026-06-14)

**Build:** `npm run build` passando limpo — 18/18 páginas, zero erros TypeScript.

### O que foi entregue no S1
- Setup Next.js 14 + TS strict + Tailwind com tokens (`tailwind.config.ts`, `globals.css`).
- Design system completo: 17 tokens de cor, 3 famílias tipográficas via `next/font`, 6 níveis de sombra (blue-tinted), 4 easings + 4 durations, 5 border-radius, keyframes `orb-float` / `float-review` / `typing`, `prefers-reduced-motion` global.
- `open-design/design-systems/medismile/DESIGN.md` — design system integrado como fonte de verdade visual.
- Estrutura de pastas completa: `(site)`, `(admin)`, `api/{chat,leads,whatsapp/webhook}`, `components/{ui,site,chat,admin}`, `lib/{supabase,anthropic,whatsapp}`, `types`.
- `Button` — 4 variantes (primary/accent/ghost/whatsapp) + 3 tamanhos (34/44/52px) + loading + active states. Referência de padrão para todos os componentes.
- Clients Supabase (browser/server/admin) com type-fix do `CookieToSet`.
- System-prompt da Sofia (AI Agent, bilíngue EN/PT).
- Client WhatsApp (Evolution API).
- API `/chat` com persistência + handoff `<LEAD_QUALIFIED>`.
- `middleware.ts` protegendo `/admin` com type-fix do `CookieToSet`.
- Migration `supabase/migrations/001_initial.sql` (leads/conversations/messages + RLS + trigger).
- `.env.local.example` com todas as variáveis.
- `error.tsx`, `loading.tsx`, `not-found.tsx` globais.
- `/design-system` — living style guide (cores, tipografia, botões).

---

## Status — Sprint 2 ✅ CONCLUÍDO (2026-06-14)

**Build:** `npm run build` passando limpo — 18/18 páginas, zero erros TypeScript.

### O que foi entregue no S2

#### Tokens expandidos
- `globals.css` — tokens alpha (`--color-accent-subtle`, `--color-accent-border`, `--color-gold-subtle`, etc.) + overlay tokens + classe `.section-dark` com gradiente radial per DESIGN.md §5.
- `tailwind.config.ts` — `accent.subtle`, `accent.border`, `gold.subtle`, `gold.border`, `white-subtle`, `white-faded`, `white-border`, `white-muted`.

#### Componentes UI (Block 1)
- `Badge.tsx` — variantes teal / gold / white, tamanhos sm / md. `cva` + `forwardRef`.
- `Input.tsx` — estados default / focus / error / disabled / loading. Label + hint + error message com `AlertCircle`.
- `Textarea.tsx` — mesma anatomia do Input. Resize vertical, min-height 112px.
- `Select.tsx` — select nativo estilizado. `ChevronDown` à direita. Mesmos estados.
- `Alert.tsx` — variantes info / success / error / warning. `onClose` opcional.
- `Card.tsx` — 4 variantes: `ServiceCard` (top accent bar, hover lift), `DoctorCard` (dark bg), `ReviewCard` (stars gold), `PricingCard` (featured border-top gold).

#### Site layout (Block 2)
- `Nav.tsx` — fixo 72px, blur backdrop, scrolled shadow, hamburger mobile, `aria-current`.
- `Footer.tsx` — Server Component, 4 colunas, endereços completos, badge PT 🇧🇷.
- `(site)/layout.tsx` — Nav + main com pt-[72px] + Footer.

#### Home page (Block 3)
- Todas as 8 seções: Hero dark → Trust bar → Services grid → Doctor dark → Reviews → Locations → FAQ Accordion → Final CTA dark.
- `FAQAccordion.tsx` — client component com Framer Motion `AnimatePresence`.
- `ChatWidget.tsx` — floating bottom-right, spring animation, Sofia AI integrada ao `/api/chat`.

#### Pages internas (Block 4)
- `/services` — hero dark + grid de 6 ServiceCards.
- `/about` — hero dark com Dr. Marques + seção missão.
- `/insurance` — planos aceitos + formulário de verificação (client).
- `/first-visit` — 4 steps numerados.
- `/contact` — formulário completo (name/email/phone/unit/message) → POST `/api/leads` + loading/error/success states.
- `/blog` — grid de 3 placeholder articles.

#### API (Block 4 suporte)
- `/api/leads` — adicionado handler `POST` para o formulário de contato.

#### Design System (Block 6)
- `/design-system` — expandido com tokens alpha, escala tipográfica completa, todas as variantes de Button/Badge/Input/Textarea/Select/Alert/Card, sombras, border-radius, motion.

---

## Sprint de Polimento Premium ✅ CONCLUÍDO (2026-06-14)

**TypeScript:** `tsc --noEmit --strict` → zero erros.

### O que foi entregue (regras ui-ux-pro-max aplicadas)

#### Bloco A — Motion Premium
- `AnimatedGrid.tsx` (novo) — stagger 50ms por item via `whileInView`, trigger 80px antes da viewport. Aplicado nos grids de serviços e reviews da home.
- `Card.tsx` — `ServiceCard` com `whileHover={{ y: -6 }}` + `whileTap={{ scale: 0.97 }}` (spring 400/25). `ReviewCard` com `whileTap={{ scale: 0.98 }}`.
- `FAQAccordion.tsx` — exit-faster-than-enter: enter 0.25s ease-out, exit 0.15s ease-in.
- `PricingCard` — `tabular-nums` no preço.

#### Bloco B — Acessibilidade
- `(site)/layout.tsx` — skip link WCAG AA (`:focus:not-sr-only`) + `id="main-content"` no `<main>`.
- `globals.css` — z-index scale: `--z-base/raised/nav/chat/modal/toast` (0→300).
- `Alert.tsx` — `aria-live="assertive"` (error/warning) e `aria-live="polite"` (info/success).

#### Bloco C — Formulário de Contato
- `contact/page.tsx` — blur validation (valida ao sair do campo, limpa ao digitar). Auto-focus no primeiro campo inválido via `requestAnimationFrame`. `tabular-nums` nos telefones e WhatsApp.

#### Bloco D — ChatWidget Premium
- `ChatWidget.tsx` — `TypingIndicator` substituído por skeleton shimmer (3 linhas de larguras 100/75/55% com `animate-shimmer`).
- Exit animation corrigida: spring na entrada, 0.15s ease-in na saída (exit-faster-than-enter).
- `tailwind.config.ts` — keyframe `shimmer` (backgroundPosition sweep 200%→-200%).

---

## Sprint 3 — Full Site + SEO 🔜 PRÓXIMA

### O que S3 precisa entregar

#### Fotos reais
- Substituir todos os `div` placeholder (gradiente) por fotos reais do Dr. Marques e das clínicas.
- Usar `next/image` com `width`, `height` e `alt` em todas.

#### Conteúdo completo nas pages internas
- `/services` — página de detalhe por serviço (Implants, Whitening, Orthodontics, Veneers, Emergency, Family).
- `/about` — timeline de 30 anos, equipe completa, certificações.
- `/insurance` — tabela comparativa de planos + FAQ.
- `/first-visit` — guia detalhado, formulário digital de intake.
- `/blog` — CMS (Contentlayer ou MDX), posts reais.

#### Google Maps
- Integrar iframe do Google Maps em `/contact` e na home section Locations.
- Variável `NEXT_PUBLIC_GOOGLE_MAPS_KEY` em `.env.local`.

#### SEO
- `sitemap.xml` e `robots.txt` via `next-sitemap` ou `app/sitemap.ts`.
- Open Graph meta tags por página.
- Schema.org `LocalBusiness` + `Dentist` (JSON-LD).
- Canonical URLs.

#### Analytics
- Integrar Google Tag Manager ou Vercel Analytics.

---

## Pendências que exigem você (credenciais)
- [ ] **Supabase:** criar projeto → preencher `.env.local` → rodar migration `supabase/migrations/001_initial.sql`
- [ ] **Anthropic:** `ANTHROPIC_API_KEY` para testar a Sofia
- [ ] **Vercel:** conectar repo GitHub para deploy automático do `main`
- [ ] **Evolution API:** instância + credenciais para WhatsApp
- [ ] **Google Maps:** `NEXT_PUBLIC_GOOGLE_MAPS_KEY` para S3

---

## Referências visuais
- Visual bible: `Base_docs/medismile-prototype.html`
- Design system: `open-design/design-systems/medismile/DESIGN.md`
- Sempre consultar os dois antes de criar qualquer componente visual
