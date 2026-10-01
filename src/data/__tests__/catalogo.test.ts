import { describe, it, expect } from 'vitest';
import { AGENT_GROUPS, ALL_AGENTS, NIVELES } from '../agents';

// Catálogo ampliado (octubre 2026): 33 agentes agrupados por tipo de trabajo, con ficha de negocio.
describe('catálogo de agentes', () => {
  it('tiene 33 agentes, sin nombres repetidos', () => {
    expect(ALL_AGENTS).toHaveLength(33);
    expect(new Set(ALL_AGENTS.map(a => a.name)).size).toBe(33);
  });

  it('conserva los 14 agentes que ya estaban (el chat pasa a "chat con tu empresa")', () => {
    const previos = ['resolver con IA', 'whatsapp tickets', 'reparador nocturno', 'chat con tu empresa', 'asistente del panel', 'multicanal', 'lector de pedidos', 'cobro de cartera', 'cotizador', 'planeador de producción', 'fábrica de contenido', 'escucha social', 'prospección fría', 'cadena de desarrollo'];
    const nombres = ALL_AGENTS.map(a => a.name);
    previos.forEach(n => expect(nombres).toContain(n));
    expect(nombres).not.toContain('chat sobre tu ERP');
  });

  it('cada agente pertenece al grupo que dice su categoría', () => {
    AGENT_GROUPS.forEach(g => g.agents.forEach(a => expect(a.category).toBe(g.id)));
  });

  it('todos están listos; solo las 4 ideas sin construir quedan en piloto y la cadena de desarrollo es interna', () => {
    const noListos = ALL_AGENTS.filter(a => a.status !== 'produccion').map(a => `${a.name}:${a.status}`).sort();
    expect(noListos).toEqual([
      'cadena de desarrollo:interno',
      'cierre mensual:piloto',
      'reposición de inventario:piloto',
      'resumen semanal:piloto',
      'seguimiento de cotizaciones:piloto',
    ]);
  });

  it('los textos no mencionan SAP ni prometen cifras', () => {
    const texto = ALL_AGENTS.map(a => `${a.name} ${a.pitch} ${a.recibe} ${a.entrega} ${a.revisa} ${a.horario}`).join(' ');
    expect(texto).not.toMatch(/\bSAP\b|\d+ ?%|\$ ?\d/);
  });
});

describe('tarjetas: ficha de negocio y niveles', () => {
  it('no hay barras de atributos inventadas', () => {
    ALL_AGENTS.forEach(a => expect(a).not.toHaveProperty('atributos'));
  });

  it('cada agente tiene su ficha completa', () => {
    ALL_AGENTS.forEach(a => {
      (['recibe', 'entrega', 'revisa', 'horario'] as const).forEach(k => expect(a[k].trim().length, `${a.name}.${k}`).toBeGreaterThan(3));
    });
  });

  it('el nivel es 1, 2 o 3 y tiene significado definido por la supervisión', () => {
    ALL_AGENTS.forEach(a => expect([1, 2, 3]).toContain(a.nivel));
    expect(Object.values(NIVELES).map(n => n.nombre)).toEqual(['Propone', 'Ejecuta', 'Autónomo']);
  });

  it('las 4 ideas sin construir son nivel 1 o 2: ninguna promete trabajar sola', () => {
    ['cierre mensual', 'reposición de inventario', 'resumen semanal', 'seguimiento de cotizaciones'].forEach(n => {
      expect(ALL_AGENTS.find(a => a.name === n)!.nivel).toBeLessThan(3);
    });
  });
});
