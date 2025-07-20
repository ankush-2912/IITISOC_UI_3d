import { Settings, Activity, Layers, Grid3X3 } from "lucide-react";
import PromptInput from "../PromptInput";
import GenerationControls from "../GenerationControls";
import PipelineStatusPanel from "../PipelineStatusPanel";
import LoraSection from "../LoraSection";
import ControlNetManager from "../ControlNetManager";
import CollapsibleControls from "../CollapsibleControls";
import EnhancedCollapsibleSection from "./EnhancedCollapsibleSection";
import AutomaticGeneration from "./AutomaticGeneration";
import { useSectionManager } from "./SectionManager";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { Button } from "../ui/button";
import { ChevronDown, Zap } from "lucide-react";
import { useState } from "react";

interface PlaygroundInputSectionProps {
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
  onError?: (message: string) => void;
  setGeneratedImage: (img: string) => void;
  setAutoGenMetadata: (metadata: any) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
}

const modelOptions = [
  "SDXL_Base",
  "SDXL_Distilled",
  "SD1.5_Base",
  "SD1.5_Distilled"
];

const PlaygroundInputSection = ({
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
  onError,
  setGeneratedImage,
  setAutoGenMetadata,
  selectedModel,
  setSelectedModel
}: PlaygroundInputSectionProps) => {
  const {
    openSections,
    handleExpandAll,
    handleCollapseAll,
    toggleSection,
    openSectionCount
  } = useSectionManager();

  // Collapsible logic for the two panels
  const [openPanel, setOpenPanel] = useState<'model' | 'auto' | null>(null);

  return (
    <div className="space-y-6 relative">
      <PromptInput
        prompt={prompt}
        onPromptChange={onPromptChange}
        controlImage={controlImage}
        onControlImageChange={onControlImageChange}
      />

      {/* Two horizontally stacked buttons */}
      <div className="flex flex-row gap-2 w-full">
        {/* Dropdown Button */}
        <Button
          variant={openPanel === 'model' ? 'secondary' : 'outline'}
          className="w-1/2 flex items-center justify-between deep-space-button text-slate-100"
          onClick={() => setOpenPanel(openPanel === 'model' ? null : 'model')}
        >
          <span className="flex items-center gap-2">
            <ChevronDown className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Select Model</span>
          </span>
          <span className="ml-2 text-xs text-primary">{selectedModel}</span>
        </Button>
        {/* Automatic Generation Button */}
        <Button
          variant={openPanel === 'auto' ? 'secondary' : 'outline'}
          className="w-1/2 flex items-center justify-between deep-space-button text-slate-100"
          onClick={() => setOpenPanel(openPanel === 'auto' ? null : 'auto')}
        >
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Automatic Generation</span>
          </span>
        </Button>
      </div>
      {/* Panels (only one open at a time) */}
      <div className="w-full">
        {openPanel === 'model' && (
          <div className="w-full deep-space-surface-elevated border border-slate-700/30 rounded-lg p-4 mt-2">
            <Select value={selectedModel} onValueChange={setSelectedModel}>
            <SelectTrigger className="w-full deep-space-input text-slate-100 rounded-lg px-4 py-2 text-sm">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent className="deep-space-surface-elevated border border-slate-700/40 text-slate-100 rounded-lg shadow-lg">
                {modelOptions.map((model) => (
                  <SelectItem
  value={model}
  className="deep-space-surface text-slate-100 hover:bg-slate-700/40 px-4 py-2 text-sm"
>
  {model}
</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        {openPanel === 'auto' && (
          <div className="w-full mt-2">
            <AutomaticGeneration
              prompt={prompt}
              onError={onError || (() => {})}
              setGeneratedImage={setGeneratedImage}
              setAutoGenMetadata={setAutoGenMetadata}
              selectedModel={selectedModel}
            />
          </div>
        )}
      </div>

      <CollapsibleControls
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        openSections={openSectionCount}
        totalSections={4}
      />

      <div className="space-y-4 animate-in slide-in-from-left-2 duration-700 relative z-10">
        <EnhancedCollapsibleSection
          sectionKey="controls"
          title="Generation Controls"
          icon={<Settings className="w-5 h-5" />}
          isOpen={openSections.controls}
          onToggle={() => toggleSection('controls')}
        >
          <GenerationControls
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
          />
        </EnhancedCollapsibleSection>

        <EnhancedCollapsibleSection
          sectionKey="pipeline"
          title="Pipeline Status"
          icon={<Activity className="w-5 h-5" />}
          isOpen={openSections.pipeline}
          onToggle={() => toggleSection('pipeline')}
        >
          <PipelineStatusPanel onError={onError} />
        </EnhancedCollapsibleSection>

        <EnhancedCollapsibleSection
          sectionKey="loras"
          title="LoRAs"
          icon={<Layers className="w-5 h-5" />}
          isOpen={openSections.loras}
          onToggle={() => toggleSection('loras')}
        >
          <LoraSection onError={onError} />
        </EnhancedCollapsibleSection>
        
        <EnhancedCollapsibleSection
          sectionKey="controlnet"
          title="ControlNet Manager"
          icon={<Grid3X3 className="w-5 h-5" />}
          isOpen={openSections.controlnet}
          onToggle={() => toggleSection('controlnet')}
        >
          <ControlNetManager />
        </EnhancedCollapsibleSection>
      </div>
    </div>
  );
};

export default PlaygroundInputSection;
