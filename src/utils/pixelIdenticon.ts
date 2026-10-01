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
// Avatar del agente (octubre 2026): un robot de rostro amable, vestido de saco y corbata, como un abogado
// de alto nivel. Mismo hash que el código de la ficha (#0117): cara, número y color salen siempre del nombre.
// Cuadrícula de 15×21: cabeza (placa, antena, orejas, pantalla o visor, ojos, sonrisa, mejillas, detalle)
// y torso (saco, camisa en V, corbata o corbatín en el color del agente). Más de un millón de combinaciones.
// ---------------------------------------------------------------------------------------------

export const FACE_COLS = 15;
export const FACE_ROWS = 21;

/** Gama de la marca: la esfera de Refero (amarillo, rosa, cielo) más el naranja y el azul de Ai4U. */
export const AGENT_COLORS = ['#FACB0E', '#F06BA8', '#78BAE6', '#FF6E00', '#3DAED1'] as const;

/** Color de relleno: un hex, o 'color' para el color del agente. */
export type FaceFill = string;
export interface FaceRect { x: number; y: number; w: number; h: number; fill: FaceFill }
export interface AgentFace {
  color: string;
  rects: FaceRect[];
  seed: number;
}

const INK = '#1d1d1d';
const PAPER = '#ffffff';

interface Head { l: number; r: number; t: number; b: number; top: number[]; bot: number[]; ears: boolean }
const HEADS: Head[] = [
  { l: 1, r: 13, t: 3, b: 13, top: [2, 1], bot: [1, 2], ears: true },   // redondeada
  { l: 1, r: 13, t: 3, b: 13, top: [1], bot: [1], ears: true },         // biselada
  { l: 1, r: 13, t: 3, b: 13, top: [], bot: [], ears: true },           // cuadrada
  { l: 0, r: 14, t: 4, b: 13, top: [2, 1], bot: [1, 2], ears: false },  // ancha
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
  const ears = head.ears ? pick(rand, 4) : 0;
  const ant = pick(rand, 5);
  const style = pick(rand, 3);     // 0 placa, 1 pantalla, 2 visor
  const eyes = pick(rand, 7);
  const mouth = pick(rand, 6);
  const cheeks = pick(rand, 2);
  const detail = pick(rand, 4);
  const suit = pick(rand, 2);
  const neck = pick(rand, 4);      // corbata delgada, ancha, rayada o corbatín
  const pocket = pick(rand, 3);
  const pin = pick(rand, 2);

  const { l, r, t, b } = head;
  // cabeza: placa clara con esquinas redondeadas o rectas
  for (let y = t; y <= b; y++) {
    let k = 0;
    if (y - t < head.top.length) k = head.top[y - t];
    if (b - y < head.bot.length) k = Math.max(k, head.bot[b - y]);
    add(l + k, y, PAPER, r - l + 1 - 2 * k, 1);
  }
  // orejas modulares, a la altura de la pantalla
  if (ears) {
    let ey0 = t + 2, eh = 4, fill = INK;
    if (ears === 2) { ey0 = t + 3; eh = 2; }
    if (ears === 3) fill = PAPER;
    for (const x of [l - 1, r + 1]) add(x, ey0, fill, 1, eh);
  }
  // antena
  const cx = 7;
  if (ant === 1) { add(cx, t - 1, INK); add(cx - 1, t - 3, PAPER, 3, 2); }
  else if (ant === 2) { add(4, t - 1, INK); add(10, t - 1, INK); add(4, t - 2, PAPER); add(10, t - 2, PAPER); }
  else if (ant === 3) { add(cx, t - 1, INK); add(cx - 1, t - 2, PAPER, 3, 1); }
  else if (ant === 4) { add(cx - 1, t - 1, INK, 3, 1); add(cx, t - 2, INK); }
  // pantalla inset o visor de lado a lado: los ojos brillan con el color del agente
  let eyeFill: FaceFill = INK;
  const st = t + 1, sb = t + 5;
  if (style === 1) {
    for (let y = st; y <= sb; y++) {
      const k = (y === st || y === sb) ? 1 : 0;
      add(l + 1 + k, y, INK, (r - l - 1) + 1 - 2 * k, 1);
    }
    eyeFill = 'color';
  } else if (style === 2) {
    add(l, st + 1, INK, r - l + 1, sb - st - 1);
    eyeFill = 'color';
  }
  const hi = style ? PAPER : null;
  const ey = t + 2;
  const block = (c: number) => { add(c - 1, ey, eyeFill, 3, 3); if (hi) add(c - 1, ey, hi); };
  const plus = (c: number) => { add(c, ey, eyeFill, 1, 3); add(c - 1, ey + 1, eyeFill, 3, 1); };
  const arch = (c: number) => { add(c, ey, eyeFill); add(c - 1, ey + 1, eyeFill, 1, 2); add(c + 1, ey + 1, eyeFill, 1, 2); };
  if (eyes === 0) { block(5); block(9); }
  else if (eyes === 1) { plus(5); plus(9); }
  else if (eyes === 2) { arch(5); arch(9); }
  else if (eyes === 3) { add(5, ey, eyeFill, 1, 3); add(9, ey, eyeFill, 1, 3); }
  else if (eyes === 4) { add(4, ey + 1, eyeFill, 3, 1); add(8, ey + 1, eyeFill, 3, 1); }
  else if (eyes === 5) { arch(5); block(9); }
  else { add(4, ey, eyeFill, 7, 3); if (hi) { add(4, ey, hi); add(10, ey + 2, hi); } }
  // boca: debajo de la pantalla, sobre la placa, siempre amable
  const m0 = sb + 2;
  if (mouth === 0) { add(5, m0, INK); add(9, m0, INK); add(6, m0 + 1, INK, 3, 1); }
  else if (mouth === 1) { add(4, m0, INK); add(10, m0, INK); add(5, m0 + 1, INK, 5, 1); }
  else if (mouth === 2) { add(5, m0, INK, 5, 1); add(6, m0 + 1, INK, 3, 1); }
  else if (mouth === 3) { for (const x of [5, 7, 9]) add(x, m0, INK, 1, 2); }
  else if (mouth === 4) { add(5, m0 + 1, INK, 4, 1); add(9, m0, INK); }
  else add(6, m0, INK, 3, 2);
  if (cheeks) { add(2, m0, 'color', 2, 1); add(11, m0, 'color', 2, 1); }
  if (detail === 1) { add(l + 2, t, INK); add(r - 2, t, INK); }
  else if (detail === 2) add(cx, t, 'color');
  else if (detail === 3) add(6, b, INK, 3, 1);

  // torso: saco, camisa en V, solapas sutiles y corbata o corbatín en el color del agente
  const SUIT = suit === 0 ? INK : '#46463f';
  const LAPEL = suit === 0 ? '#4a4a46' : INK;
  add(6, 14, '#8c8b86', 3, 1);                      // cuello metálico
  add(2, 15, SUIT, 11, 1); add(1, 16, SUIT, 13, 1);
  for (let y = 17; y <= 20; y++) add(0, y, SUIT, 15, 1);
  const bow = neck === 3;
  const V: Record<number, [number, number]> = { 15: [5, 9], 16: [6, 8] };
  for (let y = 17; y <= 20; y++) V[y] = bow ? [6, 8] : [7, 7];
  for (const y of Object.keys(V).map(Number)) {
    const [x0, x1] = V[y];
    add(x0, y, PAPER, x1 - x0 + 1, 1);
    if (y <= 19) { add(x0 - 1, y, LAPEL); add(x1 + 1, y, LAPEL); }
  }
  if (neck === 0) add(7, 16, 'color', 1, 5);
  else if (neck === 1) { add(6, 16, 'color', 3, 1); add(6, 17, 'color', 3, 4); }
  else if (neck === 2) { add(6, 16, 'color', 3, 1); for (let y = 17; y <= 20; y++) add(6, y, y % 2 ? 'color' : INK, 3, 1); }
  else { add(5, 15, 'color', 2, 2); add(8, 15, 'color', 2, 2); add(7, 15, INK, 1, 2); add(7, 18, INK); add(7, 20, INK); }
  if (pocket === 1) add(10, 19, PAPER, 2, 1);      // pañuelo blanco
  else if (pocket === 2) add(10, 19, 'color', 2, 1); // pañuelo de color
  if (pin) add(3, 17, 'color');                    // pin en la solapa

  return { color, rects, seed };
}
