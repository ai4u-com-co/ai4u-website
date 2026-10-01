import { ROUTES } from '../utils/constants';
import { ALL_AGENTS } from './agents';
import { CASES } from './cases';

// Destinos del sitio: los usan el menú de pantalla completa y el pie. "Contacto" no es un destino:
// el correo, el teléfono y WhatsApp viven en el pie de todas las páginas.
export interface SiteLink {
  name: string;
  path: string;
  /** Línea corta que acompaña al destino en el menú. */
  note: string;
}

export const SITE_LINKS: SiteLink[] = [
  { name: 'Agentes', path: ROUTES.AGENTES, note: `${ALL_AGENTS.length} agentes` },
  { name: 'Dashboards', path: ROUTES.DASHBOARDS, note: 'Ventas, cartera y un chat con tu empresa' },
  { name: 'A tu medida', path: ROUTES.SERVICES, note: 'Software y automatizaciones' },
  { name: 'Sitios web', path: ROUTES.SITIOS_WEB, note: 'Con diseño propio' },
  { name: 'Casos', path: ROUTES.PORTFOLIO, note: `${CASES.length} empresas` },
  { name: 'Nosotros', path: ROUTES.WHY_AI4U, note: 'La parte humana de la IA' },
];

export const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/ai.4.u_/' },
  { name: 'Facebook', url: 'https://www.facebook.com/artificial.intelligence.4.you/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/ai4u-com-co' },
  { name: 'X', url: 'https://x.com/_ai4u_' },
];
