# ai4u-website

Sitio web corporativo público de Ai4U (www.ai4u.com.co): landing, servicios, agentes, portafolio, orderLoader, sitios web y páginas legales. Es un SPA de marketing, sin backend propio. **Repo público: nada de secretos, infraestructura interna ni datos de clientes en código, docs o commits.**

## Stack
- React 18 + TypeScript (`strict: false`) + Vite 5 (puerto dev 3002) + Material UI 6 + React Router 6 + `react-helmet-async`.
- `@ai4u/design-system` fijado por tag de git (`github:ai4u-com-co/sistemaDiseno#v1.4.0`); tokens propios además en `src/components/shared/ui/tokens/`.
- Tests: Vitest (+ Testing Library) y Playwright (`tests/smoke.spec.ts`). Node 20 en CI.

## Comandos (package.json)
- `npm run dev` (o `start`) · `npm run build` · `npm run preview`
- `npm test` (vitest, modo watch) · `npm run test:e2e` (Playwright)
- `npm run validate-translations` · `npm run optimize-images` · `npm run analyze-images` · `npm run lighthouse` · `npm run validate-whatsapp` · `npm run create-social-image`
- No hay script de lint ni de type-check (existe `eslintConfig` en package.json, sin paquete eslint instalado: por confirmar si corre).

## Estructura
- `src/pages/` páginas lazy (excepto Home, ruta crítica); rutas en `src/utils/constants.ts` (`ROUTES`) y montadas en `src/App.tsx`.
- `src/components/shared/ui/{atoms,molecules,organisms,layouts,tokens}` (atomic design), `src/components/agentes/`, `src/context/` (Theme, Loading, Services, Surface), `src/data/` (contenido estático: servicios, agentes, clientes...), `src/hooks/`, `src/utils/` (seo, analytics, api, logger).
- `public/` (robots, sitemap, manifest, CNAME, imágenes), `scripts/` (imágenes, prerender, Lighthouse), `docs/` y `src/docs/` (guías internas, varias con historial de fases; pueden estar desactualizadas).
- Alias `@` -> `src/`. `experiments/`, `fondo emprender/`, `playwright-report/` y `.superpowers/` no son parte de la app.

## Convenciones y trampas
- Convención de texto (`.cursor/rules/text-conventions.mdc`): sin MAYÚSCULAS sostenidas en UI o código; capitalización normal o camelCase.
- Contenido en español; i18n/traducción descrito en `src/docs/INTERNATIONALIZATION.md` y `docs/TRANSLATION_STATUS.md` (hay widget de Google Translate). Estado real: por confirmar.
- Toda variable `VITE_*` queda embebida en el bundle público: nunca poner ahí secretos. Hoy `src/utils/api.ts` lee un webhook y un token opcional de Make.com del chat; que ese token sea realmente privado es por confirmar.
- El HTML de las rutas públicas se prerenderiza tras el build con Playwright (`scripts/prerender.mjs`; rutas fijas: `/`, `/servicios`, `/portafolio`, `/por-que-ai4u`, `/agentes`, `/dashboards`, `/sitios-web`, `/orderloader`). Una ruta pública nueva que deba indexarse hay que agregarla ahí y en `public/sitemap.xml`.
- Mobile first: sin scroll horizontal a 375px; imágenes con `max-width: 100%`. Hay guía de optimización de imágenes en `docs/IMAGE_OPTIMIZATION_GUIDE.md`.
- No es multitenant ni toca SAP ni Supabase. No hay páginas de propuestas ni pitches (se eliminaron el 1-oct-2026 por ser contenido público con datos de clientes): no añadir cifras, precios, nombres ni datos confidenciales de clientes.

## Variables de entorno (solo nombres, ver `env.example`)
`VITE_MAKE_WEBHOOK_URL` (webhook del chat), `VITE_MAKE_API_TOKEN` (opcional).

## Despliegue
- Rama default: `master`. `.github/workflows/deploy.yml` (push a `master` o manual): `npm install`, `npm run build`, prerender y publicación en GitHub Pages con dominio `www.ai4u.com.co` (`CNAME`).
- Existe además `vercel.json` (rewrite SPA y cabeceras de caché) y `deploy`/`gh-pages` en scripts: si Vercel sigue en uso o es residual, por confirmar. Las variables `VITE_*` en el build de Pages: por confirmar dónde se definen.
- Plantillas de Issue/PR en `.github/`.
