// Sistema de colores AI4U - Brand Manual
// Paleta principal: Erie black, mint cream, orange, moderate blue
export const AI4U_PALETTE = {
  // Colores base - Absolute Industrial
  white: '#FFFFFF',
  black: '#000000',  // Pure Black
  cream: '#F4EFE8',  // crema cálido — variante tibia del blanco, tono "referentes"
  gray: {
    50: '#F9F9F9',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#171717',
    900: '#0A0A0A',
  },
  
  // Colores de marca AI4U - Industrial "Abloh" Accents
  accentColors: {
    orange: '#FF5C00',      // Safety Orange (More vibrant/neon)
    mint: '#E0FF00',        // "VOLT" / Safety Green (replacing soft mint)
    blue: '#0047FF',        // Electric Blue
    cadetGray: '#808080',   // Neutral Industrial Gray
  },

  // Compatibilidad hacia atrás
  accent: '#FF5C00' as const,
  
  // Estados funcionales - Industrialized
  success: '#00FF47',       // Neon Success
  error: '#FF0000',         // Pure Error
  warning: '#FFFB00',       // Warning Yellow
  info: '#0047FF',
} as const;

// Sistema de contraste simplificado - Radical Inversion
export const CONTRAST_PAIRS = {
  // Modo claro - White de fondo, Black de texto (Gallery Style)
  light: {
    background: AI4U_PALETTE.white,
    surface: AI4U_PALETTE.white,
    text: {
      primary: AI4U_PALETTE.black,
      secondary: AI4U_PALETTE.gray[600],
      disabled: AI4U_PALETTE.gray[400],
    },
    border: AI4U_PALETTE.black,
    divider: 'rgba(0, 0, 0, 0.1)',
  },
  
  // Modo oscuro - Black de fondo, White de texto (Industrial Style)
  dark: {
    background: AI4U_PALETTE.black,
    surface: AI4U_PALETTE.black,
    text: {
      primary: AI4U_PALETTE.white,
      secondary: AI4U_PALETTE.gray[400],
      disabled: AI4U_PALETTE.gray[600],
    },
    border: AI4U_PALETTE.white,
    divider: 'rgba(255, 255, 255, 0.2)',
  },
} as const;

// Presets de superficie para bloques de marca con colores fijos - Radical Industrial
export const SURFACE_PRESETS = {
  black: {
    background: AI4U_PALETTE.black,
    surface: AI4U_PALETTE.black,
    text: {
      primary: AI4U_PALETTE.white,
      secondary: AI4U_PALETTE.gray[400],
      disabled: AI4U_PALETTE.gray[600],
    },
    border: AI4U_PALETTE.white,
    divider: 'rgba(255, 255, 255, 0.1)',
    effectiveMode: 'dark' as const,
  },
  white: {
    background: AI4U_PALETTE.white,
    surface: AI4U_PALETTE.white,
    text: {
      primary: AI4U_PALETTE.black,
      secondary: AI4U_PALETTE.gray[600],
      disabled: AI4U_PALETTE.gray[400],
    },
    border: AI4U_PALETTE.black,
    divider: 'rgba(0,0,0,0.1)',
    effectiveMode: 'light' as const,
  },
  volt: {
    background: AI4U_PALETTE.accentColors.mint,
    surface: AI4U_PALETTE.accentColors.mint,
    text: {
      primary: AI4U_PALETTE.black,
      secondary: AI4U_PALETTE.gray[800],
      disabled: AI4U_PALETTE.gray[600],
    },
    border: AI4U_PALETTE.black,
    divider: 'rgba(0,0,0,0.1)',
    effectiveMode: 'light' as const,
  },
  orange: {
    background: AI4U_PALETTE.accentColors.orange,
    surface: AI4U_PALETTE.accentColors.orange,
    text: {
      primary: AI4U_PALETTE.black,
      secondary: AI4U_PALETTE.gray[800],
      disabled: AI4U_PALETTE.gray[600],
    },
    border: AI4U_PALETTE.black,
    divider: 'rgba(0,0,0,0.1)',
    effectiveMode: 'light' as const,
  },
  blue: {
    background: AI4U_PALETTE.accentColors.blue,
    surface: AI4U_PALETTE.accentColors.blue,
    text: {
      primary: AI4U_PALETTE.white,
      secondary: 'rgba(255,255,255,0.7)',
      disabled: 'rgba(255,255,255,0.4)',
    },
    border: AI4U_PALETTE.white,
    divider: 'rgba(255,255,255,0.2)',
    effectiveMode: 'dark' as const,
  },
  cream: {
    background: AI4U_PALETTE.cream,
    surface: AI4U_PALETTE.cream,
    text: {
      primary: AI4U_PALETTE.black,
      secondary: AI4U_PALETTE.gray[600],
      disabled: AI4U_PALETTE.gray[400],
    },
    border: AI4U_PALETTE.black,
    divider: 'rgba(0,0,0,0.1)',
    effectiveMode: 'light' as const,
  },
} as const;

export type SurfaceType = 'theme' | keyof typeof SURFACE_PRESETS;

// Variantes de componentes simplificadas - Minimalista (sin naranja como primario)
export const COMPONENT_VARIANTS = {
  // Botones modernos - Sin bordes marcados
  button: {
    primary: {
      background: AI4U_PALETTE.black,
      text: AI4U_PALETTE.white,
      hover: AI4U_PALETTE.gray[900],
    },
    secondary: {
      background: AI4U_PALETTE.gray[100],
      text: AI4U_PALETTE.black,
      hover: AI4U_PALETTE.gray[200],
    },
    outline: {
      background: 'transparent',
      text: AI4U_PALETTE.black,
      border: AI4U_PALETTE.gray[300],
      hover: 'rgba(0,0,0,0.04)',
    },
    minimal: {
      background: 'transparent',
      text: AI4U_PALETTE.black,
      border: 'none',
      hover: AI4U_PALETTE.gray[100],
    },
  },
  
  // Cards modernas
  card: {
    light: {
      background: AI4U_PALETTE.white,
      text: AI4U_PALETTE.black,
      border: 'none',
    },
    dark: {
      background: AI4U_PALETTE.gray[900],
      text: AI4U_PALETTE.white,
      border: 'none',
    },
  },
} as const;

// Hook para obtener colores con contraste automático
export const useContrastColors = (mode: 'light' | 'dark') => {
  return CONTRAST_PAIRS[mode];
};

// Hook para obtener variantes de componentes
export const useComponentColors = (mode: 'light' | 'dark') => {
  const contrast = useContrastColors(mode);
  
  return {
    ...contrast,
    components: {
      button: {
        ...COMPONENT_VARIANTS.button,
        // Ajustar botones secundarios según el modo
        secondary: mode === 'light' 
          ? COMPONENT_VARIANTS.button.secondary
          : {
              background: AI4U_PALETTE.gray[800],
              text: AI4U_PALETTE.white,
              hover: AI4U_PALETTE.gray[700],
            },
      },
      card: {
        ...COMPONENT_VARIANTS.card,
        default: mode === 'light' 
          ? COMPONENT_VARIANTS.card.light
          : COMPONENT_VARIANTS.card.dark,
      },
    },
  };
};

export type PaletteColor = keyof typeof AI4U_PALETTE;
export type ContrastMode = keyof typeof CONTRAST_PAIRS;