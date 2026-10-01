import React from 'react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/shared/ui/atoms';
import { ROUTES } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import '../styles/site-v2.css';
import '../styles/pages/design-system.css';

const COLORS = [
  { name: 'Pergamino', hex: '#E5E4E0', token: '--a4-canvas', role: 'Lienzo de todas las páginas', bg: '#E5E4E0' },
  { name: 'Tinta', hex: '#1D1D1D', token: '--a4-ink', role: 'Texto, líneas y botones', bg: '#1D1D1D' },
  { name: 'Papel', hex: '#FFFFFF', token: '--a4-paper', role: 'Tarjetas y celdas de logos', bg: '#FFFFFF' },
  { name: 'Ceniza', hex: '#BFBEBE', token: '--a4-ash', role: 'Líneas finas y divisores', bg: '#BFBEBE' },
  { name: 'Piedra', hex: '#CDCDC9', token: '--a4-stone', role: 'Paneles secundarios', bg: '#CDCDC9' },
];

const SCALE = [
  { cls: 'a4-display', name: 'Display', spec: '500 · mayúsculas vía CSS · interlínea .8 · 46–103px' },
  { cls: 'a4-h-lg', name: 'Titular grande', spec: '500 · mayúsculas · interlínea .84 · 38–76px' },
  { cls: 'a4-h-sm', name: 'Titular pequeño', spec: '500 · mayúsculas · interlínea 1 · 30–46px' },
  { cls: 'a4-sub', name: 'Subtítulo', spec: '500 · mayúsculas · interlínea 1 · 22–34px' },
];

const RULES = [
  'Lienzo pergamino, tinta casi negra, superficies blancas y líneas ceniza. Solo modo claro.',
  'La esfera (amarillo, rosa y azul) es el único color y vive solo en la portada. Nunca como relleno de botones ni como color de texto.',
  'Sin sombras. La jerarquía sale de líneas finas, rejillas y espacio.',
  'Los titulares se escriben en caja normal; el CSS los pone en mayúsculas.',
  'Radio 0 en tarjetas y rejillas. Radio 10px solo en pills, enlaces, chips e inputs.',
  'Mobile first: cero scroll horizontal a 375px, áreas táctiles de 44px o más, texto de 12px o más.',
  'Breakpoints 760 (menú) y 900 (columnas). Las tablas van dentro de su propio contenedor con scroll.',
];

const Label: React.FC<{ n: string; children: React.ReactNode }> = ({ n, children }) => (
  <div className="a4-sec-label">
    <span className="a4-cap a4-num">{n}</span>
    <h2 className="a4-sub">{children}</h2>
  </div>
);

const DesignSystem = () => (
  <div className="a4 a4-page">
    <SEOHead
      title="Sistema de diseño | Ai4U"
      description="Lenguaje visual de Ai4U: paleta, tipografía, componentes y reglas."
    />
    <div className="a4-wrap">
      <div className="a4-ds-bar">
        <Link to={ROUTES.HOME} aria-label="Ai4U, inicio" onClick={() => scrollToTop('auto')}>
          <img src="/assets/images/logo-v2-negro.png" alt="Ai4U" width={90} height={30} />
        </Link>
        <Link to={ROUTES.HOME} className="a4-ghost" onClick={() => scrollToTop('auto')}>Ir al inicio →</Link>
      </div>

      <header className="a4-page-head">
        <p className="a4-cap">Sistema de diseño · v2</p>
        <h1 className="a4-display">Editorial sobre papel</h1>
        <p className="a4-lead">
          Cinco colores, dos familias tipográficas y un puñado de piezas. Todo lo que ves en esta página está renderizado con las clases reales del sitio.
        </p>
      </header>

      <section className="a4-section" id="paleta">
        <Label n="01">Paleta</Label>
        <div className="a4-ds-swatches">
          {COLORS.map((c) => (
            <div className="a4-ds-sw" key={c.hex}>
              <div className="a4-ds-chip" style={{ background: c.bg }} role="img" aria-label={`${c.name} ${c.hex}`} />
              <p className="a4-sm"><b>{c.name}</b></p>
              <p className="a4-cap a4-num a4-ds-spec">{c.hex}<br />{c.token}</p>
              <p className="a4-note">{c.role}</p>
            </div>
          ))}
        </div>
        <div className="a4-two" style={{ marginTop: 'clamp(24px, 3vw, 46px)' }}>
          <div className="a4-ds-chip sphere" style={{ maxWidth: 220 }} role="img" aria-label="Esfera de color" />
          <div className="a4-stack">
            <p className="a4-sub">La esfera</p>
            <p>Un degradado de Hot Orange a Moderate Blue que se disuelve en Mint Cream. Es el único lugar donde aparecen los dos colores cálidos y fríos de la marca, máximo una vez por página.</p>
            <p className="a4-cap a4-num a4-ds-spec">--a4-sphere</p>
          </div>
        </div>
      </section>

      <section className="a4-section" id="tipografia">
        <Label n="02">Tipografía</Label>
        <div className="a4-rows">
          <div className="a4-row three">
            <p className="a4-cap">Red Hat Display</p>
            <p className="k">Titulares y texto corrido</p>
            <p className="a4-note">Peso 500 en titulares, 400 en texto. Mayúsculas aplicadas por CSS, nunca escritas.</p>
          </div>
          <div className="a4-row three">
            <p className="a4-cap">Necto Mono</p>
            <p className="k a4-num">Etiquetas, cifras y datos</p>
            <p className="a4-note">12px, mayúsculas, interletrado .05em. Cifras tabulares con a4-num.</p>
          </div>
        </div>
        <div className="a4-ds-scale" style={{ marginTop: 'clamp(24px, 3vw, 46px)' }}>
          {SCALE.map((s) => (
            <div key={s.cls}>
              <div>
                <p className="a4-cap a4-num">.{s.cls}</p>
                <p className="a4-note">{s.spec}</p>
              </div>
              <p className={s.cls}>Orden y flujo</p>
            </div>
          ))}
          <div>
            <div>
              <p className="a4-cap a4-num">.a4-cap</p>
              <p className="a4-note">Etiqueta mono 12px</p>
            </div>
            <p className="a4-cap">Etiqueta · 12px mono</p>
          </div>
          <div>
            <div>
              <p className="a4-cap a4-num">.a4-sm / base</p>
              <p className="a4-note">15px y 18px</p>
            </div>
            <div className="a4-stack">
              <p>Texto base de 18px para lectura continua, con interlínea 1.4.</p>
              <p className="a4-sm">Texto pequeño de 15px para apoyos y descripciones.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="a4-section" id="componentes">
        <Label n="03">Componentes</Label>

        <p className="a4-cap" style={{ marginBottom: 14 }}>Ghost y pill</p>
        <div className="a4-ds-demo">
          <a className="a4-ghost" href="#componentes" onClick={(e) => e.preventDefault()}>Enlace fantasma →</a>
          <a className="a4-pill" href="#componentes" onClick={(e) => e.preventDefault()}>Pill de acción</a>
        </div>

        <p className="a4-cap" style={{ margin: '36px 0 14px' }}>Chip</p>
        <div className="a4-ds-demo">
          <span className="a4-chip">Etiqueta</span>
          <span className="a4-chip on">Activa</span>
        </div>

        <p className="a4-cap" style={{ margin: '36px 0 14px' }}>Input</p>
        <input className="a4-input" style={{ maxWidth: 420 }} placeholder="Campo de texto" aria-label="Ejemplo de campo de texto" />

        <p className="a4-cap" style={{ margin: '36px 0 14px' }}>Card sobre papel cuadriculado</p>
        <div className="a4-cards" style={{ marginTop: 0 }}>
          <div className="a4-card">
            <p className="a4-cap a4-num">01</p>
            <p className="a4-sub">Tarjeta</p>
            <p>Radio 0, fondo blanco con cuadrícula Mint Cream de 24px.</p>
          </div>
          <div className="a4-card">
            <p className="a4-cap a4-num">02</p>
            <p className="a4-sub">Otra tarjeta</p>
            <p>Se apilan en una columna por debajo de 900px.</p>
          </div>
        </div>

        <p className="a4-cap" style={{ margin: '36px 0 14px' }}>Row (fila con línea fina)</p>
        <div className="a4-rows">
          <div className="a4-row"><p className="k">Clave</p><p>Valor de la fila, dos columnas desde 900px.</p></div>
          <div className="a4-row"><p className="k">Otra clave</p><p>Otra fila separada por una línea Cadet Gray.</p></div>
        </div>

        <p className="a4-cap" style={{ margin: '36px 0 14px' }}>Rejilla con hairlines</p>
        <div className="a4-ds-hair">
          <div><p className="a4-cap">A</p></div>
          <div><p className="a4-cap">B</p></div>
          <div><p className="a4-cap">C</p></div>
        </div>
      </section>

      <section className="a4-section a4-cta" id="reglas">
        <Label n="04">Reglas</Label>
        <div className="a4-rows a4-ds-rules">
          {RULES.map((r) => (
            <div className="a4-row" key={r}>
              <p>{r}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default DesignSystem;
