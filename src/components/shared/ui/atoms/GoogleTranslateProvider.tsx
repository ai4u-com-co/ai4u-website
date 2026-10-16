import React, { useEffect } from 'react';
import { Box } from '@mui/material';

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const TOP_LANGUAGES = 'es,en,zh-CN,hi,ar,pt,ru,ja,de,fr';

const HIDE_GOOGLE_STYLES = `
  .goog-te-banner-frame {
    display: none !important;
  }
  body {
    top: 0 !important;
  }
  #google_translate_element {
    display: none !important;
  }
  .goog-te-gadget {
    display: none !important;
  }
  .skiptranslate {
    display: none !important;
  }
  .goog-te-menu-frame {
    display: none !important;
  }
`;

/**
 * Proveedor único del contenedor y script de Google Translate.
 * Debe montarse una sola vez en la app (p. ej. en Layout).
 */
const GoogleTranslateProvider: React.FC = () => {
  useEffect(() => {
    if (document.getElementById('google-translate-script')) return;

    // El selector de idioma solo guarda la cookie `googtrans` y recarga la página. Sin esa cookie (a un idioma
    // distinto del español) no hay nada que traducir, así que no se descarga el script de Google (~300 KB que
    // además bloqueaban el primer pintado y lanzaban un error en consola).
    const wantsTranslation = /(?:^|;\s*)googtrans=\/[^/;]+\/(?!es(?:;|$))[^;]+/.test(document.cookie);
    if (!wantsTranslation) return;

    window.googleTranslateElementInit = () => {
      try {
        if (
          window.google?.translate &&
          document.getElementById('google_translate_element')
        ) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: 'es',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
              includedLanguages: TOP_LANGUAGES,
              multilanguagePage: false,
            },
            'google_translate_element'
          );
          setTimeout(() => {
            const el = document.getElementById('google_translate_element');
            if (el) el.style.display = 'none';
          }, 100);
        }
      } catch (error) {
        console.error('Error inicializando Google Translate:', error);
      }
    };

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.src =
      'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <Box
        id="google_translate_element"
        sx={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          width: 0,
          height: 0,
          overflow: 'hidden',
          zIndex: -1,
        }}
      />
      <style>{HIDE_GOOGLE_STYLES}</style>
    </>
  );
};

export default GoogleTranslateProvider;
