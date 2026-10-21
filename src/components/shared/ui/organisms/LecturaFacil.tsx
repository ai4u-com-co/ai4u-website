import React from 'react';
import { useLocation } from 'react-router-dom';
import { lecturaFacilDe } from '../../../../data/lecturaFacil';
import { getPrefs, setPrefs, usePrefs } from '../../../../utils/accesibilidad';
import { APP_CONFIG } from '../../../../utils/constants';
import '../../../../styles/site-v2.css';
import '../../../../styles/accesibilidad.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

// Versión en lectura fácil de la página actual. Layout la muestra en lugar del contenido normal cuando la persona
// activó «Explícamelo fácil» y la página tiene versión; si no la tiene, Layout muestra la página normal.
const LecturaFacil: React.FC = () => {
  const { pathname } = useLocation();
  usePrefs();
  const pagina = lecturaFacilDe(pathname);
  if (!pagina) return null;
  const volver = () => setPrefs({ ...getPrefs(), facil: false });

  return (
    <div className="a4 a4-page a4-facil">
      <header className="a4-page-head a4-wrap">
        <p className="a4-cap">Lectura fácil</p>
        <h1 className="a4-facil-h1">{pagina.titulo}</h1>
        <p className="a4-facil-lead">{pagina.resumen}</p>
        <p className="a4-facil-nota">
          Esta es la versión fácil de leer de esta página.{' '}
          <button type="button" className="a4-facil-link" onClick={volver}>Ver la versión completa</button>
        </p>
      </header>

      <section className="a4-section a4-wrap" aria-label="Contenido en lectura fácil">
        <div className="a4-facil-cuerpo">
          {pagina.parrafos.map((p, i) => (
            <div className="a4-facil-p" key={i}>
              {p.titulo ? <h2>{p.titulo}</h2> : null}
              <p>{p.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="facil-acciones">
        <div className="a4-facil-cuerpo">
          <h2 id="facil-acciones">Qué puedes hacer aquí</h2>
          <ul className="a4-facil-acciones">
            {pagina.acciones.map((a) => <li key={a}>{a}</li>)}
          </ul>
          <p>
            <a className="a4-pill" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
          </p>
          {!pagina.revisado && (
            <p className="a4-facil-nota">Este texto lo preparó una inteligencia artificial a partir de la página original y todavía lo está revisando una persona. Si algo no se entiende, escríbenos.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default LecturaFacil;
