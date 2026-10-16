import { lazy, ComponentType, LazyExoticComponent } from 'react';

// Cada despliegue renombra los archivos de las páginas. Una pestaña abierta con la versión anterior
// pide un archivo que ya no existe y React.lazy falla ("Failed to fetch dynamically imported module").
// En vez de mostrar la pantalla de error, se recarga UNA vez para traer la versión nueva.
const KEY = 'ai4u-chunk-reload';
const WINDOW_MS = 15000;
const CHUNK_ERROR = /dynamically imported module|importing a module script failed|ChunkLoadError|Loading chunk|Unable to preload CSS/i;

export const isChunkLoadError = (err: unknown): boolean =>
  CHUNK_ERROR.test(String((err as { message?: string })?.message ?? err));

export function lazyWithReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
): LazyExoticComponent<T> {
  return lazy(() =>
    factory().catch((err) => {
      if (!isChunkLoadError(err)) throw err;
      let last = 0;
      try { last = Number(sessionStorage.getItem(KEY) || 0); } catch { /* sin storage: se recarga igual una vez por carga */ }
      // Si ya se recargó hace poco y sigue fallando, no se entra en bucle: se deja el error.
      if (Date.now() - last < WINDOW_MS) throw err;
      try { sessionStorage.setItem(KEY, String(Date.now())); } catch { /* ignorar */ }
      window.location.reload();
      return new Promise<{ default: T }>(() => {}); // espera a que la recarga reemplace la página
    }),
  );
}
