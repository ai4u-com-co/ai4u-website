import type { IconType } from 'react-icons';
import { SiWhatsapp, SiGmail, SiSap, SiInstagram, SiGithub } from 'react-icons/si';
// LinkedIn no está en el set simple-icons de esta versión de react-icons — Font Awesome sí lo trae.
import { FaLinkedin } from 'react-icons/fa';

export type ToolId = 'whatsapp' | 'gmail' | 'sap' | 'linkedin' | 'instagram' | 'github';

export interface ToolDef {
  label: string;
  Icon: IconType;
  color: string;
}

// Herramientas/APIs reales a las que se conecta cada agente — el logo real
// aprovecha el reconocimiento de marca ya hecho por cada software. Agregar
// acá solo integraciones confirmadas, nunca una aspiracional.
export const TOOLS: Record<ToolId, ToolDef> = {
  whatsapp: { label: 'WhatsApp', Icon: SiWhatsapp, color: '#25D366' },
  gmail: { label: 'Gmail', Icon: SiGmail, color: '#EA4335' },
  sap: { label: 'SAP', Icon: SiSap, color: '#0FAAFF' },
  linkedin: { label: 'LinkedIn', Icon: FaLinkedin, color: '#0A66C2' },
  instagram: { label: 'Instagram', Icon: SiInstagram, color: '#E4405F' },
  github: { label: 'GitHub', Icon: SiGithub, color: '#FFFFFF' },
};
