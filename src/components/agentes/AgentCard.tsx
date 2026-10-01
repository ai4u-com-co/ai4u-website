import React from 'react';
import type { Agent, AgentStatus } from '@/data/agents';
import { generateAgentIdenticon, formatAgentCode } from '@/utils/pixelIdenticon';
import Identicon from './Identicon';
import AttributeBars from './AttributeBars';
import ToolBadges from './ToolBadges';

interface AgentCardProps {
  agent: Agent;
  onOpen: (agent: Agent) => void;
}

export const STATUS_LABEL: Record<AgentStatus, string> = {
  produccion: 'En producción',
  piloto: 'En piloto',
  interno: 'Interno Ai4U',
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, onOpen }) => {
  const { seed } = generateAgentIdenticon(agent.name);
  const isPiloto = agent.status === 'piloto';

  return (
    <article className={`a4-agentes-card${isPiloto ? ' is-piloto' : ''}`}>
      <div className="a4-agentes-card-top">
        <span className="a4-cap a4-num">{formatAgentCode(seed)}</span>
        <span className="a4-cap">{agent.clase} · nivel {agent.nivel}</span>
      </div>
      <div className="a4-agentes-card-id">
        <Identicon name={agent.name} />
        <div>
          <h3 className="a4-sub a4-agentes-name" style={{ fontSize: 'clamp(20px, 1.8vw, 26px)' }}>{agent.name}</h3>
          <span className={`a4-agentes-status ${agent.status}`} style={{ marginTop: 8 }}>{STATUS_LABEL[agent.status]}</span>
        </div>
      </div>
      <p className="a4-sm">{agent.pitch}</p>
      <AttributeBars atributos={agent.atributos} compact />
      <div className="a4-agentes-card-foot">
        <ToolBadges tools={agent.tools} label="Equipado con" />
        <button type="button" className="a4-pill" onClick={() => onOpen(agent)}>
          {isPiloto ? 'Ver ficha →' : 'Reclutar →'}
        </button>
      </div>
    </article>
  );
};

export default AgentCard;
