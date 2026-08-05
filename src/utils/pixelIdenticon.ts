import { AI4U_PALETTE } from '../components/shared/ui/tokens/palette';

/**
 * Identicon de bloques, determinístico por nombre — sin librerías externas,
 * sin estado, sin red. El mismo nombre siempre produce el mismo patrón y el
 * mismo color: es la "numeración interna" del agente hecha visible.
 */

const GRID_SIZE = 5;
// Cuántas columnas se generan antes de espejar (5 = 3 generadas + 2 espejo).
const GENERATED_COLS = 3;
// Umbral de relleno: más alto = patrones más despejados (menos "ruido").
const FILL_THRESHOLD = 0.58;

const ACCENT_COLORS = [
  AI4U_PALETTE.accentColors.orange,
  AI4U_PALETTE.accentColors.mint,
  AI4U_PALETTE.accentColors.blue,
  AI4U_PALETTE.accentColors.cadetGray,
] as const;

/** Hash de 32 bits determinístico (variante djb2) — mismo texto, mismo número siempre. */
function hashString(text: string): number {
  let hash = 5381;
  for (let i = 0; i < text.length; i++) {
    hash = (hash * 33) ^ text.charCodeAt(i);
  }
  return hash >>> 0;
}

/** PRNG mulberry32, sembrado por el hash — de un solo número determinístico saca toda la secuencia de bits del patrón. */
function mulberry32(seed: number): () => number {
  let state = seed;
  return function next(): number {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface PixelIdenticon {
  /** Grilla GRID_SIZE x GRID_SIZE, ya espejada horizontalmente. */
  grid: boolean[][];
  color: string;
  /** Número entero determinístico — la "numeración interna" visible del agente. */
  seed: number;
}

export function generateAgentIdenticon(name: string): PixelIdenticon {
  const seed = hashString(name.trim().toLowerCase());
  const rand = mulberry32(seed);

  const grid: boolean[][] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    const left = Array.from({ length: GENERATED_COLS }, () => rand() > FILL_THRESHOLD);
    const mirrored = [...left];
    for (let c = GENERATED_COLS - 2; c >= 0; c--) mirrored.push(left[c]);
    grid.push(mirrored);
  }

  const color = ACCENT_COLORS[seed % ACCENT_COLORS.length];
  return { grid, color, seed };
}
