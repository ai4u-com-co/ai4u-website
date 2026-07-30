import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  Stack, 
  Avatar, 
  IconButton,
  Typography,
  alpha,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Giant, H1, H2, H3, BodyText, Button, GeometricIcon, PixelArtImage, SEOHead, BinaryOverlay, RegistrationMarks, MoireText } from '../components/shared/ui/atoms';
import { Card, DiagnosticCTA, ServicesButton, RelatedPages, ExpandableSection } from '../components/shared/ui/molecules';
import { SurfaceProvider } from '../context';
import { useColors, usePerformanceMonitoring } from '../hooks';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { clients } from '../data/clients';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';
import { COMPONENT_SPACING, SPACING_TOKENS } from '../components/shared/ui/tokens/spacing';
import { TEXT_VARIANTS } from '../components/shared/ui/tokens/typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const WhyAI4U = () => {
  const colors = useColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  usePerformanceMonitoring('why-ai4u', { lcp: 2500, fcp: 1800 });

  // Estado para el carrusel de clientes
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Obtener meta tags optimizados para la página "Por qué AI4U" (ahora fusionada con casos)
  const metaTags = getPageMetaTags('why');
  
  // Obtener enlaces contextuales para la página Why AI4U
  const relatedLinks = getRelatedLinks('/por-que-ai4u');

  // Crear array de clientes duplicados para scroll infinito
  const infiniteClients = [
    ...clients, // Clientes originales
    ...clients, // Duplicado al final
    ...clients  // Duplicado adicional para transición suave
  ];

  // Calcular el ancho de cada tarjeta
  const getCardWidth = useCallback(() => {
    if (!scrollContainerRef.current) return 0;
    const container = scrollContainerRef.current;
    return container.scrollWidth / infiniteClients.length;
  }, [infiniteClients.length]);

  // Navegar al cliente anterior
  const handlePrevious = useCallback(() => {
    if (isNavigating || !scrollContainerRef.current) return;
    
    setIsNavigating(true);
    const container = scrollContainerRef.current;
    const cardWidth = getCardWidth();
    const scrollAmount = cardWidth;
    
    container.scrollBy({
      left: -scrollAmount,
      behavior: 'smooth'
    });

    setCurrentIndex(prev => {
      const newIndex = prev - 1;
      return newIndex < 0 ? clients.length - 1 : newIndex;
    });

    setTimeout(() => setIsNavigating(false), 500);
  }, [isNavigating, getCardWidth]);

  // Navegar al siguiente cliente
  const handleNext = useCallback(() => {
    if (isNavigating || !scrollContainerRef.current) return;
    
    setIsNavigating(true);
    const container = scrollContainerRef.current;
    const cardWidth = getCardWidth();
    const scrollAmount = cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });

    setCurrentIndex(prev => {
      const newIndex = prev + 1;
      return newIndex >= clients.length ? 0 : newIndex;
    });

    setTimeout(() => setIsNavigating(false), 500);
  }, [isNavigating, getCardWidth]);

  // Efecto para inicializar el carrusel en la posición correcta
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const cardWidth = getCardWidth();
      container.scrollTo({
        left: cardWidth * clients.length,
        behavior: 'auto'
      });
    }
  }, [getCardWidth]);

  // Efecto para manejar el scroll infinito
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (isNavigating) return;
      
      const cardWidth = getCardWidth();
      const currentPosition = container.scrollLeft;
      const totalWidth = container.scrollWidth;
      const containerWidth = container.clientWidth;
      
      if (currentPosition >= totalWidth - containerWidth - cardWidth) {
        container.scrollTo({
          left: cardWidth * clients.length,
          behavior: 'auto'
        });
      }
      
      if (currentPosition <= cardWidth) {
        container.scrollTo({
          left: cardWidth * clients.length,
          behavior: 'auto'
        });
      }

      const visibleIndex = Math.round(currentPosition / cardWidth) % clients.length;
      setCurrentIndex(visibleIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isNavigating, getCardWidth]);

  // Navegación por teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext]);

  return (
    <Box sx={{ 
      bgcolor: colors.contrast.background
    }}>
      {/* SEO Head con meta tags optimizados */}
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://www.ai4u.com.co/por-que-ai4u"
      />

      {/* Mariano Section */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: '#FF5C00',
        color: '#000000',
        borderTop: `1px solid ${'#000000'}`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Binary Overlay Pattern */}
        <BinaryOverlay />
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <SurfaceProvider surface="orange">
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} md={7} sx={{ pr: { md: 10 } }}>
                <Box sx={{ textAlign: 'left' }}>
                  <H1 sx={{
                    mb: 6,
                    fontWeight: 400,
                    textTransform: 'none',
                    color: '#000000',
                    lineHeight: 0.85,
                    fontSize: { xs: '3.5rem', md: '7rem' },
                    letterSpacing: '-0.05em'
                  }}>
                    la parte <MoireText color="#000000" sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>humana</MoireText> de la IA
                  </H1>
                  
                  <Stack spacing={6} sx={{ mb: 10 }}>
                    {[
                      'Fundador de AI4U',
                      'Cofundador de Matt Movilidad',
                      'Especialista en Automatización'
                    ].map((text, idx) => (
                      <Box key={idx} sx={{
                        borderLeft: `1px solid ${'#000000'}`,
                        pl: 4,
                        transform: `translateX(${idx * 20}px)`
                      }}>
                        <BodyText sx={{
                          fontSize: '1.5rem',
                          fontWeight: 400,
                          textTransform: 'none',
                          color: '#000000',
                          opacity: 0.8
                        }}>
                          {text}
                        </BodyText>
                      </Box>
                    ))}
                  </Stack>
                  
                  <Box sx={{
                    p: 4,
                    bgcolor: 'transparent',
                    border: `1px solid ${'#000000'}`,
                    maxWidth: '500px',
                    mb: 6
                  }}>
                    <BodyText sx={{
                      color: '#000000',
                      fontSize: '1.2rem',
                      lineHeight: 1.4,
                      fontWeight: 400,
                      opacity: 0.9
                    }}>
                      Experiencia en Startups, Movilidad y Tecnología. Soluciones que funcionan.
                    </BodyText>
                  </Box>
                
                <Button 
                  variant="outline" 
                  size="large"
                  component="a"
                  href="https://www.linkedin.com/in/mariano3/"
                  sx={{
                    height: 'auto',
                    py: 3,
                    px: 8,
                    fontSize: '1.2rem',
                    borderColor: '#000000',
                    color: '#000000',
                    borderRadius: '9999px',
                    '&:hover': {
                      bgcolor: '#000000',
                      color: '#FF5C00',
                      transform: 'translateY(-5px)'
                    }
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedIn
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={5} sx={{ mt: { xs: 8, md: 0 } }}>
              <Box sx={{
                border: `1px solid ${'#000000'}`,
                p: 2,
                position: 'relative'
              }}>
                {/* Cuadro decorativo asimétrico */}
                <Box sx={{ 
                  position: 'absolute', 
                  top: -20, 
                  left: -20, 
                  width: 100, 
                  height: 100, 
                  borderTop: `2px solid ${BRAND_ORANGE}`,
                  borderLeft: `2px solid ${BRAND_ORANGE}`,
                  zIndex: 3
                }} />
                
                <PixelArtImage
                  src="/assets/images/mariano.jpeg"
                  pixelArtSrc="/assets/images/mariano-pixel-art.png"
                  alt="mariano, fundador de ai4u"
                  sx={{
                    width: '100%',
                    height: { xs: 450, md: 650 },
                    display: 'block',
                    filter: 'grayscale(100%)'
                  }}
                  transitionDuration={0.4}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
        </SurfaceProvider>
      </Box>

      {/* Benefits Section */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: '#E0FF00',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Linea asimétrica de fondo */}
        <Box sx={{ position: 'absolute', top: '20%', left: 0, width: '100%', height: '1px', bgcolor: 'rgba(0,0,0,0.1)', transform: 'rotate(-2deg)' }} />

        <SurfaceProvider surface="volt">
          <Container maxWidth="xl">
            <H2 sx={{
              mb: 12,
              textAlign: 'left',
              fontWeight: 400,
              textTransform: 'none',
              color: '#000000',
              fontSize: { xs: '3.5rem', md: '6.5rem' },
              lineHeight: 0.9,
              letterSpacing: '-0.04em'
            }}>
              ¿qué nos hace <br/>
              <Box component="span" sx={{ bgcolor: '#000000', color: '#E0FF00', px: 2, display: 'inline-block', transform: 'rotate(1deg)' }}>diferentes</Box>?
            </H2>

            <Grid container spacing={4} alignItems="stretch">
              {[
                {
                  title: 'Diagnóstico gratuito',
                  description: 'Identificamos oportunidades reales sin costo.',
                },
                {
                  title: 'IA que evoluciona',
                  description: 'Aprende y mejora con tu negocio.',
                },
                {
                  title: 'ROI medible',
                  description: 'Resultados desde las primeras semanas.',
                }
              ].map((benefit, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx} sx={{ mt: { md: idx * 6 } }}>
                  <Card variant="default" sx={{
                    height: '100%',
                    p: 6,
                    borderRadius: 0,
                    bgcolor: 'transparent',
                    color: '#000000',
                    border: `1px solid ${'#000000'}`,
                  }}>
                    <Typography sx={{ ...TEXT_VARIANTS.ui.code, mb: 4, opacity: 0.5 }}>
                      // beneficio0{idx + 1}
                    </Typography>
                    <H3 sx={{ 
                      fontSize: '2.5rem',
                      fontWeight: 400,
                      mb: 3,
                      lineHeight: 1,
                      color: 'inherit',
                      textTransform: 'none'
                    }}>
                      {benefit.title}
                    </H3>
                    <BodyText sx={{ color: 'inherit', fontSize: '1.2rem', fontWeight: 400, opacity: 0.9 }}>
                      {benefit.description}
                    </BodyText>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </SurfaceProvider>
      </Box>

      {/* Clients Carousel Section (REPLACE de UseCases) */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: colors.contrast.background,
        color: colors.contrast.text.primary,
        borderTop: `1px solid ${colors.contrast.text.primary}`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        {/* Lineas de fondo sutiles */}
        <Box sx={{ position: 'absolute', top: 0, left: '33%', width: '1px', height: '100%', bgcolor: 'rgba(0,0,0,0.03)' }} />
        <Box sx={{ position: 'absolute', top: 0, left: '66%', width: '1px', height: '100%', bgcolor: 'rgba(0,0,0,0.03)' }} />

        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
          <H2 sx={{
            mb: 12,
            fontWeight: 400,
            textTransform: 'none',
            color: colors.contrast.text.primary,
            fontSize: { xs: '3.5rem', md: '6.5rem' },
            lineHeight: 0.9,
            letterSpacing: '-0.04em'
          }}>
            nuestros <br/>
            <Box component="span" sx={{ bgcolor: colors.contrast.text.primary, color: colors.contrast.background, px: 2, display: 'inline-block', transform: 'rotate(-1deg)' }}>clientes</Box>
          </H2>

          <Box sx={{ position: 'relative', mb: 10 }}>
            <Box
              ref={scrollContainerRef}
              sx={{
                display: 'flex',
                gap: 0, // Pegadas para estilo grid
                scrollBehavior: 'smooth',
                '&::-webkit-scrollbar': { display: 'none' },
                overflow: 'hidden',
              }}
            >
              {infiniteClients.map((client, index) => (
                <Box
                  key={`${client.id}-${index}`}
                  sx={{
                    flex: '0 0 auto',
                    width: { 
                      xs: '100%', 
                      sm: '50%', 
                      md: '33.333%', 
                      lg: '25%' 
                    }
                  }}
                >
                  <Card 
                    variant="default" 
                    sx={{ 
                      height: '350px',
                      display: 'flex',
                      flexDirection: 'column',
                      p: 6,
                      borderRadius: 0,
                      border: `1px solid ${colors.contrast.text.primary}`,
                      bgcolor: 'transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: colors.contrast.text.primary,
                        borderColor: colors.contrast.text.primary,
                        color: colors.contrast.background,
                        zIndex: 5,
                        '& img': { filter: 'brightness(0) invert(1)' }
                      }
                    }}
                  >
                    <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Box
                        component="img"
                        src={client.logo}
                        alt={client.name}
                        sx={{ 
                          maxWidth: '70%', 
                          maxHeight: '70%', 
                          objectFit: 'contain',
                          filter: 'grayscale(100%)',
                          transition: 'all 0.3s ease'
                        }}
                      />
                    </Box>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <BodyText sx={{ fontSize: '1.15rem', fontWeight: 400 }}>
                        {client.name}
                      </BodyText>
                      <BodyText sx={{ fontSize: '0.85rem', opacity: 0.6 }}>
                        {client.sector}
                      </BodyText>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Box>

            <Stack direction="row" spacing={2} sx={{ mt: 6, justifyContent: 'flex-end' }}>
              <IconButton
                onClick={handlePrevious}
                aria-label="Cliente anterior"
                sx={{
                  bgcolor: colors.contrast.text.primary,
                  color: colors.contrast.background,
                  borderRadius: '9999px',
                  width: 60,
                  height: 60,
                  '&:hover': { opacity: 0.7 }
                }}
              >
                <ChevronLeftIcon />
              </IconButton>

              <IconButton
                onClick={handleNext}
                aria-label="Cliente siguiente"
                sx={{
                  bgcolor: colors.contrast.text.primary,
                  color: colors.contrast.background,
                  borderRadius: '9999px',
                  width: 60,
                  height: 60,
                  '&:hover': { opacity: 0.7 }
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </Stack>
          </Box>

          <BodyText sx={{ fontSize: '1.5rem', fontWeight: 400, maxWidth: '800px', opacity: 0.8 }}>
            alianzas en innovación que perduran.
          </BodyText>
        </Container>
      </Box>

      {/* Results Section (Desde UseCases) */}
      <Box sx={{
        py: COMPONENT_SPACING.layout.section,
        bgcolor: '#0047FF',
        color: '#FFFFFF',
        borderTop: `1px solid ${'#FFFFFF'}`,
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <SurfaceProvider surface="blue">
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
            <Grid container spacing={0} alignItems="stretch">
            <Grid item xs={12} md={5} sx={{ mb: { xs: 8, md: 0 } }}>
              <H2 sx={{
                fontWeight: 400,
                textTransform: 'none',
                mb: 6,
                lineHeight: 0.85,
                fontSize: { xs: '3.5rem', md: '7.5rem' },
                letterSpacing: '-0.05em'
              }}>
                resultados que <br/>
                <Box component="span" sx={{ bgcolor: '#FFFFFF', color: '#0047FF', px: 2, display: 'inline-block' }}>hablan</Box>
              </H2>
              <BodyText sx={{ fontSize: '2rem', fontWeight: 400, lineHeight: 1.1, opacity: 0.9 }}>
                IA que genera crecimiento real y tangible.
              </BodyText>
            </Grid>
            
            <Grid item xs={12} md={7}>
              <Stack spacing={0}>
                {/* Sin promesas numéricas: hechos cualitativos y verdaderos */}
                {[
                  { label: 'agentes trabajando, incluso mientras tú no estás', value: '24/7' },
                  { label: 'tiempo en tareas repetitivas: tu equipo se enfoca en lo que importa', value: 'menos' },
                  { label: 'la información de tu negocio, lista para decidir', value: 'en vivo' }
                ].map((item, idx) => (
                  <Box key={idx} sx={{ 
                    borderBottom: idx === 2 ? 'none' : `1px solid ${'#FFFFFF'}`,
                    py: 6,
                    pl: { md: 10 },
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: { xs: 2, md: 10 }
                  }}>
                    <H2 sx={{ fontWeight: 400, fontSize: '4rem', lineHeight: 1, color: '#FFFFFF' }}>{item.value}</H2>
                    <BodyText sx={{ fontWeight: 400, textTransform: 'none', fontSize: '1.5rem', opacity: 0.9 }}>{item.label}</BodyText>
                  </Box>
                ))}
              </Stack>
            </Grid>
          </Grid>
        </Container>
        </SurfaceProvider>
      </Box>

      {/* Final CTA Section - Actualizado */}
      <Box sx={{
        py: 25,
        bgcolor: '#000000',
        color: '#FFFFFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <RegistrationMarks corners={['bl', 'br']} circles />
        <SurfaceProvider surface="black">
          <Container maxWidth="lg">
            <Stack spacing={10} textAlign="left" alignItems="flex-start">
              <Giant sx={{
                color: '#FFFFFF',
                fontSize: { xs: '4rem', md: '9rem' },
                lineHeight: 0.8,
                fontWeight: 400,
                letterSpacing: '-0.05em'
              }}>
                ¿listo para ser <br/>
                el próximo <MoireText color="#FFFFFF" sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>éxito</MoireText>?
              </Giant>
              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={4} 
              >
                <DiagnosticCTA sx={{
                  height: 'auto',
                  py: 4,
                  px: 10,
                  fontSize: '1.8rem',
                  bgcolor: '#FFFFFF',
                  color: '#000000',
                  borderRadius: '9999px',
                  fontWeight: 400,
                  '&:hover': {
                    opacity: 0.8,
                    transform: 'translateY(-10px)'
                  }
                }} />
                <ServicesButton
                  variant="outline"
                  sx={{
                    height: 'auto',
                    py: 4,
                    px: 10,
                    fontSize: '1.8rem',
                    borderWidth: '2px',
                    borderColor: '#FFFFFF',
                    color: '#FFFFFF',
                    borderRadius: '9999px',
                    fontWeight: 400,
                    '&:hover': {
                      bgcolor: '#FFFFFF',
                      color: '#000000'
                    }
                  }}
                  text="Ver soluciones"
                />
              </Stack>
            </Stack>
          </Container>
        </SurfaceProvider>
      </Box>

      {/* Enlaces Relacionados - SEO Internal Linking */}
      <Container maxWidth="lg">
        <RelatedPages 
          pages={relatedLinks}
          title="Conoce más sobre nuestro trabajo:"
          variant="vertical"
        />
      </Container>
    </Box>
  );
};

export default WhyAI4U;
