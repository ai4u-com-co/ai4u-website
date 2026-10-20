export interface Client {
  id: string;
  name: string;
  website: string;
  logo: string;
  sector: string;
}

export const clients: Client[] = [
  {
    id: 'la-magdalena',
    name: 'La Magdalena',
    website: 'https://www.lamagdalena.com.co',
    logo: '/assets/images/cases/logo-magdalena.png',
    sector: 'Impact Storytelling'
  },
  {
    id: 'tamaprint',
    name: 'Tamaprint',
    website: 'https://www.tamaprint.com',
    logo: '/assets/images/cases/logo-tamaprint.png',
    sector: 'Manufactura'
  },
  {
    id: 'flexoimpresos',
    name: 'Flexoimpresos',
    website: 'https://www.flexoimpresos.com.co',
    logo: '/assets/images/cases/logo-flexoimpresos.png',
    sector: 'Manufactura'
  },
  {
    id: 'true',
    name: 'True',
    website: 'https://www.trueshop.co',
    logo: '/assets/images/cases/logo-true.png',
    sector: 'Fashion'
  },
  {
    id: 'hua-naturals',
    name: 'HUA Naturals',
    website: 'https://www.huanaturals.com',
    logo: '/assets/images/cases/logo-hua-naturals.png',
    sector: 'Reality-Hacking'
  },
  {
    id: 'estudio-indigo',
    name: 'Estudio Índigo',
    website: '',
    logo: '/assets/images/cases/logo-estudio-indigo.svg',
    sector: 'Hospitalidad'
  },
  {
    id: 'multihealth',
    name: 'Multihealth',
    website: 'https://multyhealth.com',
    logo: '/assets/images/cases/logo-multihealth.svg',
    sector: 'Salud y bienestar'
  },
  {
    id: 'ai4u',
    name: 'AI4U',
    website: 'https://www.ai4u.com.co',
    logo: '/assets/images/ai4u-logo.png',
    sector: 'IA & Automatización'
  }
];