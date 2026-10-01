import React from 'react';
import { SEOHead } from '../components/shared/ui/atoms';
import '../styles/site-v2.css';
import '../styles/pages/legal.css';

const TermsOfService = () => (
  <div className="a4 a4-page a4-legal">
    <SEOHead
      title="Condiciones de Servicio | Ads Manager"
      description="Términos y condiciones legales para el uso de nuestra aplicación de Facebook Ads."
    />
    <div className="a4-wrap">
      <header className="a4-page-head">
        <p className="a4-cap">Legal</p>
        <h1 className="a4-h-lg">Condiciones de Servicio</h1>
      </header>
      <section className="a4-section a4-legal-end">
        <div className="a4-prose">
        <h2>1. Aceptación de los Términos</h2>
        <p>
        Al utilizar esta aplicación ("Ads Manager"), aceptas cumplir con estos términos de servicio y todas las leyes y regulaciones aplicables relacionados con el uso de las APIs de Facebook.
        </p>

        <h2>2. Licencia de Uso</h2>
        <p>
        Se otorga permiso para acceder y utilizar las herramientas de gestión de anuncios para uso personal o comercial legítimo. No está permitido el uso de la aplicación para actividades fraudulentas o que violen las políticas de publicidad de Meta.
        </p>

        <h2>3. Responsabilidad</h2>
        <p>
        La aplicación se proporciona "tal cual". No nos hacemos responsables por decisiones comerciales tomadas basadas en los datos proporcionados por la herramienta, ni por interrupciones en el servicio causadas por cambios en las APIs de terceros.
        </p>

        <h2>4. Limitaciones</h2>
        <p>
        En ningún caso seremos responsables de cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios) que surja del uso o la imposibilidad de usar la aplicación.
        </p>

        <h2>5. Modificaciones</h2>
        <p>
        Podemos revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar esta aplicación, aceptas estar sujeto a la versión actual de estos términos.
        </p>

        </div>
        <p className="a4-cap a4-num a4-legal-meta">Última actualización: 26 de marzo, 2026</p>
      </section>
    </div>
  </div>
);

export default TermsOfService;
