import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
  onToggle?: () => void;
  isOpen?: boolean;
}

const CollapsibleSection = ({ 
  title, 
  icon, 
  children, 
  defaultOpen = false, 
  className = "",
  onToggle,
  isOpen: controlledIsOpen
}: CollapsibleSectionProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <Card className={`deep-space-card hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 ${className}`}>
      <CardHeader className="pb-2">
        {/* To manually adjust the vertical position of this button, change the mt-[-8px] value below */}
        <Button
          onClick={handleToggle}
          variant="ghost"
          className="w-full flex items-center justify-between p-3 h-auto text-white hover:bg-slate-700/30 rounded-lg transition-all duration-300 group mt-[-16px] deep-space-button"
        <Badge variant="secondary" className="deep-space-badge">
        >
          <div className="flex items-center gap-3">
            <div className="transition-colors duration-300 group-hover:text-purple-300">
              {icon}
            </div>
            <span className="font-semibold text-left">{title}</span>
          </div>
          <div className="transition-transform duration-300 group-hover:text-purple-300">
            {isOpen ? (
              <ChevronUp className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors duration-300" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-purple-300 transition-colors duration-300" />
            )}
          </div>
        </Button>
      </CardHeader>
      
      <div 
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <CardContent className="pt-0 pb-4">
          <div className={`transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-2'}`}>
        <Badge variant="secondary" className="bg-emerald-500/15 text-emerald-300 border-emerald-500/25">
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default CollapsibleSection;
