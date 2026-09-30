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
export const INTERNAL_LINKS_MAP: Record<string, InternalLink[]> = {
  // Home (/) - Hub Principal
  '/': [
    {
      to: '/servicios',
      label: 'Conoce nuestros servicios',
      context: 'Descubre cómo podemos automatizar tu empresa',
      trackingLabel: 'home_to_services',
      priority: 'high',
      semantic: 'progression'
    },
    {
      to: '/portafolio',
      label: 'Portafolio de innovación',
      context: 'Proyectos reales y aplicaciones de vanguardia',
      trackingLabel: 'home_to_portfolio',
      priority: 'high',
      semantic: 'evidence'
    },
    {
      to: '/por-que-ai4u',
      label: 'Resultados y metodología',
      context: 'Empresas que ya transformaron sus procesos',
      trackingLabel: 'home_to_why',
      priority: 'high',
      semantic: 'evidence'
    }
  ],

  // Servicios (/servicios) - Conversion Focus
  '/servicios': [
    {
      to: '/portafolio',
      label: 'Ver portafolio de innovación',
      context: 'Proyectos reales y aplicaciones de IA',
      trackingLabel: 'services_to_portfolio',
      priority: 'high',
      semantic: 'evidence'
    },
    {
      to: '/por-que-ai4u',
      label: 'Nuestra metodología',
      context: 'Por qué elegir AI4U',
      trackingLabel: 'services_to_why',
      priority: 'high',
      semantic: 'evidence'
    },
    {
      to: '/',
      label: 'Volver al inicio',
      context: 'Conoce más sobre nuestra filosofía',
      trackingLabel: 'services_to_home',
      priority: 'low',
      semantic: 'related'
    }
  ],

  // Por qué AI4U (/por-que-ai4u) - Differentiation & Evidence
  '/por-que-ai4u': [
    {
      to: '/portafolio',
      label: 'Ver portafolio',
      context: 'Proyectos de innovación destacados',
      trackingLabel: 'why_to_portfolio',
      priority: 'high',
      semantic: 'evidence'
    },
    {
      to: '/servicios',
      label: 'Nuestros servicios',
      context: 'Conoce qué ofrecemos exactamente',
      trackingLabel: 'why_to_services',
      priority: 'high',
      semantic: 'progression'
    },
    {
      to: '/',
      label: 'Comenzar ahora',
      context: 'Agendar diagnóstico gratuito',
      trackingLabel: 'why_to_home',
      priority: 'medium',
      semantic: 'progression'
    }
  ],

  // Portafolio (/portafolio) - Evidence & Innovation
  '/portafolio': [
    {
      to: '/servicios',
      label: 'Ver servicios',
      context: 'Cómo implementamos estas tecnologías',
      trackingLabel: 'portfolio_to_services',
      priority: 'high',
      semantic: 'progression'
    },
    {
      to: '/por-que-ai4u',
      label: 'Nuestra metodología',
      context: 'Por qué somos líderes en IA',
      trackingLabel: 'portfolio_to_why',
      priority: 'high',
      semantic: 'evidence'
    }
  ],

  // orderLoader (/orderloader) - Módulo dedicado al producto que originó a AI4U
  '/orderloader': [
    {
      to: '/agentes',
      label: 'Ver más agentes',
      context: 'orderLoader es uno de varios agentes ya en producción',
      trackingLabel: 'orderloader_to_agentes',
      priority: 'high',
      semantic: 'related'
    },
    {
      to: '/portafolio',
      label: 'Ver portafolio',
      context: 'Más proyectos reales de AI4U',
      trackingLabel: 'orderloader_to_portfolio',
      priority: 'medium',
      semantic: 'evidence'
    },
    {
      to: '/servicios',
      label: 'Ver servicios',
      context: 'Cómo construimos automatizaciones como esta',
      trackingLabel: 'orderloader_to_services',
      priority: 'medium',
      semantic: 'progression'
    }
  ]
};

// Servicios y sus casos relacionados
export const SERVICE_CROSS_REFERENCES: Record<string, ServiceCrossReference> = {
  'superai-empresarial': {
    serviceSlug: 'superai-empresarial',
    serviceName: 'Capa de Inteligencia Empresarial',
    description: 'Arquitectura integral de IA que transforma recursos operativos en ventaja estratégica',
    relatedCases: [
      { client: 'True', sector: 'Fashion', slug: 'fashion' },
      { client: 'HUA Naturals', sector: 'Wellness', slug: 'wellness' }
    ],
    relatedServices: ['gpt-personalizado', 'automatizacion-inteligente']
  },
  'gpt-personalizado': {
    serviceSlug: 'gpt-personalizado',
    serviceName: 'GPT Personalizado',
    description: 'Modelos de lenguaje entrenados específicamente para tu industria y procesos',
    relatedCases: [
      { client: 'EAFIT', sector: 'Educación Superior', slug: 'educacion-superior' },
      { client: 'HUA Naturals', sector: 'Wellness', slug: 'wellness' }
    ],
    relatedServices: ['superai-empresarial', 'chatbots-avanzados']
  },
  'automatizacion-inteligente': {
    serviceSlug: 'automatizacion-inteligente',
    serviceName: 'Automatización Inteligente',
    description: 'Procesos automatizados que se adaptan y aprenden de tu operación',
    relatedCases: [
      { client: 'La Magdalena', sector: 'Impact Storytelling', slug: 'impact-storytelling' },
      { client: 'True', sector: 'Fashion', slug: 'fashion' }
    ],
    relatedServices: ['superai-empresarial', 'machine-learning']
  },
  'chatbots-avanzados': {
    serviceSlug: 'chatbots-avanzados',
    serviceName: 'Chatbots Avanzados',
    description: 'Asistentes conversacionales que entienden contexto y generan valor real',
    relatedCases: [
      { client: 'HUA Naturals', sector: 'Wellness', slug: 'wellness' }
    ],
    relatedServices: ['gpt-personalizado', 'automatizacion-inteligente']
  }
};

// Enlaces contextuales específicos por sección
export const CONTEXTUAL_CTA_LINKS = {
  heroSection: {
    primary: { to: '/servicios', label: 'Conoce nuestros servicios' },
    secondary: { to: '/por-que-ai4u', label: 'Ver casos reales' }
  },
  featuresSection: {
    automation: { to: '/servicios#automatizacion-inteligente', label: 'Automatización Inteligente' },
    ai: { to: '/servicios#superai-empresarial', label: 'Capa de Inteligencia Empresarial' },
    personalization: { to: '/servicios#gpt-personalizado', label: 'GPT Personalizado' }
  },
  socialProof: {
    cases: { to: '/portafolio', label: 'Ver portafolio' },
    why: { to: '/por-que-ai4u', label: '¿Por qué nos eligen?' }
  }
};

// Función para obtener enlaces relacionados por página
export const getRelatedLinks = (currentPath: string): InternalLink[] => {
  return INTERNAL_LINKS_MAP[currentPath] || [];
};

// Función para obtener referencias cruzadas de servicios
export const getServiceCrossReference = (serviceSlug: string): ServiceCrossReference | null => {
  return SERVICE_CROSS_REFERENCES[serviceSlug] || null;
};

// Función para generar enlaces contextuales basados en contenido
export const generateContextualLinks = (
  currentPage: string, 
  contentContext: string[]
): InternalLink[] => {
  const baseLinks = getRelatedLinks(currentPage);
  
  // Filtrar y priorizar basado en contexto
  return baseLinks
    .filter(link => 
      contentContext.some(context => 
        link.semantic === context || 
        link.trackingLabel?.includes(context)
      )
    )
    .slice(0, 3); // Máximo 3 enlaces para mantener minimalismo
};