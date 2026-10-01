import React from 'react';
import type { ToolId } from '@/data/tools';
import { TOOLS } from '@/data/tools';

interface ToolBadgesProps {
  tools: ToolId[];
  label?: string;
}

const ToolBadges: React.FC<ToolBadgesProps> = ({ tools, label = 'Equipado con' }) => {
  if (tools.length === 0) return null;
  return (
    <div className="a4-agentes-tools">
      <span className="a4-cap">{label}</span>
      <div className="a4-agentes-tools-row">
        {tools.map((toolId) => {
          const tool = TOOLS[toolId];
          const ToolIcon = tool.Icon;
          return (
            <span key={toolId} className="a4-agentes-tool" title={tool.label} role="img" aria-label={tool.label}>
              <ToolIcon size={16} color="currentColor" />
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default ToolBadges;
