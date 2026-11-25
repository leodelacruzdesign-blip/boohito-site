'use client';

import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Target, Zap, CheckCircle, BarChart2, CalendarDays } from 'lucide-react';

const kpiData = [
  { metric: 'Customer Satisfaction (CSAT)', preBot: '72%', postBot: '94%', improvement: '+30.5%' },
  { metric: 'Average Response Time (ART)', preBot: '5 min 30 sec', postBot: '20 seconds', improvement: '~94% Reduction' },
  { metric: 'First Contact Resolution (FCR)', preBot: '40%', postBot: '58%', improvement: '+45%' },
  { metric: 'Automated Conversation Rate', preBot: 'N/A', postBot: '62% of Tier 1', improvement: 'Goal Exceeded' },
  { metric: 'Integration Development Time', preBot: 'N/A', postBot: 'Reduced by ~70%', improvement: 'Significant Gain' },
];

const bestPractices = [
    {
        title: "Hybrid Model (Human-in-the-Loop) powered by n8n",
        description: "The bot identifies its limitations and provides a seamless, single-click handover to a human agent for complex queries. n8n captures the full chat transcript, creates a CRM ticket, and assigns it to the appropriate agent.",
        impact: "Maintained high CSAT even for complex issues, preventing 'bot rage' and improving agent efficiency by providing immediate context."
    },
    {
        title: "Orchestrated Action Execution via n8n",
        description: "When the bot recognizes an intent requiring external data (e.g., order status), it triggers an n8n webhook. The workflow executes API calls, transforms the data, and passes the structured response back to the bot.",
        impact: "Ensured precise, real-time data retrieval and reduced the bot's core logic complexity, directly contributing to the significant reduction in average response time."
    },
    {
        title: "Proactive Error Handling & Logging",
        description: "A robust 'Fallback Protocol' was implemented. If n8n workflows encounter an API error, the bot provides a graceful fallback message, and all errors are logged for review.",
        impact: "Improved user experience and provided invaluable debugging information for continuous improvement."
    },
    {
        title: "Continuous Retraining with n8n Data Collection",
        description: "Established a weekly review of unhandled queries. n8n logs every bot interaction, including confidence scores and resolution paths, to a data warehouse for model retraining.",
        impact: "Ensured the bot evolved with new products and customer jargon, maintaining a high resolution rate."
    }
];

const projectPhases = [
  {
    phase: "I. Discover",
    duration: "4 Weeks",
    activities: "Data Audit, Intent Mapping, Stakeholder Interviews, Tech Stack Selection.",
    deliverables: "Functional Requirements Document, Bot Persona, Training Data Set v1.0."
  },
  {
    phase: "II. Develop",
    duration: "10 Weeks",
    activities: "NLP Model Training (Intent/Entity Recognition), Dialogue Flow Design, n8n Workflow Development for integrations (CRM/Knowledge Base/OMS).",
    deliverables: "Sandbox-Ready Bot, Fallback Protocol, Agent Handover Process (n8n-powered)."
  },
  {
    phase: "III. Deploy & Optimize",
    duration: "Ongoing",
    activities: "A/B Testing, Phased Rollout (5% traffic -> 100%), Performance Monitoring, Retraining.",
    deliverables: "Production Bot, Performance Dashboards, Post-Launch Optimization Plan."
  }
]

export default function AiBotCaseStudyPage() {

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <article>
          {/* Header Section */}
          <header className="relative py-20 md:py-32 lg:py-40 bg-card/80 overflow-hidden">
            <div className="absolute inset-0 z-0">
               <Image
                src="/images/chat_bot.jpeg"
                alt="AI bot interface abstract"
                fill
                className="object-cover"
                data-ai-hint="AI bot interface"
              />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/80 to-background/50" />
            <div className="container mx-auto px-4 relative z-20 text-center">
              <Badge variant="secondary" className="mb-4">Case Study</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary max-w-4xl mx-auto">
                AI-Powered Customer Service Bot
              </h1>
              <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                Transforming Customer Support with NLP and Intelligent Automation for a Leading E-commerce Retailer.
              </p>
            </div>
          </header>

          {/* Body Content */}
          <div className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 max-w-5xl space-y-20">

              {/* Key Results Section */}
              <section>
                <h2 className="text-3xl font-bold text-primary mb-10 text-center">Key Results Achieved</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <Card className="bg-card/80 border-primary/30 shadow-lg text-center">
                      <CardHeader>
                        <CardTitle className="text-5xl font-bold text-accent">30%</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Improvement in CSAT</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/80 border-primary/30 shadow-lg text-center">
                      <CardHeader>
                        <CardTitle className="text-5xl font-bold text-accent">&lt;20s</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Average Response Time</p>
                      </CardContent>
                    </Card>
                     <Card className="bg-card/80 border-primary/30 shadow-lg text-center">
                      <CardHeader>
                        <CardTitle className="text-5xl font-bold text-accent">45%</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Increase in FCR Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-card/80 border-primary/30 shadow-lg text-center">
                      <CardHeader>
                        <CardTitle className="text-5xl font-bold text-accent">25%</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Reduction in Agent Overhead</p>
                      </CardContent>
                    </Card>
                </div>
              </section>

              {/* Challenge & Goals */}
              <section>
                <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center"><Target className="w-8 h-8 mr-3"/>Challenge & Project Goals</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Card className="bg-card/80 border-border/70 p-6">
                        <h3 className="text-2xl font-semibold text-accent mb-3">The Challenge</h3>
                        <p className="text-muted-foreground">The client faced overwhelming inquiry volume, high operational costs, and agent burnout due to rapid growth. Inconsistent service quality and complex API integrations made automation difficult.</p>
                    </Card>
                     <Card className="bg-card/80 border-border/70 p-6">
                        <h3 className="text-2xl font-semibold text-accent mb-3">SMART Objectives</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                            <li>Increase CSAT score to 90%+.</li>
                            <li>Reduce average response time by 80%.</li>
                            <li>Automate 60% of routine support tickets.</li>
                            <li>Free up human agents for complex issues.</li>
                        </ul>
                    </Card>
                </div>
              </section>
              
               {/* Project Phases */}
              <section>
                <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center">Methodology & Work-Frame</h2>
                <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">We adopted a modified Agile/Scrum methodology focused on rapid prototyping and continuous feedback loops, executed in three major phases.</p>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {projectPhases.map((phase) => (
                    <Card key={phase.phase} className="bg-card/80 border-border/70 flex flex-col">
                        <CardHeader>
                            <CardTitle className="text-accent text-xl">{phase.phase}</CardTitle>
                            <p className="text-sm text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4"/>{phase.duration}</p>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <h4 className="font-semibold text-foreground mb-2">Key Activities</h4>
                            <p className="text-sm text-muted-foreground mb-4">{phase.activities}</p>
                            <h4 className="font-semibold text-foreground mb-2">Deliverables</h4>
                            <p className="text-sm text-muted-foreground">{phase.deliverables}</p>
                        </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Methodology & Tech Stack */}
              <section>
                 <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center"><Zap className="w-8 h-8 mr-3"/>Relevant Tools & Technology Stack</h2>
                 <p className="text-center text-muted-foreground max-w-3xl mx-auto mb-10">Leveraging the right tools was essential for scalability and integration. n8n played a pivotal role as our integration and automation backbone, drastically reducing the complexity and development time for connecting disparate systems.</p>
                <Card className="bg-card/80 border-border/70 p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-primary">Category</TableHead>
                        <TableHead className="text-primary">Tools</TableHead>
                        <TableHead className="text-primary">Purpose</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-semibold">NLP Framework</TableCell>
                        <TableCell>Google Dialogflow</TableCell>
                        <TableCell>Core engine for intent matching and dialogue management.</TableCell>
                      </TableRow>
                       <TableRow>
                        <TableCell className="font-semibold text-accent">Integration/Automation</TableCell>
                        <TableCell className="text-accent">n8n</TableCell>
                        <TableCell className="text-accent">Central orchestration layer for all API calls and workflows. Accelerated integration by 70%.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Data/Training</TableCell>
                        <TableCell>Python (Pandas, Scikit-learn)</TableCell>
                        <TableCell>Cleaning, labeling, and feature engineering of customer data.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">CRM/OMS</TableCell>
                        <TableCell>Salesforce/Zendesk, Custom OMS</TableCell>
                        <TableCell>Customer data management, order tracking, and ticket handling.</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-semibold">Deployment & Monitoring</TableCell>
                        <TableCell>AWS Lambda, Kubernetes, Grafana</TableCell>
                        <TableCell>Hosting, real-time performance tracking, and workflow monitoring.</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Card>
              </section>

              {/* Best Practices Section */}
              <section>
                <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center"><CheckCircle className="w-8 h-8 mr-3"/>Best Practices Implemented</h2>
                <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto" defaultValue="item-0">
                  {bestPractices.map((practice, index) => (
                    <AccordionItem value={`item-${index}`} key={index} className="border-border/70">
                      <AccordionTrigger className="text-xl font-semibold hover:no-underline text-left">
                        {practice.title}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pl-6 border-l-2 border-primary/50 ml-2 space-y-3">
                        <p>{practice.description}</p>
                        <p><strong className="text-accent">Impact:</strong> {practice.impact}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
              
               {/* Results Section */}
              <section>
                 <h2 className="text-3xl font-bold text-primary mb-10 text-center flex items-center justify-center"><BarChart2 className="w-8 h-8 mr-3"/>Results & Conclusion</h2>
                <Card className="bg-card/80 border-border/70">
                    <CardHeader>
                        <CardTitle>Key Performance Indicators (KPI) Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Metric</TableHead>
                                    <TableHead>Pre-Bot</TableHead>
                                    <TableHead>Post-Bot (6 Mo.)</TableHead>
                                    <TableHead className="text-accent">Improvement</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {kpiData.map((kpi) => (
                                <TableRow key={kpi.metric}>
                                    <TableCell className="font-semibold">{kpi.metric}</TableCell>
                                    <TableCell>{kpi.preBot}</TableCell>
                                    <TableCell>{kpi.postBot}</TableCell>
                                    <TableCell className="font-semibold text-accent">{kpi.improvement}</TableCell>
                                </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <div className="mt-8 text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold text-accent mb-3">Project Conclusion</h3>
                    <p className="text-muted-foreground">The case study demonstrates that a strategically developed AI solution, anchored in solid NLP and empowered by flexible low-code automation tools like n8n, can deliver significant improvements in customer satisfaction and operational efficiency. The drastic reduction in response time, enabled by n8n's rapid data orchestration, was a primary catalyst for the impressive 30% jump in CSAT.</p>
                </div>
                 <div className="mt-8 text-center max-w-3xl mx-auto">
                    <h3 className="text-xl font-semibold text-accent mb-3">Future Scope</h3>
                    <p className="text-muted-foreground">The client is now exploring phase two, which includes proactive chat to initiate contact with customers exhibiting specific behaviors and voice integration to handle inbound calls, with n8n managing complex routing and data retrieval.</p>
                </div>
              </section>

            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
