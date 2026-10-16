import { describe, it, expect } from 'vitest';
import { SEO_PAGES, buildJsonLd, pageUrl, ORG_ID } from '../../utils/jsonld';
import { FAQ } from '../faq';
import { ALL_AGENTS } from '../agents';
import { CASES } from '../cases';
import { ROUTES } from '../../utils/constants';
import { AGENT_PAGES, agentFaq, agentPath } from '../agentPages';
import { slugify } from '../../utils/slug';

// SEO / GEO / AEO (octubre 2026): una sola lista de páginas, metadatos únicos y datos estructurados sin precios ni cifras.
describe('registro de páginas (src/data/seoPages.json)', () => {
  it('tiene rutas únicas y cubre todas las páginas públicas', () => {
    const paths = SEO_PAGES.map(p => p.path);
    expect(new Set(paths).size).toBe(paths.length);
    const publicas = [ROUTES.HOME, ROUTES.AGENTES, ROUTES.DASHBOARDS, ROUTES.SERVICES, ROUTES.SITIOS_WEB, ROUTES.ORDER_LOADER,
      ROUTES.PORTFOLIO, ROUTES.WHY_AI4U, ROUTES.FAQ, ROUTES.PRIVACY_POLICY, ROUTES.TERMS_OF_SERVICE, ROUTES.DATA_DELETION];
    publicas.forEach(r => expect(paths).toContain(r));
  });

  it('cada título y cada descripción son únicos y de largo razonable', () => {
    const titles = SEO_PAGES.map(p => p.title);
    const descs = SEO_PAGES.map(p => p.description);
    expect(new Set(titles).size).toBe(titles.length);
    expect(new Set(descs).size).toBe(descs.length);
    SEO_PAGES.forEach(p => {
      expect(p.title.length).toBeLessThanOrEqual(65);
      expect(p.description.length).toBeGreaterThanOrEqual(60);
      expect(p.description.length).toBeLessThanOrEqual(165);
    });
  });

  it('no mencionan SAP, precios ni cifras prometidas', () => {
    SEO_PAGES.forEach(p => expect(`${p.title} ${p.description}`).not.toMatch(/\bSAP\b|ROI|\d+ ?%|\$ ?\d/i));
  });

  it('las páginas que se quieren indexar están en el sitemap', () => {
    const enSitemap = SEO_PAGES.filter(p => p.sitemap).map(p => p.path);
    [ROUTES.HOME, ROUTES.AGENTES, ROUTES.DASHBOARDS, ROUTES.FAQ].forEach(r => expect(enSitemap).toContain(r));
  });
});

describe('datos estructurados', () => {
  it('cada página trae la organización, el sitio y su WebPage', () => {
    SEO_PAGES.forEach(p => {
      const g: any[] = buildJsonLd(p.path)['@graph'];
      const tipos = g.map(n => n['@type']);
      expect(tipos).toContain('Organization');
      expect(tipos).toContain('WebSite');
      expect(g.some(n => n['@id'] === `${pageUrl(p.path)}#webpage`)).toBe(true);
    });
  });

  it('todas las referencias @id están definidas en el mismo grafo', () => {
    SEO_PAGES.forEach(p => {
      const g = buildJsonLd(p.path)['@graph'];
      const definidos = new Set(g.filter((n: any) => n['@id']).map((n: any) => n['@id']));
      const refs: string[] = [];
      const visitar = (o: any) => {
        if (Array.isArray(o)) o.forEach(visitar);
        else if (o && typeof o === 'object') {
          if (Object.keys(o).length === 1 && o['@id']) refs.push(o['@id']);
          Object.values(o).forEach(visitar);
        }
      };
      visitar(g);
      refs.forEach(r => expect(definidos.has(r)).toBe(true));
    });
  });

  it('no declara precios (regla del sitio) ni una búsqueda interna que no existe', () => {
    SEO_PAGES.forEach(p => {
      const s = JSON.stringify(buildJsonLd(p.path));
      expect(s).not.toMatch(/"(price|priceCurrency|offers)"/);
      expect(s).not.toContain('SearchAction');
    });
  });

  it('la organización usa las redes reales del pie y la ciudad correcta', () => {
    const org: any = (buildJsonLd('/')['@graph'] as any[]).find(n => n['@id'] === ORG_ID);
    expect(org.sameAs).toEqual([
      'https://www.instagram.com/ai.4.u_/',
      'https://www.facebook.com/artificial.intelligence.4.you/',
      'https://www.linkedin.com/company/ai4u-com-co',
      'https://x.com/_ai4u_',
    ]);
    expect(org.address.addressLocality).toBe('Medellín');
    expect(org.contactPoint[0].telephone).toBe('+57 302 490 6414');
  });

  it('/agentes lista todos los agentes y /portafolio todos los casos', () => {
    const ag: any = (buildJsonLd('/agentes')['@graph'] as any[]).find(n => n['@type'] === 'ItemList');
    expect(ag.numberOfItems).toBe(ALL_AGENTS.length);
    const casos: any = (buildJsonLd('/portafolio')['@graph'] as any[]).find(n => n['@type'] === 'ItemList');
    expect(casos.numberOfItems).toBe(CASES.length);
  });

  it('/preguntas-frecuentes expone el FAQPage con las mismas preguntas que la página', () => {
    const nodos = (buildJsonLd('/preguntas-frecuentes')['@graph'] as any[]).filter(n => n['@type'] === 'FAQPage');
    expect(nodos).toHaveLength(1); // un solo FAQPage, el de la propia página
    const faq: any = nodos[0];
    expect(faq.mainEntity.map((q: any) => q.name)).toEqual(FAQ.map(f => f.question));
    expect(faq.mainEntity[0].acceptedAnswer.text).toBe(FAQ[0].answer);
  });
});

describe('preguntas frecuentes', () => {
  it('ids únicos y respuestas directas, sin precios ni cifras que no podamos medir', () => {
    expect(new Set(FAQ.map(f => f.id)).size).toBe(FAQ.length);
    FAQ.forEach(f => {
      expect(f.question.endsWith('?')).toBe(true);
      expect(f.answer.length).toBeGreaterThan(30);
      expect(f.answer).not.toMatch(/\bSAP\b|\$ ?\d|\d+ ?%/);
    });
  });

  it('la respuesta sobre precios no inventa tarifas', () => {
    const p = FAQ.find(f => f.id === 'cuanto-cuesta')!;
    expect(p.answer).toMatch(/diagnóstico sin costo/);
    expect(p.answer).not.toMatch(/\d/);
  });
});

describe('páginas por agente', () => {
  it('hay una página por agente, con ruta única y registrada en el SEO', () => {
    expect(AGENT_PAGES).toHaveLength(ALL_AGENTS.length);
    const paths = AGENT_PAGES.map(p => p.path);
    expect(new Set(paths).size).toBe(paths.length);
    paths.forEach(p => expect(p).toMatch(/^\/agentes\/[a-z0-9]+(-[a-z0-9]+)*$/));
    paths.forEach(p => expect(SEO_PAGES.map(x => x.path)).toContain(p));
    ALL_AGENTS.forEach(a => expect(agentPath(a)).toBe(`/agentes/${slugify(a.name)}`));
  });

  it('cada página tiene título y descripción propios, sin SAP ni cifras', () => {
    AGENT_PAGES.forEach(p => {
      expect(p.title.length).toBeLessThanOrEqual(65);
      expect(p.description.length).toBeGreaterThanOrEqual(60);
      expect(p.description.length).toBeLessThanOrEqual(165);
      expect(`${p.title} ${p.description}`).not.toMatch(/\bSAP\b|\d+ ?%|\$ ?\d/);
    });
  });

  it('su JSON-LD trae el servicio, las migas hasta Agentes y un FAQPage con las mismas preguntas', () => {
    ALL_AGENTS.forEach(a => {
      const g: any[] = buildJsonLd(agentPath(a))['@graph'];
      expect(g.some(n => n['@type'] === 'Service' && n.serviceType === 'Agente de IA')).toBe(true);
      const crumbs: any = g.find(n => n['@type'] === 'BreadcrumbList');
      expect(crumbs.itemListElement.map((c: any) => c.name)).toEqual(['Inicio', 'Agentes', a.name.charAt(0).toUpperCase() + a.name.slice(1)]);
      const page: any = g.find(n => n['@id'] === `${pageUrl(agentPath(a))}#webpage`);
      expect(page['@type']).toBe('FAQPage');
      expect(page.mainEntity.map((q: any) => q.name)).toEqual(agentFaq(a).map(f => f.question));
    });
  });
});
