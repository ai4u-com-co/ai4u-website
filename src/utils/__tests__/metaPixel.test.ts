import { describe, it, expect, vi, afterEach } from 'vitest';
import { isWhatsAppHref, trackPixelEvent, trackPixelPageView } from '../metaPixel';

// Entorno node (el repo no trae jsdom): se simula solo `window.fbq`.
const withFbq = (fbq?: (...args: unknown[]) => void) => vi.stubGlobal('window', fbq ? { fbq } : {});

describe('metaPixel', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('PageView llama a fbq("track", "PageView")', () => {
    const fbq = vi.fn();
    withFbq(fbq);
    trackPixelPageView();
    expect(fbq).toHaveBeenCalledWith('track', 'PageView');
  });

  it('Contact con parámetros', () => {
    const fbq = vi.fn();
    withFbq(fbq);
    trackPixelEvent('Contact', { contact_method: 'whatsapp' });
    expect(fbq).toHaveBeenCalledWith('track', 'Contact', { contact_method: 'whatsapp' });
  });

  it('Contact sin parámetros no manda un tercer argumento', () => {
    const fbq = vi.fn();
    withFbq(fbq);
    trackPixelEvent('Contact');
    expect(fbq).toHaveBeenCalledWith('track', 'Contact');
  });

  it('no rompe si el píxel no cargó (bloqueador, CSP)', () => {
    withFbq();
    expect(() => trackPixelPageView()).not.toThrow();
    expect(() => trackPixelEvent('Contact')).not.toThrow();
  });

  it('no rompe si fbq lanza', () => {
    withFbq(() => {
      throw new Error('boom');
    });
    expect(() => trackPixelPageView()).not.toThrow();
  });

  it('reconoce enlaces de WhatsApp y no otros', () => {
    expect(isWhatsAppHref('https://wa.me/573024906414?text=hola')).toBe(true);
    expect(isWhatsAppHref('https://api.whatsapp.com/send?phone=573024906414')).toBe(true);
    expect(isWhatsAppHref('https://wa.me.evil.com/x')).toBe(false);
    expect(isWhatsAppHref('https://www.ai4u.com.co/contacto')).toBe(false);
    expect(isWhatsAppHref(null)).toBe(false);
    expect(isWhatsAppHref('')).toBe(false);
  });
});
