import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { APP_CONFIG } from '../../../../utils/constants';
import '../../../../styles/site-v2.css';
import '../../../../styles/whatsapp-float.css';

/**
 * Botón flotante de WhatsApp, en todas las páginas (lo monta Layout).
 * Es un enlace normal a wa.me: no hay bot ni backend, la persona escribe y se le responde a mano desde el celular.
 * El evento Contact del píxel lo dispara MetaPixelTracker al tocar cualquier enlace wa.me (no hace falta nada aquí).
 */
const WhatsAppFloat = () => {
  const href = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;
  return (
    <a
      className="a4 a4-wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
    >
      <WhatsAppIcon aria-hidden="true" className="a4-wa-float-icon" />
      <span className="a4-cap a4-wa-float-label">Escríbenos</span>
    </a>
  );
};

export default WhatsAppFloat;
