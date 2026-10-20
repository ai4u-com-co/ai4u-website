// Píxel de Meta (AI4U Pixel). El snippet base y el `init` viven en index.html;
// aquí solo se disparan eventos, siempre sin romper la página si el píxel no cargó
// (bloqueador de anuncios, política de seguridad, etc.).

type PixelParams = Record<string, string | number | boolean>;

const send = (...args: unknown[]): void => {
  try {
    if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
      window.fbq(...args);
    }
  } catch {
    // el píxel nunca debe tumbar la UI
  }
};

/** Vista de página. El sitio es una SPA: hay que llamarlo en cada cambio de ruta. */
export const trackPixelPageView = (): void => send('track', 'PageView');

/** Evento estándar de Meta (p. ej. 'Contact') con parámetros opcionales. */
export const trackPixelEvent = (name: string, params?: PixelParams): void =>
  params ? send('track', name, params) : send('track', name);

/** ¿El enlace abre una conversación de WhatsApp? */
export const isWhatsAppHref = (href: string | null | undefined): boolean =>
  !!href && /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(?:[/?#:]|$)/i.test(href);
