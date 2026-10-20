import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { LEGAL_ENTITY as E, LEGAL_LAST_UPDATE } from '../data/legalEntity';
import { openConsentPreferences } from '../utils/consent';
import { ROUTES } from '../utils/constants';
import '../styles/site-v2.css';
import '../styles/pages/legal.css';

// Política de cookies. Borrador pendiente de revisión legal: ver el PR que lo introduce.
// Si cambia una cookie o un proveedor, actualizar aquí, en index.html y en el banner a la vez.
const CookiePolicy = () => (
  <div className="a4 a4-page a4-legal">
    <SEOHead path="/politica-de-cookies" />
    <div className="a4-wrap">
      <header className="a4-page-head">
        <p className="a4-cap">Legal</p>
        <h1 className="a4-h-lg">Política de cookies</h1>
      </header>
      <section className="a4-section a4-legal-end">
        <div className="a4-prose">
          <h2>1. Qué son y cómo las usamos</h2>
          <p>
            Las cookies son pequeños archivos que el sitio guarda en tu navegador. Las de analítica y publicidad
            solo se cargan si las aceptas en el banner: antes de eso, el sitio no se conecta a Google Analytics ni a
            Meta. Quién es el responsable y cómo tratamos los datos está en la{' '}
            <Link to={ROUTES.PRIVACY_POLICY}>política de privacidad</Link>.
          </p>

          <h2>2. Qué guarda este sitio</h2>
          <h3>Necesarias (no requieren tu aceptación)</h3>
          <ul>
            <li>
              <strong>ai4u_consent_v1</strong> (almacenamiento local del navegador): guarda si aceptaste o rechazaste y la
              fecha, para no preguntarte en cada visita.
            </li>
            <li>
              <strong>googtrans</strong>: solo aparece si usas el selector de idioma. Guarda el idioma elegido.
            </li>
          </ul>
          <h3>Analítica (solo si aceptas)</h3>
          <ul>
            <li>
              <strong>_ga</strong> y <strong>_ga_&lt;identificador&gt;</strong> (Google Analytics): distinguen visitantes y
              sesiones para saber qué páginas se leen. Duran hasta 2 años, según indica Google.
            </li>
          </ul>
          <h3>Publicidad (solo si aceptas)</h3>
          <ul>
            <li>
              <strong>_fbp</strong> y <strong>_fbc</strong> (píxel de Meta): identifican el navegador y el clic en un anuncio
              para medir si nuestros anuncios en Facebook e Instagram funcionan. Duran hasta 90 días, según indica Meta.
            </li>
          </ul>
          <p>
            Las duraciones las fijan Google y Meta y pueden cambiar. Estos proveedores procesan datos fuera de Colombia,
            principalmente en Estados Unidos.
          </p>

          <h2>3. Cómo cambiar tu decisión</h2>
          <p>
            Puedes aceptar, rechazar o cambiar tu decisión cuando quieras:{' '}
            <button
              type="button"
              onClick={openConsentPreferences}
              style={{ all: 'unset', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}
            >
              abrir preferencias de cookies
            </button>
            . Si retiras tu aceptación, borramos las cookies de analítica y publicidad y recargamos la página.
            También puedes borrar las cookies desde la configuración de tu navegador.
          </p>

          <h2>4. Contacto</h2>
          <p>
            Para dudas sobre cookies o sobre tus datos escribe a{' '}
            <a href={`mailto:${E.correoDatos}`}>{E.correoDatos}</a>.
          </p>
        </div>
        <p className="a4-cap a4-num a4-legal-meta">Última actualización: {LEGAL_LAST_UPDATE}</p>
      </section>
    </div>
  </div>
);

export default CookiePolicy;
