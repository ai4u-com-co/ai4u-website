import React from 'react';
import type { Agent } from '@/data/agents';
import { APP_CONFIG } from '@/utils/constants';
import Identicon from './Identicon';

interface AgentConfirmProps {
  agent: Agent;
  onBack: () => void;
}

const STEPS = [
  { when: 'Ahora', title: 'Nos escribes por WhatsApp', detail: 'Cuéntanos tu operación y qué sistema usas: arranca la conversación real, no un formulario.' },
  { when: '48 h', title: 'Llamada de diagnóstico · 30 min', detail: 'Revisamos si este agente encaja tal cual o hay que ajustarlo a tu proceso.' },
  { when: 'Sem. 2', title: 'El agente arranca en piloto con tu equipo', detail: '' },
];

const AgentConfirm: React.FC<AgentConfirmProps> = ({ agent, onBack }) => {
  const message = `Hola, quiero recuperar mi tiempo con Ai4U. Me interesa el agente "${agent.name}"`;
  const url = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(message)}`;

  return (
    <div className="a4-agentes-confirm">
      <div className="a4-stack">
        <p className="a4-cap">Un paso más</p>
        <h1 className="a4-h-lg">Arranquemos la conversación</h1>
        <div className="a4-agentes-card" style={{ maxWidth: 260 }}>
          <Identicon name={agent.name} />
          <h2 className="a4-sub a4-agentes-name" style={{ fontSize: 'clamp(20px, 2vw, 26px)' }}>{agent.name}</h2>
          <p className="a4-cap">{agent.clase}</p>
        </div>
      </div>
      <div className="a4-stack">
        <p className="a4-cap">Qué sigue</p>
        <div className="a4-rows">
          {STEPS.map((step) => (
            <div key={step.title} className="a4-row">
              <span className="a4-cap a4-num">{step.when}</span>
              <div>
                <div className="k">{step.title}</div>
                {step.detail && <p className="a4-note" style={{ marginTop: 4 }}>{step.detail}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="a4-agentes-ctas">
          <a className="a4-pill" href={url} target="_blank" rel="noopener noreferrer">Escribir por WhatsApp →</a>
          <button type="button" className="a4-ghost" onClick={onBack}>← Volver al catálogo</button>
        </div>
      </div>
    </div>
  );
};

export default AgentConfirm;
