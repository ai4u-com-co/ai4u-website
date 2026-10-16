// Todas las páginas indexables: las estáticas (seoPages.json) más una por agente. Lo leen SEOHead, el JSON-LD
// y los scripts de build.
import staticPages from './seoPages.json';
import { AGENT_PAGES } from './agentPages';

export const SEO_PAGES_ALL = [
  ...staticPages.map((p) => ({ ...p, sources: undefined as string[] | undefined })),
  ...AGENT_PAGES,
];
