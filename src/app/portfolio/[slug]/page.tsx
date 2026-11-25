
'use client';

import { use } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import caresFoodAccessData from '@/data/portfolio/cares-food-access.json';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Lightbulb } from 'lucide-react';
import PrototypeShowcase from '@/components/portfolio/prototype-showcase';

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  if (slug !== 'cares-food-access') {
    notFound();
  }

  const caseStudy = caresFoodAccessData;
  const heroImageSrc = caseStudy.gated_content_data.design_assets.case_study_hero_image;
  const challengeSummary = caseStudy.ungated_teaser.challenge_summary
    .replace('The **Community Action for Economic Stimulus (CARES)** program sought to', 'We sought to')
    .replace(/\*\*/g, '');


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <article>
          {/* Header Section */}
          <header className="relative py-20 md:py-32 lg:py-40 bg-card/80">
            <div className="absolute inset-0 z-0 opacity-40">
               <Image
                src={heroImageSrc}
                alt="CARES Healthy Food Access Platform Logo"
                fill
                className="object-cover"
                data-ai-hint="company logo"
              />
               <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-transparent" />
            </div>
            <div className="container mx-auto px-4 relative z-10 text-center">
              <Badge variant="secondary" className="mb-4">{caseStudy.ungated_teaser.industry}</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary max-w-4xl mx-auto">
                CARES
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-muted-foreground mt-2">
                Community Action for Economic Stimulus
              </h2>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                {challengeSummary}
              </p>
            </div>
          </header>

          {/* Body Content */}
          <div className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl">

              {/* Key Outcome Analysis */}
              <section className="mb-20 text-center">
                <h2 className="text-3xl font-bold text-primary mb-10">{caseStudy.gated_content_data.key_outcome_analysis.headline}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {caseStudy.gated_content_data.key_outcome_analysis.metric_details.map((metric, index) => (
                    <Card key={index} className="bg-card/80 border-border/70 text-center shadow-lg">
                      <CardHeader>
                        <CardTitle className="text-5xl font-bold text-accent">{metric.metric}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{metric.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Execution Layer Section */}
              <section className="mb-20">
                  <h2 className="text-3xl font-bold text-primary mb-10 text-center">Execution Layer: Architecture and Usability Testing</h2>
                  <PrototypeShowcase
                    prototypeFlowData={caseStudy.gated_content_data.design_assets.prototype_flow}
                    styleGuideUrl={caseStudy.gated_content_data.design_assets.style_guide_link}
                    styleGuideSummary={caseStudy.gated_content_data.design_assets.style_guide_summary}
                  />
              </section>


              {/* Methodology Section */}
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-primary mb-10 text-center">{caseStudy.gated_content_data.methodology_steps.gated_title}</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                  {caseStudy.gated_content_data.methodology_steps.fukuro_process.map((step) => (
                    <AccordionItem value={`item-${step.step}`} key={step.step} className="border-border/70">
                      <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                        Step {step.step}: {step.name}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-6 border-l-2 border-primary/50 ml-2">
                        {step.details.replace(/\*\*/g, '')}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>

              {/* Persona Deep Dive */}
              <section className="mb-20">
                <h2 className="text-3xl font-bold text-primary mb-10 text-center">Persona Deep Dive</h2>
                <Tabs defaultValue={caseStudy.gated_content_data.extracted_personas[0].name.split(',')[0]} className="w-full max-w-4xl mx-auto">
                  <TabsList className="grid w-full grid-cols-2">
                    {caseStudy.gated_content_data.extracted_personas.map(persona => (
                      <TabsTrigger key={persona.name} value={persona.name.split(',')[0]}>{persona.name.split(',')[0]}</TabsTrigger>
                    ))}
                  </TabsList>
                  {caseStudy.gated_content_data.extracted_personas.map(persona => (
                    <TabsContent key={persona.name} value={persona.name.split(',')[0]}>
                      <Card className="bg-card/80 border-border/70 p-6">
                        <h3 className="text-2xl font-semibold text-accent">{persona.name}</h3>
                        <p className="mt-2 text-muted-foreground italic">{persona.journey_summary}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                          <div>
                            <h4 className="flex items-center text-lg font-semibold text-primary mb-3"><Target className="mr-2 h-5 w-5"/> Goals</h4>
                            <p className="text-muted-foreground">{persona.goals}</p>
                          </div>
                           <div>
                            <h4 className="flex items-center text-lg font-semibold text-destructive/80 mb-3"><Lightbulb className="mr-2 h-5 w-5"/> Pain Points</h4>
                             <p className="text-muted-foreground">{persona.pain_point}</p>
                          </div>
                        </div>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </section>

            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
