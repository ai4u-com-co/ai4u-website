import React from 'react';
import { Box, Container, Grid, Stack, Link as MuiLink } from '@mui/material';
import { Giant, H2, BodyText, CodeText, SEOHead, GeometricIcon, RegistrationMarks, MoireText } from '../components/shared/ui/atoms';
import { DiagnosticCTA, RelatedPages } from '../components/shared/ui/molecules';
import { SurfaceProvider } from '../context';
import { useColors, usePerformanceMonitoring } from '../hooks';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';

const PLANS = [
  {
    n: '01',
    name: 'landing',
    desc: 'una página, sin backend. lista para publicar y empezar a recibir tráfico.',
    price: '$3.000.000',
    note: 'pago único',
  },
  {
    n: '02',
    name: 'con backend',
    desc: 'formulario, base de datos, lógica propia — la misma landing, con capacidad real detrás.',
    price: '$4.000.000',
    note: 'pago único',
  },
];

const SITES = [
  {
    name: 'La Magdalena',
    desc: 'estudio de storytelling de impacto social y ambiental.',
    url: 'https://www.lamagdalena.com.co',
    label: 'lamagdalena.com.co',
  },
  {
    name: 'Catalina Romero',
    desc: 'portafolio de dirección de arte, estilismo y narrativa visual.',
    url: 'https://cromero.vercel.app/',
    label: 'cromero.vercel.app',
  },
];

// Cuerpo real — vive dentro del SurfaceProvider "cream" del wrapper de más abajo
// (mismo patrón que Home.tsx/HomeBody, Services.tsx). Página aparte a propósito:
// no forma parte del pitch de agentes/SAP — es la capa 3, oferta independiente.
const SitiosWebBody: React.FC = () => {
  const colors = useColors();
  usePerformanceMonitoring('sitios-web', { lcp: 2500, fcp: 1800 });
  const relatedLinks = getRelatedLinks('/sitios-web');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.contrast.background, color: colors.contrast.text.primary }}>
      <SEOHead
        title="Sitios Web | AI4U"
        description="Landing pages y sitios con backend, arquitectura de alto rendimiento, entregados en días. Pago único."
        canonical="https://www.ai4u.com.co/sitios-web"
      />

      {/* Hero */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative', borderBottom: `1px solid ${colors.contrast.border}` }}>
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <Container maxWidth="lg">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: BRAND_ORANGE, mb: 4, display: 'block' }}>
            // ai4u.sitios-web
          </CodeText>
          <Giant sx={{ fontWeight: 400, lineHeight: 0.85, fontSize: { xs: '3.5rem', md: '7rem' }, mb: 4 }}>
            <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>
              sitios web
            </MoireText>
          </Giant>
          <BodyText sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, maxWidth: '620px', opacity: 0.85, fontWeight: 300 }}>
            plataformas web de alto rendimiento. arquitectura optimizada, sin vueltas —
            entregado, pagado una vez, tuyo.
          </BodyText>
        </Container>
      </Box>

      {/* Planes */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {PLANS.map((plan) => (
              <Grid item xs={12} md={6} key={plan.n}>
                <Box sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  border: `1px solid ${colors.contrast.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <CodeText sx={{ fontSize: '0.75rem', opacity: 0.5, mb: 3 }}>{plan.n}</CodeText>
                  <H2 sx={{ fontWeight: 400, fontSize: { xs: '1.8rem', md: '2.4rem' }, mb: 2, textTransform: 'none' }}>
                    {plan.name}
                  </H2>
                  <BodyText sx={{ opacity: 0.75, mb: 5, flex: 1, fontSize: '1rem' }}>{plan.desc}</BodyText>
                  <Stack direction="row" alignItems="baseline" spacing={1.5}>
                    <CodeText sx={{ fontSize: { xs: '1.6rem', md: '2rem' }, fontWeight: 700, color: BRAND_ORANGE }}>
                      {plan.price}
                    </CodeText>
                    <CodeText sx={{ fontSize: '0.75rem', opacity: 0.55 }}>{plan.note}</CodeText>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 6 }}>
            <GeometricIcon type="check" size="small" variant="minimal" color={BRAND_ORANGE} />
            <BodyText sx={{ fontSize: '0.9rem', opacity: 0.7 }}>optimización SEO/LCP</BodyText>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
            <GeometricIcon type="check" size="small" variant="minimal" color={BRAND_ORANGE} />
            <BodyText sx={{ fontSize: '0.9rem', opacity: 0.7 }}>entrega en ~14 días</BodyText>
          </Stack>
        </Container>
      </Box>

      {/* Sitios que hemos construido */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: `1px solid ${colors.contrast.border}` }}>
        <Container maxWidth="lg">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: colors.contrast.text.secondary, mb: 5, display: 'block' }}>
            // sitios que hemos construido
          </CodeText>
          <Grid container spacing={4}>
            {SITES.map((site) => (
              <Grid item xs={12} md={6} key={site.name}>
                <MuiLink
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{
                    display: 'block',
                    p: { xs: 4, md: 5 },
                    height: '100%',
                    border: `1px solid ${colors.contrast.border}`,
                    color: 'inherit',
                    transition: 'border-color 0.2s ease',
                    '&:hover': { borderColor: BRAND_ORANGE },
                  }}
                >
                  <H2 sx={{ fontWeight: 400, fontSize: { xs: '1.6rem', md: '2rem' }, mb: 1.5, textTransform: 'none' }}>
                    {site.name}
                  </H2>
                  <BodyText sx={{ opacity: 0.75, mb: 3, fontSize: '0.95rem' }}>{site.desc}</BodyText>
                  <CodeText sx={{ fontSize: '0.8rem', color: BRAND_ORANGE }}>
                    {site.label} →
                  </CodeText>
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 16 }, borderTop: `1px solid ${colors.contrast.border}`, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Giant sx={{ fontWeight: 400, fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 0.9, mb: 6 }}>
            ¿lo construimos?
          </Giant>
          <DiagnosticCTA
            variant="primary"
            text="escríbenos por WhatsApp"
            size="large"
            showIcon={false}
            sx={{
              height: '52px', px: 5, fontSize: '0.85rem', fontWeight: 400,
              fontFamily: 'monospace', letterSpacing: '0.05em', borderRadius: 0,
              bgcolor: BRAND_ORANGE, color: '#fff', border: 'none',
              '&:hover': { bgcolor: BRAND_ORANGE, opacity: 0.85 },
            }}
          />
        </Container>
      </Box>

      {relatedLinks.length > 0 && (
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <RelatedPages pages={relatedLinks} title="Sigue explorando:" variant="horizontal" />
        </Container>
      )}
    </Box>
  );
};

const SitiosWeb: React.FC = () => (
  <SurfaceProvider surface="cream">
    <SitiosWebBody />
  </SurfaceProvider>
);

export default SitiosWeb;
