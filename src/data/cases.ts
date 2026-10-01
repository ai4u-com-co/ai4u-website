// Casos de clientes (octubre 2026). Historias cualitativas: sin cifras, sin precios y sin datos
// internos de cada cliente — este repositorio es público. Los logos y el permiso de cada cliente
// para mostrar su caso están pendientes; hoy se muestra solo el nombre.
export interface CaseStudy {
  id: string;
  name: string;
  sector: string;
  problema: string;
  hicimos: string;
  hoy: string;
  /** Nombres tal como aparecen en el catálogo de agentes (src/data/agents.ts). */
  agentes: string[];
  website?: string;
}

export const CASES: CaseStudy[] = [
  {
    id: 'tamaprint',
    name: 'Tamaprint',
    sector: 'Manufactura',
    problema: 'Los pedidos de sus clientes llegaban por correo en PDF y alguien tenía que digitarlos uno por uno. La cartera vencida se cobraba a mano.',
    hicimos: 'Un agente lee cada pedido y lo carga en el sistema. Otro envía los recordatorios de cartera con la cadencia que ellos definen. Un cotizador deja la cotización lista al instante.',
    hoy: 'Los pedidos entran solos, una persona revisa lo dudoso y el equipo comercial cotiza sin ir y volver por correo.',
    agentes: ['lector de pedidos', 'cobro de cartera', 'cotizador'],
    website: 'https://www.tamaprint.com',
  },
  {
    id: 'flexoimpresos',
    name: 'Flexoimpresos',
    sector: 'Manufactura',
    problema: 'Programar la planta y saber si se estaban cumpliendo las entregas exigía armar reportes y coordinar a mano.',
    hicimos: 'Un planeador ordena las órdenes de producción por máquina, con una pantalla junto a cada una. Dashboards de ventas, cartera y cumplimiento de entregas. Además, el agente de pedidos y el de cobro de cartera.',
    hoy: 'Cada máquina muestra lo que sigue y la gerencia ve cómo va la empresa sin pedir reportes.',
    agentes: ['lector de pedidos', 'planeador de producción', 'cobro de cartera'],
    website: 'https://www.flexoimpresos.com.co',
  },
  {
    id: 'la-magdalena',
    name: 'La Magdalena',
    sector: 'Storytelling de impacto',
    problema: 'Producir contenido constante, escuchar lo que se dice de la marca y transcribir horas de audio le quitaba tiempo al trabajo creativo.',
    hicimos: 'Una fábrica de contenido con la voz de la marca, escucha social, un transcriptor que identifica quién dijo qué, y un sitio web con un chat que conoce la obra.',
    hoy: 'El equipo dedica su tiempo a crear y el resto corre solo.',
    agentes: ['fábrica de contenido', 'escucha social', 'transcriptor'],
    website: 'https://www.lamagdalena.com.co',
  },
  {
    id: 'estudio-indigo',
    name: 'Estudio Índigo',
    sector: 'Hospitalidad',
    problema: 'Atender a los huéspedes a cualquier hora, mantener los calendarios al día y coordinar el aseo de cada apartamento.',
    hicimos: 'Un agente responde los mensajes de los huéspedes, sincroniza los calendarios de las plataformas de reserva y avisa al equipo de aseo.',
    hoy: 'Los huéspedes reciben respuesta a cualquier hora y el equipo interviene solo cuando hace falta una persona.',
    agentes: ['agente de huéspedes'],
  },
  {
    id: 'multihealth',
    name: 'Multihealth',
    sector: 'Salud y bienestar',
    problema: 'Los clientes escribían por WhatsApp con preguntas que el equipo respondía una por una.',
    hicimos: 'Un chatbot de WhatsApp que responde con la información de la empresa y pasa a una persona lo que no sabe.',
    hoy: 'Atienden a cualquier hora y el equipo se enfoca en las conversaciones que lo requieren.',
    agentes: ['multicanal'],
  },
];
