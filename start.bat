@echo off
echo ╔═══════════════════════════════════════════════╗
echo ║   Portfolio 3D - Iniciando servidor...       ║
echo ╚═══════════════════════════════════════════════╝
echo.

where pnpm >/dev/null 2>/dev/null
if %ERRORLEVEL% EQU 0 (
    echo ✓ Usando pnpm...
    pnpm install
    pnpm dev
) else (
    where npm >/dev/null 2>/dev/null
    if %ERRORLEVEL% EQU 0 (
        echo ✓ Usando npm...
        npm install
        npm run dev
    ) else (
        echo ❌ Error: npm o pnpm no están instalados
        echo Por favor instala Node.js primero
        pause
        exit /b 1
    )
)
