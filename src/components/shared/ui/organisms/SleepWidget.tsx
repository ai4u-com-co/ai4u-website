import React from 'react';
import { 
  Box, 
  CardContent, 
  Typography, 
  Chip,
  IconButton,
  Divider
} from '@mui/material';
import { 
  Wifi as WifiIcon,
  Bluetooth as BluetoothIcon,
  Bed as BedIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useColors } from '../../../../hooks';
import { H1, H3, H4, BodyText, SmallText } from '../atoms';
import Card from '../molecules/Card';

interface SleepData {
  totalHours: number;
  totalMinutes: number;
  remStart: string;
  remEnd: string;
  temperature: number;
  hasWifi: boolean;
  hasBluetooth: boolean;
  quality?: 'excellent' | 'good' | 'fair' | 'poor';
}

interface SleepWidgetProps {
  data: SleepData;
  date: string;
  time: string;
  variant?: 'default' | 'elevated' | 'outlined';
  onRefresh?: () => void;
}

const SleepWidget: React.FC<SleepWidgetProps> = ({
  data,
  date,
  time,
  variant = 'elevated',
  onRefresh = undefined
}) => {
  const colors = useColors();

  // Configuración de variantes según el sistema AI4U minimalista
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          card: {
            background: 'transparent',
            border: `1px solid ${colors.contrast.divider}`,
            color: colors.contrast.text.primary
          },
          surface: {
            background: colors.contrast.surface,
            border: `1px solid ${colors.contrast.divider}`
          }
        };
      case 'elevated':
        return {
          card: {
            background: colors.contrast.surface,
            border: 'none',
            color: colors.contrast.text.primary
          },
          surface: {
            background: colors.contrast.background,
            border: `1px solid ${colors.contrast.divider}`
          }
        };
      default: // default
        return {
          card: {
            background: colors.contrast.surface,
            border: `1px solid ${colors.contrast.divider}`,
            color: colors.contrast.text.primary
          },
          surface: {
            background: colors.contrast.background,
            border: `1px solid ${colors.contrast.divider}`
          }
        };
    }
  };

  const getQualityColor = (quality?: string) => {
    switch (quality) {
      case 'excellent':
  return colors.palette.success;
case 'good':
  return colors.palette.accent;
case 'fair':
  return '#D97706';
case 'poor':
  return '#DC2626';
default:
  return colors.palette.accent;
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Card
      variant={variant as 'default' | 'elevated' | 'outlined'}
      sx={{
        borderRadius: 4,
        maxWidth: 400,
        margin: '0 auto',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
        ...variantStyles.card
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          mb: 3 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ 
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: variantStyles.surface.background,
              border: variantStyles.surface.border,
              backdropFilter: 'blur(10px)'
            }}>
              <BedIcon sx={{ 
                color: colors.helpers.text.primary,
                fontSize: 24
              }} />
            </Box>
            <Box>
              <SmallText sx={{ 
                color: colors.helpers.text.secondary,
                mb: 0.5
              }}>
                {date}
              </SmallText>
              <H3 sx={{ 
                color: colors.helpers.text.primary,
                fontWeight: 400
              }}>
                {time}
              </H3>
            </Box>
          </Box>
          {onRefresh && (
            <IconButton
              size="small"
              onClick={onRefresh}
              sx={{
                color: colors.helpers.text.secondary,
                '&:hover': {
                  background: colors.helpers.state.hover,
                  color: colors.palette.accent
                }
              }}
            >
              <RefreshIcon />
            </IconButton>
          )}
        </Box>

        {/* Sleep Quality */}
        {data.quality && (
          <Box sx={{ 
            mb: 3,
            p: 2,
            borderRadius: 2,
            background: variantStyles.surface.background,
            border: variantStyles.surface.border,
            backdropFilter: 'blur(10px)'
          }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between' 
            }}>
              <SmallText sx={{ 
                color: colors.helpers.text.secondary,
                textTransform: 'none',
                letterSpacing: 0.5
              }}>
                Calidad del Sueño
              </SmallText>
              <Chip
                label={data.quality}
                size="small"
                sx={{
                  backgroundColor: getQualityColor(data.quality) + '20',
                  color: getQualityColor(data.quality),
                  fontWeight: 400,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1.5,
                  },
                }}
              />
            </Box>
          </Box>
        )}

        {/* Sleep Duration */}
        <Box sx={{ 
          mb: 3,
          p: 3,
          borderRadius: 3,
          background: variantStyles.surface.background,
          border: variantStyles.surface.border,
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            mb: 2 
          }}>
            <H4 sx={{ 
              color: colors.helpers.text.primary,
              fontWeight: 400
            }}>
              Duración del Sueño
            </H4>
            <Chip
              label={`${data.totalHours}H ${data.totalMinutes}M`}
              sx={{
                backgroundColor: colors.palette.accent,
                color: colors.palette.white,
                fontWeight: 400,
                fontSize: '0.875rem',
                height: 32,
                '& .MuiChip-label': {
                  px: 2,
                },
              }}
            />
          </Box>

          {/* Sleep Timeline */}
          <Box sx={{ 
            height: 40,
            borderRadius: 2,
            background: colors.palette.accent,
            position: 'relative',
            overflow: 'hidden',
            mb: 2
          }}>
            {/* Timeline markers */}
            <Box sx={{ 
              position: 'absolute',
              inset: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2
            }}>
              {Array.from({ length: 20 }, (_, i) => (
                <Box key={i} sx={{ 
                  width: 2, 
                  height: 8, 
                  backgroundColor: 'rgba(255, 255, 255, 0.3)' 
                }} />
              ))}
            </Box>
            
            {/* REM line */}
            <Box sx={{ 
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              transform: 'translateY(-50%)'
            }} />
            
            {/* Time labels */}
            <SmallText sx={{ 
              position: 'absolute',
              top: 4,
              left: 8,
              fontWeight: 400,
              color: colors.palette.white
            }}>
              {data.remStart}
            </SmallText>
            <SmallText sx={{ 
              position: 'absolute',
              top: 4,
              right: 8,
              fontWeight: 400,
              color: colors.palette.white
            }}>
              {data.remEnd}
            </SmallText>
            
            <SmallText sx={{ 
              position: 'absolute',
              bottom: 4,
              left: 8,
              color: colors.palette.white
            }}>
              REM
            </SmallText>
            <SmallText sx={{ 
              position: 'absolute',
              bottom: 4,
              right: 8,
              color: colors.palette.white
            }}>
              REM
            </SmallText>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          borderRadius: 2,
          background: variantStyles.surface.background,
          border: variantStyles.surface.border,
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SmallText sx={{ 
              color: colors.helpers.text.secondary,
              textTransform: 'none',
              letterSpacing: 0.5
            }}>
              Temperatura:
            </SmallText>
            <H4 sx={{ 
              color: colors.helpers.text.primary,
              fontWeight: 400
            }}>
              {data.temperature}°C
            </H4>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {data.hasWifi && (
              <Box sx={{ 
                width: 32,
                height: 32,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: colors.palette.accent + '20',
color: colors.palette.accent
              }}>
                <WifiIcon sx={{ fontSize: 16 }} />
              </Box>
            )}
            {data.hasBluetooth && (
              <Box sx={{ 
                width: 32,
                height: 32,
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: colors.palette.success + '20',
color: colors.palette.success
              }}>
                <BluetoothIcon sx={{ fontSize: 16 }} />
              </Box>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SleepWidget; 