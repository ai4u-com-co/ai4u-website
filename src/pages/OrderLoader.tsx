import React from 'react';
import { Box, Container, Grid, Stack } from '@mui/material';
import { Giant, H2, BodyText, CodeText, SEOHead, GeometricIcon, RegistrationMarks, MoireText } from '../components/shared/ui/atoms';
import { DiagnosticCTA, RelatedPages } from '../components/shared/ui/molecules';
import { SurfaceProvider } from '../context';
import { useColors, usePerformanceMonitoring } from '../hooks';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';

const STEPS = [
  {
    n: '01',
    name: 'llega el correo',
    desc: 'un pedido entra a la bandeja del cliente, en el formato que sea — PDF, Excel, texto plano.',
  },
  {
    n: '02',
    name: 'orderLoader lo lee',
    desc: 'extrae artículos, cantidades, cliente, fechas — sin plantilla fija, sin digitación manual.',
  },
  {
    n: '03',
    name: 'crea el pedido en SAP',
    desc: 'la orden queda en SAP Business One, lista para producción, sin que nadie la haya tipeado.',
  },
];

const FACTS = [
  { n: '2', label: 'plantas en producción', detail: 'Tamaprint y Flexoimpresos, mismo motor, sin bifurcar código' },
  { n: '24/7', label: 'sin turnos', detail: 'corre solo, todos los días, no espera a que alguien lo revise' },
  { n: '0', label: 'digitación manual', detail: 'el pedido nace en SAP directo desde el correo del cliente' },
];

// Cuerpo real — vive dentro del SurfaceProvider "cream" del wrapper de más abajo
// (mismo patrón que SitiosWeb.tsx/Home.tsx). Módulo propio: orderLoader es el
// producto que originó a Ai4U, no un caso más dentro del portafolio genérico.
const OrderLoaderBody: React.FC = () => {
  const colors = useColors();
  usePerformanceMonitoring('orderloader', { lcp: 2500, fcp: 1800 });
  const relatedLinks = getRelatedLinks('/orderloader');

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: colors.contrast.background, color: colors.contrast.text.primary }}>
      <SEOHead
        title="orderLoader | AI4U"
        description="El correo del pedido entra, la orden sale creada en SAP Business One. Sin digitación manual, corriendo 24/7 en plantas de manufactura reales."
        canonical="https://www.ai4u.com.co/orderloader"
      />

      {/* Hero */}
      <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative', borderBottom: `1px solid ${colors.contrast.border}` }}>
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <Container maxWidth="lg">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: BRAND_ORANGE, mb: 4, display: 'block' }}>
            // ai4u.orderloader
          </CodeText>
          <Giant sx={{ fontWeight: 400, lineHeight: 0.85, fontSize: { xs: '2.4rem', sm: '3.5rem', md: '7rem' }, mb: 4, overflowWrap: 'break-word', wordBreak: 'break-word' }}>
            <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>
              orderloader
            </MoireText>
          </Giant>
          <BodyText sx={{ fontSize: { xs: '1.2rem', md: '1.5rem' }, maxWidth: '620px', opacity: 0.85, fontWeight: 300 }}>
            un agente lee los correos de pedidos y los crea en SAP Business One, sin que nadie
            los digite. es el producto que originó a AI4U — hoy corre en dos plantas reales.
          </BodyText>
        </Container>
      </Box>

      {/* Cómo funciona */}
      <Box sx={{ py: { xs: 8, md: 12 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {STEPS.map((step) => (
              <Grid item xs={12} md={4} key={step.n}>
                <Box sx={{
                  p: { xs: 4, md: 5 },
                  height: '100%',
                  border: `1px solid ${colors.contrast.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  <CodeText sx={{ fontSize: '0.75rem', opacity: 0.5, mb: 3 }}>{step.n}</CodeText>
                  <H2 sx={{ fontWeight: 400, fontSize: { xs: '1.5rem', md: '1.8rem' }, mb: 2, textTransform: 'none' }}>
                    {step.name}
                  </H2>
                  <BodyText sx={{ opacity: 0.75, fontSize: '0.95rem' }}>{step.desc}</BodyText>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* En producción — hechos, no promesas */}
      <Box sx={{ py: { xs: 8, md: 12 }, borderTop: `1px solid ${colors.contrast.border}` }}>
        <Container maxWidth="lg">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: colors.contrast.text.secondary, mb: 5, display: 'block' }}>
            // en producción, no en demo
          </CodeText>
          <Grid container spacing={4}>
            {FACTS.map((fact) => (
              <Grid item xs={12} md={4} key={fact.label}>
                <CodeText sx={{ fontSize: { xs: '2.5rem', md: '3.2rem' }, fontWeight: 700, color: BRAND_ORANGE, display: 'block', lineHeight: 1 }}>
                  {fact.n}
                </CodeText>
                <BodyText sx={{ fontSize: '1rem', fontWeight: 500, mt: 1.5, mb: 0.5 }}>{fact.label}</BodyText>
                <BodyText sx={{ fontSize: '0.85rem', opacity: 0.65 }}>{fact.detail}</BodyText>
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 6 }}>
            <GeometricIcon type="check" size="small" variant="minimal" color={BRAND_ORANGE} />
            <BodyText sx={{ fontSize: '0.9rem', opacity: 0.7 }}>mismo motor, config por planta — sin bifurcar código por cliente</BodyText>
          </Stack>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: 2 }}>
            <GeometricIcon type="check" size="small" variant="minimal" color={BRAND_ORANGE} />
            <BodyText sx={{ fontSize: '0.9rem', opacity: 0.7 }}>habla con SAP a través de un único gateway propio, no directo a Service Layer</BodyText>
          </Stack>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 16 }, borderTop: `1px solid ${colors.contrast.border}`, display: 'flex', justifyContent: 'center' }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Giant sx={{ fontWeight: 400, fontSize: { xs: '2.5rem', md: '4.5rem' }, lineHeight: 0.9, mb: 6 }}>
            ¿tu equipo sigue digitando pedidos?
          </Giant>
          <DiagnosticCTA
            variant="primary"
            text="escríbenos por WhatsApp"
            size="large"
            showIcon={false}
            message="hola, vi orderLoader en la web y quiero saber más"
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

const OrderLoader: React.FC = () => (
  <SurfaceProvider surface="cream">
    <OrderLoaderBody />
  </SurfaceProvider>
);

export default OrderLoader;
