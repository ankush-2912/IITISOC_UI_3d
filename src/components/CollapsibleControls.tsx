
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExpandIcon, MinimizeIcon } from "lucide-react";

interface CollapsibleControlsProps {
  onExpandAll: () => void;
  onCollapseAll: () => void;
  openSections: number;
  totalSections: number;
}

const CollapsibleControls = ({ 
  onExpandAll, 
  onCollapseAll, 
  openSections, 
  totalSections 
}: CollapsibleControlsProps) => {
  return (
    <div className="flex items-center justify-between mb-4 p-3 deep-space-surface rounded-lg border border-slate-700/30">
      <div className="flex items-center gap-2">
        <span className="text-slate-200 text-sm">Panel Controls</span>
        <Badge variant="secondary" className="deep-space-badge">
          {openSections}/{totalSections} open
        </Badge>
      </div>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onExpandAll}
          className="deep-space-button text-slate-200 hover:text-white transition-all duration-200"
        >
          <ExpandIcon className="w-4 h-4 mr-1" />
          Expand All
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCollapseAll}
          className="deep-space-button text-slate-200 hover:text-white transition-all duration-200"
        >
          <MinimizeIcon className="w-4 h-4 mr-1" />
          Collapse All
        </Button>
      </div>
    </div>
  );
};

export default CollapsibleControls;
