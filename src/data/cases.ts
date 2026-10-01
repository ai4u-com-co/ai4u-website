// Casos de clientes (octubre 2026). Una frase general por cliente: sin cifras, sin precios y sin detalle de
// su operación — este repositorio es público. Los logos y el permiso de cada cliente para mostrar su caso
// están pendientes; hoy se muestra solo el nombre, el sector y una línea.
export interface CaseStudy {
  id: string;
  name: string;
  sector: string;
  /** Una sola frase, en general: qué hace Ai4U con ellos. */
  resumen: string;
  website?: string;
}

export const CASES: CaseStudy[] = [
  {
    id: 'tamaprint',
    name: 'Tamaprint',
    sector: 'Manufactura',
    resumen: 'Pedidos y cartera que corren solos, y dashboards para ver cómo va la operación.',
    website: 'https://www.tamaprint.com',
  },
  {
    id: 'flexoimpresos',
    name: 'Flexoimpresos',
    sector: 'Manufactura',
    resumen: 'Planta, entregas y cartera a la vista, con los pedidos entrando solos.',
    website: 'https://www.flexoimpresos.com.co',
  },
  {
    id: 'la-magdalena',
    name: 'La Magdalena',
    sector: 'Storytelling de impacto',
    resumen: 'Contenido, escucha de la marca y un chat que conoce su obra.',
    website: 'https://www.lamagdalena.com.co',
  },
  {
    id: 'estudio-indigo',
    name: 'Estudio Índigo',
    sector: 'Hospitalidad',
    resumen: 'Atención a huéspedes a cualquier hora.',
  },
  {
    id: 'multihealth',
    name: 'Multihealth',
    sector: 'Salud y bienestar',
    resumen: 'Atención por WhatsApp a cualquier hora.',
  },
];
