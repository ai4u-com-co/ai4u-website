import datos from './lecturaFacil.json';

// Versión en lectura fácil de cada página (generada con scripts/lectura-facil.mjs y revisada a mano).
export interface ParrafoFacil { titulo: string; texto: string }
export interface PaginaFacil {
  titulo: string;
  resumen: string;
  parrafos: ParrafoFacil[];
  acciones: string[];
  /** Fecha de generación (AAAA-MM-DD). */
  generado: string;
  /** true cuando una persona la revisó; hasta entonces la página lo dice. */
  revisado: boolean;
}

export const LECTURA_FACIL: Record<string, PaginaFacil> = datos as Record<string, PaginaFacil>;

/** La versión fácil de una ruta, o undefined si esa página no la tiene. */
export const lecturaFacilDe = (path: string): PaginaFacil | undefined => LECTURA_FACIL[path === '' ? '/' : path.replace(/\/$/, '') || '/'];
