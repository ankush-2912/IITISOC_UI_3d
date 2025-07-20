
import { Badge } from "@/components/ui/badge";
import { Zap } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="flex items-center justify-between mb-6 p-4 deep-space-card rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-lg flex items-center justify-center deep-space-glow">
          <Zap className="w-5 h-5 text-white drop-shadow-sm" />
        </div>
        <h1 className="text-2xl font-bold text-white">🎨EdiGen AI</h1>
      </div>
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30 deep-space-glow">
          Inference
        </Badge>
        <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
          Commercial use
        </Badge>
      </div>
    </div>
  );
};

export default AppHeader;
