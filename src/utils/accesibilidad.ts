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
}

export const STORAGE_KEY = 'ai4u-a11y';
export const TEXTOS: Texto[] = [100, 125, 150];
export const DEFAULTS: Prefs = { texto: 100, contraste: false, espaciado: false, fuente: false, movimiento: false };

const BOOLS = ['contraste', 'espaciado', 'fuente', 'movimiento'] as const;

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
});

export const apply = (p: Prefs, el: HTMLElement = document.documentElement) => {
  for (const [k, v] of Object.entries(attrsFor(p))) {
    if (v === null) el.removeAttribute(k);
    else el.setAttribute(k, v);
  }
};

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

/** Texto que se lee: lo seleccionado por la persona o, si no hay selección, el contenido principal de la página. */
export const textToRead = (): string => {
  const sel = window.getSelection?.()?.toString().trim();
  if (sel) return sel;
  const main = document.querySelector('main');
  return (main?.innerText ?? document.body.innerText).trim();
};
