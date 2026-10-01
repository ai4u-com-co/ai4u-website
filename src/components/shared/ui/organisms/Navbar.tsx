import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { GoogleTranslateWidget } from '../atoms';
import { ROUTES, APP_CONFIG } from '../../../../utils/constants';
import { scrollToTop } from '../../../../utils/helpers';
import '../../../../styles/site-v2.css';

// Cinco enlaces (antes ocho): lo que el visitante busca, sin solapes.
// orderLoader y sitios web siguen en sus URLs y se llegan desde el home y /servicios.
const NAV_ITEMS = [
  { name: 'Trabajo', path: ROUTES.PORTFOLIO },
  { name: 'Agentes', path: ROUTES.AGENTES },
  { name: 'Servicios', path: ROUTES.SERVICES },
  { name: 'Nosotros', path: ROUTES.WHY_AI4U },
];

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const close = () => {
    setOpen(false);
    scrollToTop('auto');
  };

  return (
    <header className="a4 a4-nav">
      <nav className="a4-nav-in a4-wrap" aria-label="Principal">
        <RouterLink to={ROUTES.HOME} aria-label="Ai4U, inicio" onClick={close}>
          <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={90} height={30} />
        </RouterLink>
        <button
          type="button"
          className="a4-ghost a4-menu-btn"
          aria-expanded={open}
          aria-controls="a4-site-links"
          onClick={() => setOpen(o => !o)}
        >
          {open ? 'Cerrar −' : 'Menú +'}
        </button>
        <div id="a4-site-links" className={`a4-nav-links${open ? ' open' : ''}`}>
          {NAV_ITEMS.map(item => (
            <RouterLink
              key={item.path}
              to={item.path}
              className="a4-ghost"
              aria-current={pathname === item.path ? 'page' : undefined}
              onClick={close}
            >
              {item.name}
            </RouterLink>
          ))}
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Contacto →
          </a>
          <span className="a4-nav-lang">
            <GoogleTranslateWidget />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
