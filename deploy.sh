#!/bin/bash
# MediSmile — setup git + commit + push
set -e
cd "$(dirname "$0")"

# Init se necessário
if [ ! -d ".git" ]; then
  echo "🔧 Inicializando git..."
  git init
  git branch -M main
  git remote add origin https://github.com/ferreiradanielbr/midismile-system.git
fi

echo "📦 Adicionando todos os arquivos..."
git add -A

echo "💬 Commitando..."
git commit -m "feat(polish): sprint polimento premium ui-ux-pro-max

- AnimatedGrid: stagger 50ms whileInView nos grids de cards
- Card: whileHover/whileTap scale feedback (ServiceCard 0.97, ReviewCard 0.98)
- FAQAccordion: exit-faster-than-enter (0.15s vs 0.25s)
- layout: skip link WCAG AA + id=main-content
- globals.css: z-index scale --z-base/raised/nav/chat/modal/toast
- Alert: aria-live assertive (error/warning) e polite (info/success)
- contact: blur validation + auto-focus primeiro campo invalido + tabular-nums
- ChatWidget: skeleton shimmer substitui typing dots + exit 0.15s ease-in
- tailwind: keyframe shimmer"

echo "🚀 Push para origin main..."
git push -u origin main

echo "✅ Pronto!"
