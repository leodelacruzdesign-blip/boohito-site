'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Mail, Github, Linkedin, Eye, MapPin, Sparkles } from 'lucide-react';
import { useUsage } from '@/context/UsageContext';
import { useUser } from '@/firebase';
import AuthGatingOverlay from '@/components/auth/AuthGatingOverlay';

export default function BioPage() {
  const { isGated, promptCount } = useUsage();
  const { user, loading: authLoading } = useUser();
  const [isDirectUrlBypass, setIsDirectUrlBypass] = useState(false);

  useEffect(() => {
    // Accessing window inside useEffect to prevent hydration mismatch
    if (typeof window !== 'undefined' && window.location.pathname === '/bio') {
      setIsDirectUrlBypass(true);
    }
  }, []);

  const shouldDropGate = isGated || promptCount >= 3 || isDirectUrlBypass;

  if (authLoading) {
    return <div className="min-h-screen bg-background" />;
  }

  // Intercepting progress if gating conditions are met
  if (shouldDropGate && !user) {
    return <AuthGatingOverlay forcedOpen={true} />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow">
        <section className="pt-20 pb-12 md:pt-32 md:pb-20">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto mb-10">
              <div className="absolute inset-0 rounded-full border-[6px] border-primary/20 shadow-2xl" />
              <div className="absolute inset-1.5 rounded-full border border-border/20 bg-[#121212] overflow-hidden shadow-inner">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 opacity-50 z-10 pointer-events-none" />
                <div className="relative w-full h-full flex justify-center items-center">
                  <Image
                    src="/images/LeonacioD.png"
                    alt="Leonardo Delacruz"
                    fill
                    className="object-contain scale-95"
                    priority
                    data-ai-hint="portrait professional man"
                  />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-accent text-accent-foreground p-2 rounded-full shadow-lg z-20 border-2 border-background">
                <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
              Leonardo Delacruz
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-8">
              Designer & Digital Strategist
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Button disabled variant="outline" size="lg" className="rounded-full flex items-center gap-2">
                <Mail className="h-5 w-5" /> Message
              </Button>
              <Button variant="default" size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
                Follow
              </Button>
            </div>

            <div className="flex justify-center items-center gap-8 text-sm text-muted-foreground border-y border-border/40 py-8 max-w-2xl mx-auto">
              <div className="flex flex-col text-center px-4">
                <span className="text-white font-bold text-2xl">12+</span>
                <span className="uppercase tracking-widest text-[10px] mt-1">Years Experience</span>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="flex flex-col text-center px-4">
                <span className="text-white font-bold text-2xl">84</span>
                <span className="uppercase tracking-widest text-[10px] mt-1">Projects Launched</span>
              </div>
              <div className="w-px h-10 bg-border/40" />
              <div className="flex flex-col text-center px-4">
                <span className="text-white font-bold text-2xl">Global</span>
                <span className="uppercase tracking-widest text-[10px] mt-1">Impact</span>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="space-y-12">
              <div className="bg-card/40 border border-border/60 p-8 md:p-14 rounded-[2.5rem] shadow-sm backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <Eye className="h-40 w-40" />
                </div>
                
                <h2 className="text-3xl font-bold text-primary mb-8 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-4">
                    <Eye className="h-8 w-8 text-primary" />
                  </span>
                  The Story of Boohitō
                </h2>
                
                <div className="prose prose-invert max-w-none space-y-6 text-lg leading-relaxed text-muted-foreground relative z-10">
                  <p>
                    Behind every great project is a unique perspective. In the case of this studio, that perspective belongs to <span className="text-white font-semibold">Leonardo Delacruz</span>—known to his closest peers as the "Little Owl."
                  </p>
                  <p>
                    The name <span className="text-accent font-bold italic">Boohitō</span> is a playful linguistic bridge. In Spanish, <span className="italic">Búho</span> means owl. By adding the diminutive suffix <span className="italic">hito</span>, it transforms into "little owl"—a nickname that Leonardo acquired early in his career.
                  </p>
                  <p>
                    It wasn't just about late nights; it was about the <span className="text-white">nature of the observation</span>. Like the owl, Leonardo is known for being quiet yet incredibly insightful—perched on the periphery of a project to gain a wider, more cohesive perspective.
                  </p>
                  <p>
                    This philosophy of <span className="text-white">observant design</span> is what powers the Boohitō studio today. We don't just build; we watch, we listen, and we synthesize complex data into elegant, high-perspective solutions.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-card/40 border border-border/60 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-accent" /> Location
                  </h3>
                  <p className="text-muted-foreground">Operating from a digital-first environment, serving clients across the globe from a vantage point of high-fidelity strategy.</p>
                </div>
                <div className="bg-card/40 border border-border/60 p-8 rounded-3xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Sparkles className="mr-2 h-5 w-5 text-accent" /> Specialization
                  </h3>
                  <p className="text-muted-foreground">Interactive 3D environments, AI-powered automation, and high-fidelity strategic blueprints.</p>
                </div>
              </div>

              <div className="flex justify-center gap-8 pt-8">
                <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-primary hover:bg-primary/5">
                  <a href="https://linkedin.com/in/leondelacruz" target="_blank" rel="noopener noreferrer" aria-label="Linkedin">
                    <Linkedin className="h-7 w-7" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild className="rounded-full hover:text-primary hover:bg-primary/5">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="Github">
                    <Github className="h-7 w-7" />
                  </a>
                </Button>
                <Button disabled variant="ghost" size="icon" className="rounded-full hover:text-primary hover:bg-primary/5" aria-label="Email (Disabled)">
                   <a href="mailto:leonardodelacruz@boohito.com" className="pointer-events-none">
                    <Mail className="h-7 w-7" />
                   </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
