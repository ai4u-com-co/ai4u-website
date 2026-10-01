import { AI4U_PALETTE } from '../components/shared/ui/tokens/palette';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';
import { Service, ServiceCategory, ServiceStatus, ServiceSuperCategory } from '../types/service';

export const services: Service[] = [
  // --- EJE 1: OPERACIÓN (ORANGE) ---
  {
    id: 'fashion-agent',
    title: 'coutureLab',
    subtitle: 'deFigurinesAEcommerceReal',
    description: 'Fotos de producto con modelos IA.',
    benefits: [
      'Modelos personalizados',
      'Cero costos de estudio'
    ],
    deliveryTime: '24h',
    category: ServiceCategory.AUTOMATION,
    priority: 1,
    featured: true,
    media: {
      video: '/assets/videos/fashion-agent.mp4',
      poster: '/assets/images/services-thumbnails/fashion-agent.png'
    },
    thumbnail: '/assets/images/services-thumbnails/fashion-agent.png',
    color: BRAND_ORANGE,
    tags: ['fashion', 'ecommerce', 'ai', 'eje:operation', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    metadata: { createdAt: '2025-08-11', updatedAt: '2025-02-03', version: '1.1', author: 'AI4U Team' }
  },
  {
    id: 'data-entry-automatico',
    title: 'dataEntryAutomatico',
    subtitle: 'automatizacionDeDigitacion',
    description: 'De PDF e imágenes a tu ERP, automático.',
    benefits: [
      'Minimiza errores operativos',
      'Recupera horas valiosas cada semana',
      'Integración inmediata'
    ],
    deliveryTime: '7 días',
    category: ServiceCategory.AUTOMATION,
    priority: 2,
    featured: false,
    media: {
      video: '/assets/videos/data-entry-automatico.mp4',
      poster: '/assets/images/services-thumbnails/data-entry-automatico.png'
    },
    thumbnail: '/assets/images/services-thumbnails/data-entry-automatico.png',
    color: BRAND_ORANGE,
    tags: ['ocr', 'erp', 'automatización', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    metadata: { createdAt: '2025-08-09', updatedAt: '2025-02-03', version: '1.1', author: 'AI4U Team' }
  },
  {
    id: 'chatbot-inteligente',
    title: 'chatbotsWhatsApp',
    subtitle: 'gestionDePedidos247',
    description: 'Ventas y atención por WhatsApp 24/7.',
    benefits: [
      'Atención continua real',
      'Ventas automáticas',
      'Fácil integración'
    ],
    deliveryTime: '3 días',
    category: ServiceCategory.AI_ASSISTANT,
    priority: 3,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['chatbot', 'whatsapp', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/chatbot-inteligente.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.2', author: 'AI4U Team' }
  },
  {
    id: 'auditoria-ia',
    title: 'Auditorías IA',
    subtitle: 'Control estratégico operativo',
    description: 'Supervisión IA de facturación y logística.',
    benefits: [
      'Reportes ágiles',
      'Control de anomalías',
      'Visibilidad estratégica'
    ],
    deliveryTime: '5 días',
    category: ServiceCategory.ANALYTICS,
    priority: 4,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['auditoría', 'control', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/auditoria-ia.png',
    metadata: { createdAt: '2025-02-03', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'vision-computadora',
    title: 'Visión Artificial',
    subtitle: 'Cámaras inteligentes',
    description: 'Monitoreo de stock y calidad en tiempo real.',
    benefits: [
      'Monitoreo inteligente visual',
      'Detección de mermas',
      'Seguridad proactiva'
    ],
    deliveryTime: '14 días',
    category: ServiceCategory.AUTOMATION,
    priority: 5,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['visión', 'seguridad', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/vision-computadora.png',
    metadata: { createdAt: '2025-02-03', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'desarrollo-web',
    title: 'desarrolloWeb',
    subtitle: 'arquitecturaDigitalPro',
    description: 'Plataformas web de alto rendimiento.',
    benefits: [
      'Optimización SEO/LCP',
      'Arquitectura optimizada'
    ],
    deliveryTime: '14 días',
    category: ServiceCategory.ECOMMERCE,
    priority: 6,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['web', 'desarrollo', 'ux', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/sitios-web-ia.png',
    metadata: { createdAt: '2025-02-05', updatedAt: '2025-02-05', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'cotizador-automatico',
    title: 'Cotizador Automático',
    subtitle: 'Presupuestos al instante',
    description: 'De voz o texto a presupuesto al instante.',
    benefits: [
      'Precisión en cotizaciones',
      'Envío ágil',
      'Ahorro operativo'
    ],
    deliveryTime: '5 días',
    category: ServiceCategory.AUTOMATION,
    priority: 7,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['cotizaciones', 'voz', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/cotizador-automatico.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'gestor-pedidos',
    title: 'Gestor de Pedidos',
    subtitle: 'Optimiza tus órdenes',
    description: 'Procesamiento ágil de órdenes de compra.',
    benefits: [
      'Automatiza el ingreso de datos',
      'Sincronización precisa con ERP',
      'Proceso ágil'
    ],
    deliveryTime: '7 días',
    category: ServiceCategory.AUTOMATION,
    priority: 8,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['pedidos', 'erp', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/gestor-pedidos.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.3', author: 'AI4U Team' }
  },
  {
    id: 'the-builder',
    title: 'The Builder',
    subtitle: 'Tiendas Shopify Pro',
    description: 'Tiendas Shopify de alta conversión.',
    benefits: [
      'Diseño profesional',
      'Pagos configurados',
      'Lista en 14 días'
    ],
    deliveryTime: '14 días',
    category: ServiceCategory.ECOMMERCE,
    priority: 9,
    featured: false,
    color: BRAND_ORANGE,
    tags: ['shopify', 'ecommerce', 'eje:operation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/the-builder.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '2.0', author: 'AI4U Team' }
  },

  // --- EJE 2: ESTRATEGIA (INFO/BLUE) ---
  {
    id: 'estratega-ejecutivo',
    title: 'Estratega Ejecutivo',
    subtitle: 'Asistente IA estratégico',
    description: 'KPIs y reportes estratégicos con IA.',
    benefits: [
      'Decisiones basadas en datos',
      'Reportes continuos',
      'Análisis ágil'
    ],
    deliveryTime: '3 días',
    category: ServiceCategory.AI_ASSISTANT,
    priority: 1,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['estrategia', 'kpis', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/estratega-ejecutivo.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'dashboards-inteligentes',
    title: 'Dashboards IA',
    subtitle: 'Tu negocio en tiempo real',
    description: 'Rentabilidad y predicción en tiempo real.',
    benefits: [
      'Visibilidad 360°',
      'Predicción IA',
      'Decisiones con datos'
    ],
    deliveryTime: '7 días',
    category: ServiceCategory.ANALYTICS,
    priority: 2,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['dashboards', 'data', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/dashboards-inteligentes.png',
    metadata: { createdAt: '2025-02-03', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'investigacion-horeca',
    title: 'Investigación HORECA',
    subtitle: 'Expansión basada en datos',
    description: 'Mapeo de mercado con IA.',
    benefits: [
      'Leads calificados',
      'Mapeo competencia',
      'Expansión guiada'
    ],
    deliveryTime: '15 días',
    category: ServiceCategory.CONSULTING,
    priority: 3,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['horeca', 'expansión', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/investigacion-horeca.png',
    metadata: { createdAt: '2025-02-03', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'asesoria-estrategica',
    title: 'Consultoría Permanente',
    subtitle: 'Tu equipo IA dedicado',
    description: 'Asesoría IA dedicada y continua.',
    benefits: [
      'Actualizaciones IA',
      'Soporte preferencial',
      'Innovación continua'
    ],
    deliveryTime: 'Continuo',
    category: ServiceCategory.CONSULTING,
    priority: 4,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['consultoría', 'innovación', 'eje:strategy', 'eje:transformation'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/asesoria-estrategica-continua.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'cazador-leads',
    title: 'Cazador de Leads',
    subtitle: 'Clientes calificados',
    description: 'Prospectos calificados con Meta Ads e IA.',
    benefits: [
      'Pipeline siempre lleno',
      'Leads de alta calidad',
      'Seguimiento de cada campaña'
    ],
    deliveryTime: '7 días',
    category: ServiceCategory.AUTOMATION,
    priority: 5,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['leads', 'marketing', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/cazador-leads.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.1', author: 'AI4U Team' }
  },
  {
    id: 'investigador-digital',
    title: 'Investigador Digital',
    subtitle: 'Monitor de tendencias',
    description: 'Competencia y tendencias en tiempo real.',
    benefits: [
      'Análisis competencia',
      'Optimización de tiempo semanal',
      'Reportes periódicos'
    ],
    deliveryTime: 'Inmediato',
    category: ServiceCategory.ANALYTICS,
    priority: 6,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['redes', 'tendencias', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/investigador-digital.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'analista-comentarios',
    title: 'Analista de Comentarios',
    subtitle: 'Insights automáticos',
    description: 'Patrones y sentimientos de clientes.',
    benefits: [
      'Análisis sentimientos',
      'Insights de clientes',
      'Patrones detectados'
    ],
    deliveryTime: '3 días',
    category: ServiceCategory.ANALYTICS,
    priority: 7,
    featured: false,
    color: AI4U_PALETTE.info,
    tags: ['sentimientos', 'insights', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/analista-comentarios.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },

  // --- EJE 3: EDUCACIÓN (BLACK) ---
  {
    id: 'the-master',
    title: 'The Master',
    subtitle: 'Estrategia para líderes',
    description: 'IA y automatización para líderes.',
    benefits: [
      'Sesión exclusiva',
      'Roadmap real',
      'Networking top'
    ],
    deliveryTime: 'Programado',
    category: ServiceCategory.TRAINING,
    priority: 1,
    featured: false,
    color: BRAND_ORANGE, // Naranja para contrastar sobre fondo negro
    tags: ['líderes', 'masterclass', 'eje:education', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/the-master.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },
  {
    id: 'the-mentor',
    title: 'The Mentor',
    subtitle: 'Prompt Engineering 1a1',
    description: 'Productividad extrema con ChatGPT.',
    benefits: [
      'Salto en productividad',
      'GPTs personalizados',
      'Mentoría directa'
    ],
    deliveryTime: 'Sesiones',
    category: ServiceCategory.TRAINING,
    priority: 2,
    featured: false,
    color: BRAND_ORANGE, // Naranja para contrastar sobre fondo negro
    tags: ['chatgpt', 'productividad', 'eje:education'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/the-mentor.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.1', author: 'AI4U Team' }
  },
  {
    id: 'the-artist',
    title: 'The Artist',
    subtitle: 'Master Midjourney 1a1',
    description: 'Creación de imágenes IA para marketing.',
    benefits: [
      'Control Midjourney',
      'Feedback en vivo',
      'Prompts exclusivos'
    ],
    deliveryTime: 'Sesiones',
    category: ServiceCategory.TRAINING,
    priority: 3,
    featured: false,
    color: BRAND_ORANGE, // Naranja para contrastar sobre fondo negro
    tags: ['midjourney', 'diseño', 'eje:education'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/the-artist.png',
    metadata: { createdAt: '2024-01-01', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  },

  // --- EJE 4: TRANSFORMACIÓN DIGITAL (GREEN) ---
  {
    id: 'metodologia-ai-first',
    title: 'Metodología AI-First',
    subtitle: 'Infraestructura del futuro',
    description: 'Arquitectura de negocio con IA.',
    benefits: [
      'Arquitectura IA',
      'Ventaja competitiva',
      'Negocio escalable'
    ],
    deliveryTime: 'Consultoría',
    category: ServiceCategory.CONSULTING,
    priority: 2,
    featured: false,
    color: AI4U_PALETTE.accentColors.mint,
    tags: ['metodología', 'futuro', 'eje:transformation', 'eje:strategy'],
    status: ServiceStatus.ACTIVE,
    thumbnail: '/assets/images/services-thumbnails/metodologia-ai-first.png',
    metadata: { createdAt: '2025-02-03', updatedAt: '2025-02-03', version: '1.0', author: 'AI4U Team' }
  }
];

export const defaultServiceConfig = {
  displaySettings: {
    showPrices: false,
    showDeliveryTime: true,
    cardsPerRow: 3,
    showCategories: true
  },
  filterSettings: {
    enableCategoryFilter: true,
    enablePriceFilter: false,
    enableTagFilter: false
  }
};

export const ServiceUtils = {
  getByCategory: (category: ServiceCategory) => 
    services.filter(service => service.category === category),
  
  getBySuperCategory: (superCategory: ServiceSuperCategory) => {
    const tag = `eje:${superCategory.toLowerCase()}`;
    return services.filter(service => service.tags.includes(tag));
  },
  
  getFeatured: () => 
    services.filter(service => service.featured),
  
  getActive: () => 
    services.filter(service => service.status === ServiceStatus.ACTIVE),
  
  sortByPriority: (serviceList: Service[]) => 
    [...serviceList].sort((a, b) => a.priority - b.priority),
  
  searchByTags: (tags: string[]) => 
    services.filter(service => 
      tags.some(tag => service.tags.includes(tag.toLowerCase()))
    ),
  
  getCategories: () => 
    Array.from(new Set(services.map(service => service.category))),
  
  getTags: () => 
    Array.from(new Set(services.flatMap(service => service.tags)))
};
