
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useUser, useFirestore } from '@/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { 
  CheckCircle, 
  Layers, 
  Compass, 
  Sliders, 
  Workflow, 
  CheckSquare, 
  RotateCcw, 
  Search, 
  Filter, 
  Info, 
  Award, 
  Sparkles, 
  ArrowRight, 
  Database, 
  Layout, 
  Plus, 
  Trash2, 
  MoveUp, 
  MoveDown, 
  Printer, 
  X, 
  Smartphone,
  Check,
  ShieldCheck,
  Zap,
  Volume2,
  VolumeX,
  Loader2,
  MousePointer2,
  Cpu,
  BookOpen
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateNarration } from '@/ai/flows/tts-narration-flow';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Wireframe component catalog
const WIREFRAME_CATALOG = [
  { id: 'header', name: 'Header / Logo Bar', icon: '🔝', category: 'Navigation', ruleHint: 'Best at top of layout' },
  { id: 'hero', name: 'Hero Banner Image', icon: '🖼️', category: 'Media', ruleHint: 'Sets visual context' },
  { id: 'headline', name: 'Value Proposition Text', icon: '📝', category: 'Content', ruleHint: 'Crucial for immediate clarity' },
  { id: 'cta_primary', name: 'Primary Call to Action', icon: '🔴', category: 'Action', ruleHint: 'Must be prominent and unambiguous' },
  { id: 'cta_secondary', name: 'Secondary Action Link', icon: '⚪', category: 'Action', ruleHint: 'Subordinated to primary CTA' },
  { id: 'features', name: 'Feature Grid / Bullets', icon: '⚡', category: 'Content', ruleHint: 'Reduces cognitive friction' },
  { id: 'footer', name: 'Footer & Legal Nav', icon: '🔚', category: 'Navigation', ruleHint: 'Always at bottom' }
];

export default function UxMasterclassPage() {
  const { user } = useUser();
  const db = useFirestore();
  const appId = 'ux-masterclass-app';

  // Navigation & Progress State
  const [isClient, setIsClient] = useState(false);
  const [certId, setCertId] = useState('');
  const [activeTab, setActiveTab] = useState('mod1');
  const [completedSections, setCompletedSections] = useState({
    mod1_foundations: false,
    mod2_psychology: false,
    mod3_workflow: false,
    mod4_audit: false
  });

  const [syncStatus, setSyncStatus] = useState('idle');
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isNarrationLoading, setIsNarrationLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Certificate Modal State
  const [showCertModal, setShowCertModal] = useState(false);
  const [learnerName, setLearnerName] = useState('UX Design Specialist');

  // Module 1 Interactive States
  const [journeyType, setJourneyType] = useState<'linear' | 'organic'>('linear');
  const [marioStep, setMarioStep] = useState(0);
  const [zeldaNodes, setZeldaNodes] = useState<string[]>([]);

  // Module 2 - Hick's Law
  const [hicksMode, setHicksMode] = useState<'chaos' | 'minimal'>('chaos');
  const [hicksSimulatedTime, setHicksSimulatedTime] = useState<string | null>(null);

  // Module 2 - Progressive Disclosure
  const [isMoreChoicesOpen, setIsMoreChoicesOpen] = useState(false);

  // Module 3 - Creative Loop
  const [activeWorkflowPhase, setActiveWorkflowPhase] = useState('brief');
  const [activePhaseCard, setActivePhaseCard] = useState('ideation');

  // Module 3 - Wireframe Canvas State (Simulation Mode)
  const [canvasItems, setCanvasItems] = useState<any[]>([
    { instanceId: 'init-1', ...WIREFRAME_CATALOG[4] }, // Secondary CTA (Bad Position)
    { instanceId: 'init-2', ...WIREFRAME_CATALOG[2] }, // Headline
    { instanceId: 'init-3', ...WIREFRAME_CATALOG[0] }  // Header (Bad Position)
  ]);
  const [protoValidation, setProtoValidation] = useState<any>(null);

  // Module 4 - Usability Checklist
  const [checklistScores, setChecklistScores] = useState<Record<string, 'pass' | 'fail' | null>>({
    wayfinding: null,
    clarity: null,
    affordance: null,
    feedback: null,
    readability: null,
    errorHandling: null
  });

  useEffect(() => {
    setIsClient(true);
    setCertId(Math.random().toString(36).substr(2, 6).toUpperCase());
  }, []);

  // AI Narration Logic
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

  // Sync state with Firestore
  useEffect(() => {
    if (!user || !db || !isClient) return;
    setSyncStatus('syncing');
    const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'progress', 'masterclass');
    const unsubscribe = onSnapshot(userDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.completedSections) setCompletedSections(data.completedSections);
        if (data.learnerName) setLearnerName(data.learnerName);
      }
      setSyncStatus('synced');
    }, async (serverError) => {
      const permissionError = new FirestorePermissionError({
        path: userDocRef.path,
        operation: 'get',
      } satisfies SecurityRuleContext);
      errorEmitter.emit('permission-error', permissionError);
      setSyncStatus('idle');
    });
    return () => unsubscribe();
  }, [user, db, isClient]);

  const toggleSectionCompletion = async (key: string) => {
    const updated = { ...completedSections, [key as keyof typeof completedSections]: true };
    setCompletedSections(updated);
    if (user && db) {
      setSyncStatus('syncing');
      const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'progress', 'masterclass');
      setDoc(userDocRef, { 
        completedSections: updated,
        learnerName,
        lastUpdated: new Date().toISOString() 
      }, { merge: true })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'write',
          requestResourceData: updated,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
      setSyncStatus('synced');
    }
    
    // Narrate completion rationale
    const rationale = `Module ${key.split('_')[0].toUpperCase()} validated. This structural pillar is now part of your architectural competency matrix.`;
    playNarration(rationale);
  };

  const handleNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setLearnerName(newName);
    if (user && db) {
      const userDocRef = doc(db, 'artifacts', appId, 'users', user.uid, 'progress', 'masterclass');
      setDoc(userDocRef, { learnerName: newName }, { merge: true })
      .catch(async () => {
        const permissionError = new FirestorePermissionError({
          path: userDocRef.path,
          operation: 'update',
          requestResourceData: { learnerName: newName },
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      });
    }
  };

  // Canvas Prototyping Handlers
  const addElementToCanvas = (item: any) => {
    const newInstance = { ...item, instanceId: `elem-${Date.now()}-${Math.random()}` };
    setCanvasItems([...canvasItems, newInstance]);
    setProtoValidation(null);
  };

  const removeElementFromCanvas = (index: number) => {
    const updated = [...canvasItems];
    updated.splice(index, 1);
    setCanvasItems(updated);
    setProtoValidation(null);
  };

  const moveCanvasItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === canvasItems.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...canvasItems];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setCanvasItems(updated);
    setProtoValidation(null);
  };

  const validateWireframe = () => {
    const ids = canvasItems.map(i => i.id);
    const issues = [];
    const wins = [];
    if (ids.length > 0 && ids[0] === 'header') wins.push('Header is correctly prioritized at top.');
    else issues.push('Wayfinding error: Header is missing or incorrectly placed.');
    
    const headlineIdx = ids.indexOf('headline');
    if (headlineIdx !== -1 && headlineIdx <= 2) wins.push('Value proposition is above the fold.');
    else issues.push('Hierarchy error: Value proposition is buried too deep.');
    
    if (ids.includes('cta_primary')) wins.push('Primary affordance (CTA) is visible.');
    else issues.push('Affordance error: Missing clear primary action.');
    
    const isPassed = issues.length === 0;
    setProtoValidation({ passed: isPassed, wins, issues, score: Math.max(0, 100 - issues.length * 25) });

    const feedbackText = isPassed 
      ? "Hierarchy validated. Your structural arrangement minimizes cognitive friction and follows standard wayfinding patterns."
      : "Hierarchy issues detected. In UX design, the most critical decision-driving elements must be placed high in the visual Z-pattern.";
    playNarration(feedbackText);
  };

  const totalSections = Object.keys(completedSections).length;
  const completedCount = isClient ? Object.values(completedSections).filter(Boolean).length : 0;
  const progressPercentage = Math.round((completedCount / totalSections) * 100);

  const therapeuticsData = [
    {
      id: 'oncology',
      title: 'Oncology',
      icon: '🧬',
      desc: 'Genomic data visualization and clinical trial pathways designed for complex medical workflows.',
      priority: 'High Complexity',
    },
    {
      id: 'pediatrics',
      title: 'Pediatrics',
      icon: '🧸',
      desc: 'Engaging, approachable interfaces tailored for young patients and family care coordination.',
      priority: 'Medium Priority',
    },
    {
      id: 'infectious',
      title: 'Infectious Disease',
      icon: '🛡️',
      desc: 'Epidemiological dashboards and real-time vaccine distribution tracking systems.',
      priority: 'High Accuracy',
    },
    {
      id: 'rare',
      title: 'Rare Disease',
      icon: '💎',
      desc: 'Patient registry interfaces and specialized genetic tracking configurations.',
      priority: 'Critical Data Integrity',
    },
    {
      id: 'neurology',
      title: 'Neurology',
      icon: '🧠',
      desc: 'Neuro-imaging interfaces and cognitive monitoring suites prioritized for clear readability and ambient visual hierarchy.',
      priority: 'High Accuracy',
    },
  ];

  const [selectedHotspot, setSelectedHotspot] = useState<any>(therapeuticsData[4]);

  const phaseCards = [
    { id: 'ideation', title: 'Ideation', icon: Sparkles, desc: 'Persona extraction and predictive journey mapping.', key: 'A' },
    { id: 'blueprints', title: 'Blueprints', icon: Layout, desc: 'Low-fidelity wireframing focused on spatial arrangement.', key: 'B' },
    { id: 'branding', title: 'Branding', icon: Layers, desc: 'Applying design system tokens and visual semantics.', key: 'C' },
    { id: 'naturalui', title: 'Natural UI', icon: Cpu, desc: 'High-fidelity deployment with intuitive, adaptive flows.', key: 'D' },
  ];

  const handlePrintCertificate = () => window.print();

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    let introText = "";
    if (tabId === 'mod1') introText = "Module 1: Foundations of UX. We explore linear versus organic user journeys to understand how users traverse complex information architectures.";
    if (tabId === 'mod2') introText = "Module 2: Structuring Content. Learn to apply Hick's Law and progressive disclosure to reduce cognitive load and accelerate user decision making.";
    if (tabId === 'mod3') introText = "Module 3: The Creative Workflow. Transition from traditional waterfalls to experiential loops. Test your skills in our high-stakes hierarchy simulation.";
    if (tabId === 'mod4') introText = "Module 4: The Usability Diagnostic. Audit your interfaces against core usability pillars including wayfinding, affordance, and error prevention.";
    playNarration(introText);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">
      <Header />
      <audio ref={audioRef} className="hidden" />
      
      {/* Module Header */}
      <header className="sticky top-16 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-lg print:hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-600/20 text-indigo-400 rounded-lg border border-indigo-500/30">
                    <Layers className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-indigo-400">
                        UX Design Masterclass
                    </h1>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest">Architectural Learning Engine</p>
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 bg-black/40 px-3 py-1.5 rounded-full border border-slate-800">
                  {isNarrationLoading ? <Loader2 className="h-4 w-4 animate-spin text-indigo-400" /> : 
                   isAudioEnabled ? <Volume2 className="h-4 w-4 text-indigo-400" /> : <VolumeX className="h-4 w-4 text-slate-500" />}
                  <Switch 
                    id="audio-toggle" 
                    checked={isAudioEnabled} 
                    onCheckedChange={setIsAudioEnabled} 
                    className="scale-75 data-[state=checked]:bg-indigo-600"
                  />
                  <Label htmlFor="audio-toggle" className="text-[10px] uppercase font-bold text-slate-400">AI Narration</Label>
                </div>

                <div className="hidden lg:flex items-center space-x-2 text-[10px] bg-slate-800/80 px-3 py-1.5 rounded-full border border-slate-700/50">
                    <Database className="w-3.5 h-3.5 text-indigo-400" />
                    <span className="text-slate-300 uppercase">{user ? 'Cloud Sync Active' : 'Local Session'}</span>
                    {syncStatus === 'syncing' && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
                    {syncStatus === 'synced' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <button onClick={() => setShowCertModal(true)} className={cn("flex items-center space-x-2 px-4 py-2 rounded-lg border text-xs font-black uppercase tracking-widest transition-all", progressPercentage === 100 ? "bg-emerald-600/30 border-emerald-500 text-emerald-200 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.2)]" : "bg-indigo-950/60 border-indigo-800/50 text-indigo-200")}>
                    <Award className="w-4 h-4" />
                    <span>{progressPercentage}% Mastered</span>
                </button>
            </div>
          </div>

          <div className="flex space-x-4 mt-4 overflow-x-auto scrollbar-none border-t border-slate-800/50 pt-3">
             {[
                { id: 'mod1', icon: Compass, label: '1. Foundations' },
                { id: 'mod2', icon: Sliders, label: '2. Psychology' },
                { id: 'mod3', icon: Workflow, label: '3. Workflow' },
                { id: 'mod4', icon: CheckSquare, label: '4. Audit' }
             ].map((tab) => (
                <button key={tab.id} onClick={() => handleTabChange(tab.id)} className={cn("flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-md whitespace-nowrap transition-all", activeTab === tab.id ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800")}>
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                </button>
             ))}
          </div>
        </div>
        <div className="w-full bg-slate-800 h-1">
          <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 h-1 transition-all duration-500" style={{ width: `${progressPercentage}%` }} />
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12 print:hidden">
        {/* Module 1: Foundations */}
        {activeTab === 'mod1' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
                <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Section 01</span>
                        <h2 className="text-4xl font-black text-white mt-2 mb-4 tracking-tighter">Architecture & User Journeys</h2>
                        <p className="text-slate-400 text-lg leading-relaxed italic">
                            "UX is the holistic aggregate of every touchpoint. It is the architectural discipline of minimizing friction while maximizing user agency."
                        </p>
                    </div>
                    <button onClick={() => toggleSectionCompletion('mod1_foundations')} className={cn("flex items-center space-x-2 px-6 py-3 rounded-full border text-xs font-black uppercase tracking-widest transition-all", (isClient && completedSections.mod1_foundations) ? "bg-emerald-900/40 border-emerald-500/50 text-emerald-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}>
                        <CheckCircle className="w-4 h-4" />
                        <span>{(isClient && completedSections.mod1_foundations) ? 'Pillar Validated' : 'Complete Module'}</span>
                    </button>
                </div>
            </div>

            {/* Understanding User Experience & Pathways - Interactive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  id: '01', 
                  title: 'Holistic Touchpoints', 
                  content: "UX isn't just visual UI design. It encompasses customer service, load speeds, packaging, onboarding, email copy, and error resolution." 
                },
                { 
                  id: '02', 
                  title: 'Cognitive & Emotional', 
                  content: "Great UX minimizes frustration and cognitive friction. It creates feelings of mastery, speed, predictability, and delight." 
                },
                { 
                  id: '03', 
                  title: 'Business Value', 
                  content: "Streamlined user journeys directly correlate with higher conversion rates, reduced churn, lower support overhead, and brand loyalty." 
                }
              ].map((card) => (
                <div 
                  key={card.id} 
                  className="group relative bg-slate-900/60 border border-slate-800 p-8 rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:border-indigo-500/50 hover:bg-slate-900/80 cursor-pointer shadow-xl min-h-[200px] flex flex-col justify-center"
                >
                  <div className="absolute top-6 right-8 text-6xl font-black text-indigo-500/5 group-hover:text-indigo-500/10 transition-colors duration-500">{card.id}</div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-black text-white group-hover:text-indigo-400 transition-colors duration-500 mb-4">{card.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {card.content}
                    </p>
                    <div className="mt-6 flex items-center text-[10px] font-black uppercase tracking-widest text-indigo-500/60 group-hover:text-indigo-400 transition-colors">
                      <span className="group-hover:mr-2 transition-all">Discover Pillar</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 gap-8">
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl group">
                    <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-bold text-white flex items-center gap-3">
                            <Sparkles className="w-5 h-5 text-indigo-400" /> Journey Archetypes
                        </h3>
                        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                            <button onClick={() => setJourneyType('linear')} className={cn("px-3 py-1.5 text-[10px] font-black uppercase rounded-lg", journeyType === 'linear' ? "bg-indigo-600 text-white" : "text-slate-500")}>Linear</button>
                            <button onClick={() => setJourneyType('organic')} className={cn("px-3 py-1.5 text-[10px] font-black uppercase rounded-lg", journeyType === 'organic' ? "bg-indigo-600 text-white" : "text-slate-500")}>Organic</button>
                        </div>
                    </div>
                    {journeyType === 'linear' ? (
                        <div className="space-y-6">
                            <p className="text-sm text-slate-400"><strong>Prescriptive Flow:</strong> Users must complete Task A to reach Task B. Essential for high-stakes conversion funnels.</p>
                            <div className="flex justify-between items-start bg-slate-950 p-6 rounded-2xl border border-slate-800 h-44">
                                {[
                                  { label: 'Start (Level 1-1)' },
                                  { label: 'Obstacle / Task' },
                                  { label: 'Power-up / Checkpoint' },
                                  { label: 'Flagpole / Goal' }
                                ].map((step, s) => (
                                    <div key={s} className="flex flex-col items-center gap-3">
                                      <div 
                                        onClick={() => setMarioStep(s)} 
                                        className={cn(
                                          "w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-xs cursor-pointer transition-all", 
                                          marioStep === s ? "bg-amber-500 border-white text-black scale-125 shadow-lg" : marioStep > s ? "bg-emerald-500 border-emerald-400" : "bg-slate-900 border-slate-700 text-slate-600"
                                        )}
                                      >
                                          {marioStep > s ? '✓' : s + 1}
                                      </div>
                                      <span className={cn("text-[9px] font-bold uppercase tracking-tight text-center max-w-[64px] transition-colors leading-tight", marioStep === s ? "text-amber-400" : "text-slate-500")}>
                                        {step.label}
                                      </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <p className="text-sm text-slate-400"><strong>Exploratory Flow:</strong> Non-linear architecture. Users discover features based on intent. Ideal for SaaS dashboards.</p>
                            <div className="grid grid-cols-2 gap-3 min-h-40">
                                {[
                                    { id: 'shrine', name: 'Shrine Quest', desc: 'Mini-tutorials & skills' },
                                    { id: 'tower', name: 'Map Tower', desc: 'Reveal information hierarchy' },
                                    { id: 'beast', name: 'Divine Beast', desc: 'Major feature milestone' },
                                    { id: 'ganon', name: 'Ganon / Boss', desc: 'Ultimate goal completion' }
                                ].map((node) => (
                                    <button 
                                      key={node.id} 
                                      onClick={() => setZeldaNodes(prev => prev.includes(node.name) ? prev.filter(n => n !== node.name) : [...prev, node.name])} 
                                      className={cn(
                                        "p-3 rounded-xl border-2 text-left transition-all flex flex-col justify-center", 
                                        zeldaNodes.includes(node.name) ? "bg-teal-900/40 border-teal-400 text-teal-200" : "bg-slate-950 border-slate-800 text-slate-600"
                                      )}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-tight">{node.name}</span>
                                        <span className="text-[8px] opacity-70 leading-tight mt-1">{node.desc}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
        )}

        {/* Module 2: Psychology */}
        {activeTab === 'mod2' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
                 <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Section 02</span>
                        <h2 className="text-4xl font-black text-white mt-2 mb-4 tracking-tighter">Psychology & Hick's Law</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">Reducing cognitive friction through progressive disclosure and optimized choice sets.</p>
                    </div>
                    <button onClick={() => toggleSectionCompletion('mod2_psychology')} className={cn("flex items-center space-x-2 px-6 py-3 rounded-full border text-xs font-black uppercase tracking-widest transition-all", (isClient && completedSections.mod2_psychology) ? "bg-emerald-900/40 border-emerald-500/50 text-emerald-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}>
                        <CheckCircle className="w-4 h-4" />
                        <span>{(isClient && completedSections.mod2_psychology) ? 'Psychology Validated' : 'Complete Module'}</span>
                    </button>
                </div>
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-[2rem] overflow-hidden">
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-slate-900/60">
                    <h3 className="text-2xl font-black text-white">Hick's Law Lab</h3>
                    <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
                        <button onClick={() => setHicksMode('chaos')} className={cn("px-4 py-2 text-[10px] font-black uppercase rounded-lg", hicksMode === 'chaos' ? "bg-red-600 text-white" : "text-slate-500")}>Chaos</button>
                        <button onClick={() => setHicksMode('minimal')} className={cn("px-4 py-2 text-[10px] font-black uppercase rounded-lg", hicksMode === 'minimal' ? "bg-indigo-600 text-white" : "text-slate-500")}>Minimal</button>
                    </div>
                </div>
                <div className="p-12 min-h-[400px] flex items-center justify-center bg-slate-950/20">
                    {hicksMode === 'chaos' ? (
                        <div className="bg-amber-100 text-slate-900 p-6 rounded-xl border-4 border-yellow-400 font-sans relative overflow-hidden shadow-2xl max-w-4xl w-full">
                            <div className="bg-red-600 text-yellow-300 text-center font-bold text-lg p-2 animate-pulse mb-6 border-b-4 border-red-800">
                                ★ ★ ★ ARNGREN-STYLE DISCOUNT STORE - ALL PRODUCTS ONLINE! ★ ★ ★
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-[10px]">
                                {[
                                    { id: 100, img: 1 },
                                    { id: 101, img: 2 },
                                    { id: 102, img: 3 },
                                    { id: 103, img: 4 }
                                ].map((item) => (
                                    <div key={item.id} className="border-2 border-blue-600 bg-white p-3 text-center shadow-inner hover:bg-yellow-50 transition-colors">
                                        <div className="bg-yellow-200 font-bold text-red-600 mb-2 border border-red-200">ITEM #{item.id} - SALE!</div>
                                        <div className="h-20 bg-slate-300 flex items-center justify-center text-[10px] text-slate-600 font-bold mb-2 border border-slate-400 italic">
                                            [PICTURE {item.img}]
                                        </div>
                                        <p className="font-serif leading-tight font-black mb-2">Super Drone RC Quadcopter Pro Turbo $49.99</p>
                                        <button 
                                            onClick={() => setHicksSimulatedTime('4.8s (High Friction)')}
                                            className="w-full bg-green-600 text-white font-black px-2 py-1 text-xs hover:bg-green-700 shadow-[2px_2px_0_rgba(0,0,0,0.5)] active:translate-y-0.5"
                                        >
                                            BUY NOW!
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-6 max-w-md w-full">
                            <h4 className="text-xl font-bold text-white">What are you looking for today?</h4>
                            <p className="text-sm text-slate-400">Clean input reduces cognitive load and accelerates decision-making.</p>
                            <div className="relative">
                                <Search className="absolute left-4 top-4 w-5 h-5 text-indigo-400" />
                                <input 
                                  type="text" 
                                  placeholder="Search drones, gadgets, or accessories..." 
                                  className="w-full bg-slate-900 border border-slate-700 p-4 pl-12 rounded-2xl focus:outline-none focus:border-indigo-500 text-white" 
                                  onChange={() => setHicksSimulatedTime('0.4s (Low Friction)')} 
                                />
                            </div>
                        </div>
                    )}
                </div>
                {hicksSimulatedTime && (
                    <div className="p-4 bg-indigo-600/10 border-t border-slate-800 text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Latent Choice Result: {hicksSimulatedTime}</p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-6"><Filter className="w-5 h-5 text-indigo-400" /> Progressive Disclosure</h3>
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl space-y-4">
                        <button onClick={() => setIsMoreChoicesOpen(!isMoreChoicesOpen)} className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                           {isMoreChoicesOpen ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                           {isMoreChoicesOpen ? 'Hide Advanced Options' : 'Show More Choices'}
                        </button>
                        {isMoreChoicesOpen && (
                            <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 animate-in zoom-in duration-300">
                                <div className="h-2 w-full bg-slate-800 rounded" />
                                <div className="h-2 w-2/3 bg-slate-800 rounded" />
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Elaborated Interactive Domain Map */}
                <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl flex flex-col">
                  <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                    <Info className="w-5 h-5 text-indigo-400" /> Interactive Domain Map
                  </h3>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-6">Hover or click therapeutic hotspots to inspect UX domain complexities.</p>
                  
                  {/* Hotspots Buttons */}
                  <div className="flex flex-wrap justify-center gap-2 mb-8">
                    {therapeuticsData.map((domain) => {
                      const isActive = selectedHotspot?.id === domain.id;
                      return (
                        <button
                          key={domain.id}
                          onClick={() => setSelectedHotspot(domain)}
                          onMouseEnter={() => setSelectedHotspot(domain)}
                          className={cn(
                            "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-200 cursor-pointer text-[10px] font-bold uppercase tracking-tight",
                            isActive
                              ? "bg-indigo-600/20 border-indigo-400 text-indigo-200 shadow-[0_0_15px_rgba(129,140,248,0.2)] scale-105"
                              : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-600"
                          )}
                        >
                          <span>{domain.icon}</span>
                          <span>{domain.title}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Domain Detail Card */}
                  {selectedHotspot && (
                    <div className="bg-slate-950 border border-slate-800 p-6 rounded-2xl shadow-inner animate-in slide-in-from-right-2 duration-500 flex-grow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl p-2 bg-slate-900 rounded-lg border border-slate-800">
                            {selectedHotspot.icon}
                          </span>
                          <h4 className="text-lg font-bold text-white">
                            {selectedHotspot.title} Domain
                          </h4>
                        </div>
                        <span className="px-2 py-1 rounded-full text-[8px] font-black uppercase bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                          UX Priority: {selectedHotspot.priority}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs leading-relaxed">
                        {selectedHotspot.desc}
                      </p>
                    </div>
                  )}
                </div>
            </div>
          </div>
        )}

        {/* Module 3: Workflow & Simulation Challenge */}
        {activeTab === 'mod3' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-[2rem] shadow-2xl">
                 <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
                    <div className="max-w-2xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Section 03</span>
                        <h2 className="text-4xl font-black text-white mt-2 mb-4 tracking-tighter">The Creative Loop</h2>
                        <p className="text-slate-400 text-lg leading-relaxed">Transitioning from structural wireframes to branded natural UIs through A-Z iteration.</p>
                    </div>
                    <button onClick={() => toggleSectionCompletion('mod3_workflow')} className={cn("flex items-center space-x-2 px-6 py-3 rounded-full border text-xs font-black uppercase tracking-widest transition-all", (isClient && completedSections.mod3_workflow) ? "bg-emerald-900/40 border-emerald-500/50 text-emerald-300" : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700")}>
                        <CheckCircle className="w-4 h-4" />
                        <span>{(isClient && completedSections.mod3_workflow) ? 'Workflow Validated' : 'Complete Module'}</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {phaseCards.map((card) => (
                    <button key={card.id} onClick={() => setActivePhaseCard(card.id)} className={cn("p-8 rounded-[2rem] border-2 text-left transition-all group", activePhaseCard === card.id ? "bg-indigo-600 border-indigo-400 shadow-[0_0_30px_rgba(79,70,229,0.3)] scale-105" : "bg-slate-900/40 border-slate-800 hover:border-slate-700")}>
                        <div className="flex justify-between items-center mb-6">
                            <span className={cn("text-xs font-black p-2 rounded-lg bg-black/30", activePhaseCard === card.id ? "text-white" : "text-indigo-400")}>{card.key}</span>
                            <card.icon className={cn("w-6 h-6", activePhaseCard === card.id ? "text-white" : "text-slate-600")} />
                        </div>
                        <h4 className="text-xl font-black text-white mb-2">{card.title}</h4>
                        <p className={cn("text-xs leading-relaxed", activePhaseCard === card.id ? "text-white/80" : "text-slate-500")}>{card.desc}</p>
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl space-y-6">
                    <div>
                      <h3 className="text-[10px] font-black uppercase text-indigo-400 mb-2">Simulation Lab</h3>
                      <p className="text-xs text-slate-400 leading-relaxed"><strong>Scenario:</strong> This layout is structurally flawed. The value proposition is buried and wayfinding is broken. Reorder elements to fix the hierarchy.</p>
                    </div>

                    <div className="space-y-2">
                        {WIREFRAME_CATALOG.map(item => (
                            <button key={item.id} onClick={() => addElementToCanvas(item)} className="w-full flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{item.icon}</span>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-white group-hover:text-indigo-300">{item.name}</div>
                                        <div className="text-[8px] text-slate-500 uppercase">{item.ruleHint}</div>
                                    </div>
                                </div>
                                <Plus className="w-4 h-4 text-slate-600" />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-8 flex flex-col items-center">
                    <div className="w-full max-w-sm bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] p-6 shadow-[0_0_100px_rgba(79,70,229,0.1)] relative min-h-[550px] flex flex-col">
                        <div className="flex justify-between items-center mb-6 px-4">
                            <span className="text-[10px] font-mono text-slate-600">9:41</span>
                            <Smartphone className="w-4 h-4 text-slate-700" />
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto scrollbar-none">
                            {canvasItems.map((item, idx) => (
                                <div key={item.instanceId} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center justify-between group animate-in slide-in-from-top-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-mono text-slate-600">{idx + 1}</span>
                                        <span className="text-xs font-bold text-white">{item.name}</span>
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => moveCanvasItem(idx, 'up')} className="p-1 text-slate-500 hover:text-white"><MoveUp className="w-3 h-3" /></button>
                                        <button onClick={() => moveCanvasItem(idx, 'down')} className="p-1 text-slate-500 hover:text-white"><MoveDown className="w-3 h-3" /></button>
                                        <button onClick={() => removeElementFromCanvas(idx)} className="p-1 text-red-500 hover:text-red-400"><Trash2 className="w-3 h-3" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={validateWireframe} className="mt-6 w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-500 transition-all flex items-center justify-center gap-2">
                            <Zap className="w-4 h-4 text-amber-300" /> Validate Hierarchy
                        </button>
                    </div>
                    {protoValidation && (
                         <div className={cn("mt-8 w-full max-w-sm p-6 rounded-[2rem] border animate-in slide-in-from-top-4", protoValidation.passed ? "bg-emerald-900/20 border-emerald-500/30" : "bg-amber-900/20 border-amber-500/30")}>
                            <h4 className="text-sm font-black uppercase text-white mb-4">Diagnostic: {protoValidation.score}%</h4>
                            <ul className="space-y-2">
                                {protoValidation.issues.map((iss: string, i: number) => <li key={i} className="text-[10px] text-amber-400 flex gap-2"><X className="w-3 h-3 shrink-0" /> {iss}</li>)}
                                {protoValidation.wins.map((w: string, i: number) => <li key={i} className="text-[10px] text-emerald-400 flex gap-2"><Check className="w-3 h-3 shrink-0" /> {w}</li>)}
                            </ul>
                         </div>
                    )}
                </div>
            </div>
          </div>
        )}

        {/* Module 4: Checklist */}
        {activeTab === 'mod4' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="bg-slate-900/60 border border-slate-800 p-12 rounded-[3rem]">
                <div className="text-center mb-12">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Final Audit Lab</span>
                    <h3 className="text-4xl font-black text-white tracking-tighter mt-2 mb-2">Usability Diagnostic Audit</h3>
                    <p className="text-slate-500 text-sm uppercase tracking-widest">Rate the implementation of core usability pillars</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { id: 'wayfinding', name: 'Wayfinding', prompt: 'Is location & return path clear?' },
                        { id: 'clarity', name: 'Visual Clarity', prompt: 'Do primary CTAs dominate?' },
                        { id: 'affordance', name: 'Affordance', prompt: 'Do interactive items look clickable?' },
                        { id: 'feedback', name: 'Feedback', prompt: 'Instant status acknowledgement?' },
                        { id: 'readability', name: 'Readability', prompt: 'High contrast & line-height?' },
                        { id: 'errorHandling', name: 'Error Prevention', prompt: 'Clear recovery paths?' }
                    ].map(item => (
                        <div key={item.id} className="bg-slate-950/50 border border-slate-800 p-6 rounded-3xl space-y-4">
                            <div>
                                <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                <p className="text-[10px] text-slate-500 leading-tight mt-1">{item.prompt}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setChecklistScores({...checklistScores, [item.id]: 'pass'})} className={cn("flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all", checklistScores[item.id] === 'pass' ? "bg-emerald-600 text-white" : "bg-slate-900 text-slate-500")}>Pass</button>
                                <button onClick={() => setChecklistScores({...checklistScores, [item.id]: 'fail'})} className={cn("flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all", checklistScores[item.id] === 'fail' ? "bg-amber-600 text-white" : "bg-slate-900 text-slate-500")}>Review</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 flex justify-center">
                    <button onClick={() => toggleSectionCompletion('mod4_audit')} className="px-12 py-4 bg-indigo-600 text-white rounded-full text-xs font-black uppercase tracking-[0.3em] hover:bg-indigo-500 transition-all shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                        Finalize Diagnostic Audit
                    </button>
                </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      {/* Certificate Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 rounded-[3rem] max-w-4xl w-full p-12 shadow-2xl relative overflow-y-auto max-h-[90vh]">
                <button onClick={() => setShowCertModal(false)} className="absolute top-8 right-8 text-slate-500 hover:text-white"><X className="w-8 h-8" /></button>
                <div className="flex flex-col md:flex-row justify-between gap-12 items-center mb-12">
                    <h3 className="text-3xl font-black text-white tracking-tighter">UX Mastery Credential</h3>
                    <div className="flex gap-4">
                        <input type="text" value={learnerName} onChange={handleNameChange} className="bg-slate-950 border border-slate-800 p-4 rounded-2xl text-sm text-white focus:outline-none focus:border-indigo-500 min-w-[250px]" placeholder="Full Name..." />
                        <button onClick={handlePrintCertificate} className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-500 transition-all"><Printer className="w-6 h-6" /></button>
                    </div>
                </div>
                <div className="bg-slate-950 p-16 rounded-[2.5rem] border-4 border-indigo-500/20 text-center relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] rotate-12 scale-150"><Sparkles className="w-64 h-64" /></div>
                    <div className="relative z-10 space-y-8">
                        <div className="flex justify-center"><ShieldCheck className="w-16 h-16 text-indigo-400" /></div>
                        <h2 className="text-5xl font-black text-white tracking-tighter leading-none uppercase italic">Certificate of Mastery</h2>
                        <div className="py-8 border-y border-slate-900">
                             <p className="text-[10px] font-black uppercase text-slate-600 mb-2">Awarded to</p>
                             <span className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 via-white to-indigo-200">{learnerName}</span>
                        </div>
                        <div className="flex justify-between text-[8px] font-black uppercase text-slate-700 pt-8">
                            <span>ID: UXM-{certId}</span>
                            <span>October 2026</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
}
