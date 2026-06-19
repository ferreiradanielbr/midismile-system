# Prompt — Sprint 2 Completo (Claude Code, sem interrupção)

> Cole este prompt inteiro no Claude Code. Ele contém todo o contexto necessário.
> Não faça perguntas. Execute tudo em ordem. Ao final, rode `npm run build` e confirme zero erros.

---

## Contexto do projeto

Você é o engenheiro sênior do **MediSmile Group Digital Ecosystem** — clínica odontológica premium em Orlando, FL, com duas unidades (Winter Springs e Ocoee).

**Repo:** `~/Projetos/Medismile`
**Stack:** Next.js 14 App Router · TypeScript strict · Tailwind + CSS tokens · Framer Motion · Supabase · Anthropic API · Evolution API · Vercel

**Fontes de verdade — leia ANTES de criar qualquer componente:**
1. `Base_docs/medismile-prototype.html` — bíblia visual absoluta
2. `design-system/medismile/MASTER.md` — design system completo (nota: este prompt foi escrito quando o design system ainda vivia em `open-design/design-systems/medismile/DESIGN.md`; esse arquivo nunca chegou a existir no repo final — `MASTER.md` é a referência canônica)
3. `Base_docs/MediSmile-Developer-Handoff-v1.0.docx` — specs de componentes
4. `Base_docs/MediSmile-PRD-v1.0.docx` — requisitos de produto

**Regras invioláveis:**
- TypeScript strict — nunca `any`. Tipo explícito em todo parâmetro de função.
- Tokens de design apenas — nunca hardcode de hex. Source of truth: `src/app/globals.css` + `tailwind.config.ts`.
- Server Components por padrão. `'use client'` só quando estritamente necessário (interações, hooks do browser).
- Nunca acessar Supabase do client — usar Route Handlers ou Server Actions.
- Nunca expor secrets ao browser (só `NEXT_PUBLIC_*`).
- Loading + error states em toda operação async.
- Sem `useEffect` para fetch de dados.
- Imagens sempre com `width`, `height` e `alt`.
- Padrão de componente: `cva` + `VariantProps` + `forwardRef` + `displayName`. Siga `src/components/ui/Button.tsx` como referência de qualidade.
- Anti-patterns do DESIGN.md §7 são proibições absolutas.

**Dados reais da clínica (nunca inventar):**
- Winter Springs: 411 E State Rd 434 Suite D, FL 32708 · (689) 213-4161
- Ocoee: 10131 W Colonial Drive Suite 3, FL 34761 · (689) 310-3396
- Horário: Seg–Sex 10h–18h
- WhatsApp: (689) 310-3396
- Dr. Nelson Marques — 30+ anos, Implantes + Harmonização Orofacial, U of Florida + MARC Institute Miami, bilíngue EN/PT

---

## O que já existe (S1 — não recriar, não apagar)

- `src/app/layout.tsx` — fontes next/font, metadata, viewport
- `src/app/globals.css` — todos os CSS tokens (`--color-*`, `--font-*`, `--space-*`, etc.)
- `tailwind.config.ts` — tema mapeado nos tokens
- `src/components/ui/Button.tsx` — 4 variantes, 3 tamanhos, loading state ✅
- `src/lib/supabase/{client,server,admin}.ts` — clients Supabase
- `src/lib/anthropic/{client,system-prompt}.ts` — Sofia AI
- `src/lib/whatsapp/client.ts` — Evolution API
- `src/middleware.ts` — auth `/admin`
- `src/app/api/{chat,leads,whatsapp/webhook}/route.ts` — APIs prontas
- `src/types/index.ts` — tipos base
- `supabase/migrations/001_initial.sql` — schema do banco

---

## Sprint 2 — Execução completa

Execute em ordem. Não pule etapas. Valide TypeScript após cada bloco.

---

### BLOCO 1 — Componentes UI base

#### 1.1 — `src/components/ui/Badge.tsx`

Três variantes per DESIGN.md §5:
- `teal`: bg `rgba(34,201,165,0.15)`, text `accent`, border `rgba(34,201,165,0.25)`
- `gold`: bg `rgba(200,169,110,0.15)`, text `gold`, border `rgba(200,169,110,0.25)`
- `white`: bg `rgba(255,255,255,0.08)`, text `rgba(255,255,255,0.6)`, border `rgba(255,255,255,0.12)` — para fundos escuros

Tamanhos: `sm` (11px, padding 4px 10px) e `md` (12px, padding 5px 14px).
Usar `--radius-full`. Font: DM Sans. Padrão: `cva` + `forwardRef` + `displayName`.

#### 1.2 — `src/components/ui/Input.tsx`

Props: `label?: string`, `hint?: string`, `error?: string`, `isLoading?: boolean`, mais todos os `InputHTMLAttributes<HTMLInputElement>`.

Estados visuais:
- Default: border `mist`, bg `white`
- Focus: border `primary`, ring `2px rgba(11,79,108,0.15)`
- Error: border `error`, ring `2px rgba(239,68,68,0.15)`, ícone de erro
- Disabled: opacity 50%, cursor not-allowed
- Loading: spinner Lucide à direita

Label: DM Sans 14px medium, text `body`.
Hint: Inter 13px, text `dim`.
Error message: Inter 13px, text `error`, com ícone `AlertCircle`.
Border-radius: `--radius-md`. Height: 44px. Padding: 12px 16px.
`forwardRef` + `displayName`.

#### 1.3 — `src/components/ui/Textarea.tsx`

Mesma anatomia do Input. Props adicionais: `rows?: number` (default 4).
Resize: `vertical` only. Min-height: 112px.

#### 1.4 — `src/components/ui/Select.tsx`

Wrapper nativo `<select>` com estilo customizado.
Mesmos estados do Input. Ícone `ChevronDown` Lucide à direita.
Props: `label?`, `hint?`, `error?`, `options: Array<{ value: string; label: string }>`, `placeholder?`.

#### 1.5 — `src/components/ui/Alert.tsx`

Variantes: `info` (primary), `success`, `error`, `warning`.
Props: `title?: string`, `children: React.ReactNode`, `onClose?: () => void`.
Com ícone Lucide correspondente. `role="alert"`. `'use client'` pelo `onClose`.

#### 1.6 — `src/components/ui/Card.tsx`

Quatro sub-variantes via prop `variant`:

**`service`** (per DESIGN.md §9 / prototype):
- Pearl bg, mist border, radius-xl, padding 32px desktop
- Barra de acento top (2px, gradiente accent → primary-light) via `::before` — usar classe CSS module ou `after:` Tailwind
- Ícone 52px com bg soft e border-radius 14px
- Seta top-right que rotaciona 45deg no hover
- Hover: `translateY(-6px)`, border `rgba(34,201,165,0.35)`, shadow-lg
- Props: `icon: React.ReactNode`, `title: string`, `description: string`, `href?: string`

**`doctor`**:
- Dark bg (`midnight`) com gradient overlay
- Avatar circular 80px
- Nome em Playfair Display, credenciais em DM Sans badge-gold
- Props: `name: string`, `title: string`, `credentials: string[]`, `imageSrc: string`, `imageAlt: string`, `bio: string`

**`review`**:
- Pearl bg, mist border, radius-lg, padding 28px
- Stars (5 estrelas) em gold
- Texto da review em Inter
- Nome + cidade em DM Sans
- Props: `author: string`, `location: string`, `rating: number`, `text: string`, `date?: string`

**`pricing`**:
- Pearl bg, mist border, radius-xl
- Destaque top em gold (2px border-top)
- Preço em Playfair Display display-md
- Lista de features com checkmark em accent
- Props: `name: string`, `price: string`, `period?: string`, `features: string[]`, `cta: string`, `featured?: boolean`

Todos com hover states. `'use client'` apenas se tiver interação.

---

### BLOCO 2 — Layout do site

#### 2.1 — `src/components/site/Nav.tsx`

`'use client'` (scroll state + hamburger).

Specs per DESIGN.md §5:
- Fixed, `height: 72px`, `z-index: 100`
- Background: `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`
- Border-bottom: `1px solid rgba(11,79,108,0.08)`
- Scrolled state (> 10px): adiciona `box-shadow: 0 4px 24px rgba(11,79,108,0.10)`
- Logo: símbolo (div 36px, border-radius 10px, bg primary, letra "M" em branco) + wordmark "MediSmile" em Playfair Display 20px bold
- Links desktop: DM Sans 15px, text body, hover text primary, transition 200ms
- CTA desktop: Button `primary` size `sm` "Schedule Free Consult" + Button `whatsapp` size `sm` "WhatsApp"
- Mobile (< 768px): hamburger icon (Lucide `Menu`/`X`), menu dropdown com todos os links + CTAs
- `aria-label` no nav, links com `aria-current="page"` quando ativo

Links: Home · Services · About · Insurance · First Visit · Blog · Contact

#### 2.2 — `src/components/site/Footer.tsx`

Server Component.

Layout 4 colunas desktop (2fr 1fr 1fr 1fr), 2 colunas tablet, 1 coluna mobile per DESIGN.md §3.

Coluna 1 — Brand:
- Logo igual ao Nav
- Tagline: "The smile you deserve. The care you trust."
- Ícones sociais: Instagram, Facebook (Lucide)
- Bilíngue: badge "Atendimento em Português"

Coluna 2 — Services (links):
Dental Implants · Teeth Whitening · Orthodontics · Veneers · Emergency Care · Pediatric Dentistry

Coluna 3 — Locations:
- Winter Springs: endereço completo + tel
- Ocoee: endereço completo + tel
- Horário Mon–Fri 10AM–6PM

Coluna 4 — Quick Links + WhatsApp CTA:
About · Insurance · First Visit · Blog · Contact · Privacy Policy
Button `whatsapp` lg "WhatsApp Us"

Bottom bar: copyright + "Designed with care in Orlando, FL"
Background: `midnight` com gradient overlay (per DESIGN.md §5 Dark sections).
Text hierarchy: white headlines, `rgba(255,255,255,0.62)` body, `rgba(255,255,255,0.45)` labels.

#### 2.3 — `src/app/(site)/layout.tsx`

Importar `Nav` e `Footer`. Envolver `{children}` com padding-top de 72px para compensar nav fixo.

```tsx
import { Nav } from '@/components/site/Nav'
import { Footer } from '@/components/site/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className="pt-[72px]">{children}</main>
      <Footer />
    </>
  )
}
```

---

### BLOCO 3 — Home page (`src/app/(site)/page.tsx`)

Reescrever do placeholder. Construir todas as seções em ordem. Server Component (exceto o ChatWidget que é client).

Referência visual absoluta: `Base_docs/medismile-prototype.html` — abrir e estudar cada seção antes de implementar.

#### Seção 1 — Hero

Dark section (midnight + gradient overlay per DESIGN.md §9).
Duas colunas: conteúdo à esquerda, visual à direita.

Conteúdo esquerdo:
- Eyebrow: "Premier Dental Care · Orlando, FL"
- H1 Playfair Display: "The smile you\n*deserve.*\nThe care you trust." (`<em>` em italic Playfair + text accent)
- Subheadline Inter: "Bilingual care with Dr. Nelson Marques — 30 years of precision dentistry across two Orlando locations."
- CTAs: Button `primary` lg "Schedule Free Consultation" + Button `whatsapp` lg "WhatsApp Us"
- Stats bar: 4 números (2.500+ Patients · 30+ Years · 2 Locations · 5★ Rating) — DM Sans, número em Playfair Display accent

Visual direito:
- Placeholder div com gradiente (imagem do Dr. ou clínica virá em S3)
- 2 floating cards animados (`animate-float-review`):
  - Card 1: "⭐ 5.0 · 300+ Reviews Google"
  - Card 2: "✓ Most insurances accepted"

Orb decorativos animados (`animate-orb-float`) no background.

#### Seção 2 — Trust bar

Background `soft`. Logos/nomes de seguradoras aceitas:
Delta Dental · Cigna · Aetna · Humana · UnitedHealthcare · Blue Cross

Eyebrow: "We accept most major insurances"
Exibir como flex wrap, grayscale com hover colorido.

#### Seção 3 — Services

Background `pearl`.
Eyebrow: "What we offer"
H2: "Comprehensive care\nfor your whole smile"
Subtitle: "From preventive check-ups to complete smile transformations."

Grid 3 colunas desktop, 2 tablet, 1 mobile.
6 Cards `variant="service"`:
1. Dental Implants — "Permanent tooth replacement that looks and feels natural."
2. Teeth Whitening — "Professional whitening for a brighter, confident smile."
3. Orthodontics — "Straighter teeth with modern invisible aligners."
4. Porcelain Veneers — "Transform your smile with custom-crafted veneers."
5. Emergency Dental — "Same-day care when you need it most."
6. Family Dentistry — "Comprehensive care for every member of your family."

CTA abaixo do grid: Button `ghost` "View all services →"

#### Seção 4 — Doctor

Dark section (midnight + gradient).
Layout 2 colunas (1fr 1.1fr): texto esquerda, imagem direita.

Eyebrow: "Meet your doctor"
H2: "Dr. Nelson Marques\n*30 years* of precision care"
Bio Inter: "Board-certified with over three decades of experience in implant dentistry and orofacial harmonization. Trained at the University of Florida and MARC Institute Miami — bringing world-class expertise to Orlando."

Credenciais como badges `badge-white`:
- University of Florida
- MARC Institute Miami
- Implant Specialist
- Orofacial Harmonization
- Bilingual EN/PT

CTA: Button `accent` "Meet Dr. Marques"
Imagem: placeholder com gradiente (foto virá em S3).

#### Seção 5 — Reviews

Background `soft`.
Eyebrow: "Patient stories"
H2: "Real smiles, real results"

3 Cards `variant="review"`:
1. Maria S., Orlando · "Dr. Marques changed my life. My implants look completely natural and the team made me feel at ease throughout. Best dental experience I've ever had." ⭐⭐⭐⭐⭐
2. James R., Winter Springs · "Finally a dentist who speaks my language — literally. The Portuguese-speaking staff made my mother feel completely comfortable during her treatment." ⭐⭐⭐⭐⭐
3. Ana P., Ocoee · "From the moment I walked in I knew this was different. The office is beautiful, the team is professional, and the results exceeded my expectations." ⭐⭐⭐⭐⭐

CTA: "See all reviews on Google →" link externo.

#### Seção 6 — Locations

Background `pearl`.
Eyebrow: "Find us"
H2: "Two convenient\nOrlando locations"

Grid 2 colunas desktop, 1 mobile.
Para cada unidade — card com:
- Nome da unidade (Playfair Display)
- Endereço completo
- Telefone (link `tel:`)
- Horário
- Button `primary` "Get Directions" (link Google Maps)
- Button `ghost` "Call Now"
- Mapa placeholder (iframe virá em S3 com env var da API key)

#### Seção 7 — FAQ

Background `soft`.
Eyebrow: "Common questions"
H2: "Everything you need to know"

Accordion com 6 perguntas. `'use client'` para estado open/close.

Perguntas:
1. "Do you accept my insurance?" — "We accept most major insurances including Delta Dental, Cigna, Aetna, Humana, UnitedHealthcare, and Blue Cross. Contact us to verify your specific plan."
2. "How long does a dental implant procedure take?" — "The full implant process typically takes 3–6 months, including healing time. Your initial consultation will include a personalized timeline."
3. "Do you offer same-day emergency appointments?" — "Yes. We reserve time daily for dental emergencies. Call us or WhatsApp and we'll get you in as soon as possible."
4. "Do you have Portuguese-speaking staff?" — "Yes! Dr. Marques and several team members are fluent in Portuguese (Brazilian). We serve Orlando's Brazilian community with pride."
5. "What financing options are available?" — "We offer flexible payment plans and work with CareCredit. Ask our team about options during your consultation."
6. "What are your office hours?" — "We're open Monday through Friday, 10AM to 6PM, at both Winter Springs and Ocoee locations."

Estilo accordion: border `mist`, radius-lg, padding 20px, chevron que rotaciona. Animação de expand suave (Framer Motion `AnimatePresence` + `motion.div`).

#### Seção 8 — Final CTA

Dark section.
H2: "Your best smile is\none call away."
Subtítulo: "Schedule your free consultation today — in English or Portuguese."

2 CTAs grandes: Button `primary` lg "Schedule Free Consultation" + Button `whatsapp` lg "WhatsApp Us Now"

Nota embaixo: "No commitment · Free initial consultation · Bilingual staff"

---

### BLOCO 4 — Pages internas (placeholders ricos)

Cada page deve ter eyebrow + H1 + subtitle + placeholder do conteúdo principal com uma nota "Full content built in Sprint 3". Usar Nav + Footer via layout. TypeScript limpo.

#### `src/app/(site)/services/page.tsx`
Metadata: `title: 'Dental Services'`
Hero section com lista dos 6 serviços em grid.

#### `src/app/(site)/about/page.tsx`
Metadata: `title: 'About Us'`
Seção hero com Dr. Nelson + missão da clínica.

#### `src/app/(site)/insurance/page.tsx`
Metadata: `title: 'Insurance'`
Lista dos planos aceitos + formulário de verificação (campos: nome, plano, submit).

#### `src/app/(site)/first-visit/page.tsx`
Metadata: `title: 'Your First Visit'`
Steps numerados: 1. Schedule → 2. Complete forms → 3. Meet the team → 4. Treatment plan.

#### `src/app/(site)/contact/page.tsx`
Metadata: `title: 'Contact'`
Formulário com campos: Nome, Email, Telefone, Unidade (Select), Mensagem (Textarea), Submit.
Action: POST para `/api/leads`. Loading state no botão. Success/error Alert.
`'use client'` para o formulário.

#### `src/app/(site)/blog/page.tsx`
Metadata: `title: 'Blog'`
Grid de 3 cards placeholder de artigos.

---

### BLOCO 5 — Chat Widget (Sofia AI)

#### `src/components/chat/ChatWidget.tsx`

`'use client'`.

Specs per DESIGN.md §5:
- Floating bottom-right, `z-index: 200`, `position: fixed`, `bottom: 24px`, `right: 24px`
- Trigger button: 58px × 58px circle, bg `primary`, ícone `MessageCircle` Lucide branco
- Notification ping dot: 10px circle, bg `accent`, animação `animate-ping` + dot estático sobreposto
- Panel: `width: 360px`, `border-radius: 20px`, `shadow-chat`, spring animation open (Framer Motion `AnimatePresence` com `initial={{ opacity:0, y:20, scale:0.95 }}`)
- Header: bg `primary`, Avatar "S" em circle bg `accent`, "Sofia" Playfair Display, "Online · AI Assistant" DM Sans badge-white
- Mensagens: scroll, max-height 400px
  - AI bubbles: bg `soft`, radius `16px 16px 16px 4px`, text `body`, DM Sans
  - User bubbles: bg `primary`, text white, radius `16px 16px 4px 16px`, alinhado à direita
- Typing indicator: 3 dots `--dim`, `animate-typing` com stagger (delay 0s, 0.2s, 0.4s via `animationDelay`)
- Input + send button na base

**Lógica:**
- Estado local: `messages: Array<{role:'user'|'assistant', content:string}>`, `input: string`, `isLoading: boolean`
- Mensagem inicial da Sofia: "Olá! Sou a Sofia, assistente virtual da MediSmile. Como posso ajudar você hoje? 😊\n\nHi! I'm Sofia, MediSmile's virtual assistant. How can I help you today?"
- Submit: POST `/api/chat` com `{ message: input, conversationId }` — guardar `conversationId` em `useRef` (undefined no primeiro envio, preenchido após a resposta)
- Response streaming: ler `response.json()` (a rota `/api/chat` já existe e retorna JSON)
- Error state: Alert inline se fetch falhar
- Acessibilidade: `aria-label="Chat with Sofia"` no trigger, `role="log"` na lista de mensagens, `aria-live="polite"`

**Integrar na Home page:**
Importar e adicionar `<ChatWidget />` no final do `src/app/(site)/page.tsx` (é client component, então a home precisa ser ajustada ou usar um wrapper).

---

### BLOCO 6 — Expandir `/design-system`

Atualizar `src/app/(site)/design-system/page.tsx` com todos os novos componentes:
- Todos os tokens de cor (swatches completos com nome + hex)
- Escala tipográfica completa (display-xl ao ui-sm)
- Todos os botões com todas as variantes × tamanhos
- Todos os badges (teal, gold, white — este em fundo escuro)
- Input, Textarea, Select — estados default, focus, error, disabled
- Cards — todas as variantes (service, doctor, review, pricing)
- Alert — todas as variantes
- Sombras (boxes mostrando os 6 levels)
- Border radius (5 tokens)
- Motion (descrição dos keyframes)

---

### BLOCO 7 — Validação final

Após construir tudo:

```bash
# 1. TypeScript limpo
npm run build

# 2. Se houver erros, corrigir antes de continuar

# 3. Verificar que build passa com 0 erros e 18+ páginas
```

**Checklist antes de declarar S2 concluído:**
- [ ] `npm run build` passa sem erros TypeScript
- [ ] Nav aparece em todas as páginas do site
- [ ] Footer aparece em todas as páginas do site
- [ ] Home page tem todas as 8 seções
- [ ] ChatWidget aparece na Home
- [ ] `/contact` submete para `/api/leads` com loading/error states
- [ ] `/design-system` mostra todos os componentes
- [ ] Zero `any` em qualquer arquivo
- [ ] Zero hex hardcoded em qualquer componente
- [ ] Todos os `'use client'` têm justificativa real

---

### BLOCO 8 — Atualizar documentação

Após build limpo, atualizar `NEXT_STEPS.md`:
- Marcar S2 como ✅ CONCLUÍDO com data
- Listar o que foi construído
- Descrever o que S3 precisa fazer

---

## Notas de implementação

**Sobre Framer Motion:**
```tsx
// Sempre importar como:
import { motion, AnimatePresence } from 'framer-motion'
// Respeitar prefers-reduced-motion:
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
```

**Sobre imagens em S2:**
Usar `<div>` placeholder com gradiente onde virão fotos reais em S3. Nunca usar stock photos de dentes genéricos (anti-pattern do DESIGN.md §7).

**Sobre dark sections:**
Sempre usar gradient overlay, nunca flat `--midnight`. Per DESIGN.md §5:
```css
background:
  radial-gradient(ellipse 80% 60% at 70% 40%, rgba(11,79,108,0.55) 0%, transparent 70%),
  radial-gradient(ellipse 50% 80% at 10% 80%, rgba(34,201,165,0.12) 0%, transparent 60%),
  linear-gradient(135deg, #0F1923 0%, #0B2D40 50%, #0A3850 100%);
```
Mas usar as CSS variables em vez de hex direto.

**Sobre o FAQ accordion:**
Instalar se necessário: `framer-motion` já está no package.json.

**Sobre o formulário de contact:**
A rota `/api/leads` já existe. O body esperado está em `src/types/index.ts`.

**Se encontrar um tipo Supabase problemático:**
```ts
type CookieToSet = { name: string; value: string; options?: Record<string, unknown> }
```
Já aplicado em `server.ts` e `middleware.ts`.

---

Comece pelo Bloco 1 e avance em ordem. Não pergunte nada — tome decisões com base nos docs listados.
