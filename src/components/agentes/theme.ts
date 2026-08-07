// Tokens de marca — Brand Book 2025 (pg. 05), los 5 colores oficiales.
// OJO: son distintos de los valores actuales en `shared/ui/tokens/palette.ts`
// (que quedó desactualizado — usa #FF5C00/#0047FF/#E0FF00 en vez de estos).
// Se usan acá, scoped a la sección Agentes, sin tocar el token global del
// resto del sitio — eso es un cambio aparte, más grande, fuera de este alcance.
export const AGENTES_BRAND = {
  mintCream: '#eaf4eb',
  erieBlack: '#171717',
  hotOrange: '#ff6e00',
  moderateBlue: '#3daed1',
  cadetGray: '#94989b',
  white: '#ffffff',
} as const;
