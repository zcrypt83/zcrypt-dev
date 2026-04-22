# 🚀 Guía de Instalación y Ejecución Local

## Opción 1: Usando pnpm (Recomendado - Más Rápido)

### 1. Instalar pnpm globalmente (si no lo tienes)
```bash
npm install -g pnpm
```

### 2. Instalar dependencias
```bash
pnpm install
```

### 3. Ejecutar en modo desarrollo
```bash
pnpm dev
```

### 4. Abrir en el navegador
```
http://localhost:5173
```

---

## Opción 2: Usando npm

### 1. Instalar dependencias
```bash
npm install
```

### 2. Ejecutar en modo desarrollo
```bash
npm run dev
```

### 3. Abrir en el navegador
```
http://localhost:5173
```

---

## 📦 Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `pnpm dev` o `npm run dev` | Inicia el servidor de desarrollo |
| `pnpm build` o `npm run build` | Construye el proyecto para producción |
| `pnpm preview` o `npm run preview` | Vista previa de la build de producción |

---

## 🛠️ Construcción para Producción

### 1. Construir el proyecto
```bash
pnpm build
# o
npm run build
```

Esto creará una carpeta `dist/` con los archivos optimizados.

### 2. Vista previa local de producción
```bash
pnpm preview
# o
npm run preview
```

### 3. Desplegar
Puedes subir el contenido de la carpeta `dist/` a cualquier servicio de hosting estático:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting

---

## 📝 Notas Importantes

1. **Puerto por defecto**: El proyecto se ejecuta en `http://localhost:5173`
2. **Hot Reload**: Los cambios se reflejan automáticamente en el navegador
3. **Requisitos**: Node.js 18+ necesario
4. **pnpm vs npm**: pnpm es más rápido y eficiente con el espacio en disco

---

## 🐛 Solución de Problemas

### El puerto 5173 está ocupado
```bash
# En Linux/Mac
lsof -ti:5173 | xargs kill -9

# En Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Limpiar caché e reinstalar
```bash
# Con pnpm
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Con npm
rm -rf node_modules package-lock.json
npm install
```

### Error de TypeScript
```bash
# Limpiar cache de TypeScript
rm -rf node_modules/.cache
pnpm install
```

---

## 📧 Contacto

Si tienes problemas o preguntas:
- GitHub: https://github.com/zcrypt83
- Email: zcrypt83@duck.com
- WhatsApp: +51 904 572 815
