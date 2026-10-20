import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { LEGAL_ENTITY as E, LEGAL_LAST_UPDATE } from '../data/legalEntity';
import { ROUTES } from '../utils/constants';
import '../styles/site-v2.css';
import '../styles/pages/legal.css';

// Política de tratamiento de datos personales y aviso de privacidad (Ley 1581 de 2012).
// Borrador pendiente de revisión legal: ver el PR que lo introduce.
// Mientras falte algún dato del responsable en legalEntity.ts (valor "PENDIENTE"), no se muestra
// ninguno: se publica solo lo confirmado (marca, ciudad y correo) y legalEntity.test.ts sigue fallando.
const IDENTIFICADO = ![E.nombre, E.documento, E.direccion].some((v) => /PENDIENTE/i.test(v));
const PrivacyPolicy = () => (
  <div className="a4 a4-page a4-legal">
    <SEOHead path="/politica-de-privacidad" />
    <div className="a4-wrap">
      <header className="a4-page-head">
        <p className="a4-cap">Legal</p>
        <h1 className="a4-h-lg">Política de privacidad</h1>
      </header>
      <section className="a4-section a4-legal-end">
        <div className="a4-prose">
          <h2>1. Quién es el responsable</h2>
          {IDENTIFICADO ? (
            <p>
              El responsable del tratamiento de tus datos personales es {E.nombre} ({E.documento}), que opera
              bajo la marca {E.marca}, con domicilio en {E.domicilio}. Dirección para notificaciones: {E.direccion}.
              Para cualquier tema de datos personales escribe a <a href={`mailto:${E.correoDatos}`}>{E.correoDatos}</a>.
            </p>
          ) : (
            <p>
              El responsable del tratamiento de tus datos personales es {E.marca}, con domicilio en {E.domicilio}.
              Para cualquier tema de datos personales escribe a <a href={`mailto:${E.correoDatos}`}>{E.correoDatos}</a>.
            </p>
          )}

          <h2>2. Qué datos tratamos y para qué</h2>
          <p>Tratamos datos personales solo para las finalidades que se describen aquí:</p>
          <ul>
            <li>
              <strong>Navegación en este sitio.</strong> Páginas visitadas, tipo de dispositivo, dirección IP e
              identificadores de cookies. Si aceptas las cookies de analítica y publicidad, los usamos para entender
              cómo se usa el sitio y medir nuestros anuncios. Si no las aceptas, no se cargan. Detalle en la{' '}
              <Link to={ROUTES.COOKIE_POLICY}>política de cookies</Link>.
            </li>
            <li>
              <strong>Conversaciones por WhatsApp y correo.</strong> Tu número, el nombre de tu perfil, lo que nos
              escribas y, si lo compartes, la empresa y el cargo. Los usamos para responder tu consulta y, si te
              interesa, preparar una propuesta.
            </li>
            <li>
              <strong>Contacto comercial con empresas.</strong> Correos de contacto que las propias empresas
              publican en sus sitios web, para ofrecerles los servicios de {E.marca}. Puedes pedir en cualquier momento
              que no te escribamos más o que borremos tu dato.
            </li>
            <li>
              <strong>Clientes.</strong> Los datos de contacto de quienes contratan con nosotros y, cuando prestamos el
              servicio, los datos de su operación que ellos nos entregan, que tratamos solo para ese servicio y según el contrato.
            </li>
          </ul>
          <p>No vendemos tus datos ni los usamos para finalidades distintas de las que aparecen aquí.</p>

          <h2>3. Tu autorización</h2>
          <p>
            Tratamos tus datos con tu autorización previa, expresa e informada. En este sitio la das al aceptar las
            cookies en el banner, y por WhatsApp o correo, al escribirnos después de leer este aviso. Puedes retirarla
            cuando quieras (ver el punto 5). Retirarla no afecta lo que ya se hizo mientras estuvo vigente.
          </p>

          <h2>4. Con quién compartimos datos</h2>
          <p>
            Usamos proveedores que tratan datos por nuestra cuenta: Google (analítica y tipografías del sitio), Meta
            (publicidad y WhatsApp), Vercel (alojamiento del sitio) y otros servicios técnicos de nuestra operación.
            Algunos de ellos procesan datos fuera de Colombia, principalmente en Estados Unidos. No entregamos tus
            datos a terceros para que los usen con sus propios fines, salvo que una autoridad lo exija.
          </p>

          <h2>5. Tus derechos y cómo ejercerlos</h2>
          <p>Como titular de los datos tienes derecho a:</p>
          <ul>
            <li>conocer, actualizar y rectificar tus datos;</li>
            <li>solicitar prueba de la autorización que nos diste;</li>
            <li>saber cómo hemos usado tus datos;</li>
            <li>retirar tu autorización y pedir que borremos tus datos, cuando no haya un deber legal o contractual de conservarlos;</li>
            <li>presentar quejas ante la Superintendencia de Industria y Comercio (<a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer">sic.gov.co</a>).</li>
          </ul>
          <p>
            Para ejercerlos escribe a <a href={`mailto:${E.correoDatos}`}>{E.correoDatos}</a> indicando quién eres y
            qué pides. Respondemos las consultas en máximo 10 días hábiles y los reclamos en máximo 15 días hábiles,
            contados desde que recibimos tu solicitud. Para pedir que borremos tus datos también puedes usar la página de{' '}
            <Link to={ROUTES.DATA_DELETION}>eliminación de datos</Link>.
          </p>

          <h2>6. Seguridad y conservación</h2>
          <p>
            Aplicamos medidas técnicas y organizativas para proteger los datos contra acceso no autorizado, pérdida o
            alteración. Conservamos los datos mientras exista la finalidad para la que los recogimos o un deber legal de
            guardarlos, y luego los borramos o los anonimizamos.
          </p>

          <h2>7. Aplicación Ads Manager y API de Facebook</h2>
          <p>
            Nuestra aplicación de gestión de anuncios (Ads Manager) accede a información pública y autorizada a través
            de las APIs de Facebook: datos básicos del perfil, estadísticas de anuncios y métricas de rendimiento que
            el usuario decide compartir al autenticarse. La usamos únicamente para visualizar métricas, optimizar
            campañas y generar reportes para el usuario, y no vendemos ni compartimos estos datos con terceros externos.
            Los tokens de acceso de Facebook se almacenan cifrados. Puedes revocar el acceso en cualquier momento desde
            la configuración de aplicaciones de tu perfil de Facebook o escribiéndonos.
          </p>

          <h2>8. Cambios a esta política</h2>
          <p>
            Si cambiamos esta política de fondo, publicaremos la nueva versión aquí con su fecha. Si el cambio afecta
            las finalidades de tus datos, te pediremos de nuevo tu autorización.
          </p>
        </div>
        <p className="a4-cap a4-num a4-legal-meta">Última actualización: {LEGAL_LAST_UPDATE}</p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
