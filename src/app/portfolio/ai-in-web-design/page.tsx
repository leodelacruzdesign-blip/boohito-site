
'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { 
  ArrowLeft, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  ShieldCheck, 
  Cpu, 
  Accessibility,
  Download,
  Share2,
  Volume2,
  VolumeX,
  Loader2,
  Sparkles,
  Play
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import data from '@/data/portfolio/ai-in-web-design.json';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { generateNarration } from '@/ai/flows/tts-narration-flow';

const pageStyles = {
  bgDarkPrimary: 'bg-[#0d0e1b]',
  bgCard: 'bg-[#1a1b32]',
  textNeon: 'text-[#00f0ff]',
  borderNeon: 'border-[#00f0ff]',
  textSubtle: 'text-[#888]',
};

const chartConfig = {
  automation: { label: 'Automation', color: '#14b8a6' },
  workflow: { label: 'Workflow', color: '#38bdf8' },
  strategy: { label: 'Strategy', color: '#00f0ff' },
};

const QUIZ_CONTENT: Record<number, {
  question: string;
  options: { id: string; text: string; rationale: string; isCorrect: boolean }[];
  pillar: 'technical' | 'empathy' | 'accessibility';
}> = {
  1: {
    question: "In instructional design for Generative UI, what is the 'Orchestrator's' primary technical role?",
    pillar: 'technical',
    options: [
      { id: 'a', text: "Manually coding every interaction to ensure compliance.", isCorrect: false, rationale: "Manual coding fails the scalability test of adult learning simulations. Orchestration requires setting systemic guardrails." },
      { id: 'b', text: "Defining semantic tokens and constraints within the AI's training or prompt context.", isCorrect: true, rationale: "Modern instructional design for AI focuses on system constraints and semantic guardrails to ensure design system compliance at scale." },
      { id: 'c', text: "Replacing design systems with pure AI randomness.", isCorrect: false, rationale: "Instructional integrity requires brand consistency; randomness is the enemy of accessible learning." }
    ]
  },
  2: {
    question: "How does 'Adaptive Personalization' support Differentiated Instruction in E-Learning?",
    pillar: 'accessibility',
    options: [
      { id: 'a', text: "It creates a static path for all learners.", isCorrect: false, rationale: "Differentiated instruction requires dynamic paths based on individual learner profiles." },
      { id: 'b', text: "It dynamically adjusts interface complexity and contrast based on real-time learner behavior.", isCorrect: true, rationale: "AI-driven UX allows for 'Universal Design for Learning' (UDL), catering to diverse cognitive and physical needs in real-time." },
      { id: 'c', text: "It only works for video-based content.", isCorrect: false, rationale: "Adaptivity is an architectural layer applicable to all UI interactions." }
    ]
  },
  3: {
    question: "What is the 'Instructional Value' of Semantic Code Generation for technical simulations?",
    pillar: 'technical',
    options: [
      { id: 'a', text: "Ensuring code is readable and maintainable for future learner analysis.", isCorrect: true, rationale: "Clean, semantic code serves as a 'living textbook,' reducing technical debt and improving the learner's ability to deconstruct complex systems." },
      { id: 'b', text: "Generating code faster than a human can read it.", isCorrect: false, rationale: "Speed without readability hinders the pedagogical value of technical simulations." },
      { id: 'c', text: "Making code proprietary so it cannot be audited.", isCorrect: false, rationale: "Transparency is vital for ethical AI and inclusive instructional design." }
    ]
  },
  4: {
    question: "When applying 'Human-in-the-Loop' governance to AI modules, what is the 'Lead Auditor's' priority?",
    pillar: 'empathy',
    options: [
      { id: 'a', text: "Visual aesthetic and color balance.", isCorrect: false, rationale: "Aesthetics are secondary to the ethical integrity of the instructional experience." },
      { id: 'b', text: "Identifying and mitigating learned biases that could exclude specific demographics.", isCorrect: true, rationale: "Instructional empathy requires constant auditing of AI outputs to ensure they don't reinforce historical bias or stereotypes." },
      { id: 'c', text: "Allowing the AI to self-regulate its own ethics.", isCorrect: false, rationale: "Ethics are a human construct; AI models lack the moral agency required for social-impact projects." }
    ]
  },
  5: {
    question: "In an 'Autonomous Learning System,' which metric best indicates successful Instructional Design?",
    pillar: 'empathy',
    options: [
      { id: 'a', text: "Number of page reloads per user session.", isCorrect: false, rationale: "Reloads are often a sign of friction, not mastery." },
      { id: 'b', text: "Learner goal attainment and the quality of simulated decision-making.", isCorrect: true, rationale: "Adult learning principles prioritize performance-based outcomes and the successful application of knowledge in context." },
      { id: 'c', text: "The length of the module's loading screen.", isCorrect: false, rationale: "Loading speed is a technical requirement, not a measure of learning success." }
    ]
  }
};

export default function AiInWebDesignPage() {
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [validationId, setValidationId] = useState('');
  
  // E-Learning & Multimedia State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [moduleProgress, setModuleProgress] = useState<Record<number, boolean>>({});
  const [showFinalSummary, setShowFinalSummary] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isNarrationLoading, setIsNarrationLoading] = useState(false);
  const [hasStartedIntro, setHasStartedIntro] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    setValidationId(Math.random().toString(36).substr(2, 8).toUpperCase());
    
    const saved = localStorage.getItem('ai-web-design-learning-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setQuizAnswers(parsed.answers || {});
        setModuleProgress(parsed.progress || {});
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('ai-web-design-learning-progress', JSON.stringify({
        answers: quizAnswers,
        progress: moduleProgress
      }));
    }
  }, [quizAnswers, moduleProgress, isClient]);

  const totalModules = data.length;
  const completedModulesCount = Object.values(moduleProgress).filter(Boolean).length;
  const overallProgress = (completedModulesCount / totalModules) * 100;
  
  const scores = useMemo(() => {
    const s = { technical: 0, empathy: 0, accessibility: 0, total: 0 };
    Object.entries(quizAnswers).forEach(([moduleId, answerId]) => {
      const q = QUIZ_CONTENT[Number(moduleId)];
      const option = q.options.find(o => o.id === answerId);
      if (option?.isCorrect) {
        s[q.pillar] += 1;
        s.total += 1;
      }
    });
    return s;
  }, [quizAnswers]);

  const playNarration = async (text: string) => {
    if (!isAudioEnabled) return;
    setIsNarrationLoading(true);
    try {
      const { audioUri } = await generateNarration({ text });
      if (audioRef.current) {
        audioRef.current.src = audioUri;
        audioRef.current.play();
      }
    } catch (e) {
      console.error("Narration failed", e);
    } finally {
      setIsNarrationLoading(false);
    }
  };

  const handleStartIntro = () => {
    setHasStartedIntro(true);
    setIsAudioEnabled(true);
    const introText = "Future of AI and UX. Interactive simulations exploring the intersection of autonomous systems, 1:1 UX, and human-in-the-loop governance. Designed using adult learning principles for strategic leadership. Welcome to the Advanced Simulation Framework. This curriculum utilizes Scenario-Based Learning and Formative Assessments to validate strategic AI readiness. Successfully navigate all 5 knowledge gates to unlock your certification, mapping your performance against public-sector UX and Accessibility standards. Select a module below to begin your simulation journey.";
    playNarration(introText);
  };

  const handleSelect = (item: any) => {
    setSelectedItem(item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playNarration(item.intro);
  };

  const handleBack = () => {
    setSelectedItem(null);
    if (audioRef.current) audioRef.current.pause();
  };

  const handleQuizSubmit = (moduleId: number, optionId: string) => {
    const option = QUIZ_CONTENT[moduleId].options.find(o => o.id === optionId);
    setQuizAnswers(prev => ({ ...prev, [moduleId]: optionId }));
    setModuleProgress(prev => ({ ...prev, [moduleId]: true }));
    if (option) playNarration(option.rationale);
  };

  const resetModule = () => {
    setShowFinalSummary(false);
    setQuizAnswers({});
    setModuleProgress({});
    setSelectedItem(null);
    setHasStartedIntro(false);
  };

  return (
    <div className={cn("min-h-screen text-gray-200 antialiased font-sans", pageStyles.bgDarkPrimary)}>
      <Header />
      <audio ref={audioRef} className="hidden" />

      {isClient && (
        <div className="sticky top-16 z-40 bg-[#0d0e1b]/95 backdrop-blur-md border-b border-gray-800 px-4 py-4 mb-8 shadow-2xl">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1 w-full max-w-md">
              <div className="flex justify-between items-center mb-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                <span>Learning Pathway</span>
                <span className={pageStyles.textNeon}>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-1.5 bg-gray-800" />
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-full border border-gray-800">
                {isNarrationLoading ? <Loader2 className="h-4 w-4 animate-spin text-[#00f0ff]" /> : 
                 isAudioEnabled ? <Volume2 className="h-4 w-4 text-[#00f0ff]" /> : <VolumeX className="h-4 w-4 text-gray-500" />}
                <Switch 
                  id="audio-narration" 
                  checked={isAudioEnabled} 
                  onCheckedChange={setIsAudioEnabled} 
                  className="scale-75 data-[state=checked]:bg-[#00f0ff]"
                />
                <Label htmlFor="audio-narration" className="text-[10px] uppercase font-bold text-gray-400">Audio Narration</Label>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant="outline" className="border-gray-700 text-gray-400 text-[10px] px-3">
                  {completedModulesCount} / {totalModules} Modules
                </Badge>
                {completedModulesCount === totalModules && (
                  <Button 
                    size="sm" 
                    onClick={() => setShowFinalSummary(true)}
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_15px_rgba(212,152,255,0.3)]"
                  >
                    <Trophy className="mr-2 h-4 w-4" /> Certification
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="pb-24 pt-8 px-4 sm:px-8">
        <div className="container mx-auto">
          {!showFinalSummary && (
            <header className="mb-12 text-center max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/20 text-[#00f0ff] text-[10px] font-black uppercase tracking-widest">
                <Sparkles className="h-3 w-3" /> Instructional Design Blueprint
              </div>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter text-white mb-6">
                {selectedItem ? selectedItem.title.split('. ')[1] : "Future of AI & UX"}
              </h1>
              {!selectedItem && (
                <div className="space-y-6">
                  <p className="text-xl text-gray-400 font-medium leading-relaxed">
                    Interactive simulations exploring the intersection of autonomous systems, 1:1 UX, 
                    and human-in-the-loop governance. Designed using adult learning principles for strategic leadership.
                  </p>
                  {!hasStartedIntro && (
                    <Button 
                      onClick={handleStartIntro}
                      size="lg"
                      className="bg-accent text-accent-foreground hover:bg-accent/90 px-10 py-6 text-lg font-black uppercase tracking-widest rounded-full shadow-lg shadow-accent/20"
                    >
                      <Volume2 className="mr-3 h-6 w-6" /> Begin Certification Journey
                    </Button>
                  )}
                </div>
              )}
            </header>
          )}

          <div id="content-area">
            {showFinalSummary ? (
              <PerformanceSummary scores={scores} totalModules={totalModules} reset={resetModule} validationId={validationId} />
            ) : (
              selectedItem ? (
                <DetailView 
                  item={selectedItem} 
                  handleBack={handleBack} 
                  moduleProgress={moduleProgress} 
                  quizAnswers={quizAnswers}
                  handleQuizSubmit={handleQuizSubmit}
                  handleSelect={handleSelect}
                  isClient={isClient}
                />
              ) : (
                <div className="space-y-12">
                   {/* Advanced Simulation Framework */}
                   <Card className="bg-[#1a1b32]/30 border-dashed border-gray-800">
                    <CardContent className="p-10">
                      <div className="flex flex-col md:flex-row gap-10 items-center">
                          <div className="bg-[#00f0ff]/5 p-6 rounded-2xl border border-[#00f0ff]/10">
                            <BookOpen className="h-12 w-12 text-[#00f0ff]" />
                          </div>
                          <div className="flex-1 text-center md:text-left space-y-2">
                            <h3 className="text-2xl font-black text-white">Advanced Simulation Framework</h3>
                            <p className="text-gray-400 max-w-2xl text-base leading-relaxed">
                              This curriculum utilizes <strong>Scenario-Based Learning</strong> and <strong>Formative Assessments</strong> to validate strategic AI readiness. 
                              Successfully navigate all 5 knowledge gates to unlock your certification, mapping your performance against public-sector UX and Accessibility standards.
                            </p>
                          </div>
                      </div>
                    </CardContent>
                  </Card>

                  <LandingGrid data={data} moduleProgress={moduleProgress} quizAnswers={quizAnswers} onSelect={handleSelect} isClient={isClient} />
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function LandingGrid({ data, moduleProgress, quizAnswers, onSelect, isClient }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((item: any) => {
        const isCompleted = isClient && moduleProgress[item.id];
        const isCorrect = isCompleted && QUIZ_CONTENT[item.id].options.find(o => o.id === quizAnswers[item.id])?.isCorrect;

        return (
          <Card 
            key={item.id}
            onClick={() => onSelect(item)}
            className={cn(
              "group cursor-pointer transition-all duration-500 border-gray-800 bg-[#1a1b32] hover:border-[#00f0ff] hover:shadow-[0_0_30px_rgba(0,240,255,0.1)] overflow-hidden",
              isCompleted && "border-[#00f0ff]/20"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-8 h-8 rounded flex items-center justify-center font-black text-xs transition-colors",
                  isCompleted ? "bg-[#00f0ff] text-black" : "bg-black/40 text-gray-600 group-hover:text-[#00f0ff]"
                )}>
                  {item.id}
                </div>
                <CardTitle className="text-lg font-bold text-white group-hover:text-[#00f0ff]">
                  {item.title.split('. ')[1]}
                </CardTitle>
              </div>
              {isCompleted && (
                isCorrect ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <XCircle className="h-5 w-5 text-orange-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full mb-6 rounded-lg overflow-hidden border border-gray-800 bg-black/60">
                 <Image
                  src={item.image_id}
                  alt={item.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-700 scale-100 group-hover:scale-105"
                  data-ai-hint="instructional graphic"
                />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-6 italic">
                "{item.intro}"
              </p>
              <div className="flex items-center justify-between mt-auto border-t border-gray-800/50 pt-4">
                <span className="text-[10px] uppercase font-black tracking-widest text-gray-500">
                  {item.subtitle}
                </span>
                <Button variant="ghost" size="sm" className="p-0 h-auto text-[#00f0ff] hover:bg-transparent text-xs font-bold uppercase tracking-tighter">
                  {isCompleted ? "Review Lab" : "Enter Simulation"} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function DetailView({ item, handleBack, moduleProgress, quizAnswers, handleQuizSubmit, handleSelect, isClient }: any) {
  const isCompleted = isClient && moduleProgress[item.id];
  const chartData = [{ name: 'Focus', automation: item.chartData[0], workflow: item.chartData[1], strategy: item.chartData[2] }];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex justify-between items-center mb-12">
        <Button onClick={handleBack} variant="ghost" className="flex items-center text-gray-400 hover:text-white group">
          <ArrowLeft className="mr-3 h-4 w-4 transition-transform group-hover:-translate-x-2" /> 
          <span className="text-xs uppercase font-black tracking-widest">Exit to Curriculum</span>
        </Button>
        <div className="flex items-center gap-4">
          {item.id > 1 && (
            <Button onClick={() => handleSelect(data[item.id - 2])} variant="outline" size="sm" className="border-gray-800 text-[10px] font-bold uppercase">
                <ChevronLeft className="mr-2 h-4 w-4" /> Prev Module
            </Button>
          )}
          {item.id < data.length && (
            <Button onClick={() => handleSelect(data[item.id])} variant="outline" size="sm" className="border-gray-800 text-[10px] font-bold uppercase">
                Next Module <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-16">
        <div className="space-y-12">
          <header className="space-y-6">
            <Badge variant="outline" className={cn("border-[#00f0ff]/30 text-[#00f0ff] uppercase tracking-[0.2em] text-[10px] py-1 px-4", isCompleted && "bg-[#00f0ff]/5")}>
              {isCompleted ? "Simulation Finalized" : "Active Research Lab"}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">{item.subtitle}</h2>
            <p className="text-xl text-gray-400 leading-relaxed italic border-l-2 border-[#00f0ff]/30 pl-6">
              {item.intro}
            </p>
          </header>

          <div className="space-y-6">
            <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] flex items-center gap-4">
               <div className="w-10 h-px bg-[#00f0ff]" /> Core Instructional Directives
            </h3>
            <ul className="grid grid-cols-1 gap-6">
              {item.points.map((point: string, i: number) => {
                const [label, desc] = point.split(': ');
                return (
                  <li key={i} className="bg-white/[0.02] p-6 rounded-xl border border-white/5 hover:border-[#00f0ff]/20 transition-all duration-300">
                    <strong className="text-[#00f0ff] block mb-2 font-black uppercase text-xs tracking-widest">{label}</strong>
                    <span className="text-gray-400 text-sm leading-relaxed">{desc}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <KnowledgeCheck moduleId={item.id} quizAnswers={quizAnswers} handleQuizSubmit={handleQuizSubmit} isClient={isClient} />
        </div>

        <aside className="space-y-10">
          <Card className="bg-[#1a1b32] border-gray-800 overflow-hidden shadow-2xl">
            <div className="relative aspect-[16/10] w-full bg-black/60">
              <Image src={item.image_id} alt={item.title} fill className="object-cover opacity-70" data-ai-hint="learning asset" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a1b32] to-transparent" />
            </div>
            <CardContent className="p-8">
              <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">Pedagogical Weight Distribution</h3>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={chartData} margin={{ left: -30 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" hide />
                    <ChartTooltip cursor={{ fill: 'rgba(255, 255, 255, 0.05)' }} content={<ChartTooltipContent indicator="dot" />} />
                    <Bar dataKey="automation" fill="var(--color-automation)" stackId="a" radius={[4, 0, 0, 4]}/>
                    <Bar dataKey="workflow" fill="var(--color-workflow)" stackId="a" />
                    <Bar dataKey="strategy" fill="var(--color-strategy)" stackId="a" radius={[0, 4, 4, 0]}/>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="mt-8 grid grid-cols-1 gap-3">
                 {Object.entries(chartConfig).map(([key, config]) => (
                   <div key={key} className="flex justify-between items-center text-[10px] font-bold tracking-widest uppercase text-gray-500">
                      <span className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: config.color }} />
                        {config.label}
                      </span>
                      <span className="text-white">{chartData[0][key as keyof typeof chartData[0]]}%</span>
                   </div>
                 ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#1a1b32]/50 border-gray-800 p-8 space-y-6">
             <h3 className="text-[10px] font-black text-[#00f0ff] uppercase tracking-widest flex items-center gap-3">
               <BookOpen className="h-4 w-4" /> Instructional Context
             </h3>
             <div className="space-y-6">
                <div className="group">
                  <p className="text-[8px] font-black text-gray-500 uppercase mb-2 tracking-widest">Adult Learning (Andragogy)</p>
                  <p className="text-xs text-gray-300 group-hover:text-white transition-colors leading-relaxed">Focus on problem-centered learning and the immediate application of AI governance principles.</p>
                </div>
                <div className="group">
                  <p className="text-[8px] font-black text-gray-500 uppercase mb-2 tracking-widest">Simulated Development</p>
                  <p className="text-xs text-gray-300 group-hover:text-white transition-colors leading-relaxed">Utilizing <strong>Articulate Rise</strong> inspired modularity for high-fidelity interactive technical training.</p>
                </div>
             </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function KnowledgeCheck({ moduleId, quizAnswers, handleQuizSubmit, isClient }: any) {
  const quiz = QUIZ_CONTENT[moduleId];
  const selectedAnswerId = isClient ? quizAnswers[moduleId] : null;
  const isAnswered = !!selectedAnswerId;

  return (
    <div className="mt-12 pt-12 border-t border-gray-800 animate-in fade-in duration-1000">
      <div className="flex items-center gap-4 mb-8">
        <Badge className="bg-[#00f0ff] text-black hover:bg-[#00f0ff] font-black text-[10px] uppercase tracking-widest px-4 py-1">Scenario Check</Badge>
        <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">Skill Pillar: {quiz.pillar}</span>
      </div>
      <h4 className="text-2xl font-black text-white mb-10 leading-snug">
        {quiz.question}
      </h4>
      <div className="space-y-4">
        {quiz.options.map((option) => {
          const isSelected = selectedAnswerId === option.id;
          const showSuccess = isAnswered && option.isCorrect;
          const showFailure = isAnswered && isSelected && !option.isCorrect;

          return (
            <button
              key={option.id}
              disabled={isAnswered}
              onClick={() => handleQuizSubmit(moduleId, option.id)}
              className={cn(
                "w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-6 group",
                !isAnswered && "border-gray-800 bg-black/40 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/5",
                isAnswered && !isSelected && "border-gray-900 opacity-40",
                showSuccess && "border-green-500/50 bg-green-500/10",
                showFailure && "border-red-500/50 bg-red-500/10"
              )}
            >
              <div className={cn(
                "mt-0.5 h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                !isAnswered && "border-gray-700 group-hover:border-[#00f0ff]",
                showSuccess && "border-green-500 bg-green-500 text-black",
                showFailure && "border-red-500 bg-red-500 text-white"
              )}>
                {showSuccess && <CheckCircle2 className="h-4 w-4" />}
                {showFailure && <XCircle className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className={cn("font-bold text-lg", isAnswered && option.isCorrect ? "text-green-400" : "text-gray-300")}>
                  {option.text}
                </p>
                {isSelected && (
                  <div className={cn(
                    "mt-4 text-sm p-4 rounded-lg animate-in slide-in-from-top-2 duration-500 leading-relaxed",
                    option.isCorrect ? "bg-green-500/10 text-green-300" : "bg-red-500/10 text-red-300"
                  )}>
                    <strong className="uppercase text-[10px] font-black tracking-widest mb-2 block">Instructional Rationale</strong>
                    {option.rationale}
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function PerformanceSummary({ scores, totalModules, reset, validationId }: any) {
  const grade = (scores.total / totalModules) * 100;
  
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in duration-1000">
      <div className="text-center mb-16 space-y-4">
         <div className="relative inline-block">
           <Trophy className="h-24 w-24 text-[#00f0ff] mx-auto" />
           <div className="absolute inset-0 animate-ping bg-[#00f0ff]/20 rounded-full -z-10" />
         </div>
         <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter">Curriculum Mastery</h2>
         <p className="text-gray-400 text-xl font-medium tracking-tight">Professional Certification: AI Design Strategy</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <Card className="bg-[#1a1b32] border-[#00f0ff]/30 p-10 shadow-[0_0_50px_rgba(0,240,255,0.1)]">
            <CardHeader className="px-0 pt-0 mb-8">
              <CardTitle className="text-2xl font-black text-white flex items-center gap-4">
                <ShieldCheck className="text-[#00f0ff] h-8 w-8" /> Skill Proficiency
              </CardTitle>
            </CardHeader>
            <div className="space-y-10">
               <SkillItem label="Technical Proficiency" score={scores.technical} max={2} icon={Cpu} color="#38bdf8" />
               <SkillItem label="Instructional Empathy" score={scores.empathy} max={2} icon={ShieldCheck} color="#14b8a6" />
               <SkillItem label="Accessibility Compliance" score={scores.accessibility} max={1} icon={Accessibility} color="#00f0ff" />
            </div>
         </Card>

         <Card className="bg-[#1a1b32] border-gray-800 p-2 overflow-hidden">
            <div className="bg-[#0d0e1b] border-2 border-[#00f0ff] p-10 rounded-xl relative overflow-hidden flex flex-col items-center text-center">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-150 rotate-12">
                  <Sparkles className="h-64 w-64" />
               </div>
               
               <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-8 flex items-center gap-3">
                     <div className="w-16 h-px bg-[#00f0ff]/30" />
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f0ff]">Instructional Excellence</span>
                     <div className="w-16 h-px bg-[#00f0ff]/30" />
                  </div>
                  
                  <h4 className="text-3xl font-black text-white mb-2 leading-none uppercase italic tracking-tighter">AI Design Strategist</h4>
                  <p className="text-gray-500 text-[10px] mb-12 uppercase font-bold tracking-widest">Validation ID: BHT-AID-{validationId}</p>
                  
                  <div className="grid grid-cols-3 w-full gap-8 mb-12 border-y border-gray-800 py-8">
                     <div>
                        <p className="text-3xl font-black text-white">{Math.round(grade)}%</p>
                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Mastery</p>
                     </div>
                     <div className="border-x border-gray-800">
                        <p className="text-3xl font-black text-white">{totalModules}</p>
                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Labs</p>
                     </div>
                     <div>
                        <p className="text-3xl font-black text-white">PRO</p>
                        <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mt-1">Status</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                    <Button size="lg" variant="outline" className="border-gray-800 text-gray-400 hover:text-white hover:bg-white/5 font-bold uppercase text-[10px] tracking-widest">
                       <Download className="mr-2 h-4 w-4" /> PDF Log
                    </Button>
                    <Button size="lg" className="bg-[#00f0ff] text-black hover:bg-[#00f0ff]/90 font-black uppercase text-[10px] tracking-widest px-8">
                       <Share2 className="mr-2 h-4 w-4" /> Export
                    </Button>
                  </div>
               </div>
            </div>
         </Card>
      </div>

      <div className="flex justify-center pt-16">
         <Button variant="link" onClick={reset} className="text-gray-600 hover:text-[#00f0ff] text-[10px] font-black uppercase tracking-[0.3em] transition-colors">
           Reset Simulation State & Restart Journey
         </Button>
      </div>
    </div>
  );
}

function SkillItem({ label, score, max, icon: Icon, color }: any) {
  const pct = (score / max) * 100;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
        <span className="flex items-center gap-3"><Icon className="h-4 w-4" style={{ color }} /> {label}</span>
        <span style={{ color }}>{score} / {max}</span>
      </div>
      <Progress value={pct} className="h-2 bg-black/40" style={{ '--primary': color } as any} />
    </div>
  );
}
