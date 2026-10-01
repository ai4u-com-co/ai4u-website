import { describe, it, expect } from 'vitest';
import { SITE_LINKS, SOCIAL_LINKS } from '../siteLinks';
import { ROUTES } from '../../utils/constants';

describe('destinos del menú', () => {
  it('son seis, en este orden, y Contacto no es uno de ellos', () => {
    expect(SITE_LINKS.map(l => l.name)).toEqual(['Agentes', 'Dashboards', 'A tu medida', 'Sitios web', 'Casos', 'Nosotros']);
    expect(SITE_LINKS.map(l => l.name.toLowerCase())).not.toContain('contacto');
  });

  it('cada destino tiene ruta y una línea de apoyo', () => {
    SITE_LINKS.forEach(l => {
      expect(l.path.startsWith('/')).toBe(true);
      expect(l.note.length).toBeGreaterThan(3);
    });
  });

  it('Dashboards usa /dashboards y /tableros queda solo como redirect', () => {
    expect(ROUTES.DASHBOARDS).toBe('/dashboards');
    expect(SITE_LINKS.find(l => l.name === 'Dashboards')?.path).toBe('/dashboards');
    expect(ROUTES.TABLEROS_LEGACY).toBe('/tableros');
  });

  it('las redes del pie y del menú son las mismas cuatro', () => {
    expect(SOCIAL_LINKS.map(s => s.name)).toEqual(['Instagram', 'Facebook', 'LinkedIn', 'X']);
  });
});
