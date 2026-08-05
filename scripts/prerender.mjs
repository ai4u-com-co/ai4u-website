// Prerender post-build: renderiza las rutas públicas de la SPA y vuelca el HTML
// a dist/<ruta>/index.html para que GitHub Pages sirva contenido real (SEO + primer render).
// Si Playwright no tiene navegador instalado, se salta con warning (el build no falla).
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const ROUTES = ['/', '/servicios', '/portafolio', '/por-que-ai4u', '/tienda-ai'];
const PORT = 4173;

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.webp': 'image/webp', '.json': 'application/json', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.mp4': 'video/mp4',
};

async function serveDist() {
  const server = createServer(async (req, res) => {
    const url = req.url.split('?')[0];
    let file = join(DIST, url);
    try {
      await access(file);
      if (!extname(file)) file = join(file, 'index.html');
    } catch {
      file = join(DIST, 'index.html'); // fallback SPA
    }
    try {
      const body = await readFile(file);
      res.writeHead(200, { 'Content-Type': MIME[extname(file)] || 'application/octet-stream' });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end('not found');
    }
  });
  await new Promise(resolve => server.listen(PORT, resolve));
  return server;
}

async function main() {
  let chromium;
  try {
    ({ chromium } = await import('playwright'));
  } catch {
    console.warn('[prerender] playwright no disponible — se omite el prerender');
    return;
  }

  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    console.warn('[prerender] no se pudo lanzar chromium (¿falta `npx playwright install chromium`?) — se omite el prerender');
    console.warn(`[prerender] ${err.message.split('\n')[0]}`);
    return;
  }

  const server = await serveDist();
  try {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('#root :first-child', { timeout: 15000 });
      const html = await page.content();
      const outDir = route === '/' ? DIST : join(DIST, route.slice(1));
      await mkdir(outDir, { recursive: true });
      await writeFile(join(outDir, 'index.html'), '<!DOCTYPE html>\n' + html.replace(/^<!DOCTYPE html>/i, '').trim());
      console.log(`[prerender] ${route} → ${join(outDir, 'index.html').replace(DIST, 'dist')}`);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(err => {
  console.error('[prerender] error:', err);
  process.exitCode = 1;
});
