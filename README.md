# ⚡ Aurum Fitness - Frontend (Next.js 16 + App Router)

Cliente web de alto rendimiento para Aurum Fitness. Desarrollado con Next.js 16 (App Router), TypeScript y un sistema de diseño de lujo **Dorado y Negro (Gold & Obsidian)**.

## 🎨 Sistema de Diseño (Gold & Black)
- **Fondo Obsidiana:** `#070708`
- **Superficies & Tarjetas:** `#141417`
- **Acentos Dorados:** `#d4af37` / `#f5d16f`
- **Tipografía:** *Syne* (Títulos de impacto) y *Plus Jakarta Sans* (Interfaz moderna)

## 📁 Estructura
```text
src/
├── app/            # App Router (layout.tsx, page.tsx, globals.css)
├── components/     # Componentes UI (Navbar, StatCards, RoutineCards)
├── services/       # Cliente HTTP tipado para conexión con Express API
└── types/          # Interfaces TypeScript sincronizadas con el backend
```

## 🛠️ Instalación y Uso
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (http://localhost:3000)
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```
