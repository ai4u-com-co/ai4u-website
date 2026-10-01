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

/** Código de 4 dígitos del agente (ej. "#0117") — mismo seed que su cara, solo reformateado para lucir como tag de ficha. */
export function formatAgentCode(seed: number): string {
  return `#${String(seed % 10000).padStart(4, '0')}`;
}

// ---------------------------------------------------------------------------------------------
// Rostro del agente (octubre 2026). Mismo hash que el código de la ficha (#0117), así que la cara,
// el número y el color de un agente salen siempre del mismo nombre. Cuadrícula de 11×11 con cabeza,
// orejas, adorno superior, cejas, ojos, nariz, boca y mejillas: ~60 mil combinaciones.
// ---------------------------------------------------------------------------------------------

/** Gama de la marca: la esfera de Refero (amarillo, rosa, cielo) más el naranja y el azul de Ai4U. */
export const AGENT_COLORS = ['#FACB0E', '#F06BA8', '#78BAE6', '#FF6E00', '#3DAED1'] as const;

export type FaceFill = 'paper' | 'ink' | 'color';
export interface FaceRect { x: number; y: number; w: number; h: number; fill: FaceFill }
export interface AgentFace {
  color: string;
  rects: FaceRect[];
  seed: number;
}

interface Head { l: number; r: number; t: number; b: number; cut: boolean; ears: boolean }
const HEADS: Head[] = [
  { l: 1, r: 9, t: 2, b: 9, cut: false, ears: true },   // cuadrada
  { l: 1, r: 9, t: 2, b: 9, cut: true, ears: true },    // redonda
  { l: 0, r: 10, t: 3, b: 10, cut: true, ears: false }, // ancha
  { l: 2, r: 8, t: 1, b: 10, cut: true, ears: true },   // alta
];

const pick = (rand: () => number, n: number) => Math.floor(rand() * n);

export function generateAgentFace(name: string): AgentFace {
  const seed = hashString(name.trim().toLowerCase());
  const rand = mulberry32(seed);
  const color = AGENT_COLORS[seed % AGENT_COLORS.length];
  const rects: FaceRect[] = [];
  const add = (x: number, y: number, fill: FaceFill, w = 1, h = 1) => rects.push({ x, y, w, h, fill });

  // El orden de los sorteos no se toca: cambiarlo cambia la cara de todos los agentes.
  const head = HEADS[pick(rand, HEADS.length)];
  const ears = head.ears ? pick(rand, 3) : 0;
  const top = pick(rand, 5);
  const brows = pick(rand, 3);
  const eyes = pick(rand, 7);
  const nose = pick(rand, 4);
  const mouth = pick(rand, 6);
  const cheeks = pick(rand, 2);

  const my = head.b - 1;
  const ny = my - 2;
  const ey = ny - 2;

  // cabeza
  for (let y = head.t; y <= head.b; y++) {
    const edge = head.cut && (y === head.t || y === head.b);
    add(edge ? head.l + 1 : head.l, y, 'paper', (edge ? head.r - 1 : head.r) - (edge ? head.l + 1 : head.l) + 1, 1);
  }
  // orejas: de papel, o tuercas de robot en tinta
  if (ears > 0) {
    const fill: FaceFill = ears === 1 ? 'paper' : 'ink';
    add(head.l - 1, ey + 1, fill, 1, 2);
    add(head.r + 1, ey + 1, fill, 1, 2);
  }
  // adorno superior, siempre en tinta
  const ty = head.t - 1;
  if (top === 1) { add(5, ty, 'ink'); if (ty >= 1) add(5, ty - 1, 'ink'); }          // antena
  else if (top === 2) add(4, ty, 'ink', 3, 1);                                      // mechón
  else if (top === 3) { add(3, ty, 'ink'); add(5, ty, 'ink'); add(7, ty, 'ink'); }  // cresta
  else if (top === 4) add(head.l + 1, ty, 'ink', head.r - head.l - 1, 1);           // pelo
  // cejas
  if (brows === 1) { add(2, ey - 1, 'ink', 2, 1); add(7, ey - 1, 'ink', 2, 1); }    // rectas
  else if (brows === 2) add(7, ey - 2, 'ink', 2, 1);                                // una ceja levantada
  // ojos
  if (eyes === 0) { add(3, ey, 'ink'); add(7, ey, 'ink'); }
  else if (eyes === 1) { add(3, ey, 'ink', 1, 2); add(7, ey, 'ink', 1, 2); }
  else if (eyes === 2) { add(2, ey, 'ink', 2, 1); add(7, ey, 'ink', 2, 1); }
  else if (eyes === 3) { add(2, ey, 'ink', 2, 2); add(7, ey, 'ink', 2, 2); add(2, ey, 'paper'); add(7, ey, 'paper'); }
  else if (eyes === 4) { add(2, ey, 'ink', 7, 1); add(3, ey, 'color'); add(7, ey, 'color'); } // visor con ojos de color
  else if (eyes === 5) { add(3, ey, 'ink'); add(7, ey, 'ink'); add(5, ey - 1, 'ink'); }      // tres ojos
  else { add(4, ey, 'ink', 3, 2); add(4, ey, 'paper'); }                                    // cíclope
  // nariz
  if (nose === 0) add(5, ny, 'ink');
  else if (nose === 1) { add(4, ny, 'ink'); add(6, ny, 'ink'); }
  else if (nose === 2) add(5, ny, 'ink', 2, 1);
  else add(4, ny, 'ink', 3, 1);
  // boca
  if (mouth === 0) add(3, my, 'ink', 5, 1);
  else if (mouth === 1) { add(3, my, 'ink'); add(7, my, 'ink'); add(4, my + 1, 'ink', 3, 1); } // sonrisa
  else if (mouth === 2) { add(3, my, 'ink'); add(5, my, 'ink'); add(7, my, 'ink'); }          // rejilla
  else if (mouth === 3) add(4, my, 'ink', 3, 2);                                             // abierta
  else if (mouth === 4) add(4, my, 'ink', 3, 1);                                             // corta
  else { add(3, my, 'ink', 3, 1); add(6, my - 1, 'ink'); }                                    // sonrisa chueca
  // mejillas: el color del agente dentro de su propia cara
  if (cheeks === 1) { add(2, ny, 'color'); add(8, ny, 'color'); }

  return { color, rects, seed };
}
