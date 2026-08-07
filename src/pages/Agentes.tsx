import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Container, Grid } from '@mui/material';
import { Giant, H2, BodyText, CodeText, SEOHead, BinaryOverlay } from '@/components/shared/ui/atoms';
import { useColors } from '@/hooks';
import { getPageMetaTags, getCanonicalUrl } from '@/utils/seo';
import { AGENT_GROUPS, ALL_AGENTS, type Agent, type AgentStatus } from '@/data/agents';
import type { ToolId } from '@/data/tools';
import AgentCard from '@/components/agentes/AgentCard';
import AgentDrawer from '@/components/agentes/AgentDrawer';
import AgentConfirm from '@/components/agentes/AgentConfirm';
import AgentFilters, { type FilterCounts } from '@/components/agentes/AgentFilters';
import { AGENTES_BRAND } from '@/components/agentes/theme';

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

const Agentes: React.FC = () => {
  const colors = useColors();
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
    <Box sx={{ minHeight: '100vh', bgcolor: colors.contrast.background, position: 'relative' }}>
      <SEOHead title={metaTags.title} description={metaTags.description} canonical={getCanonicalUrl('/agentes')} />
      <BinaryOverlay lines={60} opacity={0.02} zIndex={0} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 14 }, pb: { xs: 10, md: 16 } }}>
        {reclutado && agenteActivo ? (
          <AgentConfirm agent={agenteActivo} onBack={cerrar} />
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: { xs: 6, md: 8 }, maxWidth: '760px' }}>
              <CodeText sx={{ color: colors.contrast.text.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '12px' }}>
                agentes · {ALL_AGENTS.length} en el equipo
              </CodeText>
              <Giant sx={{ fontSize: { xs: '36px', md: '56px' }, lineHeight: 1.05 }}>
                elegí quién<br />entra a tu equipo
              </Giant>
              <BodyText sx={{ color: colors.contrast.text.secondary, fontSize: '17px', maxWidth: '58ch' }}>
                cada uno resuelve trabajo real hoy, en empresas reales. la cara de cada uno se genera
                sola, a partir de su nombre — su propia numeración interna hecha visible.
              </BodyText>
            </Box>

            <Grid container spacing={{ xs: 3, md: 4 }}>
              <Grid item xs={12} md={3}>
                <Box sx={{ position: { md: 'sticky' }, top: { md: 100 } }}>
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
                </Box>
              </Grid>

              <Grid item xs={12} md={9}>
                <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
                  <Box
                    component="input"
                    value={search}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                    placeholder="buscar por tarea, sistema o nombre…"
                    sx={{
                      flex: 1,
                      minWidth: 200,
                      border: `1.5px solid ${AGENTES_BRAND.erieBlack}`,
                      borderRadius: '999px',
                      padding: '8px 14px',
                      fontSize: '13px',
                      fontFamily: 'inherit',
                      bgcolor: AGENTES_BRAND.white,
                      outline: 'none',
                    }}
                  />
                  <Box
                    component="button"
                    onClick={() => setSort(sort === 'nivel' ? 'nombre' : 'nivel')}
                    sx={{
                      border: `1.5px solid ${AGENTES_BRAND.erieBlack}`,
                      borderRadius: '999px',
                      padding: '8px 14px',
                      fontSize: '11px',
                      fontFamily: 'inherit',
                      bgcolor: 'transparent',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    orden: {sort} ▾
                  </Box>
                </Box>

                <CodeText sx={{ fontSize: '10px', color: colors.contrast.text.secondary, mb: 3, display: 'block' }}>
                  {ordenados.length} {ordenados.length === 1 ? 'resultado' : 'resultados'}
                </CodeText>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 5, md: 6 } }}>
                  {grupos.map((group) => (
                    <Box key={group.id}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
                        <Box sx={{ width: 4, height: 15, bgcolor: AGENTES_BRAND.hotOrange }} />
                        <CodeText sx={{ fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: colors.contrast.text.primary }}>
                          {group.label}
                        </CodeText>
                        <Box sx={{ flex: 1, height: '1px', bgcolor: colors.contrast.border }} />
                      </Box>
                      <Grid container spacing={2}>
                        {group.agents.map((agent) => (
                          <Grid item xs={12} sm={6} lg={4} key={agent.name}>
                            <AgentCard agent={agent} onOpen={abrir} />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  ))}
                  {grupos.length === 0 && (
                    <Box sx={{ py: 6, textAlign: 'center', color: colors.contrast.text.secondary, fontSize: 13 }}>
                      ningún agente coincide con esos filtros — probá limpiarlos.
                    </Box>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ mt: { xs: 8, md: 10 }, textAlign: 'center' }}>
              <H2 sx={{ fontSize: { xs: '22px', md: '28px' }, mb: 2 }}>el próximo agente puede ser el tuyo</H2>
              <BodyText sx={{ color: colors.contrast.text.secondary, mb: 0, maxWidth: '52ch', mx: 'auto' }}>
                contanos qué tarea te está costando tiempo todas las semanas — vemos si ya existe un
                agente para eso, o si construimos uno nuevo.
              </BodyText>
            </Box>
          </>
        )}
      </Container>

      {agenteActivo && !reclutado && (
        <AgentDrawer
          agent={agenteActivo}
          onClose={cerrar}
          onPrev={() => moverDrawer(-1)}
          onNext={() => moverDrawer(1)}
          onRecruit={reclutar}
        />
      )}
    </Box>
  );
};

export default Agentes;
