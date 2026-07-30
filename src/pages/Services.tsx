import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Typography,
  Stack,
  Divider,
  useTheme,
  Collapse,
  alpha
} from '@mui/material';
import { Giant, H1, H2, BodyText, Button, SEOHead, GeometricIcon, BinaryOverlay, RegistrationMarks, MoireText } from '@/components/shared/ui/atoms';
import { ServiceCard, DiagnosticCTA, RelatedPages } from '@/components/shared/ui/molecules';
import { SuperAIModal } from '@/components/shared/ui/organisms';
import { AI4U_PALETTE } from '@/components/shared/ui/tokens/palette';
import { useServicesContext, SurfaceProvider } from '@/context';
import { useColors, usePerformanceMonitoring } from '@/hooks';
import { ServiceSuperCategory } from '@/types/service';
import { getServicesStructuredData, getPageMetaTags } from '@/utils/seo';
import { getRelatedLinks } from '@/data/internalLinkingStrategy';
import { SHADOW_TOKENS } from '@/components/shared/ui/tokens/theme';
import { COMPONENT_SPACING, SPACING_TOKENS } from '@/components/shared/ui/tokens/spacing';
import { TEXT_VARIANTS } from '@/components/shared/ui/tokens/typography';

// Cuerpo real de la página — vive dentro del SurfaceProvider "cream" que exporta
// el wrapper Services de más abajo (mismo patrón que Home.tsx/HomeBody).
const ServicesBody: React.FC = () => {
  const colors = useColors();
  const [isSuperAIModalOpen, setIsSuperAIModalOpen] = useState(false);
  const [expandedAxes, setExpandedAxes] = useState<Record<string, boolean>>({});

  const toggleAxis = (axisId: string) => {
    const isExpanding = !expandedAxes[axisId];
    setExpandedAxes(prev => ({
      ...prev,
      [axisId]: isExpanding
    }));

    if (isExpanding) {
      // Pequeño delay para dejar que la animación de Collapse comience
      setTimeout(() => {
        const element = document.getElementById(axisId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  const { 
    getFilteredServices,
    getServicesBySuperCategory
  } = useServicesContext();

  usePerformanceMonitoring('services', { lcp: 2500, fcp: 1800 });

  const metaTags = getPageMetaTags('services');
  const structuredData = getServicesStructuredData();
  const relatedLinks = getRelatedLinks('/servicios');

  // Definición de los 4 ejes con su estilo y contenido del Pitch
  const axes = [
    {
      id: ServiceSuperCategory.OPERATION,
      title: 'Operación',
      subtitle: 'Eficiencia continua',
      description: 'Optimiza tiempo y recursos.',
      color: colors.contrast.text.primary,
      bgColor: colors.contrast.background,
      textColor: colors.contrast.text.primary,
      accentColor: colors.contrast.text.primary
    },
    {
      id: ServiceSuperCategory.STRATEGY,
      title: 'Estrategia',
      subtitle: 'Data real',
      description: 'Decisiones con ventaja competitiva.',
      color: colors.contrast.text.primary,
      bgColor: colors.contrast.background,
      textColor: colors.contrast.text.primary,
      accentColor: colors.contrast.text.primary
    },
    {
      id: ServiceSuperCategory.EDUCATION,
      title: 'Educación',
      subtitle: 'Evolución humana',
      description: 'Tu equipo dominando la IA.',
      color: colors.contrast.text.primary,
      bgColor: colors.contrast.background,
      textColor: colors.contrast.text.primary,
      accentColor: colors.contrast.text.primary
    },
    {
      id: ServiceSuperCategory.TRANSFORMATION,
      title: 'Transformación',
      subtitle: 'Infraestructura IA',
      description: 'Diseñada para escalar.',
      color: colors.contrast.text.primary,
      bgColor: colors.contrast.background,
      textColor: colors.contrast.text.primary,
      accentColor: colors.contrast.text.primary
    }
  ];

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

      {/* Hero Section - Los 4 Ejes de AI4U */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: colors.contrast.background,
        color: colors.contrast.text.primary,
        borderTop: `1px solid ${colors.contrast.text.primary}`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Binary Overlay Pattern */}
        <BinaryOverlay />
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} lg={8} sx={{ pr: { lg: 10 } }}>
              <Typography
                sx={{
                  color: colors.contrast.text.primary,
                  opacity: 0.6,
                  fontWeight: 400,
                  letterSpacing: 4,
                  fontSize: '1.2rem',
                  mb: 4,
                  display: 'block',
                  ...TEXT_VARIANTS.ui.code
                }}
              >
                // ai4u.lab // 2026.v3
              </Typography>
              <Giant sx={{
                color: colors.contrast.text.primary,
                mb: 6,
                lineHeight: 0.85,
                fontSize: { xs: '3.5rem', md: '8rem' },
                letterSpacing: '-0.05em',
                fontWeight: 400,
                maxWidth: '1000px'
              }}>
                nuestros 4 <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>ejes</MoireText> de servicio
              </Giant>
              <BodyText sx={{
                fontSize: '1.8rem',
                fontWeight: 400,
                color: colors.contrast.text.primary,
                maxWidth: '800px',
                mb: 10,
                lineHeight: 1.1,
                opacity: 0.9
              }}>
                Cuatro frentes. Un objetivo: que tu operación trabaje sola.
              </BodyText>

              {/* Quick Links to Axes */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: { xs: 8, lg: 0 } }}>
                {axes.map((axis) => (
                  <Button
                    key={axis.id}
                    variant="outline"
                    onClick={() => toggleAxis(axis.id)}
                    sx={{
                      borderColor: `${colors.contrast.text.primary}40`,
                      color: colors.contrast.text.primary,
                      borderRadius: '9999px',
                      px: 4,
                      py: 2,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: colors.contrast.text.primary,
                        bgcolor: colors.contrast.text.primary,
                        color: colors.contrast.background,
                        transform: 'translateY(-5px)'
                      }
                    }}
                  >
                    {axis.title}
                  </Button>
                ))}
              </Stack>
            </Grid>

            <Grid item xs={12} lg={4} sx={{ mt: { xs: 8, lg: 0 } }}>
              <Box sx={{
                p: 6,
                bgcolor: 'transparent',
                border: `1px solid ${colors.contrast.text.primary}`,
                position: 'relative'
              }}>
                <Stack spacing={6}>
                  {axes.map((axis, idx) => (
                    <Box
                      key={axis.id}
                      onClick={() => toggleAxis(axis.id)}
                      sx={{
                        display: 'flex',
                        gap: 4,
                        alignItems: 'flex-start',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateX(15px)',
                          '& .idx': { opacity: 1 }
                        }
                      }}
                    >
                      <Typography className="idx" sx={{
                        fontWeight: 400,
                        fontSize: '1.2rem',
                        color: colors.contrast.text.primary,
                        opacity: 0.5,
                        fontFamily: '"Necto Mono", monospace',
                        mt: 0.5,
                        transition: 'opacity 0.3s ease'
                      }}>
                        0{idx + 1}
                      </Typography>
                      <Box>
                        <Typography sx={{ fontSize: '1.5rem', fontWeight: 400, color: colors.contrast.text.primary, textTransform: 'none', mb: 1, lineHeight: 1 }}>
                          {axis.title}
                        </Typography>
                        <Typography sx={{ color: colors.contrast.text.primary, opacity: 0.7, fontWeight: 400, fontSize: '1rem' }}>
                          {axis.description}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Secciones de los 4 Ejes */}
      {axes.map((axis, index) => {
        const axisServices = getServicesBySuperCategory(axis.id);
        
        return (
          <Box
            key={axis.id}
            id={axis.id}
            sx={{
              py: COMPONENT_SPACING.layout.section,
              bgcolor: axis.bgColor,
              color: axis.textColor,
              borderTop: `1px solid ${colors.contrast.text.primary}`,
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background Number */}
            <Typography
              sx={{
                position: 'absolute',
                top: -6,
                right: 2.5,
                fontSize: { xs: '15rem', md: '25rem' },
                fontWeight: 400,
                color: axis.accentColor,
                opacity: expandedAxes[axis.id] ? 0.08 : 0.04,
                zIndex: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                transition: 'all 0.4s ease'
              }}
            >
              0{index + 1}
            </Typography>

            <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
              <Grid container spacing={0} alignItems="flex-start">
                {/* Header del Eje */}
                <Grid item xs={12} lg={4} sx={{ pr: { lg: 10 }, mb: { xs: 8, lg: 0 } }}>
                  <Box sx={{ position: { lg: 'sticky' }, top: 150 }}>
                    <Typography
                      sx={{
                        color: axis.accentColor,
                        opacity: 0.6,
                        fontWeight: 400,
                        letterSpacing: 4,
                        fontSize: '1rem',
                        mb: 4,
                        display: 'block',
                        ...TEXT_VARIANTS.ui.code
                      }}
                    >
                      // {axis.subtitle}
                    </Typography>
                    <H2 sx={{
                      fontWeight: 400,
                      textTransform: 'none',
                      fontSize: { xs: '3.5rem', md: '6.5rem' },
                      lineHeight: 0.85,
                      letterSpacing: '-0.05em',
                      mb: 6,
                      color: 'inherit'
                    }}>
                      {axis.title.toLowerCase()}
                    </H2>
                    <BodyText sx={{ 
                      fontSize: '1.5rem', 
                      fontWeight: 400, 
                      lineHeight: 1.1,
                      maxWidth: '500px',
                      mb: 8,
                      color: 'inherit',
                      opacity: 0.9
                    }}>
                      {axis.description}
                    </BodyText>
                    <Button 
                      variant="outline"
                      sx={{ 
                        borderColor: axis.textColor,
                        color: axis.textColor,
                        borderRadius: '9999px',
                        px: 6,
                        py: 3,
                        fontSize: '1.2rem',
                        borderWidth: '2px',
                        '&:hover': {
                          bgcolor: axis.textColor,
                          color: axis.bgColor,
                          transform: 'translateY(-5px)',
                          borderColor: axis.textColor
                        },
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2
                      }}
                      onClick={() => toggleAxis(axis.id)}
                    >
                      {expandedAxes[axis.id] ? 'cerrar eje' : 'explorar soluciones'}
                      <Box sx={{ 
                        display: 'flex', 
                        transform: expandedAxes[axis.id] ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.4s ease'
                      }}>
                        <GeometricIcon type="arrow-right" size="small" color="inherit" />
                      </Box>
                    </Button>
                  </Box>
                </Grid>

                {/* Grid de Servicios del Eje */}
                <Grid item xs={12} lg={8}>
                  <Collapse in={expandedAxes[axis.id]} timeout={600}>
                    <Grid container spacing={4}>
                      {axisServices.map((service, sIdx) => (
                        <Grid item xs={12} sm={6} key={service.id} sx={{ mt: { md: sIdx % 2 !== 0 ? 10 : 0 } }}>
                          <Box sx={{ 
                            animation: expandedAxes[axis.id] ? `fadeInUp 0.6s ease forwards ${sIdx * 0.1}s` : 'none',
                            opacity: 0,
                            '@keyframes fadeInUp': {
                              from: { opacity: 0, transform: 'translateY(40px)' },
                              to: { opacity: 1, transform: 'translateY(0)' }
                            }
                          }}>
                            <ServiceCard 
                              service={service}
                              showPrice={false}
                              onClick={service.id === 'super-ai' ? () => setIsSuperAIModalOpen(true) : undefined}
                            />
                          </Box>
                        </Grid>
                      ))}
                    </Grid>
                  </Collapse>
                  
                  {!expandedAxes[axis.id] && (
                    <Box sx={{ 
                      height: '400px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      border: `1px solid ${alpha(axis.textColor, 0.1)}`,
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        '& .bg-text': { opacity: 0.1, transform: 'scale(1.1)' },
                        '& .btn-explore': { opacity: 1, transform: 'translateY(0)' }
                      }
                    }}
                    onClick={() => toggleAxis(axis.id)}
                    >
                      <Typography className="bg-text" sx={{ 
                        fontWeight: 400, 
                        fontSize: '12rem', 
                        color: axis.textColor, 
                        opacity: 0.05,
                        transition: 'all 0.5s ease',
                        userSelect: 'none'
                      }}>
                        {axis.title.substring(0, 3)}
                      </Typography>
                      <Box className="btn-explore" sx={{ 
                        position: 'absolute', 
                        opacity: 0.5, 
                        transform: 'translateY(20px)',
                        transition: 'all 0.5s ease',
                        textAlign: 'center'
                      }}>
                        <Typography sx={{ fontWeight: 400, letterSpacing: 4, fontSize: '0.9rem', ...TEXT_VARIANTS.ui.code }}>
                          // clickParaExplorar //
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        );
      })}

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
                    <Typography sx={{ color: colors.contrast.text.primary, opacity: 0.6, fontSize: '1.2rem', mb: 4, ...TEXT_VARIANTS.ui.code }}>
                      // {step.n}
                    </Typography>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 400, mb: 2, color: colors.contrast.text.primary, textTransform: 'none', lineHeight: 1 }}>
                      {step.t}
                    </Typography>
                    <BodyText sx={{ fontWeight: 400, color: colors.contrast.text.primary, opacity: 0.8, fontSize: '1.1rem' }}>
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
