'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

type PillarId = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test';
type GovernanceMode = 'scorm' | 'accessibility';

interface StackToolDetail {
  name: string;
  purpose: string;
  enterpriseContext: string;
}

interface PillarStage {
  id: PillarId;
  step: string;
  title: string;
  subtitle: string;
  gateName: string;
  cognitiveFocus: string;
  enterpriseApplication: string;
  deliverables: string[];
  stackCategorySummary: string;
  tooling: StackToolDetail[];
  riskIfSkipped: string;
}

interface IaLeafNode {
  id: string;
  title: string;
  gate: string;
  cognitiveOrEquityControl: string;
  toolingStack: string[];
  governanceImpact: string;
}

interface IaBranchNode {
  id: string;
  title: string;
  leaves: IaLeafNode[];
}

interface IaStageNode {
  id: PillarId;
  step: string;
  title: string;
  summary: string;
  branches: IaBranchNode[];
}

const PILLAR_STAGES: PillarStage[] = [
  {
    id: 'empathize',
    step: '01',
    title: 'Empathize',
    subtitle: 'Discovery & Learner Context',
    gateName: 'Gate 01: Context & Equity Lock',
    cognitiveFocus: 'Learner Archetype Mapping (Achiever, Explorer, Problem-Solver, Pragmatist)',
    enterpriseApplication:
      'Audits field vs. office device constraints (desktop, rugged tablet, mobile), shift schedules, operational workflows, and assistive-technology requirements prior to scripting.',
    deliverables: [
      'Field & Office Device Breakpoint Profile',
      'Structured SME Intake & Operational Friction Audit',
      'WCAG 2.1 AA & Plain-Language Baseline Spec',
    ],
    stackCategorySummary:
      'Discovery & Equity Baseline Stack: Captures operational reality, SME constraints, and assistive-tech needs before a single script or slide is drafted.',
    tooling: [
      {
        name: 'Miro / FigJam',
        purpose: 'Visualizes learner journeys, shift constraints, and workflow bottlenecks collaboratively.',
        enterpriseContext:
          'Maps how Enterprise staff move between operational tasks and LMS terminals so training fits real shift realities.',
      },
      {
        name: 'Structured SME Intake Rubrics',
        purpose:
          'Standardizes interviews with technical specialists to isolate critical job tasks from background trivia.',
        enterpriseContext:
          'Prevents dense SOP dumps by forcing early clarity on high-risk actions, safety exceptions, and decision points.',
      },
      {
        name: 'NVDA / VoiceOver Baseline',
        purpose: 'Establishes screen-reader and keyboard navigation expectations early in discovery.',
        enterpriseContext:
          'Locks in WCAG 2.1 AA / ADA equity requirements up front so accessibility is engineered in rather than retrofitted.',
      },
    ],
    riskIfSkipped:
      'Desktop-only courses fail on field tablets, or screen-reader requirements surface too late in production.',
  },
  {
    id: 'define',
    step: '02',
    title: 'Define',
    subtitle: 'Instructional Scope & Governance',
    gateName: 'Gate 02: Curriculum & Telemetry Blueprint',
    cognitiveFocus: 'Focused vs. Diffuse Mode Pacing (3–5 Min Atomic Microlearning Units)',
    enterpriseApplication:
      'Translates dense Standard Operating Procedures (SOPs) into measurable behavioral outcomes and defines exact LMS tracking rules for 70,000+ Enterprise personnel.',
    deliverables: [
      'Bloom’s Taxonomy Behavioral Objectives',
      'Cognitive Load & Microlearning Chunking Map',
      'SCORM 1.2 / 2004 & xAPI Data Governance Spec',
    ],
    stackCategorySummary:
      'Scope, Architecture & Telemetry Stack: Locks measurable learning objectives, microlearning pacing, and LMS data rules into a single source of truth.',
    tooling: [
      {
        name: 'Notion / Confluence',
        purpose: 'Maintains a living curriculum hub, SOP-to-module mapping, and stakeholder decision log.',
        enterpriseContext:
          'Keeps multi-stakeholder alignment transparent across Enterprise L&D, operations, and compliance teams as policies evolve.',
      },
      {
        name: 'Instructional Design Doc (IDD)',
        purpose:
          'Defines target behaviors, cognitive pacing (Focused vs. Diffuse), and assessment logic prior to build.',
        enterpriseContext:
          'Chunks complex Enterprise procedures into 3–5 minute micro-units with clear performance outcomes.',
      },
      {
        name: 'SCORM Data Model Spec',
        purpose: 'Specifies completion triggers, mastery thresholds, and status reporting rules before authoring.',
        enterpriseContext:
          'Ensures every module reports clean, auditable Passed/Incomplete and score telemetry into the Enterprise LMS.',
      },
    ],
    riskIfSkipped:
      'Courses bloat into passive 60-minute slide decks with ambiguous LMS completion records.',
  },
  {
    id: 'ideate',
    step: '03',
    title: 'Ideate',
    subtitle: 'Modality Routing & Scenario Design',
    gateName: 'Gate 03: Modality & Storyboard Matrix',
    cognitiveFocus: 'Safe-Failure Simulation & Active Decision-Making',
    enterpriseApplication:
      'Routes rapid policy updates to Articulate Rise, branching troubleshooting to Storyline, and high-risk spatial/facility procedures to 3DVista 360° environments.',
    deliverables: [
      'Modality Routing Matrix (Rise vs. Storyline vs. 3DVista)',
      'Branching Decision Trees & Immediate Feedback Loops',
      'RAG-Grounded Knowledge Check & Quiz Architecture',
    ],
    stackCategorySummary:
      'Modality & Simulation Routing Stack: Matches each instructional problem to the right interactive format and safe-failure practice mechanic.',
    tooling: [
      {
        name: 'Articulate Rise 360',
        purpose:
          'Delivers fast, responsive, mobile-friendly microlearning for policies, checklists, and onboarding.',
        enterpriseContext:
          'Ideal for scannable Enterprise policy updates and refresher modules across phones, tablets, and desktops.',
      },
      {
        name: 'Articulate Storyline 360',
        purpose:
          'Builds custom branching scenarios, variables, and decision trees with safe-failure feedback.',
        enterpriseContext:
          'Lets Enterprise learners practice troubleshooting and compliance judgment with zero real-world operational risk.',
      },
      {
        name: '3DVista 360°',
        purpose:
          'Creates interactive 360° spatial walkthroughs with hotspots and environmental inspection tasks.',
        enterpriseContext:
          'Simulates physical Enterprise spaces, equipment zones, and hazard recognition before on-site field exposure.',
      },
      {
        name: 'LangChain / RAG',
        purpose:
          'Grounds knowledge checks, job aids, and retrieval workflows in approved source documentation.',
        enterpriseContext:
          'Helps structure accurate Enterprise reference queries and assessment banks tied directly to verified policy texts.',
      },
    ],
    riskIfSkipped:
      'High-risk spatial or procedural tasks get flattened into passive text slides with low retention.',
  },
  {
    id: 'prototype',
    step: '04',
    title: 'Prototype',
    subtitle: 'Wireframes & Modular Build',
    gateName: 'Gate 04: Early SME Accuracy Sign-Off',
    cognitiveFocus: 'Visual Dual-Coding & Low-Friction Interface Clarity',
    enterpriseApplication:
      'Presents interactive Figma wireframes to operational SMEs for rapid accuracy sign-off before committing hours to audio narration, motion graphics, or 3D rendering.',
    deliverables: [
      'Clickable Figma Wireframes & Narration Scripts',
      '360° Interactive Hotspots & Motion Explainers',
      'Synchronized Closed Captions (.SRT/.VTT) & Alt-Text',
    ],
    stackCategorySummary:
      'Rapid Prototyping & Media Production Stack: Validates flow with SMEs early via low-cost wireframes before producing high-craft visual, 3D, and audio media.',
    tooling: [
      {
        name: 'Figma',
        purpose:
          'Builds clickable screen wireframes, layout systems, and interaction flows for early stakeholder review.',
        enterpriseContext:
          'Lets Enterprise SMEs approve structure and plain-language copy before costly media production begins.',
      },
      {
        name: 'Blender / 3DVista',
        purpose:
          'Generates 3D assets, spatial scenes, and interactive 360° hotspots for hands-on exploration.',
        enterpriseContext:
          'Supports realistic Enterprise spatial orientation and equipment/environment familiarization.',
      },
      {
        name: 'Premiere Pro / After Effects',
        purpose: 'Produces edited walkthrough videos, motion diagrams, and visual callouts.',
        enterpriseContext:
          'Clarifies multi-step Enterprise visual sequences and reinforces focused vs. diffuse cognitive transitions.',
      },
      {
        name: 'Audacity',
        purpose:
          'Records, cleans, and normalizes voiceover audio tracks paired with captioning workflows.',
        enterpriseContext:
          'Delivers clear, consistent narration with synchronized captions for accessibility and noisy Enterprise environments.',
      },
    ],
    riskIfSkipped:
      'SMEs request structural rewrites after expensive multimedia rendering is complete.',
  },
  {
    id: 'test',
    step: '05',
    title: 'Test',
    subtitle: 'QA, Compliance & LMS Launch',
    gateName: 'Gate 05: Production & Governance Release',
    cognitiveFocus: 'Zero-Friction Access & Audit-Ready Reporting',
    enterpriseApplication:
      'Executes multi-viewport stress tests, keyboard-only/screen-reader audits, and SCORM Cloud sandbox verification before deploying to the Enterprise LMS.',
    deliverables: [
      'Multi-Device Viewport QA Sign-Off (Desktop / Tablet / Mobile)',
      'WCAG 2.1 AA Keyboard & Screen-Reader Audit Report',
      'SCORM Cloud Telemetry & Gradebook Verification',
    ],
    stackCategorySummary:
      'Validation, Accessibility & LMS Assurance Stack: Verifies technical stability, assistive-tech compliance, and LMS data integrity prior to rollout.',
    tooling: [
      {
        name: 'SCORM Cloud',
        purpose:
          'Tests packaged .zip courses in a sandbox to validate completion, scoring, and resume state.',
        enterpriseContext:
          'Catches Enterprise LMS tracking or bookmarking bugs before a course reaches thousands of active employees.',
      },
      {
        name: 'NVDA / JAWS / VoiceOver',
        purpose:
          'Audits tab order, focus indicators, alt-text, and screen-reader announcements across views.',
        enterpriseContext:
          'Confirms equitable access and WCAG 2.1 AA / ADA conformance prior to Enterprise release.',
      },
      {
        name: 'Cornerstone / Workday LMS',
        purpose:
          'Hosts final governed packages, enforces assignment rules, and surfaces compliance reporting.',
        enterpriseContext:
          'Provides Enterprise HR, safety, and operations leaders with reliable completion and audit records.',
      },
    ],
    riskIfSkipped:
      'Broken triggers, missing captions, or failed quiz pass-backs affect thousands of employees.',
  },
];

const IA_TREE_STAGES: IaStageNode[] = [
  {
    id: 'empathize',
    step: '01',
    title: 'Empathize',
    summary: 'Learner context, operational reality, and accessibility baseline.',
    branches: [
      {
        id: 'emp-1',
        title: '1.1 Audience & Field Environment Audit',
        leaves: [
          {
            id: 'emp-1a',
            title: 'Device & Connectivity Profile (Desktop / Tablet / Offline)',
            gate: 'Gate 01: Context & Equity Lock',
            cognitiveOrEquityControl: 'Prevents high-bandwidth or desktop-only friction on field devices.',
            toolingStack: ['Miro / FigJam', 'Device & Shift Matrix'],
            governanceImpact: 'Ensures Enterprise training works reliably across operational environments.',
          },
          {
            id: 'emp-1b',
            title: 'Learner Archetype Mapping (5 Learner & Gaming Styles)',
            gate: 'Gate 01: Context & Equity Lock',
            cognitiveOrEquityControl: 'Balances structured mastery with exploratory & scenario choices.',
            toolingStack: ['Miro / FigJam', 'Learner Persona Matrix'],
            governanceImpact: 'Improves completion and engagement on mandatory Enterprise training.',
          },
        ],
      },
      {
        id: 'emp-2',
        title: '1.2 SME Intake & WCAG 2.1 AA Baseline',
        leaves: [
          {
            id: 'emp-2a',
            title: 'Structured SME Intake & Operational Friction Audit',
            gate: 'Gate 01: Context & Equity Lock',
            cognitiveOrEquityControl: 'Separates mission-critical actions from low-value jargon.',
            toolingStack: ['Structured SME Intake Rubrics', 'Notion / Confluence'],
            governanceImpact: 'Protects Enterprise technical accuracy while keeping training concise.',
          },
          {
            id: 'emp-2b',
            title: 'WCAG 2.1 AA / ADA & Screen-Reader Baseline',
            gate: 'Gate 01: Context & Equity Lock',
            cognitiveOrEquityControl: 'Locks contrast, captions, and keyboard access from day one.',
            toolingStack: ['NVDA / VoiceOver Baseline'],
            governanceImpact: 'Meets Enterprise accessibility and equity obligations.',
          },
        ],
      },
    ],
  },
  {
    id: 'define',
    step: '02',
    title: 'Define',
    summary: 'Behavioral objectives, cognitive pacing, and SCORM/LMS governance.',
    branches: [
      {
        id: 'def-1',
        title: '2.1 Objectives & Focused/Diffuse Pacing',
        leaves: [
          {
            id: 'def-1a',
            title: 'Behavioral Objectives & 3–5 Min Microlearning Chunks',
            gate: 'Gate 02: Curriculum & Telemetry Blueprint',
            cognitiveOrEquityControl: 'Alternates Focused task drills with Diffuse reflection breaks.',
            toolingStack: ['Instructional Design Doc (IDD)', 'Notion / Confluence'],
            governanceImpact: 'Aligns every Enterprise module to measurable job performance.',
          },
          {
            id: 'def-1b',
            title: 'SCORM 1.2 / 2004 / xAPI Telemetry Specification',
            gate: 'Gate 02: Curriculum & Telemetry Blueprint',
            cognitiveOrEquityControl: 'Standardizes completion and mastery thresholds before build.',
            toolingStack: ['SCORM Data Model Spec'],
            governanceImpact: 'Guarantees clean Enterprise LMS reporting and auditability.',
          },
        ],
      },
    ],
  },
  {
    id: 'ideate',
    step: '03',
    title: 'Ideate',
    summary: 'Modality routing across Rise, Storyline, 3DVista, and RAG.',
    branches: [
      {
        id: 'ide-1',
        title: '3.1 Modality Routing & Safe-Failure Scenarios',
        leaves: [
          {
            id: 'ide-1a',
            title: 'Rise (Rapid Policy) • Storyline (Branching) • 3DVista (360°)',
            gate: 'Gate 03: Modality & Storyboard Matrix',
            cognitiveOrEquityControl: 'Uses safe-failure branching and spatial hotspots for retention.',
            toolingStack: ['Articulate Rise 360', 'Articulate Storyline 360', '3DVista 360°'],
            governanceImpact: 'Right-sizes Enterprise production effort to operational risk.',
          },
          {
            id: 'ide-1b',
            title: 'RAG-Grounded Reference & Assessment Design',
            gate: 'Gate 03: Modality & Storyboard Matrix',
            cognitiveOrEquityControl: 'Ties feedback and checks directly to verified source docs.',
            toolingStack: ['LangChain / RAG', 'Storyboards'],
            governanceImpact: 'Reduces drift or outdated guidance in Enterprise learning materials.',
          },
        ],
      },
    ],
  },
  {
    id: 'prototype',
    step: '04',
    title: 'Prototype',
    summary: 'Early Figma wireframes, multimedia assets, and accessible build.',
    branches: [
      {
        id: 'pro-1',
        title: '4.1 Wireframes, 360°/AV Media & Accessibility Wiring',
        leaves: [
          {
            id: 'pro-1a',
            title: 'Figma Wireframe Sign-Off Before Media Production',
            gate: 'Gate 04: Early SME Accuracy Sign-Off',
            cognitiveOrEquityControl: 'Visual dual-coding with clear hierarchy and plain text.',
            toolingStack: ['Figma', 'Blender / 3DVista', 'Premiere Pro / After Effects', 'Audacity'],
            governanceImpact: 'Prevents expensive late-stage rewrites with Enterprise SMEs.',
          },
        ],
      },
    ],
  },
  {
    id: 'test',
    step: '05',
    title: 'Test',
    summary: 'Multi-device QA, screen-reader audit, and SCORM Cloud validation.',
    branches: [
      {
        id: 'tst-1',
        title: '5.1 SCORM Cloud, Assistive QA & LMS Release',
        leaves: [
          {
            id: 'tst-1a',
            title: 'SCORM Cloud & Screen-Reader / Keyboard Audit',
            gate: 'Gate 05: Production & Governance Release',
            cognitiveOrEquityControl: 'Verifies zero navigation blocks and reliable resume behavior.',
            toolingStack: ['SCORM Cloud', 'NVDA / JAWS / VoiceOver', 'Cornerstone / Workday LMS'],
            governanceImpact: 'Certifies production readiness for Enterprise rollout.',
          },
        ],
      },
    ],
  },
];

export default function ELearningArchitecturePage() {
  const [activePillarId, setActivePillarId] = useState<PillarId>('empathize');
  const [selectedToolName, setSelectedToolName] = useState<string>('Miro / FigJam');
  const [governanceMode, setGovernanceMode] = useState<GovernanceMode>('scorm');
  const [simulatedScore, setSimulatedScore] = useState<number>(85);
  const [passingThreshold, setPassingThreshold] = useState<number>(80);

  // Interactive IA Tree state
  const [expandedStageIds, setExpandedStageIds] = useState<Record<string, boolean>>({
    empathize: true,
    define: true,
    ideate: false,
    prototype: false,
    test: false,
  });
  const [selectedLeafId, setSelectedLeafId] = useState<string>('emp-1a');

  const activePillar =
    PILLAR_STAGES.find((stage) => stage.id === activePillarId) || PILLAR_STAGES[0];

  const activeToolDetail =
    activePillar.tooling.find((t) => t.name === selectedToolName) || activePillar.tooling[0];

  const handleSelectPillar = (pillarId: PillarId) => {
    setActivePillarId(pillarId);
    const nextStage = PILLAR_STAGES.find((s) => s.id === pillarId);
    if (nextStage && nextStage.tooling.length > 0) {
      setSelectedToolName(nextStage.tooling[0].name);
    }
  };

  const toggleStageAccordion = (stageId: string) => {
    setExpandedStageIds((prev) => ({
      ...prev,
      [stageId]: !prev[stageId],
    }));
  };

  const allLeaves = IA_TREE_STAGES.flatMap((stage) =>
    stage.branches.flatMap((branch) => branch.leaves)
  );
  const selectedLeaf = allLeaves.find((leaf) => leaf.id === selectedLeafId) || allLeaves[0];

  const isPassed = simulatedScore >= passingThreshold;

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      <Header />
      <main className="flex-grow">
        {/* Top Executive Navigation Strip */}
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-16 z-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-blue-600 font-bold text-white text-sm tracking-tight">
                LD
              </span>
              <div>
                <p className="text-sm font-semibold text-white tracking-tight">
                  Leonardo Delacruz <span className="text-slate-400 font-normal">| boohito.com</span>
                </p>
                <p className="text-xs text-slate-400">
                  Enterprise Learning Experience Architecture
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium">
              <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Req #17143 Brief
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800/70">
                WCAG 2.1 AA Ready
              </span>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-14">
          {/* Hero Board Header */}
          <section className="space-y-5 border-b border-slate-800 pb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              Enterprise Operational Readiness Framework
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white max-w-4xl leading-tight">
              Operational Precision at Scale: A 5-Pillar UX Architecture for Enterprise Workforce Learning
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              Bridging human-centered UX Design Thinking, spatial 360° simulation, and strict LMS
              governance to deliver accessible, audit-ready training across 70,000+ Enterprise
              personnel.
            </p>

            {/* 3 Executive Metric Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                  Equity by Design
                </p>
                <p className="mt-1 text-lg font-semibold text-white">WCAG 2.1 AA / ADA</p>
                <p className="mt-1 text-xs text-slate-400">
                  Screen-reader tab order, captions, and contrast locked in Stage 01.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                  LMS Governance
                </p>
                <p className="mt-1 text-lg font-semibold text-white">SCORM 1.2 / 2004 / xAPI</p>
                <p className="mt-1 text-xs text-slate-400">
                  Verified completion triggers, score pass-back, and clean HR audit trails.
                </p>
              </div>
              <div className="rounded-xl bg-slate-900 border border-slate-800 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Multi-Modality Stack
                </p>
                <p className="mt-1 text-lg font-semibold text-white">Rise • Storyline • 3DVista</p>
                <p className="mt-1 text-xs text-slate-400">
                  Matched to Focused vs. Diffuse cognitive load and operational risk.
                </p>
              </div>
            </div>
          </section>

          {/* Interactive 5-Pillar UX Workflow Board */}
          <section aria-labelledby="workflow-heading" className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <h2 id="workflow-heading" className="text-xl sm:text-2xl font-bold text-white">
                  Interactive 5-Pillar Production Workflow
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Select any UX stage below to inspect operational deliverables, clickable stack tools,
                  and governance sign-off gates.
                </p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Stage {activePillar.step} of 05
              </span>
            </div>

            {/* Clickable 5-Stage Stepper Tabs */}
            <div
              role="tablist"
              aria-label="5-Pillar UX Workflow Stages"
              className="grid grid-cols-2 sm:grid-cols-5 gap-2.5"
            >
              {PILLAR_STAGES.map((stage) => {
                const isSelected = stage.id === activePillarId;
                return (
                  <button
                    key={stage.id}
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleSelectPillar(stage.id)}
                    className={`text-left rounded-xl p-3.5 border transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-950/50'
                        : 'bg-slate-900/90 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs font-mono font-bold ${
                          isSelected ? 'text-blue-400' : 'text-slate-500'
                        }`}
                      >
                        {stage.step}
                      </span>
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
                      )}
                    </div>
                    <p className="mt-1.5 font-semibold text-sm sm:text-base">{stage.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{stage.subtitle}</p>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Executive Board Panel */}
            <div
              role="tabpanel"
              className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl space-y-6"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-blue-600 text-white text-xs font-mono font-bold">
                      PILLAR {activePillar.step}
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      {activePillar.title}: {activePillar.subtitle}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-amber-300 font-medium">
                    Cognitive Principle: {activePillar.cognitiveFocus}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/70 border border-emerald-800/70 text-emerald-300 text-xs font-semibold shrink-0">
                  <svg
                    className="w-4 h-4 text-emerald-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {activePillar.gateName}
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column: Operational Context & Risk */}
                <div className="lg:col-span-6 space-y-5">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Enterprise Workforce Application
                    </h4>
                    <p className="mt-2 text-sm sm:text-base text-slate-200 leading-relaxed">
                      {activePillar.enterpriseApplication}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Stage Artifacts & Deliverables
                    </h4>
                    <ul className="mt-2.5 space-y-2">
                      {activePillar.deliverables.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-slate-200">
                          <span className="text-blue-400 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-xl bg-slate-950/80 border border-slate-800/90 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                      Governance Risk If Bypassed
                    </p>
                    <p className="mt-1 text-sm text-slate-300">{activePillar.riskIfSkipped}</p>
                  </div>
                </div>

                {/* Right Column: Interactive Production & Validation Stack */}
                <div className="lg:col-span-6 space-y-4 bg-slate-950/60 rounded-xl p-5 border border-slate-800">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                      Production & Validation Stack
                    </h4>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {activePillar.stackCategorySummary}
                    </p>
                  </div>

                  {/* Clickable Tool Buttons */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {activePillar.tooling.map((tool) => {
                      const isToolActive = tool.name === selectedToolName;
                      return (
                        <button
                          key={tool.name}
                          type="button"
                          aria-pressed={isToolActive}
                          onClick={() => setSelectedToolName(tool.name)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                            isToolActive
                              ? 'bg-blue-600 text-white border-blue-400 shadow'
                              : 'bg-slate-900 text-slate-200 border-slate-700 hover:border-slate-500'
                          }`}
                        >
                          {tool.name}
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Tool Purpose & Context Drawer */}
                  <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{activeToolDetail.name}</span>
                      <span className="text-[11px] font-mono uppercase text-amber-300">
                        Purpose in Context
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      <strong className="text-slate-100">Core Role:</strong> {activeToolDetail.purpose}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      <strong className="text-blue-300">Enterprise Context:</strong>{' '}
                      {activeToolDetail.enterpriseContext}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Top-Center Modulated 5-Pillar UX eLearning Information Architecture */}
          <section aria-labelledby="ia-explorer-heading" className="space-y-6">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <h2 id="ia-explorer-heading" className="text-xl sm:text-2xl font-bold text-white">
                Interactive 5-Pillar UX eLearning Information Architecture
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Branches modulate outward from the top-center hub across all five UX pillars. Click any
                stage to expand its branches, then click a leaf item to reveal its gate, cognitive/equity
                control, tooling stack, and governance impact directly underneath that button.
              </p>
            </div>

            {/* Top-Center Root Hub & Connector Trunk */}
            <div className="flex flex-col items-center">
              <div className="px-5 py-2.5 rounded-xl bg-slate-900 border border-blue-500/70 shadow-lg shadow-blue-950/40 text-center">
                <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400">
                  Root Architecture
                </p>
                <p className="text-sm sm:text-base font-bold text-white">
                  Enterprise eLearning IA • 5-Pillar UX Model
                </p>
              </div>
              <div className="h-6 w-px bg-slate-700" aria-hidden="true" />
              <div className="hidden lg:block w-4/5 h-px bg-slate-700" aria-hidden="true" />
            </div>

            {/* 5-Column Modulated Pillar Branches */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              {IA_TREE_STAGES.map((stage) => {
                const isExpanded = Boolean(expandedStageIds[stage.id]);
                return (
                  <div
                    key={stage.id}
                    className="flex flex-col items-center rounded-2xl bg-slate-900/90 border border-slate-800 p-3.5 space-y-3"
                  >
                    <div className="hidden lg:block -mt-6 h-3 w-px bg-slate-700" aria-hidden="true" />

                    {/* Pillar Header Button */}
                    <button
                      type="button"
                      aria-expanded={isExpanded}
                      onClick={() => toggleStageAccordion(stage.id)}
                      className="w-full rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/60 p-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-blue-400">
                          {stage.step}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {isExpanded ? '− Hide' : '+ Open'}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-bold text-white">{stage.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{stage.summary}</p>
                    </button>

                    {/* Expanded Branches & Inline Leaf Inspectors */}
                    {isExpanded && (
                      <div className="w-full space-y-3 pt-1">
                        {stage.branches.map((branch) => (
                          <div key={branch.id} className="space-y-1.5">
                            <p className="text-[11px] font-semibold text-amber-300/90 px-1">
                              {branch.title}
                            </p>

                            <div className="space-y-2">
                              {branch.leaves.map((leaf) => {
                                const isOpenBelow = selectedLeafId === leaf.id;
                                return (
                                  <div key={leaf.id} className="space-y-1.5">
                                    <button
                                      type="button"
                                      aria-expanded={isOpenBelow}
                                      onClick={() =>
                                        setSelectedLeafId((prev) => (prev === leaf.id ? '' : leaf.id))
                                      }
                                      className={`w-full text-left px-3 py-2 rounded-lg text-xs border transition-all focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                                        isOpenBelow
                                          ? 'bg-blue-600/25 border border-blue-400 text-white font-semibold'
                                          : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
                                      }`}
                                    >
                                      <div className="flex items-start justify-between gap-2">
                                        <span>{leaf.title}</span>
                                        <span className="font-mono text-[10px] text-slate-400 shrink-0">
                                          {isOpenBelow ? '▲' : '▼'}
                                        </span>
                                      </div>
                                    </button>

                                    {/* Inline Inspector Rendered Directly Under Clicked Leaf Button */}
                                    {isOpenBelow && (
                                      <div className="rounded-xl bg-slate-950 border border-blue-500/40 p-3 space-y-2.5 text-xs shadow-inner">
                                        <div className="inline-block px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-semibold">
                                          {leaf.gate}
                                        </div>

                                        <div>
                                          <p className="text-[10px] font-mono uppercase text-blue-400">
                                            Cognitive / Equity Control
                                          </p>
                                          <p className="text-slate-200 leading-relaxed mt-0.5">
                                            {leaf.cognitiveOrEquityControl}
                                          </p>
                                        </div>

                                        <div>
                                          <p className="text-[10px] font-mono uppercase text-emerald-400">
                                            Governance Impact
                                          </p>
                                          <p className="text-slate-200 leading-relaxed mt-0.5">
                                            {leaf.governanceImpact}
                                          </p>
                                        </div>

                                        <div>
                                          <p className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                                            Tooling Stack
                                          </p>
                                          <div className="flex flex-wrap gap-1">
                                            {leaf.toolingStack.map((tool) => (
                                              <span
                                                key={tool}
                                                className="px-2 py-0.5 rounded bg-slate-900 text-slate-200 text-[10px] border border-slate-700"
                                              >
                                                {tool}
                                              </span>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Interactive Governance & SCORM Telemetry Sandbox */}
          <section
            aria-labelledby="governance-heading"
            className="rounded-2xl bg-slate-900 border border-slate-800 p-6 sm:p-8 space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
              <div>
                <h2 id="governance-heading" className="text-xl sm:text-2xl font-bold text-white">
                  Enterprise LMS Governance & Compliance Simulator
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Verify how SCORM completion rules and WCAG 2.1 AA / ADA accessibility gates protect
                  Enterprise rollouts.
                </p>
              </div>

              <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800 self-start">
                <button
                  type="button"
                  onClick={() => setGovernanceMode('scorm')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    governanceMode === 'scorm'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  SCORM / Telemetry
                </button>
                <button
                  type="button"
                  onClick={() => setGovernanceMode('accessibility')}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                    governanceMode === 'accessibility'
                      ? 'bg-emerald-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  WCAG 2.1 AA / Equity
                </button>
              </div>
            </div>

            {governanceMode === 'scorm' ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <label htmlFor="score-slider" className="text-slate-300">
                        Simulated Learner Assessment Score:{' '}
                        <span className="text-white font-bold">{simulatedScore}%</span>
                      </label>
                      <span className="text-slate-400">cmi.core.score.raw</span>
                    </div>
                    <input
                      id="score-slider"
                      type="range"
                      min={0}
                      max={100}
                      value={simulatedScore}
                      onChange={(e) => setSimulatedScore(Number(e.target.value))}
                      className="w-full accent-blue-500 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <label htmlFor="threshold-slider" className="text-slate-300">
                        Enterprise Mastery Threshold:{' '}
                        <span className="text-amber-300 font-bold">{passingThreshold}%</span>
                      </label>
                      <span className="text-slate-400">cmi.student_data.mastery_score</span>
                    </div>
                    <input
                      id="threshold-slider"
                      type="range"
                      min={50}
                      max={100}
                      step={5}
                      value={passingThreshold}
                      onChange={(e) => setPassingThreshold(Number(e.target.value))}
                      className="w-full accent-amber-400 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="lg:col-span-5 rounded-xl bg-slate-950 border border-slate-800 p-5 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-400">LMS PAYLOAD PREVIEW</span>
                    <span
                      className={`px-2 py-0.5 rounded font-semibold ${
                        isPassed
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-700'
                      }`}
                    >
                      {isPassed ? 'PASSED' : 'INCOMPLETE / RETRY'}
                    </span>
                  </div>
                  <p className="text-slate-300">
                    <span className="text-blue-400">lesson_status:</span>{' '}
                    &quot;{isPassed ? 'passed' : 'incomplete'}&quot;
                  </p>
                  <p className="text-slate-300">
                    <span className="text-blue-400">score.raw:</span> {simulatedScore} (min:{' '}
                    {passingThreshold})
                  </p>
                  <p className="text-slate-300">
                    <span className="text-blue-400">bookmark_location:</span> &quot;pillar_03_scenario_02&quot;
                  </p>
                  <p className="text-slate-400 text-[11px] pt-1">
                    Verified in SCORM Cloud prior to Enterprise LMS deployment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-1.5">
                  <p className="text-xs font-bold text-emerald-400 uppercase">
                    1. Keyboard & Focus Order
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every interactive hotspot, branch choice, and accordion control is reachable via
                    Tab / Shift+Tab with visible focus rings and zero keyboard traps.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-1.5">
                  <p className="text-xs font-bold text-emerald-400 uppercase">
                    2. Captions, Transcripts & Alt-Text
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    360° scenes, motion diagrams, and audio tracks pair with synchronized captions,
                    text alternatives, and plain-language Enterprise guidance.
                  </p>
                </div>
                <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-1.5">
                  <p className="text-xs font-bold text-emerald-400 uppercase">
                    3. Contrast & Reduced Motion
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    High-contrast typography and calm state transitions support diverse visual and
                    cognitive needs across desktop, tablet, and mobile viewports.
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Executive Footer */}
          <footer className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              Prepared by <strong className="text-slate-200">Leonardo Delacruz</strong> • Learning
              Experience Designer & UX Architect
            </p>
          </footer>
        </div>
      </main>
      <Footer />
    </div>
  );
}
