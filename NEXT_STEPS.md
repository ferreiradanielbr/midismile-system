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

### Segurança + performance (contribuição em paralelo via Cowork)
Enquanto essa sessão rodava, o usuário corrigia o projeto em paralelo via outra sessão ("Cowork") no mesmo repo — gerou um conflito de lock do git, resolvido com segurança (sem processo git ativo confirmado antes de remover o lock). Mesclado e validado:
- `next.config.mjs` — headers CSP, HSTS, Permissions-Policy.
- `ContactForm.tsx` extraído como Client Component; `contact/page.tsx` virou Server Component com `metadata`/`openGraph` reais (mesmo padrão da página Insurance).
- `MotionProvider.tsx` — wrapper `LazyMotion` para o Framer Motion.

**2 bugs reais encontrados nessa entrega e corrigidos na sequência:**
1. CSP sem `'unsafe-eval'` quebrava o Fast Refresh do `npm run dev` (modo dev precisa, produção não) — corrigido com `process.env.NODE_ENV !== 'production'` condicional.
2. `MotionProvider` usava `LazyMotion ... strict`, que lança erro fatal em qualquer `motion.*` (e o projeto inteiro usa `motion.*`, não `m.*`) — quebrava **toda página em modo dev**. Verificado que o site já publicado em produção não foi afetado (a checagem é dev-only) antes de remover o `strict`.

### Fotos e visual (achados do usuário revisando o site ao vivo)
- `xray.png` (raio-X de diagnóstico) estava no card "Dental Cleaning" — não condizia com o texto. Trocado por foto real de limpeza (espelho + sonda nos dentes).
- Badge flutuante "EN/PT · Bilingual" da Hero ficava deslocado em telas largas — o wrapper da foto não tinha limite de largura igual ao da foto (`max-w-[460px]`), sobrando espaço lateral em viewports `xl+`. Corrigido alinhando as duas larguras.
- A foto da Hero (`sorriso-bg.png`) tem transparência real (canal alpha) — sem fundo próprio, o gradiente escuro do hero vazava por dentro do card, deixando os badges "flutuando no vazio". Adicionado o mesmo gradiente de marca que o `DoctorSection` já usa.

### Seguradoras — logos reais
Usuário forneceu 7 logos reais (`.avif`) salvos na raiz do projeto. Um deles (`plano-pattern-dental-icons.avif`) tinha nome genérico mas mostrava visualmente os ícones da Blue Cross Blue Shield — confirmado com o usuário antes de tratar como tal (o classificador de auto-mode bloqueou a primeira tentativa de rename sem essa confirmação, corretamente). Também resolvido: "UCD" da lista antiga = United Concordia Dental (logo `plano-concordia.avif`).

Lista oficial agora (8 seguradoras, confirmada com o usuário — Delta Dental fica mesmo sem logo ainda): Humana, Aetna, Delta Dental, Ameritas, United Concordia, GEHA, MetLife, Blue Cross Blue Shield. Fonte única: `src/lib/insurance-plans.ts` — usada por Home, Services, Insurance, dropdown do formulário de verificação, e pelo system-prompt da Sofia (montado dinamicamente agora, não mais string fixa). Logos em `public/images/insurance/`.

### O que falta do S3
- Lighthouse/performance pass formal (next/font e next/image já em uso desde S1/S2 — risco baixo de haver muito trabalho aqui).
- Logo da Delta Dental (único plano ainda sem imagem, só texto).

---

## Sprint de Polimento (2026-06-21) ✅ CONCLUÍDO

Usuário revisou o site no ar e reportou 6 problemas (com prints), pedindo análise antes de implementar. Todos confirmados no código antes de corrigir:

1. **Foto do Dr. Nelson com "tarjas" azuis nos dois lados** — `object-contain` numa caixa mais larga que a foto (quase quadrada) deixava espaço vazio nas laterais. Corrigido para `object-cover` em `DoctorSection.tsx` e na hero do About.
2. **Rodapé com serviços falsos** — `serviceLinks` listava Veneers/Emergency Care/Pediatric Dentistry, que não existem em `/services`. Confirmado ao vivo com Playwright: clicar neles caía no topo da página porque a âncora não existia no DOM (não era bug de scroll, era dado errado). Corrigido para os 8 serviços reais.
3. **Fundo estático no início das páginas** — só Home/Services tinham o gradiente animado (`animate-orb-float`); About, Blog (index + artigo), Contact, First Visit e Insurance estavam com fundo liso. Usuário escolheu aplicar o padrão de orbs já existente (em vez de um carrossel de imagens novo) — replicado nas 6 páginas.
4. **Galeria do About só com 6 fotos + foto desconectada no "Care Team"** — refeito o fetch das 12 fotos reais do site original, usadas 11 (uma é quase-duplicata). A foto da seção "Care Team" (mulher de máscara, sem relação com o badge bilíngue) foi trocada pela foto do lounge + badge atualizado para "EN / PT / ES". **Importante:** isso reabriu a decisão de idiomas — confirmado com o usuário que o site precisa atender 3 públicos (inglês, português, espanhol/latino da Flórida) e que a migração i18n completa é uma **sprint futura** (S7, ver CLAUDE.md) — não construída agora, só essa seção pontual foi ajustada.
5. **Sem Google Maps real** — a seção "Locations" da Home tinha um `<div>` placeholder. Descoberto que um embed simples (`maps.google.com/maps?q=...&output=embed`) **não precisa de API key** — testado num browser real antes de implementar. Isso também expôs um bug: o CSP em `next.config.mjs` tinha `frame-src 'none'` (adicionado na sessão Cowork anterior), que bloquearia o iframe silenciosamente — corrigido para `frame-src https://www.google.com https://maps.google.com`.
6. **Posts do blog sem imagem de capa** — adicionado campo `coverImage` em `BlogPost` (`blog-posts.ts`), reaproveitando 5 fotos de serviços já existentes + 2 fotos do About (nenhuma imagem nova precisou ser buscada). Renderizado no índice e no template do artigo.

Tudo validado contra build de produção (`next build` + `next start`, não só dev) — os itens 2 e 5 especificamente precisavam de CSP/navegação reais para confirmar.

### Correção extra: orbs imperceptíveis (mesma sessão, depois do item 3)
Usuário olhou a hero do **Services** (que já tinha orbs, não tocada nessa sprint) e disse que ainda parecia fundo azul estático — observação correta. O keyframe `animate-orb-float` só fazia 30px de movimento vertical, e a opacidade de cada orb era 5–15% com `blur-3xl`: matematicamente presente, mas imperceptível a olho. Corrigido na raiz: o keyframe (`globals.css`) agora faz um deslocamento diagonal + pulso de escala em 3 passos (não só 2 pontos), e todas as instâncias de orb no site (`HeroSection.tsx` + as 7 heroes genéricas) tiveram a opacidade triplicada (`/10`→`/30`, `/5`→`/25`, `/15`→`/35`, `/8`→`/30`) e o blur reduzido de `blur-3xl` para `blur-2xl` para a forma ficar visível. Confirmado com dois screenshots Playwright tirados com alguns segundos de diferença, contra build de produção — o brilho agora é claramente visível (antes, indistinguível do gradiente liso no mesmo teste).

---

## Sprint 4 — AI Agent + WhatsApp 🔜 PRÓXIMA

Ainda não iniciada. Por spec do Sprint Plan original, é aqui que entram:
- Streaming de resposta da Sofia + rate limiting.
- UI completa do chat widget (painel 380px, header com logo + "AI Assistant" + dot verde, handoff card com resumo do lead, modal full-screen no mobile).
- Integração real com Evolution API (WhatsApp) para notificar o time comercial.

---

## Pendências que exigem você (credenciais)
- [x] **Vercel:** repo já conectado, deploy automático do `main` confirmado funcionando (verificado via Vercel MCP em 2026-06-19 — domínio `midismile-system.vercel.app`).
- [x] **Google Maps:** não precisa de API key — embed simples (`?output=embed`) implementado em 2026-06-21 na Home.
- [ ] **Supabase:** criar projeto → preencher `.env.local`/env vars do Vercel → rodar migration `supabase/migrations/001_initial.sql`
- [ ] **Anthropic:** `ANTHROPIC_API_KEY` para testar a Sofia de verdade (contrato já corrigido nesta sessão — não confirmado se a env var já existe no Vercel)
- [ ] **Evolution API:** instância + credenciais para WhatsApp (Sprint 4)
- [ ] **GA4:** `NEXT_PUBLIC_GA_ID` se quiser analytics ativo (código já pronto, só não tem ID)
- [ ] **Logo Delta Dental:** único plano da lista de seguros ainda sem imagem (hoje aparece só como texto)

## Sprint futura — i18n (EN/PT/ES)
Confirmado em 2026-06-21: o site precisa atender 3 públicos/idiomas (inglês, português brasileiro, espanhol/latino da Flórida). Isso reverte uma decisão anterior de manter só PT-BR. Ainda **não iniciado** — escopo: `next-intl`, rotas `/[locale]/(site)/...`, tradução de todo o conteúdo, seletor de idioma, tags `hreflang`. A Sofia (chatbot) já responde nos 3 idiomas hoje — não depende dessa sprint. Tratar como sprint própria quando for aberta, não começar sem pedido explícito.

---

## Referências visuais
- Visual bible: `Base_docs/medismile-prototype.html`
- Design system: `design-system/medismile/MASTER.md` (canônico) + `design-system/medismile/pages/*.md` (overrides por página)
- Sempre consultar os dois antes de criar qualquer componente visual
