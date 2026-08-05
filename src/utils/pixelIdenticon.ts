import { AI4U_PALETTE } from '../components/shared/ui/tokens/palette';

/**
 * Cara robot/humana de píxeles, determinística por nombre — sin librerías
 * externas, sin estado, sin red. El mismo nombre siempre produce la misma
 * cara: ojos, nariz y boca compuestos a partir de su hash, no ruido suelto.
 * Es la "numeración interna" del agente hecha visible y con personalidad.
 */

// 9x9: suficiente resolución para que ojos/nariz/boca se lean como cara.
const GRID_SIZE = 9;
const CENTER = 4;

// Filas fijas por rasgo — una cara compuesta, no una grilla aleatoria.
const EYE_ROWS = [2, 3] as const;
const NOSE_ROW = 5;
const MOUTH_ROW = 7;

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

/** PRNG mulberry32, sembrado por el hash — de un solo número determinístico saca toda la secuencia de bits de la cara. */
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

function emptyGrid(): boolean[][] {
  return Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => false));
}

/** Marca una celda y su espejo horizontal (respecto a CENTER) a la vez. */
function setMirrored(grid: boolean[][], row: number, col: number): void {
  grid[row][col] = true;
  grid[row][CENTER + (CENTER - col)] = true;
}

function drawEyes(grid: boolean[][], rand: () => number): void {
  const roll = rand();
  if (roll < 0.12) {
    // Cíclope — un solo visor ancho centrado.
    for (const row of EYE_ROWS) {
      setMirrored(grid, row, 3);
      grid[row][CENTER] = true;
    }
  } else if (roll < 0.85) {
    // Dos ojos — el caso más humano/robot estándar.
    for (const row of EYE_ROWS) setMirrored(grid, row, 1);
  } else {
    // Tres ojos — laterales de dos filas + uno central chico de una fila.
    for (const row of EYE_ROWS) setMirrored(grid, row, 1);
    grid[EYE_ROWS[0]][CENTER] = true;
  }
}

function drawNose(grid: boolean[][], rand: () => number): void {
  if (rand() < 0.75) {
    // Nariz única, centrada.
    grid[NOSE_ROW][CENTER] = true;
  } else {
    // Dos rejillas de ventilación — nariz de robot.
    setMirrored(grid, NOSE_ROW, 3);
  }
}

function drawMouth(grid: boolean[][], rand: () => number): void {
  if (rand() < 0.5) {
    // Boca barra sólida.
    setMirrored(grid, MOUTH_ROW, 2);
    setMirrored(grid, MOUTH_ROW, 3);
    grid[MOUTH_ROW][CENTER] = true;
  } else {
    // Boca rejilla — varios segmentos, como dientes o bocina de robot.
    setMirrored(grid, MOUTH_ROW, 1);
    setMirrored(grid, MOUTH_ROW, 3);
  }
}

export function generateAgentIdenticon(name: string): PixelIdenticon {
  const seed = hashString(name.trim().toLowerCase());
  const rand = mulberry32(seed);

  const grid = emptyGrid();
  drawEyes(grid, rand);
  drawNose(grid, rand);
  drawMouth(grid, rand);

  const color = ACCENT_COLORS[seed % ACCENT_COLORS.length];
  return { grid, color, seed };
}
