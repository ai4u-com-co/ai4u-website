import React from 'react';
import { SEOHead } from '../components/shared/ui/atoms';
import '../styles/site-v2.css';
import '../styles/pages/legal.css';

const PrivacyPolicy = () => (
  <div className="a4 a4-page a4-legal">
    <SEOHead
      title="Política de Privacidad | Ads Manager"
      description="Información sobre cómo manejamos tus datos en nuestra aplicación de Facebook Ads."
    />
    <div className="a4-wrap">
      <header className="a4-page-head">
        <p className="a4-cap">Legal</p>
        <h1 className="a4-h-lg">Política de Privacidad</h1>
      </header>
      <section className="a4-section a4-legal-end">
        <div className="a4-prose">
        <h2>1. Información que Recolectamos</h2>
        <p>
        Nuestra aplicación de búsqueda y gestión de anuncios (Ads Manager) accede a información pública y autorizada a través de las APIs de Facebook. Esto incluye datos básicos del perfil, estadísticas de anuncios y métricas de rendimiento que el usuario decide compartir explícitamente al autenticarse.
        </p>

        <h2>2. Uso de la Información</h2>
        <p>
        La información recolectada se utiliza únicamente para proveer las funcionalidades de la aplicación, como la visualización de métricas, optimización de campañas y generación de reportes personalizados para el usuario. No vendemos ni compartimos estos datos con terceros externos.
        </p>

        <h2>3. Almacenamiento y Seguridad</h2>
        <p>
        Implementamos medidas de seguridad técnicas y organizativas para proteger los datos contra accesos no autorizados, pérdida o alteración. Los tokens de acceso de Facebook se almacenan de forma cifrada y segura.
        </p>

        <h2>4. Tus Derechos</h2>
        <p>
        Puedes revocar el acceso de nuestra aplicación a tus datos en cualquier momento a través de la configuración de aplicaciones en tu perfil de Facebook o contactándonos directamente.
        </p>

        <h2>5. Contacto</h2>
        <p>
        Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de los canales oficiales habilitados en la plataforma.
        </p>

        </div>
        <p className="a4-cap a4-num a4-legal-meta">Última actualización: 26 de marzo, 2026</p>
      </section>
    </div>
  </div>
);

export default PrivacyPolicy;
