#!/usr/bin/env node
// Genera la versión en lectura fácil de cada página pública con Claude, a partir del texto real del sitio
// (dist/llms-full.txt, que produce seo-postbuild). Se corre A MANO, en local, y el resultado se commitea en
// src/data/lecturaFacil.json para que una persona lo revise antes de publicarlo. En el build de Vercel no se
// llama a ningún modelo (repo público, sin llaves). Uso:
//   npm run build && node scripts/prerender.mjs && node scripts/seo-postbuild.mjs && node scripts/lectura-facil.mjs [/ruta ...]
import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'src/data/lecturaFacil.json');
const SITE = 'https://www.ai4u.com.co';
// Páginas con versión fácil: las de la oferta y las de ayuda. Las 33 fichas de agentes y las legales quedan fuera por ahora.
const PAGINAS = ['/', '/agentes', '/agente-airbnb', '/dashboards', '/servicios', '/sitios-web', '/orderloader', '/portafolio', '/por-que-ai4u', '/preguntas-frecuentes', '/accesibilidad'];

const PROMPT = (titulo, url, texto) => `Eres especialista en lectura fácil (norma UNE 153101 y pautas de lenguaje claro de Colombia). Reescribe el contenido de una página web para personas con dificultades de comprensión lectora, discapacidad intelectual, poca escolaridad o que leen español como segunda lengua.

Reglas obligatorias:
- Frases de máximo 15 palabras. Una idea por frase. Voz activa. Presente.
- Vocabulario cotidiano. Si una palabra técnica es inevitable (por ejemplo "agente de inteligencia artificial"), explícala la primera vez con palabras simples.
- Sin metáforas, ironía, siglas sin explicar, ni dobles sentidos.
- Trata a la persona de "tú". Tono cercano y respetuoso, nunca infantil.
- Di solo lo que dice el texto original. No inventes cifras, precios, nombres ni promesas. Si el texto no da un dato, no lo pongas.
- No menciones SAP ni sistemas internos. No pongas porcentajes ni cifras de resultados.
- Entre 5 y 9 párrafos cortos (1 a 3 frases cada uno). Cada párrafo puede llevar un título corto opcional.
- Termina con 2 o 3 acciones concretas que la persona puede hacer en esta página (por ejemplo "Escríbenos por WhatsApp").

Página: "${titulo}" (${url})

Texto original:
"""
${texto}
"""

Responde SOLO con JSON válido, sin comentarios ni texto fuera del JSON, con esta forma exacta:
{"titulo":"título simple de la página (máx. 6 palabras)","resumen":"una frase que dice de qué trata la página","parrafos":[{"titulo":"opcional, máx. 5 palabras o cadena vacía","texto":"1 a 3 frases cortas"}],"acciones":["acción 1","acción 2"]}`;

const secciones = (txt) => {
  const map = {};
  const partes = txt.split(/^## /m).slice(1);
  for (const p of partes) {
    const [titulo, ...resto] = p.split('\n');
    const cuerpo = resto.join('\n');
    const url = (cuerpo.match(/^URL: (\S+)/m) || [])[1];
    if (!url) continue;
    const path = url.replace(SITE, '') || '/';
    map[path] = { titulo: titulo.trim(), texto: cuerpo.replace(/^URL: .*\n/m, '').replace(/\n{3,}/g, '\n\n').trim() };
  }
  return map;
};

const pedir = (prompt) => {
  const out = execFileSync('claude', ['-p', '--output-format', 'text', '--model', 'claude-sonnet-5-5'], { input: prompt, encoding: 'utf8', maxBuffer: 1 << 20 });
  const json = out.slice(out.indexOf('{'), out.lastIndexOf('}') + 1);
  return JSON.parse(json);
};

const valida = (v, path) => {
  if (!v.titulo || !v.resumen || !Array.isArray(v.parrafos) || v.parrafos.length < 4 || !Array.isArray(v.acciones)) throw new Error(`${path}: forma inválida`);
  const frases = v.parrafos.flatMap(p => p.texto.split(/(?<=[.!?])\s+/));
  const largas = frases.filter(f => f.split(/\s+/).length > 18);
  if (largas.length) console.warn(`[lectura-facil] ${path}: ${largas.length} frase(s) de más de 18 palabras → revisar: "${largas[0].slice(0, 70)}…"`);
  const todo = JSON.stringify(v);
  if (/\bSAP\b|\d+ ?%|\$ ?\d/.test(todo)) throw new Error(`${path}: contiene SAP, porcentajes o precios`);
};

const main = async () => {
  const texto = await readFile(join(ROOT, 'dist/llms-full.txt'), 'utf8').catch(() => { throw new Error('Falta dist/llms-full.txt: corre build + prerender + seo-postbuild primero'); });
  const secs = secciones(texto);
  let actual = {};
  try { actual = JSON.parse(await readFile(OUT, 'utf8')); } catch { /* primera vez */ }
  const pedidas = process.argv.slice(2).length ? process.argv.slice(2) : PAGINAS;
  for (const path of pedidas) {
    const s = secs[path];
    if (!s) { console.warn(`[lectura-facil] ${path}: no está en llms-full.txt, se omite`); continue; }
    process.stdout.write(`[lectura-facil] ${path} … `);
    const v = pedir(PROMPT(s.titulo, SITE + (path === '/' ? '/' : path), s.texto));
    valida(v, path);
    actual[path] = { ...v, generado: new Date().toISOString().slice(0, 10), revisado: false };
    console.log(`${v.parrafos.length} párrafos`);
  }
  await writeFile(OUT, JSON.stringify(actual, null, 2) + '\n');
  console.log(`[lectura-facil] escrito ${OUT.replace(ROOT + '/', '')} (${Object.keys(actual).length} páginas). Revisar a mano y poner "revisado": true.`);
};

main().catch(err => { console.error('[lectura-facil]', err.message); process.exit(1); });
