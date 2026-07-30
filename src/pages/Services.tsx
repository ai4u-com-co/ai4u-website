import React, { useState } from 'react';
import {
  Container,
  Grid,
  Box,
  Stack,
} from '@mui/material';
import { Giant, H2, BodyText, CodeText, SEOHead, BinaryOverlay, RegistrationMarks, MoireText } from '@/components/shared/ui/atoms';
import { DiagnosticCTA, RelatedPages } from '@/components/shared/ui/molecules';
import { SuperAIModal } from '@/components/shared/ui/organisms';
import { useServicesContext, SurfaceProvider } from '@/context';
import { useColors, usePerformanceMonitoring } from '@/hooks';
import { getServicesStructuredData, getPageMetaTags } from '@/utils/seo';
import { getRelatedLinks } from '@/data/internalLinkingStrategy';
import { COMPONENT_SPACING } from '@/components/shared/ui/tokens/spacing';
import { BRAND_ORANGE } from '@/components/shared/ui/tokens/brandAccent';

// Camino 1 — cualquier empresa que ya tenga un ERP (SAP Business One incluido,
// pero no exclusivo). Nos conectamos directo — es tu primera línea de IA.
const ERP_ITEMS = [
  { n: '01', name: 'dashboards en vivo', desc: 'ventas, cartera, inventario y producción conectados en tiempo real a tu ERP.', price: 'desde $250.000', note: 'mensual' },
  { n: '02', name: 'automatización de procesos', desc: 'pedidos, cartera, facturación — el proceso que más tiempo te cuesta, resuelto.', price: '$300.000–$700.000', note: 'mensual c/u' },
  { n: '03', name: 'agentes conectados a tu ERP', desc: 'chat, alertas y cobranza que hablan con la data real de tu sistema.', price: 'desde $500.000', note: 'mensual' },
];

// Camino 2 — cualquier pyme, sin ERP, que quiere lo mismo: un equipo digital
// trabajando todos los días.
const PYME_ITEMS = [
  { n: '01', name: 'empleado de automatización', desc: 'mensualidad fija, entrega continua — el proceso que elijas, automatizado y mantenido.', price: '$2.000.000', note: 'mensual' },
  { n: '02', name: 'agentes especializados', desc: 'servicio al cliente, prospección o cobranza — un rol completo, no una herramienta.', price: 'desde $500.000', note: 'mensual' },
];

// Grupos del laboratorio — por lo que hacen, no por su nombre interno.
const LAB_GROUPS: { label: string; category: string }[] = [
  { label: 'automatización', category: 'automation' },
  { label: 'analítica', category: 'analytics' },
  { label: 'asistentes ia', category: 'ai_assistant' },
  { label: 'e-commerce', category: 'ecommerce' },
  { label: 'consultoría', category: 'consulting' },
  { label: 'formación', category: 'training' },
];

// Cuerpo real — vive dentro del SurfaceProvider "cream" que exporta el wrapper
// Services de más abajo (mismo patrón que Home.tsx/HomeBody).
const ServicesBody: React.FC = () => {
  const colors = useColors();
  const [isSuperAIModalOpen, setIsSuperAIModalOpen] = useState(false);

  const { getFilteredServices } = useServicesContext();

  usePerformanceMonitoring('services', { lcp: 2500, fcp: 1800 });

  const metaTags = getPageMetaTags('services');
  const structuredData = getServicesStructuredData();
  const relatedLinks = getRelatedLinks('/servicios');

  // Todo lo que también hemos construido — evidencia de rango, no la oferta
  // principal. Sitios web vive en su propia página (capa 3, aparte). Agrupado
  // por lo que hace cada cosa (categoría real), no por su nombre interno.
  const labServices = getFilteredServices().filter(s => s.id !== 'desarrollo-web');
  const labGroups = LAB_GROUPS
    .map(g => ({ ...g, items: labServices.filter(s => s.category === g.category) }))
    .filter(g => g.items.length > 0);

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: colors.contrast.background,
      position: 'relative'
    }}>
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/servicios"
        structuredData={structuredData}
      />

      {/* Hero */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        color: colors.contrast.text.primary,
        borderTop: `1px solid ${colors.contrast.text.primary}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <BinaryOverlay />
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.25em', color: BRAND_ORANGE, mb: 4, display: 'block' }}>
            // ai4u.agentes
          </CodeText>
          <Giant sx={{
            color: colors.contrast.text.primary,
            mb: 5,
            lineHeight: 0.85,
            fontSize: { xs: '3rem', md: '6.5rem' },
            letterSpacing: '-0.04em',
            fontWeight: 400,
            maxWidth: '900px'
          }}>
            <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>agentes</MoireText> dentro de tu operación
          </Giant>
          <BodyText sx={{
            fontSize: { xs: '1.2rem', md: '1.5rem' },
            color: colors.contrast.text.primary,
            maxWidth: '700px',
            opacity: 0.85,
            fontWeight: 300
          }}>
            dos caminos, un solo objetivo: que tu operación trabaje sola.
          </BodyText>
        </Container>
      </Box>

      {/* Camino 1 — conectados a tu ERP (negro, foso profundo) */}
      <SurfaceProvider surface="black">
        <Box sx={{ py: COMPONENT_SPACING.layout.section, bgcolor: '#000000', color: '#FFFFFF', position: 'relative' }}>
          <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
            <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: BRAND_ORANGE, mb: 3, display: 'block' }}>
              // camino 01
            </CodeText>
            <H2 sx={{ fontWeight: 400, textTransform: 'none', fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 0.95, mb: 2, color: '#FFFFFF' }}>
              si tu empresa ya tiene un erp
            </H2>
            <BodyText sx={{ fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.7, mb: 8, maxWidth: '620px' }}>
              nos conectamos directo a tu ERP — se vuelve tu primera línea de inteligencia artificial.
              ya lo hicimos en producción para empresas que corren SAP Business One.
            </BodyText>
            <Grid container spacing={0} sx={{ borderTop: '1px solid rgba(255,255,255,0.15)' }}>
              {ERP_ITEMS.map((item) => (
                <Grid item xs={12} key={item.n} sx={{ borderBottom: '1px solid rgba(255,255,255,0.15)', py: 4 }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                    <Stack direction="row" spacing={3} sx={{ flex: 1 }}>
                      <CodeText sx={{ fontSize: '0.75rem', opacity: 0.4, width: '28px', flexShrink: 0 }}>{item.n}</CodeText>
                      <Box>
                        <Box sx={{ fontSize: '1.4rem', fontFamily: '"Red Hat Display", sans-serif', mb: 1 }}>{item.name}</Box>
                        <BodyText sx={{ color: '#FFFFFF', opacity: 0.6, fontSize: '0.95rem', maxWidth: '480px' }}>{item.desc}</BodyText>
                      </Box>
                    </Stack>
                    <Stack sx={{ textAlign: { xs: 'left', md: 'right' }, flexShrink: 0 }}>
                      <CodeText sx={{ fontSize: '1.2rem', color: BRAND_ORANGE, fontWeight: 700 }}>{item.price}</CodeText>
                      <CodeText sx={{ fontSize: '0.7rem', opacity: 0.5 }}>{item.note}</CodeText>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </SurfaceProvider>

      {/* Camino 2 — cualquier pyme */}
      <Box sx={{ py: COMPONENT_SPACING.layout.section, bgcolor: colors.contrast.background, color: colors.contrast.text.primary, borderBottom: `1px solid ${colors.contrast.border}` }}>
        <Container maxWidth="lg">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: BRAND_ORANGE, mb: 3, display: 'block' }}>
            // camino 02
          </CodeText>
          <H2 sx={{ fontWeight: 400, textTransform: 'none', fontSize: { xs: '2.2rem', md: '3.5rem' }, lineHeight: 0.95, mb: 2 }}>
            si no tienes un erp, pero quieres lo mismo
          </H2>
          <BodyText sx={{ fontSize: '1.1rem', opacity: 0.7, mb: 8, maxWidth: '620px' }}>
            un equipo digital trabajando todos los días, sin importar qué sistema uses hoy.
          </BodyText>
          <Grid container spacing={0} sx={{ borderTop: `1px solid ${colors.contrast.border}` }}>
            {PYME_ITEMS.map((item) => (
              <Grid item xs={12} key={item.n} sx={{ borderBottom: `1px solid ${colors.contrast.border}`, py: 4 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2}>
                  <Stack direction="row" spacing={3} sx={{ flex: 1 }}>
                    <CodeText sx={{ fontSize: '0.75rem', opacity: 0.4, width: '28px', flexShrink: 0 }}>{item.n}</CodeText>
                    <Box>
                      <Box sx={{ fontSize: '1.4rem', fontFamily: '"Red Hat Display", sans-serif', mb: 1 }}>{item.name}</Box>
                      <BodyText sx={{ opacity: 0.6, fontSize: '0.95rem', maxWidth: '480px' }}>{item.desc}</BodyText>
                    </Box>
                  </Stack>
                  <Stack sx={{ textAlign: { xs: 'left', md: 'right' }, flexShrink: 0 }}>
                    <CodeText sx={{ fontSize: '1.2rem', color: BRAND_ORANGE, fontWeight: 700 }}>{item.price}</CodeText>
                    <CodeText sx={{ fontSize: '0.7rem', opacity: 0.5 }}>{item.note}</CodeText>
                  </Stack>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Todo Incluido — bundle, contrato mínimo 1 año */}
      <SurfaceProvider surface="orange">
        <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: BRAND_ORANGE, color: '#000000' }}>
          <Container maxWidth="lg">
            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ md: 'center' }} spacing={4}>
              <Box>
                <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', opacity: 0.6, mb: 2, display: 'block' }}>
                  // todo incluido
                </CodeText>
                <H2 sx={{ fontWeight: 400, textTransform: 'none', fontSize: { xs: '2rem', md: '2.8rem' }, color: '#000000', mb: 1 }}>
                  los dos caminos, en uno solo
                </H2>
                <BodyText sx={{ color: '#000000', opacity: 0.75, fontSize: '1rem', maxWidth: '480px' }}>
                  contrato mínimo 1 año. el software siempre es de ai4u — se cobra mientras siga corriendo.
                </BodyText>
              </Box>
              <Stack sx={{ textAlign: { xs: 'left', md: 'right' }, flexShrink: 0 }}>
                <CodeText sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 700, color: '#000000' }}>
                  $3.500.000–$5.000.000
                </CodeText>
                <CodeText sx={{ fontSize: '0.75rem', opacity: 0.6, color: '#000000' }}>mensual, indefinido</CodeText>
              </Stack>
            </Stack>
          </Container>
        </Box>
      </SurfaceProvider>

      {/* Laboratorio — evidencia de rango, no la oferta principal */}
      <Box sx={{ py: COMPONENT_SPACING.layout.section, bgcolor: colors.contrast.background, color: colors.contrast.text.primary, position: 'relative' }}>
        <Container maxWidth="xl">
          <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.2em', color: BRAND_ORANGE, mb: 3, display: 'block' }}>
            // laboratorio
          </CodeText>
          <H2 sx={{ fontWeight: 400, textTransform: 'none', fontSize: { xs: '2rem', md: '3rem' }, lineHeight: 0.95, mb: 2 }}>
            todo lo que también hemos construido
          </H2>
          <BodyText sx={{ fontSize: '1.05rem', opacity: 0.7, mb: 8, maxWidth: '640px' }}>
            no es el catálogo principal — es la prueba de que, cuando hace falta, también lo resolvemos.
          </BodyText>
          <Grid container spacing={6}>
            {labGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group.category}>
                <CodeText sx={{ fontSize: '0.72rem', letterSpacing: '0.15em', opacity: 0.5, mb: 3, display: 'block', borderBottom: `1px solid ${colors.contrast.border}`, pb: 1.5 }}>
                  // {group.label}
                </CodeText>
                <Stack spacing={2.5}>
                  {group.items.map((service) => {
                    const clickable = service.id === 'super-ai';
                    return (
                      <Box
                        key={service.id}
                        onClick={clickable ? () => setIsSuperAIModalOpen(true) : undefined}
                        sx={{
                          fontSize: '0.95rem',
                          opacity: 0.75,
                          lineHeight: 1.4,
                          cursor: clickable ? 'pointer' : 'default',
                          '&:hover': clickable ? { opacity: 1, color: BRAND_ORANGE } : undefined,
                        }}
                      >
                        {service.description}
                      </Box>
                    );
                  })}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Proceso Section */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: colors.contrast.background,
        color: colors.contrast.text.primary,
        borderTop: `1px solid ${colors.contrast.text.primary}`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={12}>
            <H2 sx={{
              fontWeight: 400,
              textTransform: 'none',
              fontSize: { xs: '3.5rem', md: '7rem' },
              lineHeight: 0.85,
              letterSpacing: '-0.05em',
              color: colors.contrast.text.primary
            }}>
              método <Box component="span" sx={{ bgcolor: colors.contrast.text.primary, color: colors.contrast.background, px: 2, display: 'inline-block', transform: 'rotate(1deg)' }}>directo</Box>
            </H2>
            <Grid container spacing={0}>
              {[
                { n: '01', t: 'Diagnóstico', d: 'Oportunidades reales.' },
                { n: '02', t: 'Priorización', d: 'Foco en resultados.' },
                { n: '03', t: 'Desarrollo', d: 'IA a tu medida.' },
                { n: '04', t: 'Despliegue', d: 'Integración + Soporte.' }
              ].map((step, idx) => (
                <Grid item xs={12} sm={6} md={3} key={idx}>
                  <Box sx={{
                    borderLeft: `1px solid ${colors.contrast.text.primary}`,
                    p: 6,
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: `${colors.contrast.text.primary}08`,
                    }
                  }}>
                    <CodeText sx={{ color: colors.contrast.text.primary, opacity: 0.6, fontSize: '1.2rem', mb: 4 }}>
                      // {step.n}
                    </CodeText>
                    <Box sx={{ fontSize: '2rem', fontFamily: '"Red Hat Display", sans-serif', mb: 2, color: colors.contrast.text.primary, lineHeight: 1 }}>
                      {step.t}
                    </Box>
                    <BodyText sx={{ color: colors.contrast.text.primary, opacity: 0.8, fontSize: '1.1rem' }}>
                      {step.d}
                    </BodyText>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* CTA Final */}
      <Box sx={{
        py: 30,
        bgcolor: colors.contrast.background,
        color: colors.contrast.text.primary,
        borderTop: `1px solid ${colors.contrast.text.primary}`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Stack spacing={10} alignItems="center" textAlign="center">
            <Giant sx={{
              color: colors.contrast.text.primary,
              fontSize: { xs: '4rem', md: '10rem' },
              lineHeight: 0.8,
              fontWeight: 400,
              letterSpacing: '-0.05em'
            }}>
              ¿empezamos?
            </Giant>
            <DiagnosticCTA
              sx={{
                height: 'auto',
                py: 4,
                px: 12,
                fontSize: '2rem',
                borderRadius: '9999px',
                bgcolor: colors.contrast.text.primary,
                color: colors.contrast.background,
                border: 'none',
               fontWeight: 400,
                '&:hover': {
                  opacity: 0.8,
                  transform: 'scale(1.05) translateY(-10px)'
                }
              }}
              text="hablemos por WhatsApp"
            />
          </Stack>
        </Container>
      </Box>

      {/* SEO Internal Linking */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <RelatedPages
          pages={relatedLinks}
          title="Sigue explorando:"
          variant="horizontal"
        />
      </Container>

      <SuperAIModal
        open={isSuperAIModalOpen}
        onClose={() => setIsSuperAIModalOpen(false)}
      />
    </Box>
  );
};

const Services: React.FC = () => (
  <SurfaceProvider surface="cream">
    <ServicesBody />
  </SurfaceProvider>
);

export default Services;
