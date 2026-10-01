import React from 'react';
import { SEOHead } from '../components/shared/ui/atoms';
import { APP_CONFIG } from '../utils/constants';
import '../styles/site-v2.css';
import '../styles/pages/propuesta-el-barril.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const SERVICES = [
  {
    id: '1',
    title: 'Diagnóstico',
    price: '$0',
    question: '¿Dónde está tu equipo hoy con la IA y qué se puede automatizar?',
    desc: 'Evaluamos el estado real de automatización del negocio: atención al cliente por WhatsApp, gestión de pedidos, creación de contenido para redes, catering y cursos online. Se evalúa un grupo de hasta 10 personas y se entrega un mapa priorizado de oportunidades.',
    duration: '1 semana'
  },
  {
    id: '2',
    title: 'Sprint Inicial',
    price: '$4.758.000',
    question: '4 días para salir con un prototipo real, construido por tu propio equipo.',
    desc: 'Taller intensivo en vivo, 6 horas/día durante 4 días. Con hasta 8 líderes, priorizamos qué automatizar primero —WhatsApp, e-commerce, o contenido— y construimos juntos el prototipo V0.1. El equipo aprende haciendo.',
    duration: '4 días'
  },
  {
    id: '3',
    title: 'SuperAI v1.0 — Tu Primer Empleado IA',
    price: '$5.856.000',
    question: 'Un empleado que trabaja 24/7, conoce tu marca y nunca se cansa.',
    desc: 'Diseñamos tu primer agente entrenado con la voz de Asadores El Barril. Genera guiones, copy, storyboards e ideas de recetas. Incluye acceso básico (Correo, WhatsApp, Calendar, Drive) y 10 horas de vibe coding para enseñarte a entrenarlo. Las posibilidades son ilimitadas: asesor de catering, community manager, vendedor o coordinador.',
    duration: 'Implementación + Entrenamiento'
  },
  {
    id: '4',
    title: 'Avatar Digital',
    price: '$1.464.000',
    question: 'La cara de tu marca en el mundo digital.',
    desc: 'Creación del avatar personalizado de Asadores El Barril para contenido, cursos y comunicaciones. Se entrega un lookbook completo de 50 fotos de referencia visual, listo para producción.',
    duration: 'Producción de activos'
  },
  {
    id: '5',
    title: 'Social Listening',
    price: '$2.196.000',
    question: 'Saber en tiempo real qué dice el mundo de tu marca.',
    desc: 'Automatización activa que monitorea 24/7 las redes de Asadores El Barril o de la competencia —tú decides. Alertas, reportes y tendencias en tiempo real para capturar cada oportunidad.',
    duration: 'Monitoreo 24/7'
  },
  {
    id: '6',
    title: 'Educación IA',
    price: '$8.800.000',
    question: 'Llevar a tu equipo al siguiente nivel.',
    desc: '4 grupos de 8 personas. Pensum co-diseñado: Framework 5D (Fluency, Delegation, Description, Diligence, Discernment). Enfocado en flujos inteligentes para e-commerce, catering y cursos. Clases virtuales personalizadas.',
    duration: '40 horas totales ($220.000/h)'
  }
];

const PropuestaElBarril: React.FC = () => {
  return (
    <div className="a4 a4-page">
      <SEOHead
        title="Propuesta Asadores El Barril | Ai4U"
        description="Propuesta de consultoría de inteligencia artificial para Asadores El Barril."
        canonical="https://www.ai4u.com.co/propuesta-el-barril"
        noIndex
      />

      <header className="a4-page-head a4-wrap">
        <div className="a4-barril-meta">
          <div className="a4-barril-logos">
            <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={90} height={30} />
            <i aria-hidden="true" />
            <img className="chumi" src="/assets/images/LOGO chumi.png" alt="Casa de David Producciones" />
            <i aria-hidden="true" />
            <span className="bar">
              <img src="/assets/images/el-barril-logo-white.png" alt="El Barril" />
            </span>
          </div>
          <p className="a4-cap">Cotización consultoría IA · Febrero 2026</p>
        </div>

        <h1 className="a4-display">Asadores El Barril: consultoría AI-First.</h1>
        <p className="a4-h-sm" style={{ maxWidth: '20ch' }}>Infraestructura que escala en 6 meses.</p>
        <p className="a4-cap">Preparado para: equipo directivo de Asadores El Barril</p>
      </header>

      <section className="a4-section a4-wrap">
        <div className="a4-two">
          <div className="a4-stack">
            <p className="a4-cap">Modelo de consultoría modular</p>
          </div>
          <div className="a4-prose">
            <p>
              Esta propuesta está diseñada como un plan integral de 6 meses para transformar a Asadores El Barril en una compañía AI-First.
            </p>
            <p>
              <strong>Nota:</strong> aunque se recomienda el ciclo completo para asegurar la integración, cada servicio se puede contratar de forma independiente según las prioridades del negocio.
            </p>
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-label="Servicios">
        <div className="a4-sec-label"><p className="a4-cap">Servicios</p></div>
        <div className="a4-rows">
          {SERVICES.map(service => (
            <article key={service.id} className="a4-barril-item">
              <div className="a4-barril-svc">
                <div>
                  <div className="head">
                    <span className="a4-cap a4-num">{service.id.padStart(2, '0')}</span>
                    <h2 className="a4-sub">{service.title}</h2>
                  </div>
                  <p className="q">{service.question}</p>
                  <p className="a4-prose" style={{ margin: 0 }}>{service.desc}</p>
                  <div className="chips">
                    <span className="a4-chip">Duración: {service.duration}</span>
                    <span className="a4-chip">Contratación independiente</span>
                  </div>
                </div>
                <div className="a4-barril-price">
                  <p className="a4-cap">Inversión</p>
                  <strong className="a4-num">{service.price}</strong>
                  <p className="a4-cap">COP</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap">
        <div className="a4-card a4-barril-total">
          <p className="a4-cap">Inversión semestral sugerida</p>
          <strong className="a4-num">$23.074.000 COP</strong>
          <p style={{ maxWidth: '52ch' }}>
            Un equipo completo de IA y una cultura de automatización operando por menos de lo que cuesta un solo empleado senior.
          </p>
        </div>
      </section>

      <section className="a4-section a4-wrap">
        <div className="a4-two">
          <div className="a4-stack">
            <p className="a4-cap">Garantía Ai4U</p>
          </div>
          <p style={{ margin: 0 }}>
            Si en los primeros 30 días del Sprint Inicial no demostramos un impacto tangible en la agilidad de tu equipo, ajustamos el enfoque sin costo adicional. No entregamos código, entregamos resultados.
          </p>
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>¿Empezamos con el diagnóstico?</h2>
        <p className="a4-sm" style={{ marginTop: 24, maxWidth: '52ch' }}>
          El primer paso no tiene costo ni compromiso. Solo necesitamos 1 hora de tu tiempo para mapear el futuro de Asadores El Barril.
        </p>
        <div style={{ marginTop: 8 }}>
          <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Agendar diagnóstico por WhatsApp →</a>
        </div>
        <div className="a4-barril-sign">
          <p style={{ margin: 0, fontWeight: 500 }}>Mariano García Posada</p>
          <p className="a4-cap">CEO Ai4U · Consultoría estratégica</p>
        </div>
      </section>
    </div>
  );
};

export default PropuestaElBarril;
