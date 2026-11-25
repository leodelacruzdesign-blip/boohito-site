
'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ExternalLink, PenTool, ChevronLeft, ChevronRight } from 'lucide-react';
import PrototypeScreen from './prototype-screen';

interface PrototypeShowcaseProps {
  prototypeFlowData: {
    initial_screen_id: string;
    screens: any[];
  };
  styleGuideUrl: string;
  styleGuideSummary: string;
}

const PrototypeShowcase: React.FC<PrototypeShowcaseProps> = ({ prototypeFlowData, styleGuideUrl, styleGuideSummary }) => {
  if (!prototypeFlowData || !prototypeFlowData.screens || prototypeFlowData.screens.length === 0) {
    return (
      <Card className="p-6 md:p-8 bg-card/80 shadow-xl border-border/70 overflow-hidden text-center">
        <p className="text-muted-foreground">Prototype data is not available.</p>
      </Card>
    );
  }

  const [currentScreenId, setCurrentScreenId] = useState(prototypeFlowData.initial_screen_id);
  const currentScreenData = prototypeFlowData.screens.find(screen => screen.id === currentScreenId);

  const handleNavigate = (screenId: string) => {
    setCurrentScreenId(screenId);
  };

  const handleNextScreen = () => {
    if (currentScreenData && !currentScreenData.is_final) {
      setCurrentScreenId(currentScreenData.next_screen_id);
    }
  };

  const handlePrevScreen = () => {
    // Find the screen that has the current screen as its next_screen_id
    const prevScreen = prototypeFlowData.screens.find(screen => screen.next_screen_id === currentScreenId);
    if (prevScreen) {
      setCurrentScreenId(prevScreen.id);
    }
  };
  
  const isFirstScreen = currentScreenId === prototypeFlowData.initial_screen_id;

  return (
    <Card className="p-6 md:p-8 bg-card/80 shadow-xl border-border/70 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-6 border-b border-border/70 pb-4">
        <h3 className="text-xl md:text-2xl font-semibold text-primary mb-4 sm:mb-0">
          Interactive Strategic Execution
        </h3>
        <a href={styleGuideUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="text-sm shrink-0 w-full sm:w-auto">
                <PenTool className="mr-2 h-4 w-4"/>
                View Design System
                <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
        </a>
      </div>
      
      <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
        {styleGuideSummary} This interactive prototype demonstrates the final, accessible architecture derived from our AI-Augmented User Discovery Phase.
      </p>

      {/* Interactive Prototype Section */}
      <div className="bg-black/20 p-4 rounded-lg">
        {currentScreenData ? (
          <PrototypeScreen screenData={currentScreenData} onNavigate={handleNavigate} />
        ) : (
          <div className="h-[32rem] flex items-center justify-center text-muted-foreground">Loading screen...</div>
        )}
        <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={handlePrevScreen} size="icon" disabled={isFirstScreen}>
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous Screen</span>
            </Button>
            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                  Screen {prototypeFlowData.screens.findIndex(s => s.id === currentScreenId) + 1} of {prototypeFlowData.screens.length}
              </p>
               <p className="text-sm font-semibold">{currentScreenData?.title}</p>
            </div>
            <Button variant="outline" onClick={handleNextScreen} size="icon" disabled={currentScreenData?.is_final}>
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next Screen</span>
            </Button>
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row justify-between text-xs text-muted-foreground/80">
        <span className='mb-2 sm:mb-0'>Asset: High-Fidelity Interactive Prototype</span>
        <span>Status: Live Simulation</span>
      </div>
    </Card>
  );
};

export default PrototypeShowcase;
