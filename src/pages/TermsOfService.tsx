import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SEOHead, BodyText, H2, RegistrationMarks } from '../components/shared/ui/atoms';
import { useColors } from '../hooks';
import { SurfaceProvider } from '../context';

const TermsOfServiceBody = () => {
  const colors = useColors();

  return (
    <Box sx={{ bgcolor: colors.contrast.background, color: colors.contrast.text.primary, minHeight: '100vh', py: 10, position: 'relative' }}>
      <RegistrationMarks corners={['tl', 'br']} />
      <SEOHead
        title="Condiciones de Servicio | Ads Manager"
        description="Términos y condiciones legales para el uso de nuestra aplicación de Facebook Ads."
      />
      <Container maxWidth="md">
        <H2 sx={{ mb: 4, textAlign: 'left', fontWeight: 300 }}>Condiciones de Servicio</H2>
        
        <Box sx={{ mb: 6 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>1. Aceptación de los Términos</Typography>
          <BodyText sx={{ mb: 3 }}>
            Al utilizar esta aplicación ("Ads Manager"), aceptas cumplir con estos términos de servicio y todas las leyes y regulaciones aplicables relacionados con el uso de las APIs de Facebook.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>2. Licencia de Uso</Typography>
          <BodyText sx={{ mb: 3 }}>
            Se otorga permiso para acceder y utilizar las herramientas de gestión de anuncios para uso personal o comercial legítimo. No está permitido el uso de la aplicación para actividades fraudulentas o que violen las políticas de publicidad de Meta.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>3. Responsabilidad</Typography>
          <BodyText sx={{ mb: 3 }}>
            La aplicación se proporciona "tal cual". No nos hacemos responsables por decisiones comerciales tomadas basadas en los datos proporcionados por la herramienta, ni por interrupciones en el servicio causadas por cambios en las APIs de terceros.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>4. Limitaciones</Typography>
          <BodyText sx={{ mb: 3 }}>
            En ningún caso seremos responsables de cualquier daño (incluyendo, sin limitación, daños por pérdida de datos o beneficios) que surja del uso o la imposibilidad de usar la aplicación.
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>5. Modificaciones</Typography>
          <BodyText sx={{ mb: 3 }}>
            Podemos revisar estos términos de servicio en cualquier momento sin previo aviso. Al usar esta aplicación, aceptas estar sujeto a la versión actual de estos términos.
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

const TermsOfService = () => (
  <SurfaceProvider surface="cream">
    <TermsOfServiceBody />
  </SurfaceProvider>
);

export default TermsOfService;
