import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../utils/constants';
import {
  CONSENT_OPEN_EVENT,
  getConsent,
  setConsent,
  type ConsentChoice,
} from '../../../../utils/consent';
import '../../../../styles/site-v2.css';
import '../../../../styles/cookie-banner.css';

/**
 * Banner de consentimiento de cookies de analítica y publicidad.
 * - Aparece mientras no haya una decisión guardada; se reabre desde el pie ("Preferencias de cookies").
 * - Aceptar y rechazar tienen el mismo peso visual: rechazar no puede costar más que aceptar.
 * - No se pinta en el prerender del build (Chromium automatizado): saldría horneado en el HTML de cada ruta.
 */
const CookieBanner = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.webdriver) return;
    if (getConsent() === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  // Mientras el banner está abierto publica su alto en --a4-cookies-h: el botón flotante de WhatsApp
  // (whatsapp-float.css) se sube por encima para que el banner no lo tape ni le robe los clics.
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!open || !el) return;
    const publish = () => document.documentElement.style.setProperty('--a4-cookies-h', `${el.offsetHeight}px`);
    publish();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(publish) : null;
    ro?.observe(el);
    return () => {
      ro?.disconnect();
      document.documentElement.style.removeProperty('--a4-cookies-h');
    };
  }, [open]);

  if (!open) return null;

  const decide = (choice: ConsentChoice) => {
    setOpen(false);
    setConsent(choice);
  };

  return (
    <div
      ref={ref}
      className="a4 a4-cookies"
      role="dialog"
      aria-modal="false"
      aria-labelledby="a4-cookies-title"
      aria-describedby="a4-cookies-text"
    >
      <div className="a4-cookies-body">
        <p id="a4-cookies-title" className="a4-cap">Cookies</p>
        <p id="a4-cookies-text" className="a4-sm">
          Usamos cookies de analítica (Google Analytics) y de publicidad (píxel de Meta) para entender cómo se usa el
          sitio y medir nuestros anuncios. Solo se activan si las aceptas y puedes cambiar de opinión cuando quieras.{' '}
          <Link to={ROUTES.COOKIE_POLICY}>Política de cookies</Link> y{' '}
          <Link to={ROUTES.PRIVACY_POLICY}>política de privacidad</Link>.
        </p>
      </div>
      <div className="a4-cookies-actions">
        <button type="button" className="a4-pill" onClick={() => decide('denied')}>Rechazar</button>
        <button type="button" className="a4-pill" onClick={() => decide('granted')}>Aceptar</button>
      </div>
    </div>
  );
};

export default CookieBanner;
