import type { ToolId } from './tools';

export type AgentStatus = 'produccion' | 'piloto' | 'interno';

export interface AgentAttributes {
  /** 0-100 — qué tan solo trabaja sin intervención humana. */
  autonomia: number;
  /** 0-100 — qué tan rápido entrega el resultado. */
  velocidad: number;
  /** 0-100 — cuánto terreno del proceso cubre, no solo un paso suelto. */
  alcance: number;
}

export interface Agent {
  name: string;
  category: string;
  /** Rol dentro del equipo — la "clase" del agente, un vistazo rápido a qué tipo de trabajo hace. */
  clase: string;
  /** 1-3 — madurez del agente, no un ranking de "mejor/peor". */
  nivel: 1 | 2 | 3;
  pitch: string;
  status: AgentStatus;
  atributos: AgentAttributes;
  /** Herramientas/APIs reales a las que se conecta — vacío si es puramente interno. */
  tools: ToolId[];
}

export interface AgentGroup {
  id: string;
  label: string;
  agents: Agent[];
}

// Catálogo público de agentes — la prueba concreta detrás del pitch de la
// portada ("agentes que trabajan"). Refleja el mismo inventario que corre
// en Mission Control, con copy pensado para cliente, no para operación
// interna. Actualizar cuando cambie el estado real de un agente.
//
// nivel/clase/atributos son marco de lectura tipo ficha de personaje — una
// forma memorable de comunicar madurez y personalidad, no una métrica
// medida. Los números de "trabajo real" (tickets/mes, etc.) NO se inventan
// acá — si algún día hay data real de uso, va aparte y con fuente.
export const AGENT_GROUPS: AgentGroup[] = [
  {
    id: 'tickets',
    label: 'tickets y soporte',
    agents: [
      {
        name: 'resolver con IA',
        category: 'tickets',
        clase: 'diagnosticador',
        nivel: 3,
        pitch: 'convierte un reporte de un cliente en diagnóstico, plan, código y una respuesta en español — con una persona revisando cada paso.',
        status: 'produccion',
        atributos: { autonomia: 70, velocidad: 88, alcance: 55 },
        tools: ['github'],
      },
      {
        name: 'whatsapp tickets',
        category: 'tickets',
        clase: 'mesa de entrada',
        nivel: 2,
        pitch: 'recibe reportes por whatsapp y los convierte en tickets priorizados, sin que nadie tenga que copiar y pegar nada.',
        status: 'produccion',
        atributos: { autonomia: 82, velocidad: 74, alcance: 40 },
        tools: ['whatsapp'],
      },
      {
        name: 'reparador nocturno',
        category: 'tickets',
        clase: 'guardia',
        nivel: 1,
        pitch: 'revisa los errores de producción cada noche y deja el fix listo para revisar en la mañana.',
        status: 'piloto',
        atributos: { autonomia: 60, velocidad: 52, alcance: 34 },
        tools: ['github'],
      },
    ],
  },
  {
    id: 'servicio',
    label: 'servicio al cliente',
    agents: [
      {
        name: 'chat sobre tu ERP',
        category: 'servicio',
        clase: 'oráculo',
        nivel: 3,
        pitch: 'responde en lenguaje natural sobre inventario, cartera, ventas y producción — consultando tu sistema en vivo.',
        status: 'produccion',
        atributos: { autonomia: 65, velocidad: 80, alcance: 70 },
        tools: ['sap'],
      },
      {
        name: 'asistente del panel',
        category: 'servicio',
        clase: 'copiloto',
        nivel: 2,
        pitch: 'el copiloto que vive dentro de tu propio dashboard, siempre con el estado real de tu operación.',
        status: 'produccion',
        atributos: { autonomia: 55, velocidad: 85, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'multicanal',
        category: 'servicio',
        clase: 'recepcionista',
        nivel: 2,
        pitch: 'atiende conversaciones en varios canales a la vez, sin perder contexto entre uno y otro.',
        status: 'produccion',
        atributos: { autonomia: 60, velocidad: 70, alcance: 45 },
        tools: ['whatsapp'],
      },
    ],
  },
  {
    id: 'operacion',
    label: 'automatización de operación',
    agents: [
      {
        name: 'lector de pedidos',
        category: 'operacion',
        clase: 'back office',
        nivel: 3,
        pitch: 'lee los pedidos que llegan por correo en PDF y los carga directo a tu ERP, sin digitación manual.',
        status: 'produccion',
        atributos: { autonomia: 85, velocidad: 65, alcance: 50 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'cobro de cartera',
        category: 'operacion',
        clase: 'cobrador',
        nivel: 3,
        pitch: 'manda los recordatorios de cartera vencida solo, con la cadencia que definas.',
        status: 'produccion',
        atributos: { autonomia: 90, velocidad: 55, alcance: 45 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'cotizador',
        category: 'operacion',
        clase: 'vendedor',
        nivel: 3,
        pitch: 'cotiza al instante y deja la cotización lista en tu sistema, sin ir y volver por correo.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 92, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'planeador de producción',
        category: 'operacion',
        clase: 'logístico',
        nivel: 1,
        pitch: 'ordena las órdenes de producción por máquina, sincronizado con lo que ya está en tu ERP.',
        status: 'piloto',
        atributos: { autonomia: 50, velocidad: 60, alcance: 65 },
        tools: ['sap'],
      },
    ],
  },
  {
    id: 'contenido',
    label: 'investigación y contenido',
    agents: [
      {
        name: 'fábrica de contenido',
        category: 'contenido',
        clase: 'creativo',
        nivel: 2,
        pitch: 'genera piezas de contenido con la voz de tu marca, no una genérica.',
        status: 'produccion',
        atributos: { autonomia: 55, velocidad: 70, alcance: 60 },
        tools: ['instagram'],
      },
      {
        name: 'escucha social',
        category: 'contenido',
        clase: 'vigía',
        nivel: 3,
        pitch: 'monitorea qué se dice de tu marca y arma el informe solo.',
        status: 'produccion',
        atributos: { autonomia: 80, velocidad: 65, alcance: 55 },
        tools: ['instagram'],
      },
      {
        name: 'prospección fría',
        category: 'contenido',
        clase: 'cazador',
        nivel: 1,
        pitch: 'inicia y da seguimiento a conversaciones de prospección, sin que nadie tenga que escribir el primer mensaje.',
        status: 'piloto',
        atributos: { autonomia: 65, velocidad: 58, alcance: 40 },
        tools: ['linkedin'],
      },
    ],
  },
  {
    id: 'fabrica-dev',
    label: 'la fábrica que los construye',
    agents: [
      {
        name: 'cadena de desarrollo',
        category: 'fabrica-dev',
        clase: 'arquitecto',
        nivel: 3,
        pitch: 'el equipo de agentes que diseña, construye, revisa y prueba cada uno de los que ves acá arriba.',
        status: 'interno',
        atributos: { autonomia: 70, velocidad: 60, alcance: 90 },
        tools: ['github'],
      },
    ],
  },
];

export const ALL_AGENTS: Agent[] = AGENT_GROUPS.flatMap((g) => g.agents);
