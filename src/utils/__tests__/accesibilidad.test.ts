import { describe, it, expect } from 'vitest';
import { normalize, isDefault, attrsFor, splitSentences, pickVoice, DEFAULTS } from '../accesibilidad';
import { LECTURA_FACIL, lecturaFacilDe } from '../../data/lecturaFacil';
import { SEO_PAGES } from '../../utils/jsonld';

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

describe('lectura fácil', () => {
  it('cubre las páginas de la oferta y cada una está en el registro SEO', () => {
    ['/', '/agentes', '/agente-airbnb', '/dashboards', '/servicios', '/sitios-web', '/portafolio', '/por-que-ai4u', '/preguntas-frecuentes', '/accesibilidad']
      .forEach(p => expect(lecturaFacilDe(p)).toBeDefined());
    Object.keys(LECTURA_FACIL).forEach(p => expect(SEO_PAGES.map(x => x.path)).toContain(p));
    expect(lecturaFacilDe('/agentes/')).toBeDefined();
    expect(lecturaFacilDe('/no-existe')).toBeUndefined();
  });

  it('frases cortas, sin SAP, porcentajes ni precios', () => {
    Object.entries(LECTURA_FACIL).forEach(([path, v]) => {
      expect(v.parrafos.length).toBeGreaterThanOrEqual(4);
      expect(v.acciones.length).toBeGreaterThanOrEqual(2);
      const frases = v.parrafos.flatMap(p => p.texto.split(/(?<=[.!?])\s+/));
      const promedio = frases.reduce((n, f) => n + f.split(/\s+/).length, 0) / frases.length;
      expect(promedio, path).toBeLessThanOrEqual(14);
      expect(JSON.stringify(v), path).not.toMatch(/\bSAP\b|\d+ ?%|\$ ?\d/);
    });
  });

  it('las preferencias incluyen la lectura fácil', () => {
    expect(attrsFor({ ...DEFAULTS, facil: true })['data-a11y-facil']).toBe('');
    expect(normalize({ facil: true }).facil).toBe(true);
  });
});
