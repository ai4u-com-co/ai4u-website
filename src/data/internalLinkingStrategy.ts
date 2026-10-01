// Estrategia de link building interno para SEO
// Mapeo semántico de enlaces contextuales entre páginas

export interface InternalLink {
  to: string;
  label: string;
  context?: string;
  trackingLabel?: string;
  priority: 'high' | 'medium' | 'low';
  semantic: 'related' | 'progression' | 'evidence' | 'cross-sell';
}

export interface ServiceCrossReference {
  serviceSlug: string;
  serviceName: string;
  description: string;
  relatedCases: {
    client: string;
    sector: string;
    slug: string;
  }[];
  relatedServices: string[];
}

// Mapeo principal de enlaces internos por página
const link = (to: string, label: string, context: string, trackingLabel: string, semantic: InternalLink['semantic'], priority: InternalLink['priority'] = 'high'): InternalLink => ({ to, label, context, trackingLabel, priority, semantic });

export const INTERNAL_LINKS_MAP: Record<string, InternalLink[]> = {
  '/': [
    link('/agentes', 'Agentes', 'Los que hacen el trabajo repetitivo, todo el día', 'home_to_agentes', 'progression'),
    link('/tableros', 'Tableros', 'Ve cómo va tu empresa sin pedir reportes', 'home_to_tableros', 'progression'),
    link('/portafolio', 'Casos', 'Empresas que ya trabajan con agentes de Ai4U', 'home_to_casos', 'evidence'),
  ],
  '/servicios': [
    link('/tableros', 'Tableros', 'Las cifras que necesitas, siempre al día', 'services_to_tableros', 'related'),
    link('/portafolio', 'Ver los casos', 'Lo que ya construimos a la medida', 'services_to_casos', 'evidence'),
    link('/por-que-ai4u', 'Nosotros', 'La parte humana de la IA', 'services_to_why', 'evidence', 'medium'),
  ],
  '/tableros': [
    link('/portafolio', 'Ver los casos', 'Empresas que ya ven su operación en un tablero', 'tableros_to_casos', 'evidence'),
    link('/agentes', 'Agentes', 'El trabajo que hacen mientras tú decides', 'tableros_to_agentes', 'related'),
    link('/servicios', 'A tu medida', 'Si necesitas algo que no existe', 'tableros_to_servicios', 'progression', 'medium'),
  ],
  '/por-que-ai4u': [
    link('/portafolio', 'Casos', 'Empresas que ya trabajan con nosotros', 'why_to_casos', 'evidence'),
    link('/agentes', 'Agentes', 'Conoce a quién entra a tu equipo', 'why_to_agentes', 'progression'),
    link('/servicios', 'A tu medida', 'Cómo construimos y mantenemos', 'why_to_servicios', 'progression', 'medium'),
  ],
  '/portafolio': [
    link('/agentes', 'Agentes', 'Los agentes que usan estas empresas', 'casos_to_agentes', 'related'),
    link('/tableros', 'Tableros', 'Cómo ven su operación', 'casos_to_tableros', 'related'),
    link('/servicios', 'A tu medida', 'Cuando lo que necesitas no existe', 'casos_to_servicios', 'progression', 'medium'),
  ],
  '/orderloader': [
    link('/agentes', 'Ver más agentes', 'orderLoader es uno de varios agentes ya en producción', 'orderloader_to_agentes', 'related'),
    link('/portafolio', 'Ver los casos', 'Empresas donde ya trabaja', 'orderloader_to_casos', 'evidence', 'medium'),
    link('/servicios', 'A tu medida', 'Cómo construimos automatizaciones como esta', 'orderloader_to_servicios', 'progression', 'medium'),
  ],
};

// Función para obtener enlaces relacionados por página
export const getRelatedLinks = (currentPath: string): InternalLink[] => {
  return INTERNAL_LINKS_MAP[currentPath] || [];
};
