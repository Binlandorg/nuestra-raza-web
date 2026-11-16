# Nuestra Raza — sitio web

Sitio de **Nuestra Raza**, asado de inspiración argentina y largas sobremesas en Arequipa, Perú.
_El fuego nos reúne._

- 7 páginas: Inicio, Historia, Experiencia, Carta, Asado de Sábado, Galería y Contacto, más `/reservar`
  (página dedicada a las solicitudes de reserva).
- Todas las páginas se **prerenderizan a HTML estático** (SEO y velocidad) y luego se hidratan con React.
- Ningún dato del negocio se inventa: lo que no está confirmado se muestra como _"Por confirmar"_.

---

## Stack

| Área | Tecnología |
| --- | --- |
| Framework | **TanStack Start** (React 19 + SSR/prerender sobre Vite 8) |
| Rutas | **TanStack Router**: rutas por archivo, `loader`, `head()` para SEO, search params tipados |
| Formularios | **TanStack Form** + **Zod 4** (validación) |
| Envíos | **TanStack Query** (`useMutation`) sobre "gateways" intercambiables |
| Estilos | **CSS Modules** procesados con Lightning CSS (anidación, cascade layers, prefijos automáticos) y tokens de marca como variables CSS |
| Imágenes | `vite-imagetools`: AVIF + WebP responsivos generados en el build |
| Fuentes | Playfair Display + Inter autoalojadas (Fontsource) con fuentes de respaldo calibradas |
| Iconos | Lucide React (+ iconos de redes propios en el mismo estilo) |

Decisiones:

- **TanStack Start en lugar de Next.js**: el repositorio ya era Vite y se pidió usar TanStack donde fuera posible.
  Start ofrece SSR, prerender, sitemap y `head()` por ruta, cubriendo los requisitos de SEO.
- **Sin Framer Motion**: las animaciones son 100 % CSS (scroll-driven animations, `@starting-style`), así que no
  agregan JavaScript. Todas respetan `prefers-reduced-motion`.
- **Sin backend propio ni base de datos**: las reservas y los mensajes se envían por WhatsApp con un mensaje
  preformateado. Para pasar a un backend basta con definir una variable de entorno (ver más abajo).

## Instalación y comandos

Requisitos: Node.js ≥ 22 y pnpm.

```bash
pnpm install
cp .env.example .env.local   # completa los valores
pnpm dev                     # http://localhost:3000
```

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Build de producción: prerenderiza las 8 páginas, genera `sitemap.xml`, `robots.txt` e imágenes; luego verifica tipos |
| `pnpm preview` | Sirve el build de producción localmente |
| `pnpm typecheck` | TypeScript estricto |
| `pnpm lint` | ESLint |
| `pnpm check` | Lint + tipos |
| `pnpm images:static` | Regenera recortes verticales del hero, imágenes Open Graph y `apple-touch-icon.png` |

## Variables de entorno

Archivo `.env.local` (ver `.env.example`). Solo las variables `VITE_*` llegan al navegador: **nunca** pongas
claves secretas en ellas.

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `VITE_SITE_URL` | Sí, en producción | URL pública sin barra final (`https://dominio.pe`). Se usa en canonical, Open Graph, `sitemap.xml`, `robots.txt` y datos estructurados. |
| `VITE_WHATSAPP_NUMBER` | No | Número que recibe reservas (formato `51XXXXXXXXX`). Tiene prioridad sobre `site.config.ts`; útil para un número de pruebas. |
| `VITE_RESERVATIONS_ENDPOINT` | No | Si se define, las reservas se envían por `POST` JSON a ese endpoint en lugar de WhatsApp. |
| `VITE_CONTACT_ENDPOINT` | No | Igual que el anterior, para el formulario de contacto. |

> El sitio es estático: después de cambiar variables o contenidos hay que volver a ejecutar `pnpm build` y publicar.

## Arquitectura

**Screaming architecture**: el código se organiza por dominio del negocio. Solo la carpeta de componentes
compartidos sigue **diseño atómico**.

```
src/
├── routes/                     Rutas de TanStack Router (finas: loader + head SEO + página de la feature)
│   ├── __root.tsx              Documento HTML, SEO global, JSON-LD Restaurant, layout
│   ├── index.tsx  historia.tsx  experiencia.tsx  carta.tsx
│   └── asado-de-sabado.tsx  galeria.tsx  contacto.tsx  reservar.tsx
├── features/                   Un módulo por dominio — cada uno expone su API pública en index.ts
│   ├── home/                   Portada (compone secciones de otras features)
│   ├── story/                  Historia
│   ├── experience/             Experiencia
│   ├── menu/                   Carta: tipos, datos, selectores, repositorio, componentes, JSON-LD
│   ├── saturday-asado/         Asado de Sábado: evento, fechas, disponibilidad, landing, JSON-LD
│   ├── reservations/           Solicitudes de reserva: esquema Zod, mensaje, gateways, formulario
│   ├── gallery/                Galería: categorías, grilla, lightbox
│   ├── contact/                Contacto: formulario, canales, mapa
│   └── system/                 Páginas 404 y error
├── shared/
│   ├── components/             ★ Diseño atómico (solo aquí)
│   │   ├── atoms/              Button, TextLink, Badge, Divider, SectionLabel, IconButton, Heading/Accent,
│   │   │                       ResponsivePicture, Illustration, BrandLogo, TornEdge, controles de formulario…
│   │   ├── molecules/          SectionHeading, PhotoCard, IconFeature, FormField, FormStatus, Disclosure,
│   │   │                       StepList, Quote, InfoItem, form-fields/ (campos conectados a TanStack Form)
│   │   ├── organisms/          Header, DesktopNavigation, MobileNavigation, Footer, PageHero, SplitSection, CtaBand
│   │   └── templates/          SiteLayout
│   ├── config/                 site.config.ts (datos del negocio), navegación, env
│   ├── content/photos.ts       Librería fotográfica (única fuente de fotos y textos alternativos)
│   ├── forms/                  createFormHook de TanStack Form (useAppForm)
│   ├── styles/                 Hoja global + módulos de fundamentos (ver "Estilos")
│   ├── hooks/  lib/  types/
└── assets/                     Fotos (src/assets/photos) e ilustraciones SVG del sistema de diseño
```

Reglas: las rutas no contienen lógica de UI; una feature solo importa de otra a través de su `index.ts`; los
datos editables viven en `data/` o `content/` dentro de cada feature, separados de los componentes.

## Estilos (CSS Modules)

Cada componente tiene su hoja **junto a él**: `Button.tsx` + `Button.module.css`. Las clases se usan como
`styles.root` y se combinan con `cn()` (clsx). En producción los nombres se acortan (`TtotJq_card`).

`src/shared/styles/`:

| Archivo | Contenido |
| --- | --- |
| `global.css` | Única hoja global: fuentes, `tokens.css`, `reset.css`, `base.css` y el orden de capas |
| `tokens.css` | Variables de marca: colores, roles de texto, tipografía fluida, radios, sombras, easing |
| `typography.module.css` | Escala editorial: `display`, `h1`–`h3`, `lead`, `label` |
| `layout.module.css` | `container` (columna del sitio con márgenes de 20 / 32 / 48 px) |
| `surfaces.module.css` | Superficies de marca con textura: `cream`, `sand`, `charcoal` |
| `motion.module.css` | Animaciones compartidas (`heroSettle`, `fadeIn`) |
| `utilities.module.css` | `srOnly`, `scrollbarNone` |

**Precedencia con cascade layers.** Cada `.module.css` empieza declarando el orden
`reset, base, foundations, atoms, molecules, organisms, templates, features, utilities` y envuelve sus reglas
en la capa de su nivel (un átomo en `atoms`, una página en `features`…). Las capas posteriores siempre ganan, sin
importar el orden de carga ni la especificidad: una feature puede ajustar un átomo pasándole `className`.

Convenciones:

- Breakpoints literales en las media queries: `40rem` (sm), `48rem` (md), `64rem` (lg), `80rem` (xl). Mobile first.
- Efectos `:hover` dentro de `@media (hover: hover)` para no dejar estados pegados en pantallas táctiles.
- Transparencias con `color-mix(in oklab, var(--color-…) 80%, transparent)`.
- Componentes con variantes de fondo reciben `tone="light" | "dark"`; las props nunca reciben clases de una
  librería concreta (p. ej. `TornEdge color="cream"`).

## Guía de contenidos

### Datos del negocio — `src/shared/config/site.config.ts`

Dirección, distrito, enlace e inserción de Google Maps, WhatsApp, correo, redes sociales, horario de atención,
tamaño máximo de grupo y la marca ®. **Todo valor `null` se muestra como "Por confirmar"** y se omite de los
datos estructurados de Google. Ejemplo:

```ts
contact: { whatsapp: '51XXXXXXXXX', whatsappDisplay: '+51 9XX XXX XXX', email: 'reservas@dominio.pe' },
hours: [{ label: 'Sábados', days: ['Saturday'], opens: '12:00', closes: '18:00' }],
```

### Carta y precios — `src/features/menu/data/menu.data.ts`

Cada producto tiene `price` (soles; `null` = "Consultar"), `portion` (`'300 g'`, `'Copa'`…), `availability`
(`'available'`, `'limited'` = "Según disponibilidad", `'unavailable'` = se muestra atenuado), `tags`, `photo`
opcional y `homeOrder` (1–6) para destacarlo en la portada. Para cambiar un precio basta con editar el número.

### Asado de Sábado — `src/features/saturday-asado/data/saturday-asado.data.ts`

Horario (`schedule`), precio por persona, cupos, **fechas confirmadas** con su disponibilidad
(`'available' | 'few-spots' | 'sold-out'`), qué incluye, la jornada paso a paso, el menú especial y las preguntas
frecuentes. Las fechas pasadas se ocultan solas; los sábados agotados no se pueden solicitar en el formulario; los
datos estructurados de evento solo se publican para fechas confirmadas.

```ts
upcomingDates: [{ date: '2026-11-21', availability: 'available' }, { date: '2026-11-28', availability: 'few-spots' }],
```

### Galería — `src/features/gallery/data/gallery.data.ts`

Lista ordenada de fotos con su categoría. La primera se muestra en grande.

### Fotos — `src/shared/content/photos.ts`

Todas las fotos se registran una vez con su texto alternativo. Para reemplazar una, sobrescribe el archivo en
`src/assets/photos/` (mismo nombre) y actualiza su `alt`. El sufijo `?photo=xl|lg|md|sm` elige el juego de
anchos según el tamaño del original. Si cambias una foto de hero, ejecuta `pnpm images:static` para regenerar su
recorte vertical para teléfonos y la imagen Open Graph.

### Textos de las páginas

`src/features/*/content/*.content.ts` (portada, historia, experiencia) y los textos de reservas en
`src/features/reservations/content/`.

## Reservas y contacto

1. El visitante completa el formulario (validación en vivo, mensajes claros, foco en el primer error).
2. Se abre WhatsApp con un mensaje preformateado (experiencia, nombre, fecha, hora, personas, comentarios).
3. **La reserva nunca se presenta como confirmada**: la interfaz indica que queda sujeta a la respuesta de Nuestra Raza.

Arquitectura preparada para un backend de reservas: el formulario usa un `ReservationGateway`
(`src/features/reservations/gateways`). Al definir `VITE_RESERVATIONS_ENDPOINT`, las solicitudes se envían por
`POST` con este JSON, sin cambiar ningún componente:

```json
{ "experience": "asado-de-sabado", "name": "…", "phone": "…", "date": "2026-11-21", "time": "13:30", "guests": "4", "comments": null }
```

Respuesta esperada: `2xx`, opcionalmente `{ "reference": "NR-1234" }`. El formulario de contacto funciona igual
(`VITE_CONTACT_ENDPOINT` → WhatsApp → correo, en ese orden de prioridad).

Mientras no haya WhatsApp configurado, los formularios muestran un estado de error amable ("canal en configuración").

## SEO y rendimiento

- `head()` por ruta: título y descripción únicos, canonical, Open Graph y Twitter Card con imagen por página.
- `sitemap.xml` y `robots.txt` generados en el build (requieren `VITE_SITE_URL`).
- JSON-LD: `Restaurant` (subtipo de `LocalBusiness`) con solo datos confirmados, `Menu` en `/carta` y `FoodEvent`
  únicamente para fechas confirmadas del Asado de Sábado.
- Imágenes AVIF/WebP con `srcset`, dimensiones explícitas (sin saltos de diseño), carga diferida y recortes verticales
  del hero para teléfonos; fuentes precargadas con métricas de respaldo medidas.

## Despliegue

`pnpm build` genera `dist/client/` con las 8 páginas en HTML estático. Publica esa carpeta en cualquier hosting
estático (Netlify, Cloudflare Pages, Vercel, S3 + CloudFront…). `public/_headers` define caché de un año para los
assets con hash (Netlify y Cloudflare Pages lo leen automáticamente; en otros servicios configura algo equivalente).
Activa la compresión gzip/brotli del hosting.

## Calidad verificada

- `pnpm build`, `pnpm typecheck` y `pnpm lint` sin errores.
- 26 pruebas funcionales automatizadas en el build de producción: validación y envío de reservas y contacto,
  rechazo de días que no son sábado, preselección por URL, filtros y lightbox de la galería (URL, teclado, Esc),
  anclas de la carta, menú móvil y ausencia de desbordamiento horizontal en las 8 páginas a 390 px.
- Lighthouse (móvil): Accesibilidad 100 · Buenas prácticas 100 · SEO 100 en todas las páginas. Rendimiento 95–96
  con throttling aplicado (LCP ≈ 2,7 s en 4G lento, CLS 0, TBT 0 ms); 87–92 en la simulación por defecto.

## Pendiente de confirmar por el negocio

- [ ] Dominio definitivo (`VITE_SITE_URL`).
- [ ] Número de WhatsApp para reservas, correo y redes sociales.
- [ ] Dirección exacta, distrito, enlace e inserción de Google Maps y coordenadas.
- [ ] Horario de atención.
- [ ] Asado de Sábado: horario, precio por persona, qué incluye exactamente, cupos y fechas.
- [ ] Precios y porciones de la carta; disponibilidad real de achuras.
- [ ] Tamaño máximo de grupo para reservas en línea (hoy 12).
- [ ] Si la marca está registrada en INDECOPI (para mostrar ®).
- [ ] **Fotografía propia.** Las fotos actuales son provisionales (Unsplash, ver
  `src/assets/photos/CREDITS.md`) y el sitio muestra "Imágenes referenciales" mientras
  `content.photosAreReferential` sea `true`. No hay fotos libres de provoleta ni chicha morada: esos productos
  usan un fondo de brasas hasta tener foto.
- [ ] Revisión de textos: descripciones de la carta, preguntas frecuentes e historia.
