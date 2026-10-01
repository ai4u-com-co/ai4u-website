import React from 'react';
import PitchDeck, { DeckSlide } from '../components/pitch/PitchDeck';

const slides: DeckSlide[] = [
  {
    title: 'Transformación Inteligente',
    subtitle: 'AI4U + Alimentos Corona',
    content: 'Elevando la distribución de proteínas al siguiente nivel con infraestructura de IA.',
    type: 'title'
  },
  {
    title: 'Investigación: Alimentos Corona',
    subtitle: 'Líder en distribución de proteínas',
    content: [
      'Operación masiva de pollo, pescado y cerdo en Antioquia.',
      'Canales críticos: minimercados, tienda a tienda (tat) y horeca.',
      'Modelo de negocio basado en frescura y logística capilar.'
    ],
    type: 'content'
  },
  {
    title: 'Dolores operativos',
    subtitle: 'Identificando barreras de crecimiento',
    content: [
      'Cuellos de botella por procesos manuales y digitación lenta.',
      'Falta de visibilidad en tiempo real de la operación nacional.',
      'Dependencia de personal para tareas repetitivas de bajo valor.'
    ],
    type: 'content'
  },
  {
    title: 'Automatizaciones',
    subtitle: 'Lo operativo: Eficiencia 24/7',
    content: 'Transformamos tareas repetitivas en procesos autónomos e infalibles.',
    type: 'section',
    category: 'operativo'
  },
  {
    title: 'Chatbots inteligentes',
    subtitle: 'Pedidos omnicanal WhatsApp',
    content: [
      'Gestión automática de órdenes de compra sin intervención humana.',
      'Atención 24/7 para el canal TaT y minimercados.',
      'Sincronización instantánea con el inventario y CRM.'
    ],
    type: 'product',
    category: 'operativo'
  },
  {
    title: 'Data entry automático',
    subtitle: 'Cero errores de digitación',
    content: [
      'Extracción inteligente de datos de facturas y documentos (OCR).',
      'Ingreso automático a ERP y sistemas contables.',
      'Menos carga administrativa para tu equipo.'
    ],
    type: 'product',
    category: 'operativo'
  },
  {
    title: 'Auditorías internas con IA',
    subtitle: 'Control y calidad garantizada',
    content: [
      'Validación automática de procesos operativos y cumplimiento.',
      'Detección de anomalías en facturación y logística.',
      'Reportes de auditoría generados automáticamente.'
    ],
    type: 'product',
    category: 'operativo'
  },
  {
    title: 'Visión por computadora',
    subtitle: 'Cámaras inteligentes en bodegas',
    content: [
      'Monitoreo automático de stock y movimiento de mercancía.',
      'Control de calidad visual de proteínas y empaques.',
      'Seguridad proactiva y detección de riesgos en tiempo real.'
    ],
    type: 'product',
    category: 'operativo'
  },
  {
    title: 'Sitios web con IA',
    subtitle: 'Optimización para conversión',
    content: [
      'Diseño de plataformas B2B inteligentes para pedidos web.',
      'Experiencia de usuario personalizada según el perfil del cliente.',
      'Arquitectura optimizada para máxima velocidad y fiabilidad.'
    ],
    type: 'product',
    category: 'operativo'
  },
  {
    title: 'Data Analysis',
    subtitle: 'Lo estratégico: el poder de los datos',
    content: 'Convierte la información de tu operación en tu mayor ventaja competitiva.',
    type: 'section',
    category: 'estratégico'
  },
  {
    title: 'Dashboards inteligentes',
    subtitle: 'Visibilidad total del negocio',
    content: [
      'Análisis avanzado de ventas, mermas y rentabilidad por zona.',
      'Visualización clara para la toma de decisiones ejecutivas.',
      'Predicción sutil de tendencias basada en datos históricos.'
    ],
    type: 'product',
    category: 'estratégico'
  },
  {
    title: 'Investigación Horeca',
    subtitle: 'Expansión nacional',
    content: [
      'Mapeo exhaustivo de hoteles y restaurantes en todo el país.',
      'Identificación de zonas con mayor potencial de crecimiento.',
      'Estrategia de penetración de mercado basada en datos geográficos.'
    ],
    type: 'product',
    category: 'estratégico'
  },
  {
    title: 'El siguiente nivel',
    subtitle: 'Super AI Infrastructure',
    content: 'La cúspide de la autonomía: una IA que no solo sugiere, sino que ejecuta.',
    type: 'section',
    category: 'super-ai'
  },
  {
    title: 'Super AI',
    subtitle: 'Tu empleado digital autónomo',
    content: [
      'IA conectada directamente a todos tus sistemas operativos.',
      'Capacidad de actuar y decidir con base en objetivos de negocio.',
      'Integración profunda que sustituye procesos complejos.'
    ],
    type: 'product',
    category: 'super-ai'
  },
  {
    title: 'Autonomía total',
    subtitle: 'Control de sistemas y objetivos',
    content: [
      'La IA opera el computador y los sistemas como un humano experto.',
      'Ejecución autónoma de tareas administrativas y logísticas.',
      'Enfoque total en resultados y cumplimiento de KPIs.'
    ],
    type: 'product',
    category: 'super-ai'
  },
  {
    title: 'Metodología AI-First',
    subtitle: 'Transformación real desde el núcleo',
    content: 'No adaptamos la IA a tu negocio; construimos tu infraestructura personalizada.',
    type: 'content'
  },
  {
    title: 'Casos de éxito',
    showClients: true,
    subtitle: 'Líderes que ya confían en AI4U',
    content: 'Empresas que han transformado su operación mediante nuestra infraestructura de IA.',
    type: 'content'
  },
  {
    title: '¿Por qué AI4U?',
    subtitle: 'Tu socio de ingeniería dedicado',
    content: 'No somos un proveedor de software; somos tu equipo de ingeniería de IA personalizado.',
    type: 'content'
  },
  {
    title: 'Diagnóstico gratuito',
    subtitle: 'Inicia tu transformación',
    content: [
      'Evaluación profunda de tu operación actual sin costo.',
      'Identificación de Quick Wins con IA para Alimentos Corona.',
      'Entrega de un roadmap estratégico de implementación.'
    ],
    type: 'offer'
  },
  {
    title: 'Agendemos ahora',
    subtitle: 'El futuro es hoy',
    content: 'Conversemos sobre cómo potenciar Alimentos Corona con Inteligencia Artificial.',
    type: 'cta'
  }
];

const Pitch: React.FC = () => <PitchDeck slides={slides} />;

export default Pitch;
