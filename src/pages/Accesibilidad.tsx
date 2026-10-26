import React from 'react';
import { SEOHead } from '../components/shared/ui/atoms';
import { APP_CONFIG } from '../utils/constants';
import '../styles/site-v2.css';

// Declaración de accesibilidad. Se actualiza con cada auditoría (fecha y limitaciones conocidas): lo que dice aquí
// tiene que ser verificable, no una promesa.
const AUDITORIA = '21 de octubre de 2026';

const Accesibilidad: React.FC = () => (
  <div className="a4 a4-page">
    <SEOHead path="/accesibilidad" />

    <header className="a4-page-head a4-wrap">
      <p className="a4-cap">Accesibilidad</p>
      <h1 className="a4-h-lg">Un sitio para todas las personas</h1>
      <p className="a4-lead">
        Queremos que cualquier persona pueda usar www.ai4u.com.co: con lector de pantalla, solo con teclado, con la letra grande o con poca visión. Aquí decimos qué norma seguimos, cómo estamos y cómo avisarnos si algo no funciona.
      </p>
    </header>

    <section className="a4-section a4-wrap" aria-labelledby="norma">
      <div className="a4-sec-label"><span className="a4-cap">Norma</span></div>
      <div className="a4-prose">
        <h2 id="norma">Qué estándar seguimos</h2>
        <p>
          Este sitio se construye para cumplir las Pautas de Accesibilidad para el Contenido Web <strong>WCAG 2.2, nivel AA</strong>, del W3C. Ese nivel cubre lo que piden en Colombia la Norma Técnica NTC 5854 y el Anexo 1 de la Resolución 1519 de 2020 del MinTIC (WCAG 2.1 AA), y lo que exige la norma europea EN 301 549. Además aplicamos dos reglas de la Resolución 1519: cualquier video que publiquemos lleva subtítulos y el texto puede ampliarse hasta el tamaño que la persona necesite.
        </p>
        <h2>Cómo escribimos</h2>
        <p>
          No usamos mayúscula sostenida: los títulos, los botones y las etiquetas se escriben con la mayúscula inicial de cualquier frase, porque el texto en mayúsculas es más lento de leer, sobre todo para personas con dislexia o baja visión, y algunos lectores de pantalla lo deletrean. Esta regla se comprueba automáticamente en cada publicación.
        </p>
        <h2>Herramientas de lectura</h2>
        <p>
          El botón <strong>«Accesibilidad»</strong>, en la cabecera y en el pie de todas las páginas, abre un panel con el que puedes agrandar el texto, activar contraste alto, dar más espacio a la lectura, usar una fuente simple, quitar el movimiento y escuchar la página en voz alta con la voz de tu propio dispositivo. Las preferencias se guardan en tu navegador; no usan cookies ni se envían a ningún servicio.
        </p>
        <p>
          El sitio también funciona con las herramientas que ya tienes: el zoom del navegador, los lectores de pantalla (NVDA, JAWS, VoiceOver, TalkBack), la navegación por teclado y las preferencias de contraste y de movimiento reducido de tu sistema.
        </p>
      </div>
    </section>

    <section className="a4-section a4-wrap" aria-labelledby="estado">
      <div className="a4-sec-label"><span className="a4-cap">Estado</span></div>
      <div className="a4-prose">
        <h2 id="estado">Cómo estamos hoy</h2>
        <p>
          Última auditoría: <strong>{AUDITORIA}</strong>, sobre todas las páginas públicas, con herramientas automáticas (axe-core) y revisión manual de teclado, foco, estructura de encabezados, tamaños y ampliación hasta el 400 %. Cada cambio que se publica pasa por la misma prueba automática: si introduce una barrera, no se publica.
        </p>
        <p>
          Estado de conformidad: <strong>parcial</strong>. Los criterios de nivel A y AA se cumplen en lo que pudimos verificar con herramientas y a mano. Está pendiente una prueba con personas usuarias de lectores de pantalla, que haremos antes de declarar conformidad total.
        </p>
        <h2>Limitaciones conocidas</h2>
        <ul>
          <li>El traductor automático de Google, disponible en el pie, es un servicio externo y no controlamos la accesibilidad de su selector.</li>
          <li>Las vistas previas de los sitios web que hemos construido son capturas de pantalla: su texto alternativo describe la imagen, no reproduce el contenido completo de esos sitios.</li>
        </ul>
      </div>
    </section>

    <section className="a4-section a4-wrap" aria-labelledby="reportar">
      <div className="a4-sec-label"><span className="a4-cap">Avísanos</span></div>
      <div className="a4-prose">
        <h2 id="reportar">Si algo no funciona</h2>
        <p>
          Si encuentras una barrera, escríbenos y la corregimos. Respondemos en un máximo de cinco días hábiles y te contamos qué hicimos.
        </p>
        <ul>
          <li>Correo: <a href={`mailto:${APP_CONFIG.CONTACT.EMAIL}`}>{APP_CONFIG.CONTACT.EMAIL}</a></li>
          <li>WhatsApp: <a href={`https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent('hola, encontré un problema de accesibilidad en el sitio')}`} target="_blank" rel="noopener noreferrer">{APP_CONFIG.CONTACT.PHONE}</a></li>
        </ul>
        <p>Dinos qué página, qué intentabas hacer y con qué navegador o ayuda técnica; así lo reproducimos más rápido.</p>
      </div>
    </section>
  </div>
);

export default Accesibilidad;
