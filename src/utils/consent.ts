// Consentimiento de cookies de analítica y publicidad (Google Analytics y píxel de Meta).
// Ley 1581 de 2012: la autorización es previa, expresa e informada. Por eso index.html NO descarga
// ninguno de los dos scripts hasta que la persona acepta: window.__ai4uLoadTrackers() es la única
// puerta y solo se llama desde aquí (al aceptar) o desde el propio index.html cuando ya había aceptado.

export type ConsentChoice = 'granted' | 'denied';

export const CONSENT_KEY = 'ai4u_consent_v1';
export const CONSENT_CHANGED_EVENT = 'ai4u:consent-changed';
export const CONSENT_OPEN_EVENT = 'ai4u:consent-open';

interface StoredConsent {
  choice: ConsentChoice;
  /** Fecha ISO de la decisión: sirve como prueba de la autorización. */
  at: string;
}

declare global {
  interface Window {
    __ai4uLoadTrackers?: () => void;
  }
}

const hasWindow = () => typeof window !== 'undefined';

/** Decisión guardada, o null si la persona aún no ha decidido (o el navegador no deja guardar). */
export const getConsent = (): ConsentChoice | null => {
  if (!hasWindow()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<StoredConsent>;
    return parsed.choice === 'granted' || parsed.choice === 'denied' ? parsed.choice : null;
  } catch {
    return null;
  }
};

/** Cookies que dejan Google Analytics y Meta: se borran al retirar el consentimiento. */
export const clearTrackerCookies = (): void => {
  if (typeof document === 'undefined') return;
  const host = typeof location !== 'undefined' ? location.hostname : '';
  const domains = ['', host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim();
    if (name === '_ga' || name.startsWith('_ga_') || name === '_fbp' || name === '_fbc' || name === '_gid') {
      domains.forEach((d) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d ? `; domain=${d}` : ''}`;
      });
    }
  });
};

/**
 * Guarda la decisión. Si acepta: carga los scripts. Si retira un consentimiento que estaba dado:
 * borra las cookies y recarga, porque los scripts ya cargados no se pueden "descargar" de la página.
 */
export const setConsent = (choice: ConsentChoice): void => {
  if (!hasWindow()) return;
  const previous = getConsent();
  try {
    const value: StoredConsent = { choice, at: new Date().toISOString() };
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
  } catch {
    // sin almacenamiento: la decisión vale solo para esta visita
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: choice }));
  if (choice === 'granted') {
    window.__ai4uLoadTrackers?.();
  } else if (previous === 'granted') {
    clearTrackerCookies();
    window.location.reload();
  }
};

/** Vuelve a mostrar el banner (enlace "Preferencias de cookies" del pie). */
export const openConsentPreferences = (): void => {
  if (!hasWindow()) return;
  window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT));
};
