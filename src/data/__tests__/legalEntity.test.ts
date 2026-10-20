import { describe, it, expect } from 'vitest';
import { LEGAL_ENTITY } from '../legalEntity';

// COMPUERTA DE PUBLICACIÓN: esta prueba falla a propósito mientras falte algún dato del responsable
// del tratamiento (nombre o razón social, documento, dirección). No se publica una política de datos
// personales con "PENDIENTE" a la vista. Se pone en verde llenando src/data/legalEntity.ts con los datos del RUT.
describe('datos del responsable del tratamiento', () => {
  for (const [campo, valor] of Object.entries(LEGAL_ENTITY)) {
    it(`${campo} está completo`, () => {
      expect(valor, `Falta completar "${campo}" en src/data/legalEntity.ts`).not.toMatch(/PENDIENTE/i);
      expect(valor.trim().length).toBeGreaterThan(0);
    });
  }

  it('el correo de datos personales tiene formato de correo', () => {
    expect(LEGAL_ENTITY.correoDatos).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
  });
});
