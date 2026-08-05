export type AgentStatus = 'produccion' | 'piloto' | 'interno';

export interface Agent {
  name: string;
  category: string;
  pitch: string;
  status: AgentStatus;
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
export const AGENT_GROUPS: AgentGroup[] = [
  {
    id: 'tickets',
    label: 'tickets y soporte',
    agents: [
      {
        name: 'resolver con IA',
        category: 'tickets',
        pitch: 'convierte un reporte de un cliente en diagnóstico, plan, código y una respuesta en español — con una persona revisando cada paso.',
        status: 'produccion',
      },
      {
        name: 'whatsapp tickets',
        category: 'tickets',
        pitch: 'recibe reportes por whatsapp y los convierte en tickets priorizados, sin que nadie tenga que copiar y pegar nada.',
        status: 'produccion',
      },
      {
        name: 'reparador nocturno',
        category: 'tickets',
        pitch: 'revisa los errores de producción cada noche y deja el fix listo para revisar en la mañana.',
        status: 'piloto',
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
        pitch: 'responde en lenguaje natural sobre inventario, cartera, ventas y producción — consultando tu sistema en vivo.',
        status: 'produccion',
      },
      {
        name: 'asistente del panel',
        category: 'servicio',
        pitch: 'el copiloto que vive dentro de tu propio dashboard, siempre con el estado real de tu operación.',
        status: 'produccion',
      },
      {
        name: 'multicanal',
        category: 'servicio',
        pitch: 'atiende conversaciones en varios canales a la vez, sin perder contexto entre uno y otro.',
        status: 'produccion',
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
        pitch: 'lee los pedidos que llegan por correo en PDF y los carga directo a tu ERP, sin digitación manual.',
        status: 'produccion',
      },
      {
        name: 'cobro de cartera',
        category: 'operacion',
        pitch: 'manda los recordatorios de cartera vencida solo, con la cadencia que definas.',
        status: 'produccion',
      },
      {
        name: 'cotizador',
        category: 'operacion',
        pitch: 'cotiza al instante y deja la cotización lista en tu sistema, sin ir y volver por correo.',
        status: 'produccion',
      },
      {
        name: 'planeador de producción',
        category: 'operacion',
        pitch: 'ordena las órdenes de producción por máquina, sincronizado con lo que ya está en tu ERP.',
        status: 'piloto',
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
        pitch: 'genera piezas de contenido con la voz de tu marca, no una genérica.',
        status: 'produccion',
      },
      {
        name: 'escucha social',
        category: 'contenido',
        pitch: 'monitorea qué se dice de tu marca y arma el informe solo.',
        status: 'produccion',
      },
      {
        name: 'prospección fría',
        category: 'contenido',
        pitch: 'inicia y da seguimiento a conversaciones de prospección, sin que nadie tenga que escribir el primer mensaje.',
        status: 'piloto',
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
        pitch: 'el equipo de agentes que diseña, construye, revisa y prueba cada uno de los que ves acá arriba.',
        status: 'interno',
      },
    ],
  },
];

export const ALL_AGENTS: Agent[] = AGENT_GROUPS.flatMap((g) => g.agents);
