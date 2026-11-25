
"use client";

import React, { useState, useEffect, useRef } from "react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import NextLink from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2 } from "lucide-react";
import { useUsage } from "@/context/UsageContext";

import { MASCOT_ACTION_DATA } from "@/data/mascot-animations"; 
import { aiNavigation } from "@/ai/flows/ai-navigation";

type AiNavigationOutput = any; 
type AiNavigationFormValues = { query: string };

interface ModelViewerElement extends HTMLElement {
  animationName: string;
  play: (options?: { repetitions: number }) => void;
  pause: () => void;
  currentTime: number;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src: string;
          "camera-controls": boolean | string;
          autoplay: boolean | string;
          "animation-name": string;
          "shadow-intensity": string;
          exposure: string;
          id: string;
          "auto-camera-orbit": boolean | string; 
          "disable-zoom": boolean | string; 
        },
        HTMLElement
      >;
    }
  }
}

export default function HeroAiSection() {
  const viewerRef = useRef<ModelViewerElement>(null);
  const { register, handleSubmit, reset } = useForm<AiNavigationFormValues>();
  const [aiResponse, setAiResponse] = useState<AiNavigationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { incrementPrompts } = useUsage();
  
  const [mascotAction, setMascotAction] = useState("QFVow");
  const [isInitialLoad, setIsInitialLoad] = useState(true); 
  
  const FIREBASE_STORAGE_URL = "/fukuro-timeline.glb"; 

  useEffect(() => {
    if (isInitialLoad && mascotAction === "QFVow") {
      const qfvowDuration = MASCOT_ACTION_DATA["QFVow"]?.duration * 1000 || 2733;
      const timer = setTimeout(() => {
        setMascotAction("IdleL");
        setIsInitialLoad(false); 
      }, qfvowDuration);
      return () => clearTimeout(timer);
    }
  }, [isInitialLoad, mascotAction]); 

  useEffect(() => {
    if (mascotAction === "IdleL") {
      const INACTIVITY_TIME = 13000; 
      const timer = setTimeout(() => {
        const waveAction = "Wave"; 
        setMascotAction(waveAction);
        const waveDuration = MASCOT_ACTION_DATA[waveAction]?.duration * 1000 || 4733; 
        const returnTimer = setTimeout(() => {
          setMascotAction("IdleL"); 
        }, waveDuration);
        return () => clearTimeout(returnTimer); 
      }, INACTIVITY_TIME);
      return () => clearTimeout(timer); 
    }
  }, [mascotAction]); 

  useEffect(() => {
    const viewer = viewerRef.current;
    const handleModelLoad = () => {
      if (viewer && mascotAction) {
        const isLooping = MASCOT_ACTION_DATA[mascotAction as keyof typeof MASCOT_ACTION_DATA]?.loop;
        viewer.animationName = mascotAction;
        if (!isLooping) viewer.currentTime = 0;
        viewer.play({ repetitions: isLooping ? Infinity : 1 });
      }
    };
    if (viewer?.hasAttribute('loaded')) {
        handleModelLoad();
    } else if (viewer) {
        viewer.addEventListener('load', handleModelLoad, { once: true });
    }
    return () => {
        if (viewer) viewer.removeEventListener('load', handleModelLoad);
    };
  }, [mascotAction]);

  const onSubmit: SubmitHandler<AiNavigationFormValues> = async (data) => {
    setIsLoading(true);
    setError(null);
    setAiResponse(null);
    
    // 1. Track local prompt submission for gating
    incrementPrompts(); 
    
    const randomActions = ["Rocking", "Salsa2", "Twerk"]; 
    const listeningActionName = randomActions[Math.floor(Math.random() * randomActions.length)]; 
    const listeningDuration = MASCOT_ACTION_DATA[listeningActionName as keyof typeof MASCOT_ACTION_DATA]?.duration * 1000 || 5000;
    setMascotAction(listeningActionName); 
    
    setTimeout(async () => {
        setMascotAction("QFVow"); 
        try {
            const response = await aiNavigation({ query: data.query });
            setAiResponse(response);
            setTimeout(() => { setMascotAction("IdleL"); }, 5000);
        } catch (err) {
            setError("Failed to get response from AI.");
            setTimeout(() => { setMascotAction("IdleL"); }, 3000); 
        } finally {
            setIsLoading(false);
            reset();
        }
    }, listeningDuration); 
  };

  return (
    <Card className="overflow-hidden shadow-xl bg-card border-border/70">
      <CardContent className="p-0 md:flex md:items-stretch">
        <div className="md:w-1/2 relative bg-black/30 flex flex-col justify-center items-center p-6 py-10 md:p-10 min-h-[400px]">
          <div className="w-full h-full flex justify-center items-center absolute inset-0">
            <model-viewer
                ref={viewerRef}
                id="fukuro-mascot-viewer"
                src={FIREBASE_STORAGE_URL} 
                className="w-full h-full rounded-md"
                shadow-intensity="1"
                exposure="1.2"
                camera-controls="false"
                autoplay
                animation-name={mascotAction}
                title="BoohitōAI 3D Mascot"
                auto-camera-orbit
                disable-zoom
            ></model-viewer>
          </div>
        </div>
        <div className="md:w-1/2 p-6 md:p-10 flex flex-col justify-center">
            <div className="text-left mb-8">
                <h2 className="text-4xl font-bold text-primary">Ask Boohitō</h2>
                <p className="text-muted-foreground mt-4">
                    Navigate your projects with ease. Ask me anything, and I'll provide the insights and direction you need.
                </p>
            </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
            <div className="flex items-start gap-2">
                <div className="flex-grow">
                    <Input
                        placeholder="What are we working on today?"
                        {...register("query")}
                        disabled={isLoading}
                    />
                </div>
                <Button type="submit" disabled={isLoading} size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90">
                    {isLoading ? <Loader2 className="animate-spin" /> : <Wand2 />}
                    <span className="sr-only">Submit</span>
                </Button>
            </div>
          </form>
          <div className="mt-auto">
            {aiResponse && (
              <div className="bg-muted p-4 rounded-md mt-4 border-l-4 border-accent">
                <p className="text-sm font-semibold text-accent mb-1 uppercase tracking-wider">Boohitō Insights:</p>
                <p className="text-sm text-muted-foreground">
                  {aiResponse.answer || "No specific guidance found."}
                </p>
              </div>
            )}
            {error && <p className="text-sm text-red-500 mt-4">{error}</p>}
            <NextLink href="/portfolio" passHref>
              <Button variant="link" className="px-0 mt-6 text-accent hover:text-accent/80">
                Unlock full portfolio blueprints &rarr;
              </Button>
            </NextLink>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
