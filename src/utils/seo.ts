// Utilidades de SEO. Los metadatos y los datos estructurados de cada página viven en
// src/data/seoPages.json y src/utils/jsonld.ts; aquí solo quedan ayudas pequeñas.
import { SEO_PAGES, SITE_URL, ORG_ID, getSeoPage } from './jsonld';
import { Service } from '../types/service';

// Compatibilidad: claves antiguas -> ruta registrada.
const KEY_TO_PATH: Record<string, string> = {
  home: '/',
  services: '/servicios',
  why: '/por-que-ai4u',
  portfolio: '/portafolio',
  dashboards: '/dashboards',
  agentes: '/agentes',
};

export const getPageMetaTags = (page: string) => {
  const p = getSeoPage(KEY_TO_PATH[page] ?? '/');
  return { title: p.title, description: p.description };
};

export const getCanonicalUrl = (path: string = '') => `${SITE_URL}${path}`;

export const cleanMetaDescription = (description: string, maxLength: number = 160) =>
  description.length <= maxLength ? description : description.substring(0, maxLength - 3) + '...';

export { SEO_PAGES };

// Ayudantes para los componentes ServiceCard y Breadcrumb (hoy sin uso en las páginas). Sin precios.
export const getServiceStructuredData = (service: Service) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.title,
  description: service.description,
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Colombia' },
  serviceType: service.category,
});

export const getBreadcrumbStructuredData = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: breadcrumbs.map((crumb, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});
