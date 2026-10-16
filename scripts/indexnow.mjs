// Avisa a los buscadores que usan IndexNow (Bing, Yandex, Seznam, Naver...) de las URL del sitemap, para que
// rastreen los cambios sin esperar. Bing alimenta además a varios asistentes de IA con búsqueda.
//   node scripts/indexnow.mjs            -> envía las URL del sitemap en producción
//   node scripts/indexnow.mjs --dry      -> solo muestra qué enviaría
// La llave es el nombre del archivo public/<llave>.txt (32 caracteres hexadecimales) y debe estar ya desplegada.
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const HOST = 'www.ai4u.com.co';
const dry = process.argv.includes('--dry');

const keyFile = readdirSync(join(ROOT, 'public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) { console.error('No hay archivo de llave IndexNow en public/'); process.exit(1); }
const key = keyFile.replace('.txt', '');

const sitemap = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urlList.length === 0) { console.error('El sitemap en producción no tiene URL'); process.exit(1); }

// La llave debe ser pública y coincidir; si no, los buscadores rechazan el envío.
const served = (await (await fetch(`https://${HOST}/${keyFile}`)).text()).trim();
if (served !== key) { console.error(`La llave no está desplegada todavía en https://${HOST}/${keyFile}`); process.exit(1); }

console.log(`[indexnow] ${urlList.length} URL:\n  ${urlList.join('\n  ')}`);
if (dry) process.exit(0);
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key, keyLocation: `https://${HOST}/${keyFile}`, urlList }),
});
console.log(`[indexnow] respuesta ${r.status} ${r.statusText} (200/202 = aceptado)`);
process.exit(r.ok ? 0 : 1);
