import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_LINKS, SOCIAL_LINKS } from '../../../../data/siteLinks';
import { scrollToTop } from '../../../../utils/helpers';
import '../../../../styles/site-v2.css';

const Footer = () => (
  <footer className="a4 a4-foot">
    <div className="a4-wrap">
      <div className="a4-foot-cols">
        <div>
          <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={78} height={26} />
          <p className="a4-sm" style={{ marginTop: 12 }}>Inteligencia artificial para tu operación.</p>
        </div>
        <div className="a4-foot-col">
          <span className="a4-cap">Sitio</span>
          {SITE_LINKS.map(l => (
            <Link key={l.path} to={l.path} onClick={() => scrollToTop('auto')}>{l.name}</Link>
          ))}
        </div>
        <div className="a4-foot-col">
          <span className="a4-cap">Contacto</span>
          <span className="a4-num">hola@ai4u.com.co</span>
          <span className="a4-num">+57 302 490 6414</span>
          <span>Medellín, Colombia</span>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '0 18px' }}>
            {SOCIAL_LINKS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer">{s.name}</a>
            ))}
          </span>
        </div>
      </div>
      <p className="a4-cap" style={{ marginTop: 30 }}>
        © {new Date().getFullYear()} Ai4U. Todos los derechos reservados.
      </p>
    </div>
  </footer>
);

export default Footer;
