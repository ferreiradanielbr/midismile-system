# UI/UX Pro Max — Setup & Run Guide
> MediSmile Group | Executar antes de continuar o Sprint 2

## Objetivo

Instalar a skill UI/UX Pro Max e gerar o `design-system/medismile/MASTER.md` do MediSmile, com validação baseada em 161 tipos de produto e 161 paletas de cor. (Nota: o `DESIGN.md` mencionado abaixo nunca chegou a existir no repo final — `MASTER.md` é a única referência canônica hoje.)

---

## Pré-requisitos

```bash
# Verificar Python
python3 --version
# Precisa de 3.8+
```

---

## Passo 1 — Baixar a skill

Na raiz do projeto MediSmile (`/Projetos/Medismile`):

```bash
mkdir -p .claude/skills
git clone https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.git .claude/skills/ui-ux-pro-max-skill
cp -r .claude/skills/ui-ux-pro-max-skill/.claude/skills/ui-ux-pro-max .claude/skills/
rm -rf .claude/skills/ui-ux-pro-max-skill
```

Verificar estrutura:
```bash
ls .claude/skills/ui-ux-pro-max/scripts/
# deve aparecer: search.py
```

---

## Passo 2 — Gerar Design System completo

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "premium dental clinic wellness bilingual service Orlando" \
  --design-system \
  --persist \
  -p "MediSmile" \
  -f markdown
```

Isso cria:
- `design-system/MASTER.md` — sistema de design completo com reasoning
- Paleta recomendada, estilos, tipografia, efeitos e anti-padrões

---

## Passo 3 — Gerar override por página

Para cada página do Sprint 2, rodar:

```bash
# Hero / Home
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "premium dental clinic hero landing conversion" \
  --design-system --persist -p "MediSmile" --page "home"

# Serviços
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "dental services implants cosmetic pricing" \
  --design-system --persist -p "MediSmile" --page "services"

# Formulário / Sofia AI
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "AI chatbot lead qualification form multi-step" \
  --design-system --persist -p "MediSmile" --page "sofia"
```

---

## Passo 4 — Pesquisas complementares

Rodar após o design system para detalhar pontos críticos:

```bash
# Animações com qualidade $10k
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "spring animation luxury premium micro-interaction" --domain ux

# Paletas para clínica odontológica premium
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "healthcare wellness premium blue gold" --domain color

# Combinações de fontes elegantes
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "elegant luxury serif modern" --domain typography

# Estrutura de landing de alta conversão
python3 .claude/skills/ui-ux-pro-max/scripts/search.py \
  "hero social-proof testimonial CTA bilingual" --domain landing
```

---

## Passo 5 — Validar contra o design atual

Após gerar o MASTER.md, comparar com:

- `src/app/globals.css` (tokens CSS atuais)
- `Base_docs/medismile-prototype.html` (visual bible)

Anotar divergências e lacunas antes de implementar páginas do S2.

---

## O que fazer com os resultados

| Output | Ação |
|--------|------|
| `design-system/medismile/MASTER.md` | Anexar ao prompt de cada sessão como contexto |
| Divergências com o prototype HTML | Abrir para discussão antes de implementar |
| Anti-padrões identificados | Adicionar às regras do `CLAUDE.md` |
| Recomendações de animação | Aplicar nos componentes Framer Motion existentes |

---

## Checklist pré-entrega Sprint 2

Usar como revisão antes de fechar cada página:

### Visual
- [ ] Nenhum emoji usado como ícone
- [ ] Tokens de cor usados em 100% dos componentes (zero hex hardcoded)
- [ ] Estados hover/pressed/disabled documentados por componente
- [ ] Contraste 4.5:1 verificado (especialmente texto sobre `--color-primary` Deep Ocean Blue)

### Animação
- [ ] Micro-interações entre 150–300ms
- [ ] `ease-out` para entradas, `ease-in` para saídas
- [ ] Spring physics nos componentes principais (Framer Motion `type: "spring"`)
- [ ] `prefers-reduced-motion` respeitado

### Formulário Sofia
- [ ] Multi-step com indicador de progresso
- [ ] Validação `onBlur`, não `onChange`
- [ ] Erro abaixo do campo com path de recuperação
- [ ] Loading + success + error states

### Layout
- [ ] `min-h-dvh` em vez de `100vh`
- [ ] Breakpoints 375 / 768 / 1024 / 1440
- [ ] Sem scroll horizontal no mobile
- [ ] `z-index` scale definido (10 / 20 / 40 / 100 / 1000)

### Acessibilidade
- [ ] `aria-label` em todos os botões de ícone
- [ ] `alt` em todas as imagens
- [ ] Ordem de foco equivalente à ordem visual
- [ ] `skip-link` "Pular para o conteúdo"

---

## Contexto para a sessão de implementação

Ao abrir nova sessão de Cowork para o S2, incluir no prompt:

```
Contexto adicional de design:
- Ler design-system/medismile/MASTER.md (gerado pela UI/UX Pro Max skill)
- Ler Base_docs/medismile-prototype.html como visual bible absoluta
- Stack: Next.js 14 App Router + Framer Motion + Tailwind tokens
- Meta: landing page nível $10k — animações com spring physics,
  estados completos, acessibilidade AA, zero hex hardcoded
```
