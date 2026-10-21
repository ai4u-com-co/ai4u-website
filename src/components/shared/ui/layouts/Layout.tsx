import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { GoogleTranslateProvider } from '../atoms';
import { Navbar } from '../organisms';
import { Footer, WhatsAppFloat } from '../organisms';
import AccesibilidadPanel from '../organisms/AccesibilidadPanel';
import LecturaFacil from '../organisms/LecturaFacil';
import { usePrefs } from '../../../../utils/accesibilidad';
import { lecturaFacilDe } from '../../../../data/lecturaFacil';
import { useLocation } from 'react-router-dom';
import '../../../../styles/accesibilidad.css';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  // «Explícamelo fácil»: si está activo y la página tiene versión en lectura fácil, se muestra esa en vez del contenido normal.
  const prefs = usePrefs();
  const { pathname } = useLocation();
  const facil = prefs.facil && Boolean(lecturaFacilDe(pathname));
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <a className="a4 a4-skip" href="#contenido">Saltar al contenido</a>
      <GoogleTranslateProvider />
      <Navbar />
      <Box 
        component="main"
        id="contenido"
        tabIndex={-1}
        sx={{ 
          flexGrow: 1,
          width: '100%', 
          maxWidth: '100%' 
        }}
      >
        {facil ? <LecturaFacil /> : children}
      </Box>
      <Footer />
      <aside aria-label="Contacto rápido"><WhatsAppFloat /></aside>
      <AccesibilidadPanel />
    </Box>
  );
};

export default Layout; 