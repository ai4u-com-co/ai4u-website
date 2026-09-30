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
    description: 'Un agente lee los correos de los clientes y crea los pedidos en SAP, sin digitación. La capa de inteligencia opera 24/7 en plantas de manufactura reales.',
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
  {
    id: 'rascal',
    title: 'Rascal',
    description: 'Ecosistema digital de movilidad eléctrica.',
    image: '/assets/images/cases/screenshots/rascal.png',
    link: 'https://rascal-three.vercel.app/',
    category: 'eMobility'
  },
  {
    id: 'ebook-apasofirme',
    title: 'A Paso Firme',
    description: 'Coaching y neurociencia para desarrollo personal.',
    image: '/assets/images/cases/screenshots/ebook-apasofirme.png',
    link: 'http://ebookapasofirme.com/',
    category: 'bienestarYEducacion'
  },
  {
    id: 'dream-house',
    title: 'DreamHouse AI',
    description: 'Renders arquitectónicos con IA en segundos.',
    image: '/assets/images/cases/screenshots/dream-house.png',
    link: 'https://dream-house-liard.vercel.app/',
    category: 'arquitecturaYDiseno'
  },
  {
    id: 'true-vton',
    title: 'CoutureLab / True VTON',
    description: 'Probadores virtuales y diseño generativo de moda.',
    image: '/assets/images/cases/screenshots/true-vton.png',
    link: 'https://true-vton.vercel.app/',
    category: 'fashionTech'
  },
  {
    id: 'flyer-studio',
    title: 'Flyer Studio',
    description: 'Piezas gráficas para eventos con IA.',
    image: '/assets/images/cases/screenshots/flyer-studio.png',
    link: 'https://flyer-studio-phi.vercel.app/',
    category: 'eventosYBranding'
  },
  {
    id: 'gourmet-ai',
    title: 'VisualFeast / Gourmet AI',
    description: 'Visualización gastronómica con IA.',
    image: '/assets/images/cases/screenshots/gourmet-ai.png',
    link: 'https://gourmet-ai-ten.vercel.app/',
    category: 'gastronomia'
  }
];
