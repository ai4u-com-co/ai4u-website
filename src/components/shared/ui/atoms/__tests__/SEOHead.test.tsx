import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import SEOHead from '../SEOHead';
import { SEO_PAGES } from '../../../../../utils/jsonld';

const head = (path: string) => {
  const ctx: any = {};
  renderToString(
    <HelmetProvider context={ctx}>
      <SEOHead path={path} />
    </HelmetProvider>,
  );
  return {
    title: ctx.helmet.title.toString() as string,
    link: ctx.helmet.link.toString() as string,
    meta: ctx.helmet.meta.toString() as string,
    script: ctx.helmet.script.toString() as string,
  };
};

describe('SEOHead', () => {
  it('la canónica sale de la ruta registrada y nunca de la URL del navegador (bug: localhost en las legales)', () => {
    SEO_PAGES.forEach(p => {
      const h = head(p.path);
      const expected = p.path === '/' ? 'https://www.ai4u.com.co/' : `https://www.ai4u.com.co${p.path}`;
      expect(h.link).toContain(`rel="canonical" href="${expected}"`);
      expect(`${h.link}${h.meta}`).not.toMatch(/localhost|127\.0\.0\.1/);
    });
  });

  it('pone una sola etiqueta de cada tipo y la tarjeta de Twitter', () => {
    const h = head('/agentes');
    expect((h.link.match(/rel="canonical"/g) || []).length).toBe(1);
    expect((h.meta.match(/name="description"/g) || []).length).toBe(1);
    expect((h.meta.match(/property="og:title"/g) || []).length).toBe(1);
    expect(h.meta).toContain('name="twitter:card" content="summary_large_image"');
  });

  it('el título y la descripción son los del registro', () => {
    const p = SEO_PAGES.find(x => x.path === '/orderloader')!;
    const h = head(p.path);
    expect(h.title).toContain(p.title.replace(/&/g, '&amp;'));
    expect(h.meta).toContain(p.description);
  });

  it('incluye datos estructurados con la organización y la página', () => {
    const h = head('/dashboards');
    expect(h.script).toContain('application/ld+json');
    expect(h.script).toContain('Organization');
    expect(h.script).toContain('https://www.ai4u.com.co/dashboards#webpage');
  });

  it('noIndex marca la página para no indexar', () => {
    const ctx: any = {};
    renderToString(<HelmetProvider context={ctx}><SEOHead path="/" noIndex /></HelmetProvider>);
    expect(ctx.helmet.meta.toString()).toContain('noindex, follow');
  });
});
