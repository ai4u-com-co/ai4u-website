import React, { createContext, useContext, useMemo, useState, useCallback, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, PaletteMode, Theme, Components, Shadows } from '@mui/material/styles';
import { TypographyVariantsOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Import consolidated color system from single source of truth
import { AI4U_PALETTE } from '../components/shared/ui/tokens/palette';
import { SHADOW_TOKENS } from '../components/shared/ui/tokens/theme';
import { TYPOGRAPHY_TOKENS } from '../components/shared/ui/tokens/typography';

// Fuentes para código
const CODE_FONT_FAMILY = TYPOGRAPHY_TOKENS.fontFamily.code;

// Configuración de tipografía
const typography: TypographyVariantsOptions = {
	fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
	h1: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.medium,
		fontSize: TYPOGRAPHY_TOKENS.fontSize['2xl'],
	},
	h2: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.medium,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.xl,
	},
	h3: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.medium,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.lg,
	},
	h4: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.medium,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.base,
	},
	h5: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.sm,
	},
	h6: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.xs,
	},
	body1: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.sm,
	},
	body2: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.xs,
	},
	button: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		textTransform: 'none' as const,
	},
	caption: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.xs,
	},
	overline: {
		fontFamily: TYPOGRAPHY_TOKENS.fontFamily.primary,
		fontWeight: TYPOGRAPHY_TOKENS.fontWeight.regular,
		fontSize: TYPOGRAPHY_TOKENS.fontSize.xs,
		textTransform: 'none',
		letterSpacing: '0.08em',
	},
};

// Configuración de componentes simplificada
const getComponentsOverrides = (mode: PaletteMode): Components<Theme> => {
	const isLight = mode === 'light';
	
	return {
		MuiButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					borderRadius: '9999px',
					fontWeight: 400,
					textTransform: 'none',
					boxShadow: 'none',
					padding: theme.spacing(1.25, 2.5),
					transition: 'all 0.2s ease-in-out',
					border: 'none',
				}),
				containedPrimary: {
					backgroundColor: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					color: isLight ? AI4U_PALETTE.white : AI4U_PALETTE.black,
					border: 'none',
					'&:hover': {
						backgroundColor: isLight ? AI4U_PALETTE.gray[800] : AI4U_PALETTE.gray[100],
						boxShadow: SHADOW_TOKENS.md,
					},
				},
				containedSecondary: {
					backgroundColor: isLight ? AI4U_PALETTE.gray[100] : AI4U_PALETTE.gray[800],
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					border: 'none',
					'&:hover': {
						backgroundColor: isLight ? AI4U_PALETTE.gray[200] : AI4U_PALETTE.gray[700],
					},
				},
				outlined: {
					borderWidth: '1px',
					borderColor: isLight ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.12)',
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					'&:hover': {
						backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.04)',
						borderColor: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
						borderWidth: '1px',
					},
				},
				text: {
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					fontWeight: 400,
					textDecoration: 'none',
					'&:hover': {
						backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.08)',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12, // Bordes redondeados para cards
					backgroundColor: isLight ? AI4U_PALETTE.accentColors.mint : AI4U_PALETTE.gray[900],
					border: 'none',
					boxShadow: SHADOW_TOKENS.ai4u.card,
					'&:hover': {
						boxShadow: SHADOW_TOKENS.lg,
					},
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					transition: 'all 0.2s ease-in-out',
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					'&:hover': {
						backgroundColor: isLight 
							? 'rgba(0, 0, 0, 0.04)' 
							: 'rgba(255, 255, 255, 0.08)',
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)',
					borderBottomWidth: '1px',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundColor: isLight ? AI4U_PALETTE.accentColors.mint : AI4U_PALETTE.gray[900],
					backgroundImage: 'none',
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundColor: isLight ? AI4U_PALETTE.accentColors.mint : AI4U_PALETTE.black,
					boxShadow: 'none',
					borderBottom: 'none',
				},
			},
		},
		MuiChip: {
			styleOverrides: {
				root: {
					borderRadius: '9999px',
					backgroundColor: isLight ? AI4U_PALETTE.gray[100] : AI4U_PALETTE.gray[800],
					border: 'none',
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					fontWeight: 400,
				},
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					color: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
					'& code': {
						fontFamily: CODE_FONT_FAMILY,
						backgroundColor: isLight ? 'rgba(0,0,0,0.04)' : 'rgba(255,255,255,0.1)',
						padding: '2px 4px',
						borderRadius: 4,
					},
				},
			},
		},
	};
};

// Configuración de paleta minimalista
const getPalette = (mode: PaletteMode) => {
	const isLight = mode === 'light';
	
	return {
		mode,
		primary: {
			// Color primario minimalista: negro en modo claro, blanco en modo oscuro
			main: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
			light: isLight ? AI4U_PALETTE.gray[800] : AI4U_PALETTE.gray[200],
			dark: isLight ? AI4U_PALETTE.gray[900] : AI4U_PALETTE.gray[100],
			contrastText: isLight ? AI4U_PALETTE.white : AI4U_PALETTE.black,
		},
		secondary: {
			main: AI4U_PALETTE.gray[600],
			light: AI4U_PALETTE.gray[400],
			dark: AI4U_PALETTE.gray[800],
			contrastText: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
		},
		background: {
			default: isLight ? AI4U_PALETTE.accentColors.mint : AI4U_PALETTE.black,
			paper: isLight ? AI4U_PALETTE.accentColors.mint : AI4U_PALETTE.gray[900],
		},
		text: {
			primary: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
			secondary: isLight ? AI4U_PALETTE.gray[600] : AI4U_PALETTE.gray[300],
			disabled: AI4U_PALETTE.gray[400],
		},
		action: {
			active: isLight ? AI4U_PALETTE.black : AI4U_PALETTE.white,
			hover: isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
			selected: isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.16)',
			disabled: AI4U_PALETTE.gray[400],
			disabledBackground: isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)',
		},
		error: { main: AI4U_PALETTE.error },
		success: { main: AI4U_PALETTE.success },
		warning: { main: AI4U_PALETTE.warning },
		info: { main: AI4U_PALETTE.info },
		divider: isLight ? AI4U_PALETTE.gray[200] : AI4U_PALETTE.gray[800],
	};
};

// Sombras personalizadas
const getCustomShadows = (): Shadows => {
	const customShadows: Shadows = [
		'none',
		'0px 2px 4px rgba(0,0,0,0.05)',
		'0px 4px 8px rgba(0,0,0,0.05)',
		'0px 6px 12px rgba(0,0,0,0.08)',
		'0px 8px 16px rgba(0,0,0,0.08)',
		'0px 10px 20px rgba(0,0,0,0.1)',
		'0px 12px 24px rgba(0,0,0,0.1)',
		'0px 14px 28px rgba(0,0,0,0.12)',
		'0px 16px 32px rgba(0,0,0,0.12)',
		'0px 18px 36px rgba(0,0,0,0.14)',
		'0px 20px 40px rgba(0,0,0,0.14)',
		'0px 22px 44px rgba(0,0,0,0.16)',
		'0px 24px 48px rgba(0,0,0,0.16)',
		'0px 26px 52px rgba(0,0,0,0.18)',
		'0px 28px 56px rgba(0,0,0,0.18)',
		'0px 30px 60px rgba(0,0,0,0.2)',
		'0px 32px 64px rgba(0,0,0,0.2)',
		'0px 34px 68px rgba(0,0,0,0.22)',
		'0px 36px 72px rgba(0,0,0,0.22)',
		'0px 38px 76px rgba(0,0,0,0.24)',
		'0px 40px 80px rgba(0,0,0,0.24)',
		'0px 42px 84px rgba(0,0,0,0.25)',
		'0px 44px 88px rgba(0,0,0,0.25)',
		'0px 46px 92px rgba(0,0,0,0.26)',
		'0px 48px 96px rgba(0,0,0,0.26)',
	] as Shadows;
	
	return customShadows;
};

// Crear el tema de AI4U
const createAI4UTheme = (mode: PaletteMode): Theme => {
	return createTheme({
		palette: getPalette(mode),
		typography,
		components: getComponentsOverrides(mode),
		shape: {
			borderRadius: 8, // Bordes redondeados para un look moderno y limpio
		},
		shadows: getCustomShadows(),
	});
};

// Interface para el contexto
interface ThemeContextType {
	mode: PaletteMode;
	toggleColorMode: () => void;
}

// Crear contexto
export const ColorModeContext = createContext<ThemeContextType>({
	mode: 'light',
	toggleColorMode: () => {},
});

// Hook personalizado para usar el modo de color
export const useColorMode = () => useContext(ColorModeContext);

// Proveedor del tema con toggle
export const ThemeProvider: React.FC<{children?: ReactNode}> = ({ children }) => {
	const [mode, setMode] = useState<PaletteMode>(() => {
		// Sitio v2: solo claro. Se ignora un 'dark' guardado por la versión anterior.
		return 'light';
	});

	const toggleColorMode = useCallback(() => {
		setMode(prev => {
			const next = prev === 'light' ? 'dark' : 'light';
			localStorage.setItem('ai4u-theme-mode', next);
			document.documentElement.setAttribute('data-theme', next);
			return next;
		});
	}, []);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', mode);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const colorMode = useMemo(() => ({ mode, toggleColorMode }), [mode, toggleColorMode]);
	const theme = useMemo(() => createAI4UTheme(mode), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<MuiThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</MuiThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default ThemeProvider; 