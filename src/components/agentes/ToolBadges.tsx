import React from 'react';
import { Box, Tooltip } from '@mui/material';
import type { ToolId } from '@/data/tools';
import { TOOLS } from '@/data/tools';
import { AGENTES_BRAND } from './theme';

interface ToolBadgesProps {
  tools: ToolId[];
  label?: string;
  size?: number;
}

const ToolBadges: React.FC<ToolBadgesProps> = ({ tools, label = 'equipado con', size = 26 }) => {
  if (tools.length === 0) return null;
  return (
    <Box>
      <Box
        sx={{
          fontSize: 9,
          letterSpacing: '0.06em',
          fontWeight: 800,
          textTransform: 'uppercase',
          color: AGENTES_BRAND.cadetGray,
          mb: '6px',
        }}
      >
        {label}
      </Box>
      <Box sx={{ display: 'flex', gap: '6px' }}>
        {tools.map((toolId) => {
          const tool = TOOLS[toolId];
          const ToolIcon = tool.Icon;
          return (
            <Tooltip key={toolId} title={tool.label} arrow>
              <Box
                sx={{
                  width: size,
                  height: size,
                  border: `1.5px solid ${AGENTES_BRAND.erieBlack}`,
                  borderRadius: '5px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: AGENTES_BRAND.white,
                }}
              >
                <ToolIcon size={size * 0.5} color={tool.color === '#FFFFFF' ? AGENTES_BRAND.erieBlack : tool.color} />
              </Box>
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  );
};

export default ToolBadges;
