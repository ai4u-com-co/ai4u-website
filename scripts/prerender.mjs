// Prerender post-build: renderiza las rutas públicas de la SPA y vuelca el HTML
// a dist/<ruta>/index.html para que GitHub Pages sirva contenido real (SEO + primer render).
// Si Playwright no tiene navegador instalado, se salta con warning (el build no falla).
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const ROUTES = ['/', '/servicios', '/portafolio', '/por-que-ai4u', '/agentes', '/tableros', '/sitios-web', '/orderloader', '/politica-de-privacidad', '/condiciones-de-servicio', '/eliminacion-de-datos'];
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

// En Vercel no hay librerías del sistema para el Chromium de Playwright: se usa @sparticuz/chromium
// (build preparado para ese entorno). En CI de GitHub o en local se usa el de Playwright.
async function launchOptions() {
  if (!process.env.VERCEL) return {};
  const { default: sparticuz } = await import('@sparticuz/chromium');
  return { executablePath: await sparticuz.executablePath(), args: sparticuz.args, headless: true };
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
    browser = await chromium.launch(await launchOptions());
  } catch (err) {
    console.warn('[prerender] no se pudo lanzar chromium (¿falta `npx playwright install chromium`?) — se omite el prerender');
    console.warn(`[prerender] ${err.message.split('\n')[0]}`);
    return;
  }

  const server = await serveDist();
  try {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      // Una ruta que falle no debe tumbar el deploy: queda con el fallback SPA (404.html) y se avisa.
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
        await page.waitForSelector('#root :first-child', { timeout: 15000 });
        await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
        const html = await page.content();
        const outDir = route === '/' ? DIST : join(DIST, route.slice(1));
        await mkdir(outDir, { recursive: true });
        await writeFile(join(outDir, 'index.html'), '<!DOCTYPE html>\n' + html.replace(/^<!DOCTYPE html>/i, '').trim());
        console.log(`[prerender] ${route} → ${join(outDir, 'index.html').replace(DIST, 'dist')}`);
      } catch (err) {
        console.warn(`[prerender] ${route} falló, se omite: ${String(err.message).split('\n')[0]}`);
      }
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
