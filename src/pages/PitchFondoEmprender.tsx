import React from 'react';
import PitchDeck, { DeckSlide } from '../components/pitch/PitchDeck';

const slides: DeckSlide[] = [
  {
    title: 'AI4U: El Futuro de la Productividad',
    subtitle: 'Potenciando el talento humano con Arquitecturas de IA',
    content: 'Mariano Garcia Posada | Rionegro, Antioquia',
    type: 'title'
  },
  {
    title: '¿Cuánto vale el tiempo perdido?',
    subtitle: 'El costo de la ineficiencia manual',
    content: 'El 60% del tiempo operativo en una PYME se desperdicia en tareas que una máquina ya puede hacer.',
    type: 'content',
    category: 'el gancho'
  },
  {
    title: 'La Carga de lo Manual',
    subtitle: 'Identificando el dolor del cliente',
    content: [
      'Las PYMEs colombianas destinan el 40-60% de su tiempo a tareas repetitivas.',
      'Falta de tiempo para estrategia e innovación.',
      'Brecha tecnológica creciente vs grandes corporaciones.'
    ],
    type: 'content',
    category: 'el problema'
  },
  {
    title: 'Un Gigante Desatendido',
    subtitle: 'El mercado de las PYMEs en Colombia',
    content: [
      '+5.4 Millones de PYMEs buscando eficiencia.',
      'Foco inicial: Antioquia (Rionegro/Medellín).',
      'Necesidad urgente de transformación digital a precio justo.'
    ],
    type: 'content',
    category: 'oportunidad'
  },
  {
    title: 'Arquitecturas de IA a Medida',
    subtitle: 'Nuestra Solución',
    content: 'Diseñamos e implementamos sistemas de IA que liberan hasta el 70% del tiempo operativo mediante agentes y flujos autónomos.',
    type: 'section',
    category: 'solución'
  },
  {
    title: 'Automatización Inteligente',
    subtitle: 'Nuestro Producto Core',
    content: [
      'Agentes autónomos (OpenAI/Claude).',
      'Automatización de flujos operativos a medida.',
      'Chatbots omnicanal y Data Entry automático.',
      'Dashboards de control en tiempo real.'
    ],
    type: 'product',
    category: 'producto'
  },
  {
    title: 'Velocidad, Precio y Cercanía',
    subtitle: 'Nuestra Propuesta de Valor',
    content: [
      'Implementación en 3 a 14 días (vs meses).',
      'Precio PYME: Desde $2.5M COP.',
      'Soporte local en Rionegro y Medellín (en español).',
      'Enfoque Humano: Potenciar, no reemplazar.'
    ],
    type: 'offer',
    category: 'valor'
  },
  {
    title: 'De Diagnóstico a Producción',
    subtitle: 'Nuestra Metodología en 14 días',
    content: [
      'Día 1: Diagnóstico inicial (identificamos cuellos de botella).',
      'Día 2-10: Configuración e integración técnica.',
      'Día 11-13: Pruebas y validación del sistema.',
      'Día 14: Entrega y capacitación continua.'
    ],
    type: 'content',
    category: 'proceso'
  },
  {
    title: 'Tracción: Resultados Reales',
    subtitle: 'Validación del Mercado',
    content: [
      '+$65.5M COP en ventas históricas.',
      '39 servicios implementados y funcionando.',
      'Modelo validado en sectores de moda, educación y logística.'
    ],
    type: 'content',
    category: 'tracción'
  },
  {
    title: 'Líderes que confían en AI4U',
    subtitle: 'Casos de Éxito Corporativos',
    content: 'Universidad EAFIT, TRUE (Moda), Impact Hub, IHS Solutions, entre otros.',
    type: 'section',
    category: 'validación'
  },
  {
    title: 'TRUE: Moda Inteligente',
    subtitle: 'Caso de Éxito 1',
    content: [
      'Problema: Equipo saturado con creación de contenido manual.',
      'Solución: Flujo de IA para generación de assets digitales.',
      'Resultado: 6 horas diarias liberadas para el equipo creativo.'
    ],
    type: 'content',
    category: 'casos'
  },
  {
    title: 'EAFIT: IA en el Campo',
    subtitle: 'Caso de Éxito 2',
    content: [
      'Proyecto: Formación de docentes rurales en herramientas de IA.',
      'Impacto: Cerrando la brecha digital desde la base educativa.',
      'Rol: AI4U como habilitador tecnológico de vanguardia.'
    ],
    type: 'content',
    category: 'casos'
  },
  {
    title: 'Ventaja Competitiva',
    subtitle: 'AI4U vs El Resto',
    content: [
      'Vs Freelancers: Soporte local, garantía y continuidad.',
      'Vs Agencias: Real automatización de procesos, no solo marketing.',
      'Vs Consultoras: 10x más rápido y 1/20 del precio.'
    ],
    type: 'content',
    category: 'competencia'
  },
  {
    title: 'Estrategia Comercial',
    subtitle: 'Go-to-Market',
    content: [
      'Alianzas con Cámaras de Comercio regionales.',
      'LinkedIn Ads y Webinars B2B especializados.',
      'Marketing de referidos y alianzas con agencias de marketing.'
    ],
    type: 'content',
    category: 'estrategia'
  },
  {
    title: 'Low-code / High-Impact',
    subtitle: 'Nuestra Tecnología',
    content: 'Utilizamos OpenAI y Claude para construir infraestructuras robustas, escalables y fáciles de mantener.',
    type: 'section',
    category: 'tecnología'
  },
  {
    title: 'Impacto Social y Talento',
    subtitle: 'Evolución del Empleo',
    content: [
      'Creamos empleos de alto valor digital.',
      'Empoderamos a los equipos operativos con IA.',
      'Reducción de huella de carbono (operación 100% digital).'
    ],
    type: 'content',
    category: 'impacto'
  },
  {
    title: 'El Equipo AI4U',
    subtitle: 'Pasión por la Eficiencia',
    content: [
      'Liderado por Mariano Garcia Posada.',
      'CEO & Dev Fullstack especializado en IA.',
      'Sólida red de consultores y partners tecnológicos.'
    ],
    type: 'content',
    category: 'equipo'
  },
  {
    title: 'Proyecciones Financieras',
    subtitle: 'Crecimiento Sostenible',
    content: [
      'Año 1: $63M COP proyectados.',
      'Crecimiento base del 10% anual.',
      'Punto de equilibrio alcanzado desde el mes 1.'
    ],
    type: 'content',
    category: 'finanzas'
  },
  {
    title: 'Nuestra Petición',
    subtitle: 'Fondo Emprender',
    content: [
      'Solicitud: $27,612,800 COP.',
      'Objetivo: Hardware de alto rendimiento y escalamiento comercial.',
      'Visión: Liderar la transformación de las 1000 PYMEs más grandes de Antioquia.'
    ],
    type: 'offer',
    category: 'el pedido'
  },
  {
    title: '¿Construimos el futuro?',
    subtitle: 'AI4U: Tu Socio de Ingeniería IA',
    content: 'Hablemos sobre cómo transformar tu negocio hoy.',
    type: 'cta',
    category: 'cierre'
  }
];

const PitchFondoEmprender: React.FC = () => <PitchDeck slides={slides} />;

export default PitchFondoEmprender;
