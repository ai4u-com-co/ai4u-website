import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SEOHead } from '@/components/shared/ui/atoms';
import { getPageMetaTags, getCanonicalUrl } from '@/utils/seo';
import { AGENT_GROUPS, ALL_AGENTS, type Agent, type AgentStatus } from '@/data/agents';
import type { ToolId } from '@/data/tools';
import AgentCard from '@/components/agentes/AgentCard';
import AgentDrawer from '@/components/agentes/AgentDrawer';
import AgentConfirm from '@/components/agentes/AgentConfirm';
import AgentFilters, { type FilterCounts } from '@/components/agentes/AgentFilters';
import { APP_CONFIG } from '@/utils/constants';
import '@/styles/site-v2.css';
import '@/styles/pages/agentes.css';

type SortMode = 'nivel' | 'nombre';

function computeCounts(agents: Agent[]): FilterCounts {
  const estado: Record<AgentStatus, number> = { produccion: 0, piloto: 0, interno: 0 };
  const area: Record<string, number> = {};
  const tool: Record<string, number> = {};
  for (const a of agents) {
    estado[a.status]++;
    area[a.category] = (area[a.category] ?? 0) + 1;
    for (const t of a.tools) tool[t] = (tool[t] ?? 0) + 1;
  }
  return { estado, area, tool: tool as Record<ToolId, number> };
}

const whatsappUrl = `https://wa.me/${APP_CONFIG.CONTACT.WHATSAPP}?text=${encodeURIComponent(APP_CONFIG.CONTACT.WHATSAPP_MESSAGE)}`;

const Agentes: React.FC = () => {
  const metaTags = getPageMetaTags('agentes');
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortMode>('nivel');
  const [estadoActivos, setEstadoActivos] = useState<AgentStatus[]>([]);
  const [areaActivas, setAreaActivas] = useState<string[]>([]);
  const [toolActivas, setToolActivas] = useState<ToolId[]>([]);

  const seleccionado = searchParams.get('agente');
  const reclutado = searchParams.get('reclutado') === '1';

  const counts = useMemo(() => computeCounts(ALL_AGENTS), []);

  const filtrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ALL_AGENTS.filter((a) => {
      if (q && !`${a.name} ${a.pitch} ${a.clase}`.toLowerCase().includes(q)) return false;
      if (estadoActivos.length > 0 && !estadoActivos.includes(a.status)) return false;
      if (areaActivas.length > 0 && !areaActivas.includes(a.category)) return false;
      if (toolActivas.length > 0 && !a.tools.some((t) => toolActivas.includes(t))) return false;
      return true;
    });
  }, [search, estadoActivos, areaActivas, toolActivas]);

  const ordenados = useMemo(() => {
    const list = [...filtrados];
    if (sort === 'nivel') list.sort((a, b) => b.nivel - a.nivel || a.name.localeCompare(b.name));
    else list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [filtrados, sort]);

  const grupos = useMemo(() => {
    const visibleNames = new Set(ordenados.map((a) => a.name));
    return AGENT_GROUPS.map((g) => ({ ...g, agents: g.agents.filter((a) => visibleNames.has(a.name)) })).filter((g) => g.agents.length > 0);
  }, [ordenados]);

  const agenteActivo = ordenados.find((a) => a.name === seleccionado) ?? null;

  const abrir = (agent: Agent) => setSearchParams((p) => { p.set('agente', agent.name); p.delete('reclutado'); return p; });
  const cerrar = () => setSearchParams((p) => { p.delete('agente'); p.delete('reclutado'); return p; });
  const reclutar = (agent: Agent) => setSearchParams((p) => { p.set('agente', agent.name); p.set('reclutado', '1'); return p; });

  const moverDrawer = (delta: 1 | -1) => {
    if (!agenteActivo) return;
    const idx = ordenados.findIndex((a) => a.name === agenteActivo.name);
    if (idx === -1) return;
    const next = ordenados[(idx + delta + ordenados.length) % ordenados.length];
    abrir(next);
  };

  const toggle = <T,>(list: T[], value: T, setList: (v: T[]) => void) => {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  return (
    <div className="a4 a4-page">
      <SEOHead title={metaTags.title} description={metaTags.description} canonical={getCanonicalUrl('/agentes')} />

      <div className="a4-wrap" style={{ paddingBottom: 'clamp(56px, 8vw, 119px)' }}>
        {reclutado && agenteActivo ? (
          <div className="a4-page-head">
            <AgentConfirm agent={agenteActivo} onBack={cerrar} />
          </div>
        ) : (
          <>
            <header className="a4-page-head">
              <p className="a4-cap">Agentes · {ALL_AGENTS.length} en el equipo</p>
              <h1 className="a4-display">Elige quién<br />entra a tu equipo</h1>
              <p className="a4-lead a4-sm">
                Cada uno resuelve trabajo real hoy, en empresas reales. La cara de cada uno se genera sola a partir de su nombre.
              </p>
            </header>

            <section className="a4-section">
              <div className="a4-agentes-layout">
                <aside className="a4-agentes-aside" aria-label="Filtros">
                  <AgentFilters
                    areas={AGENT_GROUPS.map((g) => ({ id: g.id, label: g.label }))}
                    counts={counts}
                    estadoActivos={estadoActivos}
                    areaActivas={areaActivas}
                    toolActivas={toolActivas}
                    onToggleEstado={(v) => toggle(estadoActivos, v, setEstadoActivos)}
                    onToggleArea={(v) => toggle(areaActivas, v, setAreaActivas)}
                    onToggleTool={(v) => toggle(toolActivas, v, setToolActivas)}
                    onClear={() => { setEstadoActivos([]); setAreaActivas([]); setToolActivas([]); }}
                  />
                </aside>

                <div>
                  <div className="a4-agentes-bar">
                    <input
                      className="a4-input"
                      type="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Buscar por tarea, sistema o nombre…"
                      aria-label="Buscar agentes"
                    />
                    <button type="button" className="a4-pill" onClick={() => setSort(sort === 'nivel' ? 'nombre' : 'nivel')}>
                      Orden: {sort} ▾
                    </button>
                  </div>
                  <p className="a4-cap a4-num" aria-live="polite">
                    {ordenados.length} {ordenados.length === 1 ? 'resultado' : 'resultados'}
                  </p>

                  {grupos.map((group) => (
                    <div key={group.id} className="a4-agentes-group">
                      <div className="a4-sec-label" style={{ marginBottom: 0 }}>
                        <p className="a4-cap">{group.label}</p>
                      </div>
                      <div className="a4-agentes-grid">
                        {group.agents.map((agent) => (
                          <AgentCard key={agent.name} agent={agent} onOpen={abrir} />
                        ))}
                      </div>
                    </div>
                  ))}
                  {grupos.length === 0 && (
                    <p className="a4-agentes-empty a4-sm">Ningún agente coincide con esos filtros. Prueba limpiarlos.</p>
                  )}
                </div>
              </div>
            </section>

            <section className="a4-section">
              <p className="a4-cap" style={{ marginBottom: 24 }}>Siguiente</p>
              <h2 className="a4-h-lg" style={{ maxWidth: '14ch' }}>El próximo agente puede ser el tuyo</h2>
              <p className="a4-sm" style={{ margin: '24px 0 8px', maxWidth: '52ch' }}>
                Cuéntanos qué tarea te está costando tiempo todas las semanas: vemos si ya existe un agente para eso o si construimos uno nuevo.
              </p>
              <a className="a4-ghost" href={whatsappUrl} target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp →</a>
            </section>
          </>
        )}
      </div>

      {agenteActivo && !reclutado && (
        <AgentDrawer
          agent={agenteActivo}
          onClose={cerrar}
          onPrev={() => moverDrawer(-1)}
          onNext={() => moverDrawer(1)}
          onRecruit={reclutar}
        />
      )}
    </div>
  );
};

export default Agentes;
