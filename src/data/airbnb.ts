// Agente para anfitriones de Airbnb. Sale del caso de Estudio Índigo (apartamentos en El Retiro, Antioquia).
// Aquí solo va lo que ya funciona hoy: sin precios, sin cifras prometidas, sin datos del cliente.

export const AIRBNB_PATH = '/agente-airbnb';

export const AIRBNB_TITLE = 'Agente de IA para anfitriones de Airbnb | Ai4U';
export const AIRBNB_DESCRIPTION =
  'Un agente que acompaña cada reserva de Airbnb: mensajes a los huéspedes, registro, aseo y reportes para el propietario.';

export interface Momento { cuando: string; titulo: string; texto: string }
export interface Capacidad { titulo: string; texto: string }

// El recorrido de una reserva: lo que el agente hace por ti en cada punto.
export const MOMENTOS: Momento[] = [
  { cuando: 'Al reservar', titulo: 'Bienvenida', texto: 'En minutos el huésped recibe un saludo con lo esencial de su estadía.' },
  { cuando: 'Días antes', titulo: 'Registro', texto: 'Le pide el documento y los datos de viaje, con un enlace sencillo desde el celular.' },
  { cuando: 'La víspera', titulo: 'Cómo llegar', texto: 'Indicaciones de llegada, parqueadero y la guía de la casa, sin que tengas que escribir nada.' },
  { cuando: 'Día de llegada', titulo: 'Check-in', texto: 'Mensaje a la hora justa; los códigos de acceso solo salen cuando el registro está completo.' },
  { cuando: 'Durante la estadía', titulo: 'Preguntas', texto: 'Responde lo de siempre, como wifi, parqueadero y recomendaciones. Lo que no sabe te lo pasa a ti.' },
  { cuando: 'La víspera de salir', titulo: 'Salida', texto: 'Recuerda la hora y cómo dejar el apartamento, y avisa al equipo de aseo.' },
  { cuando: 'Después', titulo: 'Gracias y reseña', texto: 'Un mensaje de agradecimiento que invita a dejar su reseña.' },
];

export const CAPACIDADES: Capacidad[] = [
  { titulo: 'Mensajes con tu voz', texto: 'Siete mensajes programados y una biblioteca de respuestas rápidas, escritos con el tono de tu casa y firmados por tu equipo.' },
  { titulo: 'Portal del huésped', texto: 'Una página propia por apartamento, a la que se entra con el celular: guía de la casa, reglas, mapa y códigos solo cuando corresponde.' },
  { titulo: 'Registro de viajeros', texto: 'Lee el documento con IA, ordena los datos y prepara el registro de turismo, que se envía después de tu revisión. Para extranjeros deja lista la hoja de captura.' },
  { titulo: 'Aseo sin llamadas', texto: 'Cuando alguien sale, el equipo de aseo recibe el aviso en Slack con un calendario. Confirman con un emoji y, si no lo hacen, el agente insiste.' },
  { titulo: 'Calendario al día', texto: 'Sincroniza las reservas de cada apartamento, incluidas las cancelaciones, y las muestra día a día con los festivos de Colombia.' },
  { titulo: 'Cuentas claras', texto: 'Ocupación, ingresos y tarifa promedio por apartamento; gastos; y la liquidación al propietario con un informe mensual que incluye las reseñas.' },
];

// Lo que el agente nunca decide solo.
export const CONTROLES: string[] = [
  'Los precios y las reservas los decides tú. El agente solo lee las tarifas para mostrarte métricas.',
  'Si un huésped pregunta algo que no está en tu guía, el agente no inventa: te avisa a ti o a tu equipo.',
  'El registro de turismo se envía solo después de que lo revisas y lo confirmas, y queda un historial de cada envío.',
  'Los códigos de acceso solo se muestran con el registro completo y a la hora del check-in.',
  'Los documentos de los huéspedes se guardan en un almacenamiento privado, no en un chat.',
];

export const AIRBNB_FAQ = [
  {
    question: '¿Es una integración oficial con Airbnb?',
    answer: 'No. Airbnb no ofrece una conexión abierta para esto, así que el agente trabaja con lo que sí existe: los mensajes programados y las respuestas rápidas de tu cuenta, el calendario de cada anuncio y los correos de confirmación que Airbnb te envía. Ai4U no es socio ni representante de Airbnb.',
  },
  {
    question: '¿Puede escribirle a mis huéspedes sin que yo lo sepa?',
    answer: 'Los mensajes los definimos contigo antes de activarlos, con tu tono y tu firma. Salen en los momentos acordados y nada se envía por fuera de ese recorrido. Lo que el agente no sabe responder te lo pasa a ti.',
  },
  {
    question: '¿Qué pasa con el registro de turismo y los datos de los huéspedes?',
    answer: 'El agente lee el documento, organiza los datos y prepara el registro. El envío requiere tu revisión y queda auditado. Los documentos se guardan en un almacenamiento privado y los datos se usan solo para ese registro.',
  },
  {
    question: '¿Sirve si tengo un solo apartamento?',
    answer: 'Sí. Está pensado para cualquier anfitrión que se canse de contestar lo mismo, desde un apartamento hasta varios en una misma ciudad. Lo configuramos según cuántos tengas y cómo trabajes.',
  },
  {
    question: '¿Cuánto cuesta y cuánto tarda en estar listo?',
    answer: 'Depende de cuántos apartamentos tengas y de qué partes del recorrido quieras automatizar. Empezamos con un diagnóstico sin costo para definir el alcance y ahí te cotizamos a la medida.',
  },
  {
    question: '¿Funciona con Booking u otras plataformas?',
    answer: 'Hoy está construido sobre Airbnb. El calendario puede sincronizarse con cualquier plataforma que publique un enlace iCal, pero los mensajes y el resto del recorrido los hemos probado solo en Airbnb.',
  },
];
