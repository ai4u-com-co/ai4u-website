import React from 'react';
import { 
  Box, 
  CardContent, 
  IconButton, 
  Avatar,
  Divider,
  Typography,
  styled
} from '@mui/material';
import { 
  Add as AddIcon,
  AccountBalance as AccountBalanceIcon
} from '@mui/icons-material';
import { useColors } from '../../../../hooks';
import { BRAND_ORANGE } from '../tokens/brandAccent';
import { H3, BodyText, SmallText } from '../atoms';
import Card from './Card';
import { TEXT_VARIANTS } from '../tokens/typography';

interface BudgetCategory {
  name: string;
  amount: number;
  color?: string;
  icon?: React.ReactNode;
}

interface BudgetCardProps {
  title: string;
  subtitle?: string;
  categories: BudgetCategory[];
  totalAmount?: number;
  onAddCategory?: () => void;
  variant?: 'default' | 'elevated' | 'outlined' | 'industrial';
}

const CategoryItem = styled(Box)(({ theme }) => {
  const isLight = theme.palette.mode === 'light';
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    marginBottom: '8px',
    border: `1px solid ${isLight ? '#000' : '#fff'}`,
    transition: 'all 0.1s steps(2)',
    '&:hover': {
      backgroundColor: isLight ? '#000' : '#fff',
      color: isLight ? '#fff' : '#000',
      transform: 'translateX(4px)',
    }
  };
});

const BudgetCard: React.FC<BudgetCardProps> = ({
  title,
  subtitle = '',
  categories,
  totalAmount = 0,
  onAddCategory = () => {},
  variant = 'industrial'
}) => {
  const colors = useColors();
  const isLight = colors.effectiveMode === 'light';

  return (
    <Card
      variant={variant}
      label="FINANCE_CORE_V1"
      sx={{
        maxWidth: 450,
        margin: '0 auto',
      }}
    >
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Box sx={{ 
            width: 48, 
            height: 48, 
            border: `2px solid ${isLight ? '#000' : '#fff'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isLight ? '#000' : '#fff',
            color: isLight ? '#fff' : '#000'
          }}>
            <AccountBalanceIcon />
          </Box>
          <Box>
            <Typography sx={{ ...TEXT_VARIANTS.display.medium, fontSize: '1.5rem', mb: 0 }}>
              {title}
            </Typography>
            {subtitle && (
              <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>
                // {subtitle}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* Main Stats */}
      <Box sx={{ 
        p: 3, 
        border: `4px solid ${isLight ? '#000' : '#fff'}`,
        mb: 4,
        position: 'relative'
      }}>
        <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 1 }}>
          "TOTAL_BUDGET"
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <H3 sx={{ fontSize: '3rem', fontWeight: 900, mb: 0 }}>
            ${totalAmount?.toLocaleString()}
          </H3>
          <IconButton
            onClick={onAddCategory}
            sx={{
              borderRadius: 0,
              border: `2px solid ${isLight ? '#000' : '#fff'}`,
              bgcolor: colors.palette.accentColors.mint,
              color: '#000',
              '&:hover': {
                bgcolor: BRAND_ORANGE,
              }
            }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Categories */}
      <Typography sx={{ ...TEXT_VARIANTS.label.main, mb: 2 }}>
        "DISTRIBUTION_LOG"
      </Typography>
      <Box sx={{ mb: 4 }}>
        {categories.map((category, index) => (
          <CategoryItem key={index}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography sx={{ ...TEXT_VARIANTS.label.secondary, opacity: 0.5 }}>
                {String(index + 1).padStart(2, '0')}
              </Typography>
              <Typography sx={{ fontWeight: 700 }}>
                {category.name}
              </Typography>
            </Box>
            <Typography sx={{ fontWeight: 900, fontFamily: 'monospace' }}>
              ${category.amount.toLocaleString()}
            </Typography>
          </CategoryItem>
        ))}
      </Box>

      {/* Industrial Footer */}
      <Box sx={{ 
        pt: 2, 
        borderTop: `1px dashed ${isLight ? '#000' : '#fff'}`,
        opacity: 0.5,
        display: 'flex',
        justifyContent: 'space-between'
      }}>
        <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>
          SYSTEM_VERSION_2.0.4
        </Typography>
        <Typography sx={{ ...TEXT_VARIANTS.label.secondary }}>
          {new Date().toLocaleDateString()}
        </Typography>
      </Box>
    </Card>
  );
};

export default BudgetCard;