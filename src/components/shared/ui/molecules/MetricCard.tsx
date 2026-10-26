import React from 'react';
import { Card, Box, Typography, styled, alpha } from '@mui/material';
import { GeometricIcon } from '../atoms';
import { useColors } from '../../../../hooks';
import { TEXT_VARIANTS } from '../tokens/typography';
import { BRAND_ORANGE } from '../tokens/brandAccent';

type IconType = 'arrow-up' | 'arrow-down' | 'arrow-right' | 'arrow-left' | 'plus' | 'minus' | 'circle' | 'square' | 'triangle' | 'cross' | 'line' | 'dot';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  iconType?: IconType;
  trend?: 'up' | 'down' | 'neutral';
  size?: 'compact' | 'normal' | 'large';
  onClick?: () => void;
  label?: string; // Metadata label e.g. "DATA_POINT"
}

const MetricValue = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'metricSize',
})<{ metricSize: string }>(({ metricSize, theme }) => ({
  fontSize: metricSize === 'compact'
    ? '3rem'
    : metricSize === 'large'
      ? '7rem'
      : '5rem',
  fontWeight: 900, // Brutalist impact
  lineHeight: 0.85,
  fontFamily: '"Red Hat Display", sans-serif',
  letterSpacing: '-0.05em',
  margin: 0,
  padding: 0,
  color: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontSize: metricSize === 'compact'
      ? '2.5rem'
      : metricSize === 'large'
        ? '4rem'
        : '3.5rem',
  },
}));

const LabelText = styled(Box)(({ theme }) => ({
  ...TEXT_VARIANTS.label.secondary,
  fontSize: '0.65rem',
  position: 'absolute',
  top: 10,
  left: 10,
  opacity: 0.5,
}));

const MetricCard: React.FC<MetricCardProps> = (props) => {
  const {
    title,
    value,
    subtitle,
    iconType = 'dot',
    trend = 'neutral',
    size = 'normal',
    onClick,
    label = "METRIC_SYSTEM"
  } = props;
  const colors = useColors();
  const actsAsDark = colors.effectiveMode === 'dark';

  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return colors.palette.accentColors.mint; // Volt green for positive
      case 'down':
        return BRAND_ORANGE; // Safety orange for negative/caution
      default:
        return 'inherit';
    }
  };
  
  return (
    <Card 
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        minHeight: (theme) => size === 'compact' ? theme.spacing(20) : size === 'large' ? theme.spacing(40) : theme.spacing(25),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start', // Functional left alignment
        p: 4,
        position: 'relative',
        overflow: 'hidden',
        bgcolor: colors.helpers.background.primary,
        color: colors.helpers.text.primary,
        borderRadius: 0,
        border: `2px solid ${colors.helpers.text.primary}`, // Radical Industrial Border
        transition: 'all 0.15s steps(4, end)',
        '&:hover': {
          transform: onClick ? 'translate(-4px, -4px)' : 'none',
          boxShadow: onClick ? `8px 8px 0px 0px ${colors.helpers.text.primary}` : 'none',
          '& .metric-bg': { opacity: 0.1 }
        }
      }}
    >
      {/* Abloh Label */}
      <LabelText>"{label}"</LabelText>

      {/* Background Graphic Element */}
      <Box 
        className="metric-bg"
        sx={{
          position: 'absolute',
          bottom: -20,
          right: -10,
          opacity: 0.05,
          fontSize: '10rem',
          fontWeight: 900,
          pointerEvents: 'none',
          transition: 'all 0.3s'
        }}
      >
        {iconType === 'dot' ? '•' : '#'}
      </Box>

      {/* Main metric value */}
      <Box sx={{ mt: 2, mb: 1, width: '100%', position: 'relative', zIndex: 1 }}>
        <MetricValue metricSize={size}>
          {typeof value === 'number' ? value.toLocaleString() : value}
        </MetricValue>
      </Box>

      {/* Title and Trend */}
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        mb: 1,
        width: '100%',
        position: 'relative',
        zIndex: 1
      }}>
        <Typography
          sx={{
            ...TEXT_VARIANTS.label.main,
            color: 'inherit',
          }}
        >
          {title}
        </Typography>
        {trend !== 'neutral' && (
          <Box sx={{ color: getTrendColor(), display: 'flex' }}>
            <GeometricIcon
              type={trend === 'up' ? 'triangle' : 'triangle'} // triangle up/down via rotate
              size="small"
              color="inherit"
              variant="filled"
              sx={{ transform: trend === 'down' ? 'rotate(180deg)' : 'none' }}
            />
          </Box>
        )}
      </Box>

      {/* Subtitle */}
      {subtitle && (
        <Typography
          sx={{
            ...TEXT_VARIANTS.body.small,
            color: 'inherit',
            opacity: 0.6,
            maxWidth: '90%',
            position: 'relative',
            zIndex: 1
          }}
        >
          {subtitle}
        </Typography>
      )}

      {/* Industrial Footer Element */}
      <Box 
        sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          width: '100%', 
          height: 4, 
          bgcolor: trend !== 'neutral' ? getTrendColor() : 'transparent',
          opacity: 0.8
        }} 
      />
    </Card>
  );
};

export default MetricCard;