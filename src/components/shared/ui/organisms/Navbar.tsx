import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { GoogleTranslateWidget } from '../atoms';
import { ROUTES, APP_CONFIG } from '../../../../utils/constants';
import { scrollToTop } from '../../../../utils/helpers';
import { SITE_LINKS, SOCIAL_LINKS } from '../../../../data/siteLinks';
import '../../../../styles/site-v2.css';

// La barra solo muestra el logo y "Menú". Los destinos viven en una pantalla completa.
// La esfera de la pantalla "apunta" al destino sobre el que está el cursor o el foco:
// cambia de altura y de tono. Son pasos fijos por posición, sin cálculo.
const ORB_HUE = [0, 30, 60, -30, -60, 15];
const orbOffset = (i: number) => (i - (SITE_LINKS.length - 1) / 2) * 64;

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // La barra va fija: al bajar se le suma un sombreado por detrás (ver .a4-nav::before).
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cambiar de página cierra el menú.
  useEffect(() => { setOpen(false); }, [pathname]);

  // Con el menú abierto: sin scroll de fondo, foco adentro, Esc cierra y Tab no se escapa.
  useEffect(() => {
    if (!open) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const menu = menuRef.current;
    menu?.querySelector<HTMLElement>('a[href]')?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        return;
      }
      if (e.key !== 'Tab' || !menu) return;
      const items = Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(el => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      btnRef.current?.focus();
    };
  }, [open]);

  const go = () => scrollToTop('auto');

  return (
    <header className={`a4 a4-nav${scrolled ? ' is-scrolled' : ''}`}>
      <nav className="a4-nav-in a4-wrap" aria-label="Principal">
        <RouterLink to={ROUTES.HOME} aria-label="Ai4U, inicio" onClick={go}>
          <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={90} height={30} />
        </RouterLink>
        <button
          ref={btnRef}
          type="button"
          className="a4-ghost a4-menu-btn"
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-controls="a4-menu"
          onClick={() => setOpen(true)}
        >
          Menú +
        </button>
      </nav>

      <div
        id="a4-menu"
        ref={menuRef}
        className={`a4-menu${open ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú"
      >
        <div className="a4-nav-in a4-wrap a4-menu-bar">
          <RouterLink to={ROUTES.HOME} aria-label="Ai4U, inicio" onClick={go}>
            <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={90} height={30} />
          </RouterLink>
          <button type="button" className="a4-ghost a4-menu-btn" onClick={close}>Cerrar −</button>
        </div>

        <div className="a4-menu-body a4-wrap">
          <div
            className="a4-orb a4-menu-orb"
            aria-hidden="true"
            style={{ ['--oy' as string]: `${orbOffset(active)}px`, ['--hue' as string]: `${ORB_HUE[active] ?? 0}deg` }}
          >
            <div className="a4-sphere" />
            <i /><i /><i />
          </div>
          <nav aria-label="Menú principal">
            <ul className="a4-menu-list">
              {SITE_LINKS.map((l, i) => (
                <li key={l.path}>
                  <RouterLink
                    to={l.path}
                    className="a4-menu-item"
                    aria-current={pathname === l.path ? 'page' : undefined}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={go}
                  >
                    <span className="a4-cap a4-num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="a4-menu-title">{l.name}</span>
                    <span className="a4-cap a4-menu-note">{l.note}</span>
                  </RouterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="a4-menu-foot a4-wrap">
          <div className="a4-menu-contact">
            <a className="a4-num" href={`mailto:${APP_CONFIG.CONTACT.EMAIL}`}>{APP_CONFIG.CONTACT.EMAIL}</a>
            <a className="a4-num" href={`https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}`} target="_blank" rel="noopener noreferrer">{APP_CONFIG.CONTACT.PHONE}</a>
          </div>
          <div className="a4-menu-social">
            {SOCIAL_LINKS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
            ))}
          </div>
          <span className="a4-nav-lang">
            <GoogleTranslateWidget />
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
