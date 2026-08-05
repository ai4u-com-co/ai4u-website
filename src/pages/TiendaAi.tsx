import React from 'react';
import { Box, Container, Grid, Stack, Chip } from '@mui/material';
import { Giant, H2, BodyText, CodeText, SEOHead, BinaryOverlay, AgentAvatar } from '@/components/shared/ui/atoms';
import { DiagnosticCTA } from '@/components/shared/ui/molecules';
import { useColors } from '@/hooks';
import { getPageMetaTags, getCanonicalUrl } from '@/utils/seo';
import { AGENT_GROUPS, type AgentStatus } from '@/data/agents';
import { AI4U_PALETTE } from '@/components/shared/ui/tokens/palette';

const STATUS_LABEL: Record<AgentStatus, string> = {
  produccion: 'en producción',
  piloto: 'en piloto',
  interno: 'interno ai4u',
};

const STATUS_COLOR: Record<AgentStatus, string> = {
  produccion: AI4U_PALETTE.success,
  piloto: AI4U_PALETTE.warning,
  interno: AI4U_PALETTE.accentColors.blue,
};

const TiendaAi: React.FC = () => {
  const colors = useColors();
  const metaTags = getPageMetaTags('tiendaAi');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.contrast.background, position: 'relative' }}>
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        canonical={getCanonicalUrl('/tienda-ai')}
      />
      <BinaryOverlay lines={60} opacity={0.02} zIndex={0} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 10, md: 14 }, pb: { xs: 10, md: 16 } }}>
        <Stack spacing={2} sx={{ mb: { xs: 6, md: 8 }, maxWidth: '760px' }}>
          <CodeText sx={{ color: colors.contrast.text.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '12px' }}>
            tienda ai
          </CodeText>
          <Giant sx={{ fontSize: { xs: '36px', md: '56px' }, lineHeight: 1.05 }}>
            los agentes que ya<br />trabajan, no una demo
          </Giant>
          <BodyText sx={{ color: colors.contrast.text.secondary, fontSize: '17px', maxWidth: '58ch' }}>
            cada uno de estos agentes resuelve trabajo real hoy, en empresas reales. el avatar de cada
            uno se genera solo, a partir de su nombre — su propia numeración interna hecha visible.
          </BodyText>
        </Stack>

        <Stack spacing={{ xs: 6, md: 8 }}>
          {AGENT_GROUPS.map((group) => (
            <Box key={group.id}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
                <Box sx={{ width: 3, height: 16, bgcolor: AI4U_PALETTE.accentColors.orange }} />
                <CodeText sx={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: colors.contrast.text.secondary }}>
                  {group.label}
                </CodeText>
                <Box sx={{ flex: 1, height: '1px', bgcolor: colors.contrast.border }} />
              </Stack>

              <Grid container spacing={{ xs: 2, md: 3 }}>
                {group.agents.map((agent) => (
                  <Grid item xs={12} sm={6} md={4} key={agent.name}>
                    <Box
                      sx={{
                        p: { xs: 2.5, md: 3 },
                        border: `1px solid ${colors.contrast.border}`,
                        bgcolor: colors.contrast.surface,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1.5,
                      }}
                    >
                      <Stack direction="row" spacing={2} alignItems="center">
                        <AgentAvatar name={agent.name} size={48} />
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <BodyText sx={{ fontWeight: 700, fontSize: '15px', textTransform: 'lowercase', color: colors.contrast.text.primary }}>
                            {agent.name}
                          </BodyText>
                          <Chip
                            label={STATUS_LABEL[agent.status]}
                            size="small"
                            sx={{
                              mt: 0.5,
                              height: '20px',
                              fontSize: '10px',
                              fontFamily: 'monospace',
                              bgcolor: 'transparent',
                              border: `1px solid ${STATUS_COLOR[agent.status]}`,
                              color: STATUS_COLOR[agent.status],
                            }}
                          />
                        </Box>
                      </Stack>
                      <BodyText sx={{ fontSize: '13px', lineHeight: 1.55, color: colors.contrast.text.secondary }}>
                        {agent.pitch}
                      </BodyText>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          ))}
        </Stack>

        <Box sx={{ mt: { xs: 8, md: 10 }, textAlign: 'center' }}>
          <H2 sx={{ fontSize: { xs: '22px', md: '28px' }, mb: 2 }}>
            el próximo agente puede ser el tuyo
          </H2>
          <BodyText sx={{ color: colors.contrast.text.secondary, mb: 4, maxWidth: '52ch', mx: 'auto' }}>
            contanos qué tarea te está costando tiempo todas las semanas — vemos si ya existe un agente
            para eso, o si construimos uno nuevo.
          </BodyText>
          <DiagnosticCTA variant="primary" size="large" text="quiero mi diagnóstico gratis" />
        </Box>
      </Container>
    </Box>
  );
};

export default TiendaAi;
