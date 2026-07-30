import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { SEOHead, BodyText, H2, RegistrationMarks } from '../components/shared/ui/atoms';
import { useColors } from '../hooks';
import { SurfaceProvider } from '../context';

const DataDeletionBody = () => {
  const colors = useColors();

  return (
    <Box sx={{ bgcolor: colors.contrast.background, color: colors.contrast.text.primary, minHeight: '100vh', py: 10, position: 'relative' }}>
      <RegistrationMarks corners={['tl', 'br']} />
      <SEOHead
        title="Eliminación de Datos | Ads Manager"
        description="Instrucciones sobre cómo solicitar la eliminación de tus datos en nuestra aplicación de Facebook Ads."
      />
      <Container maxWidth="md">
        <H2 sx={{ mb: 4, textAlign: 'left', fontWeight: 300 }}>Instrucciones de Eliminación de Datos</H2>
        
        <Box sx={{ mb: 6 }}>
          <BodyText sx={{ mb: 4 }}>
            De acuerdo con las políticas de Facebook, proporcionamos a continuación las instrucciones para que cualquier usuario pueda solicitar la eliminación de sus datos personales recolectados por nuestra aplicación ("Ads Manager").
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>1. A través de la configuración de Facebook</Typography>
          <BodyText sx={{ mb: 3 }}>
            Puedes eliminar el acceso de nuestra aplicación y tus datos asociados directamente desde tu perfil de Facebook:
            <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>Ve a la configuración de tu cuenta de Facebook.</li>
              <li>Busca la sección "Apps y sitios web".</li>
              <li>Busca "Ads Manager" en la lista.</li>
              <li>Haz clic en "Eliminar" y confirma que deseas borrar toda la actividad asociada.</li>
            </ol>
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>2. Solicitud Directa</Typography>
          <BodyText sx={{ mb: 3 }}>
            Si prefieres que eliminemos manualmente cualquier información que hayamos podido almacenar (como reportes generados o configuraciones de anuncios), por favor contáctanos enviando un correo electrónico a soporte con el asunto "Solicitud de Eliminación de Datos".
          </BodyText>

          <Typography variant="h6" sx={{ mb: 2, fontWeight: 400 }}>3. Qué información se elimina</Typography>
          <BodyText sx={{ mb: 3 }}>
            Al procesar una solicitud de eliminación, borraremos permanentemente de nuestros servidores cualquier dato personal, tokens de acceso y configuraciones personalizadas asociadas a tu cuenta de Facebook.
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

const DataDeletion = () => (
  <SurfaceProvider surface="cream">
    <DataDeletionBody />
  </SurfaceProvider>
);

export default DataDeletion;
