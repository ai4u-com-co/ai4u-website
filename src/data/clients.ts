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
    logo: '',
    sector: 'Hospitalidad'
  },
  {
    id: 'multihealth',
    name: 'Multihealth',
    website: '',
    logo: '',
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