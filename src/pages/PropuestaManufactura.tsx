import React from 'react';
import { APP_CONFIG } from '../utils/constants';
import '../styles/site-v2.css';

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const PROBLEMS = [
  { title: 'El costo del "lag" de decisión', text: 'Un cuello de botella en la Línea A detectado 4 horas tarde significa toneladas de producción perdida. La falta de un vínculo en tiempo real entre planta y gerencia castiga su EBITDA.' },
  { title: 'Silos de información legacy', text: 'Datos que están en el ERP nunca hablan con los del CRM. Super AI actúa como el orquestador que automatiza los flujos entre plataformas para que no haya burocracia digital.' },
  { title: 'Dependencia de persona clave', text: 'Si el analista de datos no está, el CEO no tiene visibilidad. Super AI democratiza el acceso a la inteligencia operativa corporativa sin depender de terceros.' },
];

const SKILLS = [
  { title: 'Orquestación de sistemas', desc: 'Conecta ERPs (SAP, Oracle, Odoo) con sus canales de comunicación y sistemas de planta. Super AI maneja la data para que usted maneje el negocio.' },
  { title: 'Inteligencia operativa', desc: 'Reportes ejecutivos automáticos. Super AI analiza tendencias en tiempo real y alerta sobre desviaciones críticas antes de que afecten el P&L.' },
  { title: 'Visibilidad de planta 360°', desc: 'Interrogue a su fábrica en lenguaje natural. "¿Cuál es el cuello de botella actual en la línea 3?" Super AI responde basándose en data real.' },
];

const METRICS = [
  { label: 'Tiempo de respuesta', val: '-85%', desc: 'De horas a segundos en consultas operativas.' },
  { label: 'Carga administrativa', val: '-40%', desc: 'Liberación de mandos medios para tareas de valor.' },
  { label: 'Precisión de data', val: '99.9%', desc: 'Eliminación del error humano en la captura y reporte.' },
];

const RECEIVES = [
  'Propiedad total de la infraestructura de IA',
  'Integración de data feeds en tiempo real',
  'Asistente de decisión vía WhatsApp/Web',
  'Mejoras continuas y nuevos conectores',
  'Soberanía total de datos (SaaS privado)',
];

const PropuestaManufactura: React.FC = () => {
  return (
    <div className="a4 a4-page">
      <div className="a4-wrap">
        {/* Encabezado */}
        <header className="a4-page-head">
          <p className="a4-cap">Ai4U · Orquestación ejecutiva · Febrero 2026</p>
          <h1 className="a4-display" style={{ maxWidth: '14ch' }}>Su fábrica produce datos masivos.</h1>
          <p className="a4-sub" style={{ maxWidth: '22ch' }}>Super AI los convierte en decisiones ejecutivas.</p>
          <p className="a4-cap">Preparado para: CEO — Dirección de Operaciones Industriales</p>
        </header>

        {/* 1. El problema */}
        <section className="a4-section">
          <div className="a4-sec-label">
            <span className="a4-cap a4-num">01</span>
            <span className="a4-cap">El techo de vidrio digital</span>
          </div>
          <div className="a4-two">
            <h2 className="a4-h-lg">¿Por qué las fábricas se detienen aunque los datos fluyan?</h2>
            <p style={{ margin: 0 }}>
              La manufactura moderna sufre de una <strong>parálisis por fragmentación</strong>. Tiene sistemas para todo (ERP, MES, IoT, CRM), pero para responder una pregunta estratégica sencilla, usted depende de reportes manuales que tardan días en consolidarse. Ese tiempo entre el evento y la decisión es donde se pierde el margen.
            </p>
          </div>
          <div className="a4-grid" style={{ marginTop: 'clamp(24px, 3vw, 46px)' }}>
            {PROBLEMS.map((p) => (
              <article className="a4-card" key={p.title} style={{ gridColumn: 'auto' }}>
                <h3 className="a4-sub">{p.title}</h3>
                <p className="a4-sm">{p.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 2. La solución */}
        <section className="a4-section">
          <div className="a4-sec-label">
            <span className="a4-cap a4-num">02</span>
            <span className="a4-cap">Super AI: Executive Orchestrator</span>
          </div>
          <h2 className="a4-h-lg" style={{ maxWidth: '16ch' }}>No es un software más.</h2>
          <p style={{ margin: '24px 0 clamp(24px, 3vw, 46px)', maxWidth: '46ch' }}>
            Es la capa de inteligencia que orquesta su infraestructura actual.
          </p>
          <div className="a4-rows">
            {SKILLS.map((s) => (
              <div className="a4-row" key={s.title}>
                <h3 className="a4-sub">{s.title}</h3>
                <p style={{ margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <p className="a4-cap" style={{ margin: 'clamp(40px, 5vw, 76px) 0 clamp(16px, 2vw, 24px)' }}>Métrica clave para el CEO: el ROI de la atención</p>
          <div className="a4-grid">
            {METRICS.map((m) => (
              <article className="a4-card" key={m.label} style={{ gridColumn: 'auto' }}>
                <p className="a4-h-sm a4-num">{m.val}</p>
                <p className="a4-cap">{m.label}</p>
                <p className="a4-sm">{m.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* 3. Inversión */}
        <section className="a4-section">
          <div className="a4-sec-label">
            <span className="a4-cap a4-num">03</span>
            <span className="a4-cap">Inversión estratégica</span>
          </div>
          <div className="a4-two">
            <div className="a4-stack" style={{ gap: 28 }}>
              <div className="a4-stack">
                <p className="a4-cap">Orquestador industrial (setup)</p>
                <p className="a4-h-lg a4-num" style={{ fontFamily: 'inherit' }}>$2,500 <span className="a4-cap">USD</span></p>
                <p className="a4-sm">Incluye mapeo de arquitectura de datos, integración con 2 sistemas core (ERP/CRM) y entrenamiento del orquestador ejecutivo.</p>
              </div>
              <div className="a4-stack" style={{ borderTop: '1px solid var(--a4-ash)', paddingTop: 24 }}>
                <p className="a4-cap">Acompañamiento estratégico</p>
                <p className="a4-h-sm a4-num" style={{ fontFamily: 'inherit' }}>$350 <span className="a4-cap">USD/mes</span></p>
              </div>
            </div>
            <div>
              <p className="a4-cap" style={{ marginBottom: 16 }}>Lo que usted recibe</p>
              <div className="a4-rows">
                {RECEIVES.map((item) => (
                  <div className="a4-row" key={item} style={{ gridTemplateColumns: 'minmax(0,auto) minmax(0,1fr)' }}>
                    <span aria-hidden="true">→</span>
                    <p style={{ margin: 0 }}>{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. Siguiente paso */}
        <section className="a4-cta">
          <p className="a4-cap" style={{ marginBottom: 24 }}>04 · Siguiente paso</p>
          <h2 className="a4-h-lg" style={{ maxWidth: '12ch' }}>Transforme su operación</h2>
          <p style={{ marginTop: 24, maxWidth: '46ch' }}>
            Agendemos una revisión de arquitectura técnica y objetivos ejecutivos para diseñar su hoja de ruta de orquestación.
          </p>
          <div style={{ marginTop: 8 }}>
            <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropuestaManufactura;
