import { describe, it, expect } from 'vitest';
import { normalize, isDefault, attrsFor, splitSentences, pickVoice, DEFAULTS } from '../accesibilidad';

// Panel de accesibilidad (octubre 2026): preferencias válidas pase lo que pase en localStorage, y lectura por frases.
describe('preferencias de lectura', () => {
  it('normaliza basura a valores válidos', () => {
    expect(normalize(null)).toEqual(DEFAULTS);
    expect(normalize({ texto: 999, contraste: 'sí', fuente: true })).toEqual({ ...DEFAULTS, fuente: true });
    expect(normalize({ texto: 150 }).texto).toBe(150);
  });

  it('solo pone en <html> los atributos de lo activado', () => {
    expect(Object.values(attrsFor(DEFAULTS)).every(v => v === null)).toBe(true);
    const a = attrsFor({ ...DEFAULTS, texto: 125, movimiento: true });
    expect(a['data-a11y-texto']).toBe('125');
    expect(a['data-a11y-movimiento']).toBe('');
    expect(a['data-a11y-contraste']).toBeNull();
  });

  it('sabe cuándo no hay nada que guardar', () => {
    expect(isDefault(DEFAULTS)).toBe(true);
    expect(isDefault({ ...DEFAULTS, espaciado: true })).toBe(false);
  });
});

describe('leer en voz alta', () => {
  it('parte por frases y nunca deja un trozo demasiado largo', () => {
    const frases = splitSentences('Hola. Esto es una prueba: ¿funciona? Sí.  ' + 'palabra '.repeat(80));
    expect(frases.slice(0, 3)).toEqual(['Hola.', 'Esto es una prueba:', '¿funciona?']);
    frases.forEach(f => expect(f.length).toBeLessThanOrEqual(220));
    expect(splitSentences('   ')).toEqual([]);
  });

  it('prefiere la voz es-CO, luego latinoamericana, luego cualquier español', () => {
    const v = (lang: string, name = lang) => ({ lang, name } as SpeechSynthesisVoice);
    expect(pickVoice([v('en-US'), v('es-ES'), v('es-MX'), v('es-CO')])?.lang).toBe('es-CO');
    expect(pickVoice([v('en-US'), v('es-ES'), v('es-MX')])?.lang).toBe('es-MX');
    expect(pickVoice([v('en-US'), v('es-ES')])?.lang).toBe('es-ES');
    expect(pickVoice([v('en-US')])).toBeUndefined();
  });
});
