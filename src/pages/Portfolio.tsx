import React from 'react';
import { 
  Container, 
  Grid, 
  Box, 
  useTheme, 
  useMediaQuery, 
  Stack
} from '@mui/material';
import { Giant, H2, BodyText, SmallText, CodeText, SEOHead, GeometricIcon, RegistrationMarks, MoireText } from '../components/shared/ui/atoms';
import { RelatedPages } from '../components/shared/ui/molecules';
import { useColors } from '../hooks';
import { SurfaceProvider } from '../context';
import { getPageMetaTags } from '../utils/seo';
import { getRelatedLinks } from '../data/internalLinkingStrategy';
import { featuredProjects } from '../data/featuredProjects';
import { COMPONENT_SPACING } from '../components/shared/ui/tokens/spacing';
import { TEXT_VARIANTS } from '../components/shared/ui/tokens/typography';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';

// Cuerpo real — vive dentro del SurfaceProvider "white" que exporta el wrapper
// Portfolio de más abajo (mismo patrón que Home.tsx/HomeBody y Services.tsx).
const PortfolioBody = () => {
  const colors = useColors();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Obtener meta tags optimizados para la página de portafolio
  const metaTags = getPageMetaTags('portfolio');
  
  // Obtener enlaces contextuales para la página de portafolio
  const relatedLinks = getRelatedLinks('/portafolio');

  return (
    <Box sx={{ 
      bgcolor: colors.contrast.background,
      color: colors.contrast.text.primary,
      minHeight: '100vh',
      transition: 'all 0.3s ease'
    }}>
      {/* SEO Head con meta tags optimizados */}
      <SEOHead
        title={metaTags.title}
        description={metaTags.description}
        keywords={metaTags.keywords}
        canonical="https://ai4u.com.co/portafolio"
      />

      {/* Header Section / Technical Label */}
      <Box sx={{
        pt: { xs: 12, md: 20 },
        pb: 4,
        position: 'relative',
        borderBottom: `1px solid ${colors.contrast.border}`
      }}>
        <RegistrationMarks corners={['tl', 'tr']} circles />
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Box>
              <SmallText sx={{
                color: colors.contrast.text.secondary,
                ...TEXT_VARIANTS.ui.code,
                mb: 1,
                textTransform: 'lowercase'
              }}>
                // portafolio.v3.2026
              </SmallText>
              <Giant sx={{
                fontWeight: 400,
                color: colors.contrast.text.primary,
                lineHeight: 0.9,
                mb: 0
              }}>
                <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>
                  portafolio
                </MoireText>
              </Giant>
            </Box>
            {!isMobile && (
              <CodeText sx={{ mb: 1, color: colors.contrast.text.secondary, textTransform: 'lowercase' }}>
                [ index_08_cases ]
              </CodeText>
            )}
          </Stack>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Box sx={{ py: 8, bgcolor: theme.palette.mode === 'light' ? colors.palette.gray[50] : colors.palette.gray[900] }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12} md={7}>
              <BodyText sx={{ 
                fontSize: { xs: '1.25rem', md: '1.75rem' }, 
                lineHeight: 1.3,
                color: colors.contrast.text.primary,
                fontWeight: 300
              }}>
                Exploración de sistemas inteligentes y arquitecturas digitales aplicadas a problemas industriales de alta complejidad.
              </BodyText>
            </Grid>
            <Grid item xs={12} md={5} sx={{ mt: { xs: 4, md: 0 }, display: 'flex', justifyContent: { md: 'flex-end' }, alignItems: 'center' }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <GeometricIcon type="circle" variant="outline" size="small" />
                <SmallText sx={{ color: colors.contrast.text.secondary, ...TEXT_VARIANTS.ui.code, textTransform: 'lowercase' }}>
                  ai4u_system_log
                </SmallText>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Projects Grid Section */}
      <Box sx={{ 
        py: COMPONENT_SPACING.layout.section,
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Grilla técnica de fondo */}
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          zIndex: 0,
          backgroundImage: `linear-gradient(${theme.palette.mode === 'light' ? colors.palette.gray[100] : colors.palette.gray[800]} 1px, transparent 1px), linear-gradient(90deg, ${theme.palette.mode === 'light' ? colors.palette.gray[100] : colors.palette.gray[800]} 1px, transparent 1px)`,
          backgroundSize: '100px 100px',
          opacity: 0.3
        }} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={0} sx={{ 
            borderTop: `1px solid ${colors.contrast.border}`, 
            borderLeft: `1px solid ${colors.contrast.border}` 
          }}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} md={6} key={project.id} sx={{ 
                borderRight: `1px solid ${colors.contrast.border}`, 
                borderBottom: `1px solid ${colors.contrast.border}`,
                position: 'relative'
              }}>
                <Box 
                  component="a"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ 
                    display: 'block',
                    textDecoration: 'none',
                    p: 4,
                    height: '100%',
                    transition: 'all 0.4s ease',
                    bgcolor: 'transparent',
                    '&:hover': {
                      bgcolor: theme.palette.mode === 'light' ? colors.palette.gray[50] : colors.palette.gray[900],
                      '& .project-image-container': {
                        filter: 'grayscale(0%)'
                      },
                      '& .project-title': {
                        color: BRAND_ORANGE
                      }
                    }
                  }}
                >
                  <Stack spacing={3}>
                    {/* Technical Header */}
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <SmallText sx={{ ...TEXT_VARIANTS.ui.code, color: colors.contrast.text.primary }}>
                        0{index + 1} //
                      </SmallText>
                      <CodeText sx={{ fontSize: '0.7rem', textTransform: 'lowercase' }}>
                        [{project.category.replace(/ /g, '_').toLowerCase()}]
                      </CodeText>
                    </Stack>

                    {/* Title */}
                    <H2 className="project-title" sx={{ 
                      fontWeight: 400, 
                      fontSize: { xs: '2rem', md: '3rem' },
                      transition: 'color 0.3s ease'
                    }}>
                      {project.title}
                    </H2>

                    {/* Image Container */}
                    <Box className="project-image-container" sx={{ 
                      width: '100%',
                      aspectRatio: '16/9',
                      bgcolor: theme.palette.mode === 'light' ? colors.palette.gray[100] : colors.palette.gray[800],
                      overflow: 'hidden',
                      filter: 'grayscale(100%)',
                      transition: 'filter 0.6s ease',
                      border: `1px solid ${colors.contrast.border}`
                    }}>
                      <Box
                        component="img"
                        src={project.image}
                        alt={project.title}
                        sx={{ 
                          width: '100%', 
                          height: '100%', 
                          objectFit: 'cover'
                        }}
                      />
                    </Box>

                    {/* Description */}
                    <BodyText sx={{ 
                      color: colors.contrast.text.secondary,
                      fontSize: '1rem',
                      minHeight: '3.5em'
                    }}>
                      {project.description}
                    </BodyText>

                    {/* Footer Link */}
                    <Stack direction="row" spacing={1} alignItems="center">
                      <SmallText sx={{ 
                        ...TEXT_VARIANTS.ui.code, 
                        color: colors.contrast.text.primary, 
                        borderBottom: `1px solid ${colors.contrast.border}`,
                        textTransform: 'lowercase'
                      }}>
                        explore_case_study
                      </SmallText>
                      <GeometricIcon type="plus" size="small" variant="minimal" />
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Enlaces Relacionados - SEO Internal Linking */}
      <Box sx={{ py: 10, bgcolor: colors.contrast.background, borderTop: `1px solid ${colors.contrast.border}` }}>
        <Container maxWidth="lg">
          <RelatedPages 
            pages={relatedLinks}
            title="Sigue explorando:"
            variant="vertical"
          />
        </Container>
      </Box>
    </Box>
  );
};

const Portfolio = () => (
  <SurfaceProvider surface="white">
    <PortfolioBody />
  </SurfaceProvider>
);

export default Portfolio;
