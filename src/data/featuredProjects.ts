export interface FeaturedProject {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
}

export const featuredProjects: FeaturedProject[] = [
  // TODO(mariano): reemplazar imagen por screenshot real del producto (data anonimizada)
  {
    id: 'orderloader',
    title: 'orderLoader',
    description: 'Un agente lee los correos de los clientes y crea los pedidos en tu sistema, sin digitación. La capa de inteligencia opera 24/7 en plantas de manufactura reales.',
    image: '/assets/images/cases/screenshots/ai4u.png',
    link: 'https://www.ai4u.com.co/orderloader',
    category: 'manufactura'
  },
  {
    id: 'la-magdalena',
    title: 'La Magdalena',
    description: 'Storytelling de impacto social y ambiental.',
    image: '/assets/images/cases/screenshots/la-magdalena.png',
    link: 'https://www.lamagdalena.com.co',
    category: 'impactStorytelling'
  },
];
