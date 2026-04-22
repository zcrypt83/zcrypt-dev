# Portfolio - Desarrollador Full Stack

Portfolio interactivo 3D desarrollado con React, TypeScript, Tailwind CSS y Motion (Framer Motion).
Ahora incluye backend con Express + SQLite para guardar clientes, cookies para autocompletar y envio de notificaciones por correo.

## 🚀 Características

- **Animaciones 3D avanzadas**: Efectos de parallax, rotación, inclinación y profundidad
- **Seguimiento del mouse**: Cursor personalizado y partículas magnéticas
- **Efectos visuales**: Starfield, ondas animadas, formas geométricas flotantes
- **Glassmorphism**: Diseño moderno con efectos de desenfoque y transparencias
- **Responsive**: Adaptado para todos los dispositivos
- **Interactivo**: Tarjetas con inclinación 3D que siguen el mouse
- **Backend con SQLite**: Guarda leads (nombre, email, teléfono, empresa, mensaje)
- **Cookies de cliente**: Autocompleta nombre/email/teléfono/empresa en futuras visitas
- **Redes con mensaje**: Íconos sociales con mensaje predefinido al hacer clic
- **Notificacion por correo**: Cada lead se envia a `zcrypt83@proton.me` (con SMTP configurado)
- **Transparencia para cliente**: Seccion visual paso a paso desde analisis hasta produccion

## 📋 Requisitos Previos

- Node.js (versión 18 o superior)
- pnpm (recomendado) o npm

## 🔧 Instalación

### Usando pnpm (recomendado)

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm dev

# Ejecutar backend + frontend al mismo tiempo
pnpm dev:full

# Construir para producción
pnpm build

# Vista previa de la build de producción
pnpm preview
```

### Usando npm

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Ejecutar backend + frontend al mismo tiempo
npm run dev:full

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 🌐 Desarrollo Local

Después de ejecutar `pnpm dev` o `npm run dev`, el proyecto estará disponible en:

```
http://localhost:5173
```

Backend local:

```
http://localhost:8787
```

El servidor de desarrollo se recargará automáticamente cuando hagas cambios en el código.

## ✉️ Configuracion de Correo (SMTP)

1. Copia `.env.example` a `.env`
2. Completa tus credenciales SMTP
3. El backend enviara los mensajes del formulario a `zcrypt83@proton.me`

Variables clave:

- `LEAD_RECIPIENT` (destino del correo)
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## 📁 Estructura del Proyecto

```
├── src/
│   ├── app/
│   │   ├── components/        # Componentes React
│   │   │   ├── Hero.tsx       # Sección principal
│   │   │   ├── Skills.tsx     # Habilidades técnicas
│   │   │   ├── Projects.tsx   # Proyectos destacados
│   │   │   ├── ProjectProcess.tsx # Flujo transparente de trabajo
│   │   │   ├── Contact.tsx    # Formulario de contacto
│   │   │   └── ui/            # Componentes UI reutilizables
│   │   ├── hooks/             # Custom hooks
│   │   └── App.tsx            # Componente principal
│   ├── styles/                # Estilos globales
│   │   ├── fonts.css          # Fuentes
│   │   └── theme.css          # Tema y variables
│   └── main.tsx               # Punto de entrada
├── server/
│   ├── index.js               # API Express + SQLite
│   └── data/                  # Base de datos SQLite local (ignorada en git)
├── index.html                 # HTML principal
├── vite.config.ts             # Configuración de Vite
├── tsconfig.json              # Configuración de TypeScript
└── package.json               # Dependencias y scripts

```

## 🎨 Tecnologías Utilizadas

- **React 18.3.1**: Biblioteca de UI
- **TypeScript**: Tipado estático
- **Vite**: Build tool y dev server
- **Tailwind CSS 4**: Framework de CSS
- **Motion (Framer Motion)**: Animaciones 3D
- **Lucide React**: Iconos
- **React Hook Form**: Formularios
- **Express**: API backend
- **SQLite**: Persistencia local de clientes
- **Nodemailer**: Envio de email desde backend

## ✨ Características Destacadas

### Efectos 3D
- **MouseFollower**: Cursor personalizado que reacciona a elementos interactivos
- **MagneticParticles**: Partículas que se atraen magnéticamente al cursor
- **use3DTilt Hook**: Sistema de inclinación 3D basado en la posición del mouse
- **Floating3DShapes**: Formas geométricas 3D flotantes

### Animaciones
- **ScrollProgress**: Barra de progreso de scroll animada
- **ParallaxSection**: Efectos de parallax basados en scroll
- **RippleEffect**: Ondas expansivas al hacer clic
- **Loader3D**: Loader 3D al cargar la página

### Componentes Interactivos
- Tarjetas de proyectos con profundidad 3D
- Tarjetas de habilidades con iconos animados
- Formulario de contacto con efectos glassmorphism
- Formulario de contacto conectado a SQLite
- Guardado en cookie para autocompletado
- Enlaces editables de GitHub

## 🗄️ Endpoints Backend

- `GET /api/health`: estado del backend
- `POST /api/clients`: guarda un cliente en SQLite
- `POST /api/clients`: guarda cliente en SQLite y envía notificación por correo
- `GET /api/clients`: lista los últimos 100 clientes guardados

## ☁️ Deploy en Render

Este repo ya incluye `render.yaml` para despliegue automatico.

1. Crea un nuevo Web Service en Render conectado a este repositorio.
2. Render detectara `render.yaml` con:
   - Build: `npm install && npm run build`
   - Start: `npm run start:server`
3. Configura variables secretas:
   - `SMTP_HOST`
   - `SMTP_USER`
   - `SMTP_PASS`
4. Verifica salud en `/api/health`.

## 🔗 Contacto

- **GitHub**: [zcrypt83](https://github.com/zcrypt83)
- **Email**: zcrypt83@proton.me
- **WhatsApp**: +51 904 572 815
- **Ubicación**: Perú

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

---

Desarrollado con ❤️ por zcrypt83
