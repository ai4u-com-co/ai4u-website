import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Grid, 
  Stack, 
  Typography, 
  TextField, 
} from '@mui/material';
import { 
  ContentCopy as CopyIcon,
  Check as CheckIcon,
  FormatSize as FontSizeIcon,
  Palette as PaletteIcon,
  Extension as ExtensionIcon,
  Info as InfoIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { 
  Giant, H1, H2, H3, H4, H5, H6, 
  BodyText, SmallText, CodeText, 
  Button, GeometricIcon, SEOHead,
  Logo,
  NavigationDot,
  ServiceThumbnail,
  GiantNumber,
  BinaryOverlay,
  RegistrationMarks,
  MoireText,
  HalftoneSwatch
} from '../components/shared/ui/atoms';
import { Card, MetricCard, BudgetCard, Breadcrumb } from '../components/shared/ui/molecules';
import { HeroSection } from '../components/shared/ui/organisms';
import { useColors } from '../hooks';
import { AI4U_PALETTE, SURFACE_PRESETS } from '../components/shared/ui/tokens/palette';
import { BRAND_ORANGE } from '../components/shared/ui/tokens/brandAccent';
import { SPACING_TOKENS } from '../components/shared/ui/tokens/spacing';
import { TEXT_VARIANTS } from '../components/shared/ui/tokens/typography';

const DesignSystem = () => {
  const colors = useColors();
  const isLight = colors.effectiveMode === 'light';
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [previewText, setPreviewText] = useState('Construimos tu infraestructura de IA.');

  const handleCopy = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const sections = [
    { id: 'manifiesto', label: 'Manifiesto', icon: <CodeText># </CodeText> },
    { id: 'principios', label: 'Principios', icon: <InfoIcon fontSize="small" /> },
    { id: 'identidad', label: 'Identidad', icon: <PaletteIcon fontSize="small" /> },
    { id: 'tipografia', label: 'Tipografía', icon: <FontSizeIcon fontSize="small" /> },
    { id: 'atomos', label: 'Átomos', icon: <ExtensionIcon fontSize="small" /> },
    { id: 'referentes', label: 'Referentes', icon: <CodeText>+ </CodeText> },
    { id: 'moleculas', label: 'Moléculas', icon: <MenuIcon fontSize="small" /> },
    { id: 'organismos', label: 'Organismos', icon: <MenuIcon fontSize="small" /> },
    { id: 'numeros', label: 'Números Gigantes', icon: <ExtensionIcon fontSize="small" /> },
    { id: 'tokens', label: 'Tokens', icon: <CodeText># </CodeText> },
  ];

  const colorGroups = [
    {
      title: 'Industrial Core',
      colors: [
        { name: 'Pure Black', value: AI4U_PALETTE.black, description: '#000000 - Absolute contrast.' },
        { name: 'Pure White', value: AI4U_PALETTE.white, description: '#FFFFFF - Gallery background.' },
        { name: 'Volt Green', value: AI4U_PALETTE.accentColors.mint, description: 'Safety Green / Neon.' },
        { name: 'Safety Orange', value: BRAND_ORANGE, description: 'Caution / Action.' },
        { name: 'Cream', value: AI4U_PALETTE.cream, description: 'Warm alternative to white — referentes tone.' },
      ]
    },
    {
      title: 'System Status',
      colors: [
        { name: 'Neon Success', value: AI4U_PALETTE.success, description: 'Functional Success.' },
        { name: 'Pure Error', value: AI4U_PALETTE.error, description: 'Critical Alert.' },
        { name: 'Warning Yellow', value: AI4U_PALETTE.warning, description: 'System Warning.' },
        { name: 'Electric Blue', value: AI4U_PALETTE.accentColors.blue, description: 'Data / Info.' },
      ]
    }
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: colors.helpers.background.primary, color: colors.helpers.text.primary }}>
      <SEOHead
        title="DESIGN_SYSTEM | AI4U"
        description="Industrial Design Manual for AI4U Infrastructure. Inspired by Virgil Abloh."
      />

      {/* ─── Sidebar: Industrial Catalog Index ─── */}
      <Box
        component="nav"
        sx={{
          width: { xs: 0, lg: 280 },
          flexShrink: 0,
          borderRight: `2px solid ${colors.helpers.text.primary}`,
          display: { xs: 'none', lg: 'block' },
          position: 'sticky',
          top: 0,
          height: '100vh',
          bgcolor: colors.helpers.background.primary,
          zIndex: 10,
        }}
      >
        <Stack spacing={0} sx={{ height: '100%' }}>
          <Box sx={{ p: 4, borderBottom: `2px solid ${colors.helpers.text.primary}` }}>
            <Logo variant="desktop" />
            <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mt: 1 }}>
              Manual Rev 2.1
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1, py: 2 }}>
            {sections.map((section, idx) => (
              <Box
                key={section.id}
                component="a"
                href={`#${section.id}`}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 4,
                  py: 2,
                  textDecoration: 'none',
                  color: 'inherit',
                  borderBottom: `1px solid ${colors.helpers.border.secondary}`,
                  transition: 'all 0.1s steps(2)',
                  '&:hover': {
                    bgcolor: colors.helpers.text.primary,
                    color: colors.helpers.background.primary,
                  },
                }}
              >
                <Typography sx={{ ...TEXT_VARIANTS.label.main }}>
                  {String(idx + 1).padStart(2, '0')} {section.label}
                </Typography>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, opacity: 0.5 }}>
                  [No All Caps]
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 4, borderTop: `2px solid ${colors.helpers.text.primary}` }}>
            <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>
              © 2026 Ai4u Corp
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ─── Main: Industrial Manual ─── */}
      <Box component="main" sx={{ flexGrow: 1, overflowX: 'hidden' }}>
        
        {/* Hero: "COVERM_PAGE" */}
        <Box sx={{ 
          py: 15, 
          bgcolor: AI4U_PALETTE.black, 
          color: AI4U_PALETTE.white,
          borderBottom: `8px solid ${AI4U_PALETTE.accentColors.mint}`,
          position: 'relative'
        }}>
          <Container maxWidth="lg">
            <Stack spacing={4}>
              <Typography sx={{ ...TEXT_VARIANTS.label.main, color: AI4U_PALETTE.accentColors.mint }}>
                "Design system foundations"
              </Typography>
              <Giant sx={{ color: AI4U_PALETTE.white }}>Manual de identidad.</Giant>
              <Box sx={{ maxWidth: 600, borderLeft: `4px solid ${AI4U_PALETTE.white}`, pl: 4 }}>
                <BodyText sx={{ color: colors.palette.gray[400], letterSpacing: '0.05em' }}>
                  Estética industrial. Minimalismo radical. Deconstrucción.
                  Inspirado en el trabajo de Virgil Abloh.
                </BodyText>
              </Box>
            </Stack>
          </Container>
          {/* Binary Overlay Pattern */}
          <BinaryOverlay lines={50} opacity={0.05} />
          {/* Industrial Metadata */}
          <Box sx={{ position: 'absolute', bottom: 20, right: 40, textAlign: 'right', opacity: 0.3 }}>
            <CodeText sx={{ fontSize: '0.7rem' }}>COORD: 40.7128° N, 74.0060° W</CodeText>
            <CodeText sx={{ fontSize: '0.7rem' }}>TS: {new Date().getTime()}</CodeText>
          </Box>
        </Box>

        <Box id="manifiesto" sx={{ py: 15, borderBottom: `2px solid ${colors.helpers.text.primary}` }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 00: Manifesto"</Typography>
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                  <Typography sx={{ ...TEXT_VARIANTS.display.medium, fontSize: '2.5rem' }}>camelCase por excelencia.</Typography>
                  <BodyText>
                    En AI4U, la coherencia técnica se traduce en armonía visual. 
                    Todas nuestras etiquetas de UI y metadatos deben seguir la convención 
                    <CodeText>camelCase</CodeText>, eliminando el uso de mayúsculas sostenidas 
                    para una legibilidad humana y de sistema óptima.
                  </BodyText>
                  <Box sx={{ p: 4, border: `1px dashed ${colors.helpers.text.primary}` }}>
                    <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mb: 2 }}>[Correct Usage]</Typography>
                    <Stack direction="row" spacing={2}>
                      <Typography sx={{ ...TEXT_VARIANTS.label.main }}>primaryAction</Typography>
                      <Typography sx={{ ...TEXT_VARIANTS.label.main }}>userProfile</Typography>
                      <Typography sx={{ ...TEXT_VARIANTS.label.main }}>systemStatus</Typography>
                    </Stack>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack spacing={4}>
                  <Typography sx={{ ...TEXT_VARIANTS.display.medium, fontSize: '2.5rem' }}>Software as a resource.</Typography>
                  <BodyText>
                    No ocultamos nuestra naturaleza. Los recursos de software como el código binario, 
                    los metadatos expuestos y las fuentes monoespaciadas son pilares de nuestra estética.
                  </BodyText>
                  <Box sx={{ height: 120, bgcolor: colors.palette.gray[900], p: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <CodeText sx={{ color: AI4U_PALETTE.accentColors.mint, fontSize: '0.8rem', opacity: 0.5 }}>
                      1010101010101010101010101010101010101010101010101010101010101010
                      1010101010101010101010101010101010101010101010101010101010101010
                    </CodeText>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box id="principios" sx={{ py: 15, borderBottom: `2px solid ${colors.helpers.text.primary}` }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 01: Principles"</Typography>
            <Grid container spacing={0} sx={{ borderTop: `1px solid ${colors.helpers.text.primary}`, borderLeft: `1px solid ${colors.helpers.text.primary}` }}>
              {[
                { title: 'Énfasis', desc: 'Prioridad visual absoluta.' },
                { title: 'Contraste', desc: 'Radicalismo monocromático.' },
                { title: 'Industrial', desc: 'Funcionalismo expuesto.' },
                { title: 'Aire', desc: 'Espacio como herramienta.' },
                { title: 'No All Caps', desc: 'Prohibido el uso de mayúsculas sostenidas.' },
                { title: 'Deconstruido', desc: 'Etiquetado sistémico.' },
              ].map((p, i) => (
                <Grid item xs={12} sm={6} md={4} key={p.title} sx={{ borderRight: `1px solid ${colors.helpers.text.primary}`, borderBottom: `1px solid ${colors.helpers.text.primary}`, p: 4 }}>
                  <Stack spacing={2}>
                    <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>[REF_0{i + 1}]</Typography>
                    <Typography sx={{ ...TEXT_VARIANTS.display.medium, fontSize: '2rem' }}>{p.title}</Typography>
                    <Typography sx={{ ...TEXT_VARIANTS.label.secondary, opacity: 0.7 }}>{p.desc}</Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box id="identidad" sx={{ py: 15, bgcolor: colors.helpers.background.secondary }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 02: Identity"</Typography>
            
            <Grid container spacing={4}>
              {colorGroups.map((group) => (
                <Grid item xs={12} key={group.title}>
                  <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4, opacity: 0.5 }}>{group.title}</Typography>
                  <Grid container spacing={2}>
                    {group.colors.map((c) => (
                      <Grid item xs={12} sm={6} md={3} key={c.name}>
                        <Box 
                          onClick={() => handleCopy(c.value)}
                          sx={{ 
                            p: 2, 
                            border: `2px solid ${colors.helpers.text.primary}`,
                            bgcolor: colors.helpers.background.primary,
                            cursor: 'pointer',
                            '&:hover': {
                              transform: 'translate(-4px, -4px)',
                              boxShadow: `8px 8px 0px ${colors.helpers.text.primary}`
                            }
                          }}
                        >
                          <Box sx={{ height: 120, bgcolor: c.value, mb: 2, border: `1px solid ${colors.helpers.text.primary}` }} />
                          <Typography sx={{ ...TEXT_VARIANTS.label.main, fontSize: '0.75rem' }}>{c.name}</Typography>
                          <Typography sx={{ ...TEXT_VARIANTS.label.secondary, fontSize: '0.65rem' }}>{c.value}</Typography>
                        </Box>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        <Box id="tipografia" sx={{ py: 15 }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 03: Typography"</Typography>
            <Stack direction="row" spacing={4} alignItems="center" sx={{ mb: 10, p: 4, border: `2px dashed ${colors.helpers.text.primary}` }}>
              <Typography sx={{ ...TEXT_VARIANTS.label.main }}>Input:</Typography>
              <TextField 
                fullWidth
                variant="standard" 
                value={previewText}
                onChange={(e) => setPreviewText(e.target.value)}
                sx={{ input: { ...TEXT_VARIANTS.display.medium, fontSize: '1.5rem' } }}
              />
            </Stack>

            <Stack spacing={12}>
              <Box sx={{ position: 'relative' }}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, position: 'absolute', top: -30 }}>// GIANT_DISPLAY</Typography>
                <Giant>{previewText}</Giant>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, position: 'absolute', top: -30 }}>// LARGE_HEADING</Typography>
                <H1>{previewText}</H1>
              </Box>
              <Box sx={{ position: 'relative', maxWidth: 800 }}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, position: 'absolute', top: -30 }}>// BODY_SYSTEM</Typography>
                <BodyText>
                  {previewText} THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG. 1234567890. 
                  SISTEMA DE DISEÑO INDUSTRIAL PARA AI4U. ALTO IMPACTO, BAJA FRICCIÓN.
                </BodyText>
              </Box>
              <Box sx={{ position: 'relative' }}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, position: 'absolute', top: -30 }}>// NECTO_MONO_CORE</Typography>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, fontSize: '2rem' }}>{previewText}</Typography>
              </Box>
            </Stack>
          </Container>
        </Box>

        <Box id="atomos" sx={{ py: 15, bgcolor: colors.helpers.background.secondary }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 04: Atomic Units"</Typography>
            
            <Grid container spacing={8}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"Button variants"</Typography>
                <Stack spacing={3}>
                  <Button variant="primary" label="Press" fullWidth>Primary action</Button>
                  <Button variant="industrial" label="Safety" fullWidth>Industrial action</Button>
                  <Button variant="outline" label="Border" fullWidth>Outline action</Button>
                  <Button variant="minimal" label="Light" fullWidth>Minimal action</Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"Geometric assets"</Typography>
                <Grid container spacing={4} sx={{ p: 4, border: `2px solid ${colors.helpers.text.primary}`, bgcolor: colors.helpers.background.primary }}>
                  {['circle', 'square', 'triangle', 'cross', 'dot', 'plus'].map((shape) => (
                    <Grid item xs={4} key={shape} sx={{ textAlign: 'center' }}>
                      <GeometricIcon type={shape as any} size="large" color={colors.helpers.text.primary} />
                      <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mt: 1 }}>{shape.charAt(0).toUpperCase() + shape.slice(1)}</Typography>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ─── Section: Referentes (Swiss/Brutalist print registration) ─── */}
        <Box id="referentes" sx={{ py: 15, bgcolor: colors.helpers.background.secondary }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 04.5: Referentes — Print Registration System"</Typography>

            <Grid container spacing={8}>
              <Grid item xs={12} md={4}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"RegistrationMarks"</Typography>
                <Box sx={{
                  position: 'relative', height: 180,
                  border: `2px solid ${colors.helpers.text.primary}`,
                  bgcolor: colors.helpers.background.primary,
                }}>
                  <RegistrationMarks circles />
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"MoireText"</Typography>
                <Box sx={{
                  height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${colors.helpers.text.primary}`,
                  bgcolor: AI4U_PALETTE.black,
                }}>
                  <MoireText color={AI4U_PALETTE.white} sx={{ fontSize: '3rem' }}>ai4u</MoireText>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"HalftoneSwatch"</Typography>
                <Box sx={{
                  height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `2px solid ${colors.helpers.text.primary}`,
                  bgcolor: colors.helpers.background.primary,
                }}>
                  <HalftoneSwatch size={96} dot={10} />
                </Box>
              </Grid>
            </Grid>

            <Typography sx={{ ...TEXT_VARIANTS.label.main, mt: 10, mb: 4 }}>"Surface presets — dominant color per page"</Typography>
            <Grid container spacing={2}>
              {(['black', 'white', 'volt', 'orange', 'blue', 'cream'] as const).map((preset) => {
                const p = SURFACE_PRESETS[preset];
                return (
                  <Grid item xs={6} md={2} key={preset}>
                    <Box sx={{
                      height: 90, display: 'flex', alignItems: 'flex-end', p: 1.5,
                      bgcolor: p.background, border: `1px solid ${colors.helpers.border.secondary}`,
                    }}>
                      <CodeText sx={{ fontSize: '0.7rem', color: p.text.primary }}>{preset}</CodeText>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Box>

        <Box id="moleculas" sx={{ py: 15 }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 05: Molecular Modules"</Typography>
            
            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mb: 2 }}>[Data Visualization V1]</Typography>
                <MetricCard 
                  title="Conversión IA" 
                  value="88.2%" 
                  trend="up" 
                  label="Metric Data"
                  subtitle="Optimización de flujo de trabajo."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mb: 2 }}>[Financial System V1]</Typography>
                <BudgetCard 
                  title="Presupuesto Neto" 
                  totalAmount={25500} 
                  variant="industrial"
                  categories={[
                    { name: 'Auto Agents', amount: 15000 },
                    { name: 'Cloud Core', amount: 10500 }
                  ]}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* ─── Section: Números Gigantes (Industrial Scale) ─── */}
        <Box id="numeros" sx={{ py: 15, bgcolor: AI4U_PALETTE.black, color: AI4U_PALETTE.white }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, color: AI4U_PALETTE.accentColors.mint, mb: 10 }}>
              "Phase 06: Giant Numbers"
            </Typography>
            
            <Stack spacing={8}>
              <Box>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, color: colors.palette.gray[500], mb: 2 }}>
                  // Primary Numeric Variant
                </Typography>
                <GiantNumber>88.2%</GiantNumber>
              </Box>
              
              <Box>
                <Typography sx={{ ...TEXT_VARIANTS.label.secondary, color: colors.palette.gray[500], mb: 2 }}>
                  // Outline Numeric Variant
                </Typography>
                <GiantNumber numberVariant="outline">2,500+</GiantNumber>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 4, border: `1px solid ${colors.palette.gray[800]}` }}>
                    <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mb: 2 }}>[Composition Sample]</Typography>
                    <GiantNumber sx={{ fontSize: '8rem' }}>12</GiantNumber>
                    <Typography sx={{ ...TEXT_VARIANTS.label.main }}>Agentes operativos</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                   <Box sx={{ p: 4, border: `1px solid ${colors.palette.gray[800]}` }}>
                    <Typography sx={{ ...TEXT_VARIANTS.label.secondary, mb: 2 }}>[Composition Sample]</Typography>
                    <GiantNumber numberVariant="outline" sx={{ fontSize: '8rem' }}>99%</GiantNumber>
                    <Typography sx={{ ...TEXT_VARIANTS.label.main }}>Precisión de datos</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Stack>
          </Container>
        </Box>

        <Box id="tokens" sx={{ py: 15, borderTop: `4px solid ${colors.helpers.text.primary}` }}>
          <Container maxWidth="lg">
            <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 10 }}>"Phase 07: System Tokens"</Typography>
            
            <Grid container spacing={10}>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"Spacing grid"</Typography>
                <Stack spacing={2} sx={{ p: 4, border: `1px solid ${colors.helpers.border.secondary}` }}>
                  {[4, 8, 16, 24, 32, 48, 64].map((s) => (
                    <Stack key={s} direction="row" alignItems="center" spacing={4}>
                      <Typography sx={{ ...TEXT_VARIANTS.label.secondary, minWidth: 60 }}>T-{s}</Typography>
                      <Box sx={{ width: s * 2, height: 20, bgcolor: BRAND_ORANGE }} />
                      <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>{s}PX</Typography>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 4 }}>"Responsive breaks"</Typography>
                <Stack spacing={0}>
                  {[
                    { label: 'XS', val: '0000px', desc: 'Mobile Portrait' },
                    { label: 'SM', val: '0600px', desc: 'Mobile Landscape' },
                    { label: 'MD', val: '0960px', desc: 'Tablet Core' },
                    { label: 'LG', val: '1280px', desc: 'Desktop UI' },
                    { label: 'XL', val: '1920px', desc: 'Wide Screen' },
                  ].map((bp) => (
                    <Box key={bp.label} sx={{ display: 'flex', justifyContent: 'space-between', p: 2, borderBottom: `1px solid ${colors.helpers.text.primary}`, '&:hover': { bgcolor: colors.helpers.text.primary, color: colors.helpers.background.primary } }}>
                      <Typography sx={{ ...TEXT_VARIANTS.label.main }}>{bp.label}</Typography>
                      <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>{bp.val}</Typography>
                      <Typography sx={{ ...TEXT_VARIANTS.label.secondary, opacity: 0.5 }}>{bp.desc}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Industrial Footer */}
        <Box sx={{ py: 10, borderTop: `2px solid ${colors.helpers.text.primary}`, textAlign: 'center', bgcolor: colors.helpers.background.secondary }}>
          <Stack spacing={4} alignItems="center">
             <Logo variant="mobile" />
             <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>
               Ai4u Design System - Internal Use Only
             </Typography>
             <Box sx={{ display: 'flex', gap: 4 }}>
               <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>Rev: 2.1.0</Typography>
               <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>Build: 2026_Q1</Typography>
               <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>Status: Active</Typography>
             </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default DesignSystem;
