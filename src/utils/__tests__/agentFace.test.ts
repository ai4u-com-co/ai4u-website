import { describe, it, expect } from 'vitest';
import { generateAgentFace, AGENT_COLORS } from '../pixelIdenticon';
import { ALL_AGENTS } from '../../data/agents';

const fingerprint = (name: string) => {
  const f = generateAgentFace(name);
  return JSON.stringify(f.rects) + f.color;
};

describe('rostro del agente', () => {
  it('es determinista: el mismo nombre da siempre la misma cara y color', () => {
    expect(fingerprint('cobro de cartera')).toBe(fingerprint('cobro de cartera'));
    expect(fingerprint('  Cobro de Cartera ')).toBe(fingerprint('cobro de cartera'));
  });

  it('los 33 agentes tienen una cara distinta', () => {
    const huellas = ALL_AGENTS.map(a => fingerprint(a.name));
    expect(new Set(huellas).size).toBe(ALL_AGENTS.length);
  });

  it('todo rostro tiene cabeza, ojos, nariz y boca dentro de la cuadrícula de 11×11', () => {
    ALL_AGENTS.forEach(a => {
      const f = generateAgentFace(a.name);
      expect(f.rects.some(r => r.fill === 'paper'), `${a.name}: cabeza`).toBe(true);
      expect(f.rects.filter(r => r.fill === 'ink').length, `${a.name}: rasgos`).toBeGreaterThanOrEqual(3);
      f.rects.forEach(r => {
        expect(r.x).toBeGreaterThanOrEqual(0);
        expect(r.y).toBeGreaterThanOrEqual(0);
        expect(r.x + r.w).toBeLessThanOrEqual(11);
        expect(r.y + r.h).toBeLessThanOrEqual(11);
      });
    });
  });

  it('el color sale de la gama de la marca y se reparte entre los agentes', () => {
    const usos: Record<string, number> = {};
    ALL_AGENTS.forEach(a => {
      const c = generateAgentFace(a.name).color;
      expect(AGENT_COLORS as readonly string[]).toContain(c);
      usos[c] = (usos[c] ?? 0) + 1;
    });
    expect(Object.keys(usos)).toHaveLength(AGENT_COLORS.length);
    Object.values(usos).forEach(n => expect(n).toBeGreaterThanOrEqual(4));
  });
});
