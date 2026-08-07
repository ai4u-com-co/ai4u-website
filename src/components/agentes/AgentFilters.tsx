import React from 'react';
import { Box } from '@mui/material';
import type { AgentStatus } from '@/data/agents';
import type { ToolId } from '@/data/tools';
import { TOOLS } from '@/data/tools';
import { AGENTES_BRAND } from './theme';

export interface FilterCounts {
  estado: Record<AgentStatus, number>;
  area: Record<string, number>;
  tool: Record<ToolId, number>;
}

interface AgentFiltersProps {
  areas: { id: string; label: string }[];
  counts: FilterCounts;
  estadoActivos: AgentStatus[];
  areaActivas: string[];
  toolActivas: ToolId[];
  onToggleEstado: (v: AgentStatus) => void;
  onToggleArea: (v: string) => void;
  onToggleTool: (v: ToolId) => void;
  onClear: () => void;
}

const ESTADO_LABEL: Record<AgentStatus, string> = {
  produccion: 'en producción',
  piloto: 'en piloto',
  interno: 'interno ai4u',
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box sx={{ fontSize: 10, letterSpacing: '0.08em', fontWeight: 800, textTransform: 'uppercase', color: AGENTES_BRAND.erieBlack }}>
    {children}
  </Box>
);

const Checkbox: React.FC<{ checked: boolean; label: string; count: number; onClick: () => void }> = ({ checked, label, count, onClick }) => (
  <Box
    component="button"
    onClick={onClick}
    sx={{
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
      fontSize: 11.5,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      p: 0,
      textAlign: 'left',
      color: checked ? AGENTES_BRAND.erieBlack : 'rgba(23,23,23,0.65)',
      fontFamily: 'inherit',
    }}
  >
    <Box
      sx={{
        width: 13,
        height: 13,
        flexShrink: 0,
        border: `1.5px solid ${checked ? AGENTES_BRAND.erieBlack : AGENTES_BRAND.cadetGray}`,
        bgcolor: checked ? AGENTES_BRAND.erieBlack : 'transparent',
        borderRadius: '3px',
      }}
    />
    <Box sx={{ flex: 1 }}>{label}</Box>
    <Box sx={{ color: AGENTES_BRAND.cadetGray, fontFamily: 'monospace', fontSize: 10 }}>{count}</Box>
  </Box>
);

const AgentFilters: React.FC<AgentFiltersProps> = ({
  areas,
  counts,
  estadoActivos,
  areaActivas,
  toolActivas,
  onToggleEstado,
  onToggleArea,
  onToggleTool,
  onClear,
}) => {
  const hasActive = estadoActivos.length > 0 || areaActivas.length > 0 || toolActivas.length > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <details open>
        <summary style={{ cursor: 'pointer', listStyle: 'none', marginBottom: 10 }}>
          <SectionTitle>estado</SectionTitle>
        </summary>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px', pl: '1px' }}>
          {(Object.keys(counts.estado) as AgentStatus[])
            .filter((k) => counts.estado[k] > 0)
            .map((k) => (
              <Checkbox
                key={k}
                checked={estadoActivos.includes(k)}
                label={`${ESTADO_LABEL[k]} · ${counts.estado[k]}`.replace(` · ${counts.estado[k]}`, '')}
                count={counts.estado[k]}
                onClick={() => onToggleEstado(k)}
              />
            ))}
        </Box>
      </details>

      <details open>
        <summary style={{ cursor: 'pointer', listStyle: 'none', marginBottom: 10, marginTop: 8 }}>
          <SectionTitle>área</SectionTitle>
        </summary>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '9px', pl: '1px' }}>
          {areas
            .filter((a) => counts.area[a.id] > 0)
            .map((a) => (
              <Checkbox
                key={a.id}
                checked={areaActivas.includes(a.id)}
                label={a.label}
                count={counts.area[a.id]}
                onClick={() => onToggleArea(a.id)}
              />
            ))}
        </Box>
      </details>

      <details open>
        <summary style={{ cursor: 'pointer', listStyle: 'none', marginBottom: 10, marginTop: 8 }}>
          <SectionTitle>herramienta</SectionTitle>
        </summary>
        <Box sx={{ display: 'flex', gap: '6px', flexWrap: 'wrap', pl: '1px' }}>
          {(Object.keys(counts.tool) as ToolId[])
            .filter((t) => counts.tool[t] > 0)
            .map((t) => {
              const active = toolActivas.includes(t);
              const ToolIcon = TOOLS[t].Icon;
              return (
                <Box
                  key={t}
                  component="button"
                  onClick={() => onToggleTool(t)}
                  title={TOOLS[t].label}
                  sx={{
                    width: 26,
                    height: 26,
                    border: `1.5px solid ${AGENTES_BRAND.erieBlack}`,
                    borderRadius: '5px',
                    bgcolor: active ? AGENTES_BRAND.erieBlack : AGENTES_BRAND.white,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <ToolIcon size={13} color={active ? AGENTES_BRAND.white : TOOLS[t].color} />
                </Box>
              );
            })}
        </Box>
      </details>

      {hasActive && (
        <Box
          component="button"
          onClick={onClear}
          sx={{
            fontSize: 10.5,
            color: AGENTES_BRAND.moderateBlue,
            fontWeight: 700,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            p: 0,
            textAlign: 'left',
            mt: '4px',
          }}
        >
          limpiar filtros
        </Box>
      )}
    </Box>
  );
};

export default AgentFilters;
