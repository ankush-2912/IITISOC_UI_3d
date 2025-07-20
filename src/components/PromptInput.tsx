
import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, Info, Upload, X } from "lucide-react";

interface PromptInputProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  controlImage: File | null;
  onControlImageChange: (file: File | null) => void;  
}

const PromptInput = ({ prompt, onPromptChange, controlImage, onControlImageChange }: PromptInputProps) => {
  const [isPromptFocused, setIsPromptFocused] = useState(false);

  const handleControlImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onControlImageChange(file);
    }
  };

  const removeControlImage = () => {
    onControlImageChange(null);
  };

  return (
    <Card className="deep-space-card transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Input
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-slate-200 mb-2 block flex items-center gap-2">
            Prompt
            <Info className="w-4 h-4 text-slate-500" />
          </label>
          <div className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => onPromptChange(e.target.value)}
              onFocus={() => setIsPromptFocused(true)}
              onBlur={() => setIsPromptFocused(false)}
              placeholder="Describe what you want to generate..."
              className={`min-h-[120px] deep-space-input text-slate-100 placeholder:text-slate-400 resize-none transition-all duration-300 ${
                isPromptFocused 
                  ? 'border-primary shadow-lg shadow-primary/25 scale-[1.02]' 
                  : 'hover:border-slate-600'
              }`}
            />
            {isPromptFocused && (
              <div className="absolute inset-0 rounded-md border-2 border-primary animate-pulse pointer-events-none" />
            )}
          </div>
        </div>

        {/* ControlNet Image Upload */}
        <div>
          <label className="text-sm font-medium text-slate-200 mb-2 block flex items-center gap-2">
            ControlNet Image (Optional)
            <Info className="w-4 h-4 text-slate-500" />
          </label>
          {controlImage ? (
            <div className="relative">
              <img 
                src={URL.createObjectURL(controlImage)} 
                alt="Control image" 
                className="w-full h-32 object-cover rounded-lg border border-slate-700/40"
              />
              <Button
                size="sm"
                variant="destructive"
                onClick={removeControlImage}
                className="absolute top-2 right-2"
              >
                <X className="w-4 h-4" />
              </Button>
              <p className="text-xs text-slate-400 mt-1">{controlImage.name}</p>
            </div>
          ) : (
            <div className="border-2 border-dashed border-slate-700/40 rounded-lg p-4 text-center hover:border-primary/30 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleControlImageUpload}
                className="hidden"
                id="control-image-upload"
              />
              <label 
                htmlFor="control-image-upload" 
                className="cursor-pointer flex flex-col items-center gap-2"
              >
                <Upload className="w-6 h-6 text-slate-500" />
                <span className="text-sm text-slate-400">Click to upload control image</span>
              </label>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptInput;
