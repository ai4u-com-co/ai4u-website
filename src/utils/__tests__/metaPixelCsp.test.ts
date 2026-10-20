import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// El navegador aplica A LA VEZ la CSP del <meta> de index.html y la de la cabecera HTTP de
// vercel.json: gana la más estricta. Si falta un dominio de Meta en cualquiera de las dos,
// el píxel se bloquea en silencio. Ya pasó una vez (PR #46 solo corrigió el <meta>).
const root = resolve(__dirname, '../../..');

const directives = (csp: string) =>
  Object.fromEntries(
    csp
      .split(';')
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const [name, ...values] = p.split(/\s+/);
        return [name, values];
      })
  );

const metaTagCsp = () => {
  const html = readFileSync(resolve(root, 'index.html'), 'utf8');
  const m = html.match(/http-equiv="Content-Security-Policy"\s+content="([^"]+)"/);
  if (!m) throw new Error('index.html no tiene CSP en <meta>');
  return m[1];
};

const headerCsp = () => {
  const cfg = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf8'));
  const values: string[] = [];
  for (const rule of cfg.headers ?? []) {
    for (const h of rule.headers ?? []) {
      if (h.key.toLowerCase() === 'content-security-policy') values.push(h.value);
    }
  }
  if (!values.length) throw new Error('vercel.json no tiene cabecera Content-Security-Policy');
  return values;
};

describe('CSP permite el píxel de Meta', () => {
  const cases: [string, () => string[]][] = [
    ['<meta> de index.html', () => [metaTagCsp()]],
    ['cabecera HTTP de vercel.json', headerCsp],
  ];

  for (const [label, get] of cases) {
    it(`${label}: script-src y connect-src incluyen los dominios de Meta`, () => {
      for (const csp of get()) {
        const d = directives(csp);
        expect(d['script-src']).toContain('https://connect.facebook.net');
        expect(d['connect-src']).toContain('https://connect.facebook.net');
        expect(d['connect-src']).toContain('https://www.facebook.com');
        // el beacon /tr va como imagen: debe poder cargar de https
        expect(d['img-src']).toContain('https:');
      }
    });
  }
});
