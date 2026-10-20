// Datos del responsable del tratamiento de datos personales (Ley 1581 de 2012). Los usan la política de
// privacidad, la política de cookies y la eliminación de datos: un solo lugar para no desalinearlos.
//
// Todo valor que empiece por "PENDIENTE" falta por confirmar con el titular de Ai4U (nombre o razón social
// y documento tal como figuran en el RUT). src/data/__tests__/legalEntity.test.ts falla mientras quede alguno.

export const LEGAL_ENTITY = {
  /** Nombre completo o razón social, igual que en el RUT. */
  nombre: 'PENDIENTE: nombre o razón social',
  /** NIT o cédula, igual que en el RUT. */
  documento: 'PENDIENTE: NIT o cédula',
  /** Nombre comercial con el que se presenta al público. */
  marca: 'Ai4U',
  domicilio: 'Medellín, Colombia',
  /** Dirección para notificaciones físicas. */
  direccion: 'PENDIENTE: dirección de notificaciones',
  /** Canal para consultas, reclamos y solicitudes de supresión de datos. */
  correoDatos: 'hola@ai4u.com.co',
  telefono: '+57 302 490 6414',
  sitio: 'https://www.ai4u.com.co',
} as const;

/** Fecha de la versión vigente de los textos legales (sube con cada cambio de fondo). */
export const LEGAL_LAST_UPDATE = '19 de octubre de 2026';
