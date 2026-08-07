import React from 'react';
import { Box } from '@mui/material';
import { Button } from '../shared/ui/atoms';
import { DiagnosticCTA } from '../shared/ui/molecules';
import type { Agent } from '@/data/agents';
import { generateAgentIdenticon } from '@/utils/pixelIdenticon';
import { AGENTES_BRAND } from './theme';

interface AgentConfirmProps {
  agent: Agent;
  onBack: () => void;
}

const STEPS = [
  { when: 'ahora', title: 'nos escribís por whatsapp', detail: 'contanos tu operación y qué sistema usás — arranca la conversación real, no un formulario.' },
  { when: '48 h', title: 'llamada de diagnóstico · 30 min', detail: 'revisamos si este agente encaja tal cual o hay que ajustarlo a tu proceso.' },
  { when: 'sem. 2', title: 'el agente arranca en piloto con tu equipo', detail: '' },
];

const AgentConfirm: React.FC<AgentConfirmProps> = ({ agent, onBack }) => {
  const { grid, color: faceColor } = generateAgentIdenticon(agent.name);
  const message = `hola, quiero recuperar mi tiempo con ai4u — me interesa el agente "${agent.name}"`;

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', textAlign: 'center', py: { xs: 6, md: 8 } }}>
      <Box sx={{ fontSize: 11, letterSpacing: '0.08em', fontWeight: 800, color: AGENTES_BRAND.moderateBlue, textTransform: 'uppercase' }}>
        un paso más
      </Box>
      <Box sx={{ fontSize: { xs: 26, md: 30 }, fontWeight: 900, lineHeight: 1.08, mt: 1 }}>
        arranquemos la conversación<br />sobre este agente
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Box sx={{ width: 160, border: `2px solid ${AGENTES_BRAND.erieBlack}`, borderRadius: '10px', overflow: 'hidden', bgcolor: AGENTES_BRAND.white }}>
          <Box sx={{ height: 20, bgcolor: AGENTES_BRAND.moderateBlue }} />
          <Box sx={{ p: '14px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <Box sx={{ width: 56, height: 56, bgcolor: AGENTES_BRAND.erieBlack }}>
              <svg width={56} height={56} viewBox="0 0 9 9" shapeRendering="crispEdges">
                {grid.map((row, r) => row.map((filled, c) => (filled ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill={faceColor} /> : null)))}
              </svg>
            </Box>
            <Box sx={{ fontSize: 13, fontWeight: 900, textAlign: 'center', textTransform: 'lowercase' }}>{agent.name}</Box>
            <Box sx={{ fontSize: 9, letterSpacing: '0.05em', fontWeight: 800, color: AGENTES_BRAND.cadetGray, textTransform: 'uppercase' }}>{agent.clase}</Box>
          </Box>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'left', mt: 5 }}>
        <Box sx={{ fontSize: 10, letterSpacing: '0.08em', fontWeight: 800, color: AGENTES_BRAND.erieBlack, textTransform: 'uppercase' }}>qué sigue</Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1.5 }}>
          {STEPS.map((step, i) => (
            <Box key={step.title} sx={{ display: 'grid', gridTemplateColumns: '64px 1fr', gap: '12px' }}>
              <Box sx={{ fontFamily: 'monospace', fontSize: 10, color: i === 0 ? AGENTES_BRAND.moderateBlue : AGENTES_BRAND.cadetGray, pt: '2px' }}>
                {step.when.toUpperCase()}
              </Box>
              <Box
                sx={{
                  borderLeft: `2px solid ${i === 0 ? AGENTES_BRAND.moderateBlue : 'rgba(23,23,23,0.2)'}`,
                  pl: '14px',
                  pb: i < STEPS.length - 1 ? '16px' : '2px',
                }}
              >
                <Box sx={{ fontSize: 12.5, fontWeight: 800 }}>{step.title}</Box>
                {step.detail && (
                  <Box sx={{ fontSize: 11, color: AGENTES_BRAND.cadetGray, mt: '3px' }}>{step.detail}</Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: '9px', mt: 3 }}>
        <DiagnosticCTA variant="primary" size="medium" text="escribir por whatsapp" message={message} sx={{ flex: 1 }} />
        <Button variant="secondary" size="medium" onClick={onBack} sx={{ flex: 1 }}>
          volver al roster
        </Button>
      </Box>
    </Box>
  );
};

export default AgentConfirm;
