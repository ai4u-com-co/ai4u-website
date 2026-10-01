import React from 'react';
import type { AgentStatus } from '@/data/agents';
import type { ToolId } from '@/data/tools';
import { TOOLS } from '@/data/tools';

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
  produccion: 'En producción',
  piloto: 'En piloto',
  interno: 'Interno Ai4U',
};

const Option: React.FC<{ checked: boolean; label: string; count: number; onClick: () => void }> = ({ checked, label, count, onClick }) => (
  <button type="button" className="a4-agentes-opt" aria-pressed={checked} onClick={onClick}>
    <span className="box" aria-hidden="true" />
    <span className="l">{label}</span>
    <span className="a4-cap a4-num">{count}</span>
  </button>
);

const AgentFilters: React.FC<AgentFiltersProps> = ({
  areas, counts, estadoActivos, areaActivas, toolActivas, onToggleEstado, onToggleArea, onToggleTool, onClear,
}) => {
  const hasActive = estadoActivos.length > 0 || areaActivas.length > 0 || toolActivas.length > 0;

  return (
    <div className="a4-agentes-filters">
      <details open>
        <summary><span className="a4-cap">Estado</span></summary>
        <div className="a4-agentes-opts">
          {(Object.keys(counts.estado) as AgentStatus[])
            .filter((k) => counts.estado[k] > 0)
            .map((k) => (
              <Option key={k} checked={estadoActivos.includes(k)} label={ESTADO_LABEL[k]} count={counts.estado[k]} onClick={() => onToggleEstado(k)} />
            ))}
        </div>
      </details>

      <details open>
        <summary><span className="a4-cap">Área</span></summary>
        <div className="a4-agentes-opts">
          {areas
            .filter((a) => counts.area[a.id] > 0)
            .map((a) => (
              <Option key={a.id} checked={areaActivas.includes(a.id)} label={a.label} count={counts.area[a.id]} onClick={() => onToggleArea(a.id)} />
            ))}
        </div>
      </details>

      <details open>
        <summary><span className="a4-cap">Herramienta</span></summary>
        <div className="a4-agentes-toolgrid">
          {(Object.keys(counts.tool) as ToolId[])
            .filter((t) => counts.tool[t] > 0)
            .map((t) => {
              const ToolIcon = TOOLS[t].Icon;
              return (
                <button
                  key={t}
                  type="button"
                  className="a4-agentes-toolbtn"
                  aria-pressed={toolActivas.includes(t)}
                  aria-label={TOOLS[t].label}
                  title={TOOLS[t].label}
                  onClick={() => onToggleTool(t)}
                >
                  <ToolIcon size={18} color="currentColor" />
                </button>
              );
            })}
        </div>
      </details>

      {hasActive && (
        <div>
          <button type="button" className="a4-ghost" onClick={onClear}>Limpiar filtros →</button>
        </div>
      )}
    </div>
  );
};

export default AgentFilters;
