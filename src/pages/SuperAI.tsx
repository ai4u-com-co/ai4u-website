import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/shared/ui/atoms';
import { APP_CONFIG, ROUTES } from '@/utils/constants';
import { scrollToTop } from '@/utils/helpers';
import '@/styles/site-v2.css';
import '@/styles/pages/super-ai.css';

interface SuperAIProps {
  isModal?: boolean;
}

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const problems = [
  { title: 'Incapacidad de escalar', desc: 'Tu operación depende de procesos manuales que no pueden crecer sin contratar más personal.' },
  { title: 'Silos de información', desc: 'Datos dispersos en múltiples plataformas que no se comunican entre sí, causando errores.' },
  { title: 'Costos operativos altos', desc: 'Las tareas repetitivas consumen buena parte del tiempo de tu equipo más experimentado.' },
  { title: 'Falta de trazabilidad', desc: 'Dificultad para auditar decisiones y acciones tomadas en procesos críticos de negocio.' }
];

const benefits = [
  { title: 'Chatea con tu empresa', description: 'Accede a cualquier dato de tu negocio preguntándole a tu agente como si fuera un experto de tu equipo.' },
  { title: 'Conexión total (API)', description: 'Se integra nativamente con tu ERP, CRM, MRP y cualquier proveedor de servicios que utilices.' },
  { title: 'Enseñanza continua', description: 'Le enseñamos tus protocolos específicos. Aprende a ejecutar procesos como tú los necesitas.' },
  { title: 'Capa de inteligencia', description: 'La primera capa de razonamiento que unifica silos de datos en acciones concretas.' },
  { title: 'Acceso privado', description: 'Solo tiene acceso a lo que tú le permitas, bajo tu propia gobernanza.' },
  { title: 'Agentes ejecutores', description: 'No solo responden dudas; tienen autonomía para operar en tus sistemas (email, CRM, ERP).' }
];

const results = [
  'Conectividad entre ERP, CRM y planta',
  'Toma de decisiones asistida para la gerencia',
  'Orquestación de sistemas legacy y modernos',
  'Ejecución bajo protocolos privados y auditables'
];

const steps = [
  { num: '01', title: 'Entrenamiento inicial', subtitle: 'Acceso y contexto', description: 'Le damos acceso a tus sistemas y le enseñamos tus procesos clave de negocio.' },
  { num: '02', title: 'Integración de skills', subtitle: 'Configuración API', description: 'Conectamos tu ERP, CRM o MRP para que el agente pueda leer y ejecutar acciones.' },
  { num: '03', title: 'Ejecución autónoma', subtitle: 'Producción', description: 'Tu nuevo empleado empieza a chatear con tu empresa y resolver tareas 24/7.' }
];

const skillsLibrary = [
  { category: 'Recursos humanos', skills: ['Filtro inteligente de CVs', 'Coordinación de entrevistas', 'Onboarding de ingresos', 'Gestión de consultas internas', 'Asistente de nómina', 'Análisis de clima laboral'] },
  { category: 'Producción y planta', skills: ['Inventario en tiempo real', 'Monitoreo de máquinas IoT', 'Gestión de órdenes de producción', 'Optimización de rutas', 'Reportes de eficiencia OEE', 'Alertas de mantenimiento'] },
  { category: 'Ventas y CRM', skills: ['Cualificación de prospectos', 'Actualización de CRM', 'Booking de citas', 'Seguimiento proactivo', 'Análisis de competencia', 'Resumen de reuniones'] },
  { category: 'Finanzas', skills: ['Conciliación bancaria', 'Procesamiento de facturas con OCR', 'Control de gastos y viáticos', 'Proyección de flujo de caja', 'Preparación de auditoría', 'Alertas de morosidad'] },
  { category: 'Atención al cliente', skills: ['Resolución de dudas 24/7', 'Triage de tickets de soporte', 'Seguimiento de pedidos', 'Análisis de satisfacción', 'Base de conocimientos viva', 'Escalamiento inteligente'] }
];

const provenCapabilities = [
  { title: 'Conexión real a SAP Business One', description: 'No es una demo: lee y escribe en el ERP en vivo — inventario, cartera, órdenes de producción — a través de un gateway propio, no de un intermediario.' },
  { title: 'WhatsApp con IA que escala', description: 'Atiende, resuelve y sabe cuándo pasarle la conversación a una persona, con memoria de cada hilo.' },
  { title: 'Cobro de cartera que sale solo', description: 'Revisa facturas vencidas y envía el recordatorio todos los días, sin que nadie tenga que acordarse de escribirlo.' },
  { title: 'Tablero de planta en vivo', description: 'Reemplaza el Excel de producción por una pantalla que el propio operario actualiza en el piso de planta.' },
  { title: 'Cockpit ejecutivo diario', description: 'Un número y una alerta por área de negocio, con el detalle a un clic — lo primero que se revisa cada mañana.' }
];

type Cell = boolean | string;
const comparison: { feature: string; chatbot: Cell; copilot: Cell; superai: Cell }[] = [
  { feature: 'Empatía y juicio humano', chatbot: false, copilot: false, superai: 'Socio humano' },
  { feature: 'Chatea con toda tu empresa', chatbot: 'Limitado', copilot: 'Solo Office', superai: true },
  { feature: 'Conexión a ERP / CRM / MRP', chatbot: false, copilot: 'Nativo MSFT', superai: true },
  { feature: 'Le puedes enseñar procesos', chatbot: false, copilot: false, superai: true },
  { feature: 'Acceso y seguridad privada', chatbot: false, copilot: 'Capa pública', superai: true },
  { feature: 'Opera 24/7 sin supervisión', chatbot: true, copilot: false, superai: true }
];

const tiers = [
  {
    name: 'Discovery',
    tagline: 'Sin costo',
    features: [
      'Llamada diagnóstica de 30 min',
      'Roadmap de arquitectura IA personalizado',
      'Mapa de integración con tus sistemas',
      'Plan de implementación detallado'
    ],
    for: 'Para empresas explorando IA',
    buttonText: 'Agendar diagnóstico'
  },
  {
    name: 'Starter',
    tagline: 'Un solo proceso',
    includes: 'Incluye:',
    features: [
      'Suite completo: email, drive, tasks, dashboard',
      '8 agentes + 8 skills pre-construidos',
      'Sesión de onboarding 1-a-1',
      '1 reunión mensual de seguimiento (45 min)',
      'Capacitación para entrenar tu propio asistente',
      'Soporte WhatsApp en horario de oficina',
      'Tu asistente sigue operando al terminar el contrato'
    ],
    for: 'Emprendedores y equipos de 1-10 personas',
    buttonText: 'Cotizar mi caso'
  },
  {
    name: 'Business',
    tagline: 'Varias áreas conectadas',
    includes: 'Todo lo de Starter, más:',
    features: [
      '3 skills adicionales configurados a medida',
      'Reunión mensual con enfoque estratégico',
      'Capacitación para que todo tu equipo entrene el asistente'
    ],
    for: 'Empresas en crecimiento de 10-50 personas',
    highlight: true,
    buttonText: 'Cotizar mi caso'
  },
  {
    name: 'Enterprise',
    tagline: 'Toda la operación',
    includes: 'Todo lo de Business, más:',
    features: [
      '2 skills adicionales a medida (5 total)',
      '2 reuniones mensuales estratégicas (45 min c/u)',
      'Workshop virtual trimestral de educación IA',
      'Consultoría estratégica: agentes con visión de negocio'
    ],
    for: 'Empresas de 50+ personas',
    buttonText: 'Consultar viabilidad'
  }
];

const considerations = [
  { k: 'Consumo de LLM y APIs', v: 'Los costos de consumo de modelos (OpenAI, Anthropic, etc.) se facturan directamente a tu tarjeta. La inversión depende de la inteligencia y el volumen de ejecución requerido.' },
  { k: 'Hardware dedicado', v: 'SuperAI requiere una estación de trabajo (PC/servidor) dedicada para garantizar ejecución continua 24/7 y total soberanía sobre tus datos.' },
  { k: 'Compromiso mínimo', v: 'El contrato mínimo es de 6 meses. Este tiempo permite la correcta integración y el aprendizaje del agente.' },
  { k: 'Tu asistente es tuyo', v: 'Cuando termina tu contrato, tu asistente no se apaga. Todo lo que construimos juntos sigue funcionando: es tu empleado digital y trabaja para ti, no para nosotros.' }
];

const faqs = [
  { q: '¿Qué es la capa de inteligencia y por qué es un "empleado"?', a: 'A diferencia de una herramienta estática, la capa de inteligencia de ai4u aprende tus procesos, se conecta a tus sistemas y actúa de forma autónoma. Es el primer miembro digital de tu equipo que nunca olvida y siempre está disponible.' },
  { q: '¿Realmente le puedo enseñar lo que yo quiera?', a: 'Sí. Si tienes un proceso documentado o un flujo de trabajo que se realiza en un sistema digital, podemos "entrenar" al agente para que lo ejecute con precisión.' },
  { q: '¿Cómo chatea con mi empresa?', a: 'Nos conectamos a tus bases de datos y sistemas (ERP, CRM). Puedes preguntarle en lenguaje natural: "¿Cuál es el inventario real hoy?" o "¿Por qué se retrasó el pedido X?", y consultará tus sistemas en tiempo real para responderte.' },
  { q: '¿Qué tan seguro es darle acceso a mis sistemas?', a: 'La seguridad es prioridad. El agente solo tiene acceso a lo que tú decidas y toda la información se procesa en una capa privada diseñada para cumplimiento empresarial.' }
];

const renderCell = (v: Cell, strong = false) => {
  if (v === true) return <span className="a4-superai-yes" role="img" aria-label="Sí" style={strong ? undefined : { opacity: 0.4 }} />;
  if (v === false) return <span aria-label="No">—</span>;
  return <span>{v}</span>;
};

const SuperAI: React.FC<SuperAIProps> = ({ isModal = false }) => {
  const top = () => scrollToTop('auto');
  const Wa: React.FC<{ children: React.ReactNode; pill?: boolean }> = ({ children, pill }) => (
    <a className={pill ? 'a4-pill' : 'a4-ghost'} href={whatsappUrl} target="_blank" rel="noopener noreferrer">{children}</a>
  );

  return (
    <div className="a4 a4-page">
      {!isModal && (
        <SEOHead
          title="Tu primer empleado AI | AI4U"
          description="Tu primer empleado AI que chatea con tu empresa, se conecta a tus sistemas (ERP, CRM, MRP) y aprende a ejecutar tus procesos."
          canonical="https://www.ai4u.com.co/super-ai"
        />
      )}

      <header className={`a4-superai-hero a4-wrap${isModal ? ' is-modal' : ''}`}>
        <div className="a4-page-head">
          <div className="a4-superai-orb" aria-hidden="true">
            <div className="a4-sphere"><img alt="" src="/assets/images/isotipo-negro.png" /></div>
          </div>
          <p className="a4-cap">Ai4U · Empleado digital v1</p>
          <h1 className="a4-display">Tu primer empleado AI corporativo</h1>
          <p className="a4-lead">La primera capa de inteligencia que chatea con tu empresa y orquesta tus sistemas (ERP, CRM, MRP) en una sola fuente de verdad.</p>
          <div><Wa pill>Contratar mi agente →</Wa></div>
        </div>
      </header>

      <section className="a4-section a4-wrap" aria-labelledby="sai-problema">
        <div className="a4-two">
          <div className="a4-stack">
            <p className="a4-cap">El problema</p>
            <h2 className="a4-h-lg" id="sai-problema">Claridad absoluta. Cero fricción.</h2>
            <p className="a4-sm">Deja de pelear con hojas de cálculo y sistemas que no se hablan. Dale a tu equipo la inteligencia que merece.</p>
          </div>
          <div className="a4-rows">
            {problems.map((p, i) => (
              <div className="a4-row" key={p.title}>
                <p className="a4-cap"><span className="a4-num">{String(i + 1).padStart(2, '0')}</span> · {p.title}</p>
                <p className="a4-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-solucion">
        <div className="a4-sec-label"><p className="a4-cap">La solución</p></div>
        <div className="a4-two" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>
          <h2 className="a4-h-lg" id="sai-solucion">El protocolo: tu empleado digital</h2>
          <p style={{ margin: 0 }}>Le podemos enseñar a que haga lo que queramos, con acceso controlado.</p>
        </div>
        <div className="a4-grid">
          {benefits.map(b => (
            <article className="a4-card" key={b.title} style={{ gridColumn: 'auto' }}>
              <h3 className="a4-sub">{b.title}</h3>
              <p className="a4-sm">{b.description}</p>
            </article>
          ))}
        </div>
        <div className="a4-paper" style={{ marginTop: 19, border: '1px solid var(--a4-ash)' }}>
          <p className="a4-cap" style={{ marginBottom: 14 }}>Es tu primer empleado AI</p>
          <ul className="a4-superai-list">
            {results.map(r => <li key={r}>{r}</li>)}
          </ul>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-como">
        <div className="a4-sec-label"><p className="a4-cap">Cómo funciona</p></div>
        <h2 className="a4-h-lg" id="sai-como" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>Onboarding en 3 pasos</h2>
        <div className="a4-rows">
          {steps.map(s => (
            <div className="a4-row three" key={s.num}>
              <p className="a4-cap"><span className="a4-num">{s.num}</span> · {s.subtitle}</p>
              <h3 className="a4-sub">{s.title}</h3>
              <p className="a4-sm">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-skills">
        <div className="a4-sec-label"><p className="a4-cap">Ecosistema de skills</p></div>
        <div className="a4-two" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>
          <h2 className="a4-h-lg" id="sai-skills">Ejemplos de skills</h2>
          <p style={{ margin: 0 }}>Tu agente no tiene límites: cada skill es una capacidad única que desarrollamos a medida de tus procesos. Estos son algunos ejemplos de lo que podemos construir juntos.</p>
        </div>
        <div className="a4-grid">
          {skillsLibrary.map(cat => (
            <article className="a4-card" key={cat.category} style={{ gridColumn: 'auto' }}>
              <h3 className="a4-sub">{cat.category}</h3>
              <ul className="a4-superai-list">
                {cat.skills.map(s => <li key={s}>{s}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-prod">
        <div className="a4-sec-label"><p className="a4-cap">Ya en producción</p></div>
        <div className="a4-two" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>
          <h2 className="a4-h-lg" id="sai-prod">No es una promesa</h2>
          <p style={{ margin: 0 }}>Esto no es lo que vamos a construir algún día. Es lo que ya opera todos los días en negocios reales.</p>
        </div>
        <div className="a4-rows">
          {provenCapabilities.map((c, i) => (
            <div className="a4-row" key={c.title}>
              <h3 className="a4-sub"><span className="a4-num a4-cap">{String(i + 1).padStart(2, '0')} · </span>{c.title}</h3>
              <p className="a4-sm">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-dif">
        <div className="a4-sec-label"><p className="a4-cap">Diferenciación</p></div>
        <h2 className="a4-h-lg" id="sai-dif" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>Más que un chatbot</h2>
        <div className="a4-table-wrap">
          <table className="a4-superai-table">
            <thead>
              <tr><th scope="col">Capacidad</th><th scope="col">Chatbot</th><th scope="col">Copilot</th><th scope="col">SuperAI</th></tr>
            </thead>
            <tbody>
              {comparison.map(r => (
                <tr key={r.feature}>
                  <td>{r.feature}</td>
                  <td>{renderCell(r.chatbot)}</td>
                  <td>{renderCell(r.copilot)}</td>
                  <td><strong>{renderCell(r.superai, true)}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-planes">
        <div className="a4-sec-label"><p className="a4-cap">Planes</p></div>
        <div className="a4-two" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>
          <h2 className="a4-h-lg" id="sai-planes">Un plan por alcance, no por talla única</h2>
          <p style={{ margin: 0 }}>Cotización a medida en la llamada de diagnóstico.</p>
        </div>
        <div className="a4-grid two-col">
          {tiers.map(t => (
            <article className={`a4-card a4-superai-tier${t.highlight ? ' on' : ''}`} key={t.name} style={{ gridColumn: 'auto' }}>
              <p className="a4-cap">{t.tagline}{t.highlight ? ' · Recomendado' : ''}</p>
              <h3 className="a4-h-sm">{t.name}</h3>
              <p className="a4-note">{t.for}</p>
              {t.includes && <p className="a4-cap">{t.includes}</p>}
              <ul className="a4-superai-list">
                {t.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <Wa>{t.buttonText} →</Wa>
            </article>
          ))}
        </div>
        <p className="a4-note" style={{ marginTop: 19 }}>Skills y reuniones adicionales se cotizan por separado según lo que necesite tu operación.</p>

        <div style={{ marginTop: 'clamp(32px, 4vw, 56px)' }}>
          <p className="a4-cap" style={{ marginBottom: 14 }}>Consideraciones de operación</p>
          <div className="a4-rows">
            {considerations.map(c => (
              <div className="a4-row" key={c.k}>
                <p className="k">{c.k}</p>
                <p className="a4-sm">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="a4-section a4-wrap" aria-labelledby="sai-faq">
        <div className="a4-sec-label"><p className="a4-cap">Preguntas frecuentes</p></div>
        <h2 className="a4-h-lg" id="sai-faq" style={{ marginBottom: 'clamp(24px, 3vw, 46px)' }}>Preguntas frecuentes</h2>
        <div className="a4-superai-faq">
          {faqs.map(f => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p className="a4-sm">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="a4-cta a4-wrap">
        <p className="a4-cap" style={{ marginBottom: 24 }}>Empecemos</p>
        <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>Tu futuro es una decisión hoy.</h2>
        <p className="a4-sm" style={{ marginTop: 24 }}>Esta es la versión 1.0 de tu empresa inteligente.</p>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: '0 28px' }}>
          <Wa>Solicitar diagnóstico gratuito →</Wa>
          {!isModal && <Link className="a4-ghost" to={ROUTES.AGENTES} onClick={top}>Ver el catálogo de agentes →</Link>}
        </div>
      </section>
    </div>
  );
};

export default SuperAI;
