import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Box, Typography as MuiTypography, Divider, IconButton, Stack, useTheme } from '@mui/material';
import { SmallText } from '../atoms';
import { useColors } from '../../../../hooks';
import { SPACING_TOKENS } from '../../../../components/shared/ui/tokens/spacing';
import { TEXT_VARIANTS } from '../../../../components/shared/ui/tokens/typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import XIcon from '@mui/icons-material/X';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { ROUTES } from '../../../../utils/constants';
import { scrollToTop } from '../../../../utils/helpers';


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const colors = useColors();

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/ai.4.u_/' },
    { name: 'Facebook', icon: <FacebookIcon />, url: 'https://www.facebook.com/artificial.intelligence.4.you/' },
    { name: 'LinkedIn', icon: <LinkedInIcon />, url: 'https://www.linkedin.com/company/ai4u-com-co' },
    { name: 'X', icon: <XIcon />, url: 'https://x.com/_ai4u_' }
  ];

  const quickLinks = [
    { name: 'inicio', path: ROUTES.HOME },
    { name: 'servicios', path: ROUTES.SERVICES },
    { name: 'portafolio', path: ROUTES.PORTFOLIO },
    { name: 'por qué ai4u', path: ROUTES.WHY_AI4U },
    { name: 'design system', path: ROUTES.DESIGN_SYSTEM }
  ];

  return (
    <Box
      sx={{
        bgcolor: colors.contrast.background,
        color: colors.contrast.text.primary,
        borderTop: 1,
        borderColor: colors.contrast.divider,
        py: 8
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={8}>
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src={colors.mode === 'light' ? '/assets/images/isotipo-negro.png' : '/assets/images/isotipo-crema.png'}
              alt="AI4U Logo"
              sx={{
                height: 50,
                width: 'auto',
                mb: 4
              }}
            />
            <MuiTypography variant="body2" sx={{ color: 'inherit', opacity: 0.8 }}>
              Inteligencia para tu negocio.
            </MuiTypography>
          </Grid>

          <Grid item xs={12} md={4}>
            <MuiTypography sx={{ ...TEXT_VARIANTS.label.main, mb: 3 }}>
              enlaces rápidos
            </MuiTypography>
            <Box component="nav" aria-label="Enlaces rápidos">
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {quickLinks.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 2 }}>
                    <Box
                      component={Link}
                      to={link.path}
                      onClick={() => scrollToTop()}
                      sx={{
                        color: 'inherit',
                        opacity: 0.7,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        display: 'block',
                        transition: 'opacity 0.2s',
                        '&:hover': { opacity: 1 }
                      }}
                    >
                      {link.name}
                    </Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <MuiTypography sx={{ ...TEXT_VARIANTS.label.main, mb: 3 }}>
              contacto directo
            </MuiTypography>
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon sx={{ color: 'inherit', fontSize: '1.2rem', opacity: 0.8 }} />
                <MuiTypography variant="body2" sx={{ color: 'inherit', opacity: 0.7 }}>
                  hola@ai4u.com.co
                </MuiTypography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <WhatsAppIcon sx={{ color: 'inherit', fontSize: '1.2rem', opacity: 0.8 }} />
                <MuiTypography variant="body2" sx={{ color: 'inherit', opacity: 0.7 }}>
                  +57 302 490 6414
                </MuiTypography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOnIcon sx={{ color: 'inherit', fontSize: '1.2rem', opacity: 0.8 }} />
                <MuiTypography variant="body2" sx={{ color: 'inherit', opacity: 0.7 }}>
                  Medellín, Colombia
                </MuiTypography>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, borderColor: colors.contrast.divider, opacity: 0.1 }} />

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', md: 'center' },
          gap: 4
        }}>
          <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
            <SmallText sx={{ color: 'inherit', opacity: 0.6 }}>
              {`© ${currentYear} AI4U. todos los derechos reservados.`}
            </SmallText>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <MuiTypography
                sx={{
                  color: 'inherit',
                  opacity: 0.5,
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  ...TEXT_VARIANTS.ui.code
                }}
              >
                REV_2.1 // {new Date().getTime().toString(2).slice(-16)}
              </MuiTypography>
              <MuiTypography
                sx={{
                  color: 'inherit',
                  opacity: 0.5,
                  fontSize: '0.75rem',
                  letterSpacing: '0.05em',
                  fontWeight: 400,
                  ...TEXT_VARIANTS.ui.code
                }}
              >
                architectureBy <Box component="span" sx={{ fontWeight: 400 }}>mariano | 마리아노</Box>
              </MuiTypography>
            </Box>
          </Stack>

          <Stack direction="row" spacing={2}>
            {socialLinks.map((social, index) => (
              <IconButton
                key={index}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                sx={{
                  color: 'inherit',
                  opacity: 0.6,
                  '&:hover': {
                    opacity: 1,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
