// Sitios que hemos construido (se muestran en /sitios-web y alimentan los datos estructurados).
export interface SitioWeb { name: string; desc: string; url: string; label: string; image: string }

export const SITES: SitioWeb[] = [
  {
    name: 'La Magdalena',
    desc: 'Estudio de storytelling de impacto social y ambiental.',
    url: 'https://www.lamagdalena.com.co',
    label: 'lamagdalena.com.co',
    image: '/assets/images/cases/screenshots/lamagdalena-site.webp',
  },
  {
    name: 'Catalina Romero',
    desc: 'Portafolio de dirección de arte, estilismo y narrativa visual.',
    url: 'https://cromero.vercel.app/',
    label: 'cromero.vercel.app',
    image: '/assets/images/cases/screenshots/cromero-site.webp',
  },
  {
    name: 'Nakoa',
    desc: 'Perfumería de autor: lo invisible del territorio, en frasco.',
    url: 'https://nakoa-web.vercel.app/',
    label: 'nakoa-web.vercel.app',
    image: '/assets/images/cases/screenshots/nakoa-site.webp',
  },
];
