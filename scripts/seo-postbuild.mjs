// Paso posterior al prerender: genera sitemap.xml y llms-full.txt desde el HTML ya renderizado y valida cada
// página para que los errores de SEO no lleguen a producción. Falla (exit 1) ante errores graves.
//   node scripts/prerender.mjs && node scripts/seo-postbuild.mjs
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { loadSeoPages } from './lib/seo-pages.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.ai4u.com.co';
const PAGES = await loadSeoPages(ROOT);

const urlOf = (path) => (path === '/' ? `${SITE}/` : `${SITE}${path}`);
const fileOf = (path) => join(DIST, path === '/' ? '' : path.slice(1), 'index.html');
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');

// ---------- 1. sitemap.xml ----------
// Archivos que, al cambiar, cambian el contenido de cada página (la fecha del sitemap es la del más reciente).
const SOURCES = {
  '/': ['src/pages/Home.tsx', 'src/data/agents.ts', 'src/data/cases.ts'],
  '/agentes': ['src/pages/Agentes.tsx', 'src/data/agents.ts', 'src/components/agentes'],
  '/agente-airbnb': ['src/pages/AgenteAirbnb.tsx', 'src/data/airbnb.ts'],
  '/dashboards': ['src/pages/Dashboards.tsx'],
  '/servicios': ['src/pages/Services.tsx'],
  '/sitios-web': ['src/pages/SitiosWeb.tsx', 'src/data/sitiosWeb.ts'],
  '/orderloader': ['src/pages/OrderLoader.tsx'],
  '/portafolio': ['src/pages/Portfolio.tsx', 'src/data/cases.ts'],
  '/por-que-ai4u': ['src/pages/WhyAI4U.tsx'],
  '/preguntas-frecuentes': ['src/pages/Faq.tsx', 'src/data/faq.ts'],
};
let shallow = true;
try { shallow = execSync('git rev-parse --is-shallow-repository', { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() !== 'false'; } catch { /* sin git */ }
// Fecha del último commit que tocó un archivo: git si hay historial completo; si no (Vercel clona con historial
// recortado), la API pública de GitHub. Si ninguna responde se omite lastmod: una fecha falsa es peor que ninguna.
const REPO = 'ai4u-com-co/ai4u-website';
const dateCache = new Map();
const fileDate = (file) => {
  if (!dateCache.has(file)) dateCache.set(file, fileDateUncached(file));
  return dateCache.get(file);
};
const fileDateUncached = async (file) => {
  if (!shallow) {
    try { return execSync(`git log -1 --format=%cI -- ${file}`, { cwd: ROOT, stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || null; } catch { return null; }
  }
  try {
    const headers = { 'User-Agent': 'ai4u-website-build', Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) };
    const r = await fetch(`https://api.github.com/repos/${REPO}/commits?path=${encodeURIComponent(file)}&sha=master&per_page=1`, { headers, signal: AbortSignal.timeout(6000) });
    if (!r.ok) return null;
    return (await r.json())[0]?.commit?.committer?.date || null;
  } catch { return null; }
};
const lastmod = async (path) => {
  const sources = SOURCES[path] || PAGES.find((p) => p.path === path)?.sources || [];
  const dates = (await Promise.all(sources.map(fileDate))).filter(Boolean);
  if (dates.length === 0 || dates.length < sources.length) return null; // si falta alguna fecha, mejor omitir
  return dates.sort().pop().slice(0, 10);
};
const mods = Object.fromEntries(await Promise.all(PAGES.filter((p) => p.sitemap).map(async (p) => [p.path, await lastmod(p.path)])));
const sitemap = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
  .concat(PAGES.filter((p) => p.sitemap).map((p) => {
    const lm = mods[p.path];
    return `  <url>\n    <loc>${urlOf(p.path)}</loc>${lm ? `\n    <lastmod>${lm}</lastmod>` : ''}\n  </url>`;
  }))
  .concat('</urlset>', '').join('\n');
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);

// ---------- 2. llms-full.txt (texto de cada página, tomado del HTML renderizado) ----------
const toText = (html) => {
  const main = (html.match(/<main[^>]*>([\s\S]*?)<\/main>/) || [])[1] || '';
  return decode(main
    .replace(/<(script|style|svg|noscript)[\s\S]*?<\/\1>/g, '')
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, '\n### $1\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, '\n#### $1\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, '\n##### $1\n')
    .replace(/<li[^>]*>/g, '\n- ')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/(p|div|section|article|figure|figcaption|tr|ul|ol|header|footer|a|button|span)>/g, (m) => (m === '</span>' || m === '</a>' ? ' ' : '\n'))
    .replace(/<[^>]+>/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/ *\n */g, '\n')
    .replace(/\n{3,}/g, '\n\n')).trim();
};
const errors = [];
const warnings = [];
const report = [];
let full = `# Ai4U: texto completo del sitio\n\n> Ai4U pone inteligencia artificial a trabajar en la operación de tu empresa. Este archivo reúne el texto de cada página pública de ${SITE}/ para que una persona o un asistente de IA lo lea de una vez. Generado automáticamente en cada despliegue.\n`;

// ---------- 3. validación por página ----------
const count = (re, s) => (s.match(re) || []).length;
for (const page of PAGES) {
  const f = fileOf(page.path);
  if (!existsSync(f)) { errors.push(`${page.path}: no existe el HTML prerenderizado (${f.replace(ROOT + '/', '')})`); continue; }
  const html = readFileSync(f, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const e = (msg) => errors.push(`${page.path}: ${msg}`);
  const url = urlOf(page.path);

  const titles = head.match(/<title[^>]*>([\s\S]*?)<\/title>/g) || [];
  if (titles.length !== 1) e(`hay ${titles.length} <title>`);
  else if (decode(titles[0].replace(/<[^>]+>/g, '')).trim() !== page.title) e(`el <title> no coincide con el registro: "${decode(titles[0].replace(/<[^>]+>/g, ''))}"`);

  const descs = head.match(/<meta[^>]+name="description"[^>]*>/g) || [];
  if (descs.length !== 1) e(`hay ${descs.length} meta description`);
  else if (decode((descs[0].match(/content="([^"]*)"/) || [])[1] || '') !== page.description) e('la meta description no coincide con el registro');

  const canon = head.match(/<link[^>]+rel="canonical"[^>]*>/g) || [];
  if (canon.length !== 1) e(`hay ${canon.length} canonical (debe haber 1)`);
  else if ((canon[0].match(/href="([^"]*)"/) || [])[1] !== url) e(`canonical incorrecta: ${(canon[0].match(/href="([^"]*)"/) || [])[1]} (esperada ${url})`);

  if (/localhost|127\.0\.0\.1/.test(head)) e('la cabecera contiene localhost');
  for (const [name, re] of [['og:title', /<meta[^>]+property="og:title"/g], ['og:description', /<meta[^>]+property="og:description"/g], ['og:image', /<meta[^>]+property="og:image"[^:]/g], ['og:url', /<meta[^>]+property="og:url"/g], ['twitter:card', /<meta[^>]+name="twitter:card"/g], ['robots', /<meta[^>]+name="robots"/g]]) {
    const n = count(re, head);
    if (n !== 1) e(`hay ${n} etiquetas ${name} (debe haber 1)`);
  }
  if (/name="robots"[^>]*noindex/.test(head)) e('la página está en noindex');
  if (count(/<link[^>]+hreflang=/g, head) < 2) e('faltan los hreflang');
  if (/<link[^>]+rel="stylesheet"[^>]+fonts\.googleapis\.com/.test(head.replace(/<noscript>[\s\S]*?<\/noscript>/g, ''))) e('las fuentes de Google están como hoja de estilos bloqueante (deben ir con preload)');

  const lds = [...head.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  if (lds.length === 0) e('no hay JSON-LD');
  lds.forEach((x) => {
    try {
      const j = JSON.parse(decode(x));
      const ids = (j['@graph'] || []).map((n) => n['@type']).flat();
      if (!ids.includes('Organization') || !(j['@graph'] || []).some((n) => n['@id'] === `${url}#webpage`)) e('el JSON-LD no trae Organization y la WebPage de la página');
    } catch { e('JSON-LD inválido'); }
  });

  const body = html.slice(html.indexOf('</head>'));
  const h1 = count(/<h1[\s>]/g, body);
  if (h1 !== 1) e(`hay ${h1} H1 (debe haber 1)`);
  const text = toText(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  if (words < 60) e(`solo ${words} palabras en el HTML (¿se prerenderizó?)`);
  if (page.description.length < 60 || page.description.length > 165) warnings.push(`${page.path}: la descripción mide ${page.description.length} caracteres`);
  if (page.title.length > 65) warnings.push(`${page.path}: el título mide ${page.title.length} caracteres`);

  // enlaces internos: deben llevar a una página registrada o a un archivo de dist
  const known = new Set(PAGES.map((p) => p.path));
  const redirects = new Set(['/tableros', '/tienda-ai', '/casos-de-uso', '/super-ai']);
  for (const m of body.matchAll(/<a\b[^>]*href="(\/[^"#?]*)/g)) {
    const h = m[1].replace(/\/$/, '') || '/';
    if (!known.has(h) && !redirects.has(h) && !existsSync(join(DIST, h))) warnings.push(`${page.path}: enlace interno a ${h}, que no existe`);
  }

  report.push({ ruta: page.path, palabras: words, h1, 'json-ld': lds.length, descripción: page.description.length });
  if (page.sitemap) full += `\n---\n\n## ${page.name}\n\nURL: ${url}\n\n${text}\n`;
}
writeFileSync(join(DIST, 'llms-full.txt'), full);

console.table(report);
console.log(`[seo] lastmod en ${Object.values(mods).filter(Boolean).length}/${Object.keys(mods).length} URL`);
console.log(`[seo] sitemap.xml: ${PAGES.filter((p) => p.sitemap).length} URL · llms-full.txt: ${(full.length / 1024).toFixed(0)} KB`);
warnings.forEach((w) => console.warn(`[seo] aviso: ${w}`));
if (errors.length) {
  console.error(`\n[seo] ${errors.length} ERROR(ES):`);
  errors.forEach((x) => console.error(`  ✗ ${x}`));
  process.exit(1);
}
console.log('[seo] validación OK');
