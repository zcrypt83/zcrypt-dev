#!/bin/bash

echo "╔═══════════════════════════════════════════════╗"
echo "║   Portfolio 3D - Iniciando servidor...       ║"
echo "╚═══════════════════════════════════════════════╝"
echo ""

# Verificar si pnpm está instalado
if command -v pnpm &> /dev/null; then
    echo "✓ Usando pnpm..."
    pnpm install
    pnpm dev
elif command -v npm &> /dev/null; then
    echo "✓ Usando npm..."
    npm install
    npm run dev
else
    echo "❌ Error: npm o pnpm no están instalados"
    echo "Por favor instala Node.js primero"
    exit 1
fi
