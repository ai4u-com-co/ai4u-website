// Rutas de la aplicación
export const ROUTES = {
  HOME: '/',
  SERVICES: '/servicios',
  WHY_AI4U: '/por-que-ai4u',
  PORTFOLIO: '/portafolio',
  SITIOS_WEB: '/sitios-web',
  ORDER_LOADER: '/orderloader',
  SUPER_AI: '/super-ai',
  AGENTES: '/agentes',
  /** @deprecated nombre viejo de /agentes — solo para el redirect en App.tsx, no usar para nada nuevo */
  TIENDA_AI_LEGACY: '/tienda-ai',
  DESIGN_SYSTEM: '/design-system',
  PITCH: '/pitch',
  PITCH_BANCOLOMBIA: '/pitch-bancolombia',
  PITCH_FONDO_EMPRENDER: '/pitch-fondo-emprender',
  PROPUESTA_EL_BARRIL: '/propuesta-el-barril',
  PROPUESTA_MANUFACTURA: '/propuesta-manufactura',
  PRIVACY_POLICY: '/politica-de-privacidad',
  TERMS_OF_SERVICE: '/condiciones-de-servicio',
  DATA_DELETION: '/eliminacion-de-datos'
} as const;

// Configuración de la aplicación
export const APP_CONFIG = {
  NAME: 'AI4U',
  DESCRIPTION: 'Construimos tu infraestructura de IA personalizada',
  CONTACT: {
    EMAIL: 'contacto@ai4u.com.co',
    PHONE: '+57 302 490 6414',
    WHATSAPP: '573024906414',
    WHATSAPP_MESSAGE: 'hola, quiero recuperar mi tiempo con ai4u',
    CALENDLY: 'calendly.com/mgarciap333/ai4u'
  },
  SOCIAL: {
    LINKEDIN: 'https://linkedin.com/company/ai4u',
    TWITTER: 'https://twitter.com/ai4u_co',
    INSTAGRAM: 'https://instagram.com/ai4u_co'
  }
} as const;

// Configuración de servicios
export const SERVICE_CONFIG = {
  DIAGNOSTIC_DURATION: 30, // minutos
  MAX_FEATURED_SERVICES: 6,
  CARDS_PER_ROW: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3
  }
} as const;

// Colores de la marca - Importados del sistema de tokens
// NOTA: Estos valores están deprecados. Usar directamente desde:
// - AI4U_PALETTE de src/components/shared/ui/tokens/palette.ts
// - useColors() hook para colores con contraste automático
import { AI4U_PALETTE } from '../components/shared/ui/tokens/palette';
import { BREAKPOINT_TOKENS } from '../components/shared/ui/tokens/theme';

// @deprecated Usar AI4U_PALETTE directamente
export const BRAND_COLORS = {
  PRIMARY: AI4U_PALETTE.accent, // Legacy - usar palette.accent o palette.accentColors.orange
  SECONDARY: AI4U_PALETTE.gray[600], // Legacy - usar palette.gray
  SUCCESS: AI4U_PALETTE.success,
  WARNING: AI4U_PALETTE.warning,
  ERROR: AI4U_PALETTE.error,
  INFO: AI4U_PALETTE.info
} as const;

// Breakpoints para responsive design - Importados del sistema de tokens
// @deprecated Usar BREAKPOINT_TOKENS directamente o theme.breakpoints de MUI
export const BREAKPOINTS = {
  MOBILE: BREAKPOINT_TOKENS.sm,
  TABLET: BREAKPOINT_TOKENS.md,
  DESKTOP: BREAKPOINT_TOKENS.lg
} as const; 