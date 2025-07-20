
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

interface ImageDisplayProps {
  isGenerating: boolean;
  generatedImage: string | null;
  onImageLoad: () => void;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const ImageDisplay = ({ isGenerating, generatedImage, onImageLoad, onImageError }: ImageDisplayProps) => {
  return (
    <Card className="deep-space-card transition-all duration-300">
      <CardHeader>
        <CardTitle className="scale-x-[0.90] text-slate-100 flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Result  
          <Badge variant="secondary" className={`ml-auto transition-all duration-300 ${
            isGenerating 
              ? "bg-orange-500/15 text-orange-300 animate-pulse" 
              : generatedImage 
                ? "bg-green-500/15 text-green-300" 
                : "deep-space-badge"
          }`}>
            {isGenerating ? "Generating..." : generatedImage ? "Complete" : "Idle"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="scale-x-[0.9] w-[600px] h-[400px] deep-space-surface border-2 border-dashed border-slate-700/40 rounded-lg flex items-center justify-center overflow-hidden relative">
          {isGenerating ? (
            <div className="text-center">
              {/* Shimmer loader */}
              <div className="absolute inset-0 shimmer-bg animate-shimmer" />
              <div className="animate-pulse relative z-10">
                <ImageIcon className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-300">Generating your image...</p>
              </div>
            </div>
          ) : generatedImage ? (
            <img 
              src={generatedImage} 
              alt="Generated image"
              className="w-full h-full object-cover rounded-lg animate-in fade-in-0 scale-in-95 duration-700"
              onLoad={onImageLoad}
              onError={onImageError}
            />
          ) : (
            <div className="text-center transition-all duration-300 hover:scale-105">
              <ImageIcon className="w-16 h-16 text-slate-500 mx-auto mb-4 transition-colors duration-300" />
              <p className="text-slate-400">Click Generate to create an image</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageDisplay;
