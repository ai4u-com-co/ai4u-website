import { ALL_AGENTS } from './agents';

// Preguntas frecuentes (octubre 2026). Cada respuesta empieza con la respuesta directa, en una frase,
// para que un buscador, un asistente de IA o una persona la pueda citar tal cual. Solo hechos que el sitio
// ya publica: sin precios, sin cifras que no podamos medir y sin nombres de clientes que no hayan autorizado.
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    id: 'que-es-ai4u',
    question: '¿Qué es Ai4U?',
    answer:
      'Ai4U es una empresa colombiana, con sede en Medellín, que pone inteligencia artificial a trabajar en la operación de otras empresas. Los agentes hacen el trabajo repetitivo, los dashboards muestran cómo va todo y lo que no existe se construye a tu medida. Trabajan las 24 horas y una persona revisa lo que importa.',
  },
  {
    id: 'que-es-un-agente',
    question: '¿Qué es un agente de IA?',
    answer: `Un agente de IA es un software que hace un trabajo concreto por su cuenta, como leer los pedidos que llegan por correo, cobrar la cartera o responder mensajes, mientras una persona revisa lo que importa. Ai4U tiene ${ALL_AGENTS.length} agentes en su catálogo, agrupados por área.`,
  },
  {
    id: 'que-hace-orderloader',
    question: '¿Qué hace orderLoader?',
    answer:
      'orderLoader lee el pedido que llega por correo y lo crea en tu sistema, sin digitación manual. Está en producción en dos plantas, las 24 horas, y una persona revisa los casos dudosos.',
  },
  {
    id: 'chat-con-tu-empresa',
    question: '¿Qué es «Chatea con tu empresa»?',
    answer:
      'Es un chat conectado a tus bases de datos y a tu sistema de gestión. Le hablas como a una persona y consulta y actúa sobre tus datos en tiempo real, sin pedirle nada a nadie ni esperar un reporte. Las respuestas salen de los datos de tu empresa.',
  },
  {
    id: 'reemplaza-a-mi-equipo',
    question: '¿Los agentes reemplazan a mi equipo?',
    answer:
      'No. Los agentes hacen el trabajo repetitivo y una persona revisa lo que importa. Tú decides cuánta supervisión quieres: que el agente proponga, que ejecute y una persona revise lo dudoso, o que trabaje solo y avise cuando hay una excepción.',
  },
  {
    id: 'cambiar-sistemas',
    question: '¿Tengo que cambiar mis sistemas?',
    answer:
      'No. Los agentes y los dashboards se conectan a lo que ya usas: tu sistema de gestión, tu correo y WhatsApp. No migras datos ni cambias tu forma de trabajar.',
  },
  {
    id: 'cuanto-cuesta',
    question: '¿Cuánto cuesta?',
    answer:
      'Depende de tu caso, por eso empezamos con un diagnóstico sin costo. Después cotizamos a la medida de lo que se va a construir. No tenemos precios de lista.',
  },
  {
    id: 'no-existe',
    question: '¿Y si lo que necesito no existe?',
    answer:
      'Lo construimos a tu medida. Si ya hay un agente o un dashboard que lo resuelve, lo usamos; si no, empezamos por el proceso que más tiempo te cuesta y lo dejamos funcionando.',
  },
  {
    id: 'como-trabajamos',
    question: '¿Cómo trabajan con un cliente nuevo?',
    answer:
      'En cuatro pasos: diagnóstico, construcción, puesta en marcha y mantenimiento. Entendemos tu operación y escogemos lo que más tiempo te cuesta, lo armamos contigo, entra a trabajar con una persona revisando lo que importa y después lo mantenemos y lo mejoramos.',
  },
  {
    id: 'sitios-web',
    question: '¿Hacen sitios web?',
    answer:
      'Sí. Hacemos sitios y tiendas con diseño propio, de dos tipos: landing, sin backend, y sitios con backend, con formulario, base de datos y lógica propia. Se entregan en unos 14 días y se cotizan por WhatsApp.',
  },
  {
    id: 'a-quien-atienden',
    question: '¿A qué empresas atiende Ai4U?',
    answer:
      'A empresas medianas con operación repetitiva: pedidos, cartera, producción y atención al cliente. Ya trabajan con agentes de Ai4U empresas de manufactura, contenido, hospitalidad y salud.',
  },
  {
    id: 'mantenimiento',
    question: '¿Quién mantiene lo que construyen?',
    answer: 'Nosotros. Lo mantenemos funcionando y lo mejoramos con tu operación.',
  },
  {
    id: 'como-empiezo',
    question: '¿Cómo empiezo?',
    answer:
      'Cuéntanos qué tarea te quita más tiempo, por WhatsApp al +57 302 490 6414 o por correo a hola@ai4u.com.co. Te decimos qué agente la resolvería, o qué construiríamos a tu medida si no existe.',
  },
  {
    id: 'donde-estan',
    question: '¿Dónde está Ai4U?',
    answer: 'En Medellín, Colombia. Trabajamos con empresas en Colombia.',
  },
];
