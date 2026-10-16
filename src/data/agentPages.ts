// Una página por agente (/agentes/<nombre>): salen del mismo catálogo que /agentes, así no hay dos fuentes.
// Importado también por los scripts de build (prerender, sitemap, validación) a través de esbuild: no importar
// React ni nada del navegador aquí.
import { ALL_AGENTS, NIVELES, type Agent } from './agents';
import { slugify } from '../utils/slug';

export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export interface AgentPage {
  path: string;
  name: string;
  title: string;
  description: string;
  type: string;
  priority: number;
  sitemap: boolean;
  /** Archivos cuyo último commit fija el lastmod del sitemap. */
  sources: string[];
  agentName: string;
}

export const agentPath = (agent: Agent) => `/agentes/${slugify(agent.name)}`;

const describe = (a: Agent) => {
  const base = cap(a.pitch);
  const withBrand = `${base} Un agente de IA de Ai4U.`;
  return withBrand.length <= 160 ? withBrand : base;
};

export const AGENT_PAGES: AgentPage[] = ALL_AGENTS.map((a) => ({
  path: agentPath(a),
  name: cap(a.name),
  title: `${cap(a.name)}: agente de IA | Ai4U`,
  description: describe(a),
  type: 'WebPage',
  priority: 0.6,
  sitemap: true,
  sources: ['src/data/agents.ts'],
  agentName: a.name,
}));

/** Preguntas y respuestas de la página de un agente (visibles en la página y en su FAQPage). */
export const agentFaq = (a: Agent): { question: string; answer: string }[] => {
  const n = NIVELES[a.nivel];
  return [
    { question: `¿Qué hace el agente ${a.name}?`, answer: cap(a.pitch) },
    { question: '¿Quién revisa lo que hace?', answer: `${a.revisa}.` },
    { question: '¿Cuándo trabaja?', answer: `Su horario es: ${a.horario.charAt(0).toLowerCase()}${a.horario.slice(1)}.` },
    { question: '¿Cuánta supervisión necesita?', answer: `Nivel ${a.nivel} de 3, ${n.nombre.toLowerCase()}: ${n.descripcion}.` },
    { question: '¿Cómo lo contrato?', answer: 'Escríbenos por WhatsApp al +57 302 490 6414 o por correo a hola@ai4u.com.co. Te decimos si este agente resuelve tu caso o qué construiríamos a tu medida.' },
  ];
};
