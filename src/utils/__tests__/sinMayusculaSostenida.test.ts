import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// Regla del sitio (octubre 2026, recomendación de accesibilidad): nada en MAYÚSCULA SOSTENIDA.
// Las mayúsculas sostenidas son más lentas de leer, sobre todo con dislexia o baja visión, y los lectores de pantalla
// pueden deletrearlas. Se escribe en capitalización normal: la primera letra de la frase, los nombres propios y las siglas.
// Esta prueba vigila el código; la compuerta de scripts/prerender.mjs vigila lo que de verdad se ve en cada página.
const SRC = join(__dirname, '..', '..');
const archivos = (dir: string): string[] =>
  readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) return f === '__tests__' ? [] : archivos(p);
    return /\.(css|tsx?|html)$/.test(f) ? [p] : [];
  });
const TODOS = archivos(SRC);

describe('sin mayúscula sostenida', () => {
  it('ninguna hoja de estilos ni componente fuerza mayúsculas con text-transform', () => {
    const malos = TODOS.filter((f) => /text-transform:\s*uppercase|textTransform:\s*['"]uppercase['"]|font-variant(-caps)?:\s*(all-)?small-caps/.test(readFileSync(f, 'utf8')));
    expect(malos.map((f) => f.replace(SRC, 'src'))).toEqual([]);
  });

  it('ningún componente pasa el texto completo a mayúsculas por código', () => {
    // .charAt(0).toUpperCase() (primera letra) está bien; toUpperCase() sobre toda una cadena no.
    const malos = TODOS.filter((f) => f.endsWith('.tsx')).filter((f) =>
      readFileSync(f, 'utf8').split('\n').some((l) => /\.toUpperCase\(\)/.test(l) && !/charAt\(0\)\.toUpperCase\(\)/.test(l)));
    expect(malos.map((f) => f.replace(SRC, 'src'))).toEqual([]);
  });

  it('la prueba detecta lo que debe detectar', () => {
    const mal = /text-transform:\s*uppercase/;
    expect(mal.test('.a { text-transform: uppercase; }')).toBe(true);
    expect(mal.test('.a { text-transform: none; }')).toBe(false);
  });
});
