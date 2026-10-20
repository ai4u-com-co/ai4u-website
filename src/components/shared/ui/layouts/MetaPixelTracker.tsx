import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { isWhatsAppHref, trackPixelEvent, trackPixelPageView } from '../../../../utils/metaPixel';

/**
 * Conecta el píxel de Meta con el router:
 *  - PageView en la carga inicial y en cada cambio de ruta (SPA).
 *  - Contact cuando alguien toca un enlace a WhatsApp (wa.me, api.whatsapp.com).
 *    Los botones que abren WhatsApp por código pasan por analytics.trackConsultationRequest.
 */
const MetaPixelTracker = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPixelPageView();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const anchor = target?.closest?.('a');
      if (anchor && isWhatsAppHref(anchor.getAttribute('href'))) {
        trackPixelEvent('Contact', { contact_method: 'whatsapp', page_path: window.location.pathname });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
};

export default MetaPixelTracker;
