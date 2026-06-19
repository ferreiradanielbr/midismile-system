# MediSmile — Onde paramos / Próximos passos

> Cole o conteúdo abaixo (ou só "continuar projeto MediSmile") ao abrir um novo chat.
> O `CLAUDE.md` já carrega as regras e o contexto automaticamente.

---

## Status — Sprint 1 ✅ CONCLUÍDO (2026-06-14)

**Build:** `npm run build` passando limpo — 18/18 páginas, zero erros TypeScript.

### O que foi entregue no S1
- Setup Next.js 14 + TS strict + Tailwind com tokens (`tailwind.config.ts`, `globals.css`).
- Design system completo: 17 tokens de cor, 3 famílias tipográficas via `next/font`, 6 níveis de sombra (blue-tinted), 4 easings + 4 durations, 5 border-radius, keyframes `orb-float` / `float-review` / `typing`, `prefers-reduced-motion` global.
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

## Status — Sprint 2 ✅ CONCLUÍDO

**Build:** `npm run build` passando limpo — 18/18 páginas, zero erros TypeScript.

### O que foi entregue no S2 (versão inicial)
- Tokens expandidos, componentes UI (Badge/Input/Textarea/Select/Alert/Card), Nav/Footer/layout, Home com 8 seções, ChatWidget, páginas internas (services/about/insurance/first-visit/contact/blog), `/api/leads` POST, `/design-system` expandido.
- Sprint de polimento premium: motion (AnimatedGrid, hover/tap states), acessibilidade (skip link, z-index scale, aria-live), validação de formulário onBlur, ChatWidget com skeleton shimmer.
- $10K upgrade: CountUp stats, TestimonialsCarousel, fotos reais da clínica, hero animado com floating social-proof cards.

### Correções e conclusão do S2 (sessão 2026-06-18/19)
Auditoria encontrou que vários itens marcados "✅" no CLAUDE.md antigo não funcionavam de verdade. Tudo corrigido e testado ao vivo (browser + Playwright), não só lido no código:

- **Sofia AI Chatbot estava 100% quebrada** — `ChatWidget` enviava `{message, conversationId}` mas `/api/chat` esperava `{sessionId, messages}`; toda mensagem retornava erro 400, em qualquer ambiente. Corrigido o contrato, corrigida a persistência de conversa (nunca criava a linha no banco), e o widget foi movido da home para `(site)/layout.tsx` — agora aparece em todas as páginas.
- **About** — reescrita completa: foto real do Dr. Nelson, timeline de carreira (sem datas/estatísticas inventadas), missão, equipe.
- **Contact** — validação de email só checava campo vazio, não formato. Adicionado regex.
- **Insurance** — bug real: Home, Services e Insurance listavam seguradoras *diferentes* entre si, contradizendo a lista oficial usada pela Sofia. Padronizado para a lista oficial (Humana, Aetna, Delta Dental, Ameritas, UCD). Formulário de verificação era fake (`setTimeout`) — agora salva lead de verdade via `/api/leads`. Adicionado FAQ e CTA de WhatsApp/ligação.
- **Fotos dos serviços** — `tooth-anatomy.png` (diagrama de canal radicular) estava no card errado ("Crowns & Bridges" em vez de "Endodontics"). Corrigido. Também sourced fotos reais (Unsplash, free tier) para Orthodontics, SureSmile e Botox/Harmonização Orofacial — hoje os 8 serviços têm foto própria, zero duplicação.

---

## Status — Sprint 3 (Full Site + SEO) ✅ CONCLUÍDO (sessão 2026-06-18/19)

### SEO técnico
- `src/app/sitemap.ts` + `robots.ts` dinâmicos (disallow `/admin`, `/api`, `/login`).
- JSON-LD (`Dentist`) para as duas unidades em `src/components/seo/StructuredData.tsx` — só fatos confirmados, sem geo/rating inventados.
- `src/app/opengraph-image.tsx` — OG image gerada via `next/og`, cores da marca, sem foto fake.
- `@vercel/analytics` instalado (sem precisar de credencial).
- GA4 opcional via `NEXT_PUBLIC_GA_ID` em `src/components/seo/GoogleAnalytics.tsx` — fica inerte até a env var ser configurada.

### Mobile
- Pass em 375px encontrou overflow horizontal real na Home/Services (elementos do Framer Motion fora da tela antes do scroll). Corrigido globalmente com `overflow-x: hidden` no `body`.

### Blog
- Infra real: `src/lib/blog-posts.ts` como fonte única de dados (sitemap + index + template todos leem dali), `generateMetadata` real, 404 real para slugs inválidos (`dynamicParams = false`).
- 7 artigos completos escritos (Implants, SureSmile/Orthodontics, Whitening, Endodontics, Orofacial Harmonization, First Visit $99, Bilingual Community) — grounded só em fatos já confirmados no projeto, sem estatísticas/claims clínicos inventados.

### O que falta do S3
- Lighthouse/performance pass formal (next/font e next/image já em uso desde S1/S2 — risco baixo de haver muito trabalho aqui).
- Google Maps embed em `/contact` e na home (ver "Pendências" abaixo — precisa de API key).

---

## Sprint 4 — AI Agent + WhatsApp 🔜 PRÓXIMA

Ainda não iniciada. Por spec do Sprint Plan original, é aqui que entram:
- Streaming de resposta da Sofia + rate limiting.
- UI completa do chat widget (painel 380px, header com logo + "AI Assistant" + dot verde, handoff card com resumo do lead, modal full-screen no mobile).
- Integração real com Evolution API (WhatsApp) para notificar o time comercial.

---

## Pendências que exigem você (credenciais)
- [ ] **Supabase:** criar projeto → preencher `.env.local` → rodar migration `supabase/migrations/001_initial.sql`
- [ ] **Anthropic:** `ANTHROPIC_API_KEY` para testar a Sofia de verdade (contrato já corrigido, só falta a chave)
- [ ] **Vercel:** conectar repo GitHub para deploy automático do `main`
- [ ] **Evolution API:** instância + credenciais para WhatsApp (Sprint 4)
- [ ] **Google Maps:** `NEXT_PUBLIC_GOOGLE_MAPS_KEY` (S3 — embed ainda não feito)
- [ ] **GA4:** `NEXT_PUBLIC_GA_ID` se quiser analytics ativo (código já pronto, só não tem ID)

---

## Referências visuais
- Visual bible: `Base_docs/medismile-prototype.html`
- Design system: `design-system/medismile/MASTER.md` (canônico) + `design-system/medismile/pages/*.md` (overrides por página)
- Sempre consultar os dois antes de criar qualquer componente visual
