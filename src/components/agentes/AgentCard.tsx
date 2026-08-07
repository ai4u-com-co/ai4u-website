import React from 'react';
import { Box } from '@mui/material';
import { Button } from '../shared/ui/atoms';
import type { Agent, AgentStatus } from '@/data/agents';
import { generateAgentIdenticon, formatAgentCode } from '@/utils/pixelIdenticon';
import AttributeBars from './AttributeBars';
import ToolBadges from './ToolBadges';
import { AGENTES_BRAND } from './theme';

interface AgentCardProps {
  agent: Agent;
  onOpen: (agent: Agent) => void;
}

const STATUS_HEADER: Record<AgentStatus, string> = {
  produccion: AGENTES_BRAND.hotOrange,
  interno: AGENTES_BRAND.moderateBlue,
  piloto: AGENTES_BRAND.cadetGray,
};

const STATUS_LABEL: Record<AgentStatus, string> = {
  produccion: '✓ en producción',
  piloto: '▲ en piloto',
  interno: '◆ interno ai4u',
};

const AgentCard: React.FC<AgentCardProps> = ({ agent, onOpen }) => {
  const { grid, color: faceColor, seed } = generateAgentIdenticon(agent.name);
  const isPiloto = agent.status === 'piloto';
  const headerColor = STATUS_HEADER[agent.status];

  return (
    <Box
      sx={{
        bgcolor: AGENTES_BRAND.white,
        border: `2px ${isPiloto ? 'dashed' : 'solid'} ${AGENTES_BRAND.erieBlack}`,
        borderRadius: '10px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        opacity: isPiloto ? 0.92 : 1,
      }}
    >
      <Box
        sx={{
          bgcolor: headerColor,
          color: AGENTES_BRAND.white,
          px: '12px',
          py: '6px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700 }}>{formatAgentCode(seed)}</Box>
        <Box sx={{ fontSize: 9, letterSpacing: '0.08em', fontWeight: 800, textTransform: 'uppercase' }}>
          {agent.clase} · nivel {agent.nivel}
        </Box>
      </Box>

      <Box sx={{ p: '16px', display: 'flex', gap: '14px', alignItems: 'center', borderBottom: `1.5px solid rgba(23,23,23,0.12)` }}>
        <Box sx={{ width: 72, height: 72, flexShrink: 0, bgcolor: AGENTES_BRAND.erieBlack, position: 'relative' }}>
          <svg width={72} height={72} viewBox="0 0 9 9" shapeRendering="crispEdges" role="img" aria-label={`Avatar de ${agent.name}`}>
            {grid.map((row, r) => row.map((filled, c) => (filled ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={faceColor} /> : null)))}
          </svg>
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Box sx={{ fontSize: 17, fontWeight: 900, lineHeight: 1.1, textTransform: 'lowercase' }}>{agent.name}</Box>
          <Box sx={{ fontSize: 9, letterSpacing: '0.06em', fontWeight: 800, textTransform: 'uppercase', color: AGENTES_BRAND.cadetGray, mt: '3px' }}>
            {agent.clase}
          </Box>
          <Box
            sx={{
              display: 'inline-block',
              mt: '7px',
              fontSize: 9.5,
              fontWeight: 700,
              border: `1.5px solid ${headerColor}`,
              color: headerColor,
              borderRadius: '999px',
              padding: '2px 9px',
            }}
          >
            {STATUS_LABEL[agent.status]}
          </Box>
        </Box>
      </Box>

      <Box sx={{ p: '14px 16px', fontSize: 12, lineHeight: 1.45, color: 'rgba(23,23,23,0.8)', borderBottom: `1.5px solid rgba(23,23,23,0.12)` }}>
        {agent.pitch}
      </Box>

      <Box sx={{ p: '12px 16px', borderBottom: `1.5px solid rgba(23,23,23,0.12)` }}>
        <AttributeBars atributos={agent.atributos} compact color={headerColor} />
      </Box>

      <Box sx={{ p: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <ToolBadges tools={agent.tools} size={26} />
        <Button
          variant={isPiloto ? 'secondary' : 'primary'}
          size="small"
          onClick={() => onOpen(agent)}
          sx={{ flexShrink: 0 }}
        >
          {isPiloto ? 'ver ficha' : 'reclutar'}
        </Button>
      </Box>
    </Box>
  );
};

export default AgentCard;
