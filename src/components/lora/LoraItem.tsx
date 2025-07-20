
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { LoraItem as LoraItemType } from "@/hooks/useLoraManager";

interface LoraItemProps {
  lora: LoraItemType;
  index: number;
  onRemove: (id: string) => void;
  onUpdateScale: (id: string, scale: number) => void;
}

const LoraItem = ({ lora, index, onRemove, onUpdateScale }: LoraItemProps) => {
  return (
    <div 
      className="p-3 deep-space-surface rounded-lg border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300 hover:shadow-md animate-in slide-in-from-left-2 duration-500" 
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-slate-100 font-medium">{lora.name}</h4>
          <p className="text-sm text-slate-400">{lora.path}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="deep-space-badge transition-all duration-200">
            {lora.scale.toFixed(1)}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(lora.id)}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 ease-in-out transform hover:scale-110 active:scale-95"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        <Label className="text-slate-200 text-sm">Scale: {lora.scale}</Label>
        <Slider
          value={[lora.scale]}
          onValueChange={(value) => onUpdateScale(lora.id, value[0])}
          max={2}
          min={-2}
          step={0.1}
          className="w-full deep-space-slider"
        />
      </div>
    </div>
  );
};

export default LoraItem;
