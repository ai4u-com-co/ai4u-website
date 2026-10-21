import { useSyncExternalStore } from 'react';
// Preferencias de lectura (panel de accesibilidad). Se guardan en el navegador de la persona, sin cookies ni
// terceros, y se aplican como atributos data-a11y-* en <html> para que el CSS haga el resto (styles/accesibilidad.css).
// index.html las aplica antes de pintar (script inline) para que no haya parpadeo al recargar.

export type Texto = 100 | 125 | 150;

export interface Prefs {
  /** Tamaño de todo el sitio, en porcentaje. */
  texto: Texto;
  /** Tinta negra sobre blanco y enlaces subrayados. */
  contraste: boolean;
  /** Interlineado y espacio entre letras, palabras y párrafos (WCAG 1.4.12). */
  espaciado: boolean;
  /** Fuente del sistema, sin ornamentos. */
  fuente: boolean;
  /** Sin animaciones ni transiciones. */
  movimiento: boolean;
  /** Versión en lectura fácil de la página (cuando existe). */
  facil: boolean;
}

export const STORAGE_KEY = 'ai4u-a11y';
export const TEXTOS: Texto[] = [100, 125, 150];
export const DEFAULTS: Prefs = { texto: 100, contraste: false, espaciado: false, fuente: false, movimiento: false, facil: false };

const BOOLS = ['contraste', 'espaciado', 'fuente', 'movimiento', 'facil'] as const;

/** Convierte lo que haya guardado (o cualquier cosa) en preferencias válidas. */
export const normalize = (raw: unknown): Prefs => {
  const o = (raw && typeof raw === 'object' ? raw : {}) as Record<string, unknown>;
  const texto = TEXTOS.includes(o.texto as Texto) ? (o.texto as Texto) : DEFAULTS.texto;
  const out: Prefs = { ...DEFAULTS, texto };
  for (const k of BOOLS) out[k] = o[k] === true;
  return out;
};

export const isDefault = (p: Prefs) => p.texto === DEFAULTS.texto && BOOLS.every(k => !p[k]);

export const load = (): Prefs => {
  try {
    return normalize(JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? 'null'));
  } catch {
    return { ...DEFAULTS };
  }
};

export const save = (p: Prefs) => {
  try {
    if (isDefault(p)) window.localStorage.removeItem(STORAGE_KEY);
    else window.localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    /* modo privado o almacenamiento bloqueado: la preferencia vale solo para esta visita */
  }
};

/** Atributos que van en <html> para unas preferencias dadas (lo mismo que hace el script de index.html). */
export const attrsFor = (p: Prefs): Record<string, string | null> => ({
  'data-a11y-texto': p.texto === 100 ? null : String(p.texto),
  'data-a11y-contraste': p.contraste ? '' : null,
  'data-a11y-espaciado': p.espaciado ? '' : null,
  'data-a11y-fuente': p.fuente ? '' : null,
  'data-a11y-movimiento': p.movimiento ? '' : null,
  'data-a11y-facil': p.facil ? '' : null,
});

export const apply = (p: Prefs, el: HTMLElement = document.documentElement) => {
  for (const [k, v] of Object.entries(attrsFor(p))) {
    if (v === null) el.removeAttribute(k);
    else el.setAttribute(k, v);
  }
};

// ---- Estado compartido: el panel cambia las preferencias y Layout (lectura fácil) las lee ----

let current: Prefs | null = null;
const listeners = new Set<() => void>();
export const getPrefs = (): Prefs => current ?? (current = typeof window === 'undefined' ? { ...DEFAULTS } : load());
export const setPrefs = (p: Prefs) => { current = p; apply(p); save(p); listeners.forEach(l => l()); };
export const subscribe = (l: () => void) => { listeners.add(l); return () => { listeners.delete(l); }; };
export const usePrefs = () => useSyncExternalStore(subscribe, getPrefs, () => DEFAULTS);

// ---- Leer en voz alta (API nativa del navegador; sin servicio externo) ----

/** Parte un texto largo en frases: Chrome corta las locuciones de más de ~15 s si van en una sola. */
export const splitSentences = (text: string, max = 220): string[] => {
  const clean = text.replace(/\s+/g, ' ').trim();
  if (!clean) return [];
  const out: string[] = [];
  for (const s of clean.split(/(?<=[.!?…:;])\s+/)) {
    if (s.length <= max) { out.push(s); continue; }
    let rest = s;
    while (rest.length > max) {
      const cut = rest.lastIndexOf(' ', max);
      out.push(rest.slice(0, cut > 40 ? cut : max));
      rest = rest.slice(cut > 40 ? cut + 1 : max);
    }
    if (rest) out.push(rest);
  }
  return out;
};

/** La mejor voz en español disponible: primero es-CO, luego cualquier variante latinoamericana, luego es-*. */
export const pickVoice = (voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
  const es = voices.filter(v => /^es([-_]|$)/i.test(v.lang));
  const by = (re: RegExp) => es.find(v => re.test(v.lang));
  return by(/CO/i) ?? by(/419|MX|AR|CL|PE|US/i) ?? es[0];
};

export interface Bloque { el: HTMLElement | null; text: string }

const BLOQUES = 'h1, h2, h3, h4, p, li, dt, dd, figcaption, blockquote';
const esVisible = (el: HTMLElement) => el.offsetParent !== null || getComputedStyle(el).position === 'fixed';

/** Qué se lee y en qué orden: lo seleccionado por la persona (un solo bloque, sin resaltar) o, si no hay selección,
 *  los bloques de texto del contenido principal, uno por uno, para poder resaltar el que suena. */
export const readingBlocks = (): Bloque[] => {
  const sel = window.getSelection?.()?.toString().trim();
  if (sel) return [{ el: null, text: sel }];
  const main = document.querySelector('main') ?? document.body;
  const out: Bloque[] = [];
  for (const el of Array.from(main.querySelectorAll<HTMLElement>(BLOQUES))) {
    // Un <li> o <dd> que contiene a su vez párrafos ya se lee por sus hijos.
    if (el.querySelector(BLOQUES)) continue;
    if (el.closest('dialog, [aria-hidden="true"], .a4-sr-only, .a4-a11y-bar')) continue;
    if (!esVisible(el)) continue;
    const text = (el.innerText ?? el.textContent ?? '').replace(/\s+/g, ' ').trim();
    if (text.length < 2) continue;
    out.push({ el, text });
  }
  return out;
};

/** Compatibilidad: todo el texto junto. */
export const textToRead = (): string => readingBlocks().map(b => b.text).join(' ');
