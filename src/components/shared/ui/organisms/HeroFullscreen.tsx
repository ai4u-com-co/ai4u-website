import React, { useEffect, useState } from 'react';
import { Box, alpha } from '@mui/material';
import { LazyImage, CodeText, RegistrationMarks, MoireText } from '../atoms';
import { DiagnosticCTA } from '../molecules';
import { useColors } from '../../../../hooks';
import { BRAND_ORANGE } from '../tokens/brandAccent';

const IMAGES = [
  '/assets/images/hero-image.png',
  '/assets/images/hero-image2.png',
  '/assets/images/hero-image3.png',
];

const SERVICES = ['agentes', 'entrenamiento', 'automatizaciones'];

interface HeroFullscreenProps {
  badge?: string;
  subtitle?: string;
  primaryButtonText?: string;
}

const HeroFullscreen: React.FC<HeroFullscreenProps> = ({
  badge = 'ai4u.equipo // siempre activo',
  subtitle,
  primaryButtonText = 'hablar con el equipo',
}) => {
  const colors = useColors();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImage(p => (p + 1) % IMAGES.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <Box sx={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
    }}>

      <RegistrationMarks circles />

      {/* ── ROTATING BACKGROUND IMAGES ── */}
      <Box sx={{ position: 'absolute', inset: 0 }}>
        {IMAGES.map((img, idx) => (
          <Box key={idx} sx={{ position: 'absolute', inset: 0 }}>
            <LazyImage
              src={img}
              alt=""
              priority={idx === 0}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                filter: 'grayscale(100%) contrast(1.1)',
                opacity: idx === currentImage ? 0.38 : 0,
                transform: idx === currentImage ? 'scale(1.06)' : 'scale(1)',
                transition: 'opacity 2s ease-in-out, transform 12s ease-out',
              }}
            />
          </Box>
        ))}
        {/* Dark overlay — heavy at bottom to anchor text */}
        <Box sx={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(
            to bottom,
            ${alpha(colors.contrast.background, 0.05)} 0%,
            ${alpha(colors.contrast.background, 0.2)}  35%,
            ${alpha(colors.contrast.background, 0.72)} 72%,
            ${alpha(colors.contrast.background, 0.93)} 100%
          )`,
        }} />
      </Box>

      {/* ── COORDINATES — top right ── */}
      <CodeText sx={{
        position: 'absolute',
        top: { xs: 72, md: 24 },
        right: { xs: 24, md: 40 },
        fontSize: '0.65rem',
        opacity: 0.3,
        zIndex: 2,
        color: colors.contrast.text.primary,
      }}>
        6.2442° N, 75.5812° W
      </CodeText>

      {/* ── SISTEMA — top left ── */}
      <CodeText sx={{
        position: 'absolute',
        top: { xs: 72, md: 24 },
        left: { xs: 24, md: 40 },
        fontSize: '0.65rem',
        opacity: 0.3,
        zIndex: 2,
        color: colors.contrast.text.primary,
      }}>
        no. 001 / 2026
      </CodeText>

      {/* ── SCROLL HINT ── */}
      <Box sx={{
        position: 'absolute',
        bottom: 28,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        '@keyframes breathe': {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.55 },
        },
        animation: 'breathe 2.5s ease-in-out infinite',
      }}>
        <CodeText sx={{
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          color: colors.contrast.text.primary,
          opacity: 0.5,
        }}>
          scroll
        </CodeText>
        <Box sx={{
          width: '1px',
          height: '36px',
          background: `linear-gradient(to bottom, ${alpha(colors.contrast.text.primary, 0.25)}, transparent)`,
        }} />
      </Box>

      {/* ── HERO CONTENT — bottom split ── */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        gap: 4,
        px: { xs: 3, md: 5 },
        pb: { xs: 10, md: 6 },
      }}>

        {/* LEFT: badge + title */}
        <Box>
          <CodeText sx={{
            fontSize: '0.72rem',
            letterSpacing: '0.15em',
            color: BRAND_ORANGE,
            mb: 2,
            display: 'block',
          }}>
            {badge}
          </CodeText>
          <Box
            component="h1"
            sx={{
              m: 0,
              fontSize: { xs: 'clamp(3rem, 12vw, 5rem)', md: 'clamp(4rem, 8vw, 7rem)' },
              fontWeight: 900,
              fontFamily: '"Red Hat Display", sans-serif',
              lineHeight: 0.87,
              letterSpacing: '-0.045em',
              color: colors.contrast.text.primary,
            }}
          >
            más tiempo<br />
            para lo que<br />
            <MoireText sx={{ fontSize: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}>
              importa.
            </MoireText>
          </Box>
          {subtitle && (
            <Box sx={{
              mt: 2.5,
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              fontWeight: 300,
              fontFamily: '"Red Hat Display", sans-serif',
              letterSpacing: '0.01em',
              color: colors.contrast.text.primary,
              opacity: 0.75,
              maxWidth: '420px',
            }}>
              {subtitle}
            </Box>
          )}
        </Box>

        {/* RIGHT: services + CTA */}
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 2.5,
          flexShrink: 0,
          pb: '4px',
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, alignItems: 'flex-end' }}>
            {SERVICES.map(svc => (
              <CodeText key={svc} sx={{
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                color: colors.contrast.text.primary,
                opacity: 0.35,
                textTransform: 'uppercase',
              }}>
                {svc}
              </CodeText>
            ))}
          </Box>
          <DiagnosticCTA
            variant="primary"
            text={primaryButtonText}
            size="large"
            showIcon={false}
            sx={{
              height: { xs: '44px', md: '50px' },
              px: { xs: 3, md: 5 },
              fontSize: { xs: '0.75rem', md: '0.82rem' },
              fontWeight: 400,
              fontFamily: 'monospace',
              letterSpacing: '0.05em',
              borderRadius: 0,
              bgcolor: colors.contrast.text.primary,
              color: colors.contrast.background,
              border: 'none',
              transition: 'all 0.25s ease',
              '&:hover': {
                bgcolor: BRAND_ORANGE,
                color: '#fff',
              },
            }}
          />
        </Box>
      </Box>

      {/* ── BOTTOM DIVIDER ── */}
      <Box sx={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '1px',
        bgcolor: alpha(colors.contrast.text.primary, 0.1),
        zIndex: 3,
      }} />
    </Box>
  );
};

export default HeroFullscreen;
