# Integración UAPAVERSE en tu proyecto principal

Copia la carpeta `src/features/metaverso` completa a tu repo (junto a `auth`, `stands`, etc.).

## Estructura del módulo

```
features/metaverso/
├── components/
│   ├── canvas/          # Escena 3D (R3F)
│   ├── ui/              # HUD, modales, overlays
│   └── MetaversoShell.tsx
├── hooks/
├── services/            # API, catálogo, Gemini, asistente local
├── store/
├── data/
├── lib/
├── utils/
├── styles/
│   └── metaverso.css
└── index.ts
```

## 1. Dependencias (pnpm)

### Si tu proyecto usa **React 18** (Next.js 14)

```bash
pnpm add @react-three/fiber@^8.17.14 @react-three/drei@^9.122.0 @react-three/postprocessing@^2.16.3 framer-motion three zustand
pnpm add -D @types/three
```

> **Importante:** `@react-three/fiber` v9+ requiere **React 19**. Con React 18 verás errores en `createReconciler` al cargar `Experience.tsx`. Usa fiber **8.x** o actualiza todo el proyecto a React 19.

### Si tu proyecto usa **React 19** (Next.js 15+)

```bash
pnpm add @react-three/fiber@^9 @react-three/drei@^10 @react-three/postprocessing@^3 framer-motion three zustand
pnpm add -D @types/three
```

## 2. Assets estáticos

Copia `public/logos/` a tu proyecto:

- `public/logos/uapaverse.png`
- `public/logos/cadesoft.png`

## 3. Rutas API en `app/`

Crea estos archivos (o reexporta desde el módulo):

**`app/api/metaverso/stands/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { getStandsCatalog } from "@/features/metaverso/services/stands-api";

export async function GET(request: NextRequest) {
  const result = await getStandsCatalog(request.nextUrl.searchParams);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.data);
}
```

**`app/api/metaverso/gemini/route.ts`**

```ts
import { NextRequest, NextResponse } from "next/server";
import { askGeminiAssistant } from "@/features/metaverso/services/gemini-api";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await askGeminiAssistant(body);
    if ("error" in result) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }
    return NextResponse.json(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
```

Si montas las APIs en otro path, edita `features/metaverso/lib/config.ts`:

```ts
export const METAVERSO_API = {
  stands: "/api/tu-ruta/stands",
  gemini: "/api/tu-ruta/gemini",
};
```

## 4. Página en `app/`

**`app/metaverso/page.tsx`** (o la ruta que prefieras):

```tsx
import { MetaversoShell } from "@/features/metaverso";

export default function MetaversoPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <MetaversoShell />
    </main>
  );
}
```

## 5. Layout / fuentes (opcional pero recomendado)

En el layout que envuelva el metaverso, carga las fuentes 3D:

```tsx
import { Sora, Hanken_Grotesk, Space_Grotesk } from "next/font/google";

const fontHeadline = Sora({ subsets: ["latin"], variable: "--font-env-headline", weight: ["600", "700"] });
const fontBody = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-env-body", weight: ["400", "500"] });
const fontLabel = Space_Grotesk({ subsets: ["latin"], variable: "--font-env-label", weight: ["500"] });
```

`MetaversoShell` ya importa `metaverso.css` (estilos glass, neon, canvas).

## 6. Variables de entorno

```env
BACKEND_UAPAVERSE_URL=https://backend-uapaverse.onrender.com
GEMINI_API_KEY=tu_clave   # opcional; sin ella usa respuestas locales
```

Los stands se cargan desde `GET {BACKEND_UAPAVERSE_URL}/api/uapaverse/project/list` y las salas desde `GET {BACKEND_UAPAVERSE_URL}/api/uapaverse/category/list`. **Cada categoría es una sala**; dentro de cada sala solo aparecen proyectos **APROBADO** de esa categoría (`id_categoria`).

## 7. Sesión y rol (proyecto principal)

El botón **Iniciar conversación** solo aparece si hay sesión en `localStorage` y el rol es **EMPRESARIO** o **EMPRESARIAL** (empresario).

### Cómo guarda el login tu app

```ts
localStorage.setItem("token", data.access_token);
localStorage.setItem("user", JSON.stringify(data.user));
```

Ejemplo de `data.user`: `{ "id": 23, "name": "...", "email": "...", "role": "EMPRESARIO" }`  
(o `"EMPRESARIAL"` según el valor que devuelva el backend).

### Integración recomendada en `handleLogin`

```ts
import {
  persistMetaversoSession,
  type LoginApiResponse,
} from "@/features/metaverso";

const data: LoginApiResponse = await response.json();

if (response.ok) {
  persistMetaversoSession(data.access_token, data.user);
  // router.push(...) según data.user.role
}
```

En **logout**:

```ts
import { clearMetaversoSession } from "@/features/metaverso";

clearMetaversoSession();
```

Si sigues usando `localStorage.setItem` manualmente, llama tras el login:

```ts
import { notifyMetaversoSessionChanged } from "@/features/metaverso";
notifyMetaversoSessionChanged();
```

Claves y roles: `features/metaverso/lib/auth-config.ts`

### Volver al dashboard (HUD)

Si el usuario está logueado, aparece **Volver al dashboard** arriba a la derecha. La ruta depende del rol (`ROLE_DASHBOARD_PATHS`):

| Rol | Dashboard |
|-----|-----------|
| `ADMIN` | `/dashboard-admin` |
| `ACADEMICO` | `/dashboard-visitante` |
| `EMPRESARIO` / `EMPRESARIAL` | `/dashboard-empresa` |
| `EXPOSITOR` | `/dashboard-presentador` |

## 8. Alias TypeScript

Tu `tsconfig.json` debe tener:

```json
"paths": { "@/*": ["./src/*"] }
```

## Export principal

```tsx
import { MetaversoShell, useUapaStore, METAVERSO_API } from "@/features/metaverso";
```
