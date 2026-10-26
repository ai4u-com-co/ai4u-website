// Prerender post-build: renderiza las rutas públicas de la SPA y vuelca el HTML
// a dist/<ruta>/index.html para que GitHub Pages sirva contenido real (SEO + primer render).
// Si Playwright no tiene navegador instalado, se salta con warning (el build no falla).
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile, access } from 'node:fs/promises';
import { loadSeoPages } from './lib/seo-pages.mjs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
// Una sola lista de páginas para el prerender, el sitemap y las validaciones: src/data/seoPages.json
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROUTES = (await loadSeoPages(ROOT)).map((p) => p.path);
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

// Gate de accesibilidad: en la misma pasada se corre axe-core (WCAG 2.0/2.1/2.2 A y AA) sobre cada ruta.
// Cualquier violación tumba el build, igual que la validación de SEO: una barrera nueva no llega a producción.
const AXE_SRC = await readFile(join(ROOT, 'node_modules/axe-core/axe.min.js'), 'utf8');
const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
async function auditA11y(page, route) {
  await page.addScriptTag({ content: AXE_SRC });
  const r = await page.evaluate(tags => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }), AXE_TAGS);
  return r.violations.map(v => ({ route, id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.length, ejemplo: v.nodes[0]?.html.slice(0, 120) }));
}

// Compuerta de mayúscula sostenida (recomendación de accesibilidad, octubre 2026): en lo que de verdad se ve no puede haber
// texto forzado a mayúsculas con CSS ni frases escritas en MAYÚSCULAS. Las siglas sueltas (API, NIT, QR…) están permitidas.
const SIGLAS = ['API', 'NIT', 'PDF', 'QR', 'URL', 'HTML', 'WCAG', 'UNE', 'CRM', 'ERP', 'PQRS', 'FAQ', 'CTP', 'SIRE', 'TRA', 'RNT', 'IVA', 'DIAN', 'LSC', 'NTC', 'EAA', 'ADR', 'ROI', 'SAP', 'HORECA', 'MINTIC', 'COP', 'USD', 'EUR', 'NVDA', 'JAWS', 'TTS'];
async function auditMayusculas(page, route) {
  return page.evaluate((siglas) => {
    const out = [];
    const visible = (el) => { const s = getComputedStyle(el); return s.display !== 'none' && s.visibility !== 'hidden' && el.getClientRects().length > 0; };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const vistos = new Set();
    while (walker.nextNode()) {
      const n = walker.currentNode; const el = n.parentElement;
      if (!el || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(el.tagName) || !visible(el)) continue;
      const txt = n.textContent.replace(/\s+/g, ' ').trim(); if (txt.length < 3) continue;
      if (getComputedStyle(el).textTransform === 'uppercase') { const k = 'css:' + el.className; if (!vistos.has(k)) { vistos.add(k); out.push({ tipo: 'text-transform', ejemplo: txt.slice(0, 50), clase: String(el.className).slice(0, 40) }); } continue; }
      // dos o más palabras seguidas (3+ letras) escritas solo en mayúsculas, salvo siglas permitidas
      const palabras = txt.split(/\s+/).map((w) => w.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü]/g, ''));
      let racha = 0, maxRacha = 0;
      for (const w of palabras) { const caps = w.length >= 3 && w === w.toUpperCase() && w !== w.toLowerCase() && !siglas.includes(w); racha = caps ? racha + 1 : 0; maxRacha = Math.max(maxRacha, racha); }
      if (maxRacha >= 2) out.push({ tipo: 'texto en mayúsculas', ejemplo: txt.slice(0, 60), clase: String(el.className).slice(0, 40) });
    }
    return out;
  }, SIGLAS);
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
  const violaciones = [];
  try {
    const page = await browser.newPage();
    for (const route of ROUTES) {
      // Una ruta que falle no debe tumbar el deploy: queda con el fallback SPA (404.html) y se avisa.
      try {
        await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'load' });
        await page.waitForSelector('#root :first-child', { timeout: 15000 });
        await page.waitForLoadState('networkidle', { timeout: 8000 }).catch(() => {});
        violaciones.push(...await auditA11y(page, route));
        for (const m of await auditMayusculas(page, route)) violaciones.push({ route, id: 'mayuscula-sostenida', impact: 'regla-de-la-casa', help: `${m.tipo}: «${m.ejemplo}» (${m.clase})`, nodes: 1, ejemplo: m.ejemplo });
        let html = await page.content();
        // El <link rel="preload" onload=...> de las fuentes de Google ya se convirtió en stylesheet al renderizar:
        // se deja como estaba para que el HTML servido no tenga CSS bloqueante de terceros.
        html = html.replace(/<link rel="stylesheet" as="style" href="(https:\/\/fonts\.googleapis\.com\/css2[^"]*)" onload="[^"]*">/, (_m, href) => `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">`);
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
  if (violaciones.length) {
    console.error(`[a11y] ${violaciones.length} violación(es) WCAG A/AA — el build no pasa:`);
    console.table(violaciones.map(v => ({ ruta: v.route, regla: v.id, impacto: v.impact, nodos: v.nodes, ejemplo: v.ejemplo })));
    for (const v of violaciones) console.error(`  ${v.route} · ${v.id}: ${v.help}`);
    process.exit(1);
  }
  console.log(`[a11y] 0 violaciones WCAG A/AA en ${ROUTES.length} rutas (axe-core)`);
}

main().catch(err => {
  console.error('[prerender] error:', err);
  process.exitCode = 1;
});
