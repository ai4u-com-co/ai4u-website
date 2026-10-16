// "lector de facturas de proveedor" -> "lector-de-facturas-de-proveedor" (sin tildes, solo a-z, 0-9 y guiones)
export const slugify = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
