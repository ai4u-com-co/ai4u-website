import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { LEGAL_ENTITY, LEGAL_LAST_UPDATE } from '../data/legalEntity';
import { ROUTES } from '../utils/constants';
import '../styles/site-v2.css';
import '../styles/pages/legal.css';

const DataDeletion = () => (
  <div className="a4 a4-page a4-legal">
    <SEOHead path="/eliminacion-de-datos" />
    <div className="a4-wrap">
      <header className="a4-page-head">
        <p className="a4-cap">Legal</p>
        <h1 className="a4-h-lg">Instrucciones de Eliminación de Datos</h1>
      </header>
      <section className="a4-section a4-legal-end">
        <div className="a4-prose">
        <p>
        De acuerdo con las políticas de Facebook, proporcionamos a continuación las instrucciones para que cualquier usuario pueda solicitar la eliminación de sus datos personales recolectados por nuestra aplicación ("Ads Manager").
        </p>

        <h2>1. A través de la configuración de Facebook</h2>
        <p>
        Puedes eliminar el acceso de nuestra aplicación y tus datos asociados directamente desde tu perfil de Facebook:</p>
        <ol>
            <li>Ve a la configuración de tu cuenta de Facebook.</li>
            <li>Busca la sección "Apps y sitios web".</li>
            <li>Busca "Ads Manager" en la lista.</li>
            <li>Haz clic en "Eliminar" y confirma que deseas borrar toda la actividad asociada.</li>
        </ol>

        <h2>2. Solicitud directa</h2>
        <p>
        Si prefieres que eliminemos manualmente cualquier información que hayamos podido almacenar (como reportes generados, configuraciones de anuncios, tus conversaciones con nosotros o tus datos de contacto), escríbenos a <a href={`mailto:${LEGAL_ENTITY.correoDatos}`}>{LEGAL_ENTITY.correoDatos}</a> con el asunto "Solicitud de eliminación de datos", indicando quién eres y qué quieres que borremos. Respondemos en máximo 15 días hábiles. Más sobre tus derechos en la <Link to={ROUTES.PRIVACY_POLICY}>política de privacidad</Link>.
        </p>

        <h2>3. Qué información se elimina</h2>
        <p>
        Al procesar una solicitud de eliminación, borraremos permanentemente de nuestros servidores cualquier dato personal, tokens de acceso y configuraciones personalizadas asociadas a tu cuenta de Facebook.
        </p>

        </div>
        <p className="a4-cap a4-num a4-legal-meta">Última actualización: {LEGAL_LAST_UPDATE}</p>
      </section>
    </div>
  </div>
);

export default DataDeletion;
