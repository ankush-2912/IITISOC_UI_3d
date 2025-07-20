import { useState } from "react";
import PlaygroundInputSection from "./playground/PlaygroundInputSection";
import PlaygroundResultSection from "./playground/PlaygroundResultSection";

interface PlaygroundContentProps {
  prompt: string;
  onPromptChange: (prompt: string) => void;
  controlImage: File | null;
  onControlImageChange: (file: File | null) => void;
  width: number;
  height: number;
  numInferenceSteps: number;
  guidanceScale: number;
  loraScales: Record<string, number>;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onStepsChange: (steps: number) => void;
  onGuidanceScaleChange: (scale: number) => void;
  onLoraScalesChange: (scales: Record<string, number>) => void;
  isGenerating: boolean;
  generatedImage: string | null;
  showSuccess: boolean;
  onGenerate: (model: string) => void;
  onImageLoad: () => void;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: (message: string) => void;
}

const PlaygroundContent = ({
  prompt,
  onPromptChange,
  controlImage,
  onControlImageChange,
  width,
  height,
  numInferenceSteps,
  guidanceScale,
  loraScales,
  onWidthChange,
  onHeightChange,
  onStepsChange,
  onGuidanceScaleChange,
  onLoraScalesChange,
  isGenerating,
  generatedImage,
  showSuccess,
  onGenerate,
  onImageLoad,
  onImageError,
  onError
}: PlaygroundContentProps) => {
  const [generatedImageState, setGeneratedImage] = useState<string | null>(generatedImage || null);
  const [autoGenMetadata, setAutoGenMetadata] = useState<any>(null);
  const [selectedModel, setSelectedModel] = useState<string>("SDXL Base");

  const handleGenerate = () => {
    if (typeof onGenerate === 'function') {
      onGenerate(selectedModel);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-30">
      {/* Input Section */}
      <div className="glassmorphism-container rounded-xl p-6">
        <PlaygroundInputSection
          prompt={prompt}
          onPromptChange={onPromptChange}
          controlImage={controlImage}
          onControlImageChange={onControlImageChange}
          width={width}
          height={height}
          numInferenceSteps={numInferenceSteps}
          guidanceScale={guidanceScale}
          loraScales={loraScales}
          onWidthChange={onWidthChange}
          onHeightChange={onHeightChange}
          onStepsChange={onStepsChange}
          onGuidanceScaleChange={onGuidanceScaleChange}
          onLoraScalesChange={onLoraScalesChange}
          onError={onError}
          setGeneratedImage={setGeneratedImage}
          setAutoGenMetadata={setAutoGenMetadata}
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
        />
      </div>

      {/* Result Section */}
      <div className="glassmorphism-container rounded-xl p-6">
        <PlaygroundResultSection
          isGenerating={isGenerating}
          generatedImage={generatedImageState}
          onImageLoad={onImageLoad}
          onImageError={onImageError}
          showSuccess={showSuccess}
          onGenerate={handleGenerate}
          prompt={prompt}
          autoGenMetadata={autoGenMetadata}
          selectedModel={selectedModel}
        />
      </div>
    </div>
  );
};

export default PlaygroundContent;
