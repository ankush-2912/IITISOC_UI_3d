import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const AppHeader = () => {
  return (
    <div className="text-center mb-8 relative z-20">
      <div className="glassmorphism-container rounded-2xl p-8 mx-auto max-w-4xl">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            <div className="absolute inset-0 w-8 h-8 text-primary animate-ping opacity-20">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-primary to-white bg-clip-text text-transparent">
            Magic Control Canvas
          </h1>
          <div className="relative">
            <Sparkles className="w-8 h-8 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-0 w-8 h-8 text-primary animate-ping opacity-20" style={{ animationDelay: '0.5s' }}>
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
        </div>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Advanced AI image generation with LoRA integration, ControlNet support, and real-time pipeline management
        </p>
        <div className="mt-4 flex justify-center">
          <div className="px-4 py-2 deep-space-badge rounded-full text-sm">
            Deep Space Tech Interface
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;