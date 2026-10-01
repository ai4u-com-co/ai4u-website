import { describe, it, expect } from 'vitest';
import { generateAgentFace, AGENT_COLORS, FACE_COLS, FACE_ROWS } from '../pixelIdenticon';
import { ALL_AGENTS } from '../../data/agents';

const fingerprint = (name: string) => {
  const f = generateAgentFace(name);
  return JSON.stringify(f.rects) + f.color;
};

describe('avatar del agente: robot de traje y corbata', () => {
  it('es determinista: el mismo nombre da siempre el mismo avatar y color', () => {
    expect(fingerprint('cobro de cartera')).toBe(fingerprint('cobro de cartera'));
    expect(fingerprint('  Cobro de Cartera ')).toBe(fingerprint('cobro de cartera'));
  });

  it('los 33 agentes tienen un avatar distinto', () => {
    const huellas = ALL_AGENTS.map(a => fingerprint(a.name));
    expect(new Set(huellas).size).toBe(ALL_AGENTS.length);
  });

  it('todo avatar cabe en la cuadrícula de 15×21', () => {
    ALL_AGENTS.forEach(a => {
      generateAgentFace(a.name).rects.forEach(r => {
        expect(r.x).toBeGreaterThanOrEqual(0);
        expect(r.y).toBeGreaterThanOrEqual(0);
        expect(r.x + r.w, `${a.name}: ancho`).toBeLessThanOrEqual(FACE_COLS);
        expect(r.y + r.h, `${a.name}: alto`).toBeLessThanOrEqual(FACE_ROWS);
      });
    });
  });

  it('todo avatar tiene cabeza, rasgos, saco y camisa', () => {
    ALL_AGENTS.forEach(a => {
      const f = generateAgentFace(a.name);
      expect(f.rects.some(r => r.fill === '#ffffff' && r.y <= 13), `${a.name}: cabeza`).toBe(true);
      expect(f.rects.filter(r => r.fill === '#1d1d1d' && r.y <= 13).length, `${a.name}: rasgos`).toBeGreaterThanOrEqual(3);
      expect(f.rects.some(r => r.y >= 15 && (r.fill === '#1d1d1d' || r.fill === '#46463f') && r.w >= 11), `${a.name}: saco`).toBe(true);
      expect(f.rects.some(r => r.y >= 15 && r.fill === '#ffffff'), `${a.name}: camisa`).toBe(true);
    });
  });

  it('todo agente lleva corbata o corbatín en su color', () => {
    ALL_AGENTS.forEach(a => {
      const f = generateAgentFace(a.name);
      expect(f.rects.some(r => r.y >= 15 && r.y <= 20 && r.fill === 'color'), `${a.name}: corbata`).toBe(true);
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
