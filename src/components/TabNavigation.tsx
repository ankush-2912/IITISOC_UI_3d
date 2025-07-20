
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, FileText, Monitor } from "lucide-react";

interface TabNavigationProps {
  activeTab: string;
}

const TabNavigation = ({ activeTab }: TabNavigationProps) => {
  return (
    <TabsList className="grid w-full grid-cols-3 glassmorphism-container">
      <TabsTrigger 
        value="playground" 
        className="deep-space-tab data-[state=active]:text-primary text-slate-400"
      >
        <Play className="w-4 h-4 mr-2" />
        Playground
      </TabsTrigger>
      <TabsTrigger 
        value="documentation" 
        className="deep-space-tab data-[state=active]:text-primary text-slate-400"
      >
        <FileText className="w-4 h-4 mr-2" />
        Documentation
      </TabsTrigger>
      <TabsTrigger 
        value="dashboard" 
        className="deep-space-tab data-[state=active]:text-primary text-slate-400"
      >
        <Monitor className="w-4 h-4 mr-2" />
        System Dashboard
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
