import React from 'react';
import { Box, Toolbar } from '@mui/material';
import { GoogleTranslateProvider } from '../atoms';
import { Navbar } from '../organisms';
import { Footer, WhatsAppFloat } from '../organisms';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <GoogleTranslateProvider />
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
          width: '100%', 
          maxWidth: '100%' 
        }}
      >
        {children}
      </Box>
      <Footer />
      <WhatsAppFloat />
    </Box>
  );
};

export default Layout; 