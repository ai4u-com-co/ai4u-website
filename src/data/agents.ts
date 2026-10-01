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
// Estado: por decisión de Mariano (oct-2026) todo el catálogo se muestra como listo ("produccion").
// Excepción deliberada: las 4 ideas que todavía no existen (cierre mensual, reposición de inventario,
// seguimiento de cotizaciones y resumen semanal) quedan como "piloto" hasta que estén construidas,
// para no prometer en público algo que un cliente no puede usar hoy.
export const AGENT_GROUPS: AgentGroup[] = [
  {
    id: 'pedidos',
    label: 'pedidos, compras y datos',
    agents: [
      {
        name: 'lector de pedidos',
        category: 'pedidos',
        clase: 'back office',
        nivel: 3,
        pitch: 'lee los pedidos que llegan por correo en PDF y los carga directo a tu ERP, sin digitación manual.',
        status: 'produccion',
        atributos: { autonomia: 85, velocidad: 65, alcance: 50 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'cotizador',
        category: 'pedidos',
        clase: 'vendedor',
        nivel: 3,
        pitch: 'cotiza al instante y deja la cotización lista en tu sistema, sin ir y volver por correo.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 92, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'lector de facturas de proveedor',
        category: 'pedidos',
        clase: 'contador',
        nivel: 2,
        pitch: 'lee las facturas que te envían tus proveedores y las deja listas para contabilizar.',
        status: 'produccion',
        atributos: { autonomia: 80, velocidad: 70, alcance: 45 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'órdenes de compra',
        category: 'pedidos',
        clase: 'comprador',
        nivel: 2,
        pitch: 'arma la orden de compra para tu proveedor a partir de lo que necesitas reponer.',
        status: 'produccion',
        atributos: { autonomia: 70, velocidad: 75, alcance: 45 },
        tools: ['sap'],
      },
      {
        name: 'alta de clientes',
        category: 'pedidos',
        clase: 'registrador',
        nivel: 2,
        pitch: 'crea al cliente nuevo en tu sistema con sus datos tributarios, sin digitar.',
        status: 'produccion',
        atributos: { autonomia: 80, velocidad: 85, alcance: 35 },
        tools: ['sap'],
      },
      {
        name: 'creación de artículos',
        category: 'pedidos',
        clase: 'ingeniero de producto',
        nivel: 2,
        pitch: 'crea el artículo nuevo y su lista de materiales según la tecnología, sin armarlo a mano.',
        status: 'produccion',
        atributos: { autonomia: 60, velocidad: 80, alcance: 55 },
        tools: ['sap'],
      },
    ],
  },
  {
    id: 'cobros',
    label: 'cobros y finanzas',
    agents: [
      {
        name: 'cobro de cartera',
        category: 'cobros',
        clase: 'cobrador',
        nivel: 3,
        pitch: 'manda los recordatorios de cartera vencida solo, con la cadencia que definas.',
        status: 'produccion',
        atributos: { autonomia: 90, velocidad: 55, alcance: 45 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'conciliación bancaria',
        category: 'cobros',
        clase: 'auditor',
        nivel: 2,
        pitch: 'cruza los movimientos del banco con tus registros y marca solo lo que no cuadra.',
        status: 'produccion',
        atributos: { autonomia: 70, velocidad: 75, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'cierre mensual',
        category: 'cobros',
        clase: 'analista',
        nivel: 1,
        pitch: 'prepara el cierre del mes y señala las diferencias que una persona debe revisar.',
        status: 'piloto',
        atributos: { autonomia: 55, velocidad: 60, alcance: 60 },
        tools: ['sap'],
      },
    ],
  },
  {
    id: 'tableros',
    label: 'tableros y alertas',
    agents: [
      {
        name: 'chat con tu empresa',
        category: 'tableros',
        clase: 'oráculo',
        nivel: 3,
        pitch: 'un chat conectado a tus bases de datos y a tu sistema de gestión: le hablas como a una persona y consulta y actúa sobre tus datos en tiempo real.',
        status: 'produccion',
        atributos: { autonomia: 65, velocidad: 80, alcance: 70 },
        tools: ['sap'],
      },
      {
        name: 'asistente del panel',
        category: 'tableros',
        clase: 'copiloto',
        nivel: 2,
        pitch: 'el copiloto que vive dentro de tu propio tablero, siempre con el estado real de tu operación.',
        status: 'produccion',
        atributos: { autonomia: 55, velocidad: 85, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'tablero de ventas',
        category: 'tableros',
        clase: 'analista',
        nivel: 3,
        pitch: 'ventas por cliente, vendedor y mes, y comparativos con el año anterior, sin pedir reportes.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 85, alcance: 60 },
        tools: ['sap'],
      },
      {
        name: 'tablero de cartera',
        category: 'tableros',
        clase: 'analista',
        nivel: 3,
        pitch: 'quién debe, cuánto y desde cuándo, ordenado por lo que más pesa.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 85, alcance: 55 },
        tools: ['sap'],
      },
      {
        name: 'tablero de finanzas',
        category: 'tableros',
        clase: 'analista',
        nivel: 2,
        pitch: 'estado de resultados y principales cuentas al día, con el detalle a un clic.',
        status: 'produccion',
        atributos: { autonomia: 70, velocidad: 80, alcance: 60 },
        tools: ['sap'],
      },
      {
        name: 'producción en planta',
        category: 'tableros',
        clase: 'jefe de planta',
        nivel: 3,
        pitch: 'qué se está produciendo y qué va atrasado, también en pantallas junto a cada máquina.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 85, alcance: 65 },
        tools: ['sap'],
      },
      {
        name: 'cumplimiento de entregas',
        category: 'tableros',
        clase: 'auditor',
        nivel: 2,
        pitch: 'compara lo prometido con lo entregado, por línea de producto.',
        status: 'produccion',
        atributos: { autonomia: 80, velocidad: 70, alcance: 50 },
        tools: ['sap'],
      },
      {
        name: 'alertas',
        category: 'tableros',
        clase: 'vigía',
        nivel: 2,
        pitch: 'avisa cuando una cifra se sale de lo normal para que alguien actúe a tiempo.',
        status: 'produccion',
        atributos: { autonomia: 85, velocidad: 75, alcance: 45 },
        tools: ['sap', 'whatsapp'],
      },
    ],
  },
  {
    id: 'planta',
    label: 'producción y planta',
    agents: [
      {
        name: 'planeador de producción',
        category: 'planta',
        clase: 'logístico',
        nivel: 2,
        pitch: 'ordena las órdenes de producción por máquina, sincronizado con lo que ya está en tu ERP.',
        status: 'produccion',
        atributos: { autonomia: 50, velocidad: 60, alcance: 65 },
        tools: ['sap'],
      },
      {
        name: 'revisor de artes',
        category: 'planta',
        clase: 'preprensa',
        nivel: 2,
        pitch: 'revisa el arte antes de producir y avisa si hay algo que corregir.',
        status: 'produccion',
        atributos: { autonomia: 65, velocidad: 80, alcance: 45 },
        tools: [],
      },
      {
        name: 'reposición de inventario',
        category: 'planta',
        clase: 'comprador',
        nivel: 1,
        pitch: 'sugiere cuánto y cuándo comprar según lo que tienes y lo que se vende.',
        status: 'piloto',
        atributos: { autonomia: 55, velocidad: 65, alcance: 55 },
        tools: ['sap'],
      },
    ],
  },
  {
    id: 'servicio',
    label: 'atención y servicio',
    agents: [
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
      {
        name: 'agente de huéspedes',
        category: 'servicio',
        clase: 'anfitrión',
        nivel: 2,
        pitch: 'responde los mensajes de tus huéspedes, coordina el aseo y mantiene los calendarios al día.',
        status: 'produccion',
        atributos: { autonomia: 80, velocidad: 80, alcance: 50 },
        tools: [],
      },
      {
        name: 'sabio de tu marca',
        category: 'servicio',
        clase: 'guía',
        nivel: 2,
        pitch: 'un chat dentro de tu sitio web que responde con la voz y el conocimiento de tu marca.',
        status: 'produccion',
        atributos: { autonomia: 75, velocidad: 85, alcance: 40 },
        tools: [],
      },
      {
        name: 'whatsapp tickets',
        category: 'servicio',
        clase: 'mesa de entrada',
        nivel: 2,
        pitch: 'recibe reportes por whatsapp y los convierte en tickets priorizados, sin que nadie tenga que copiar y pegar nada.',
        status: 'produccion',
        atributos: { autonomia: 82, velocidad: 74, alcance: 40 },
        tools: ['whatsapp'],
      },
      {
        name: 'resolver con IA',
        category: 'servicio',
        clase: 'diagnosticador',
        nivel: 3,
        pitch: 'convierte un reporte de un cliente en diagnóstico, plan, código y una respuesta en español — con una persona revisando cada paso.',
        status: 'produccion',
        atributos: { autonomia: 70, velocidad: 88, alcance: 55 },
        tools: ['github'],
      },
    ],
  },
  {
    id: 'contenido',
    label: 'contenido y ventas',
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
        status: 'produccion',
        atributos: { autonomia: 65, velocidad: 58, alcance: 40 },
        tools: ['linkedin'],
      },
      {
        name: 'transcriptor',
        category: 'contenido',
        clase: 'escriba',
        nivel: 2,
        pitch: 'convierte audios y reuniones largas en texto, con quién dijo qué y a qué hora.',
        status: 'produccion',
        atributos: { autonomia: 85, velocidad: 75, alcance: 35 },
        tools: [],
      },
      {
        name: 'seguimiento de cotizaciones',
        category: 'contenido',
        clase: 'cazador',
        nivel: 1,
        pitch: 'busca a quien no respondió una cotización y le da seguimiento a tiempo.',
        status: 'piloto',
        atributos: { autonomia: 65, velocidad: 60, alcance: 40 },
        tools: ['gmail', 'sap'],
      },
      {
        name: 'resumen semanal',
        category: 'contenido',
        clase: 'analista',
        nivel: 1,
        pitch: 'cada lunes envía a gerencia un resumen de las cifras que importan, por correo.',
        status: 'piloto',
        atributos: { autonomia: 80, velocidad: 70, alcance: 45 },
        tools: ['gmail', 'sap'],
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
      {
        name: 'reparador nocturno',
        category: 'fabrica-dev',
        clase: 'guardia',
        nivel: 1,
        pitch: 'revisa los errores de producción cada noche y deja el arreglo listo para revisar en la mañana.',
        status: 'produccion',
        atributos: { autonomia: 60, velocidad: 52, alcance: 34 },
        tools: ['github'],
      },
    ],
  },
];

export const ALL_AGENTS: Agent[] = AGENT_GROUPS.flatMap((g) => g.agents);
