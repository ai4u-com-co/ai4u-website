import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { SEOHead, BodyText, H2, RegistrationMarks } from '../components/shared/ui/atoms';
import { useColors } from '../hooks';
import { SurfaceProvider } from '../context';

const PrivacyPolicyBody = () => {
  const colors = useColors();

  return (
    <Box sx={{ bgcolor: colors.contrast.background, color: colors.contrast.text.primary, minHeight: '100vh', py: 10, position: 'relative' }}>
      <RegistrationMarks corners={['tl', 'br']} />
      <SEOHead
        title="Política de Privacidad | Ads Manager"
        description="Información sobre cómo manejamos tus datos en nuestra aplicación de Facebook Ads."
      />
      <Container maxWidth="md">
        <H2 sx={{ mb: 4, textAlign: 'left', fontWeight: 300 }}>Política de Privacidad</H2>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>1. Información que Recolectamos</Typography>
          <BodyText sx={{ mb: 3 }}>
            Nuestra aplicación de búsqueda y gestión de anuncios (Ads Manager) accede a información pública y autorizada a través de las APIs de Facebook. Esto incluye datos básicos del perfil, estadísticas de anuncios y métricas de rendimiento que el usuario decide compartir explícitamente al autenticarse.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>2. Uso de la Información</Typography>
          <BodyText sx={{ mb: 3 }}>
            La información recolectada se utiliza únicamente para proveer las funcionalidades de la aplicación, como la visualización de métricas, optimización de campañas y generación de reportes personalizados para el usuario. No vendemos ni compartimos estos datos con terceros externos.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>3. Almacenamiento y Seguridad</Typography>
          <BodyText sx={{ mb: 3 }}>
            Implementamos medidas de seguridad técnicas y organizativas para proteger los datos contra accesos no autorizados, pérdida o alteración. Los tokens de acceso de Facebook se almacenan de forma cifrada y segura.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>4. Tus Derechos</Typography>
          <BodyText sx={{ mb: 3 }}>
            Puedes revocar el acceso de nuestra aplicación a tus datos en cualquier momento a través de la configuración de aplicaciones en tu perfil de Facebook o contactándonos directamente.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>5. Contacto</Typography>
          <BodyText sx={{ mb: 3 }}>
            Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de los canales oficiales habilitados en la plataforma.
          </BodyText>
        </Box>
        
        <Box sx={{ mt: 8, pt: 4, borderTop: `1px solid ${colors.contrast.divider}` }}>
          <BodyText sx={{ fontSize: '0.8rem', opacity: 0.6 }}>
            Última actualización: 26 de marzo, 2026
          </BodyText>
        </Box>
      </Container>
    </Box>
  );
};

const PrivacyPolicy = () => (
  <SurfaceProvider surface="cream">
    <PrivacyPolicyBody />
  </SurfaceProvider>
);

export default PrivacyPolicy;
