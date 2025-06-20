#!/bin/bash

echo "🔍 Procurando usos de 'asChild' com múltiplos elementos filhos potencialmente inválidos..."

grep -r --include="*.tsx" -Pzo '(?s)<\w+[^>]*asChild[^>]*>.*?\n.*?<' ./src \
  | grep -v "^\s*//" \
  | sed 's/\x0/\n---\n/g' \
  | tee aschild-issues.txt

echo ""
echo "✅ Busca concluída."
echo "➡️  Verifique os resultados em 'aschild-issues.txt'"
