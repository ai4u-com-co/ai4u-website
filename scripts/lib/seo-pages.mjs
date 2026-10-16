// Carga la lista completa de páginas (src/data/allSeoPages.ts) desde los scripts de build: la compila en memoria
// con esbuild (ya viene con Vite) y la importa. Una sola lista para el prerender, el sitemap y la validación.
import { build } from 'esbuild';
import { join } from 'node:path';

export async function loadSeoPages(root) {
  const out = await build({
    entryPoints: [join(root, 'src', 'data', 'allSeoPages.ts')],
    bundle: true, write: false, format: 'esm', platform: 'node', logLevel: 'silent',
  });
  const mod = await import(`data:text/javascript;base64,${Buffer.from(out.outputFiles[0].text).toString('base64')}`);
  return mod.SEO_PAGES_ALL;
}
