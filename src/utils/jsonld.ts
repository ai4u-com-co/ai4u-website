// Datos estructurados (schema.org) de todo el sitio, en un solo lugar. Cada página recibe un @graph con
// la organización, el sitio, la página y su ruta de migas; las páginas con contenido propio suman su entidad
// (catálogo de agentes, aplicación orderLoader, preguntas frecuentes...). Solo hechos que el sitio publica.
import { SEO_PAGES_ALL } from '../data/allSeoPages';
import { AGENT_PAGES, agentFaq } from '../data/agentPages';
import { ALL_AGENTS } from '../data/agents';
import { CASES } from '../data/cases';
import { SITES } from '../data/sitiosWeb';
import { FAQ } from '../data/faq';
import { SOCIAL_LINKS } from '../data/siteLinks';

export const SITE_URL = 'https://www.ai4u.com.co';
export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface SeoPage {
  path: string;
  name: string;
  title: string;
  description: string;
  type: string;
  priority: number;
  sitemap: boolean;
}
// Páginas estáticas (src/data/seoPages.json) + una por agente (src/data/agentPages.ts)
export const SEO_PAGES = SEO_PAGES_ALL as SeoPage[];
const agentOf = (path: string) => {
  const ap = AGENT_PAGES.find(p => p.path === path);
  return ap ? ALL_AGENTS.find(a => a.name === ap.agentName) : undefined;
};

export const pageUrl = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);
export const getSeoPage = (path: string): SeoPage => {
  const p = SEO_PAGES.find(x => x.path === path);
  if (!p) throw new Error(`Página sin registrar en src/data/seoPages.json: ${path}`);
  return p;
};

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const SERVICES = [
  { name: 'Agentes de IA', description: 'Agentes que hacen el trabajo repetitivo: leen pedidos y facturas, cobran la cartera y responden mensajes.' },
  { name: 'Dashboards y chat con tu empresa', description: 'Ventas, cartera, producción y cumplimiento en un solo lugar, y un chat conectado a tus datos que responde en tiempo real.' },
  { name: 'Software y automatizaciones a la medida', description: 'Lo que no existe, lo construimos: software y automatizaciones pensados para tu operación.' },
  { name: 'Sitios web y tiendas', description: 'Sitios y tiendas con diseño propio, hechos para trabajar por ti.' },
];

export const organizationNode = () => ({
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'Ai4U',
  alternateName: ['AI4U', 'Artificial Intelligence 4 You'],
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/assets/images/isotipo-negro.png`, width: 1620, height: 1620 },
  image: `${SITE_URL}/assets/images/whatsapp-share.png`,
  description: 'Ai4U pone inteligencia artificial a trabajar en la operación de tu empresa: agentes que hacen el trabajo repetitivo, dashboards que muestran cómo va todo y software a tu medida.',
  slogan: 'Recupera tu tiempo',
  foundingDate: '2023',
  founder: { '@type': 'Person', name: 'Mariano', jobTitle: 'Fundador', url: 'https://www.linkedin.com/in/mariano3/' },
  address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressRegion: 'Antioquia', addressCountry: 'CO' },
  contactPoint: [{
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+57 302 490 6414',
    email: 'hola@ai4u.com.co',
    availableLanguage: ['es'],
    areaServed: 'CO',
  }],
  sameAs: SOCIAL_LINKS.map(s => s.url),
  areaServed: { '@type': 'Country', name: 'Colombia' },
  knowsAbout: ['Inteligencia artificial', 'Agentes de IA', 'Automatización de procesos', 'Dashboards de gestión', 'Desarrollo de software a la medida', 'Sitios web'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Qué hace Ai4U',
    itemListElement: SERVICES.map(s => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.name, description: s.description } })),
  },
});

export const websiteNode = () => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: 'Ai4U',
  url: `${SITE_URL}/`,
  inLanguage: 'es-CO',
  publisher: { '@id': ORG_ID },
});

export const breadcrumbNode = (path: string) => {
  if (path === '/') return null;
  const page = getSeoPage(path);
  const crumbs = [{ name: 'Inicio', url: `${SITE_URL}/` }];
  if (agentOf(path)) crumbs.push({ name: 'Agentes', url: pageUrl('/agentes') });
  crumbs.push({ name: page.name, url: pageUrl(path) });
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(path)}#breadcrumb`,
    itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.url })),
  };
};

const faqFor = (path: string): { question: string; answer: string }[] => {
  if (path === '/preguntas-frecuentes') return FAQ;
  const agent = agentOf(path);
  return agent ? agentFaq(agent) : [];
};

const webPageNode = (path: string) => {
  const page = getSeoPage(path);
  return {
    '@type': faqFor(path).length ? 'FAQPage' : page.type,
    '@id': `${pageUrl(path)}#webpage`,
    url: pageUrl(path),
    name: page.title,
    description: page.description,
    inLanguage: 'es-CO',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...(path === '/' ? {} : { breadcrumb: { '@id': `${pageUrl(path)}#breadcrumb` } }),
    // La página de preguntas es un solo nodo FAQPage con sus preguntas (no dos nodos separados).
    ...(faqFor(path).length
      ? { mainEntity: faqFor(path).map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })) }
      : {}),
  };
};

const itemList = (name: string, items: object[]) => ({
  '@type': 'ItemList',
  name,
  numberOfItems: items.length,
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, item })),
});

// Entidades propias de cada página.
const extrasFor = (path: string): object[] => {
  switch (path) {
    case '/agentes':
      return [itemList('Catálogo de agentes de IA de Ai4U', ALL_AGENTS.map(a => ({
        '@type': 'Service',
        name: cap(a.name),
        description: cap(a.pitch),
        serviceType: 'Agente de IA',
        provider: { '@id': ORG_ID },
        areaServed: 'CO',
      })))];
    case '/orderloader':
      return [{
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl(path)}#software`,
        name: 'orderLoader',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Lee el pedido que llega por correo y lo crea en el sistema de la empresa, sin digitación. En producción en dos plantas, las 24 horas, con una persona que revisa los casos dudosos.',
        provider: { '@id': ORG_ID },
        publisher: { '@id': ORG_ID },
      }];
    case '/dashboards':
      return [{
        '@type': 'Service',
        '@id': `${pageUrl(path)}#service`,
        name: SERVICES[1].name,
        serviceType: 'Dashboards de gestión',
        description: SERVICES[1].description,
        provider: { '@id': ORG_ID },
        areaServed: 'CO',
      }];
    case '/servicios':
      return [{
        '@type': 'Service',
        '@id': `${pageUrl(path)}#service`,
        name: SERVICES[2].name,
        serviceType: 'Desarrollo de software y automatización',
        description: SERVICES[2].description,
        provider: { '@id': ORG_ID },
        areaServed: 'CO',
      }];
    case '/sitios-web':
      return [{
        '@type': 'Service',
        '@id': `${pageUrl(path)}#service`,
        name: SERVICES[3].name,
        serviceType: 'Diseño y desarrollo web',
        description: 'Landing pages y sitios con backend de alto rendimiento, entregados en unos 14 días.',
        provider: { '@id': ORG_ID },
        areaServed: 'CO',
      }, itemList('Sitios que hemos construido', SITES.map(s => ({ '@type': 'WebSite', name: s.name, description: s.desc, url: s.url })))];
    case '/portafolio':
      return [itemList('Empresas que trabajan con agentes de Ai4U', CASES.map(c => ({
        '@type': 'Organization',
        name: c.name,
        description: c.resumen,
        ...(c.website ? { url: c.website } : {}),
      })))];
    case '/por-que-ai4u':
      return [{ '@type': 'Person', '@id': `${SITE_URL}/#founder`, name: 'Mariano', jobTitle: 'Fundador de Ai4U', url: 'https://www.linkedin.com/in/mariano3/', worksFor: { '@id': ORG_ID } }];
    default: {
      const agent = agentOf(path);
      if (!agent) return [];
      return [{
        '@type': 'Service',
        '@id': `${pageUrl(path)}#service`,
        name: cap(agent.name),
        description: cap(agent.pitch),
        serviceType: 'Agente de IA',
        category: agent.clase,
        provider: { '@id': ORG_ID },
        areaServed: 'CO',
        isRelatedTo: { '@type': 'Service', name: 'Catálogo de agentes de IA de Ai4U', url: pageUrl('/agentes') },
      }];
    }
  }
};

export const buildJsonLd = (path: string) => {
  const crumbs = breadcrumbNode(path);
  return {
    '@context': 'https://schema.org',
    '@graph': [organizationNode(), websiteNode(), webPageNode(path), ...(crumbs ? [crumbs] : []), ...extrasFor(path)],
  };
};
