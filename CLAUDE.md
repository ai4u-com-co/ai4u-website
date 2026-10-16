# ai4u-website

Sitio web corporativo público de Ai4U (www.ai4u.com.co): landing, servicios, agentes, portafolio, orderLoader, sitios web y páginas legales. Es un SPA de marketing, sin backend propio. **Repo público: nada de secretos, infraestructura interna ni datos de clientes en código, docs o commits.**

## Stack
- React 18 + TypeScript (`strict: false`) + Vite 5 (puerto dev 3002) + Material UI 6 + React Router 6 + `react-helmet-async`.
- `@ai4u/design-system` fijado por tag de git (`github:ai4u-com-co/sistemaDiseno#v1.4.0`); tokens propios además en `src/components/shared/ui/tokens/`.
- Tests: Vitest (+ Testing Library) y Playwright (`tests/smoke.spec.ts`). Node 20 en CI.

## Comandos (package.json)
- `npm run dev` (o `start`) · `npm run build` · `npm run preview`
- `npm test` (vitest, modo watch) · `npm run test:e2e` (Playwright)
- Build completo como en producción: `npm run build && node scripts/prerender.mjs && node scripts/seo-postbuild.mjs` (reconstruir antes de cada prerender: reescribe `dist/index.html`)
- `npm run validate-translations` · `npm run optimize-images` · `npm run analyze-images` · `npm run lighthouse` · `npm run validate-whatsapp` · `npm run create-social-image`
- No hay script de lint ni de type-check (existe `eslintConfig` en package.json, sin paquete eslint instalado: por confirmar si corre).

## Estructura
- `src/pages/` páginas lazy (excepto Home, ruta crítica); rutas en `src/utils/constants.ts` (`ROUTES`) y montadas en `src/App.tsx`.
- `src/components/shared/ui/{atoms,molecules,organisms,layouts,tokens}` (atomic design), `src/components/agentes/`, `src/context/` (Theme, Loading, Services, Surface), `src/data/` (contenido estático: servicios, agentes, clientes...), `src/hooks/`, `src/utils/` (seo, analytics, api, logger).
- `public/` (robots, llms.txt, manifest, íconos, imágenes; el sitemap se genera en el build), `scripts/` (imágenes, prerender, Lighthouse), `docs/` y `src/docs/` (guías internas, varias con historial de fases; pueden estar desactualizadas).
- Alias `@` -> `src/`. `experiments/`, `fondo emprender/`, `playwright-report/` y `.superpowers/` no son parte de la app.

## Convenciones y trampas
- Convención de texto (`.cursor/rules/text-conventions.mdc`): sin MAYÚSCULAS sostenidas en UI o código; capitalización normal o camelCase.
- Contenido en español; i18n/traducción descrito en `src/docs/INTERNATIONALIZATION.md` y `docs/TRANSLATION_STATUS.md` (hay widget de Google Translate). Estado real: por confirmar.
- Toda variable `VITE_*` queda embebida en el bundle público: nunca poner ahí secretos. Hoy `src/utils/api.ts` lee un webhook y un token opcional de Make.com del chat; que ese token sea realmente privado es por confirmar.
- **SEO / GEO / AEO:** `src/data/seoPages.json` es la lista única de páginas públicas (ruta, título, descripción, tipo, si va al sitemap). De ahí salen el prerender, el `sitemap.xml`, las validaciones y los datos estructurados (`src/utils/jsonld.ts`, un `@graph` por página). Cada página usa `<SEOHead path="/ruta" />`: título, descripción, canónica, Open Graph, Twitter y JSON-LD salen del registro; la canónica NUNCA sale de `window.location` (en el prerender era `localhost`). `index.html` no lleva metadatos de página (duplicaban los de `SEOHead`). Una ruta pública nueva: agregarla al registro, crear la página con `SEOHead` y la ruta en `App.tsx`.
- El HTML de las rutas públicas se prerenderiza tras el build (`scripts/prerender.mjs`, Playwright; en Vercel usa `@sparticuz/chromium`). Después corre `scripts/seo-postbuild.mjs`: genera `dist/sitemap.xml` y `dist/llms-full.txt` (texto de cada página, para asistentes de IA) y **valida cada página** (una sola canónica correcta, sin localhost, descripción única, JSON-LD válido, un H1, fuentes sin bloquear); si algo falla, el build falla. `public/llms.txt` y `public/robots.txt` (con los rastreadores de IA permitidos de forma explícita) son estáticos. `public/404.html` es una página 404 real (noindex), sin la redirección de GitHub Pages.
- Rendimiento: Google Translate solo se descarga si existe la cookie `googtrans` (el selector guarda la cookie y recarga); Google Analytics se pide después de `load`; las fuentes de Google van con `preload`. Imágenes de las vistas previas en WebP; no subir imágenes de varios MB a `public/`.
- Mobile first: sin scroll horizontal a 375px; imágenes con `max-width: 100%`. Hay guía de optimización de imágenes en `docs/IMAGE_OPTIMIZATION_GUIDE.md`.
- No es multitenant ni toca SAP ni Supabase. No hay páginas de propuestas ni pitches (se eliminaron el 1-oct-2026 por ser contenido público con datos de clientes): no añadir cifras, precios, nombres ni datos confidenciales de clientes.

## Variables de entorno (solo nombres, ver `env.example`)
`VITE_MAKE_WEBHOOK_URL` (webhook del chat), `VITE_MAKE_API_TOKEN` (opcional).

## Despliegue
- Rama default: `master`. `.github/workflows/deploy.yml` (push a `master` o manual): `npm install`, `npm run build`, prerender y publicación en GitHub Pages con dominio `www.ai4u.com.co` (`CNAME`).
- Existe además `vercel.json` (rewrite SPA y cabeceras de caché) y `deploy`/`gh-pages` en scripts: si Vercel sigue en uso o es residual, por confirmar. Las variables `VITE_*` en el build de Pages: por confirmar dónde se definen.
- Plantillas de Issue/PR en `.github/`.
