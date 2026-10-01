import { describe, it, expect } from 'vitest';
import { APP_CONFIG } from '../../utils/constants';
import { clients } from '../clients';
import { featuredProjects } from '../featuredProjects';
import { services } from '../services';
import { getPageMetaTags } from '../../utils/seo';

// Oferta única (octubre 2026): tres capas, sin marcas que no usamos, sin precios ni SAP en el mensaje.
describe('contacto', () => {
  it('usa un solo correo y un solo WhatsApp', () => {
    expect(APP_CONFIG.CONTACT.EMAIL).toBe('hola@ai4u.com.co');
    expect(APP_CONFIG.CONTACT.WHATSAPP).toBe('573024906414');
    expect(APP_CONFIG.CONTACT.PHONE).toBe('+57 302 490 6414');
  });
});

describe('marcas que no usamos', () => {
  const REMOVIDAS = ['true', 'rascal', 'EAFIT'];
  const PROYECTOS_REMOVIDOS = ['rascal', 'ebook-apasofirme', 'dream-house', 'true-vton', 'flyer-studio', 'gourmet-ai'];

  it('no aparecen entre los clientes', () => {
    const ids = clients.map(c => c.id);
    REMOVIDAS.forEach(id => expect(ids).not.toContain(id));
  });

  it('no aparecen entre los proyectos destacados', () => {
    const ids = featuredProjects.map(p => p.id);
    PROYECTOS_REMOVIDOS.forEach(id => expect(ids).not.toContain(id));
  });

  it('los cinco casos de la oferta están como clientes', () => {
    const ids = clients.map(c => c.id);
    ['tamaprint', 'flexoimpresos', 'la-magdalena', 'estudio-indigo', 'multihealth'].forEach(id => expect(ids).toContain(id));
  });
});

describe('mensaje', () => {
  it('superAI no es un servicio del sitio', () => {
    expect(services.map(s => s.id)).not.toContain('super-ai');
  });

  it('los meta tags no mencionan SAP ni prometen cifras', () => {
    ['home', 'services', 'why', 'portfolio', 'agentes'].forEach(page => {
      const { title, description } = getPageMetaTags(page);
      expect(`${title} ${description}`).not.toMatch(/\bSAP\b|ROI|\d+ ?%/i);
    });
  });
});
