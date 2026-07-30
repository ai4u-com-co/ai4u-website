import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Stack, alpha } from '@mui/material';
import { H2, BodyText, CodeText, SEOHead, GeometricIcon } from '../components/shared/ui/atoms';
import { HeroFullscreen } from '../components/shared/ui/organisms';
import { DiagnosticCTA, RelatedPages } from '../components/shared/ui/molecules';
import { useColors } from '../hooks';
import { SurfaceProvider } from '../context';
import { usePerformanceMonitoring } from '../hooks/usePerformanceMonitoring';
import { useErrorTracking } from '../hooks';
import { getHomeStructuredData, getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { clients } from '../data/clients';
import { ROUTES } from '../utils/constants';
import { scrollToTop } from '../utils/helpers';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';

const Home = () => {
  usePerformanceMonitoring('home', { lcp: 2000, fcp: 1500 });

  const { addContext } = useErrorTracking();
  React.useEffect(() => {
    addContext('page', 'home');
    addContext('userAgent', navigator.userAgent.substring(0, 100));
  }, [addContext]);

  const metaTags = getPageMetaTags('home');
  const structuredData = getHomeStructuredData();
  const relatedLinks = getRelatedLinks('/');

  return (
    <SurfaceProvider surface="black">
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/"
        structuredData={structuredData}
      />
      <HomeBody relatedLinks={relatedLinks} />
    </SurfaceProvider>
  );
};

// Todo el cuerpo (más allá del hero) vive en un componente aparte: necesita
// montarse DENTRO del SurfaceProvider de arriba para que useColors() lea la
// superficie "black" — ya es el patrón que usa WhyAI4U.tsx.
const HomeBody: React.FC<{ relatedLinks: ReturnType<typeof getRelatedLinks> }> = ({ relatedLinks }) => {
  const colors = useColors();
  const divider = `1px solid ${alpha(colors.contrast.text.primary, 0.1)}`;
  // 0.55 mantiene el look atenuado pero pasa contraste AA (0.38 fallaba en Lighthouse)
  const muted = alpha(colors.contrast.text.primary, 0.55);

  return (
    <Box sx={{ bgcolor: colors.contrast.background, color: colors.contrast.text.primary, minHeight: '100vh' }}>
      {/* ── HERO ── */}
      <HeroFullscreen
        badge="ai4u.equipo // siempre activo"
        subtitle="la primera capa de inteligencia de tu empresa."
        primaryButtonText="hablar con el equipo"
      />

      {/* ── WHY ── */}
      <Box sx={{ borderTop: divider }}>
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
          <CodeText sx={{
            fontSize: '0.72rem', letterSpacing: '0.25em',
            color: BRAND_ORANGE, mb: 5, display: 'block',
          }}>
            // why
          </CodeText>
          <Grid container spacing={{ xs: 6, md: 12 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                component="h2"
                sx={{
                  m: 0,
                  fontSize: { xs: '2rem', md: 'clamp(2rem, 3.5vw, 3.2rem)' },
                  fontWeight: 300,
                  fontFamily: '"Red Hat Display", sans-serif',
                  lineHeight: 0.92,
                  letterSpacing: '-0.03em',
                  color: colors.contrast.text.primary,
                }}
              >
                cada hora en operación<br />
                es una hora que{' '}
                <Box component="em" sx={{ fontStyle: 'italic', color: muted }}>
                  no estás liderando.
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <BodyText sx={{
                fontSize: '0.95rem',
                fontWeight: 300,
                lineHeight: 1.7,
                color: muted,
                maxWidth: '420px',
              }}>
                Tu negocio necesita tu visión — no tu tiempo en tareas que se pueden automatizar.
                <br /><br />
                <Box component="strong" sx={{ color: colors.contrast.text.primary, fontWeight: 400 }}>
                  Nosotros nos encargamos de lo que no te necesita a ti.
                </Box>
              </BodyText>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ── HOW ── */}
      <Box sx={{ borderTop: divider }}>
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
          <CodeText sx={{
            fontSize: '0.72rem', letterSpacing: '0.25em',
            color: BRAND_ORANGE, mb: 5, display: 'block',
          }}>
            // how
          </CodeText>
          <Box
            component="h2"
            sx={{
              m: 0,
              mb: { xs: 6, md: 8 },
              fontSize: { xs: '2rem', md: 'clamp(2rem, 3.5vw, 3.2rem)' },
              fontWeight: 300,
              fontFamily: '"Red Hat Display", sans-serif',
              lineHeight: 0.92,
              letterSpacing: '-0.03em',
              color: colors.contrast.text.primary,
            }}
          >
            agentes que trabajan<br />
            como parte de tu equipo.
          </Box>

          <Grid container spacing={0}>
            {[
              {
                num: '01 ─ entendemos',
                title: 'mapeamos\ntu operación',
                body: 'Identificamos qué tareas pueden automatizarse sin perder calidad ni control.',
                icon: 'circle' as const,
              },
              {
                num: '02 ─ construimos',
                title: 'entrenamos\ntus agentes',
                body: 'Cada agente aprende tu voz, tus procesos y tu forma de trabajar.',
                icon: 'square' as const,
              },
              {
                num: '03 ─ operamos',
                title: 'activos\ndesde el día uno',
                body: 'Tu equipo digital corre 24/7 mientras tú te enfocas en lo que importa.',
                icon: 'triangle' as const,
              },
            ].map((step, idx) => (
              <Grid
                item xs={12} md={4} key={idx}
                sx={{
                  pt: { xs: 4, md: 0 },
                  pr: { md: idx < 2 ? 5 : 0 },
                  pl: { md: idx > 0 ? 5 : 0 },
                  borderRight: { md: idx < 2 ? divider : 'none' },
                  borderTop: { xs: idx > 0 ? divider : 'none', md: 'none' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 2 }}>
                  <GeometricIcon type={step.icon} variant="outline" size="small" color={BRAND_ORANGE} />
                  <CodeText sx={{
                    fontSize: '0.65rem', letterSpacing: '0.15em',
                    color: BRAND_ORANGE, display: 'block',
                  }}>
                    {step.num}
                  </CodeText>
                </Box>
                <H2 sx={{
                  fontSize: '1.2rem', fontWeight: 300,
                  lineHeight: 1.15, letterSpacing: '-0.02em',
                  mb: 1.5, whiteSpace: 'pre-line',
                }}>
                  {step.title}
                </H2>
                <BodyText sx={{ fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6, color: muted }}>
                  {step.body}
                </BodyText>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ── WHAT ── */}
      <Box sx={{ borderTop: divider }}>
        <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
          <CodeText sx={{
            fontSize: '0.72rem', letterSpacing: '0.25em',
            color: BRAND_ORANGE, mb: 5, display: 'block',
          }}>
            // what
          </CodeText>

          {/* Header row */}
          <Box sx={{
            display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
            pb: 3, mb: 0, borderBottom: divider,
          }}>
            <Box
              component="h2"
              sx={{
                m: 0,
                fontSize: { xs: '2rem', md: 'clamp(2rem, 3vw, 2.8rem)' },
                fontWeight: 300,
                fontFamily: '"Red Hat Display", sans-serif',
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
              }}
            >
              lo que hacemos.
            </Box>
            <CodeText sx={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: muted, pb: '3px' }}>
              orquestación de agentes.
            </CodeText>
          </Box>

          {/* Service rows */}
          {[
            {
              num: '01',
              name: 'educación',
              desc: 'Tu equipo aprende a trabajar con agentes. La ventaja no es tener la tecnología — es saber usarla.',
            },
            {
              num: '02',
              name: 'transformación',
              desc: 'Rediseñamos tus procesos para que los agentes los puedan ejecutar. Del caos operativo al flujo orquestado.',
            },
            {
              num: '03',
              name: 'operación',
              desc: 'Desplegamos y mantenemos tu ecosistema de agentes activo. Siempre corriendo. Siempre mejorando.',
            },
            {
              num: '04',
              name: 'estrategia',
              desc: 'Diseñamos qué automatizar primero, cómo orquestar y cómo escalar tu infraestructura de agentes.',
            },
          ].map((svc) => (
            <Box
              key={svc.num}
              sx={{
                display: 'flex', alignItems: 'center', gap: { xs: 2, md: 4 },
                py: { xs: 3, md: 3.5 },
                borderBottom: divider,
                cursor: 'default',
                transition: 'gap 0.25s',
                '&:hover .svc-arrow': { opacity: 1, color: BRAND_ORANGE },
              }}
            >
              <CodeText sx={{ fontSize: '0.7rem', color: BRAND_ORANGE, width: '24px', flexShrink: 0 }}>
                {svc.num}
              </CodeText>
              <Box sx={{
                flex: 1,
                fontSize: { xs: '1.5rem', md: 'clamp(1.6rem, 3vw, 2.8rem)' },
                fontWeight: 300,
                fontFamily: '"Red Hat Display", sans-serif',
                letterSpacing: '-0.03em',
                lineHeight: 1,
              }}>
                {svc.name}
              </Box>
              <BodyText sx={{
                fontSize: '0.78rem', fontWeight: 300, lineHeight: 1.4,
                color: muted, maxWidth: '200px', textAlign: 'right',
                display: { xs: 'none', md: 'block' },
              }}>
                {svc.desc}
              </BodyText>
              <Box className="svc-arrow" sx={{
                fontSize: '1.1rem', color: muted, opacity: 0,
                transition: 'all 0.2s', display: { xs: 'none', md: 'block' },
              }}>
                →
              </Box>
            </Box>
          ))}
        </Container>
      </Box>

      {/* ── CLIENTES ── */}
      <Box sx={{ borderTop: divider }}>
        <Container maxWidth="xl" sx={{ py: { xs: 8, md: 10 } }}>
          <CodeText sx={{
            fontSize: '0.72rem', letterSpacing: '0.25em',
            color: BRAND_ORANGE, mb: 5, display: 'block',
          }}>
            // quiénes ya trabajan con agentes
          </CodeText>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            columnGap: { xs: 3, md: 6 },
            rowGap: 2.5,
            alignItems: 'baseline',
          }}>
            {clients.filter(c => c.id !== 'ai4u').map(client => (
              <Box key={client.id} sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5 }}>
                <Box sx={{
                  fontSize: { xs: '1.3rem', md: '1.7rem' },
                  fontWeight: 300,
                  fontFamily: '"Red Hat Display", sans-serif',
                  letterSpacing: '-0.02em',
                  color: colors.contrast.text.primary,
                }}>
                  {client.name}
                </Box>
                <CodeText sx={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: muted, display: { xs: 'none', md: 'inline' } }}>
                  {client.sector.toLowerCase()}
                </CodeText>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* ── FINAL CTA ── */}
      <Box sx={{ borderTop: divider }}>
        <Container maxWidth="xl">
          <Box sx={{
            py: { xs: 10, md: 14 },
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'flex-start', md: 'center' },
            justifyContent: 'space-between',
            gap: 6,
          }}>
            <Box
              component="h2"
              sx={{
                m: 0,
                fontSize: { xs: '2.5rem', md: 'clamp(2.5rem, 5vw, 5rem)' },
                fontWeight: 300,
                fontFamily: '"Red Hat Display", sans-serif',
                lineHeight: 0.88,
                letterSpacing: '-0.04em',
              }}
            >
              empieza a recuperar<br />tu tiempo hoy.
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: { xs: 'flex-start', md: 'center' }, gap: 1.5, flexShrink: 0 }}>
              <DiagnosticCTA
                variant="primary"
                text="escríbenos por WhatsApp"
                size="large"
                showIcon={true}
                sx={{
                  height: '52px',
                  px: 5,
                  fontSize: '0.85rem',
                  fontWeight: 400,
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                  borderRadius: 0,
                  bgcolor: BRAND_ORANGE,
                  color: '#fff',
                  border: 'none',
                  transition: 'opacity 0.2s',
                  '&:hover': { bgcolor: BRAND_ORANGE, opacity: 0.85 },
                }}
              />
              <CodeText sx={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: muted }}>
                // sin compromiso. sin pitch.
              </CodeText>
            </Box>
          </Box>
        </Container>
      </Box>

      {relatedLinks.length > 0 && (
        <Box sx={{ borderTop: `1px solid ${alpha(colors.contrast.divider, 0.5)}` }}>
          <RelatedPages pages={relatedLinks} />
        </Box>
      )}
    </Box>
  );
};

export default Home;
