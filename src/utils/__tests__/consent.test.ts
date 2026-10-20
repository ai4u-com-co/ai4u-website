import { describe, it, expect, vi, afterEach } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_KEY,
  CONSENT_OPEN_EVENT,
  getConsent,
  openConsentPreferences,
  setConsent,
} from '../consent';

// Entorno node (el repo no trae jsdom): se simula solo lo que consent.ts toca.
const makeEnv = (initial: Record<string, string> = {}, cookies = '_ga=1; _ga_ABC123=2; _fbp=3; _fbc=4; otra=5') => {
  const store = new Map(Object.entries(initial));
  const events: string[] = [];
  const cookieWrites: string[] = [];
  const win = {
    localStorage: {
      getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
      setItem: (k: string, v: string) => void store.set(k, v),
    },
    dispatchEvent: (e: Event) => void events.push(e.type + (e instanceof CustomEvent && e.detail ? `:${e.detail}` : '')),
    __ai4uLoadTrackers: vi.fn(),
    location: { reload: vi.fn(), hostname: 'www.ai4u.com.co' },
  };
  const doc = {
    get cookie() {
      return cookies;
    },
    set cookie(v: string) {
      cookieWrites.push(v);
    },
  };
  vi.stubGlobal('window', win);
  vi.stubGlobal('document', doc);
  vi.stubGlobal('location', win.location);
  return { store, events, cookieWrites, win };
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getConsent', () => {
  it('es null si no hay decisión', () => {
    makeEnv();
    expect(getConsent()).toBeNull();
  });

  it('lee granted y denied', () => {
    makeEnv({ [CONSENT_KEY]: JSON.stringify({ choice: 'granted', at: '2026-10-19T00:00:00Z' }) });
    expect(getConsent()).toBe('granted');
    makeEnv({ [CONSENT_KEY]: JSON.stringify({ choice: 'denied', at: '2026-10-19T00:00:00Z' }) });
    expect(getConsent()).toBe('denied');
  });

  it('ignora valores corruptos o desconocidos (cuenta como sin decisión: vuelve a preguntar)', () => {
    makeEnv({ [CONSENT_KEY]: '{no es json' });
    expect(getConsent()).toBeNull();
    makeEnv({ [CONSENT_KEY]: JSON.stringify({ choice: 'maybe' }) });
    expect(getConsent()).toBeNull();
  });

  it('si el navegador no deja leer el almacenamiento, no rompe y devuelve null', () => {
    const { win } = makeEnv();
    win.localStorage.getItem = () => {
      throw new Error('bloqueado');
    };
    expect(getConsent()).toBeNull();
  });
});

describe('setConsent', () => {
  it('aceptar guarda la decisión con fecha, avisa y carga los rastreadores UNA vez', () => {
    const { store, events, win } = makeEnv();
    setConsent('granted');
    const saved = JSON.parse(store.get(CONSENT_KEY)!);
    expect(saved.choice).toBe('granted');
    expect(Number.isNaN(Date.parse(saved.at))).toBe(false);
    expect(events).toContain(`${CONSENT_CHANGED_EVENT}:granted`);
    expect(win.__ai4uLoadTrackers).toHaveBeenCalledTimes(1);
    expect(win.location.reload).not.toHaveBeenCalled();
  });

  it('rechazar sin haber aceptado antes NO carga nada, NO borra cookies y NO recarga', () => {
    const { store, cookieWrites, win } = makeEnv();
    setConsent('denied');
    expect(JSON.parse(store.get(CONSENT_KEY)!).choice).toBe('denied');
    expect(win.__ai4uLoadTrackers).not.toHaveBeenCalled();
    expect(cookieWrites).toHaveLength(0);
    expect(win.location.reload).not.toHaveBeenCalled();
  });

  it('retirar una aceptación borra SOLO las cookies de Google y Meta y recarga', () => {
    const { cookieWrites, win } = makeEnv({ [CONSENT_KEY]: JSON.stringify({ choice: 'granted', at: 'x' }) });
    setConsent('denied');
    const names = new Set(cookieWrites.map((w) => w.split('=')[0]));
    expect(names).toEqual(new Set(['_ga', '_ga_ABC123', '_fbp', '_fbc']));
    expect(cookieWrites.every((w) => w.includes('expires=Thu, 01 Jan 1970'))).toBe(true);
    expect(win.location.reload).toHaveBeenCalledTimes(1);
    expect(win.__ai4uLoadTrackers).not.toHaveBeenCalled();
  });

  it('borra las cookies en el dominio donde las guardan Google y Meta (ai4u.com.co), no solo en el host ni en .com.co', () => {
    // Regresión: se calculaba el dominio como las últimas DOS partes del host (.com.co) y en www.ai4u.com.co
    // las cookies de _ga/_fbp (que viven en ai4u.com.co) quedaban sin borrar. Con localhost no se notaba.
    const { cookieWrites } = makeEnv({ [CONSENT_KEY]: JSON.stringify({ choice: 'granted', at: 'x' }) });
    setConsent('denied');
    const domainsOf = (name: string) => cookieWrites.filter((w) => w.startsWith(`${name}=`)).map((w) => (w.match(/domain=([^;]+)/) ?? [, ''])[1]);
    for (const name of ['_ga', '_ga_ABC123', '_fbp', '_fbc']) {
      expect(domainsOf(name), name).toEqual(expect.arrayContaining(['', 'www.ai4u.com.co', '.www.ai4u.com.co', 'ai4u.com.co', '.ai4u.com.co']));
    }
  });

  it('si el almacenamiento falla al guardar, igual aplica la decisión en esta visita', () => {
    const { win } = makeEnv();
    win.localStorage.setItem = () => {
      throw new Error('cuota');
    };
    expect(() => setConsent('granted')).not.toThrow();
    expect(win.__ai4uLoadTrackers).toHaveBeenCalledTimes(1);
  });
});

describe('openConsentPreferences', () => {
  it('dispara el evento que reabre el banner', () => {
    const { events } = makeEnv();
    openConsentPreferences();
    expect(events).toContain(CONSENT_OPEN_EVENT);
  });
});

describe('index.html: los rastreadores solo se cargan con consentimiento', () => {
  const html = readFileSync(resolve(__dirname, '../../../index.html'), 'utf8');

  it('no hay ninguna etiqueta <script src> a Google Analytics ni a Meta', () => {
    expect(html).not.toMatch(/<script[^>]+src=["'][^"']*(googletagmanager|connect\.facebook)/i);
  });

  it('las URL de los rastreadores aparecen solo dentro de la puerta __ai4uLoadTrackers', () => {
    const doorStart = html.indexOf('window.__ai4uLoadTrackers = function');
    const doorEnd = html.indexOf('(function () {', doorStart);
    expect(doorStart).toBeGreaterThan(-1);
    for (const url of ['googletagmanager.com/gtag/js', 'connect.facebook.net/en_US/fbevents.js']) {
      const at = html.indexOf(url);
      expect(at).toBeGreaterThan(doorStart);
      expect(at).toBeLessThan(doorEnd);
      expect(html.indexOf(url, at + 1)).toBe(-1);
    }
  });

  it('la puerta se abre desde index.html solo si ya había una aceptación guardada', () => {
    expect(html).toMatch(/c\.choice === 'granted'/);
  });
});
